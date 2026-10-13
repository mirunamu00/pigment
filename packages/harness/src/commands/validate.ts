import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { CONTRAST_PAIRS, REQUIRED_COMPONENTS, REQUIRED_PRIMITIVE_GROUPS, REQUIRED_SEMANTIC_TOKENS } from "@pigment/schema";
import { contrast } from "../color.ts";
import { paths } from "../paths.ts";
import { loadTemplate, resolveTokens, type LoadedTemplate } from "../template.ts";
import { listFiles, readJson } from "../util.ts";
import type { Intake } from "./intake.ts";

export interface Finding {
  level: "error" | "warning";
  rule: string;
  message: string;
}

const INSTRUCTION_SECTIONS = ["## New project", "## Existing project", "## Ongoing development", "## Verification", "## Rollback"];
// Instruction-file names (CLAUDE.md, GEMINI.md) are fine: the package tells agents to write pointers into them.
const VENDOR_TERMS = [/\bclaude\b(?!\.md)/i, /\bcodex\b/i, /\bcursor\b/i, /\bcopilot\b/i, /\bgemini\b(?!\.md)/i, /(^|\s)\/[a-z][a-z-]+\s/m];
const BUNDLE_WORD_BUDGET = 6000;

/** Markdown with fenced code removed, so examples inside code blocks don't trip prose rules. */
function prose(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
}

