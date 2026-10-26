import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CriticScores, EvalReport, type CriticFinding, type RunAppId } from "@pigment/schema";
import { baseApps, e2e, holdoutApps } from "../appdir.ts";
import { evalScope } from "../budget.ts";
import { distance, isMostlyOpaque, nearest, toHex } from "../color.ts";
import type { StyleSample } from "../extract.ts";
import { paths, rel, runsDir } from "../paths.ts";
import type { LayoutReport } from "../layout.ts";
import { colorPalette, fontFamilies, loadTemplate, normalizeFamily, radiusSet, spaceScale } from "../template.ts";
import { fail, info, ok, readJson, timestamp, writeJson, writeText } from "../util.ts";
import type { ShotResult } from "./shoot.ts";

type Gate = EvalReport["runs"][number]["gates"][number];

/**
 * The only checks that fail a run by themselves: without them there is nothing to review. Every other check is
 * evidence for the review — a broken detail fails a candidate only when the review finds the prompt induced it.
 */
export const GATING_CHECKS = new Set(["agent-finished", "build"]);

/**
 * The quality bar (0–5, from the typical sample): someone who knows the reference must recognise it and find it close
 * in quality, its signatures must hold, and no other area may be clearly below the reference.
 */
export const QUALITY_BAR = { referenceFidelity: 4, signature: 4, other: 3 } as const;

const THRESHOLDS = {
  colorAdherence: 0.9,
  fontAdherence: 0.98,
  radiusAdherence: 0.85,
  paletteConsistency: 0.75,
  typeConsistency: 0.7,
  colorDelta: 3,
};

/** The latest n runs of an app, newest first. */
function latestRuns(id: string, version: string, app: string, n: number): string[] {
  const dir = join(runsDir(id, version), app);
  if (!existsSync(dir)) return [];
  const runs = readdirSync(dir).filter((d) => existsSync(join(dir, d, "run.json"))).sort().reverse();
  return runs.slice(0, n).map((r) => join(dir, r));
}

/** Share of weight whose color is within ΔE of the palette. Translucent overlays are ignored. */
function colorShare(maps: Array<Record<string, number>>, palette: string[]): number {
  let total = 0;
  let inside = 0;
  for (const map of maps) {
    const sum = Object.values(map).reduce((a, b) => a + b, 0) || 1;
    for (const [color, weight] of Object.entries(map)) {
      if (!isMostlyOpaque(color)) continue;
      const share = weight / sum;
      total += share;
      if (nearest(color, palette).delta <= THRESHOLDS.colorDelta) inside += share;
    }
  }
  return total ? inside / total : 1;
}

function firstFamily(stack: string): string {
  return normalizeFamily(stack.split(",")[0] ?? "");
}

function topColors(samples: StyleSample[], n = 8): string[] {
  const weights: Record<string, number> = {};
  for (const s of samples.filter((x) => x.scheme === "light")) {
    for (const map of [s.backgroundArea, s.textColor]) {
      const sum = Object.values(map).reduce((a, b) => a + b, 0) || 1;
      for (const [c, w] of Object.entries(map)) {
        const hex = isMostlyOpaque(c) ? toHex(c) : null;
        if (hex) weights[hex] = (weights[hex] ?? 0) + w / sum;
      }
    }
  }
  return Object.entries(weights).sort((a, b) => b[1] - a[1]).slice(0, n).map(([c]) => c);
}

function matchShare(a: string[], b: string[]): number {
  if (a.length === 0) return 0;
  return a.filter((c) => b.some((d) => distance(c, d) <= THRESHOLDS.colorDelta)).length / a.length;
}

function fontSizes(samples: StyleSample[]): Set<string> {
  return new Set(samples.flatMap((s) => Object.keys(s.fontSize)));
}

