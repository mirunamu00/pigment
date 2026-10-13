import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function findRoot(start: string): string {
  let dir = start;
  while (true) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) throw new Error("Could not find the repository root (pnpm-workspace.yaml).");
    dir = parent;
  }
}

export const ROOT = findRoot(dirname(fileURLToPath(import.meta.url)));

export const paths = {
  root: ROOT,
  content: join(ROOT, "content"),
  templates: join(ROOT, "content", "templates"),
  skeleton: join(ROOT, "content", "_template"),
  registry: join(ROOT, "content", "registry.json"),
  published: join(ROOT, "content", "published.json"),
  pipeline: join(ROOT, "pipeline"),
  baseApps: join(ROOT, "showcase", "base-apps"),
  runs: join(ROOT, "showcase", "runs"),
  prompts: join(ROOT, "packages", "harness", "prompts"),
  webPublic: join(ROOT, "apps", "web", "public", "showcase"),
};

export function templateDir(id: string, version: string): string {
  return join(paths.templates, id, version);
}

export function pipelineDir(slug: string): string {
  return join(paths.pipeline, slug);
}

export function runsDir(id: string, version: string): string {
  return join(paths.runs, id, version);
}

/** Parses "swiss-minimal@1.0.0". */
export function parseRef(ref: string): { id: string; version: string } {
  const match = /^([a-z][a-z0-9-]*)@(.+)$/.exec(ref);
  if (!match) throw new Error(`Expected <id>@<version>, got "${ref}"`);
  return { id: match[1]!, version: match[2]! };
}

export function rel(p: string): string {
  return resolve(p).replace(ROOT, "").replace(/^[\\/]/, "").replaceAll("\\", "/");
}
