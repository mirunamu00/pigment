import { cpSync, existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { buildPrompt, keepSpec, STAR_ASK } from "@pigment/content/prompts";
import { build, copyApp, install, WORK_ROOT } from "../appdir.ts";
import { paths, rel, templateDir } from "../paths.ts";
import { fail, info, ok, runId as newRunId, timestamp, writeJson, writeText } from "../util.ts";
import { recordAgentRun, runAgent } from "./generate.ts";
import { resolveExecution, executionLabel, type AgentExecution } from "../agent-runtime.ts";
import { shootApp } from "./shoot.ts";

const STARTER = join(paths.root, "showcase", "starter");
const OUT = join(paths.root, "showcase", "flows");

/** A product unlike the base apps and the showcase products, so the flow tests the system, not a known layout. */
const PRODUCT = "a habit and goal tracker for small teams";
const SCREENS =
  'a "Today" screen at / with the team\'s habits for today, check-ins and current streaks; and a "New goal" screen at /goals/new with a form to create a goal (name, owner, cadence, target date) that validates its fields.';

export interface FlowCheck {
  name: string;
  pass: boolean;
  detail: string;
}

/** Where two texts first differ (line endings aside), or null when they are the same. */
function firstDifference(a: string, b: string): string | null {
  const lines = (t: string) => t.replace(/\r\n/g, "\n").trimEnd().split("\n");
  const x = lines(a), y = lines(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if (x[i] !== y[i]) return `line ${i + 1}: "${(y[i] ?? "(missing)").slice(0, 60)}"`;
  return null;
}

/** What a later session can rely on once setup is done: the spec kept in the project, unchanged, and pointers to it. */
export function setupChecks(work: string, spec: string): FlowCheck[] {
  const read = (f: string) => (existsSync(join(work, f)) ? readFileSync(join(work, f), "utf8") : "");
  const kept = read("design-system/agent.md");
  const diff = kept ? firstDifference(spec, kept) : "missing";
  const pointer = (f: string) => /design-system\/agent\.md/.test(read(f));
  return [
    { name: "spec kept unchanged", pass: diff === null, detail: diff === null ? `design-system/agent.md identical to the spec (${kept.length} characters)` : `design-system/agent.md differs — ${diff}` },
    { name: "version", pass: read("design-system/VERSION").trim().length > 0, detail: read("design-system/VERSION").trim() || "missing" },
    { name: "tokens", pass: /--color-/.test(read("design-system/tokens.css")) || existsSync(join(work, "design-system", "tokens.json")), detail: "design-system/tokens.*" },
    { name: "CLAUDE.md points at the spec", pass: pointer("CLAUDE.md"), detail: read("CLAUDE.md").split("\n").find((l) => l.includes("design-system")) ?? "no pointer" },
    { name: "AGENTS.md points at the spec", pass: pointer("AGENTS.md"), detail: read("AGENTS.md").split("\n").find((l) => l.includes("design-system")) ?? "no pointer" },
  ];
}

/**
 * The new-project path as people live it: one session sets a published system up in an empty project with the
 * user-facing "new" prompt; later, a fresh session with no memory of it — and no spec package, only what the
 * project kept — builds screens with the "ongoing" prompt. Records whether the project kept what later sessions
 * need, and captures the screens they built. Never scored, never fed back into a template.
 */
export async function flow(id: string, version: string, options: AgentExecution & { timeoutMinutes: number }): Promise<void> {
  resolveExecution(options, {});
  info(`flow with ${executionLabel(options)}`);
  if (!existsSync(templateDir(id, version))) fail(`no template ${id}@${version}`);
  const runId = newRunId();
  const work = join(WORK_ROOT, "_flow", id, runId);
  const out = join(OUT, id, runId);
  copyApp(STARTER, work);
  rmSync(join(work, "README.md"), { force: true });
  cpSync(templateDir(id, version), join(work, "design-packages", id), { recursive: true, filter: (p) => !p.endsWith(".zip") });
  cpSync(join(paths.prompts, "pigment-snap.mjs"), join(work, "pigment-snap.mjs"));
  writeText(join(work, ".gitignore"), "node_modules/\ndist/\n.snaps/\npigment-snap.mjs\n");
  const spec = readFileSync(join(work, "design-packages", id, "dist", "agent.md"), "utf8");
  await install(work);

  // 1. Setup, with the prompt people copy for a new project (the GitHub ask needs a person, so it is left out).
  // The spec is a local file here (no network), so keeping it means copying that file, as people would download it.
  const userNew = buildPrompt(id, "new", "url")
    .replace(STAR_ASK, "")
    .replace(/^Spec: .*$/m, `Spec: design-packages/${id}/dist/agent.md`)
    .replace(keepSpec(id, "url"), keepSpec(id, "url").replace(/download it unchanged into design-system\/agent\.md \(.*?\)/, `copy design-packages/${id}/dist/agent.md unchanged to design-system/agent.md (\`cp\` or \`Copy-Item\`; never retype it)`))
    .trim();
  const setup = readFileSync(join(paths.prompts, "harness-flow-setup.md"), "utf8").replaceAll("{{prompt}}", userNew).replaceAll("{{id}}", id).replaceAll("{{product}}", PRODUCT);
  writeText(join(out, "setup", "prompt.md"), setup);
  info(`[setup] agent setting ${id}@${version} up in ${work}`);
  // Copying is how people keep the spec (a download or a cp); the self-check is how they look at their work.
  const copyTools = ["Bash(cp:*)", "PowerShell(Copy-Item:*)", "Bash(mkdir:*)", "PowerShell(New-Item:*)"];
  recordAgentRun(await runAgent(options, work, setup, options.timeoutMinutes * 60_000, copyTools), join(out, "setup"), options);

  // 2. Between sessions: the package goes, as it would for anyone who set up from the spec URL or MCP.
  rmSync(join(work, "design-packages"), { recursive: true, force: true });
  const checks = setupChecks(work, spec);
  for (const c of checks) info(`  ${c.pass ? "✔" : "✖"} ${c.name} — ${c.detail}`);

  // 3. A fresh session builds screens with the prompt people use for ongoing work.
  const ongoing = readFileSync(join(paths.prompts, "harness-flow-ongoing.md"), "utf8").replaceAll("{{prompt}}", buildPrompt(id, "ongoing", "url")).replaceAll("{{screens}}", SCREENS);
  writeText(join(out, "ongoing", "prompt.md"), ongoing);
  info(`[ongoing] a fresh agent session builds screens`);
  recordAgentRun(await runAgent(options, work, ongoing, options.timeoutMinutes * 60_000), join(out, "ongoing"), options);

  // 4. Build and capture what the user would see.
  const built = (await install(work)) ? await build(work) : { ok: false, durationMs: 0, log: "npm install failed" };
  writeText(join(out, "build.log"), built.log);
  let screenshots: string[] = [];
  if (built.ok) {
    try {
      screenshots = (await shootApp(work, out)).screenshots.map((s) => s.file);
    } catch (e) {
      writeText(join(out, "capture.log"), String((e as Error).stack ?? e));
    }
  }
  writeJson(join(out, "flow.json"), { id, version, runId, agent: options.agent, requestedModel: options.model, reasoningEffort: options.reasoningEffort, finishedAt: timestamp(), product: PRODUCT, setupChecks: checks, build: built.ok, screenshots, workDir: work });
  copyApp(work, join(out, "app"));
  const passed = checks.filter((c) => c.pass).length;
  ok(`flow ${id}@${version}: setup ${passed}/${checks.length} checks, build ${built.ok ? "ok" : "FAILED"}, ${screenshots.length} screenshot(s) → ${rel(out)}`);
}
