import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { EvalReport, Registry } from "@pigment/schema";
import { paths, rel, runsDir, templateDir } from "../paths.ts";
import { loadTemplate } from "../template.ts";
import { fail, hashDir, listFiles, ok, readJson, timestamp, writeJson } from "../util.ts";
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

/** Manifest fields that describe a system without changing what an agent builds from it. */
const METADATA_FIELDS = ["name", "description", "version", "status"] as const;

/**
 * Differences between two versions of a package beyond metadata: every file except the changelog and the
 * generated bundle must be identical, and the manifests may differ only in METADATA_FIELDS.
 */
export function designDifferences(id: string, from: string, to: string): string[] {
  const a = templateDir(id, from);
  const b = templateDir(id, to);
  const files = (dir: string) =>
    listFiles(dir, (f) => !/[\\/]dist[\\/]/.test(f.slice(dir.length)))
      .map((f) => f.slice(dir.length + 1).replaceAll("\\", "/"))
      .filter((f) => f !== "CHANGELOG.md" && f !== "manifest.json");
  const left = files(a);
  const right = files(b);
  const out: string[] = [];
  for (const f of new Set([...left, ...right])) {
    if (!left.includes(f) || !right.includes(f)) out.push(`${f} (added or removed)`);
    else if (!readFileSync(join(a, f)).equals(readFileSync(join(b, f)))) out.push(f);
  }
  const strip = (dir: string) => {
    const m = readJson<Record<string, unknown>>(join(dir, "manifest.json"));
    for (const k of METADATA_FIELDS) delete m[k];
    return JSON.stringify(m);
  };
  if (strip(a) !== strip(b)) out.push("manifest.json (beyond name, description, version, status)");
  return out;
}

/**
 * Freezes a version. Requires a passing evaluation (gates + critic) and the name of the human who approved
 * it. After this the folder hash is recorded and `check-all` fails if anything in it changes.
 *
 * `carryFrom` publishes on another version's evaluation and screenshots, without generating the apps again:
 * a published version for a metadata-only change (a new name or description), or the passing candidate a
 * final version was scaffolded from. It is refused when anything an agent builds from (tokens, principles,
 * components, instructions) differs: the screenshots must come from the same design the user gets.
 */
export function publish(id: string, version: string, approvedBy: string, carryFrom?: string): void {
  if (!approvedBy) fail("publishing needs --approved-by <name>: a person must approve the evaluation first");
  const published = readPublished();
  if (published[`${id}@${version}`]) fail(`${id}@${version} is already published and immutable — publish a new version`);
  if (/-/.test(version)) fail("pre-release versions (with -rc) cannot be published; scaffold the final version from the last candidate");
  if (carryFrom) {
    // A published version (a rename) or the candidate the final version was scaffolded from: either way the
    // evaluation below must pass, and the design files must be identical.
    if (!published[`${id}@${carryFrom}`] && !/-/.test(carryFrom)) fail(`--carry-from ${id}@${carryFrom}: not a published version or a candidate`);
    const diff = designDifferences(id, carryFrom, version);
    if (diff.length) {
      const list = diff.map((d) => `  ${d}`).join("\n");
      fail(`--carry-from needs a metadata-only change, but these differ from ${carryFrom}:\n${list}\nGenerate and evaluate ${version} instead.`);
    }
  }

  // The evaluation (and the screenshots it covers) comes from this version, or the version it carries.
  const evaluated = carryFrom ?? version;
  const report = latestEval(id, evaluated);
  if (!report) fail(`no evaluation for ${id}@${evaluated}`);
  if (report.verdict !== "pass") fail(`latest evaluation is "${report.verdict}" — it must be "pass" (gates and critic)`);

  // Flip status and rebuild the bundle with the final manifest, then validate what will actually be frozen —
  // a stale bundle (e.g. one copied by scaffold before a rename) can pass while the final one doesn't.
  const tpl = loadTemplate(id, version);
  writeJson(join(tpl.dir, "manifest.json"), { ...tpl.manifest, status: "published" as const });
  bundle(id, version);
  const errors = validateTemplate(loadTemplate(id, version)).filter((f) => f.level === "error");
  if (errors.length) {
    writeJson(join(tpl.dir, "manifest.json"), tpl.manifest);
    bundle(id, version);
    fail(`validation errors:\n${errors.map((e) => `  [${e.rule}] ${e.message}`).join("\n")}`);
  }
  const sha = hashDir(templateDir(id, version));

  // Gallery assets: the screenshots of the evaluated runs.
  const assets = join(paths.webPublic, id, version);
  for (const run of report.runs) {
    const runDir = join(runsDir(id, evaluated), run.app, run.runId);
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
  writeJson(join(runsDir(id, version), "approval.json"), {
    approvedBy,
    approvedAt: timestamp(),
    evaluation: report.iteration,
    ...(carryFrom ? { carriedFrom: carryFrom } : {}),
    sha256: sha,
  });
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
