import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { ComponentIndex, Manifest, Registry, resolveTokens, type TokenTree } from "@pigment/schema";

export type ErrorCode = "unknown_template" | "unknown_version" | "invalid_component" | "unavailable_artifact" | "invalid_mode";

/** Errors the API and MCP surface with a stable code, so clients can tell "no such template" from "no such version". */
export class ContentError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
  ) {
    super(message);
  }
}

function findContentRoot(): string {
  if (process.env.PIGMENT_CONTENT_DIR) return resolve(process.env.PIGMENT_CONTENT_DIR);
  let dir = process.cwd();
  while (true) {
    if (existsSync(join(dir, "content", "registry.json"))) return join(dir, "content");
    const parent = dirname(dir);
    if (parent === dir) throw new Error("content/registry.json not found — set PIGMENT_CONTENT_DIR");
    dir = parent;
  }
}

let root: string | null = null;
function contentRoot(): string {
  return (root ??= findContentRoot());
}

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, "utf8")) as T;
}

export function registry(): Registry {
  return Registry.parse(readJson(join(contentRoot(), "registry.json")));
}

export interface TemplateSummary {
  id: string;
  version: string;
  name: string;
  description: string;
  tags: Manifest["tags"];
  versions: string[];
  /** Five representative colors for palette chips: surface, subtle surface, text, action, accent hover. */
  swatches: string[];
  /** Demo screenshots exported at publish time, relative to the site's public folder. */
  shots: Record<string, string>;
}

/** Only versions recorded as published in the registry are served — drafts and candidates never leak. */
function publishedVersions(id: string): string[] {
  const entry = registry().templates.find((t) => t.id === id);
  if (!entry) throw new ContentError("unknown_template", `No published template "${id}"`);
  return entry.versions.filter((v) => v.status === "published").map((v) => v.version);
}

function versionDir(id: string, version: string): string {
  const versions = publishedVersions(id);
  const resolvedVersion = version === "latest" ? registry().templates.find((t) => t.id === id)?.latest : version;
  if (!resolvedVersion || !versions.includes(resolvedVersion)) {
    throw new ContentError("unknown_version", `"${id}" has no published version "${version}". Available: ${versions.join(", ") || "none"}`);
  }
  return join(contentRoot(), "templates", id, resolvedVersion);
}

export function getManifest(id: string, version: string): Manifest {
  return Manifest.parse(readJson(join(versionDir(id, version), "manifest.json")));
}

function readArtifact(id: string, version: string, rel: string): string {
  const file = join(versionDir(id, version), rel);
  if (!existsSync(file)) throw new ContentError("unavailable_artifact", `${id}@${version} has no ${rel}`);
  return readFileSync(file, "utf8");
}

export function getTokens(id: string, version: string): Record<string, Record<string, unknown>> {
  const manifest = getManifest(id, version);
  const dir = versionDir(id, version);
  const primitives = readJson<TokenTree>(join(dir, manifest.artifacts.tokens.primitives));
  const out: Record<string, Record<string, unknown>> = {};
  for (const mode of ["light", "dark"] as const) {
    const file = manifest.artifacts.tokens[mode];
    if (!file) continue;
    const resolved = resolveTokens(primitives, readJson<TokenTree>(join(dir, file)));
    out[mode] = Object.fromEntries([...resolved].map(([path, token]) => [path, token.value]));
  }
  return out;
}

export function getComponents(id: string, version: string): ComponentIndex {
  const manifest = getManifest(id, version);
  return ComponentIndex.parse(JSON.parse(readArtifact(id, version, manifest.artifacts.components)));
}

export function getComponentSpec(id: string, version: string, name: string): { entry: ComponentIndex["components"][number]; markdown: string } {
  const entry = getComponents(id, version).components.find((c) => c.name === name);
  if (!entry) throw new ContentError("invalid_component", `${id}@${version} has no component "${name}"`);
  if (entry.status === "unsupported" || !entry.file) return { entry, markdown: `${name} is not specified in this version.` };
  return { entry, markdown: readArtifact(id, version, join("components", entry.file)) };
}

export function getPrinciples(id: string, version: string): string {
  return readArtifact(id, version, getManifest(id, version).artifacts.principles);
}

