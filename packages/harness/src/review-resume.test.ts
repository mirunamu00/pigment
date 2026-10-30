import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertReviewResume, reviewInputs } from "./review/resume.ts";
import { isQuotaFailure } from "./review/run.ts";

test("review defers quota exhaustion rather than treating transient errors as exhausted quota", () => {
  assert.equal(isQuotaFailure("You’ve hit your usage limit. Try again at 8:45 PM."), true);
  assert.equal(isQuotaFailure("insufficient_quota"), true);
  assert.equal(isQuotaFailure("429 rate limit exceeded; retry shortly"), false);
  assert.equal(isQuotaFailure("connection closed"), false);
});

test("review resume detects changed evidence even at the same paths", (t) => {
  const prefix = join(tmpdir(), "pigment-review-resume-");
  const dir = mkdtempSync(prefix);
  t.after(() => { assert.ok(dir.startsWith(prefix)); rmSync(dir, { recursive: true, force: true }); });
  const file = join(dir, "evidence.txt");
  writeFileSync(file, "original pixels");
  const before = reviewInputs({ prompt: "original" }, [file]);
  const identity = { plan: { items: ["home"] }, execution: { model: "current" } };
  const previous = { ...identity, inputs: before, planMtime: 0 };
  assert.doesNotThrow(() => assertReviewResume(previous, { ...identity, inputs: reviewInputs({ prompt: "original" }, [file]) }));
  writeFileSync(file, "different pixels");
  assert.throws(() => assertReviewResume(previous, { ...identity, inputs: reviewInputs({ prompt: "original" }, [file]) }), /evidence or prompts changed/);
  assert.throws(() => assertReviewResume(previous, { ...identity, inputs: reviewInputs({ prompt: "new rules" }, [file]) }), /evidence or prompts changed/);
});

test("review resume rejects changed coverage and execution conditions", () => {
  const base = { plan: { items: ["home"] }, execution: { agent: "codex", model: "m", reasoningEffort: "low" }, inputs: { hash: "same", newestMtime: 1 } };
  const previous = { ...base, planMtime: 2 };
  assert.throws(() => assertReviewResume(previous, { ...base, plan: { items: ["home", "settings"] } }), /plan or provider/);
  assert.throws(() => assertReviewResume(previous, { ...base, execution: { ...base.execution, model: "other" } }), /plan or provider/);
  assert.throws(() => assertReviewResume(previous, { ...base, execution: { ...base.execution, reasoningEffort: "high" } }), /plan or provider/);
});

test("older review records can resume only when all evidence predates their saved plan", () => {
  const identity = { plan: {}, execution: { model: "m" } };
  const previous = { ...identity, planMtime: 100 };
  assert.doesNotThrow(() => assertReviewResume(previous, { ...identity, inputs: { hash: "new", newestMtime: 90 } }));
  assert.throws(() => assertReviewResume(previous, { ...identity, inputs: { hash: "new", newestMtime: 101 } }), /evidence or prompts changed/);
});
