import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
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
  /** When the current version was published (YYYY-MM-DD) — what users see instead of a version number. */
  updated: string;
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
  const dir = versionDir(id, version);
  const file = join(dir, rel);
  if (!existsSync(file)) throw new ContentError("unavailable_artifact", `${id}@${version} has no ${rel}`);
  return unversioned(id, basename(dir), readFileSync(file, "utf8"));
}

/**
 * Versions are internal: published files are frozen with their version written in (titles, the
 * design-system/VERSION step, token headers), so they are presented with the update date instead.
 */
function unversioned(id: string, version: string, text: string): string {
  const name = getManifest(id, version).name;
  const date = (registry().templates.find((t) => t.id === id)?.versions.find((v) => v.version === version)?.publishedAt ?? "").slice(0, 10);
  return text
    .replaceAll(`${name} ${version}`, name)
    .replaceAll(`${id}@${version}`, date ? `${id}, updated ${date}` : id)
    .replaceAll(`"version": "${version}",`, `"updated": "${date}",`);
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
  if (entry.status === "unsupported" || !entry.file) return { entry, markdown: `${name} is not specified in this system.` };
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

export interface HistoryEntry {
  /** Publish date, YYYY-MM-DD. Users and agents see dates, never version numbers. */
  date: string;
  summary: string;
  changes: string[];
}

/** One published version's CHANGELOG.md entry: the opening paragraph and the bullet list. */
function changelogEntry(id: string, version: string): { summary: string; changes: string[] } {
  let md: string;
  try {
    md = readArtifact(id, version, "CHANGELOG.md").replace(/\r\n/g, "\n");
  } catch {
    return { summary: "", changes: [] };
  }
  const start = md.indexOf(`\n## ${version}\n`);
  if (start < 0) return { summary: "", changes: [] };
  const rest = md.slice(start + version.length + 5);
  const section = rest.slice(0, rest.search(/\n## |$/)).trim();
  const summary = (section.split(/\n\s*\n/)[0] ?? "").replace(/\s*\n\s*/g, " ").trim();
  const changes: string[] = [];
  for (const line of section.split("\n")) {
    if (line.startsWith("- ")) changes.push(line.slice(2).trim());
    else if (/^\s+\S/.test(line) && changes.length) changes[changes.length - 1] += ` ${line.trim()}`;
  }
  return { summary, changes };
}

/**
 * A system's update history, newest first. Versions stay internal (each release is an immutable folder that
 * its gallery screenshots belong to); what people and agents see is a dated changelog.
 */
export function getHistory(id: string): HistoryEntry[] {
  const entry = registry().templates.find((t) => t.id === id);
  if (!entry) throw new ContentError("unknown_template", `No published template "${id}"`);
  return entry.versions
    .filter((v) => v.status === "published")
    .reverse()
    .map((v) => ({ date: (v.publishedAt ?? "").slice(0, 10), ...changelogEntry(id, v.version) }));
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

export interface Screen {
  /** The route's name from the base app (e.g. "Product detail"), or one made from its file slug. */
  name: string;
  /** Site-relative full-page captures, keyed desktopLight | desktopDark | mobileLight | mobileDark. */
  shots: Partial<Record<"desktopLight" | "desktopDark" | "mobileLight" | "mobileDark", string>>;
}

/**
 * Every captured screen of each demo app, in the base app's route order — for views that show a whole app
 * (the mobile showcase), not just its cover. Site only: reads the exported gallery folder.
 */
export function getScreens(id: string, version: string): Record<string, Screen[]> {
  const v = resolveVersion(id, version);
  const dir = join(contentRoot(), "..", "apps", "web", "public", "showcase", id, v);
  const out: Record<string, Screen[]> = {};
  if (!existsSync(dir)) return out;
  for (const app of readdirSync(dir)) {
    const files = readdirSync(join(dir, app)).filter((f) => f.endsWith(".png"));
    const bySlug = new Map<string, Screen["shots"]>();
    for (const f of files) {
      const m = /^(.+)-(desktop|mobile)-(light|dark)\.png$/.exec(f);
      if (!m || m[1]!.startsWith("state-")) continue;
      const key = `${m[2]}${m[3] === "light" ? "Light" : "Dark"}` as keyof Screen["shots"];
      bySlug.set(m[1]!, { ...bySlug.get(m[1]!), [key]: `/showcase/${id}/${v}/${app}/${f}` });
    }
    // Route names and order come from the base app, matched by the slug the capture gives each path.
    const metaFile = join(contentRoot(), "..", "showcase", "base-apps", app, "pigment.app.json");
    const routes = existsSync(metaFile) ? readJson<{ routes: Array<{ path: string; name: string }> }>(metaFile).routes : [];
    const slugOf = (p: string) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-"));
    const order = routes.map((r) => slugOf(r.path));
    const names = new Map(routes.map((r) => [slugOf(r.path), r.name]));
    out[app] = [...bySlug.entries()]
      .sort(([a], [b]) => (order.indexOf(a) + 1 || 999) - (order.indexOf(b) + 1 || 999) || a.localeCompare(b))
      .map(([slug, shots]) => ({ name: names.get(slug) ?? slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase()), shots }));
  }
  return out;
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
        updated: (t.versions.find((v) => v.version === version)?.publishedAt ?? "").slice(0, 10),
        swatches: ["color.surface.default", "color.surface.subtle", "color.text.primary", "color.action.primary", "color.action.primaryHover"].map(swatch),
        shots: shotsFor(t.id, version),
      };
    });
}
