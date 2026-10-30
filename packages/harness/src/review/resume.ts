import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";

export interface ReviewInputs { hash: string; newestMtime: number }

/** Hash the actual evidence and generated prompts, not merely their paths. */
export function reviewInputs(identity: unknown, files: string[]): ReviewInputs {
  const hash = createHash("sha256").update(JSON.stringify(identity));
  let newestMtime = 0;
  for (const file of [...new Set(files)].sort()) {
    hash.update(file).update(readFileSync(file));
    newestMtime = Math.max(newestMtime, statSync(file).mtimeMs);
  }
  return { hash: hash.digest("hex"), newestMtime };
}

export function assertReviewResume(previous: { plan: unknown; execution: unknown; inputs?: ReviewInputs; planMtime: number }, current: { plan: unknown; execution: unknown; inputs: ReviewInputs }): void {
  if (JSON.stringify(previous.plan) !== JSON.stringify(current.plan) || JSON.stringify(previous.execution) !== JSON.stringify(current.execution)) {
    throw new Error("Cannot resume: review plan or provider/model/effort changed. Run a fresh review.");
  }
  if (previous.inputs ? previous.inputs.hash !== current.inputs.hash : current.inputs.newestMtime > previous.planMtime) {
    throw new Error("Cannot resume: review evidence or prompts changed. Run a fresh review.");
  }
}
