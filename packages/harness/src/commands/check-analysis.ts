import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { cropFirstScreens, type CropJob } from "../crop.ts";
import { chromium } from "playwright";
import { AUDIT_AREAS, Analysis, type AuditArea } from "@pigment/schema";
import { paths, pipelineDir, rel } from "../paths.ts";
import { CONTENT_HEAVY_SHARE, type Survey } from "../survey.ts";
import { fail, ok, readJson, writeJson, writeText } from "../util.ts";
import type { Intake } from "./intake.ts";

/** analysis.md sections, in order. */
export const ANALYSIS_SECTIONS = [
  "## Character",
  "## Site survey",
  "## Signature elements",
  "## Color",
  "## Typography",
  "## Spacing and layout",
  "## Section and UI patterns",
  "## Shape, borders and depth",
  "## Surfaces and backgrounds",
  "## Components",
  "## Interaction",
  "## Motion",
  "## Illustration, icons and media",
  "## Theming",
  "## Writing style",
  "## Coverage",
  "## What the reference does not show",
  "## Must not carry over",
  "## Proposed template",
];

/** A surveyed feature means the area exists on the site: it can't be reported absent. */
const FEATURE_AREAS: Array<[RegExp, AuditArea]> = [
  [/^motion:(loop|rotate|marquee)$/, "motion-loop"],
  [/^motion:(draw-on|reveal)$/, "motion-scroll"],
  [/^svg:(illustration|line-drawing)$/, "illustration"],
  [/^svg:icon$/, "iconography"],
  [/^ui:disclosure$/, "disclosure"],
  [/^ui:tabs$/, "tabs"],
  [/^ui:table$/, "tables-and-data"],
  [/^ui:(form|input|choice)$/, "forms"],
  [/^ui:theme-toggle$/, "theming"],
  [/^layout:card-grid$/, "cards"],
  [/^media:(video|autoplay-video|lottie|canvas|large-image)$/, "media"],
];

export interface AnalysisFinding {
  level: "error" | "warning";
  message: string;
}

