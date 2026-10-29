import assert from "node:assert/strict";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import { agentInvocation, parseAgentOutput, resolveExecution, selectCodexCommand } from "./agent-runtime.ts";
import { resolve } from "node:path";
import { run, type RunResult } from "./util.ts";

const result = (stdout: string, code = 0): RunResult => ({ stdout, code, stderr: "", durationMs: 1 });

test("Codex uses the nearest host executable instead of a stale PATH install", () => {
  const current = resolve("host with spaces", process.platform === "win32" ? "codex.exe" : "codex");
  assert.equal(selectCodexCommand({}, [process.execPath, current, resolve("older", "codex")]), current);
  assert.equal(selectCodexCommand({ PIGMENT_CODEX_BIN: current }, []), current);
  assert.throws(() => selectCodexCommand({ PIGMENT_CODEX_BIN: "relative/codex" }, []), /absolute/);
  assert.equal(selectCodexCommand({}, []), "codex");
  assert.equal(selectCodexCommand({}, ["codex", "somewhere/codex"]), "codex");
});

test("active host is used, and missing/ambiguous hosts or models never fall back", () => {
  assert.deepEqual(resolveExecution({ model: "codex-session-model", reasoningEffort: "low" }, { CODEX_THREAD_ID: "current" }), {
    agent: "codex", model: "codex-session-model", reasoningEffort: "low",
  });
  assert.equal(resolveExecution({ model: "claude-session-model" }, { CLAUDECODE: "1" }).agent, "claude");
  assert.throws(() => resolveExecution({ model: "some-model" }, {}), /active agent/);
  assert.throws(() => resolveExecution({}, { CODEX_THREAD_ID: "current" }), /No explicit model/);
  assert.throws(() => resolveExecution({ model: "some-model" }, { CODEX_THREAD_ID: "current", CLAUDECODE: "1" }), /active agent/);
  assert.throws(() => resolveExecution({ agent: "other", model: "some-model" }, {}), /Unknown agent/);
  assert.throws(() => resolveExecution({ agent: "codex", model: "--bad" }, {}), /No explicit model/);
});

test("session handoff works but stale model/provider settings cannot cross providers", () => {
  assert.equal(resolveExecution({}, { PIGMENT_AGENT: "codex", PIGMENT_MODEL: "session-model" }).model, "session-model");
  assert.throws(() => resolveExecution({}, { CODEX_THREAD_ID: "current", PIGMENT_AGENT: "claude", PIGMENT_MODEL: "wrong" }), /conflicts/);
  const env = { CLAUDECODE: "1", PIGMENT_AGENT: "claude", PIGMENT_MODEL: "claude-model", PIGMENT_REASONING_EFFORT: "high" };
  assert.throws(() => resolveExecution({ agent: "codex" }, env), /No explicit model/);
  assert.deepEqual(resolveExecution({ agent: "codex", model: "codex-model" }, env), { agent: "codex", model: "codex-model" });
  assert.throws(() => resolveExecution({ agent: "claude", model: "m", reasoningEffort: "low" }, {}), /Codex setting/);
});

test("both providers receive exact model; Codex review keeps a read-only sandbox", () => {
  for (const agent of ["claude", "codex"] as const) {
    for (const access of ["read", "write"] as const) {
      const invocation = agentInvocation({ agent, model: "exact-session-model" }, access, [], {});
      assert.equal(invocation.command, agent);
      assert.equal(invocation.args[invocation.args.indexOf("--model") + 1], "exact-session-model");
      assert.ok(!invocation.args.includes("--full-auto"));
      assert.ok(!invocation.args.includes("--dangerously-bypass-approvals-and-sandbox"));
      if (agent === "codex") {
        assert.ok(invocation.args.includes(`default_permissions=${JSON.stringify(access === "read" ? ":read-only" : "pigment-write")}`));
        assert.equal(invocation.args.includes('permissions.pigment-write.extends=":workspace"'), access === "write");
        assert.equal(invocation.args.includes("permissions.pigment-write.network.enabled=true"), access === "write");
        assert.ok(invocation.args.includes("--ignore-user-config"));
      } else if (access === "read") {
        assert.ok(invocation.args.slice(invocation.args.indexOf("--disallowedTools")).includes("Write"));
      }
    }
  }
  const effort = agentInvocation({ agent: "codex", model: "m", reasoningEffort: "low" }, "read");
  assert.ok(effort.args.includes('model_reasoning_effort="low"'));
});

test("generation preserves the host's permission choice and reviews stay read-only", () => {
  const env = { CODEX_THREAD_ID: "current", CODEX_PERMISSION_PROFILE: ":danger-full-access" };
  assert.ok(agentInvocation({ agent: "codex", model: "m" }, "write", [], env).args.includes('default_permissions=":danger-full-access"'));
  assert.ok(agentInvocation({ agent: "codex", model: "m" }, "read", [], env).args.includes('default_permissions=":read-only"'));
  assert.throws(() => agentInvocation({ agent: "codex", model: "m" }, "write", [], { ...env, CODEX_PERMISSION_PROFILE: ":read-only" }), /current Codex generation permissions/);
});

test("Codex JSONL accepts only completed turns and extracts the final answer", () => {
  const events = [
    { type: "thread.started", thread_id: "test" },
    { type: "item.completed", item: { type: "agent_message", text: "progress" } },
    { type: "item.completed", item: { type: "agent_message", text: '{"items":[],"findings":[]}' } },
    { type: "turn.completed", usage: {} },
  ];
  const lines = events.map((e) => JSON.stringify(e)).join("\n");
  assert.equal(parseAgentOutput("codex", result(lines)).text, '{"items":[],"findings":[]}');
  assert.equal(parseAgentOutput("codex", result(lines)).ok, true);
  assert.equal(parseAgentOutput("codex", result(lines, 1)).ok, false);
  assert.equal(parseAgentOutput("codex", result(lines + '\n{"type":"turn.failed","error":{"message":"limit"}}')).ok, false);
  assert.equal(parseAgentOutput("codex", result(lines.replace('{"type":"turn.completed","usage":{}}', ""))).ok, false);
  assert.equal(parseAgentOutput("codex", result("not-json")).ok, false);
});

test("Claude result errors are not successful runs even if the process exits zero", () => {
  const success = { type: "result", result: "done", modelUsage: { "actual-model": {} }, num_turns: 3 };
  assert.deepEqual(parseAgentOutput("claude", result(JSON.stringify(success))), { ok: true, text: "done", model: "actual-model", turns: 3, error: undefined });
  assert.equal(parseAgentOutput("claude", result(JSON.stringify({ ...success, is_error: true }))).ok, false);
  assert.equal(parseAgentOutput("claude", result("{}")).ok, false);
});

test("CLI rejects incomplete selection before starting a provider or creating a run", () => {
  const env = { ...process.env, CODEX_THREAD_ID: "test", PIGMENT_MODEL: "", PIGMENT_AGENT: "", CLAUDECODE: "" };
  for (const command of ["generate", "review", "showcase", "flow"]) {
    const r = spawnSync(process.execPath, ["--import", "tsx", "src/cli.ts", command, "missing@0.1.0-rc.1"], {
      cwd: new URL("..", import.meta.url), encoding: "utf8", env,
    });
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /No explicit model/);
    assert.doesNotMatch(r.stdout, /agent working|reviewing .*item|bundled/);
  }
});

test("missing executable returns an execution failure without a fallback or hanging", async () => {
  const r = await run(`pigment-no-such-agent-${process.pid}`, [], { cwd: process.cwd(), shell: false });
  assert.equal(r.code, 1);
  assert.match(r.stderr, /ENOENT/);
});
