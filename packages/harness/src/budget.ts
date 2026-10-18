import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { EvalReport } from "@pigment/schema";
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

/** Why a generation must not start, or null: a candidate of the family already passed. */
export function generationBlock(id: string, version: string, runsRoot = paths.runs): string | null {
  const passed = passedCandidates(id, version, runsRoot);
  const other = passed.find((p) => p.samples >= CONFIRM_SAMPLES && p.version !== version) ?? passed.find((p) => p.version !== version);
  if (other) {
    return other.samples >= CONFIRM_SAMPLES
      ? `${id}@${other.version} already passed on ${other.samples} samples — publish it instead of generating more (--after-pass if the user asked for this run).`
      : `${id}@${other.version} passed the screen — confirm that candidate instead (--after-pass if the user asked for this run).`;
  }
  const self = passed.find((p) => p.version === version);
  if (self && self.samples >= CONFIRM_SAMPLES) return `${id}@${version} already passed on ${self.samples} samples — nothing left to confirm (--after-pass if the user asked for this run).`;
  return null;
}
