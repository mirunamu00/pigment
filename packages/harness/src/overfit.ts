import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { paths } from "./paths.ts";
import { listFiles, readJson } from "./util.ts";

/**
 * Words that belong to the demo apps, not to a design system: their brand names, the names of their products,
 * posts, projects and people, their test ids and routes. A template that mentions them was fitted to the apps
 * it is tested on, and will not carry over to the products people actually build.
 */
export interface OverfitTerm {
  term: string;
  app: string;
  kind: "app name" | "content" | "content noun" | "test id" | "route";
}

const CONTENT_KEYS = ["name", "title", "slug", "author", "company", "headline", "plan", "project", "product", "team", "workspace"];

/** Head nouns too generic to tie a rule to one demo app. */
const GENERIC_NOUNS = new Set(
  (
    "app apps card list item items flow form page pages path plan policy prototype rules service survey team template " +
    "wizard checklist migration revamp pipeline points notes post posts state states request requests zone zones flag " +
    "flags help read week month year ring button table panel field fields label title name section checkout account " +
    "settings profile security billing cart search not-found"
  ).split(" "),
);

let cache: OverfitTerm[] | null = null;

export function baseAppTerms(baseApps = paths.baseApps): OverfitTerm[] {
  if (cache && baseApps === paths.baseApps) return cache;
  const out = new Map<string, OverfitTerm>();
  const add = (term: string, app: string, kind: OverfitTerm["kind"]) => {
    const t = term.trim();
    if (GENERIC_NOUNS.has(t.toLowerCase())) return;
    if (t.length >= 4 && !out.has(t.toLowerCase())) out.set(t.toLowerCase(), { term: t, app, kind });
  };
  const apps = existsSync(baseApps) ? listFiles(baseApps, (f) => f.endsWith("pigment.app.json") && !f.includes("node_modules")) : [];
  const keyed = new RegExp(`\\b(${CONTENT_KEYS.join("|")})\\s*:\\s*(['"\`])([^'"\`\\n]{4,60})\\2`, "g");
  for (const metaFile of apps) {
    const dir = join(metaFile, "..");
    const meta = readJson<{ id: string; name: string; routes: Array<{ path: string }> }>(metaFile);
    // "Field Notes blog" → "Field Notes": the app's brand, without the generic kind of app.
    const brand = meta.name.replace(new RegExp(`\\s+${meta.id}$`, "i"), "");
    if (brand !== meta.name) add(brand, meta.id, "app name");
    for (const route of meta.routes) {
      const last = route.path.split("/").filter(Boolean).at(-1);
      if (last && last.includes("-")) add(last, meta.id, "route");
    }
    for (const file of listFiles(join(dir, "src"), (f) => /\.(tsx?|jsx?)$/.test(f))) {
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(/data-testid=["'`]([a-z][\w-]*[a-z0-9])["'`]/g)) if (m[1]!.includes("-")) add(m[1]!, meta.id, "test id");
      if (!/[\\/]data[\\/]/.test(file)) continue;
      for (const m of text.matchAll(keyed)) {
        const value = m[3]!;
        const words = value.split(/\s+/);
        if (/^[a-z0-9-]+$/.test(value) && value.includes("-")) add(value, meta.id, "content");
        else if (words.length >= 2 && words.length <= 6) add(value, meta.id, "content");
        // The thing a short name names ("Canvas Field Tote" → "Field Tote", "Tote"): a rule written about it
        // ("the tote two-handled") fits one demo product.
        if (m[1] === "name" && words.length >= 2 && words.length <= 3) {
          add(words.slice(-2).join(" "), meta.id, "content noun");
          const head = words.at(-1)!.toLowerCase();
          if (head.length >= 4 && !GENERIC_NOUNS.has(head) && !GENERIC_NOUNS.has(head.replace(/s$/, ""))) add(words.at(-1)!, meta.id, "content noun");
        }
      }
    }
  }
  const terms = [...out.values()];
  if (baseApps === paths.baseApps) cache = terms;
  return terms;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Demo-app terms a text mentions, case-insensitively on word boundaries; a plural counts ("totes"). */
export function overfitMentions(text: string, terms: OverfitTerm[]): OverfitTerm[] {
  const lower = text.toLowerCase();
  return terms.filter((t) => {
    if (!lower.includes(t.term.toLowerCase())) return false;
    return new RegExp(`(^|[^\\w-])${escape(t.term)}s?($|[^\\w-])`, "i").test(text);
  });
}
