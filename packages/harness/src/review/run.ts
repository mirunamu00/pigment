import { UnitReview, type ReviewItem } from "@pigment/schema";
import { paths } from "../paths.ts";
import { run } from "../util.ts";

/**
 * Reviewers are run by the harness, not handed to them by an orchestrator: the same prompt every time, read-only
 * tools, and an answer that is checked against the checklist before it counts.
 */
const READ_ONLY = ["Read", "Glob", "Grep"];
const DENIED = ["Write", "Edit", "Bash", "PowerShell", "WebFetch", "WebSearch", "NotebookEdit", "Task", "Agent"];
/** Every review runs on the same model, whatever the machine's default, so verdicts are comparable. */
export const REVIEW_MODEL = "opus";

export interface AgentAnswer {
  ok: boolean;
  text: string;
  durationMs: number;
  turns?: number;
  costUsd?: number;
  error?: string;
}

export async function runReadOnlyAgent(prompt: string, timeoutMs: number): Promise<AgentAnswer> {
  const args = ["-p", "--model", REVIEW_MODEL, "--output-format", "json", "--allowedTools", ...READ_ONLY, "--disallowedTools", ...DENIED];
  const r = await run("claude", args, { cwd: paths.root, input: prompt, timeoutMs, shell: false });
  try {
    const parsed = JSON.parse(r.stdout);
    return {
      ok: r.code === 0 && parsed?.is_error !== true,
      text: typeof parsed?.result === "string" ? parsed.result : "",
      durationMs: parsed?.duration_ms ?? r.durationMs,
      turns: parsed?.num_turns,
      costUsd: parsed?.total_cost_usd,
      error: parsed?.is_error ? String(parsed?.result ?? "agent error") : undefined,
    };
  } catch {
    return { ok: false, text: r.stdout, durationMs: r.durationMs, error: (r.stderr || r.stdout).slice(-500) || `exit ${r.code}` };
  }
}

/** The JSON object in an agent's answer: a fenced ```json block, else the outermost braces. */
export function extractJson(text: string): unknown {
  const fenced = [...text.matchAll(/```(?:json)?\s*\n([\s\S]*?)\n```/g)].map((m) => m[1]!).reverse();
  for (const block of fenced) {
    try {
      return JSON.parse(block);
    } catch {
      // try the next block
    }
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) return JSON.parse(text.slice(start, end + 1));
  throw new Error("no JSON object in the answer");
}

/** Notes that say nothing about what is on the screen. */
const EMPTY_NOTE = /^(ok|okay|fine|good|looks (good|fine|ok)|no issues?|n\/a|-|none|pass(es)?)\.?$/i;
/** Minors a unit may report: one per item, at most this many in all — a review lists, it does not hunt. */
export const UNIT_MINOR_CAP = 8;

export interface UnitCheck {
  review: UnitReview | null;
  /** Item ids with no usable line (missing, empty or contentless note). */
  missing: string[];
  problems: string[];
}

/** Checks a unit's answer against its checklist: every item answered with a note about what is visible. */
export function checkUnit(items: ReviewItem[], answer: unknown): UnitCheck {
  const parsed = UnitReview.safeParse(answer);
  if (!parsed.success) {
    return { review: null, missing: items.map((i) => i.id), problems: [`not a UnitReview: ${parsed.error.issues.slice(0, 3).map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`] };
  }
  const review = parsed.data;
  const problems: string[] = [];
  const ids = new Set(items.map((i) => i.id));
  const answered = new Map(review.items.map((i) => [i.id, i]));
  const unknown = review.items.filter((i) => !ids.has(i.id)).map((i) => i.id);
  if (unknown.length) problems.push(`unknown item ids: ${unknown.slice(0, 5).join(", ")}`);
  const missing = items
    .map((i) => i.id)
    .filter((id) => {
      const a = answered.get(id);
      return !a || a.note.trim().length < 12 || EMPTY_NOTE.test(a.note.trim());
    });
  if (missing.length) problems.push(`${missing.length} item(s) without a note about what is on them`);
  // Findings must point at checklist items; minors are capped.
  const findings = review.findings.map((f) => ({ ...f, items: (f.items ?? []).filter((id) => ids.has(id)) }));
  const minors = findings.filter((f) => f.severity === "minor");
  if (minors.length > UNIT_MINOR_CAP) problems.push(`${minors.length} minors, capped to ${UNIT_MINOR_CAP}`);
  const kept = [...findings.filter((f) => f.severity !== "minor"), ...minors.slice(0, UNIT_MINOR_CAP)];
  return { review: { items: review.items.filter((i) => ids.has(i.id)), findings: kept }, missing, problems };
}

/** Runs tasks with at most `limit` in flight, keeping their order in the result. */
export async function pool<T, R>(tasks: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(tasks.length);
  let next = 0;
  const worker = async () => {
    while (next < tasks.length) {
      const i = next++;
      out[i] = await fn(tasks[i]!);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(limit, tasks.length)) }, worker));
  return out;
}
