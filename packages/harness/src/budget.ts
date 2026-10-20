import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { AppId, type EvalReport } from "@pigment/schema";
import { holdoutApps } from "./appdir.ts";
import { paths } from "./paths.ts";
import { readJson } from "./util.ts";

/**
 * When to stop making candidates. Another candidate after a pass only draws a new sample with new small
 * flaws: it never converges. Spend is recorded for the report; it decides nothing.
 */
/** Candidates per version family: the first one plus three fix iterations. */
export const MAX_CANDIDATES = 4;
/** Samples a candidate passes on before it may be published: the screen run plus two more. */
export const CONFIRM_SAMPLES = 3;

/** "1.1.0-rc.3" → "1.1.0": the candidates of one version share a family. */
export function versionFamily(version: string): string {
  return version.split("-")[0]!;
}

/** Compares the x.y.z cores of two versions. */
export function compareCore(a: string, b: string): number {
  const pa = versionFamily(a).split(".").map(Number);
  const pb = versionFamily(b).split(".").map(Number);
  for (let i = 0; i < 3; i++) if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  return 0;
}

/** "1.1.0-rc.3" → 3; a final version → null. */
export function candidateNumber(version: string): number | null {
  const m = /-rc\.(\d+)$/.exec(version);
  return m ? Number(m[1]) : null;
}

/** Template versions that have runs, in the same family as `version`. */
export function familyVersions(id: string, version: string, runsRoot = paths.runs): string[] {
  const dir = join(runsRoot, id);
  if (!existsSync(dir)) return [];
  const family = versionFamily(version);
  return readdirSync(dir).filter((v) => versionFamily(v) === family);
}

interface AgentMeta {
  costUsd?: number;
  durationMs?: number;
}

/** What one version's agent runs cost so far. */
export function versionCost(id: string, version: string, runsRoot = paths.runs): { usd: number; runs: number; minutes: number } {
  const dir = join(runsRoot, id, version);
  const total = { usd: 0, runs: 0, minutes: 0 };
  if (!existsSync(dir)) return total;
  for (const app of readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const run of readdirSync(join(dir, app.name), { withFileTypes: true }).filter((d) => d.isDirectory())) {
      const file = join(dir, app.name, run.name, "agent-meta.json");
      if (!existsSync(file)) continue;
      const meta = readJson<AgentMeta>(file);
      total.usd += meta.costUsd ?? 0;
      total.minutes += (meta.durationMs ?? 0) / 60_000;
      total.runs++;
    }
  }
  return total;
}

export interface FamilyCost {
  family: string;
  usd: number;
  runs: number;
  minutes: number;
}

/** Spend across every candidate of a version family (reported, never a limit). */
export function familyCost(id: string, version: string, runsRoot = paths.runs): FamilyCost {
  const total = { usd: 0, runs: 0, minutes: 0 };
  for (const v of familyVersions(id, version, runsRoot)) {
    const c = versionCost(id, v, runsRoot);
    total.usd += c.usd;
    total.runs += c.runs;
    total.minutes += c.minutes;
  }
  return { family: versionFamily(version), ...total };
}

export type EvalScope = "main" | "holdout";

/** What an evaluation covers: the main apps (screen and confirm) or only the holdout apps (the final check). */
export function evalScope(report: EvalReport): EvalScope {
  if (report.scope) return report.scope;
  return report.runs.length > 0 && report.runs.every((r) => !AppId.safeParse(r.app).success) ? "holdout" : "main";
}

/** The latest evaluation of a version for one scope (the main apps by default), if any. */
export function latestEval(id: string, version: string, runsRoot = paths.runs, scope: EvalScope = "main"): EvalReport | null {
  const dir = join(runsRoot, id, version);
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir)
    .filter((f) => /^eval-\d+\.json$/.test(f))
    .sort((a, b) => parseInt(b.slice(5)) - parseInt(a.slice(5)));
  for (const f of files) {
    const report = readJson<EvalReport>(join(dir, f));
    if (evalScope(report) === scope) return report;
  }
  return null;
}

/**
 * Where a candidate stands. The main apps come first: a screen on one sample, then a confirm on three. Only a
 * candidate that passed the confirm gets the final check on the holdout apps, which it must pass to be published.
 */
export type CandidateStage = "screen" | "confirm" | "holdout" | "done" | "failed";

