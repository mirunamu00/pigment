import { existsSync, readdirSync } from "node:fs";
import { AppId } from "@pigment/schema";
import { join } from "node:path";
import { latestEval, familyVersions, compareCore } from "../budget.ts";
import { paths, rel, runsDir, templateDir } from "../paths.ts";
import { loadTemplate } from "../template.ts";
import { fail, ok, readJson, writeText } from "../util.ts";

/**
 * Writes the design-critic's assignment for the latest evaluation. The brief is generated, never written by
 * hand, so every candidate is judged under the same instructions: the same rubric, the same evidence, the same
 * output, and no criteria added or dropped between rounds.
 */
export function criticBrief(id: string, version: string): string {
  const report = latestEval(id, version);
  if (!report) fail("no evaluation yet — run pnpm harness evaluate first");
  if (report.verdict === "fail" && !report.critic) fail(`evaluation ${report.iteration} failed its gates — the critic is not needed; fix the gates first:\n  ${report.reasons.join("\n  ")}`);
  const tpl = loadTemplate(id, version);
  const dir = runsDir(id, version);
  const n = report.iteration;

  // Samples: the eval lists each app's runs newest first; the k-th run of every app is sample k.
  const byApp = new Map<string, string[]>();
  for (const r of report.runs) byApp.set(r.app, [...(byApp.get(r.app) ?? []), r.runId]);
  const isHoldout = (app: string) => !AppId.safeParse(app).success;
  const sampleCount = Math.max(1, ...[...byApp.entries()].filter(([app]) => !isHoldout(app)).map(([, v]) => v.length));
  const sampleRows = [...byApp.entries()].map(
    ([app, ids]) => `| ${app}${isHoldout(app) ? " (holdout)" : ""} | ${ids.map((runId) => `\`${rel(join(dir, app, runId))}\``).join(" · ")} |`,
  );
  const holdoutNote = [...byApp.keys()].some(isHoldout)
    ? [
        "",
        "Holdout apps (one sample each) have structures the four main apps don't. They show whether the system",
        "carries to products it was not tuned on. Judge them like the others; a blocker there fails the candidate.",
        "Give a holdout finding's `promptFix` only as a general rule — never about that app.",
      ]
    : [];

  const analysis = tpl.manifest.provenance.analysis;
  const slugDir = analysis ? join(paths.root, analysis, "..") : null;
  const reference = slugDir && existsSync(join(slugDir, "reference"))
    ? [
        `- Screenshots: \`${rel(join(slugDir, "reference", "screenshots"))}/\``,
        `- Drawing crops: \`${rel(join(slugDir, "reference", "illustrations"))}/\` (\`-i\` large, \`-g\` small)`,
        `- Analysis: \`${rel(join(slugDir, "analysis.md"))}\``,
      ]
    : ["- None: the package has no reference. `referenceFidelity` is null; judge against the spec."];

  // An update is judged against what users have now.
  const published = existsSync(paths.published) ? Object.keys(readJson<Record<string, string>>(paths.published)) : [];
  const current = published
    .filter((ref) => ref.startsWith(`${id}@`))
    .map((ref) => ref.slice(id.length + 1))
    .filter((v) => compareCore(v, version) < 0)
    .sort(compareCore)
    .at(-1);
  const update = current
    ? [
        "## This is an update",
        "",
        `Users have \`${id}@${current}\` now. Its runs: \`${rel(runsDir(id, current))}/\`. The goal of the update is in`,
        `\`${slugDir ? rel(join(slugDir, "iterations.md")) : "pipeline/<slug>/iterations.md"}\` (the latest entry). Say whether the goal was reached. Anything that got worse than`,
        "the published version is a finding (at least major).",
        "",
      ]
    : [];

  // The verdict this candidate answers (the previous candidate's latest), and this candidate's own earlier ones
  // (the screen, when this is the confirm) — for regressions only.
  const critics = (v: string) => {
    const vdir = runsDir(id, v);
    return readdirSync(vdir)
      .filter((x) => /^critic-\d+\.json$/.test(x))
      .sort((a, b) => parseInt(a.slice(7)) - parseInt(b.slice(7)))
      .map((f) => join(vdir, f));
  };
  // The candidate this one was scaffolded from (scaffold records it), else the one numbered just before it.
  const originFile = join(dir, "origin.json");
  const origin = existsSync(originFile) ? readJson<{ from?: string }>(originFile).from : undefined;
  const fromVersion = origin?.startsWith(`${id}@`) ? origin.slice(id.length + 1) : undefined;
  const before =
    fromVersion && existsSync(runsDir(id, fromVersion))
      ? fromVersion
      : familyVersions(id, version).filter((v) => compareRc(v, version) < 0).sort(compareRc).at(-1);
  const earlier = [...(before ? critics(before).slice(-1) : []), ...critics(version).filter((f) => !f.endsWith(`critic-${n}.json`))].map((f) => `- \`${rel(f)}\``);

  const layout = report.layout ?? [];
  const layoutLines = layout.length
    ? layout.map((l) => `- ${l.app} \`${l.runId}\` ${l.route} (${l.viewport}): **${l.kind}** — ${l.where} ${l.detail}`.trim())
    : ["- None measured."];

  const out = join(dir, `critic-${n}.json`);
  const brief = [
    `# Critic brief — ${id}@${version}, evaluation ${n}`,
    "",
    "Generated by `pnpm harness critic-brief`. This is your whole assignment; follow it as written. Read",
    "`docs/harness/evaluation-rubric.md` first.",
    "",
    "## What was asked",
    "",
    `- The spec the agents were given: \`${rel(join(templateDir(id, version), "dist", "agent.md"))}\``,
    `- The automated gates: \`${rel(join(dir, `eval-${n}.md`))}\` (all passed)`,
    "",
    `## What was built: ${sampleCount} sample(s) of every app`,
    "",
    "Each run folder has `screenshots/` (every route at desktop and mobile, light and dark, and `state-*.png`",
    "interaction states), `drawings/` (native-resolution crops, listed in `shots.json` → `drawings`), `motion/`",
    "(frame sequences, `shots.json` → `motion` and `motionRoutes`) and `agent-report.md`.",
    "",
    `| App | Runs (sample 1${sampleCount > 1 ? ` … ${sampleCount}` : ""}) |`,
    "| --- | --- |",
    ...sampleRows,
    ...holdoutNote,
    "",
    "## The reference",
    "",
    ...reference,
    "",
    ...update,
    "## Measured layout defects",
    "",
    "The harness measured these on the rendered pages. Check each one on its screenshot: a real one becomes a",
    "finding (rate its severity like any other); a false alarm (a deliberate choice the reference shares, or",
    "hidden content) gets one line in `notes`. Do not re-measure by eye what is listed here.",
    "",
    ...layoutLines,
    "",
    ...(earlier.length
      ? [
          "## Earlier verdicts in this family",
          "",
          "Use them only to check whether their blockers and majors are fixed and whether anything regressed. Do not",
          "re-raise their minors, and do not add criteria the rubric does not have.",
          "",
          ...earlier,
          "",
        ]
      : []),
    "## How to judge",
    "",
    "Every finding gets a severity:",
    "",
    "- **blocker** — broken for people whatever the style (overlapping or cut-off content, unreadable text, a",
    "  broken layout, a task that fails), or the reference's identity is lost (someone who knows the reference",
    "  would not recognize it).",
    "- **major** — a signature element missing or built against its recipe, the spec not followed, or clearly",
    "  worse than the reference at the same thing.",
    "- **minor** — everything else worth noting: small optical issues, a weaker detail, taste.",
    "",
    `For each, say in how many of the ${sampleCount} sample(s) it appears (\`samples\`, \`of\`), and whether the spec itself`,
    "causes it (`specCaused`: a missing, ambiguous or contradictory rule). Cite the app image and, for anything",
    "about style, the reference image you compared it with (`evidence`).",
    "",
    "A candidate passes with **no blocker and no major that the prompt causes** (a major counts when it recurs in",
    "2+ samples, when the spec causes it, or when there is only one sample). Minors never fail it. List every",
    "minor you see once, then stop: do not hunt for more flaws to justify a verdict.",
    "",
    "`promptFix` (blockers and majors only) states a general rule that would prevent the problem in any product",
    "built with this system. Never name a demo app, its screens, products, people or data, and never fit a rule to",
    "one page: the four apps are samples of the products people will build, not the target.",
    "",
    "## Output",
    "",
    `Write \`${rel(out)}\` (\`CriticScores\` in \`packages/schema/src/index.ts\`):`,
    "",
    "```json",
    "{",
    '  "findings": [',
    '    { "severity": "blocker|major|minor", "area": "referenceFidelity|crossAppConsistency|hierarchy|spacingRhythm|componentStates|polish|signature",',
    `      "summary": "…", "samples": 1, "of": ${sampleCount}, "specCaused": false, "evidence": ["<image path>"], "promptFix": "…" }`,
    "  ],",
    '  "referenceFidelity": 0-5|null, "crossAppConsistency": 0-5, "hierarchy": 0-5, "spacingRhythm": 0-5,',
    '  "componentStates": 0-5, "polish": 0-5, "signature": 0-5|null,',
    '  "notes": ["…"]',
    "}",
    "```",
    "",
    "The scores are descriptive (what a user can expect from a typical sample); the verdict comes from the",
    "findings. If the write is refused, put the full JSON in your final message. End with a three-line verdict.",
    "",
  ].join("\n");
  const file = join(dir, `critic-brief-${n}.md`);
  writeText(file, brief);
  ok(`critic brief → ${rel(file)}`);
  console.log(`  next: give the design-critic agent this file's content verbatim, then pnpm harness critic ${id}@${version} ${rel(out)}`);
  return file;
}

function compareRc(a: string, b: string): number {
  const rc = (v: string) => Number(/-rc\.(\d+)$/.exec(v)?.[1] ?? Infinity);
  return compareCore(a, b) || rc(a) - rc(b);
}
