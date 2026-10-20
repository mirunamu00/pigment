# Evaluation rubric

A template version passes when the agents' results come close to the reference's design quality — on the main
apps and then on the holdout apps — no broken detail is induced by the prompt itself, and a human approves. The
review measures quality against the reference; it is not a hunt for defects. Coding agents make mistakes of their
own (an overlap, a clipped label); those are recorded and never count against the prompt.
`pnpm harness evaluate` computes the gates and writes `showcase/runs/<id>/<version>/eval-<iteration>.json` + `.md`;
`pnpm harness review` reviews every checklist item and settles the verdict.

## Automated checks (per app)

Only two checks fail a run by themselves, because without them there is nothing to review: the agent finished and
the app builds. Every other check is **reported** as evidence for the review (`below (reported)` in the eval): a
failure there is the agent's mistake unless the review finds the spec's own words induce it.

| Check | Threshold | Gates |
| --- | --- | --- |
| Agent finished | exit code 0 | yes |
| Build | `npm run build` succeeds | yes |
| Functional preservation | every base-app smoke test passes | reported |
| No console errors | 0 on every captured route | reported |
| No horizontal scroll | page width = viewport on every route, desktop and mobile, light and dark | reported |
| Accessibility | 0 new serious/critical axe violations vs. the unstyled base app | reported |
| Reduced motion | 0 looping animations still running with `prefers-reduced-motion: reduce` | reported |
| Color adherence | ≥ 90% of painted color area within ΔE2000 ≤ 3 of a template color token | reported |
| Font adherence | every rendered text family is a template family or its fallback | reported |
| Radius adherence | ≥ 85% of rounded elements use a template radius (±1px) | reported |

The three adherence gates are sanity checks, not quality measures: agents that read the package almost
always score above 0.99, so they catch a run that ignored the tokens, nothing finer. Never read a high value
as "good".

Reported per app, not gated: animations with motion allowed (looping, in SVG) on every capture route,
illustrations and line drawings, frame sequences (`motion/*.png`), spacing on the scale (`spacingOnScale`:
share of paddings, margins and gaps within 1px of a `space.*` token), and the measured layout defects below.

## Measured layout (automated, reported)

`shoot` measures the rendered pages at desktop and mobile (light) so the critic does not estimate by eye
from scaled-down screenshots (`packages/harness/src/layout.ts`):

- **clipped-text** — text running past an ancestor that hides overflow, with no ellipsis or line clamp
- **overlapping-text** — visible line boxes of different text covering each other
- **uneven-row** — side-by-side panels whose tops or bottoms miss by 1–8px (a near miss reads as a mistake)
- **double-rule** — two horizontal borders of different elements within 3px: a doubled hairline
- **repeated-drawing** — the same image or SVG shown more than once at illustration size on one page

They are listed in the eval and in the critic brief. The critic confirms each on its screenshot and rates
it like any other finding; a false alarm is dropped with a note. They are not gates: a measurement can flag
a deliberate choice the reference shares.

## Cross-app checks (automated, reported)

| Check | Threshold |
| --- | --- |
| Palette consistency | the four apps' top-8 colors overlap ≥ 75% |
| Type consistency | same families and ≥ 70% shared font sizes |

## Reference similarity (automated, when a reference exists)

Reported, not gated — templates are derived, not cloned, so 100% would be a red flag.

- `reference-palette-distance`: mean ΔE2000 from the reference's top colors to the template palette.
- `reference-output-palette-distance`: the same, to the colors the built apps actually show.
- `reference-fontSize-overlap`, `-radius-overlap`, `-spacing-overlap`: share of the built apps' values
  within 1px of the values that make up 80% of the reference's use.

Low overlaps mean the language did not carry over; overlaps near 1 with palette distance near 0 deserve a
look for copying.

## The review

The checks only show that the runs are usable and the tokens were used. How close the agents came to the reference's
design quality is judged by the review, so the review is held to a coverage it cannot skip, and a stopping point it
cannot extend:

1. **Checklist.** `pnpm harness review <ref>` lists everything the runs produced as items: every captured screen at
   every viewport and appearance the system has, every interaction state, each screen's drawings, each app's
   motion. One item holds **every sample** of that screen, so recurrence is judged on the same item.