export function validateTemplate(tpl: LoadedTemplate): Finding[] {
  const findings: Finding[] = [];
  const err = (rule: string, message: string) => findings.push({ level: "error", rule, message });
  const warn = (rule: string, message: string) => findings.push({ level: "warning", rule, message });
  const { manifest } = tpl;

  // Manifest + files
  if (manifest.id !== tpl.id || manifest.version !== tpl.version) err("manifest.identity", "manifest id/version must match the folder");
  for (const file of [
    manifest.artifacts.principles,
    manifest.artifacts.components,
    manifest.artifacts.instructions,
    manifest.artifacts.tokens.primitives,
    manifest.artifacts.tokens.light,
    manifest.artifacts.tokens.dark,
  ]) {
    if (file && !existsSync(join(tpl.dir, file))) err("files.exist", `missing ${file}`);
  }
  for (const mode of manifest.tags.appearance) {
    if (!tpl.modes[mode]) err("tokens.modes", `tags.appearance lists "${mode}" but there is no semantic token file for it`);
  }
  for (const font of manifest.fonts) {
    if (!font.cjkFallback) warn("fonts.cjk", `font role "${font.role}" has no CJK fallback`);
    if (/proprietary|commercial|unknown/i.test(font.license)) err("fonts.license", `font "${font.family}" must be redistributable (got "${font.license}")`);
  }

  // Tokens
  const primitivesOnly = resolveTokensSafe(tpl, undefined, err);
  for (const group of REQUIRED_PRIMITIVE_GROUPS) {
    if (![...primitivesOnly.keys()].some((p) => p === group || p.startsWith(`${group}.`))) err("tokens.primitives", `missing primitive group "${group}"`);
  }
  for (const [mode, tree] of Object.entries(tpl.modes)) {
    const resolved = resolveTokensSafe(tpl, tree, err);
    for (const name of REQUIRED_SEMANTIC_TOKENS) {
      if (!resolved.has(name)) err("tokens.semantic", `[${mode}] missing ${name}`);
    }
    for (const pair of CONTRAST_PAIRS) {
      const fg = resolved.get(pair.fg)?.value;
      const bg = resolved.get(pair.bg)?.value;
      if (typeof fg !== "string" || typeof bg !== "string") continue;
      const ratio = contrast(fg, bg);
      if (ratio < pair.min) err("tokens.contrast", `[${mode}] ${pair.label}: ${pair.fg} on ${pair.bg} is ${ratio.toFixed(2)}:1, needs ${pair.min}:1`);
    }
  }

  // Components
  const listed = new Map(tpl.components.components.map((c) => [c.name, c]));
  for (const name of REQUIRED_COMPONENTS) {
    const entry = listed.get(name);
    if (!entry) err("components.required", `missing required component "${name}"`);
    else if (entry.status === "unsupported") err("components.required", `required component "${name}" cannot be unsupported`);
    else if (entry.file && !existsSync(join(tpl.dir, "components", entry.file))) err("files.exist", `missing components/${entry.file}`);
  }

  // Instructions
  const instructions = tpl.read(manifest.artifacts.instructions);
  let cursor = -1;
  for (const section of INSTRUCTION_SECTIONS) {
    const at = instructions.indexOf(section);
    if (at < 0) err("instructions.sections", `missing section "${section}"`);
    else if (at < cursor) err("instructions.sections", `section "${section}" is out of order`);
    else cursor = at;
  }

  // Prose rules across every markdown file in the package
  const markdownFiles = listFiles(tpl.dir, (f) => f.endsWith(".md") && !f.includes(`${join("", "dist")}`));
  const intake = findIntake(tpl);
  for (const file of markdownFiles) {
    const name = file.slice(tpl.dir.length + 1).replaceAll("\\", "/");
    const text = prose(readFileSync(file, "utf8"));
    if (/TODO\(/.test(text)) err("skeleton.todo", `${name}: unfilled skeleton placeholder (TODO(...))`);
    const hexes = text.match(/#[0-9a-fA-F]{6}\b/g);
    if (hexes) err("prose.raw-values", `${name}: raw hex values in prose (${[...new Set(hexes)].slice(0, 4).join(", ")}) — reference tokens instead`);
    for (const term of VENDOR_TERMS) {
      if (term.test(text)) err("prose.agent-neutral", `${name}: vendor-specific wording matches ${term}`);
    }
    for (const brand of intake?.brandTerms ?? []) {
      if (brand && new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)) {
        err("provenance.brand", `${name}: mentions reference brand term "${brand}"`);
      }
    }
    if (/\b(beautiful|modern|clean|sleek|elegant|stunning)\b/i.test(text) && !name.endsWith("visual-language.md")) {
      warn("prose.adjectives", `${name}: vague adjectives — replace with measurable rules`);
    }
  }
  for (const brand of intake?.brandTerms ?? []) {
    if (brand && manifest.name.toLowerCase().includes(brand.toLowerCase())) err("provenance.name", `template name contains reference brand "${brand}"`);
  }

  // Bundle budget (only when built)
  const bundle = join(tpl.dir, "dist", "agent.md");
  if (existsSync(bundle)) {
    const words = readFileSync(bundle, "utf8").split(/\s+/).length;
    if (words > BUNDLE_WORD_BUDGET) err("bundle.budget", `agent.md has ${words} words, budget is ${BUNDLE_WORD_BUDGET}`);
  }
  return findings;
}

function resolveTokensSafe(tpl: LoadedTemplate, tree: LoadedTemplate["primitives"] | undefined, err: (r: string, m: string) => void) {
  try {
    return resolveTokens(tpl.primitives, tree);
  } catch (e) {
    err("tokens.aliases", (e as Error).message);
    return new Map<string, { value: unknown; type?: string }>();
  }
}

function findIntake(tpl: LoadedTemplate): Intake | undefined {
  const analysis = tpl.manifest.provenance.analysis;
  if (!analysis) return undefined;
  const intakeFile = join(paths.root, analysis, "..", "intake.json");
  return existsSync(intakeFile) ? readJson<Intake>(intakeFile) : undefined;
}

export function validate(id: string, version: string): boolean {
  const tpl = loadTemplate(id, version);
  const findings = validateTemplate(tpl);
  const errors = findings.filter((f) => f.level === "error");
  for (const f of findings) console.log(`${f.level === "error" ? "✖" : "!"} [${f.rule}] ${f.message}`);
  console.log(`\n${id}@${version}: ${errors.length} error(s), ${findings.length - errors.length} warning(s)`);
  return errors.length === 0;
}
