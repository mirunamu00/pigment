import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { RunAppId, RunRecord } from "@pigment/schema";
import { appMeta, baseApps, build, copyApp, holdoutApps, install, WORK_ROOT } from "../appdir.ts";
import { generationBlock } from "../budget.ts";
import { paths, rel, runsDir, templateDir } from "../paths.ts";
import { bundle } from "./bundle.ts";
import { shootApp } from "./shoot.ts";
import { fail, info, ok, run, runId as newRunId, timestamp, writeJson, writeText, readJson } from "../util.ts";

import { executeAgent, executionLabel, parseAgentOutput, resolveExecution, type Agent, type AgentExecution } from "../agent-runtime.ts";
export type { Agent } from "../agent-runtime.ts";

export async function runAgent(execution: AgentExecution, cwd: string, prompt: string, timeoutMs: number, extraTools: string[] = []) {
  return executeAgent(execution, "write", cwd, prompt, timeoutMs, extraTools);
}

/** Keeps the agent's log, report and usage next to a run; returns the record fields they settle. */
export function recordAgentRun(agentRun: { code: number | null; stdout: string; stderr: string; durationMs: number }, out: string, execution: AgentExecution): { agentExitCode: number | null; model?: string } {
  const answer = parseAgentOutput(execution.agent, agentRun);
  let claudeMeta: { permission_denials?: unknown; stop_reason?: unknown } = {};
  if (execution.agent === "claude") {
    try { claudeMeta = JSON.parse(agentRun.stdout); } catch { /* Raw output remains in agent.log. */ }
  }
  writeText(join(out, "agent.log"), agentRun.stdout + "\n--- stderr ---\n" + agentRun.stderr);
  if (answer.text || answer.error) writeText(join(out, "agent-report.md"), answer.text || answer.error!);
  writeJson(join(out, "agent-meta.json"), {
    agent: execution.agent, requestedModel: execution.model, reasoningEffort: execution.reasoningEffort,
    model: answer.model, turns: answer.turns, durationMs: agentRun.durationMs, error: answer.error,
    permissionDenials: claudeMeta.permission_denials, stopReason: claudeMeta.stop_reason,
  });
  return { agentExitCode: answer.ok ? 0 : (agentRun.code || 1), model: answer.model ?? execution.model };
}

export interface GenerateOptions {
  apps?: RunAppId[];
  /** Also run each holdout app once (the confirm step). */
  holdout?: boolean;
  agent: Agent;
  model: string;
  reasoningEffort?: string;
  concurrency: number;
  timeoutMinutes: number;
  /** Independent runs per app. One run is one sample of what a user's agent might build; several show which
   *  problems the prompt causes (they recur) and which are chance (they don't). */
  samples?: number;
  label?: string;
  /** The user asked for runs although a candidate already passed. */
  afterPass?: boolean;
}

/** One run id per sample; ids sort in sample order, so the newest run is the last sample. */
export function sampleRunIds(base: string, samples: number): string[] {
  return Array.from({ length: samples }, (_, i) => (samples === 1 ? base : `${base}-s${i + 1}`));
}

/** Sample by sample, every main app; then each holdout app once, with the first sample. */
export function runQueue(ids: string[], apps: RunAppId[], holdout: RunAppId[]): Array<{ app: RunAppId; runId: string }> {
  return [...ids.flatMap((runId) => apps.map((app) => ({ app, runId }))), ...holdout.map((app) => ({ app, runId: ids[0]! }))];
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
  resolveExecution(options, {});
  const known = [...baseApps(), ...holdoutApps()];
  const apps = (options.apps ?? (baseApps() as RunAppId[])).filter((a) => known.includes(a));
  const holdout = options.holdout ? (holdoutApps() as RunAppId[]).filter((a) => !apps.includes(a)) : [];
  // Runs of only the holdout apps are the final check, allowed once the main apps passed the confirm.
  const onlyHoldouts = apps.length > 0 && apps.every((a) => holdoutApps().includes(a));
  const block = generationBlock(id, version, undefined, onlyHoldouts ? "holdout" : "main");
  if (block && !options.afterPass) fail(`not generating: ${block}`);
  // One generation per machine at a time: each base app serves on a fixed port, so two generations (of any
  // templates) test and capture each other's apps; a restart whose predecessor lived on also doubles memory use.
  const lock = join(paths.runs, ".generate.lock");
  if (existsSync(lock)) {
    const [pid, ref] = readFileSync(lock, "utf8").split(" ");
    if (Number(pid) && Number(pid) !== process.pid && isAlive(Number(pid))) throw new Error(`a generation is already running (${ref ?? "pid " + pid}); start this one after it`);
  }
  writeText(lock, `${process.pid} ${id}@${version}`);
  try {
    return await generateLocked(id, version, apps, holdout, options);
  } finally {
    rmSync(lock, { force: true });
  }
}

