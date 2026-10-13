import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { AUDIT_AREAS, Analysis, type AuditArea } from "@pigment/schema";
import { paths, pipelineDir, rel } from "../paths.ts";
import type { Survey } from "../survey.ts";
import { fail, ok, readJson, writeJson } from "../util.ts";
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

export function checkAnalysis(slug: string): boolean {
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
  return true;
}
