# Evaluation rubric

A template version passes when every hard gate passes in every sample, the critic finds no blocker and no
major the prompt causes, and a human approves. `pnpm harness evaluate` computes the gates and writes
`showcase/runs/<id>/<version>/eval-<iteration>.json` + `.md`. `pnpm harness critic-brief` writes the
`design-critic` agent's assignment; `pnpm harness critic` merges its findings and settles the verdict.

## Hard gates (per app, automated)

| Gate | Threshold | Why |
| --- | --- | --- |
| Agent finished | exit code 0 | the run is usable |
| Build | `npm run build` succeeds | shipping code |
| Functional preservation | every base-app smoke test passes | restyling must not break behavior |
| No console errors | 0 on every captured route | runtime regressions |
| No horizontal scroll | page width = viewport on every route, desktop and mobile, light and dark | mobile layouts that hide content off-screen |
| Accessibility | 0 new serious/critical axe violations vs. the unstyled base app | the system must not cost accessibility |
| Reduced motion | 0 looping animations still running with `prefers-reduced-motion: reduce` | motion must respect the user |
| Color adherence | ≥ 90% of painted color area within ΔE2000 ≤ 3 of a template color token | sanity check |
| Font adherence | every rendered text family is a template family or its fallback | sanity check |
| Radius adherence | ≥ 85% of rounded elements use a template radius (±1px) | sanity check |

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

## Cross-app gates (automated)

| Gate | Threshold |
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

## The critic

The `design-critic` agent judges the screenshots of every sample of every app side by side, with the
reference. Its assignment is generated (`pnpm harness critic-brief <ref>` → `critic-brief-<n>.md`) and given
to it verbatim: every candidate is judged under the same instructions, evidence and output format. Never
write or edit a critic prompt by hand.

Besides the page captures, each run includes interaction-state captures (`state-*.png`: keyboard focus,
hover, validation errors, dialogs, toasts, empty results) defined in each base app's `pigment.app.json`,
and native-resolution crops of every drawing (`drawings/*.png`, listed in `shots.json` → `drawings`).
Full-page screenshots are scaled down when read, so drawings are judged on the crops, next to the
reference's crops (`pipeline/<slug>/reference/illustrations/`: `-i` large, `-g` small drawings).

### The reference is the measure

A template is a reference's design language carried into other products. A trait the reference has is
not a defect when the template reproduces it: small drawings, rough lines, a muted palette, dense or
airy layouts, an unusual type choice. The critic judges the work against the reference, not against a
generic idea of good UI:

- **Before marking anything down, check the reference.** If the trait is in the reference (cite the
  screenshot or crop), reproducing it is fidelity, not a flaw. Only executing it worse than the reference
  does is a flaw — say what the reference does better.
- **A defect is one of:** worse than the reference at the same thing; not in the reference and not asked
  for by the spec; against the spec; or broken for people regardless of style (unreadable text,
  overlapping content, a broken layout, content that contradicts its label).
- **Every finding cites its evidence:** the app screenshot or crop, and for anything about style, the
  reference image it was compared with.
- **One problem, one finding**, filed under one area. Drawings, motion and other signature elements go
  under Signature only.

### Findings and severity

The verdict comes from findings, each with a severity:

| Severity | What it is | Effect |
| --- | --- | --- |
| Blocker | Broken for people whatever the style (overlapping or cut-off content, unreadable text, a broken layout, a failed task), or the reference's identity lost | fails the candidate |
| Major | A signature element missing or built against its recipe; the spec not followed; clearly worse than the reference at the same thing | fails the candidate when the prompt causes it: it recurs (2+ samples), the spec causes it, or there is only one sample |
| Minor | Small optical issues, a weaker detail, taste | never fails a candidate; listed for the user |

**Bar:** no blocker, and no major the prompt causes. Each blocker and gating major comes with a
`promptFix`: a general rule that would prevent it in any product (prompt-writing rules → Generalize). The
critic lists the minors it sees once and stops; it does not hunt for flaws to justify a verdict.

The areas (`referenceFidelity`, `crossAppConsistency`, `hierarchy`, `spacingRhythm`, `componentStates`,
`polish`, `signature`) still get a 0–5 score each. The scores are descriptive — what a user can expect
from a typical sample — and do not decide anything.

| Area | Question |
| --- | --- |
| Reference fidelity | Would someone who knows the reference recognize its character — without it being a copy? |
| Cross-app consistency | Do the four apps look like one family? |
| Hierarchy | Is it obvious what matters first on each screen, the way the reference makes it obvious? |
| Spacing rhythm | Is spacing consistent and on the scale? |
| Component states | Are focus, hover, disabled, error and empty states designed, not defaulted? |
| Polish | Alignment, optical balance, no default-browser leftovers, no generic look the reference doesn't have. Signature elements are not judged here |
| Signature | Are the signature elements present in all four apps, placed as Applying the concept says, built to their recipes, as well crafted as the reference's at the same size (compare the crops), and moving as specified (check the motion frames)? For `schemaVersion: 2` packages |

### Samples: judge the prompt, not one run

Every user's agent builds a different result from the same prompt, so one run is one sample. Fixing the
small flaws of one sample and running again only draws a new sample with new small flaws. Candidates are
judged on three samples, gathered in two steps so a failing candidate costs one sample, not three:

1. **Screen:** `generate` (one sample), `evaluate`, `critic-brief`, critic, `critic`. A failing gate or a
   blocker or major sends the candidate back to the author.
2. **Confirm:** only a candidate that passes the screen gets `generate --samples 2`, then
   `evaluate --samples 3` (the screen run plus the two new ones), `critic-brief`, critic, `critic`. Publish
   only after this passes.

Judging three samples:

- **Gates** must pass in every sample.
- **A finding counts against the prompt when it recurs** — in two or more samples, or in every app of one
  sample — or when the spec itself causes it. A major seen once, in one app of one sample, is variance: it
  is listed with "1 of 3" and does not fail the candidate. A blocker fails it wherever it appears.
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

1. A failing gate, a blocker or a gating major → the findings' `promptFix`es and the gate details go to the
   prompt-author, who turns each into a general rule (never a fix for one demo screen).
2. The author changes the package, logs the change in `pipeline/<slug>/iterations.md`, bumps the
   pre-release (`0.1.0-rc.2`), and the screen runs again.

## Human approval

The user sees: the four apps' screenshots (desktop/mobile, light/dark), the reference next to them, the
gate table, the critic's findings (minors included) and the iteration log. Only an explicit approval moves
the version to `published`.
