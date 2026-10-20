import type { ReviewItem, ReviewPlan, UnitReview } from "@pigment/schema";
import { QUALITY_BAR } from "../commands/evaluate.ts";

/**
 * The reviewers' instructions. Generated from the plan, never written per round, so every candidate is judged
 * the same way. The review measures how close the result comes to the reference's design quality; it is not a hunt
 * for defects. A broken detail counts only when the prompt's own words lead agents to it.
 */

export interface ReviewContext {
  ref: string;
  spec: string;
  referenceSheet: string | null;
  /** The quality bar: captures of the reference at its best, each opened at full size. */
  referenceSet: Array<{ file: string; shows: string }>;
  analysis: string | null;
  holdout: boolean;
  samples: number;
  earlier: string[];
  /** For an update: the published version and its runs folder. */
  published: { version: string; runs: string } | null;
}

/** What each fidelity step means; reviewers and the lead score against the same anchors. */
const ANCHORS = [
  "- 5: as well designed as the reference; someone who knows it would take it for the same team's work.",
  "- 4: clearly the reference's language, close in craft; differences only a careful eye finds.",
  "- 3: recognisably related, but noticeably cruder or more generic than the reference.",
  "- 2: generic; little of the reference left beyond colours or a font.",
  "- 1: unrelated to the reference, or not designed at all.",
];

const KINDS = [
  "- **gap**: where the result falls short of the reference's design quality — a signature missing or built against its",
  "  recipe, weaker hierarchy, cruder spacing or drawing, a generic look where the reference is specific. Say what",
  "  the reference does better. major = clearly below the reference on what the system is known for; minor = the rest.",
  "- **defect**: something broken (overlap, clipping, unreadable text, a layout that falls apart). Coding agents make",
  "  these on their own; a defect counts only when the spec's own words lead agents to it. Set `specCaused: true` and",
  "  quote those words in `specRule` only then. A defect you cannot tie to a quoted rule is the agent's: record it",
  "  with `specCaused: false` and do not let it lower any score.",
];

function contextLines(c: ReviewContext): string[] {
  return [
    `- Template: \`${c.ref}\`. The spec the agents were given: \`${c.spec}\`. Read its "Signature elements" and`,
    '  "Applying the concept" sections before the checklist.',
    ...(c.referenceSet.length
      ? [
          `- The reference at its best — your measure. Open every one of these at full size before the checklist, and again`,
          `  whenever you judge a screen like it${c.analysis ? ` (the analysis is \`${c.analysis}\`)` : ""}:`,
          ...c.referenceSet.map((r) => `  - \`${r.file}\` — ${r.shows}`),
        ]
      : ["- No reference set: judge against the spec."]),
    c.holdout
      ? "- This review covers the holdout apps: products the system was never tuned on, one run each. They test whether the language carries to new structures."
      : `- This review covers the main apps, ${c.samples} sample(s) each. Every sheet shows the samples side by side.`,
    ...(c.published
      ? [`- This is an update. Users have \`${c.published.version}\` now; its runs are in \`${c.published.runs}\`. Anything clearly worse than it is a major gap.`]
      : []),
    ...(c.earlier.length ? ["- Earlier verdicts, to see whether the gaps they named closed:", ...c.earlier.map((e) => `  \`${e}\``)] : []),
  ];
}

function itemLines(items: ReviewItem[]): string[] {
  return items.flatMap((i) => [
    `- id: \`${i.id}\``,
    `  sheet: \`${i.sheet}\``,
    ...(i.crops?.some(Boolean)
      ? [`  first screen at full size: ${i.crops.map((f, k) => (f ? `${i.crops!.length > 1 ? `sample ${k + 1}: ` : ""}\`${f}\`` : "")).filter(Boolean).join(" · ")}`]
      : []),
    `  originals: ${i.sources.map((s, k) => `${i.sources.length > 1 ? `sample ${k + 1}: ` : ""}${s.length ? s.map((f) => `\`${f}\``).join(", ") : "(none)"}`).join(" · ")}`,
    `  questions: ${i.questions.join(" ")}`,
  ]);
}