export function checkAnalysisFiles(slug: string): AnalysisFinding[] {
  const dir = pipelineDir(slug);
  const findings: AnalysisFinding[] = [];
  const err = (message: string) => findings.push({ level: "error", message });
  const warn = (message: string) => findings.push({ level: "warning", message });

  const jsonFile = join(dir, "analysis.json");
  const mdFile = join(dir, "analysis.md");
  if (!existsSync(jsonFile)) return [{ level: "error", message: `missing ${rel(jsonFile)}` }];
  const parsed = Analysis.safeParse(readJson(jsonFile));
  if (!parsed.success) {
    for (const issue of parsed.error.issues.slice(0, 40)) err(`analysis.json ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    return findings;
  }
  const a = parsed.data;

  // Coverage: every audit area, once.
  for (const area of AUDIT_AREAS) {
    const n = a.coverage.filter((c) => c.area === area).length;
    if (n === 0) err(`coverage: "${area}" is not accounted for (observed, derived or absent with a reason)`);
    if (n > 1) err(`coverage: "${area}" is listed ${n} times`);
  }

  // What the survey found on the site can't be called absent.
  const surveyFile = join(dir, "reference", "survey.json");
  if (existsSync(surveyFile)) {
    const survey = readJson<Survey>(surveyFile);
    for (const { feature, pages } of survey.frequency) {
      for (const [pattern, area] of FEATURE_AREAS) {
        if (!pattern.test(feature)) continue;
        if (a.coverage.find((c) => c.area === area)?.status === "absent") err(`coverage: "${area}" marked absent, but the survey found ${feature} on ${pages} page(s)`);
      }
    }
    const motionOnSite = survey.frequency.some((f) => /^motion:(loop|rotate|draw-on|svg|marquee|path|morph|reveal)$/.test(f.feature));
    if (motionOnSite && !a.signatures.some((s) => s.motion.trim().toLowerCase() !== "static")) {
      warn("the survey found signature-like motion, but no signature element moves — is the motion part of the character?");
    }
    if (a.survey.pagesSurveyed !== survey.pages.filter((p) => !p.error).length) {
      warn(`survey.pagesSurveyed is ${a.survey.pagesSurveyed}; survey.json has ${survey.pages.filter((p) => !p.error).length}`);
    }
  } else warn("no reference/survey.json — the site was not surveyed (capture --no-survey?)");

  // Evidence must point at files that exist.
  const evidence = [
    ...a.signatures.flatMap((s) => s.evidence),
    ...a.motion.patterns.flatMap((m) => m.evidence),
    ...a.patterns.flatMap((p) => p.evidence),
    ...a.components.flatMap((c) => c.evidence),
    ...a.interactions.flatMap((i) => i.evidence),
    ...a.theming.evidence,
  ];
  const missing = new Set<string>();
  for (const e of evidence) {
    const file = e.split("#")[0]!.trim();
    if (!/\.(png|json|svg|md)$/i.test(file)) continue;
    if (![join(dir, file), join(dir, "reference", file), join(paths.root, file)].some(existsSync)) missing.add(file);
  }
  for (const m of missing) err(`evidence file not found: ${m}`);

  // The reference set: the quality bar the review compares with.
  const set = a.referenceSet ?? [];
  const intakeFile = join(dir, "intake.json");
  const fresh = !existsSync(intakeFile) || readJson<Intake>(intakeFile).status === "captured";
  if (!set.length) (fresh ? err : warn)("referenceSet: missing — pick 6–12 captures of the reference at its best (the review's quality bar)");
  else {
    if (set.length < 6 || set.length > 12) err(`referenceSet: ${set.length} entries — pick 6 to 12`);
    if (!set.some((r) => r.viewport === "mobile")) warn("referenceSet: no mobile capture — phones are half the review");
    const survey = existsSync(join(dir, "reference", "survey.json")) ? readJson<Survey>(join(dir, "reference", "survey.json")) : null;
    for (const r of set) {
      if (![join(dir, r.image), join(dir, "reference", r.image)].some(existsSync)) err(`referenceSet: file not found: ${r.image}`);
    }
    // Pages mostly made of other people's images set no bar for the brand's own design.
    const heavy = set.filter((r) => {
      const key = /(?:^|\/)(p\d+)-/.exec(r.image)?.[1];
      const pages = readJsonSafe<Array<{ key: string; url: string }>>(join(dir, "reference", "pages.json")) ?? [];
      const url = pages.find((p) => p.key === key)?.url;
      const page = url ? survey?.pages.find((p) => p.url === url) : undefined;
      return (page?.imageShare ?? 0) > CONTENT_HEAVY_SHARE;
    });
    if (heavy.length > set.length / 3) warn(`referenceSet: ${heavy.length} of ${set.length} entries are pages mostly made of other people's images — they show the content, not the brand's design`);
  }

  // Signatures: rebuildable and placed.
  for (const s of a.signatures) {
    if (s.recipe.length < 120) warn(`signature "${s.name}": the recipe is short (${s.recipe.length} chars) — can an agent rebuild it from this alone?`);
    if (s.applicationMap.length < 6) warn(`signature "${s.name}": ${s.applicationMap.length} contexts in the application map — cover dashboards, forms, empty states and dense screens too`);
  }

  // analysis.md: every section, in order.
  if (!existsSync(mdFile)) err(`missing ${rel(mdFile)}`);
  else {
    const md = readFileSync(mdFile, "utf8");
    let cursor = -1;
    for (const section of ANALYSIS_SECTIONS) {
      const at = md.indexOf(`\n${section}`);
      if (at < 0) err(`analysis.md: missing section "${section}"`);
      else if (at < cursor) err(`analysis.md: section "${section}" is out of order`);
      else cursor = at;
    }
  }
  return findings;
}

function readJsonSafe<T>(file: string): T | null {
  try {
    return existsSync(file) ? readJson<T>(file) : null;
  } catch {
    return null;
  }
}

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/**
 * A page of every color role as a swatch, derived ones marked, and the type substitutes. What the analysis
 * derives (a light mode for a dark reference, a palette step, a font substitute) is approved from a rendered
 * swatch at checkpoint 1, never from a hex code in a sentence.
 */
export function swatchPage(a: Analysis): string {
  const derived = (text: string) => /deriv|inferred|extrapolat|not (shown|observed)|no (light|dark)/i.test(text);
  const derivedArea = a.coverage.filter((c) => c.status === "derived").map((c) => `${c.area}: ${c.note}`);
  const roles = a.color.roles
    .map((r) => {
      const mark = derived(`${r.role} ${r.evidence}`) ? '<b class="d">derived</b>' : "";
      return `<figure><div class="chip" style="background:${r.hex}"></div><figcaption><strong>${escapeHtml(r.role)}</strong> ${r.hex} ${mark}<br><small>${escapeHtml(r.evidence).slice(0, 140)}</small></figcaption></figure>`;
    })
    .join("");
  const type = a.typography.families
    .map((f) => `<li><strong>${escapeHtml(f.role)}</strong>: observed ${escapeHtml(f.observed)} → <span style="font-family:'${escapeHtml(f.substitute)}',system-ui">${escapeHtml(f.substitute)} — The quick brown fox 1234567890</span><br><small>${escapeHtml(f.reason)}</small></li>`)
    .join("");
  return `<!doctype html><meta charset="utf-8"><title>${a.slug} derived swatches</title>
<style>body{font:14px system-ui;margin:32px;background:#fff;color:#111;max-width:1200px}h1{font-size:22px}h2{font-size:16px;margin-top:32px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}figure{margin:0}.chip{height:72px;border:1px solid #0002;border-radius:6px}
figcaption{margin-top:6px;font-size:12px}small{color:#555}.d{background:#111;color:#fff;padding:1px 6px;border-radius:3px;font-size:11px}</style>
<h1>${escapeHtml(a.slug)} — colors and substitutes to approve</h1>
<p>Appearance: ${a.color.appearance.join(", ")} · theming: ${a.theming.mechanism}</p>
${derivedArea.length ? `<h2>Derived areas</h2><ul>${derivedArea.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>` : ""}
<h2>Color roles</h2><div class="grid">${roles}</div>
<h2>Type</h2><ul>${type}</ul>`;
}

async function writeSwatches(slug: string, a: Analysis): Promise<string> {
  const html = join(pipelineDir(slug), "derived-swatches.html");
  writeText(html, swatchPage(a));
  const png = html.replace(/\.html$/, ".png");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`file://${html.replaceAll("\\", "/")}`);
    await page.screenshot({ path: png, fullPage: true });
  } finally {
    await browser.close();
  }
  return png;
}

export async function checkAnalysis(slug: string): Promise<boolean> {
  const findings = checkAnalysisFiles(slug);
  for (const f of findings) console.log(`${f.level === "error" ? "✖" : "!"} ${f.message}`);
  const errors = findings.filter((f) => f.level === "error").length;
  if (errors) {
    console.log(`\n${slug}: ${errors} error(s), ${findings.length - errors} warning(s)`);
    return false;
  }
  const intakeFile = join(pipelineDir(slug), "intake.json");
  if (!existsSync(intakeFile)) fail(`no intake for ${slug}`);
  const record = readJson<Intake>(intakeFile);
  if (record.status === "captured") {
    record.status = "analyzed";
    writeJson(intakeFile, record);
  }
  ok(`${slug}: analysis complete (${findings.length} warning(s))`);
  const analysis = Analysis.parse(readJson(join(pipelineDir(slug), "analysis.json")));
  const png = await writeSwatches(slug, analysis).catch((e) => {
    console.log(`! could not render the swatches: ${(e as Error).message.split("\n")[0]}`);
    return null;
  });
  if (png) console.log(`  swatches for checkpoint 1: ${rel(png)} — show it to the user with the analysis`);
  const crops = await cropReferenceSet(slug, analysis);
  if (crops.length) console.log(`  reference set for checkpoint 1: ${crops.length} first-screen crops in ${rel(join(pipelineDir(slug), "reference", "set"))} — show them with the analysis`);
  return true;
}

/**
 * The reference set as the review uses it: full-page screenshots cropped to their first screen at native
 * resolution, close-ups copied as they are. Written to reference/set/ with an index of what each shows.
 */
export async function cropReferenceSet(slug: string, a: Analysis): Promise<Array<{ file: string; shows: string }>> {
  const dir = pipelineDir(slug);
  const out: Array<{ file: string; shows: string }> = [];
  const jobs: CropJob[] = [];
  (a.referenceSet ?? []).forEach((r, i) => {
    const src = [join(dir, r.image), join(dir, "reference", r.image)].find(existsSync);
    if (!src) return;
    const file = join(dir, "reference", "set", `${String(i + 1).padStart(2, "0")}-${r.viewport}.png`);
    if (/screenshots[\\/]/.test(src)) jobs.push({ src, out: file, viewport: r.viewport });
    else {
      mkdirSync(dirname(file), { recursive: true });
      copyFileSync(src, file);
    }
    out.push({ file: rel(file), shows: r.shows });
  });
  const done = new Set((await cropFirstScreens(jobs)).map((j) => j.out));
  const kept = out.filter((o) => !jobs.some((j) => rel(j.out) === o.file) || done.has(join(paths.root, o.file)));
  if (kept.length) writeJson(join(dir, "reference", "set", "index.json"), kept);
  return kept;
}
