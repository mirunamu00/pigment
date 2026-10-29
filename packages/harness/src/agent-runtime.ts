import { run, type RunResult } from "./util.ts";
import { basename, isAbsolute } from "node:path";

/** Prefer the running host over PATH, which can point to an older standalone CLI. */
export function selectCodexCommand(env: NodeJS.ProcessEnv, ancestors: string[]): string {
  const override = env.PIGMENT_CODEX_BIN?.trim();
  if (override) {
    if (!isAbsolute(override)) throw new Error("PIGMENT_CODEX_BIN must be an absolute executable path.");
    return override;
  }
  return ancestors.find((p) => /^codex(?:\.exe)?$/i.test(basename(p))) ?? "codex";
}

let codexCommand: Promise<string> | undefined;
async function resolveCodexCommand(): Promise<string> {
  if (process.env.PIGMENT_CODEX_BIN) return selectCodexCommand(process.env, []);
  if (!process.env.CODEX_THREAD_ID) return "codex";
  return codexCommand ??= (async () => {
    let ancestors: string[] = [];
    if (process.platform === "win32") {
      // Inspect only executable paths in our own parent chain, never command lines or unrelated sessions.
      const script = `$taskPid=${process.pid}; $paths=@(); for($i=0;$i -lt 24 -and $taskPid;$i++){ $p=Get-CimInstance Win32_Process -Filter \"ProcessId=$taskPid\"; if(!$p){break}; if($p.ExecutablePath){$paths+=$p.ExecutablePath}; $taskPid=$p.ParentProcessId }; ConvertTo-Json -Compress -InputObject $paths`;
      const r = await run("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script], { cwd: process.cwd(), shell: false, timeoutMs: 15000 });
      if (r.code === 0) ancestors = JSON.parse(r.stdout.trim() || "[]");
    } else {
      let pid = process.ppid;
      for (let i = 0; i < 24 && pid > 1; i++) {
        const r = await run("ps", ["-p", String(pid), "-o", "ppid=", "-o", "comm="], { cwd: process.cwd(), shell: false, timeoutMs: 2000 });
        const match = r.stdout.trim().match(/^(\d+)\s+(.+)$/);
        if (r.code !== 0 || !match) break;
        ancestors.push(match[2]!.trim());
        pid = Number(match[1]);
      }
    }
    const command = selectCodexCommand(process.env, ancestors);
    if (command === "codex") throw new Error("Cannot locate the current Codex executable in the parent process chain. Set PIGMENT_CODEX_BIN to its absolute path; refusing to use a potentially different PATH version.");
    console.log(`  Codex executable: ${command}`);
    return command;
  })();
}

export type Agent = "claude" | "codex";
export interface AgentExecution {
  agent: Agent;
  model: string;
  reasoningEffort?: string;
}
export interface AgentSelection {
  agent?: string;
  model?: string;
  reasoningEffort?: string;
}

/** The host must supply its model; a CLI's personal default is not the current chat's model. */
export function resolveExecution(options: AgentSelection, env: NodeJS.ProcessEnv = process.env): AgentExecution {
  const detected = [env.CODEX_THREAD_ID ? "codex" : "", env.CLAUDECODE ? "claude" : ""].filter(Boolean);
  const selected = options.agent?.trim() || env.PIGMENT_AGENT?.trim() || undefined;
  if (!selected && detected.length !== 1) throw new Error("Cannot identify the active agent. Pass --agent and --model explicitly; no provider default is used.");
  if (!options.agent && selected && detected.length && (detected.length !== 1 || detected[0] !== selected)) {
    throw new Error("PIGMENT_AGENT conflicts with the active session. Pass --agent and --model explicitly to select another provider.");
  }
  const agent = selected ?? detected[0];
  if (agent !== "claude" && agent !== "codex") throw new Error(`Unknown agent '${agent}'; expected claude or codex.`);
  const switched = (!!options.agent && detected.some((a) => a !== agent)) || (!!env.PIGMENT_AGENT && env.PIGMENT_AGENT !== agent);
  const model = (options.model ?? (switched ? undefined : env.PIGMENT_MODEL))?.trim();
  if (!model || model.startsWith("-")) throw new Error(`No explicit model for ${agent}. Pass --model <current-session-model> (or PIGMENT_MODEL); the CLI default is never used.`);
  const reasoningEffort = options.reasoningEffort ?? (switched ? undefined : env.PIGMENT_REASONING_EFFORT);
  if (reasoningEffort && agent !== "codex") throw new Error("--reasoning-effort is a Codex setting; do not carry it into Claude.");
  if (reasoningEffort && !["none", "minimal", "low", "medium", "high", "xhigh", "max", "ultra"].includes(reasoningEffort)) {
    throw new Error(`Unsupported reasoning effort '${reasoningEffort}'.`);
  }
  return { agent, model, ...(reasoningEffort ? { reasoningEffort } : {}) };
}

export function executionLabel(e: AgentExecution): string {
  return `${e.agent} / ${e.model}${e.reasoningEffort ? ` / reasoning=${e.reasoningEffort}` : ""}`;
}

// Claude's unattended generation surface: project edits and its own build/test/snapshot commands.
const SHELL_COMMANDS = ["npm run build:*", "npm run typecheck:*", "npm run test:e2e:*", "npm install:*", "npx tsc:*", "node pigment-snap.mjs:*"];
const OUTPUT_FILTERS = ["Bash(head:*)", "Bash(tail:*)", "Bash(grep:*)", "PowerShell(Select-Object:*)", "PowerShell(Select-String:*)"];
const EDIT_TOOLS = ["Read", "Edit", "Write", "Glob", "Grep", ...SHELL_COMMANDS.flatMap((c) => [`Bash(${c})`, `PowerShell(${c})`]), ...OUTPUT_FILTERS];

/** Shared provider/model selection; capability boundary differs between generation and review. */
export function agentInvocation(execution: AgentExecution, access: "write" | "read", extraTools: string[] = []) {
  // Validate even direct programmatic callers before spawning a process.
  const e = resolveExecution(execution, {});
  if (e.agent === "codex") {
    return { command: "codex", args: [
      "exec", "--ignore-user-config", "--json", "--model", e.model,
      // Explicit permission profiles survive the host's inherited permission-profile context.
      // The legacy --sandbox flag alone can otherwise silently start this child read-only.
      "-c", `default_permissions=${JSON.stringify(access === "read" ? ":read-only" : "pigment-write")}`,
      ...(access === "write" ? ["-c", 'permissions.pigment-write.extends=":workspace"', "-c", "permissions.pigment-write.network.enabled=true"] : []),
      ...(process.platform === "win32" ? ["-c", 'windows.sandbox="elevated"'] : []),
      "-c", 'approval_policy="never"',
      ...(e.reasoningEffort ? ["-c", `model_reasoning_effort=${JSON.stringify(e.reasoningEffort)}`] : []),
      "-",
    ] };
  }
  const denied = access === "read"
    ? ["Write", "Edit", "Bash", "PowerShell", "WebFetch", "WebSearch", "NotebookEdit", "Task", "Agent"]
    : ["WebFetch", "WebSearch", "Bash(git push:*)", "PowerShell(git push:*)"];
  return { command: "claude", args: [
    "-p", "--model", e.model, "--output-format", "json",
    ...(access === "write" ? ["--permission-mode", "acceptEdits"] : []),
    "--allowedTools", ...(access === "read" ? ["Read", "Glob", "Grep"] : [...EDIT_TOOLS, ...extraTools]),
    "--disallowedTools", ...denied,
  ] };
}

export async function executeAgent(execution: AgentExecution, access: "write" | "read", cwd: string, prompt: string, timeoutMs: number, extraTools: string[] = []): Promise<RunResult> {
  const { command, args } = agentInvocation(execution, access, extraTools);
  // Both CLIs are executables. Avoid Windows shell re-parsing model/config arguments.
  return run(execution.agent === "codex" ? await resolveCodexCommand() : command, args, { cwd, input: prompt, timeoutMs, shell: false });
}

export interface AgentOutput {
  ok: boolean;
  text: string;
  model?: string;
  turns?: number;
  error?: string;
}

/** Codex emits JSONL events; Claude emits one result object. Never count a partial turn as success. */
export function parseAgentOutput(agent: Agent, result: RunResult): AgentOutput {
  try {
    if (agent === "claude") {
      const p = JSON.parse(result.stdout);
      const ok = result.code === 0 && p.type === "result" && !p.is_error && typeof p.result === "string";
      return { ok, text: typeof p.result === "string" ? p.result : "", model: Object.keys(p.modelUsage ?? {}).join(", ") || undefined,
        turns: p.num_turns, error: ok ? undefined : String(p.result ?? result.stderr ?? `exit ${result.code}`) };
    }
    const events = result.stdout.split(/\r?\n/).filter((s) => s.trim()).map((s) => JSON.parse(s));
    const messages = events.filter((e) => e.type === "item.completed" && e.item?.type === "agent_message");
    const failure = events.find((e) => e.type === "turn.failed" || e.type === "error");
    const text = messages.at(-1)?.item.text ?? "";
    const turns = events.filter((e) => e.type === "turn.completed").length;
    const ok = result.code === 0 && !failure && turns > 0 && typeof text === "string" && !!text.trim();
    return { ok, text, turns, error: ok ? undefined : String(failure?.error?.message ?? failure?.message ?? (result.stderr || `incomplete Codex turn (exit ${result.code})`)) };
  } catch {
    return { ok: false, text: "", error: (result.stderr || result.stdout).slice(-500) || `exit ${result.code}: invalid agent output` };
  }
}
