import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AppId, RunRecord } from "@pigment/schema";
import { appMeta, baseApps, build, copyApp, install, WORK_ROOT } from "../appdir.ts";
import { paths, rel, runsDir, templateDir } from "../paths.ts";
import { bundle } from "./bundle.ts";
import { shootApp } from "./shoot.ts";
import { info, ok, run, runId as newRunId, timestamp, writeJson, writeText } from "../util.ts";

export type Agent = "claude" | "codex";

/**
 * Permissions for the unattended agent: edit files and run the project's own scripts, nothing else.
 * Passed on the command line: headless runs do not pick up a project settings file in a fresh, untrusted
 * folder. On Windows the agent may use PowerShell instead of Bash, so both are listed.
 */
// The project's own smoke tests too: a user's agent runs a project's tests, and without them the run's agent
// only learned at evaluation that a restyle broke a click.
const SHELL_COMMANDS = ["npm run build:*", "npm run typecheck:*", "npm run test:e2e:*", "npm install:*", "npx tsc:*", "node pigment-snap.mjs:*"];
// Output filters people's agents use all the time (`npm run build 2>&1 | Select-Object -Last 25`). Without
// them a piped command is denied as a whole, and the run's agent never sees its own screenshots — a handicap
// a real user's agent doesn't have, which made the lab judge the prompt on blind output.
const OUTPUT_FILTERS = ["Bash(head:*)", "Bash(tail:*)", "Bash(grep:*)", "PowerShell(Select-Object:*)", "PowerShell(Select-String:*)"];
const CLAUDE_ALLOWED = [
  "Read",
  "Edit",
  "Write",
  "Glob",
  "Grep",
  ...SHELL_COMMANDS.flatMap((c) => [`Bash(${c})`, `PowerShell(${c})`]),
  ...OUTPUT_FILTERS,
];
const CLAUDE_DENIED = ["WebFetch", "WebSearch", "Bash(git push:*)", "PowerShell(git push:*)"];

async function runAgent(agent: Agent, cwd: string, prompt: string, timeoutMs: number) {
  if (agent === "claude") {
    const args = ["-p", "--permission-mode", "acceptEdits", "--output-format", "json", "--allowedTools", ...CLAUDE_ALLOWED, "--disallowedTools", ...CLAUDE_DENIED];
    return run("claude", args, { cwd, input: prompt, timeoutMs, shell: false });
  }
  // Codex support is experimental: flags follow `codex exec --help` at the time of writing.
  return run("codex", ["exec", "--full-auto", "-"], { cwd, input: prompt, timeoutMs });
}

export interface GenerateOptions {
  apps?: AppId[];
  agent: Agent;
  concurrency: number;
  timeoutMinutes: number;
  label?: string;
}

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export async function generate(id: string, version: string, options: GenerateOptions): Promise<RunRecord[]> {
  // One generation per template version at a time: a second one (e.g. a restart after the first one's shell
  // was killed but its process lived on) doubles memory use and interleaves runs.
  const lock = join(runsDir(id, version), ".generate.lock");
  if (existsSync(lock)) {
    const pid = Number(readFileSync(lock, "utf8"));
    if (pid && pid !== process.pid && isAlive(pid)) throw new Error(`generation for ${id}@${version} is already running (pid ${pid})`);
  }
  writeText(lock, String(process.pid));
  try {
    return await generateLocked(id, version, options);
  } finally {
    rmSync(lock, { force: true });
  }
}

async function generateLocked(id: string, version: string, options: GenerateOptions): Promise<RunRecord[]> {
  bundle(id, version);
  const apps = (options.apps ?? (baseApps() as AppId[])).filter((a) => baseApps().includes(a));
  const id_ = newRunId();
  const template = readFileSync(join(paths.prompts, "harness-existing.md"), "utf8");
  const prompt = template.replaceAll("{{id}}", id).replaceAll("{{version}}", version);
  info(`generating ${id}@${version} on ${apps.join(", ")} with ${options.agent} (run ${id_})`);

  const queue = [...apps];
  const records: RunRecord[] = [];
  const worker = async () => {
    while (queue.length) {
      const app = queue.shift()!;
      records.push(await generateOne(id, version, app, id_, prompt, options));
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, options.concurrency) }, worker));
  ok(`finished ${records.length} run(s). Next: pnpm harness evaluate ${id}@${version}`);
  return records;
}