/** Weighted share of a histogram's px values within ±1px of one of `scale` (percent values count as on it). */
export function shareOnScale(hist: Record<string, number>, scale: number[]): number {
  let total = 0;
  let on = 0;
  for (const [value, n] of Object.entries(hist)) {
    const px = parseFloat(value);
    if (!Number.isFinite(px)) continue;
    total += n;
    if (value.endsWith("%") || scale.some((s) => Math.abs(s - px) <= 1)) on += n;
  }
  return total ? on / total : 1;
}

function mergeHist(samples: StyleSample[], key: "fontSize" | "radius" | "spacing"): Record<string, number> {
  const out: Record<string, number> = {};
  for (const s of samples) for (const [k, v] of Object.entries(s[key])) out[k] = (out[k] ?? 0) + v;
  return out;
}

/** The most used px values of a histogram, covering `cover` of its weight. */
function mainValues(hist: Record<string, number>, cover = 0.8): number[] {
  const entries = Object.entries(hist).sort((a, b) => b[1] - a[1]);
  const sum = entries.reduce((a, [, n]) => a + n, 0) || 1;
  const out: number[] = [];
  let acc = 0;
  for (const [value, n] of entries) {
    if (acc >= cover * sum) break;
    const px = parseFloat(value);
    if (Number.isFinite(px)) out.push(px);
    acc += n;
  }
  return out;
}

/** Layout findings per kind; the "N more not listed" entry counts N. */
export function layoutCounts(reports: LayoutReport[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of reports)
    for (const f of r.findings) {
      const more = f.where === "" ? parseInt(f.detail) : NaN;
      out[f.kind] = (out[f.kind] ?? 0) + (Number.isFinite(more) ? more : 1);
    }
  return out;
}

