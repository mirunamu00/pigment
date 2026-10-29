import { existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { CriticScores, ReviewPlan, ReviewReport, type ReviewItem, type UnitReview } from "@pigment/schema";
import { candidateStage, compareCore, latestEval } from "../budget.ts";
import { paths, rel, runsDir, templateDir } from "../paths.ts";
import { buildPlan, referenceImages } from "../review/plan.ts";
import { synthesisPrompt, unitPrompt, type ReviewContext } from "../review/prompts.ts";
import { checkUnit, extractJson, pool, runReadOnlyAgent, type AgentAnswer } from "../review/run.ts";
import { renderSheets } from "../review/sheets.ts";
import { loadTemplate } from "../template.ts";
import { fail, info, ok, readJson, writeJson, writeText } from "../util.ts";
import { judgeCritic, mergeCritic } from "./evaluate.ts";

import { resolveExecution, executionLabel, type AgentExecution } from "../agent-runtime.ts";

const UNIT_TIMEOUT_MS = 40 * 60_000;

/**
 * The review: a checklist of everything the runs produced, reviewers that must answer every item, a lead reviewer
 * that grades consistently, and a verdict merged into the evaluation. Run by the harness so the instructions,
 * the coverage and the record are the same every time.
 */
export async function review(
  id: string,
  version: string,
  options: AgentExecution & { holdout?: boolean; concurrency?: number; record?: boolean },
): Promise<{ critic: CriticScores; judged: ReturnType<typeof judgeCritic> }> {
  resolveExecution(options, {});
  info(`review with ${executionLabel(options)}`);
  const scope = options.holdout ? "holdout" : "main";
  const report = latestEval(id, version, paths.runs, scope);
  if (!report) fail(`no ${scope} evaluation for ${id}@${version} — run pnpm harness evaluate${options.holdout ? " --holdout" : ""} first`);
  if (report.verdict === "fail" && !report.critic) fail(`the ${scope} evaluation failed its gates — fix those first:\n  ${report.reasons.join("\n  ")}`);
  if (options.holdout) {
    const { stage } = candidateStage(id, version);
    if (stage !== "holdout" && stage !== "done") fail(`${id}@${version} is at the ${stage} stage — the holdout apps are reviewed only after the main apps pass the confirm`);
  }

  const n = report.iteration;
  // A calibration run (record: false) keeps its own folder and never touches the evaluation.
  const calibration = options.record === false ? `-calibration-${new Date().toISOString().replace(/[:.]/g, "-")}` : "";
  const dir = join(runsDir(id, version), `review-${n}${options.holdout ? "-holdout" : ""}${calibration}`);
  const plan = ReviewPlan.parse({ ...buildPlan({ id, version, report, reviewDir: dir }), referenceSheet: null });
  const refShots = referenceImages(id, version, dir);
  const referenceSheet = refShots.length ? rel(join(dir, "sheets", "_reference.png")) : null;
  plan.referenceSheet = referenceSheet;
  plan.referenceSet = refShots.map((r) => ({ file: r.file, shows: r.shows }));
  info(`review ${id}@${version} (${scope}): ${plan.items.length} checklist items, ${plan.units.length} reviewer(s), ${plan.samples} sample(s)`);
  await renderSheets(plan.items, referenceSheet ? { file: referenceSheet, shots: refShots } : null);
  // Only what was written: a crop that failed is not offered to a reviewer.
  plan.referenceSet = plan.referenceSet.filter((r) => existsSync(join(paths.root, r.file)));
  for (const item of plan.items) item.crops = item.crops?.map((c) => (c && existsSync(join(paths.root, c)) ? c : ""));
  if (!plan.referenceSet.length) info("no reference set: reviewers judge against the spec only — add referenceSet to the analysis");
  // The screen: a page for the user's direction check (the reference at its best next to what the agents built).
  if (!options.holdout && plan.samples === 1) {
    const file = join(dir, "direction.html");
    writeText(file, directionPage(`${id}@${version}`, plan, dir));
    info(`direction check for the user: ${rel(file)}`);
  }
  writeJson(join(dir, "plan.json"), plan);
  writeJson(join(dir, "execution.json"), { agent: options.agent, model: options.model, reasoningEffort: options.reasoningEffort });

  const ctx = context(id, version, plan, referenceSheet, !!options.holdout);
  const byId = new Map(plan.items.map((i) => [i.id, i]));
  const unitRecords: ReviewReport["units"] = [];
  const results: Array<{ id: string; review: UnitReview }> = [];

  await pool(plan.units, options.concurrency ?? 6, async (unit) => {
    let todo: ReviewItem[] = unit.items.map((i) => byId.get(i)!);
    const merged: UnitReview = { items: [], findings: [] };
    const record = { id: unit.id, items: unit.items.length, covered: 0, attempts: 0, durationMs: 0, turns: 0, model: undefined as string | undefined, problems: [] as string[] };
    // One retry, with only the items the first answer left out.
    while (todo.length && record.attempts < 2) {
      record.attempts++;
      info(`[${unit.id}] reviewing ${todo.length} item(s)${record.attempts > 1 ? " (retry)" : ""}`);
      const answer = await runReadOnlyAgent(options, unitPrompt(ctx, todo), UNIT_TIMEOUT_MS);
      account(record, answer);
      writeText(join(dir, "units", `${unit.id}-${record.attempts}.md`), answer.text || answer.error || "");
      let parsed: unknown = null;
      if (!answer.ok) { record.problems.push(answer.error ?? "agent failed"); continue; }
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
    agent: options.agent, model: options.model, reasoningEffort: options.reasoningEffort,
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
  const homeSheets = plan.items
    .filter((i) => i.kind === "page" && i.subject === "/")
    .flatMap((i) => [i.sheet, ...(i.crops ?? []).filter(Boolean)]);
  let critic: CriticScores | null = null;
  for (let attempt = 1; attempt <= 2 && !critic; attempt++) {
    info(`lead reviewer${attempt > 1 ? " (retry)" : ""}`);
    const answer = await runReadOnlyAgent(options, synthesisPrompt(ctx, plan, results, homeSheets), UNIT_TIMEOUT_MS);
    reviewReport.synthesis = { durationMs: (reviewReport.synthesis?.durationMs ?? 0) + answer.durationMs, turns: answer.turns, model: answer.model };
    writeText(join(dir, `lead-${attempt}.md`), answer.text || answer.error || "");
    if (!answer.ok) { info(`lead reviewer failed: ${answer.error ?? "incomplete execution"}`); continue; }
    try {
      const parsed = CriticScores.parse(extractJson(answer.text));
      if (!parsed.findings) throw new Error("no findings array");
      const missing = (["referenceFidelity", "signature", "crossAppConsistency", "hierarchy", "spacingRhythm", "componentStates", "polish"] as const).filter((a) => typeof parsed[a] !== "number");
      if (missing.length) throw new Error(`no score for ${missing.join(", ")}`);
      critic = { ...parsed, mode: "quality" };
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
  if (options.record === false) {
    writeJson(join(dir, "critic.json"), critic);
    return { critic, judged: judgeCritic(critic) };
  }
  const criticFile = join(runsDir(id, version), `critic-${n}${options.holdout ? "-holdout" : ""}.json`);
  writeJson(criticFile, critic);
  const merged = mergeCritic(id, version, criticFile, {
    holdout: options.holdout,
    review: { status: "complete", items: plan.items.length, covered, reviewers: plan.units.length + 1, minutes: minutes() },
  });
  return { critic: merged.critic ?? critic, judged: judgeCritic(merged.critic ?? critic) };
}

function account(record: { durationMs: number; turns: number; model?: string }, a: AgentAnswer): void {
  record.durationMs += a.durationMs;
  record.turns += a.turns ?? 0;
  if (a.model) record.model = a.model;
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
    referenceSet: plan.referenceSet ?? [],
    analysis: analysisMd && existsSync(analysisMd) ? rel(analysisMd) : null,
    holdout,
    samples: plan.samples,
    earlier,
    published: current ? { version: current, runs: rel(runsDir(id, current)) } : null,
  };
}

const escHtml = (t: string) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/**
 * The direction check after the screen: the reference set and each app's first screens (desktop light, plus the
 * home page on a phone) on one page, at full width, for the user to say whether this is the reference's quality.
 */
export function directionPage(ref: string, plan: ReviewPlan, dir: string): string {
  const src = (f: string) => relative(dir, join(paths.root, f)).replaceAll("\\", "/");
  const fig = (f: string, caption: string) => `<figure><img src="${escHtml(src(f))}" loading="lazy"><figcaption>${escHtml(caption)}</figcaption></figure>`;
  const apps = [...new Set(plan.items.map((i) => i.app))];
  const appBlocks = apps
    .map((app) => {
      const pages = plan.items.filter((i) => i.app === app && i.kind === "page" && i.crops?.[0]);
      const desktop = pages.filter((i) => i.viewport === "desktop" && i.scheme === "light").slice(0, 4);
      const phone = pages.filter((i) => i.viewport === "mobile" && i.scheme === "light" && i.subject === "/").slice(0, 1);
      return `<h2>${escHtml(app)}</h2><div class="row">${[...desktop, ...phone].map((i) => fig(i.crops![0]!, `${i.subject} · ${i.viewport}`)).join("")}</div>`;
    })
    .join("");
  const reference = (plan.referenceSet ?? []).map((r) => fig(r.file, r.shows)).join("");
  return `<!doctype html><meta charset="utf-8"><title>${escHtml(ref)} — direction check</title>
<style>body{margin:24px;font:14px/1.5 system-ui,sans-serif;background:#fff;color:#111}h1{font-size:20px}h2{font-size:16px;margin:28px 0 8px}
.row{display:flex;gap:16px;overflow-x:auto;align-items:flex-start}figure{margin:0;flex:none}img{display:block;max-height:720px;border:1px solid #ccc}
figcaption{font-size:12px;color:#555;margin-top:4px}</style>
<h1>${escHtml(ref)} — is this the reference's quality?</h1>
<p>Top: the reference at its best. Below: the first screens the agents built from the prompt (one sample). Approve the direction only if
someone who knows the reference would take these for the same team's work.</p>
<h2>Reference</h2><div class="row">${reference || "<p>No reference set.</p>"}</div>${appBlocks}`;
}