export function candidateStage(id: string, version: string, runsRoot = paths.runs, hasHoldouts = holdoutApps().length > 0): { stage: CandidateStage; samples: number } {
  const main = latestEval(id, version, runsRoot, "main");
  if (!main) return { stage: "screen", samples: 0 };
  const perApp = new Map<string, number>();
  // Samples count the main apps only: an older evaluation may also hold one run of each holdout app.
  const holdouts = new Set(holdoutApps());
  for (const r of main.runs) if (!holdouts.has(r.app)) perApp.set(r.app, (perApp.get(r.app) ?? 0) + 1);
  const samples = perApp.size ? Math.min(...perApp.values()) : 0;
  if (main.verdict !== "pass") return { stage: main.verdict === "fail" ? "failed" : samples >= CONFIRM_SAMPLES ? "confirm" : "screen", samples };
  if (samples < CONFIRM_SAMPLES) return { stage: "confirm", samples };
  if (!hasHoldouts) return { stage: "done", samples };
  const holdout = latestEval(id, version, runsRoot, "holdout");
  if (!holdout || holdout.verdict === "pending-review") return { stage: "holdout", samples };
  return { stage: holdout.verdict === "pass" ? "done" : "failed", samples };
}

/** Candidates of the family that passed their latest main evaluation, with the stage they reached. */
export function passedCandidates(id: string, version: string, runsRoot = paths.runs, hasHoldouts = holdoutApps().length > 0): Array<{ version: string; samples: number; stage: CandidateStage }> {
  const out: Array<{ version: string; samples: number; stage: CandidateStage }> = [];
  for (const v of familyVersions(id, version, runsRoot)) {
    const main = latestEval(id, v, runsRoot, "main");
    if (main?.verdict !== "pass") continue;
    const { stage, samples } = candidateStage(id, v, runsRoot, hasHoldouts);
    if (stage === "failed") continue;
    out.push({ version: v, samples, stage });
  }
  return out;
}

function nextStep(id: string, p: { version: string; samples: number; stage: CandidateStage }): string {
  if (p.stage === "done") return `${id}@${p.version} passed the confirm and the holdout check. Offer it for publishing and list its leftover flaws`;
  if (p.stage === "holdout") return `${id}@${p.version} passed the confirm on ${p.samples} samples. Run its holdout check (generate --holdout, evaluate --holdout, review --holdout)`;
  return `${id}@${p.version} passed the screen. Confirm it (generate --samples 2, evaluate --samples 3, review)`;
}

/**
 * Why a new candidate must not be made, or null. A passed candidate means: finish it (confirm, holdout check,
 * publish), and the iteration cap means: stop and report.
 */
export function candidateBlock(id: string, version: string, runsRoot = paths.runs, hasHoldouts = holdoutApps().length > 0): string | null {
  const passed = passedCandidates(id, version, runsRoot, hasHoldouts).filter((p) => p.version !== version);
  const order: CandidateStage[] = ["done", "holdout", "confirm", "screen"];
  const best = passed.sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage))[0];
  if (best) return `${nextStep(id, best)} instead of making another candidate (--after-pass if the user asked for one).`;
  const n = candidateNumber(version);
  if (n !== null && n > MAX_CANDIDATES) {
    return `candidate ${n} is past the cap of ${MAX_CANDIDATES} (the first plus three fix iterations). Stop and report the failure analysis to the user; go on only when they ask (--past-cap).`;
  }
  return null;
}

/**
 * Why a generation must not start, or null. Main-app runs stop once a candidate has three passing samples;
 * holdout runs start only then.
 */
export function generationBlock(id: string, version: string, runsRoot = paths.runs, kind: EvalScope = "main", hasHoldouts = holdoutApps().length > 0): string | null {
  const passed = passedCandidates(id, version, runsRoot, hasHoldouts);
  const self = passed.find((p) => p.version === version);
  if (kind === "holdout") {
    if (!self || self.stage === "screen" || self.stage === "confirm") {
      return `${id}@${version} has not passed the confirm on ${CONFIRM_SAMPLES} samples of the main apps — the holdout check comes after that.`;
    }
    if (self.stage === "done") return `${id}@${version} already passed the holdout check — publish it.`;
    return null;
  }
  const other = passed.find((p) => p.version !== version);
  if (other) return `${nextStep(id, other)} instead of generating more (--after-pass if the user asked for this run).`;
  if (self && self.samples >= CONFIRM_SAMPLES) return `${nextStep(id, self)} — no more main-app samples are needed (--after-pass if the user asked for this run).`;
  if (self && !directionApproved(id, version, runsRoot)) {
    return `${id}@${version} passed the screen; the user approves its direction against the reference before the confirm — show them review-*/direction.html, then pnpm harness direction ${id}@${version} --approved-by "<name>".`;
  }
  return null;
}

/** The user's approval of a screened candidate's direction (its look against the reference), before the confirm. */
export interface DirectionApproval {
  approvedBy: string;
  at: string;
  note?: string;
}

export function directionFile(id: string, version: string, runsRoot = paths.runs): string {
  return join(runsRoot, id, version, "direction.json");
}

export function directionApproved(id: string, version: string, runsRoot = paths.runs): boolean {
  return existsSync(directionFile(id, version, runsRoot));
}
