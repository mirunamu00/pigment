import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { paths, rel, templateDir } from "../paths.ts";
import { fail, listFiles, ok } from "../util.ts";

export function scaffold(id: string, version: string, options: { name: string; from?: string }): void {
  if (!/^[a-z][a-z0-9-]{1,40}$/.test(id)) fail("id: lowercase letters, digits and dashes");
  const dest = templateDir(id, version);
  if (existsSync(dest)) fail(`${rel(dest)} already exists`);

  if (options.from) {
    // New version of an existing template: start from the previous version's files.
    const [fromId, fromVersion] = options.from.split("@");
    const src = templateDir(fromId!, fromVersion!);
    if (!existsSync(src)) fail(`${rel(src)} does not exist`);
    cpSync(src, dest, { recursive: true, filter: (p) => !p.includes(`${join("", "dist")}`) });
    const manifestFile = join(dest, "manifest.json");
    const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
    manifest.version = version;
    manifest.status = "draft";
    writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n");
  } else {
    cpSync(paths.skeleton, dest, { recursive: true });
    for (const file of listFiles(dest)) {
      const text = readFileSync(file, "utf8")
        .replaceAll("{{id}}", id)
        .replaceAll("{{version}}", version)
        .replaceAll("{{name}}", options.name);
      writeFileSync(file, text);
    }
  }
  ok(`scaffolded ${rel(dest)}`);
  console.log(`  next: fill it in, then pnpm harness validate ${id}@${version}`);
}