const GUIDE_SECTIONS = { new: "## New project", existing: "## Existing project", ongoing: "## Ongoing development" } as const;

export function getGuide(id: string, version: string, mode: string): string {
  if (!(mode in GUIDE_SECTIONS)) throw new ContentError("invalid_mode", `mode must be one of ${Object.keys(GUIDE_SECTIONS).join(", ")}`);
  const text = readArtifact(id, version, getManifest(id, version).artifacts.instructions);
  const start = text.indexOf(GUIDE_SECTIONS[mode as keyof typeof GUIDE_SECTIONS]);
  const rest = text.slice(start);
  const next = rest.indexOf("\n## ", 3);
  const verification = text.slice(text.indexOf("## Verification"));
  return (next > 0 ? rest.slice(0, next) : rest).trim() + "\n\n" + verification.trim();
}

export function getAgentMd(id: string, version: string): string {
  return readArtifact(id, version, join("dist", "agent.md"));
}

/** The generated token file an agent copies into its project: `tokens.css` or `tokens.json`. */
export function getTokenFile(id: string, version: string, format: "css" | "json"): string {
  return readArtifact(id, version, join("dist", `tokens.${format}`));
}

export function packageFile(id: string, version: string): string {
  const file = join(versionDir(id, version), "dist", `${id}-${version}.zip`);
  if (!existsSync(file)) throw new ContentError("unavailable_artifact", `${id}@${version} has no package`);
  return file;
}

/** The pinned version "latest" points to. */
export function resolveVersion(id: string, version: string): string {
  return getManifest(id, version).version;
}

/** Gallery screenshots for one version, as site-relative paths keyed `<app>.<desktopLight|…>`. */
export function getShots(id: string, version: string): Record<string, string> {
  return shotsFor(id, resolveVersion(id, version));
}

function shotsFor(id: string, version: string): Record<string, string> {
  // A content snapshot shipped without the site (the npm MCP package) carries a precomputed index.
  const index = join(contentRoot(), "shots.json");
  if (existsSync(index)) return readJson<Record<string, Record<string, string>>>(index)[`${id}@${version}`] ?? {};
  const dir = join(contentRoot(), "..", "apps", "web", "public", "showcase", id, version);
  const shots: Record<string, string> = {};
  if (!existsSync(dir)) return shots;
  for (const app of readdirSync(dir)) {
    // cover.json (written at publish) names the app's home captures; fall back to the first match.
    const coverFile = join(dir, app, "cover.json");
    const cover = existsSync(coverFile) ? readJson<Record<string, string | undefined>>(coverFile) : {};
    const files = readdirSync(join(dir, app)).filter((f) => f.endsWith(".png"));
    for (const [key, re] of Object.entries({ desktopLight: /desktop-light/, desktopDark: /desktop-dark/, mobileLight: /mobile-light/, mobileDark: /mobile-dark/ })) {
      const f = cover[key] ?? files.find((x) => re.test(x));
      if (f) shots[`${app}.${key}`] = `/showcase/${id}/${version}/${app}/${f}`;
    }
  }
  return shots;
}

/** WCAG 2.x contrast ratio for two hex colors. */
export function contrastRatio(fg: string, bg: string): number {
  const lum = (hex: string) => {
    const n = parseInt(hex.slice(1, 7), 16);
    const ch = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * ch[0]! + 0.7152 * ch[1]! + 0.0722 * ch[2]!;
  };
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (a! + 0.05) / (b! + 0.05);
}

export function listTemplates(): TemplateSummary[] {
  return registry()
    .templates.filter((t) => t.latest)
    .map((t) => {
      const version = t.latest!;
      const manifest = getManifest(t.id, version);
      const tokens = getTokens(t.id, version);
      const light = tokens.light ?? tokens.dark ?? {};
      const swatch = (k: string) => (typeof light[k] === "string" ? (light[k] as string) : "#000000");
      return {
        id: t.id,
        version,
        name: manifest.name,
        description: manifest.description,
        tags: manifest.tags,
        versions: t.versions.filter((v) => v.status === "published").map((v) => v.version),
        swatches: ["color.surface.default", "color.surface.subtle", "color.text.primary", "color.action.primary", "color.action.primaryHover"].map(swatch),
        shots: shotsFor(t.id, version),
      };
    });
}