export async function evaluate(id: string, version: string, options: { skipE2e?: boolean; samples?: number; apps?: RunAppId[]; holdout?: boolean }): Promise<EvalReport> {
  const samples = Math.max(1, options.samples ?? 1);
  const tpl = loadTemplate(id, version);
  const palette = colorPalette(tpl);
  const radii = radiusSet(tpl);
  const space = spaceScale(tpl);
  const allSamples: StyleSample[] = [];
  const families = new Set([...fontFamilies(tpl), "system-ui", "sans-serif", "serif", "monospace", "-apple-system"]);
  const dir = runsDir(id, version);
  // The next number after the highest, so a gap in the files never overwrites an evaluation.
  const iteration = (existsSync(dir) ? Math.max(0, ...readdirSync(dir).map((f) => Number(/^eval-(\d+)\.json$/.exec(f)?.[1] ?? 0))) : 0) + 1;
  // The main apps (screen, confirm) and the holdout apps (the final check) are evaluated and judged apart: the
  // holdouts are looked at only once the main apps passed, so they never steer a candidate that failed there.
  const scope = options.holdout ? ("holdout" as const) : ("main" as const);
  const report: EvalReport = { template: id, version, iteration, evaluatedAt: timestamp(), runs: [], crossApp: [], verdict: "pending-review", reasons: [], scope };
  // Style samples per sample index and app, for cross-app consistency within each sample.
  const perSample: Array<Record<string, StyleSample[]>> = Array.from({ length: samples }, () => ({}));

  // `apps` limits the evaluation, e.g. to the holdout apps when checking whether a published system carries over.
  const only = options.apps;
  const apps = scope === "main" ? (baseApps() as RunAppId[]).filter((a) => !only || only.includes(a)) : [];
  const pending: Array<{ app: RunAppId; runDir: string; k: number; holdout?: boolean }> = [];
  for (const app of apps) {
    const runDirs = latestRuns(id, version, app, samples);
    if (runDirs.length < samples) report.reasons.push(`${app}: ${runDirs.length} of ${samples} sample(s)`);
    runDirs.forEach((runDir, k) => pending.push({ app, runDir, k }));
  }
  // Holdout apps (the final check): each one's latest run. Their gates count like any app's; they stay out of
  // cross-app consistency, which compares the four main apps.
  const holdouts: RunAppId[] = [];
  if (scope === "holdout") {
    for (const app of (holdoutApps() as RunAppId[]).filter((a) => !only || only.includes(a))) {
      holdouts.push(app);
      const runDir = latestRuns(id, version, app, 1)[0];
      if (!runDir) report.reasons.push(`${app}: no run`);
      else pending.push({ app, runDir, k: 0, holdout: true });
    }
  }
  // Each app's newest run first: publishing takes an app's first listed run as its gallery capture.
  pending.sort((a, b) => a.k - b.k);
  for (const { app, runDir, k, holdout } of pending) {
    const run = readJson<{ runId: string; agentExitCode?: number | null; build?: { ok: boolean }; workDir: string }>(join(runDir, "run.json"));
    const gates: Gate[] = [];
    const metrics: Record<string, number> = {};
    gates.push({ name: "agent-finished", pass: run.agentExitCode === 0, value: run.agentExitCode ?? -1, threshold: 0 });
    gates.push({ name: "build", pass: !!run.build?.ok, value: !!run.build?.ok });

    if (run.build?.ok && existsSync(join(runDir, "shots.json"))) {
      const shots = readJson<ShotResult>(join(runDir, "shots.json"));
      const styleSamples = readJson<StyleSample[]>(join(runDir, "samples.json"));
      if (!holdout) {
        perSample[k]![app] = styleSamples;
        allSamples.push(...styleSamples);
      }

      if (!options.skipE2e) {
        info(`[${app}] running smoke tests`);
        const t = await e2e(run.workDir);
        writeText(join(runDir, "e2e.log"), t.log);
        gates.push({ name: "functional-preservation", pass: t.ok, value: `${t.passed} passed, ${t.failed} failed`, threshold: "all pass" });
      }
      gates.push({ name: "no-console-errors", pass: shots.consoleErrors.length === 0, value: shots.consoleErrors.length, threshold: 0 });
      const overflow = shots.overflow ?? [];
      gates.push({
        name: "no-horizontal-scroll",
        pass: overflow.length === 0,
        value: overflow.length,
        threshold: 0,
        detail: overflow.map((o) => `${o.route} ${o.viewport} ${o.scheme} +${o.px}px`).join("; ") || undefined,
      });

      const baselineFile = join(paths.runs, "_baseline", app, "shots.json");
      const baselineAxe = existsSync(baselineFile) ? readJson<ShotResult>(baselineFile).axe : [];
      const severe = (list: ShotResult["axe"]) => list.filter((v) => v.impact === "serious" || v.impact === "critical");
      const known = new Set(severe(baselineAxe).map((v) => `${v.route}|${v.id}`));
      const fresh = severe(shots.axe).filter((v) => !known.has(`${v.route}|${v.id}`));
      gates.push({ name: "accessibility", pass: fresh.length === 0, value: fresh.length, threshold: 0, detail: fresh.map((v) => `${v.route}: ${v.id}`).join("; ") || undefined });

      // Motion: looping animations must stop when the user asks for reduced motion; the rest is reported for the critic.
      if (shots.reducedMotionLoops) {
        const still = shots.reducedMotionLoops.filter((r) => r.count > 0);
        gates.push({
          name: "reduced-motion",
          pass: still.length === 0,
          value: still.reduce((n, r) => n + r.count, 0),
          threshold: 0,
          detail: still.map((r) => `${r.route}: ${r.count} looping`).join("; ") || undefined,
        });
      }
      if (shots.motion) {
        metrics.animations = shots.motion.animations;
        metrics.loopingAnimations = shots.motion.loops;
        metrics.svgAnimations = shots.motion.inSvg;
        metrics.illustrations = shots.motion.illustrations;
        metrics.lineDrawings = shots.motion.lineDrawings;
      }

      const color = colorShare(styleSamples.flatMap((s) => [s.backgroundArea, s.textColor]), palette);
      metrics.colorAdherence = Math.round(color * 1000) / 1000;
      gates.push({ name: "color-adherence", pass: color >= THRESHOLDS.colorAdherence, value: metrics.colorAdherence, threshold: THRESHOLDS.colorAdherence });

      let chars = 0;
      let matched = 0;
      for (const s of styleSamples) for (const [stack, n] of Object.entries(s.fontFamily)) {
        chars += n;
        if (families.has(firstFamily(stack))) matched += n;
      }
      metrics.fontAdherence = chars ? Math.round((matched / chars) * 1000) / 1000 : 1;
      gates.push({ name: "font-adherence", pass: metrics.fontAdherence >= THRESHOLDS.fontAdherence, value: metrics.fontAdherence, threshold: THRESHOLDS.fontAdherence });

      let rounded = 0;
      let onScale = 0;
      for (const s of styleSamples) for (const [value, n] of Object.entries(s.radius)) {
        rounded += n;
        const px = parseFloat(value);
        if (value.endsWith("%") || px >= 999 || radii.some((r) => Math.abs(r - px) <= 1 || (r >= 999 && px >= 100))) onScale += n;
      }
      metrics.radiusAdherence = rounded ? Math.round((onScale / rounded) * 1000) / 1000 : 1;
      gates.push({ name: "radius-adherence", pass: metrics.radiusAdherence >= THRESHOLDS.radiusAdherence, value: metrics.radiusAdherence, threshold: THRESHOLDS.radiusAdherence });

      // Reported for the critic, not gated: spacing on the scale, and measured layout defects (layout.ts).
      if (space.length) metrics.spacingOnScale = Math.round(shareOnScale(mergeHist(styleSamples, "spacing"), space) * 1000) / 1000;
      for (const [kind, n] of Object.entries(layoutCounts(shots.layout ?? []))) metrics[`layout:${kind}`] = n;
    }
    report.runs.push({ runId: run.runId, app, gates, metrics });
    if (run.build?.ok && existsSync(join(runDir, "shots.json"))) {
      for (const l of readJson<ShotResult>(join(runDir, "shots.json")).layout ?? [])
        for (const f of l.findings) (report.layout ??= []).push({ app, runId: run.runId, route: l.route, viewport: l.viewport, ...f });
    }
  }

  // Cross-app consistency: the four apps should look like one family — in every sample.
  for (const [k, perApp] of perSample.entries()) {
    const appIds = Object.keys(perApp);
    const suffix = samples > 1 ? ` (sample ${k + 1})` : "";
    if (appIds.length > 1) {
      const tops = appIds.map((a) => topColors(perApp[a]!));
      const sizes = appIds.map((a) => fontSizes(perApp[a]!));
      let paletteSum = 0;
      let typeSum = 0;
      let pairs = 0;
      for (let i = 0; i < appIds.length; i++)
        for (let j = i + 1; j < appIds.length; j++) {
          paletteSum += (matchShare(tops[i]!, tops[j]!) + matchShare(tops[j]!, tops[i]!)) / 2;
          const a = sizes[i]!;
          const b = sizes[j]!;
          typeSum += [...a].filter((x) => b.has(x)).length / Math.max(1, Math.min(a.size, b.size));
          pairs++;
        }
      const palette = Math.round((paletteSum / pairs) * 1000) / 1000;
      const type = Math.round((typeSum / pairs) * 1000) / 1000;
      report.crossApp.push({ name: `palette-consistency${suffix}`, pass: palette >= THRESHOLDS.paletteConsistency, value: palette, threshold: THRESHOLDS.paletteConsistency });
      report.crossApp.push({ name: `type-consistency${suffix}`, pass: type >= THRESHOLDS.typeConsistency, value: type, threshold: THRESHOLDS.typeConsistency });
    }
  }

  // Reference similarity is reported, never gated: a derived language should resemble, not match.
  const analysis = tpl.manifest.provenance.analysis;
  const refSamplesFile = analysis ? join(paths.root, analysis, "..", "reference", "samples.json") : "";
  if (refSamplesFile && existsSync(refSamplesFile)) {
    const refTop = topColors(readJson<StyleSample[]>(refSamplesFile));
    const meanDelta = refTop.reduce((sum, c) => sum + nearest(c, palette).delta, 0) / Math.max(1, refTop.length);
    report.crossApp.push({ name: "reference-palette-distance", pass: true, value: Math.round(meanDelta * 100) / 100, detail: "mean ΔE2000 from the reference's top colors to the template palette (reported, not gated)" });
    if (allSamples.length) {
      // What the agents built, against the reference: how much of the reference's main type sizes, radii and
      // spacing the output uses. Low means the language did not carry over; everything at 1 with palette distance
      // 0 is worth a look for copying.
      const ref = readJson<StyleSample[]>(refSamplesFile);
      const outTop = topColors(allSamples);
      const outDelta = refTop.reduce((sum, c) => sum + nearest(c, outTop).delta, 0) / Math.max(1, refTop.length);
      report.crossApp.push({ name: "reference-output-palette-distance", pass: true, value: Math.round(outDelta * 100) / 100, detail: "mean ΔE2000 from the reference's top colors to the built apps' top colors (reported)" });
      for (const key of ["fontSize", "radius", "spacing"] as const) {
        const value = Math.round(shareOnScale(mergeHist(allSamples, key), mainValues(mergeHist(ref, key))) * 1000) / 1000;
        report.crossApp.push({ name: `reference-${key}-overlap`, pass: true, value, detail: `share of the built apps' ${key} values within 1px of the reference's main values (reported)` });
      }
    }
  }


  for (const r of report.runs) for (const g of r.gates) g.gating = GATING_CHECKS.has(g.name);
  for (const g of report.crossApp) g.gating = false;
  const failed = report.runs.flatMap((r) => r.gates.map((g) => ({ ...g, app: r.app }))).filter((g) => !g.pass && g.gating);
  for (const g of failed) report.reasons.push(`${g.app}: ${g.name} = ${g.value} (needs ${g.threshold ?? "pass"})`);
  report.verdict = failed.length || report.runs.length < apps.length * samples + holdouts.length ? "fail" : "pending-review";

  const parsed = EvalReport.parse(report);
  writeJson(join(dir, `eval-${iteration}.json`), parsed);
  writeText(join(dir, `eval-${iteration}.md`), renderMarkdown(parsed));
  writeText(join(dir, `review-${iteration}.html`), renderReviewPage(parsed, id, version));
  ok(`${id}@${version} iteration ${iteration}: ${parsed.verdict} → ${rel(join(dir, `eval-${iteration}.md`))}`);
  if (parsed.verdict === "pending-review") console.log(`  next: pnpm harness review ${id}@${version}${scope === "holdout" ? " --holdout" : ""}`);
  return parsed;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** A failed gating check fails the run; a failed reported check is evidence for the review. */
function checkResult(g: EvalReport["crossApp"][number]): string {
  if (g.pass) return "pass";
  return g.gating === false ? "below (reported)" : "**FAIL**";
}

function renderMarkdown(r: EvalReport): string {
  const lines = [`# ${r.template}@${r.version} — evaluation ${r.iteration}`, "", `Verdict: **${r.verdict}** · ${r.evaluatedAt}`, ""];
  for (const run of r.runs) {
    lines.push(`## ${run.app} (${run.runId})`, "", "| Gate | Result | Value | Threshold |", "| --- | --- | --- | --- |");
    for (const g of run.gates) lines.push(`| ${g.name} | ${checkResult(g)} | ${g.value ?? ""} | ${g.threshold ?? ""} |`);
    lines.push("");
  }
  if (r.layout?.length) {
    lines.push("## Measured layout (reported, for the critic)", "");
    for (const l of r.layout) lines.push(`- ${l.app} ${l.runId} ${l.route} ${l.viewport}: ${l.kind} — ${l.where} ${l.detail}`.trim());
    lines.push("");
  }
  if (r.crossApp.length) {
    lines.push("## Cross-app and reference", "", "| Check | Result | Value | Threshold |", "| --- | --- | --- | --- |");
    for (const g of r.crossApp) lines.push(`| ${g.name} | ${checkResult(g)} | ${g.value ?? ""} | ${g.threshold ?? "reported"} |`);
    lines.push("");
  }
  if (r.review) {
    lines.push(`Review: ${r.review.status}, ${r.review.covered} of ${r.review.items} checklist items covered by ${r.review.reviewers} reviewer(s) in ${r.review.minutes} min`, "");
  }
  if (r.critic?.overrides?.length) {
    lines.push("## Severity overrides", "", ...r.critic.overrides.map((o) => `- ${o.from} → ${o.to}: ${o.summary} — ${o.reason} (${o.at})`), "");
  }
  if (r.critic?.mode === "quality") {
    const c = r.critic;
    lines.push("## Quality against the reference", "", "| Area | Score | Bar |", "| --- | --- | --- |");
    for (const a of ["referenceFidelity", "signature", "crossAppConsistency", "hierarchy", "spacingRhythm", "componentStates", "polish"] as const) {
      lines.push(`| ${a} | ${c[a] ?? "-"} | ${a === "referenceFidelity" || a === "signature" ? QUALITY_BAR[a] : QUALITY_BAR.other} |`);
    }
    lines.push("", ...c.notes.map((n) => `> ${n}`), "");
  }
  if (r.critic?.findings) {
    lines.push("## Critic findings", "", "| Kind | Severity | Area | Samples | Finding |", "| --- | --- | --- | --- | --- |");
    const order = { blocker: 0, major: 1, minor: 2 } as const;
    for (const f of [...r.critic.findings].sort((a, b) => order[a.severity] - order[b.severity])) {
      const kind = f.kind === "defect" ? (promptInduced(f) ? "defect (prompt-induced)" : "defect (agent, not counted)") : (f.kind ?? "");
      lines.push(`| ${kind} | ${f.severity}${!f.kind && f.specCaused ? " (spec)" : ""} | ${f.area} | ${f.samples} of ${f.of} | ${f.summary.replaceAll("|", "/")} |`);
    }
    lines.push("");
  } else if (r.critic) {
    lines.push("## Critic", "", "```json", JSON.stringify(r.critic, null, 2), "```", "");
  }
  if (r.reasons.length) lines.push("## Reasons", "", ...r.reasons.map((x) => `- ${x}`), "");
  return lines.join("\n");
}

/** A static page for the human review: every app's screenshots side by side, plus the gate table. */
function renderReviewPage(r: EvalReport, id: string, version: string): string {
  const dir = runsDir(id, version);
  const rows = r.runs
    .map((run) => {
      const runDir = join(dir, run.app, run.runId);
      const shots = existsSync(join(runDir, "shots.json")) ? readJson<ShotResult>(join(runDir, "shots.json")).screenshots : [];
      const imgs = shots
        .filter((s) => s.viewport === "desktop" || s.scheme === "light")
        .map((s) => `<figure><img loading="lazy" src="${run.app}/${run.runId}/${s.file}" alt="${run.app} ${s.route} ${s.viewport} ${s.scheme}"><figcaption>${s.route} · ${s.viewport} · ${s.scheme}</figcaption></figure>`)
        .join("");
      const gates = run.gates.map((g) => `<li class="${g.pass ? "pass" : "fail"}">${g.name}: ${g.value ?? ""}</li>`).join("");
      const motion = (existsSync(join(runDir, "shots.json")) ? readJson<ShotResult>(join(runDir, "shots.json")).motion?.frames ?? [] : [])
        .map((f) => `<figure><img loading="lazy" src="${run.app}/${run.runId}/${f}" alt="${run.app} motion"><figcaption>motion</figcaption></figure>`)
        .join("");
      return `<section><h2>${run.app}</h2><ul>${gates}</ul><div class="grid">${imgs}${motion}</div></section>`;
    })
    .join("");
  return `<!doctype html><meta charset="utf-8"><title>${id}@${version} review ${r.iteration}</title>
<style>body{font:14px system-ui;margin:32px;background:#faf9f6;color:#0e0e0c}h1{font-size:28px}section{margin:48px 0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}figure{margin:0}img{width:100%;border:1px solid #ddd;border-radius:8px}
figcaption{font:12px ui-monospace,monospace;color:#555;margin-top:4px}li.fail{color:#c42b2b;font-weight:600}li.pass{color:#11713a}</style>
<h1>${id}@${version} — review ${r.iteration}</h1><p>Verdict: <strong>${r.verdict}</strong></p>${rows}`;
}

export interface OverrideRequest {
  /** Text that identifies one finding (a substring of its summary). */
  match: string;
  to: "blocker" | "major" | "minor";
  reason: string;
}

/** Applies severity overrides to a critic file's findings and records each one. Refuses a vague match. */
export function applyOverrides(critic: CriticScores, requests: OverrideRequest[], at = timestamp()): CriticScores {
  if (!requests.length) return critic;
  const findings = [...(critic.findings ?? [])];
  const overrides = [...(critic.overrides ?? [])];
  for (const req of requests) {
    if (!req.reason.trim()) throw new Error(`override "${req.match}": a reason is required`);
    const hits = findings.map((f, i) => [f, i] as const).filter(([f]) => f.summary.toLowerCase().includes(req.match.toLowerCase()));
    if (hits.length !== 1) throw new Error(`override "${req.match}" matches ${hits.length} findings — use a phrase from exactly one summary`);
    const [f, i] = hits[0]!;
    overrides.push({ summary: f.summary, from: f.severity, to: req.to, reason: req.reason, at });
    findings[i] = { ...f, severity: req.to };
  }
  return { ...critic, findings, overrides };
}

/** The evaluation file a critic file belongs to: the latest one of its scope. */
function latestEvalFile(id: string, version: string, scope: "main" | "holdout"): string | null {
  const dir = runsDir(id, version);
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => /^eval-\d+\.json$/.test(f)).sort((a, b) => parseInt(b.slice(5)) - parseInt(a.slice(5))) : [];
  for (const f of files) if (evalScope(EvalReport.parse(readJson(join(dir, f)))) === scope) return join(dir, f);
  return null;
}

