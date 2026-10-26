import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { build, copyApp, install, WORK_ROOT } from "../appdir.ts";
import { paths, rel, templateDir } from "../paths.ts";
import { fail, info, ok, runId as newRunId, timestamp, writeJson, writeText } from "../util.ts";
import { recordAgentRun, runAgent, type Agent } from "./generate.ts";
import { shootApp, type ShotResult } from "./shoot.ts";

export interface ShowcaseOptions {
  products?: string[];
  agent: Agent;
  timeoutMinutes: number;
}

const PRODUCTS = join(paths.root, "showcase", "products");
const OUT = join(paths.root, "showcase", "showcases");
/** What the site serves: products/<product>/product.json, original/*.png and <system>/*.png. */
const SITE = join(paths.root, "apps", "web", "public", "products");
/** The port the product folders are written with. */
const BASE_PORT = 4320;
/** Where the runs serve them: 4320, 4321, … by default; PIGMENT_SHOWCASE_PORT moves the range, so two systems can run at once. */
const RUN_PORT = Number(process.env.PIGMENT_SHOWCASE_PORT ?? BASE_PORT);

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
  const port = RUN_PORT + showcaseProducts().indexOf(product);
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
  await exportShowcase(id, version);
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

/**
 * Builds and captures the latest run of each product again, without running the agent — for a run whose build
 * or capture failed on something outside the agent's work (a locked file, a busy port). The agent's output is
 * untouched; the result is exported as usual.
 */
export async function reshootShowcase(id: string, version: string, names?: string[]): Promise<void> {
  for (const product of pick(names)) {
    const dir = join(OUT, id, product);
    const runId = existsSync(dir) ? readdirSync(dir).filter((r) => existsSync(join(dir, r, "run.json"))).sort().at(-1) : undefined;
    if (!runId) {
      info(`[${product}] no run to reshoot`);
      continue;
    }
    const out = join(dir, runId);
    const record = JSON.parse(readFileSync(join(out, "run.json"), "utf8")) as Record<string, unknown> & { workDir?: string };
    // The work folder lives in the temp directory; without it, the kept copy of the agent's output is rebuilt.
    // A work folder outside the current work root (PIGMENT_WORKDIR moved) is left alone: the move is the fix.
    const reuse = record.workDir?.startsWith(WORK_ROOT) && existsSync(join(record.workDir, "package.json"));
    const work = reuse ? record.workDir! : join(WORK_ROOT, "_showcase", id, product, `${runId}-reshoot`);
    if (work !== record.workDir) {
      copyApp(join(out, "app"), work);
      stage(product, work);
    }
    info(`[${product}] building ${runId} again`);
    const built = (await install(work)) ? await build(work) : { ok: false, durationMs: 0, log: "npm install failed" };
    writeText(join(out, "build.log"), built.log);
    record.build = { ok: built.ok, durationMs: built.durationMs };
    if (built.ok) record.screenshots = (await shootApp(work, out)).screenshots;
    writeJson(join(out, "run.json"), record);
    ok(`[${product}] ${built.ok ? "built and captured" : "BUILD FAILED"} → ${rel(out)}`);
  }
  await exportShowcase(id, version, names);
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
  await exportOriginals(names);
}

/** Page captures only (no interaction states), in the given schemes. */
function pageShots(runDir: string, schemes: string[]): string[] {
  const shots = JSON.parse(readFileSync(join(runDir, "shots.json"), "utf8")) as ShotResult;
  return shots.screenshots.filter((s) => !s.route.startsWith("state:") && schemes.includes(s.scheme)).map((s) => s.file);
}

/**
 * Page captures as WebP for the site: the products are photo-heavy, and full-page PNGs of them run to megabytes
 * each. WebP stops at 16,383px, so a page longer than that is scaled down to fit (only very long phone captures).
 */
