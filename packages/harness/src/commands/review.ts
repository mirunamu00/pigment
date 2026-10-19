import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CriticScores, ReviewPlan, ReviewReport, type ReviewItem, type UnitReview } from "@pigment/schema";
import { candidateStage, compareCore, latestEval } from "../budget.ts";
import { paths, rel, runsDir, templateDir } from "../paths.ts";
import { buildPlan, referenceImages } from "../review/plan.ts";
import { synthesisPrompt, unitPrompt, type ReviewContext } from "../review/prompts.ts";
import { checkUnit, extractJson, pool, runReadOnlyAgent, type AgentAnswer } from "../review/run.ts";
import { renderSheets } from "../review/sheets.ts";
import { loadTemplate } from "../template.ts";
import { fail, info, ok, readJson, writeJson, writeText } from "../util.ts";
import { mergeCritic } from "./evaluate.ts";

const UNIT_TIMEOUT_MS = 40 * 60_000;

/**
 * The review: a checklist of everything the runs produced, reviewers that must answer every item, a lead reviewer
 * that grades consistently, and a verdict merged into the evaluation. Run by the harness so the instructions,
 * the coverage and the record are the same every time.
 */
export async function review(id: string, version: string, options: { holdout?: boolean; concurrency?: number }): Promise<void> {
  const scope = options.holdout ? "holdout" : "main";
  const report = latestEval(id, version, paths.runs, scope);
  if (!report) fail(`no ${scope} evaluation for ${id}@${version} — run pnpm harness evaluate${options.holdout ? " --holdout" : ""} first`);
  if (report.verdict === "fail" && !report.critic) fail(`the ${scope} evaluation failed its gates — fix those first:\n  ${report.reasons.join("\n  ")}`);
  if (options.holdout) {
    const { stage } = candidateStage(id, version);
    if (stage !== "holdout" && stage !== "done") fail(`${id}@${version} is at the ${stage} stage — the holdout apps are reviewed only after the main apps pass the confirm`);
  }

  const n = report.iteration;
  const dir = join(runsDir(id, version), `review-${n}${options.holdout ? "-holdout" : ""}`);
  const plan = ReviewPlan.parse({ ...buildPlan({ id, version, report, reviewDir: dir }), referenceSheet: null });
  const refImages = referenceImages(id, version);
  const referenceSheet = refImages.length ? rel(join(dir, "sheets", "_reference.png")) : null;
  plan.referenceSheet = referenceSheet;
  info(`review ${id}@${version} (${scope}): ${plan.items.length} checklist items, ${plan.units.length} reviewer(s), ${plan.samples} sample(s)`);
  await renderSheets(plan.items, referenceSheet ? { file: referenceSheet, images: refImages } : null);
  writeJson(join(dir, "plan.json"), plan);

  const ctx = context(id, version, plan, referenceSheet, !!options.holdout);
  const byId = new Map(plan.items.map((i) => [i.id, i]));
  const unitRecords: ReviewReport["units"] = [];
  const results: Array<{ id: string; review: UnitReview }> = [];

  await pool(plan.units, options.concurrency ?? 6, async (unit) => {
    let todo: ReviewItem[] = unit.items.map((i) => byId.get(i)!);
    const merged: UnitReview = { items: [], findings: [] };
    const record = { id: unit.id, items: unit.items.length, covered: 0, attempts: 0, durationMs: 0, turns: 0, costUsd: 0, problems: [] as string[] };
    // One retry, with only the items the first answer left out.
    while (todo.length && record.attempts < 2) {
      record.attempts++;
      info(`[${unit.id}] reviewing ${todo.length} item(s)${record.attempts > 1 ? " (retry)" : ""}`);
      const answer = await runReadOnlyAgent(unitPrompt(ctx, todo), UNIT_TIMEOUT_MS);
      account(record, answer);
      writeText(join(dir, "units", `${unit.id}-${record.attempts}.md`), answer.text || answer.error || "");
      let parsed: unknown = null;
      try {
        parsed = extractJson(answer.text);
      } catch (e) {
        record.problems.push(`attempt ${record.attempts}: ${(e as Error).message}${answer.error ? ` (${answer.error.slice(0, 200)})` : ""}`);
      }
      const check = checkUnit(todo, parsed);
      record.problems.push(...check.problems.map((p) => `attempt ${record.attempts}: ${p}`));
      if (check.review) {
        const done = new Set(todo.map((i) => i.id).filter((id) => !check.missing.includes(id)));
        merged.items.push(...check.review.items.filter((i) => done.has(i.id)));
        merged.findings.push(...check.review.findings);
      }
      todo = todo.filter((i) => check.missing.includes(i.id));
    }
    record.covered = merged.items.length;
    writeJson(join(dir, "units", `${unit.id}.json`), merged);
    unitRecords.push(record);
    results.push({ id: unit.id, review: merged });
    ok(`[${unit.id}] ${record.covered}/${record.items} items in ${Math.round(record.durationMs / 60_000)} min`);
  });

  const covered = unitRecords.reduce((a, u) => a + u.covered, 0);
  const complete = covered === plan.items.length;
  const reviewReport: ReviewReport = {
    template: id,
    version,
    evaluation: n,
    status: complete ? "complete" : "incomplete",
    items: plan.items.length,
    covered,
    units: unitRecords.sort((a, b) => a.id.localeCompare(b.id)),
  };
  const minutes = () => Math.round(Math.max(...unitRecords.map((u) => u.durationMs), 0) / 60_000 + (reviewReport.synthesis?.durationMs ?? 0) / 60_000);
  if (!complete) {
    writeJson(join(dir, "review.json"), reviewReport);
    fail(`review incomplete: ${covered} of ${plan.items.length} items answered — no verdict. See ${rel(join(dir, "review.json"))}`);
  }

  // The lead reviewer: one standard for every finding, and what spans the apps.
  const homeSheets = plan.items.filter((i) => i.kind === "page" && i.subject === "/" && i.viewport === "desktop").map((i) => i.sheet);
  let critic: CriticScores | null = null;
  for (let attempt = 1; attempt <= 2 && !critic; attempt++) {
    info(`lead reviewer${attempt > 1 ? " (retry)" : ""}`);
    const answer = await runReadOnlyAgent(synthesisPrompt(ctx, plan, results, homeSheets), UNIT_TIMEOUT_MS);
    reviewReport.synthesis = { durationMs: (reviewReport.synthesis?.durationMs ?? 0) + answer.durationMs, turns: answer.turns, costUsd: answer.costUsd };
    writeText(join(dir, `lead-${attempt}.md`), answer.text || answer.error || "");
    try {
      const parsed = CriticScores.parse(extractJson(answer.text));
      if (!parsed.findings) throw new Error("no findings array");
      critic = parsed;
    } catch (e) {
      info(`lead reviewer answer rejected: ${(e as Error).message}`);
    }
  }
  if (!critic) {
    reviewReport.status = "incomplete";
    writeJson(join(dir, "review.json"), reviewReport);
    fail("the lead reviewer gave no valid verdict twice — no verdict");
  }
  if (options.holdout) critic.findings = critic.findings!.map((f) => ({ ...f, holdoutOnly: true }));
  critic.notes = [`Review: ${covered}/${plan.items.length} checklist items by ${plan.units.length} reviewer(s) and a lead reviewer (${rel(dir)}).`, ...critic.notes];
  writeJson(join(dir, "review.json"), reviewReport);
  const criticFile = join(runsDir(id, version), `critic-${n}${options.holdout ? "-holdout" : ""}.json`);
  writeJson(criticFile, critic);
  mergeCritic(id, version, criticFile, {
    holdout: options.holdout,
    review: { status: "complete", items: plan.items.length, covered, reviewers: plan.units.length + 1, minutes: minutes() },
  });
}

