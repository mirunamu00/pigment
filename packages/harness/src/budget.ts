import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { EvalReport } from "@pigment/schema";
import { paths } from "./paths.ts";
import { readJson } from "./util.ts";

/**
 * Agent runs are the expensive part of the pipeline: each one is a coding agent restyling a whole app. These
 * limits stop the loop that burned most of a week's budget: fixing small flaws of a candidate that had
 * already passed, one more sample at a time.
 */
export const BUDGET_USD = { newTemplate: 150, update: 60 };
/** Candidates per version family: the first one plus three fix iterations. */
export const MAX_CANDIDATES = 4;
/** Samples a candidate passes on before it may be published: the screen run plus two more. */
export const CONFIRM_SAMPLES = 3;
/** Used to estimate a generation before any run of the template exists. */
const FALLBACK_RUN_USD = 6;

/** "1.1.0-rc.3" → "1.1.0": the candidates of one version share a family, and a budget. */
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
  budgetUsd: number;
  /** Mean cost of one agent run of this template (all versions), for estimates. */
  perRunUsd: number;
}

/** Spend across every candidate of a version family, against its budget. */
export function familyCost(id: string, version: string, runsRoot = paths.runs, publishedFile = paths.published): FamilyCost {
  const total = { usd: 0, runs: 0, minutes: 0 };
  for (const v of familyVersions(id, version, runsRoot)) {
    const c = versionCost(id, v, runsRoot);
    total.usd += c.usd;
    total.runs += c.runs;
    total.minutes += c.minutes;
  }
  const all = { usd: 0, runs: 0 };
  const dir = join(runsRoot, id);
  for (const v of existsSync(dir) ? readdirSync(dir) : []) {
    const c = versionCost(id, v, runsRoot);
    all.usd += c.usd;
    all.runs += c.runs;
  }
  // An update when an earlier version of the template is published; the family that became the first published
  // version was a new template.
  const published = existsSync(publishedFile) ? Object.keys(readJson<Record<string, string>>(publishedFile)) : [];
  const isUpdate = published.some((ref) => ref.startsWith(`${id}@`) && compareCore(ref.slice(id.length + 1), version) < 0);
  return {
    family: versionFamily(version),
    ...total,
    budgetUsd: isUpdate ? BUDGET_USD.update : BUDGET_USD.newTemplate,
    perRunUsd: all.runs ? all.usd / all.runs : FALLBACK_RUN_USD,
  };
}

/** The latest evaluation of a version, if any. */
export function latestEval(id: string, version: string, runsRoot = paths.runs): EvalReport | null {
  const dir = join(runsRoot, id, version);
  if (!existsSync(dir)) return null;
  const last = readdirSync(dir)
    .filter((f) => /^eval-\d+\.json$/.test(f))
    .sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)))
    .at(-1);
  return last ? readJson<EvalReport>(join(dir, last)) : null;
}

/** Candidates of the family whose latest evaluation passed (gates and critic). */
export function passedCandidates(id: string, version: string, runsRoot = paths.runs): Array<{ version: string; samples: number }> {
  const out: Array<{ version: string; samples: number }> = [];
  for (const v of familyVersions(id, version, runsRoot)) {
    const report = latestEval(id, v, runsRoot);
    if (report?.verdict !== "pass") continue;
    const perApp = new Map<string, number>();
    for (const r of report.runs) perApp.set(r.app, (perApp.get(r.app) ?? 0) + 1);
    out.push({ version: v, samples: perApp.size ? Math.min(...perApp.values()) : 0 });
  }
  return out;
}

/**
 * Why a new candidate must not be made, or null. A passed candidate means: publish it (leftover minor flaws are
 * the user's call, not another round), and the iteration cap means: stop and report.
 */
export function candidateBlock(id: string, version: string, runsRoot = paths.runs): string | null {
  const passed = passedCandidates(id, version, runsRoot).filter((p) => p.version !== version);
  const confirmed = passed.find((p) => p.samples >= CONFIRM_SAMPLES);
  if (confirmed) {
    return `${id}@${confirmed.version} passed on ${confirmed.samples} samples. Offer it for publishing and list its leftover flaws; make another candidate only when the user asks for one (--after-pass).`;
  }
  const screened = passed.at(-1);
  if (screened) {
    return `${id}@${screened.version} passed the screen. Confirm it (generate --samples 2, evaluate --samples 3) instead of making another candidate (--after-pass if the user asked for one).`;
  }
  const n = candidateNumber(version);
  if (n !== null && n > MAX_CANDIDATES) {
    return `candidate ${n} is past the cap of ${MAX_CANDIDATES} (the first plus three fix iterations). Stop and report the failure analysis to the user; go on only when they ask (--past-cap).`;
  }
  return null;
}

/**
 * Why a generation must not start, or null: the family's budget would be exceeded, or more samples of an
 * already-confirmed candidate were requested.
 */
export function generationBlock(id: string, version: string, plannedRuns: number, runsRoot = paths.runs, publishedFile = paths.published): string | null {
  const passed = passedCandidates(id, version, runsRoot);
  const other = passed.find((p) => p.samples >= CONFIRM_SAMPLES && p.version !== version) ?? passed.find((p) => p.version !== version);
  if (other) {
    return other.samples >= CONFIRM_SAMPLES
      ? `${id}@${other.version} already passed on ${other.samples} samples — publish it instead of generating more (--after-pass if the user asked for this run).`
      : `${id}@${other.version} passed the screen — confirm that candidate instead (--after-pass if the user asked for this run).`;
  }
  const self = passed.find((p) => p.version === version);
  if (self && self.samples >= CONFIRM_SAMPLES) return `${id}@${version} already passed on ${self.samples} samples — nothing left to confirm (--after-pass if the user asked for this run).`;
  const cost = familyCost(id, version, runsRoot, publishedFile);
  const estimate = plannedRuns * cost.perRunUsd;
  if (cost.usd + estimate > cost.budgetUsd) {
    return `the ${cost.family} family has spent $${cost.usd.toFixed(0)} of its $${cost.budgetUsd} budget over ${cost.runs} runs, and this generation adds about $${estimate.toFixed(0)} (${plannedRuns} runs × $${cost.perRunUsd.toFixed(1)}). Ask the user before going over (--over-budget).`;
  }
  return null;
}
