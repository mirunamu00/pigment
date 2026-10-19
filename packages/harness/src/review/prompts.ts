import type { ReviewItem, ReviewPlan, UnitReview } from "@pigment/schema";

/**
 * The reviewers' instructions. Generated from the plan, never written per round, so every candidate is judged
 * the same way: the same severities, the same evidence, the same stopping point.
 */

export interface ReviewContext {
  ref: string;
  spec: string;
  referenceSheet: string | null;
  analysis: string | null;
  holdout: boolean;
  samples: number;
  earlier: string[];
  /** For an update: the published version and its runs folder. */
  published: { version: string; runs: string } | null;
}

const SEVERITY = [
  "- **blocker**: broken for people whatever the style (overlapping or cut-off content, unreadable text, a broken",
  "  layout, a task that fails), or the reference's identity is lost.",
  "- **major**: a signature element missing or built against its recipe, the spec not followed, or clearly worse than",
  "  the reference at the same thing (or, for an update, worse than the published version).",
  "- **minor**: everything else worth noting.",
];

function contextLines(c: ReviewContext): string[] {
  return [
    `- Template: \`${c.ref}\`. The spec the agents were given: \`${c.spec}\`. Read its "Signature elements" and`,
    '  "Applying the concept" sections before the checklist.',
    c.referenceSheet
      ? `- The reference: open \`${c.referenceSheet}\` first${c.analysis ? `; the analysis is \`${c.analysis}\`` : ""}.`
      : "- No reference: judge against the spec.",
    c.holdout
      ? "- This review covers the holdout apps: products the system was never tuned on, one run each. They test whether the language carries to new structures."
      : `- This review covers the main apps, ${c.samples} sample(s) each. Every sheet shows the samples side by side.`,
    ...(c.published
      ? [`- This is an update. Users have \`${c.published.version}\` now; its runs are in \`${c.published.runs}\`. Anything worse than it is at least major.`]
      : []),
    ...(c.earlier.length
      ? ["- Earlier verdicts, for regressions only (never re-raise their minors, never add criteria the rubric does not have):", ...c.earlier.map((e) => `  \`${e}\``)]
      : []),
  ];
}

function itemLines(items: ReviewItem[]): string[] {
  return items.flatMap((i) => [
    `- id: \`${i.id}\``,
    `  sheet: \`${i.sheet}\``,
    `  originals: ${i.sources.map((s, k) => `${i.sources.length > 1 ? `sample ${k + 1}: ` : ""}${s.length ? s.map((f) => `\`${f}\``).join(", ") : "(none)"}`).join(" · ")}`,
    `  questions: ${i.questions.join(" ")}`,
  ]);
}

export function unitPrompt(c: ReviewContext, items: ReviewItem[]): string {
  const of = c.holdout ? 1 : c.samples;
  return [
    "You are one of several design reviewers. Together you judge whether a design-system prompt makes coding agents",
    "build its reference's design language. The harness gave you a fixed checklist: answer every item on it, then stop.",
    "",
    "## Context",
    ...contextLines(c),
    "",
    "## How to review",
    "- For each item open its sheet (every sample side by side). Open an original only when a detail is too small on the sheet.",
    "- Answer the item's questions. Write one note per item, one or two sentences about what is actually on that screen",
    "  (its layout, the signature element you see, the state's message). A note like \"ok\" or \"looks fine\" is rejected.",
    "- Samples are built by different runs and may differ in structure. A problem that breaks the same rule counts as the",
    "  same problem across samples, even when the screens differ.",
    "- The reference is the measure: a trait the reference has is fidelity, not a flaw. Check the reference sheet before",
    "  marking anything about style down, and cite what the reference does better.",
    "- Severity:",
    ...SEVERITY.map((l) => `  ${l}`),
    `- For each finding give \`samples\` (in how many of the ${of} sample(s) it shows), \`of\`: ${of}, \`specCaused\` (a missing,`,
    "  ambiguous or contradictory rule in the spec causes it), `evidence` (image paths), `items` (checklist ids), and for",
    "  blockers and majors a `promptFix`: a general rule that prevents it in any product. Never name a demo app, its",
    "  screens, products, people or copy.",
    ...(c.holdout ? ["- Set `holdoutOnly: true` on every finding."] : []),
    "- At most one minor per item and eight in all. Do not hunt for more: when every item has its line, you are done.",
    "",
    `## Your checklist (${items.length} items)`,
    ...itemLines(items),
    "",
    "## Answer",
    "One JSON object in a ```json block and nothing after it:",
    "```json",
    '{ "items": [ { "id": "<item id>", "status": "ok|finding", "note": "<what is on the screen>" } ],',
    `  "findings": [ { "severity": "blocker|major|minor", "area": "referenceFidelity|crossAppConsistency|hierarchy|spacingRhythm|componentStates|polish|signature", "summary": "…", "samples": 1, "of": ${of}, "specCaused": false, "evidence": ["…"], "items": ["…"], "promptFix": "…" } ] }`,
    "```",
    "",
  ].join("\n");
}

export function synthesisPrompt(c: ReviewContext, plan: ReviewPlan, units: Array<{ id: string; review: UnitReview }>, homeSheets: string[]): string {
  const of = c.holdout ? 1 : c.samples;
  return [
    `You are the lead reviewer. ${units.length} reviewers each covered part of a fixed checklist of ${plan.items.length} items`,
    "(the harness verified that every item was answered). Their notes and findings are below. Write the verdict.",
    "",
    "## Context",
    ...contextLines(c),
    `- Home screens of every app, side by side across samples: ${homeSheets.map((s) => `\`${s}\``).join(", ") || "(none)"}`,
    "",
    "## What to do",
    "1. Merge findings that are the same problem (the same rule broken), across apps and reviewers. A merged finding's",
    `   \`samples\` is in how many of the ${of} sample(s) it shows anywhere; \`of\` is ${of}. Keep its evidence and items.`,
    "2. Grade every finding with one standard (reviewers differ; you make them consistent):",
    ...SEVERITY.map((l) => `   ${l}`),
    "   Open the evidence and the reference sheet for any finding whose severity you are not sure of.",
    "3. Judge what no single reviewer could: whether the apps look like one family, whether someone who knows the",
    "   reference would recognize it, and whether the signature elements hold across apps. Add findings if needed.",
    "4. Blockers and majors keep a `promptFix`: a general rule for any product, never about a demo app.",
    ...(c.holdout ? ["5. Every finding has `holdoutOnly: true`."] : []),
    "- Do not add criteria the rubric does not have, and do not re-raise earlier minors.",
    "- Scores 0–5 per area are descriptive (what a user can expect from a typical sample); the verdict comes from findings.",
    "",
    "## Reviewer results",
    "```json",
    JSON.stringify(units.map((u) => ({ unit: u.id, ...u.review })), null, 1),
    "```",
    "",
    "## Answer",
    "One JSON object in a ```json block and nothing after it:",
    "```json",
    '{ "findings": [ { "severity": "…", "area": "…", "summary": "…", "samples": 1, "of": ' + of + ', "specCaused": false, "evidence": ["…"], "items": ["…"], "promptFix": "…" } ],',
    '  "referenceFidelity": 0, "crossAppConsistency": 0, "hierarchy": 0, "spacingRhythm": 0, "componentStates": 0, "polish": 0, "signature": 0,',
    '  "notes": ["…"] }',
    "```",
    "",
  ].join("\n");
}