2. **Comparison sheets and crops.** Each item gets one image with the samples side by side (drawings next to
   each other, originals listed under the sheet), and every screen sample a crop of its first screen at native
   resolution: craft is judged on the crops, never on shrunk full pages. The measure is the analysis's
   **reference set** (`pipeline/<slug>/reference/set/`): the reference at its best, opened at full size.
3. **Reviewers.** One reviewer per app (two when an app has over 30 items), run by the harness in parallel with
   read-only tools and a generated prompt. Each answers every item of its list with a `fidelity` mark (1–5, the
   anchors below) and a note on what is on that screen against the reference; a missing item, a missing mark or a
   contentless note ("ok") does not count. At most one finding per item and eight minors per reviewer.
4. **Coverage check.** Unanswered items go back to their reviewer once. If any are still unanswered, the review is
   `incomplete` and gives **no verdict**.
5. **Lead reviewer.** Looks at the reference and the home screens itself first, then scores every area against the
   reference, merges duplicate findings, settles their kind and sample count, and judges what no single reviewer
   can (one family across apps, the overall impression). Its file (`mode: "quality"`) is merged into the
   evaluation; the report records coverage, reviewers and time.
6. **Overrides.** The orchestrator never edits a critic file or a reviewer prompt. A severity it disagrees with is
   changed with `critic --override "<phrase>=<severity>=<reason>"`, recorded in the file and the report.

Besides the page captures, each run includes interaction-state captures (`state-*.png`: keyboard focus,
hover, validation errors, dialogs, toasts, empty results, loading) defined in each base app's `pigment.app.json`,
and native-resolution crops of every drawing (`drawings/*.png`). Drawings are judged on the crops, next to the
reference's crops (`pipeline/<slug>/reference/illustrations/`: `-i` large, `-g` small drawings).

### The reference is the measure

A template is a reference's design language carried into other products. A trait the reference has is
not a defect when the template reproduces it: small drawings, rough lines, a muted palette, dense or
airy layouts, an unusual type choice. The critic judges the work against the reference, not against a
generic idea of good UI:

- **Before marking anything down, check the reference.** If the trait is in the reference (cite the
  screenshot or crop), reproducing it is fidelity, not a flaw. Only executing it worse than the reference
  does is a flaw — say what the reference does better.
- **A gap** is where the result is worse than the reference at the same thing, or generic where the reference
  is specific. **A defect** is something broken (unreadable text, overlapping content, a broken layout). Defects
  count only when the prompt induced them (below).
- **Every finding cites its evidence:** the app screenshot or crop, and for anything about style, the
  reference image it was compared with.
- **One problem, one finding**, filed under one area. Drawings, motion and other signature elements go
  under Signature only.

### Quality: the verdict

The lead reviewer scores each area 0–5 for the typical sample, against the reference:

- 5: as well designed as the reference; someone who knows it would take it for the same team's work.
- 4: clearly the reference's language, close in craft; differences only a careful eye finds.
- 3: recognisably related, but noticeably cruder or more generic than the reference.
- 2: generic; little of the reference left beyond colours or a font.
- 1: unrelated to the reference, or not designed at all.

**Bar:** `referenceFidelity` ≥ 4, `signature` ≥ 4, every other area ≥ 3 (`QUALITY_BAR` in
`packages/harness/src/commands/evaluate.ts`), and no blocker or major defect the prompt induced.

Findings come in two kinds:

| Kind | What it is | Effect |
| --- | --- | --- |
| Gap | Where the result falls short of the reference's quality: a signature missing or built against its recipe, weaker hierarchy, cruder spacing or drawing, a generic look. Says what the reference does better | lowers the scores; major gaps, and every gap in an area below the bar, go to the author |
| Defect | Something broken: overlap, clipping, unreadable text, a layout that falls apart | counts only when the spec's own words lead agents to it, quoted in `specRule` (`specCaused: true`); then a blocker or major fails the candidate. Every other defect is the agent's: recorded, never counted, never sent to the author |

Coding agents make mistakes of their own, and a stronger model makes fewer. Those mistakes say nothing about the
prompt, so the prompt is never patched with rules that only tell agents to write correct code.