async function generateLocked(id: string, version: string, apps: RunAppId[], holdout: RunAppId[], options: GenerateOptions): Promise<RunRecord[]> {
  // A published version is frozen, dist included (its hash covers it): run it as it was published.
  const published = existsSync(paths.published) && Object.keys(JSON.parse(readFileSync(paths.published, "utf8"))).includes(`${id}@${version}`);
  if (!published) bundle(id, version);
  const samples = Math.max(1, options.samples ?? 1);
  const base = newRunId();
  const ids = sampleRunIds(base, samples);
  const template = readFileSync(join(paths.prompts, "harness-existing.md"), "utf8");
  const prompt = template.replaceAll("{{id}}", id).replaceAll("{{version}}", version);
  info(
    `generating ${id}@${version} on ${apps.join(", ")}${holdout.length ? ` + holdout ${holdout.join(", ")} (once)` : ""} with ${executionLabel(options)} (run ${base}${samples > 1 ? `, ${samples} samples` : ""})`,
  );

  const queue = runQueue(ids, apps, holdout);
  const records: RunRecord[] = [];
  const worker = async () => {
    while (queue.length) {
      const { app, runId } = queue.shift()!;
      records.push(await generateOne(id, version, app, runId, prompt, options));
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, options.concurrency) }, worker));
  ok(`finished ${records.length} run(s). Next: pnpm harness evaluate ${id}@${version}`);
  return records;
}

async function generateOne(id: string, version: string, app: RunAppId, runId: string, prompt: string, options: GenerateOptions): Promise<RunRecord> {
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
    requestedModel: options.model,
    reasoningEffort: options.reasoningEffort,
    promptFile: "prompt.md",
    startedAt: timestamp(),
    screenshots: [],
  };
  writeText(join(out, "prompt.md"), prompt);
  info(`[${app}] agent working in ${work}`);
  const agentRun = await runAgent(options, work, prompt, options.timeoutMinutes * 60_000);
  Object.assign(record, recordAgentRun(agentRun, out, options));

  const diff = await run("git", ["diff", "--stat", "HEAD"], { cwd: work });
  const patch = await run("git", ["diff", "HEAD"], { cwd: work });
  writeText(join(out, "diff-stat.txt"), diff.stdout);
  writeText(join(out, "changes.patch"), patch.stdout);
  if (record.agentExitCode === 0 && !patch.stdout.trim()) {
    // A provider may finish its turn successfully while reporting that policy prevented all work.
    // Building the untouched baseline is not a successful template application.
    record.agentExitCode = 1;
    const metaFile = join(out, "agent-meta.json");
    writeJson(metaFile, { ...readJson<Record<string, unknown>>(metaFile), error: "Agent completed without changing any project files; the template was not applied." });
    info(`[${app}] agent made no changes — marking execution failed`);
  }

  info(`[${app}] installing and building`);
  const installed = await install(work);
  const built = installed ? await build(work) : { ok: false, durationMs: 0, log: "npm install failed" };
  record.build = { ok: built.ok, durationMs: built.durationMs };
  writeText(join(out, "build.log"), built.log);

  if (built.ok) {
    info(`[${app}] capturing`);
    // A capture failure is this app's problem, not the run's: record it and let the other apps finish.
    try {
      const shots = await shootApp(work, out);
      record.screenshots = shots.screenshots;
    } catch (e) {
      writeText(join(out, "capture.log"), String((e as Error).stack ?? e));
      info(`[${app}] CAPTURE FAILED — see capture.log; \`pnpm harness reshoot ${id}@${version} --apps ${app}\` retries it`);
    }
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
  for (const app of [...baseApps(), ...holdoutApps()]) {
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
export async function reshoot(id: string, version: string, apps?: RunAppId[]): Promise<void> {
  const known = [...baseApps(), ...holdoutApps()];
  for (const app of (apps ?? (known as RunAppId[])).filter((a) => known.includes(a))) {
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
    // The work folder lives in the temp directory and may be partly cleaned up: use it only while it is whole.
    const whole = (dir: string) => ["node_modules", "dist", "pigment.app.json"].every((f) => existsSync(join(dir, f)));
    let work = record.workDir && whole(record.workDir) ? record.workDir : null;
    if (!work) {
      work = join(WORK_ROOT, id, version, app, `${latest}-reshoot`);
      copyApp(join(out, "app"), work);
      // Copies kept before the design package's dist was kept need it back from the template.
      const pkg = join(work, "design-packages", `${record.template}-${record.version}`);
      if (existsSync(pkg) && !existsSync(join(pkg, "dist")) && existsSync(templateDir(record.template, record.version))) {
        cpSync(templateDir(record.template, record.version), pkg, { recursive: true, filter: (p) => !p.endsWith(".zip") });
      }
      info(`[${app}] rebuilding the kept copy`);
      if (!(await install(work)) || !(await build(work)).ok) {
        info(`[${app}] the kept copy of ${latest} does not build — not reshot`);
        process.exitCode = 1;
        continue;
      }
    }
    info(`[${app}] capturing ${latest} again`);
    // One app's capture failure doesn't stop the others.
    try {
      const shots = await shootApp(work, out);
      writeJson(join(out, "run.json"), { ...record, screenshots: shots.screenshots });
      ok(`[${app}] reshot → ${rel(out)}`);
    } catch (e) {
      info(`[${app}] CAPTURE FAILED: ${(e as Error).message.split("\n")[0]}`);
      process.exitCode = 1;
    }
  }
}
