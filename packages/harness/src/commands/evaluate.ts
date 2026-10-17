import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CriticScores, EvalReport, type AppId } from "@pigment/schema";
import { e2e } from "../appdir.ts";
import { distance, isMostlyOpaque, nearest, toHex } from "../color.ts";
import type { StyleSample } from "../extract.ts";
import { paths, rel, runsDir } from "../paths.ts";
import { colorPalette, fontFamilies, loadTemplate, normalizeFamily, radiusSet } from "../template.ts";
import { fail, info, ok, readJson, timestamp, writeJson, writeText } from "../util.ts";
import type { ShotResult } from "./shoot.ts";

type Gate = EvalReport["runs"][number]["gates"][number];

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

export async function evaluate(id: string, version: string, options: { skipE2e?: boolean; samples?: number }): Promise<EvalReport> {
  const samples = Math.max(1, options.samples ?? 1);
  const tpl = loadTemplate(id, version);
  const palette = colorPalette(tpl);
  const radii = radiusSet(tpl);
  const families = new Set([...fontFamilies(tpl), "system-ui", "sans-serif", "serif", "monospace", "-apple-system"]);
  const dir = runsDir(id, version);
  const iteration = existsSync(dir) ? readdirSync(dir).filter((f) => /^eval-\d+\.json$/.test(f)).length + 1 : 1;
  const report: EvalReport = { template: id, version, iteration, evaluatedAt: timestamp(), runs: [], crossApp: [], verdict: "pending-review", reasons: [] };
  // Style samples per sample index and app, for cross-app consistency within each sample.
  const perSample: Array<Record<string, StyleSample[]>> = Array.from({ length: samples }, () => ({}));

  const apps = readdirSync(paths.baseApps).filter((a) => existsSync(join(paths.baseApps, a, "pigment.app.json"))) as AppId[];
  const pending: Array<{ app: AppId; runDir: string; k: number }> = [];
  for (const app of apps) {
    const runDirs = latestRuns(id, version, app, samples);
    if (runDirs.length < samples) report.reasons.push(`${app}: ${runDirs.length} of ${samples} sample(s)`);
    runDirs.forEach((runDir, k) => pending.push({ app, runDir, k }));
  }
  // Each app's newest run first: publishing takes an app's first listed run as its gallery capture.
  pending.sort((a, b) => a.k - b.k);
  for (const { app, runDir, k } of pending) {
    const run = readJson<{ runId: string; agentExitCode?: number | null; build?: { ok: boolean }; workDir: string }>(join(runDir, "run.json"));
    const gates: Gate[] = [];
    const metrics: Record<string, number> = {};
    gates.push({ name: "agent-finished", pass: run.agentExitCode === 0, value: run.agentExitCode ?? -1, threshold: 0 });
    gates.push({ name: "build", pass: !!run.build?.ok, value: !!run.build?.ok });

    if (run.build?.ok && existsSync(join(runDir, "shots.json"))) {
      const shots = readJson<ShotResult>(join(runDir, "shots.json"));
      const styleSamples = readJson<StyleSample[]>(join(runDir, "samples.json"));
      perSample[k]![app] = styleSamples;

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
    }
    report.runs.push({ runId: run.runId, app, gates, metrics });
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
  }

  const failed = [...report.runs.flatMap((r) => r.gates.map((g) => ({ ...g, app: r.app }))), ...report.crossApp.map((g) => ({ ...g, app: "cross-app" }))].filter((g) => !g.pass);
  for (const g of failed) report.reasons.push(`${g.app}: ${g.name} = ${g.value} (needs ${g.threshold ?? "pass"})`);
  report.verdict = failed.length || report.runs.length < apps.length * samples ? "fail" : "pending-review";

  const parsed = EvalReport.parse(report);
  writeJson(join(dir, `eval-${iteration}.json`), parsed);
  writeText(join(dir, `eval-${iteration}.md`), renderMarkdown(parsed));
  writeText(join(dir, `review-${iteration}.html`), renderReviewPage(parsed, id, version));
  ok(`${id}@${version} iteration ${iteration}: ${parsed.verdict} → ${rel(join(dir, `eval-${iteration}.md`))}`);
  if (parsed.verdict === "pending-review") console.log(`  next: run the design-critic agent, then pnpm harness critic ${id}@${version} <critic.json>`);
  return parsed;
}

function renderMarkdown(r: EvalReport): string {
  const lines = [`# ${r.template}@${r.version} — evaluation ${r.iteration}`, "", `Verdict: **${r.verdict}** · ${r.evaluatedAt}`, ""];
  for (const run of r.runs) {
    lines.push(`## ${run.app} (${run.runId})`, "", "| Gate | Result | Value | Threshold |", "| --- | --- | --- | --- |");
    for (const g of run.gates) lines.push(`| ${g.name} | ${g.pass ? "pass" : "**FAIL**"} | ${g.value ?? ""} | ${g.threshold ?? ""} |`);
    lines.push("");
  }
  if (r.crossApp.length) {
    lines.push("## Cross-app and reference", "", "| Check | Result | Value | Threshold |", "| --- | --- | --- | --- |");
    for (const g of r.crossApp) lines.push(`| ${g.name} | ${g.pass ? "pass" : "**FAIL**"} | ${g.value ?? ""} | ${g.threshold ?? "reported"} |`);
    lines.push("");
  }
  if (r.critic) {
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

/** Merges the design-critic's scores into the latest evaluation and settles the verdict. */
export function mergeCritic(id: string, version: string, criticFile: string): void {
  const dir = runsDir(id, version);
  const evals = existsSync(dir) ? readdirSync(dir).filter((f) => /^eval-\d+\.json$/.test(f)).sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5))) : [];
  if (!evals.length) fail("no evaluation yet — run pnpm harness evaluate first");
  const file = join(dir, evals[evals.length - 1]!);
  const report = EvalReport.parse(readJson(file));
  const critic = CriticScores.parse(readJson(criticFile));
  const scores = [critic.referenceFidelity, critic.crossAppConsistency, critic.hierarchy, critic.spacingRhythm, critic.componentStates, critic.polish, critic.signature ?? null].filter(
    (s): s is number => s !== null,
  );
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const min = Math.min(...scores);
  report.critic = critic;
  const gatesOk = report.verdict !== "fail";
  const criticOk = avg >= 4 && min >= 3;
  if (!criticOk) report.reasons.push(`critic: average ${avg.toFixed(2)} (needs 4.0), lowest ${min} (needs 3)`);
  report.verdict = gatesOk && criticOk ? "pass" : "fail";
  writeJson(file, EvalReport.parse(report));
  writeText(file.replace(/\.json$/, ".md"), renderMarkdown(report));
  ok(`critic merged: average ${avg.toFixed(2)}, lowest ${min} → ${report.verdict}`);
}