async function copyShots(runDir: string, files: string[], dest: string): Promise<void> {
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  for (const f of files) {
    const img = sharp(join(runDir, f));
    const { height = 0 } = await img.metadata();
    const out = join(dest, f.replace(/^screenshots\//, "").replace(/\.png$/, ".webp"));
    await (height > 16_383 ? img.resize({ height: 16_383 }) : img).webp({ quality: 82 }).toFile(out);
  }
}

/** The originals and each product's page list (names and order from its pigment.app.json) for the site. */
export async function exportOriginals(names?: string[]): Promise<void> {
  for (const product of pick(names)) {
    const runDir = join(OUT, "_original", product);
    if (!existsSync(join(runDir, "shots.json"))) {
      info(`[${product}] no original capture to export — run \`pnpm harness showcase --originals\``);
      continue;
    }
    const meta = JSON.parse(readFileSync(join(PRODUCTS, product, "pigment.app.json"), "utf8")) as {
      name: string;
      kind?: string;
      order?: number;
      routes: Array<{ path: string; name: string; capture: boolean }>;
    };
    // The house design is light only; its dark captures would only repeat it.
    await copyShots(runDir, pageShots(runDir, ["light"]), join(SITE, product, "original"));
    const slug = (p: string) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-"));
    writeJson(join(SITE, product, "product.json"), {
      id: product,
      name: meta.name,
      kind: meta.kind ?? product,
      order: meta.order ?? 99,
      pages: meta.routes.filter((r) => r.capture).map((r) => ({ slug: slug(r.path), name: r.name })),
    });
    ok(`[${product}] original exported → ${rel(join(SITE, product))}`);
  }
}

/**
 * The latest built run of each product for one system, replacing what the site showed for it before. With
 * `carryFrom`, a metadata-only version (same design, new name or description) takes over that version's runs.
 */
export async function exportShowcase(id: string, version: string, names?: string[], carryFrom?: string): Promise<void> {
  const manifest = JSON.parse(readFileSync(join(templateDir(id, version), "manifest.json"), "utf8")) as { tags: { appearance: string[] } };
  for (const product of pick(names)) {
    const dir = join(OUT, id, product);
    const runs = existsSync(dir) ? readdirSync(dir).filter((r) => existsSync(join(dir, r, "shots.json"))).sort() : [];
    const from = carryFrom ?? version;
    const runId = runs.filter((r) => JSON.parse(readFileSync(join(dir, r, "run.json"), "utf8")).version === from).at(-1);
    if (!runId) {
      info(`[${product}] no captured ${id}@${from} run to export`);
      continue;
    }
    const dest = join(SITE, product, id);
    await copyShots(join(dir, runId), pageShots(join(dir, runId), manifest.tags.appearance), dest);
    // Link previews take PNG: the top of the home page in the system's default mode.
    const home = join(dir, runId, "screenshots", `home-desktop-${manifest.tags.appearance[0] ?? "light"}.png`);
    if (existsSync(home)) await sharp(home).extract({ left: 0, top: 0, width: 1440, height: 900 }).resize({ width: 800 }).png().toFile(join(dest, "og.png"));
    writeJson(join(dest, "run.json"), { version, runId, ...(carryFrom ? { carriedFrom: carryFrom } : {}) });
    ok(`[${product}] ${id} exported → ${rel(dest)}`);
  }
}

/** Published systems whose current version is not on every showcase product yet, as "id@version on product". */
export function missingShowcases(): string[] {
  if (!existsSync(paths.registry)) return [];
  const registry = JSON.parse(readFileSync(paths.registry, "utf8")) as { templates: Array<{ id: string; latest: string | null }> };
  const gaps: string[] = [];
  for (const { id, latest } of registry.templates) {
    if (!latest) continue;
    for (const product of showcaseProducts()) {
      const run = join(SITE, product, id, "run.json");
      const version = existsSync(run) ? (JSON.parse(readFileSync(run, "utf8")) as { version?: string }).version : undefined;
      if (version !== latest) gaps.push(`${id}@${latest} on ${product}${version ? ` (shows ${version})` : ""}`);
    }
  }
  return gaps;
}