| Area | Question |
| --- | --- |
| Reference fidelity | Would someone who knows the reference recognize its character — without it being a copy? |
| Cross-app consistency | Do the four apps look like one family? |
| Hierarchy | Is it obvious what matters first on each screen, the way the reference makes it obvious? |
| Spacing rhythm | Is spacing consistent and on the scale? |
| Component states | Are focus, hover, disabled, error and empty states designed, not defaulted? |
| Polish | Alignment, optical balance, no default-browser leftovers, no generic look the reference doesn't have. Signature elements are not judged here |
| Signature | Are the signature elements present in all four apps, placed as Applying the concept says, built to their recipes, as well crafted as the reference's at the same size (compare the crops), and moving as specified (check the motion frames)? For `schemaVersion: 2` packages |

### Calibration

The review is only as good as its agreement with people who know the reference. `showcase/calibration.json` lists
candidates the user has judged (one accepted, one found crude); `pnpm harness calibrate` reviews them again without
touching their evaluations and writes `showcase/calibration-report.md`. While the review disagrees with a judged
case, its scores are advice and the user's direction check decides. Run it after every change to the review.

### Stages: judge the prompt, not one run

Every user's agent builds a different result from the same prompt, so one run is one sample. Fixing the
small flaws of one sample and running again only draws a new sample with new small flaws. A candidate goes through
three stages, and the harness refuses them out of order:

1. **Screen:** one sample of the four main apps — `generate`, `evaluate`, `review`. Scores below the bar or a
   defect the prompt induced send the candidate back to the author. A passing screen then goes to the user's
   **direction check** (`review-<n>/direction.html`: the reference set next to the agents' first screens); the
   confirm is refused until `pnpm harness direction <ref> --approved-by "<name>"` records their yes.
2. **Confirm:** only after a passing screen — `generate --samples 2 --holdout` (two more samples of the main apps,
   one run of each holdout app), `evaluate --samples 3` (the screen run plus the two new ones), `review`.
3. **Holdout check:** only after a passing confirm — `evaluate --holdout`, `review --holdout`. The holdout apps
   (a landing page, a docs site) have structures the main apps don't; they show whether the system carries to
   products it was never tuned on. They run with the confirm but are judged only now, so a candidate that failed
   on the main apps never learns from them. Publish needs this stage passed.

Judging three samples:

- **The agent must finish and the app must build** in every sample.
- **Scores describe the typical sample,** not the best or the worst one. A gap seen once is noted with its
  sample count; it weighs on the score only as much as it shapes what a user can expect.
- **Holdout apps run once** and are held to the same bar: the system must carry to products it was never tuned on.
- Every finding says in how many samples it appears.

## When to stop

Cost is never the reason to ship or to skip a fix: do what the template needs. What the harness stops is
work that cannot converge — another round on a candidate that already passed only draws a new sample with
new small flaws. Every eval records the spend of the candidate and its family, for the record only.

- **Stop when a candidate passes.** Once a candidate passes the confirm, `scaffold` refuses a new candidate
  and `generate` refuses more runs in that family (`--after-pass` only when the user asks). A candidate that
  passed the screen is confirmed, not replaced. Leftover minors go to the user as a list, never into
  another round.
- **Iteration cap:** at most four candidates per family (the first plus three fix iterations). `scaffold`
  refuses the fifth (`--past-cap` only when the user asks); stop and report the failure analysis instead —
  the reference may not be expressible as a portable system, or a harness rule may need to change.
- These limits are about convergence, never about money: a needed fix (a bug in a published version,
  a prompt fitted to the demo apps) always gets its candidate.

## Iteration

1. Scores below the bar or a prompt-induced defect → `pnpm harness author-brief` lists the areas below the bar,
   the gaps behind them and the prompt-induced defects, with their `promptFix`es; the prompt-author turns each into
   a general rule (never a fix for one demo screen). Agent defects never reach the author.
2. The author changes the package, logs the change in `pipeline/<slug>/iterations.md`, bumps the
   pre-release (`0.1.0-rc.2`), and the screen runs again.

## Human approval

The user sees: the four apps' screenshots (desktop/mobile, light/dark), the reference next to them, the
check table, the quality scores against the reference, the review's findings and the iteration log. Only an explicit approval moves
the version to `published`.