export function unitPrompt(c: ReviewContext, items: ReviewItem[]): string {
  const of = c.holdout ? 1 : c.samples;
  return [
    "You are one of several design reviewers. Together you judge how close coding agents came to the reference's design",
    "quality when they built products from a design-system prompt. You are not hunting for defects. The harness gave",
    "you a fixed checklist: answer every item on it, then stop.",
    "",
    "## Context",
    ...contextLines(c),
    "",
    "## How to review",
    "- For each item open its sheet (every sample side by side) for the whole page, then its first-screen crops at",
    "  full size, and compare them with the reference capture most like it. Judge type, outlines, spacing, drawing and",
    "  detail on the crops, never on the shrunk sheet.",
    "- Give the item a `fidelity` of 1–5 for the typical sample, on these anchors:",
    ...ANCHORS.map((l) => `  ${l}`),
    "- Write one note per item: what is on the screen and how it compares with the reference (one or two sentences).",
    '  A note like "ok" or "looks fine" is rejected.',
    "- The reference is the measure: a trait the reference has is fidelity, not a flaw.",
    "- Findings are of two kinds:",
    ...KINDS.map((l) => `  ${l}`),
    `- For each finding give \`kind\`, \`severity\` (blocker, major or minor), \`samples\` (in how many of the ${of} sample(s)`,
    `  it shows), \`of\`: ${of}, \`evidence\` (image paths), \`items\` (checklist ids) and, for a major gap or a counted`,
    "  defect, a `promptFix`: a general rule that would help any product. Describe elements by their role (the primary",
    "  action, the page header, a data table); never quote a demo app's copy, names or data.",
    ...(c.holdout ? ["- Set `holdoutOnly: true` on every finding."] : []),
    "- At most one finding per item and eight minors in all. When every item has its line, you are done.",
    "",
    `## Your checklist (${items.length} items)`,
    ...itemLines(items),
    "",
    "## Answer",
    "One JSON object in a ```json block and nothing after it:",
    "```json",
    '{ "items": [ { "id": "<item id>", "status": "ok|finding", "fidelity": 4, "note": "<what is on the screen, against the reference>" } ],',
    `  "findings": [ { "kind": "gap|defect", "severity": "blocker|major|minor", "area": "referenceFidelity|crossAppConsistency|hierarchy|spacingRhythm|componentStates|polish|signature", "summary": "…", "samples": 1, "of": ${of}, "specCaused": false, "specRule": "", "evidence": ["…"], "items": ["…"], "promptFix": "…" } ] }`,
    "```",
    "",
  ].join("\n");
}

export function synthesisPrompt(c: ReviewContext, plan: ReviewPlan, units: Array<{ id: string; review: UnitReview }>, homeSheets: string[]): string {
  const of = c.holdout ? 1 : c.samples;
  return [
    `You are the lead reviewer. ${units.length} reviewers each covered part of a fixed checklist of ${plan.items.length} items`,
    "(the harness verified that every item was answered). Their notes, fidelity marks and findings are below. Judge",
    "how close the result comes to the reference's design quality.",
    "",
    "## Context",
    ...contextLines(c),
    `- Home screens of every app (sheets across samples, and first-screen crops): ${homeSheets.map((s) => `\`${s}\``).join(", ") || "(none)"}`,
    "",
    "## What to do",
    "1. Open the reference set and the home screens' first-screen crops yourself, at full size, and form your own view",
    "   of the whole before reading the reviewers' marks:",
    "   does this look like the reference's team made it, and is it as well crafted?",
    "2. Score each area 0–5 for the typical sample, against the reference, on these anchors:",
    ...ANCHORS.map((l) => `   ${l}`),
    "   Areas: referenceFidelity (the whole reads as the reference's language), signature (its signature elements hold",
    "   and are built well), crossAppConsistency (one family across apps), hierarchy, spacingRhythm, componentStates,",
    "   polish (craft of type, spacing, drawing and detail). Score what you see; do not round up for effort.",
    `   The bar to pass: referenceFidelity ${QUALITY_BAR.referenceFidelity}, signature ${QUALITY_BAR.signature}, every other area ${QUALITY_BAR.other}.`,
    "3. Merge findings that are the same problem across apps and reviewers, and settle their kind, severity and sample",
    `   count (of ${of}). Gaps:`,
    ...KINDS.map((l) => `   ${l}`),
    "4. List the gaps that keep the scores below 5, most important first, each with a `promptFix` for the major ones.",
    "   Add gaps the reviewers could not see from one app (the family across apps, the overall impression).",
    ...(c.holdout ? ["5. Every finding has `holdoutOnly: true`."] : []),
    "- Never quote a demo app's copy, names or data; describe elements by their role.",
    "",
    "## Reviewer results",
    "```json",
    JSON.stringify(units.map((u) => ({ unit: u.id, ...u.review })), null, 1),
    "```",
    "",
    "## Answer",
    "One JSON object in a ```json block and nothing after it:",
    "```json",
    '{ "mode": "quality",',
    '  "referenceFidelity": 0, "signature": 0, "crossAppConsistency": 0, "hierarchy": 0, "spacingRhythm": 0, "componentStates": 0, "polish": 0,',
    '  "findings": [ { "kind": "gap|defect", "severity": "…", "area": "…", "summary": "…", "samples": 1, "of": ' + of + ', "specCaused": false, "specRule": "", "evidence": ["…"], "items": ["…"], "promptFix": "…" } ],',
    '  "notes": ["<the overall impression against the reference, in two or three sentences>"] }',
    "```",
    "",
  ].join("\n");
}
