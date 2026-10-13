import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { paths, rel } from "../paths.ts";
import { loadTemplateFrom } from "../template.ts";
import { hashDir, listFiles, ok, timestamp, writeJson } from "../util.ts";
import { bundleTemplate } from "./bundle.ts";
import { validateTemplate } from "./validate.ts";

/**
 * Builds a self-contained content folder with one published test template, for end-to-end tests of the
 * site, API and MCP server. Never written into the real content/ folder.
 */
export function makeFixture(outDir: string): void {
  const out = resolve(outDir);
  if (out === resolve(paths.content)) throw new Error("refusing to overwrite the real content folder");
  if (existsSync(out)) rmSync(out, { recursive: true });
  const id = "fixture-system";
  const version = "1.0.0";
  const dir = join(out, "templates", id, version);
  cpSync(paths.skeleton, dir, { recursive: true });
  for (const file of listFiles(dir)) {
    const text = readFileSync(file, "utf8")
      .replaceAll("{{id}}", id)
      .replaceAll("{{version}}", version)
      .replaceAll("{{name}}", "Fixture System")
      .replace(/TODO\(([^)]*)\)/g, (_, inner: string) => inner || "Specified for the test fixture.");
    writeFileSync(file, text);
  }
  const manifestFile = join(dir, "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
  manifest.status = "published";
  manifest.description = "A neutral test system used by end-to-end tests of the site, the API and the MCP server.";
  writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n");

  const tpl = loadTemplateFrom(dir, id, version);
  const errors = validateTemplate(tpl).filter((f) => f.level === "error");
  if (errors.length) throw new Error(`fixture does not validate: ${errors.map((e) => e.message).join("; ")}`);
  bundleTemplate(tpl);
  const sha = hashDir(dir);
  writeJson(join(out, "registry.json"), {
    templates: [{ id, latest: version, versions: [{ version, status: "published", publishedAt: timestamp(), sha256: sha }] }],
  });
  writeJson(join(out, "published.json"), { [`${id}@${version}`]: sha });
  ok(`fixture content at ${rel(out)} (${id}@${version})`);
}