/**
 * Merges a critic file into the latest evaluation of its scope and settles the verdict. Severity changes go
 * through `overrides` (recorded in the file and the report), never by editing the critic file.
 */
export function mergeCritic(
  id: string,
  version: string,
  criticFile: string,
  options: { holdout?: boolean; overrides?: OverrideRequest[]; review?: EvalReport["review"] } = {},
): EvalReport {
  const scope = options.holdout ? "holdout" : "main";
  const file = latestEvalFile(id, version, scope);
  if (!file) fail(`no ${scope} evaluation yet — run pnpm harness evaluate${options.holdout ? " --holdout" : ""} first`);
  const report = EvalReport.parse(readJson(file));
  const critic = applyOverrides(CriticScores.parse(readJson(criticFile)), options.overrides ?? []);
  if (options.overrides?.length) writeJson(criticFile, critic);
  report.critic = critic;
  if (options.review) report.review = options.review;
  // A critic merged earlier may have failed the report: only the gates' own reasons say whether the gates failed,
  // so merging again (after an override, or a rerun review) judges the new critic on its own.
  report.reasons = report.reasons.filter((r) => !r.startsWith("critic"));
  const gatesOk = report.reasons.length === 0;
  const judged = judgeCritic(critic);
  report.reasons.push(...judged.reasons);
  report.verdict = gatesOk && judged.ok ? "pass" : "fail";
  writeJson(file, EvalReport.parse(report));
  writeText(file.replace(/\.json$/, ".md"), renderMarkdown(report));
  ok(`critic merged into ${scope} evaluation ${report.iteration}: ${judged.summary} → ${report.verdict}`);
  return report;
}

