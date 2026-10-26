import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { build, copyApp, install, WORK_ROOT } from "../appdir.ts";
import { paths, rel, templateDir } from "../paths.ts";
import { fail, info, ok, runId as newRunId, timestamp, writeJson, writeText } from "../util.ts";
import { recordAgentRun, runAgent, type Agent } from "./generate.ts";
import { shootApp } from "./shoot.ts";

export interface ShowcaseOptions {
  products?: string[];
  agent: Agent;
  timeoutMinutes: number;
}

const PRODUCTS = join(paths.root, "showcase", "products");
const OUT = join(paths.root, "showcase", "showcases");
/** Products are served on 4320, 4321, … in folder order, so their runs go side by side. */
const BASE_PORT = 4320;

/** The showcase products: realistic sites with their own house design and CC0 photos. */
export function showcaseProducts(): string[] {
  return existsSync(PRODUCTS) ? readdirSync(PRODUCTS).filter((d) => existsSync(join(PRODUCTS, d, "pigment.app.json"))).sort() : [];
}

function pick(names?: string[]): string[] {
  const all = showcaseProducts();
  const chosen = names?.length ? all.filter((p) => names.includes(p)) : all;
  if (!chosen.length) fail(`no such product: ${names?.join(", ")} (have ${all.join(", ")})`);
  return chosen;
}

/** A product folder copied to the work area, served on its own port. */
function stage(product: string, work: string): void {
  copyApp(join(PRODUCTS, product), work);
  const port = BASE_PORT + showcaseProducts().indexOf(product);
  for (const f of ["package.json", "vite.config.ts", "pigment.app.json"]) {
    const file = join(work, f);
    if (existsSync(file)) writeFileSync(file, readFileSync(file, "utf8").replaceAll(String(BASE_PORT), String(port)));
  }
}

/**
 * What the gallery shows: a published system applied to a realistic product — the way a team adopts a system on
 * a live site. Every system is applied to the same products, so the gallery can put them side by side and next
 * to the original. Showcases are never scored, reviewed or fed back into a template: the base apps stay the test.
 */
export async function showcase(id: string, version: string, options: ShowcaseOptions): Promise<void> {
  const published = existsSync(paths.published) && Object.keys(JSON.parse(readFileSync(paths.published, "utf8"))).includes(`${id}@${version}`);
  if (!published) fail(`${id}@${version} is not published — showcases are made from published systems only`);
  const products = pick(options.products);
  const template = readFileSync(join(paths.prompts, "harness-showcase.md"), "utf8");
  const base = newRunId();
  info(`showcasing ${id}@${version} on ${products.join(", ")} with ${options.agent} (run ${base})`);
  await Promise.all(products.map((p) => showcaseOne(id, version, p, base, template, options)));
  ok(`finished. Screenshots in ${rel(join(OUT, id))}`);
}

async function showcaseOne(id: string, version: string, product: string, runId: string, template: string, options: ShowcaseOptions) {
  const work = join(WORK_ROOT, "_showcase", id, product, runId);
  const out = join(OUT, id, product, runId);
  stage(product, work);
  cpSync(templateDir(id, version), join(work, "design-packages", id), { recursive: true, filter: (p) => !p.endsWith(".zip") });
  cpSync(join(paths.prompts, "pigment-snap.mjs"), join(work, "pigment-snap.mjs"));
  writeText(join(work, ".gitignore"), "node_modules/\ndist/\n.snaps/\npigment-snap.mjs\n");

  const prompt = template.replaceAll("{{id}}", id);
  writeText(join(out, "prompt.md"), prompt);
  const record: Record<string, unknown> = { runId, template: id, version, product, scenario: "existing", agent: options.agent, startedAt: timestamp() };

  // The agent may install packages itself, but its self-check needs them from the start.
  await install(work);
  info(`[${product}] agent working in ${work}`);
  const agentRun = await runAgent(options.agent, work, prompt, options.timeoutMinutes * 60_000);
  Object.assign(record, recordAgentRun(agentRun, out));

  info(`[${product}] installing and building`);
  const installed = await install(work);
  const built = installed ? await build(work) : { ok: false, durationMs: 0, log: "npm install failed" };
  record.build = { ok: built.ok, durationMs: built.durationMs };
  writeText(join(out, "build.log"), built.log);
  if (built.ok) {
    try {
      record.screenshots = (await shootApp(work, out)).screenshots;
    } catch (e) {
      writeText(join(out, "capture.log"), String((e as Error).stack ?? e));
      info(`[${product}] CAPTURE FAILED — see capture.log`);
    }
  }
  record.finishedAt = timestamp();
  writeJson(join(out, "run.json"), { ...record, workDir: work });
  copyApp(work, join(out, "app"));
  ok(`[${product}] ${built.ok ? "built and captured" : "BUILD FAILED"} → ${rel(out)}`);
}

/** The products as they are, captured the same way: the "before" of every showcase. */
export async function showcaseOriginals(names?: string[]): Promise<void> {
  for (const product of pick(names)) {
    const work = join(WORK_ROOT, "_showcase", "_original", product);
    const out = join(OUT, "_original", product);
    stage(product, work);
    info(`[${product}] installing and building the original`);
    if (!(await install(work))) fail(`npm install failed for ${product}`);
    const built = await build(work);
    if (!built.ok) fail(`${product} does not build:\n${built.log}`);
    const shots = await shootApp(work, out);
    writeJson(join(out, "run.json"), { product, capturedAt: timestamp(), screenshots: shots.screenshots });
    ok(`[${product}] original captured → ${rel(out)}`);
  }
}
