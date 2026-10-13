import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { EvalReport, Registry } from "@pigment/schema";
import { paths, rel, runsDir, templateDir } from "../paths.ts";
import { loadTemplate } from "../template.ts";
import { fail, hashDir, ok, readJson, timestamp, writeJson } from "../util.ts";
import type { ShotResult } from "./shoot.ts";
import { bundle } from "./bundle.ts";
import { validateTemplate } from "./validate.ts";

export function readRegistry(): Registry {
  return existsSync(paths.registry) ? Registry.parse(readJson(paths.registry)) : { templates: [] };
}

export function readPublished(): Record<string, string> {
  return existsSync(paths.published) ? readJson<Record<string, string>>(paths.published) : {};
}

function latestEval(id: string, version: string): EvalReport | null {
  const dir = runsDir(id, version);
  if (!existsSync(dir)) return null;
  const evals = readdirSync(dir).filter((f) => /^eval-\d+\.json$/.test(f)).sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)));
  return evals.length ? EvalReport.parse(readJson(join(dir, evals[evals.length - 1]!))) : null;
}

/**
 * Freezes a version. Requires a passing evaluation (gates + critic) and the name of the human who approved
 * it. After this the folder hash is recorded and `check-all` fails if anything in it changes.
 */
export function publish(id: string, version: string, approvedBy: string): void {
  if (!approvedBy) fail("publishing needs --approved-by <name>: a person must approve the evaluation first");
  const published = readPublished();
  if (published[`${id}@${version}`]) fail(`${id}@${version} is already published and immutable — publish a new version`);
  if (/-/.test(version)) fail("pre-release versions (with -rc) cannot be published; scaffold the final version from the last candidate");

  const report = latestEval(id, version);
  if (!report) fail(`no evaluation for ${id}@${version}`);
  if (report.verdict !== "pass") fail(`latest evaluation is "${report.verdict}" — it must be "pass" (gates and critic)`);

  const tpl = loadTemplate(id, version);
  const errors = validateTemplate(tpl).filter((f) => f.level === "error");
  if (errors.length) fail(`validation errors:\n${errors.map((e) => `  [${e.rule}] ${e.message}`).join("\n")}`);

  // Flip status, rebuild the bundle with the final manifest, then hash.
  const manifest = { ...tpl.manifest, status: "published" as const };
  writeJson(join(tpl.dir, "manifest.json"), manifest);
  bundle(id, version);
  const sha = hashDir(templateDir(id, version));

  // Gallery assets: the screenshots of the evaluated runs and the offline package.
  const assets = join(paths.webPublic, id, version);
  for (const run of report.runs) {
    const runDir = join(runsDir(id, version), run.app, run.runId);
    const shots = readJson<ShotResult>(join(runDir, "shots.json"));
    // Gallery assets are page captures; interaction-state captures stay in the review only.
    const pages = shots.screenshots.filter((x) => !x.route.startsWith("state:"));
    for (const s of pages) {
      const dest = join(assets, run.app, s.file.replace(/^screenshots\//, ""));
      mkdirSync(join(dest, ".."), { recursive: true });
      cpSync(join(runDir, s.file), dest);
    }
    // The cover is the app's first capture route (its home), not whichever file sorts first.
    const meta = readJson<{ routes: Array<{ path: string; capture: boolean }> }>(join(runDir, "app", "pigment.app.json"));
    const coverRoute = meta.routes.find((r) => r.capture)?.path;
    const pick = (viewport: string, scheme: string) =>
      pages.find((s) => s.route === coverRoute && s.viewport === viewport && s.scheme === scheme)?.file.replace(/^screenshots\//, "");
    writeJson(join(assets, run.app, "cover.json"), {
      route: coverRoute,
      desktopLight: pick("desktop", "light"),
      desktopDark: pick("desktop", "dark"),
      mobileLight: pick("mobile", "light"),
      mobileDark: pick("mobile", "dark"),
    });
  }
  const zip = join(tpl.dir, "dist", `${id}-${version}.zip`);
  mkdirSync(join(paths.root, "apps", "web", "public", "packages"), { recursive: true });
  cpSync(zip, join(paths.root, "apps", "web", "public", "packages", `${id}-${version}.zip`));

  const registry = readRegistry();
  let entry = registry.templates.find((t) => t.id === id);
  if (!entry) {
    entry = { id, latest: null, versions: [] };
    registry.templates.push(entry);
  }
  entry.versions = entry.versions.filter((v) => v.version !== version);
  entry.versions.push({ version, status: "published", publishedAt: timestamp(), sha256: sha });
  entry.latest = version;
  writeJson(paths.registry, Registry.parse(registry));
  writeJson(paths.published, { ...published, [`${id}@${version}`]: sha });
  writeJson(join(runsDir(id, version), "approval.json"), { approvedBy, approvedAt: timestamp(), evaluation: report.iteration, sha256: sha });
  const mcpVersion = bumpMcpPackage();
  ok(`published ${id}@${version} (sha256 ${sha.slice(0, 12)}…) — assets in ${rel(assets)}`);
  ok(`pigment-mcp (npm) → ${mcpVersion}: the npm package bundles published content, so CI releases it with this version`);
}

/** The npm MCP server ships a snapshot of published content; a new version is a new package release. */
function bumpMcpPackage(): string {
  const file = join(paths.root, "packages", "mcp", "package.json");
  const pkg = readJson<{ version: string }>(file);
  const [major, minor] = pkg.version.split(".").map(Number);
  pkg.version = `${major}.${minor! + 1}.0`;
  writeJson(file, pkg);
  return pkg.version;
}

/** CI check: every template validates and every published version is byte-identical to when it was frozen. */
export function checkAll(): boolean {
  let good = true;
  if (!existsSync(paths.templates)) return true;
  for (const id of readdirSync(paths.templates)) {
    for (const version of readdirSync(join(paths.templates, id))) {
      try {
        const errors = validateTemplate(loadTemplate(id, version)).filter((f) => f.level === "error");
        if (errors.length) {
          good = false;
          console.log(`✖ ${id}@${version}: ${errors.length} validation error(s)`);
        }
      } catch (e) {
        good = false;
        console.log(`✖ ${id}@${version}: ${(e as Error).message}`);
      }
    }
  }
  for (const [ref, sha] of Object.entries(readPublished())) {
    const [id, version] = ref.split("@");
    const dir = templateDir(id!, version!);
    if (!existsSync(dir) || hashDir(dir) !== sha) {
      good = false;
      console.log(`✖ ${ref} changed after publishing — published versions are immutable`);
    }
  }
  if (good) ok("all templates valid, published versions intact");
  return good;
}
