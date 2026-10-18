import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ComponentIndex, Manifest, resolveTokens, type TokenTree } from "@pigment/schema";
import { templateDir } from "./paths.ts";
import { readJson } from "./util.ts";

export interface LoadedTemplate {
  id: string;
  version: string;
  dir: string;
  manifest: Manifest;
  components: ComponentIndex;
  primitives: TokenTree;
  modes: Partial<Record<"light" | "dark", TokenTree>>;
  read(rel: string): string;
}

export function loadTemplate(id: string, version: string): LoadedTemplate {
  const dir = templateDir(id, version);
  if (!existsSync(dir)) throw new Error(`No template at content/templates/${id}/${version}`);
  return loadTemplateFrom(dir, id, version);
}

export function loadTemplateFrom(dir: string, id: string, version: string): LoadedTemplate {
  const manifest = Manifest.parse(readJson(join(dir, "manifest.json")));
  const components = ComponentIndex.parse(readJson(join(dir, manifest.artifacts.components)));
  const primitives = readJson<TokenTree>(join(dir, manifest.artifacts.tokens.primitives));
  const modes: LoadedTemplate["modes"] = {};
  if (manifest.artifacts.tokens.light) modes.light = readJson<TokenTree>(join(dir, manifest.artifacts.tokens.light));
  if (manifest.artifacts.tokens.dark) modes.dark = readJson<TokenTree>(join(dir, manifest.artifacts.tokens.dark));
  return {
    id,
    version,
    dir,
    manifest,
    components,
    primitives,
    modes,
    read: (rel) => readFileSync(join(dir, rel), "utf8"),
  };
}

export { resolveTokens };

export function colorPalette(tpl: LoadedTemplate): string[] {
  const colors = new Set<string>();
  for (const mode of Object.values(tpl.modes)) {
    for (const [, token] of resolveTokens(tpl.primitives, mode)) {
      if (token.type === "color" && typeof token.value === "string") colors.add(token.value.toLowerCase());
    }
  }
  return [...colors];
}

export function radiusSet(tpl: LoadedTemplate): number[] {
  const out = new Set<number>();
  for (const [path, token] of resolveTokens(tpl.primitives)) {
    if (path.startsWith("radius.") && typeof token.value === "string") out.add(parseFloat(token.value));
  }
  return [...out];
}

export function spaceScale(tpl: LoadedTemplate): number[] {
  const out = new Set<number>();
  for (const [path, token] of resolveTokens(tpl.primitives)) {
    if (/^(space|spacing)\./.test(path) && typeof token.value === "string") out.add(parseFloat(token.value));
  }
  return [...out].filter((n) => Number.isFinite(n));
}

export function fontFamilies(tpl: LoadedTemplate): string[] {
  return tpl.manifest.fonts.flatMap((f) => [f.family, ...f.fallback.split(","), ...(f.cjkFallback?.split(",") ?? [])]).map(normalizeFamily);
}

export function normalizeFamily(family: string): string {
  // Variable-font packages register the same typeface under a suffixed name ("Inter Variable", "Inter VF").
  return family.trim().replace(/^["']|["']$/g, "").replace(/\s+(variable|vf)$/i, "").toLowerCase();
}