async function generateOne(id: string, version: string, app: AppId, runId: string, prompt: string, options: GenerateOptions): Promise<RunRecord> {
  const work = join(WORK_ROOT, id, version, app, runId);
  const out = join(runsDir(id, version), app, runId);
  copyApp(join(paths.baseApps, app), work);
  cpSync(templateDir(id, version), join(work, "design-packages", `${id}-${version}`), { recursive: true, filter: (p) => !p.endsWith(".zip") });
  writeText(join(work, ".gitignore"), "node_modules/\ndist/\ntest-results/\nplaywright-report/\n.snaps/\npigment-snap.mjs\n");
  // Lets the agent look at its own work (screenshots at desktop/mobile, light/dark) before finishing.
  cpSync(join(paths.prompts, "pigment-snap.mjs"), join(work, "pigment-snap.mjs"));

  // A git baseline lets us record exactly what the agent changed.
  await run("git", ["init", "-q"], { cwd: work });
  await run("git", ["add", "-A"], { cwd: work });
  await run("git", ["-c", "user.name=pigment", "-c", "user.email=harness@pigment.local", "commit", "-qm", "baseline"], { cwd: work });

  const record: RunRecord = {
    runId,
    template: id,
    version,
    app,
    scenario: "existing",
    agent: options.agent,
    promptFile: "prompt.md",
    startedAt: timestamp(),
    screenshots: [],
  };
  writeText(join(out, "prompt.md"), prompt);
  info(`[${app}] agent working in ${work}`);
  const agentRun = await runAgent(options.agent, work, prompt, options.timeoutMinutes * 60_000);
  record.agentExitCode = agentRun.code;
  writeText(join(out, "agent.log"), agentRun.stdout + "\n--- stderr ---\n" + agentRun.stderr);
  try {
    const parsed = JSON.parse(agentRun.stdout);
    if (typeof parsed?.result === "string") writeText(join(out, "agent-report.md"), parsed.result);
    const models = Object.keys(parsed?.modelUsage ?? {});
    if (models.length) record.model = models.join(", ");
    // A run that ended in an error is not a usable run, whatever the exit code says.
    if (parsed?.is_error === true) record.agentExitCode = record.agentExitCode || 1;
    writeJson(join(out, "agent-meta.json"), {
      turns: parsed?.num_turns,
      costUsd: parsed?.total_cost_usd,
      durationMs: parsed?.duration_ms,
      permissionDenials: parsed?.permission_denials,
      stopReason: parsed?.stop_reason,
    });
  } catch {
    // codex or non-JSON output — the raw log is kept
  }

  const diff = await run("git", ["diff", "--stat", "HEAD"], { cwd: work });
  const patch = await run("git", ["diff", "HEAD"], { cwd: work });
  writeText(join(out, "diff-stat.txt"), diff.stdout);
  writeText(join(out, "changes.patch"), patch.stdout);

  info(`[${app}] installing and building`);
  const installed = await install(work);
  const built = installed ? await build(work) : { ok: false, durationMs: 0, log: "npm install failed" };
  record.build = { ok: built.ok, durationMs: built.durationMs };
  writeText(join(out, "build.log"), built.log);

  if (built.ok) {
    info(`[${app}] capturing`);
    const shots = await shootApp(work, out);
    record.screenshots = shots.screenshots;
  }
  record.finishedAt = timestamp();
  writeJson(join(out, "run.json"), { ...record, workDir: work });
  // Keep a copy of the restyled source next to the report (without dependencies) for review and demos.
  copyApp(work, join(out, "app"));
  ok(`[${app}] ${built.ok ? "built and captured" : "BUILD FAILED"} → ${rel(out)}`);
  return record;
}

/** The unstyled base apps, captured once, are the accessibility and style baseline for evaluation. */
export async function baseline(force = false): Promise<void> {
  for (const app of baseApps()) {
    const out = join(paths.runs, "_baseline", app);
    if (!force && existsSync(join(out, "shots.json"))) continue;
    const work = join(WORK_ROOT, "_baseline", app);
    copyApp(join(paths.baseApps, app), work);
    info(`[baseline ${app}] installing and building`);
    if (!(await install(work))) throw new Error(`npm install failed for ${app}`);
    const built = await build(work);
    if (!built.ok) throw new Error(`base app ${app} does not build:\n${built.log}`);
    await shootApp(work, out);
    writeFileSync(join(out, "meta.json"), JSON.stringify({ app, capturedAt: timestamp(), routes: appMeta(work).routes }, null, 2));
    ok(`[baseline ${app}] captured → ${rel(out)}`);
  }
}

/**
 * Re-captures the latest run of each app with the current capture code, without running the agent again —
 * for when the capture gains new evidence (e.g. drawing crops). Uses the run's built work folder, or
 * rebuilds the kept copy of the restyled app when that folder is gone. The agent's output is untouched.
 */
export async function reshoot(id: string, version: string, apps?: AppId[]): Promise<void> {
  for (const app of (apps ?? (baseApps() as AppId[])).filter((a) => baseApps().includes(a))) {
    const dir = join(runsDir(id, version), app);
    const latest = existsSync(dir) ? readdirSync(dir).filter((d) => existsSync(join(dir, d, "run.json"))).sort().at(-1) : undefined;
    if (!latest) {
      info(`[${app}] no run to reshoot`);
      continue;
    }
    const out = join(dir, latest);
    const record = JSON.parse(readFileSync(join(out, "run.json"), "utf8")) as RunRecord & { workDir?: string };
    if (!record.build?.ok) {
      info(`[${app}] ${latest} did not build — nothing to reshoot`);
      continue;
    }
    let work = record.workDir && existsSync(join(record.workDir, "node_modules")) ? record.workDir : null;
    if (!work) {
      work = join(WORK_ROOT, id, version, app, `${latest}-reshoot`);
      copyApp(join(out, "app"), work);
      info(`[${app}] rebuilding the kept copy`);
      if (!(await install(work)) || !(await build(work)).ok) throw new Error(`the kept copy of ${app} ${latest} does not build`);
    }
    info(`[${app}] capturing ${latest} again`);
    const shots = await shootApp(work, out);
    writeJson(join(out, "run.json"), { ...record, screenshots: shots.screenshots });
    ok(`[${app}] reshot → ${rel(out)}`);
  }
}