/**
 * The critic's part of the verdict. With findings: no blocker, and no major the prompt causes — one that recurs
 * (2+ samples), that the spec causes, or that can't yet be told from chance because there is one sample. A major
 * seen only on the holdout apps (one run each) counts only when the spec causes it. Minors never fail a
 * candidate. Older critic files without findings fall back to the score bar.
 */
export function judgeCritic(critic: CriticScores): { ok: boolean; summary: string; reasons: string[] } {
  if (critic.mode === "quality") return judgeQuality(critic);
  if (critic.findings) {
    const blockers = critic.findings.filter((f) => f.severity === "blocker");
    const gatingMajors = critic.findings.filter((f) => f.severity === "major" && (f.specCaused || (!f.holdoutOnly && (f.samples >= 2 || f.of === 1))));
    const minors = critic.findings.filter((f) => f.severity === "minor");
    const reasons = [...blockers.map((f) => `critic blocker: ${f.summary}`), ...gatingMajors.map((f) => `critic major (${f.samples} of ${f.of}${f.specCaused ? ", spec" : ""}): ${f.summary}`)];
    return {
      ok: blockers.length === 0 && gatingMajors.length === 0,
      summary: `${blockers.length} blocker(s), ${gatingMajors.length} gating major(s), ${minors.length} minor(s)`,
      reasons,
    };
  }
  const scores = [critic.referenceFidelity, critic.crossAppConsistency, critic.hierarchy, critic.spacingRhythm, critic.componentStates, critic.polish, critic.signature].filter(
    (s): s is number => typeof s === "number",
  );
  const avg = scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length);
  const min = Math.min(...scores);
  const ok = scores.length > 0 && avg >= 4 && min >= 3;
  return { ok, summary: `average ${avg.toFixed(2)}, lowest ${min}`, reasons: ok ? [] : [`critic: average ${avg.toFixed(2)} (needs 4.0), lowest ${min} (needs 3)`] };
}

