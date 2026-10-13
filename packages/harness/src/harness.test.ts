import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { resolveTokens } from "@pigment/schema";
import { contrast, distance, nearest } from "./color.ts";
import { buildAgentMd, buildCss } from "./commands/bundle.ts";
import { validateTemplate } from "./commands/validate.ts";
import { paths } from "./paths.ts";
import { colorPalette, loadTemplateFrom } from "./template.ts";
import { listFiles } from "./util.ts";

/** Copies the skeleton the way `scaffold` does, optionally replacing every TODO(...) with real text. */
function scaffoldTemp(fill: boolean) {
  const dir = mkdtempSync(join(tmpdir(), "pigment-test-"));
  cpSync(paths.skeleton, dir, { recursive: true });
  for (const file of listFiles(dir)) {
    let text = readFileSync(file, "utf8").replaceAll("{{id}}", "test-system").replaceAll("{{version}}", "0.1.0").replaceAll("{{name}}", "Test System");
    if (fill) text = text.replace(/TODO\(([^)]*)\)/g, (_, inner: string) => inner || "specified");
    writeFileSync(file, text);
  }
  return loadTemplateFrom(dir, "test-system", "0.1.0");
}

test("unfilled skeleton fails only on placeholders", () => {
  const findings = validateTemplate(scaffoldTemp(false)).filter((f) => f.level === "error");
  assert.ok(findings.length > 0);
  assert.deepEqual([...new Set(findings.map((f) => f.rule))], ["skeleton.todo"]);
});

test("filled skeleton validates: tokens complete, contrast passes, sections in order", () => {
  const errors = validateTemplate(scaffoldTemp(true)).filter((f) => f.level === "error");
  assert.deepEqual(errors, []);
});

test("aliases resolve through primitives per mode", () => {
  const tpl = scaffoldTemp(true);
  const light = resolveTokens(tpl.primitives, tpl.modes.light);
  const dark = resolveTokens(tpl.primitives, tpl.modes.dark);
  assert.equal(light.get("color.text.primary")?.value, "#18181b");
  assert.equal(dark.get("color.text.primary")?.value, "#f7f7f8");
  assert.ok(colorPalette(tpl).includes("#1f55e0"));
});

test("broken alias is reported, not thrown", () => {
  const tpl = scaffoldTemp(true);
  (tpl.modes.light as any).color.text.primary.$value = "{color.missing.900}";
  const rules = validateTemplate(tpl).map((f) => f.rule);
  assert.ok(rules.includes("tokens.aliases"));
});

test("low contrast is caught", () => {
  const tpl = scaffoldTemp(true);
  (tpl.modes.light as any).color.text.secondary.$value = "{color.neutral.300}";
  const messages = validateTemplate(tpl).filter((f) => f.rule === "tokens.contrast").map((f) => f.message);
  assert.ok(messages.some((m) => m.includes("secondary text")));
});

test("raw hex and vendor names in prose are rejected; CLAUDE.md file name is allowed", () => {
  const tpl = scaffoldTemp(true);
  writeFileSync(join(tpl.dir, "components", "badge.md"), "Use #ff0000 for badges. Ask Claude to do it.");
  const rules = validateTemplate(tpl).map((f) => f.rule);
  assert.ok(rules.includes("prose.raw-values"));
  assert.ok(rules.includes("prose.agent-neutral"));
  const instructions = readFileSync(join(tpl.dir, "agent", "instructions.md"), "utf8");
  assert.ok(instructions.includes("CLAUDE.md"));
});

test("changelog: a final version needs a public entry — summary first, no version numbers or pipeline notes", () => {
  const tpl = scaffoldTemp(true);
  const file = join(tpl.dir, "CHANGELOG.md");
  const rules = () => validateTemplate(tpl).filter((f) => f.level === "error").map((f) => f.rule);

  writeFileSync(file, "# Changelog\n\n## 0.1.0\n\nButtons are softer and tables denser.\n\n- `radius.md` is now 10px.\n");
  assert.deepEqual(rules(), []);

  writeFileSync(file, "# Changelog\n\n## 0.1.0\n\nFixes from 0.0.9 after the critic review.\n");
  assert.deepEqual(rules(), ["changelog.public", "changelog.public"]);

  writeFileSync(file, "# Changelog\n\n## 0.1.0\n\n- `radius.md` is now 10px.\n");
  assert.deepEqual(rules(), ["changelog.summary"]);

  writeFileSync(file, "# Changelog\n\n## 0.0.9\n\nOlder.\n");
  assert.deepEqual(rules(), ["changelog.entry"]);
});

test("schema 2: signature elements need every part and a code recipe; the concept is mapped onto screens", () => {
  const tpl = scaffoldTemp(true);
  assert.equal(tpl.manifest.schemaVersion, 2);
  const file = join(tpl.dir, "principles", "visual-language.md");
  const filled = readFileSync(file, "utf8");
  const rules = () => validateTemplate(tpl).filter((f) => f.level === "error").map((f) => f.message);

  writeFileSync(file, filled.replace("**Limits.**", "**Bounds.**"));
  assert.ok(rules().some((m) => m.includes("missing **Limits.**")));

  writeFileSync(file, filled.replace(/```css[\s\S]*?```/, "Draw it nicely."));
  assert.ok(rules().some((m) => m.includes("needs a code block")));

  writeFileSync(file, filled.replace(/\| Card grid[\s\S]*?\| Toast or confirmation[^\n]*\n/, ""));
  assert.ok(rules().some((m) => m.includes("Applying the concept covers")));

  writeFileSync(file, filled.replace("## Interaction", "## Interactions"));
  assert.ok(rules().some((m) => m.includes('missing "## Interaction"')));
});

test("bundle: css has light root, dark overrides and cubic-bezier; agent.md leads with principles", () => {
  const tpl = scaffoldTemp(true);
  const css = buildCss(tpl);
  assert.match(css, /:root \{[\s\S]*--color-text-primary: #18181b;/);
  assert.match(css, /\[data-theme="dark"\] \{[\s\S]*--color-text-primary: #f7f7f8;/);
  assert.match(css, /--motion-easing-standard: cubic-bezier\(0\.2, 0, 0, 1\);/);
  const md = buildAgentMd(tpl);
  assert.ok(md.indexOf("## Character") < md.indexOf("## Semantic color tokens"));
  assert.ok(md.includes("## Rollback"));
});

test("color math", () => {
  assert.ok(contrast("#000000", "#ffffff") > 20);
  assert.equal(distance("#1849f2", "#1849f2"), 0);
  assert.equal(nearest("#1849f3", ["#ffffff", "#1849f2"]).hex, "#1849f2");
});
