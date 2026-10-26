import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { build, copyApp, install, WORK_ROOT } from "../appdir.ts";
import { paths, rel, templateDir } from "../paths.ts";
import { fail, info, ok, runId as newRunId, timestamp, writeJson, writeText } from "../util.ts";
import { recordAgentRun, runAgent, type Agent } from "./generate.ts";
import { shootApp } from "./shoot.ts";

export interface Brief {
  id: string;
  title: string;
  kind: string;
  brief: string;
}

export interface ShowcaseOptions {
  briefs?: string[];
  agent: Agent;
  timeoutMinutes: number;
}

const STARTER = join(paths.root, "showcase", "starter");
const STARTER_PORT = 4320;

export function readBriefs(): Brief[] {
  return JSON.parse(readFileSync(join(paths.root, "showcase", "briefs.json"), "utf8")) as Brief[];
}

export function showcaseDir(id: string, brief: string): string {
  return join(paths.root, "showcase", "showcases", id, brief);
}

/**
 * What the gallery shows: a published system used the way people use it on a new project — an agent gets the
 * system and a one-paragraph product brief and builds the product from an empty project. Unlike the base apps
 * there is no structure to preserve, so the system's layout, signature elements and imagery come through.
 * Showcases are never scored, reviewed or fed back into a template: the base apps stay the test.
 */
export async function showcase(id: string, version: string, options: ShowcaseOptions): Promise<void> {
  const published = existsSync(paths.published) && Object.keys(JSON.parse(readFileSync(paths.published, "utf8"))).includes(`${id}@${version}`);
  if (!published) fail(`${id}@${version} is not published — showcases are made from published systems only`);
  const all = readBriefs();
  const briefs = options.briefs?.length ? all.filter((b) => options.briefs!.includes(b.id)) : all;
  if (!briefs.length) fail(`no such brief: ${options.briefs?.join(", ")} (have ${all.map((b) => b.id).join(", ")})`);
  const template = readFileSync(join(paths.prompts, "harness-new.md"), "utf8");
  const base = newRunId();
  info(`showcasing ${id}@${version} on ${briefs.map((b) => b.id).join(", ")} with ${options.agent} (run ${base})`);
  // Each brief gets its own port, so the agents (and their self-check screenshots) run side by side.
  await Promise.all(briefs.map((b) => showcaseOne(id, version, b, all.indexOf(b), base, template, options)));
  ok(`finished. Screenshots in ${rel(join(paths.root, "showcase", "showcases", id))}`);
}

async function showcaseOne(id: string, version: string, brief: Brief, index: number, runId: string, template: string, options: ShowcaseOptions) {
  const work = join(WORK_ROOT, "_showcase", id, brief.id, runId);
  const out = join(showcaseDir(id, brief.id), runId);
  const port = STARTER_PORT + index;
  copyApp(STARTER, work);
  for (const f of ["package.json", "vite.config.ts", "pigment.app.json"]) {
    const file = join(work, f);
    writeFileSync(file, readFileSync(file, "utf8").replaceAll(String(STARTER_PORT), String(port)));
  }
  // The starter's README speaks to us, not to the agent building the product.
  rmSync(join(work, "README.md"), { force: true });
  cpSync(templateDir(id, version), join(work, "design-packages", id), { recursive: true, filter: (p) => !p.endsWith(".zip") });
  cpSync(join(paths.prompts, "pigment-snap.mjs"), join(work, "pigment-snap.mjs"));
  writeText(join(work, ".gitignore"), "node_modules/\ndist/\n.snaps/\npigment-snap.mjs\n");

  const prompt = template.replaceAll("{{id}}", id).replaceAll("{{brief}}", brief.brief);
  writeText(join(out, "prompt.md"), prompt);
  const record: Record<string, unknown> = { runId, template: id, version, brief: brief.id, scenario: "new", agent: options.agent, startedAt: timestamp() };

  // The agent installs packages itself (npm install is allowed), but the self-check needs them from the start.
  await install(work);
  info(`[${brief.id}] agent working in ${work}`);
  const agentRun = await runAgent(options.agent, work, prompt, options.timeoutMinutes * 60_000);
  Object.assign(record, recordAgentRun(agentRun, out));

  info(`[${brief.id}] installing and building`);
  const installed = await install(work);
  const built = installed ? await build(work) : { ok: false, durationMs: 0, log: "npm install failed" };
  record.build = { ok: built.ok, durationMs: built.durationMs };
  writeText(join(out, "build.log"), built.log);
  if (built.ok) {
    try {
      const shots = await shootApp(work, out);
      record.screenshots = shots.screenshots;
    } catch (e) {
      writeText(join(out, "capture.log"), String((e as Error).stack ?? e));
      info(`[${brief.id}] CAPTURE FAILED — see capture.log`);
    }
  }
  record.finishedAt = timestamp();
  writeJson(join(out, "run.json"), { ...record, workDir: work });
  copyApp(work, join(out, "app"));
  ok(`[${brief.id}] ${built.ok ? "built and captured" : "BUILD FAILED"} → ${rel(out)}`);
}