/** A defect counts against the prompt only when the spec's own words lead agents to it, quoted as evidence. */
export function promptInduced(f: CriticFinding): boolean {
  return f.kind === "defect" && f.specCaused && !!f.specRule?.trim() && f.severity !== "minor";
}

/**
 * The quality verdict: the typical sample comes close to the reference's design quality (QUALITY_BAR), and no
 * blocker or major defect is induced by the prompt. Gaps lower the scores and go to the author; defects the agent
 * made on its own are recorded and never count.
 */
export function judgeQuality(critic: CriticScores): { ok: boolean; summary: string; reasons: string[] } {
  const areas = ["referenceFidelity", "signature", "crossAppConsistency", "hierarchy", "spacingRhythm", "componentStates", "polish"] as const;
  const reasons: string[] = [];
  for (const area of areas) {
    const value = critic[area];
    const bar = area === "referenceFidelity" || area === "signature" ? QUALITY_BAR[area] : QUALITY_BAR.other;
    if (typeof value !== "number") reasons.push(`critic quality: no ${area} score`);
    else if (value < bar) reasons.push(`critic quality: ${area} ${value} (needs ${bar})`);
  }
  const findings = critic.findings ?? [];
  const induced = findings.filter(promptInduced);
  reasons.push(...induced.map((f) => `critic defect induced by the prompt (${f.severity}): ${f.summary}`));
  const gaps = findings.filter((f) => f.kind !== "defect").length;
  const agentDefects = findings.filter((f) => f.kind === "defect" && !promptInduced(f)).length;
  const scores = areas.map((a) => `${a} ${critic[a] ?? "-"}`).join(", ");
  return {
    ok: reasons.length === 0,
    summary: `${scores}; ${gaps} gap(s), ${induced.length} prompt-induced defect(s), ${agentDefects} agent defect(s) not counted`,
    reasons,
  };
}
