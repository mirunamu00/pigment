/**
 * Builds the npm package into packages/mcp/release/:
 *
 *   release/
 *   ├── package.json   no dependencies: everything is bundled
 *   ├── README.md
 *   ├── cli.js         the server, bundled with esbuild
 *   └── content/       a snapshot of every published version (immutable, so it never goes stale)
 *
 * Run with `pnpm --filter @pigment/mcp release:build`; publish with `npm publish ./release` (CI does this; see .github/workflows/release-mcp.yml).
 */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { getShots, registry } from "@pigment/content";

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repo = resolve(pkgDir, "..", "..");
const out = join(pkgDir, "release");
const pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")) as { version: string; description: string };

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

await build({
  entryPoints: [join(pkgDir, "src", "cli.ts")],
  outfile: join(out, "cli.js"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  minify: false,
  legalComments: "none",
  // Some bundled CommonJS dependencies call require(); give the ESM bundle one.
  banner: { js: 'import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);' },
  logLevel: "warning",
});

// Content snapshot: only published versions, without the zip packages (the site serves those).
const reg = registry();
const published = reg.templates
  .map((t) => ({ ...t, versions: t.versions.filter((v) => v.status === "published") }))
  .filter((t) => t.versions.length);
const content = join(out, "content");
mkdirSync(content, { recursive: true });
writeFileSync(join(content, "registry.json"), JSON.stringify({ templates: published }, null, 2) + "\n");
const shots: Record<string, Record<string, string>> = {};
for (const t of published) {
  for (const v of t.versions) {
    const src = join(repo, "content", "templates", t.id, v.version);
    cpSync(src, join(content, "templates", t.id, v.version), { recursive: true, filter: (f) => !f.endsWith(".zip") });
    shots[`${t.id}@${v.version}`] = getShots(t.id, v.version);
  }
}
writeFileSync(join(content, "shots.json"), JSON.stringify(shots, null, 2) + "\n");

writeFileSync(
  join(out, "package.json"),
  JSON.stringify(
    {
      name: "pigment-mcp",
      version: pkg.version,
      description: pkg.description,
      type: "module",
      bin: { "pigment-mcp": "cli.js" },
      files: ["cli.js", "content", "README.md", "LICENSE"],
      engines: { node: ">=22" },
      keywords: ["mcp", "model-context-protocol", "design-system", "design-tokens", "ai-agent"],
      license: "MIT",
      author: "mirunamu00 (https://github.com/mirunamu00)",
      homepage: "https://pigmentui.com",
      bugs: "https://github.com/mirunamu00/pigment/issues",
      repository: { type: "git", url: "git+https://github.com/mirunamu00/pigment.git", directory: "packages/mcp" },
      publishConfig: { access: "public" },
    },
    null,
    2,
  ) + "\n",
);
cpSync(join(pkgDir, "README.md"), join(out, "README.md"));
cpSync(join(repo, "LICENSE"), join(out, "LICENSE"));

const systems = published.map((t) => `${t.id}@${t.versions.map((v) => v.version).join(",")}`).join(" ");
console.error(`built pigment-mcp ${pkg.version} → ${out} (${systems || "no published systems"})`);
