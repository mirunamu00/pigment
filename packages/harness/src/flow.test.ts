import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { setupChecks } from "./commands/flow.ts";

test("flow: a setup passes only when the project keeps the spec and points at it", () => {
  const work = mkdtempSync(join(tmpdir(), "flow-"));
  mkdirSync(join(work, "design-system"));
  writeFileSync(join(work, "design-system", "VERSION"), "demo, updated 2026-10-27\n");
  writeFileSync(join(work, "design-system", "tokens.css"), ":root { --color-text: #000; }");
  writeFileSync(join(work, "CLAUDE.md"), "UI work follows design-system/ - read it first.\n");
  writeFileSync(join(work, "AGENTS.md"), "UI work follows design-system/agent.md - read it first.\n");
  let failed = setupChecks(work, 1000).filter((c) => !c.pass).map((c) => c.name);
  assert.deepEqual(failed, ["spec kept", "CLAUDE.md points at the spec"]);

  writeFileSync(join(work, "design-system", "agent.md"), "x".repeat(1000));
  writeFileSync(join(work, "CLAUDE.md"), "UI work follows design-system/agent.md - read it first.\n");
  failed = setupChecks(work, 1000).filter((c) => !c.pass).map((c) => c.name);
  assert.deepEqual(failed, []);
});