function account(record: { durationMs: number; turns: number; costUsd: number }, a: AgentAnswer): void {
  record.durationMs += a.durationMs;
  record.turns += a.turns ?? 0;
  record.costUsd += a.costUsd ?? 0;
}

function context(id: string, version: string, plan: ReviewPlan, referenceSheet: string | null, holdout: boolean): ReviewContext {
  const tpl = loadTemplate(id, version);
  const analysis = tpl.manifest.provenance.analysis;
  const analysisMd = analysis ? join(paths.root, analysis, "..", "analysis.md") : null;
  // The verdict this candidate answers, and this candidate's own earlier ones.
  const vdir = runsDir(id, version);
  const originFile = join(vdir, "origin.json");
  const from = existsSync(originFile) ? readJson<{ from?: string }>(originFile).from : undefined;
  const fromVersion = from?.startsWith(`${id}@`) ? from.slice(id.length + 1) : undefined;
  const critics = (v: string) =>
    existsSync(runsDir(id, v)) ? readdirSync(runsDir(id, v)).filter((f) => /^critic-\d+(-holdout)?\.json$/.test(f)).map((f) => rel(join(runsDir(id, v), f))) : [];
  const earlier = [...(fromVersion ? critics(fromVersion).slice(-1) : []), ...critics(version).filter((f) => !f.endsWith(`critic-${plan.evaluation}${holdout ? "-holdout" : ""}.json`))];
  const published = existsSync(paths.published) ? Object.keys(readJson<Record<string, string>>(paths.published)) : [];
  const current = published
    .filter((r) => r.startsWith(`${id}@`))
    .map((r) => r.slice(id.length + 1))
    .filter((v) => compareCore(v, version) < 0)
    .sort(compareCore)
    .at(-1);
  return {
    ref: `${id}@${version}`,
    spec: rel(join(templateDir(id, version), "dist", "agent.md")),
    referenceSheet,
    analysis: analysisMd && existsSync(analysisMd) ? rel(analysisMd) : null,
    holdout,
    samples: plan.samples,
    earlier,
    published: current ? { version: current, runs: rel(runsDir(id, current)) } : null,
  };
}
