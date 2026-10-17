# Evaluation rubric

A template version passes when every hard gate passes on all four base apps, the critic scores clear the
bar, and a human approves. `pnpm harness evaluate` computes the gates and writes
`showcase/runs/<id>/<version>/eval-<iteration>.json` + `.md`. The `design-critic` agent adds the scores.

## Hard gates (per app, automated)

| Gate | Threshold | Why |
| --- | --- | --- |
| Agent finished | exit code 0 | the run is usable |
| Build | `npm run build` succeeds | shipping code |
| Functional preservation | every base-app smoke test passes | restyling must not break behavior |
| No console errors | 0 on every captured route | runtime regressions |
| No horizontal scroll | page width = viewport on every route, desktop and mobile, light and dark | mobile layouts that hide content off-screen |
| Accessibility | 0 new serious/critical axe violations vs. the unstyled base app | the system must not cost accessibility |
| Color adherence | ≥ 90% of painted color area within ΔE2000 ≤ 3 of a template color token | the agent used the palette, not its own |
| Font adherence | every rendered text family is a template family or its fallback | type is part of the identity |
| Radius adherence | ≥ 85% of rounded elements use a template radius (±1px) | shape is part of the identity |
| Reduced motion | 0 looping animations still running with `prefers-reduced-motion: reduce` | motion must respect the user |

Reported per app, not gated: animations running with motion allowed (looping, in SVG), illustrations and
line drawings, and frame sequences of the most visible animations (`motion/*.png`) for the critic.

## Cross-app gates (automated)

| Gate | Threshold |
| --- | --- |
| Palette consistency | the four apps' top-8 colors overlap ≥ 75% |
| Type consistency | same families and ≥ 70% shared font sizes |

## Reference similarity (automated, when a reference exists)

Reported, not gated — templates are derived, not cloned, so 100% would be a red flag.

- Palette distance: mean ΔE2000 between the reference's top colors and the template's semantic colors.
- Type scale overlap: share of reference font sizes within ±1px of a template size.
- Radius and spacing overlap.

## Critic scores (design-critic agent, 0–5)

Scored on the screenshots of all four apps side by side, with the reference screenshots when available.
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
- **Every point taken off cites its evidence:** the app screenshot or crop, and for anything about style,
  the reference image it was compared with.
- **One problem, one score.** Drawings, motion and other signature elements are scored under Signature
  only. Polish covers what is not a signature element: alignment, optical balance, default-browser
  leftovers, a generic look the reference does not have.

| Score | Question |
| --- | --- |
| Reference fidelity | Would someone who knows the reference recognize its character — without it being a copy? |
| Cross-app consistency | Do the four apps look like one family? |
| Hierarchy | Is it obvious what matters first on each screen, the way the reference makes it obvious? |
| Spacing rhythm | Is spacing consistent and on the scale? |
| Component states | Are focus, hover, disabled, error and empty states designed, not defaulted? |
| Polish | Alignment, optical balance, no default-browser leftovers, no generic look the reference doesn't have. Signature elements are not scored here |
| Signature | Are the signature elements present in all four apps, placed as Applying the concept says, built to their recipes, as well crafted as the reference's at the same size (compare the crops), and moving as specified (check the motion frames)? Scored for `schemaVersion: 2` packages |

**Bar:** average ≥ 4.0 and no single score below 3. Every score below 4 must come with a concrete
prompt fix ("add `color.surface.raised` usage rule for cards on subtle backgrounds") and the evidence
behind it.

### Samples: judge the prompt, not one run

Every user's agent builds a different result from the same prompt, so one run is one sample. Fixing the
small flaws of one sample and running again only draws a new sample with new small flaws. Candidates are
generated and evaluated with several samples (`generate --samples 3`, `evaluate --samples 3`):

- **Gates** must pass in every sample.
- **Scores** describe what a user can expect: the typical sample, not the best or the worst.
- **A flaw counts against the prompt when it recurs** — in two or more samples, or in every app of one
  sample — or when the spec itself causes it (a missing, ambiguous or contradictory rule). Those get prompt
  fixes. A flaw seen once, in one app of one sample, is variance: list it, but it neither lowers a score nor
  gets a prompt fix, unless it breaks something for people (a broken layout, unreadable text, a failed task).
- The critic file says, for each finding, in how many samples it appears.

## Iteration

1. Failing gate or score → the critic's `promptFixes` + gate details go to the prompt-author.
2. The author changes the package, logs the change in `pipeline/<slug>/iterations.md`, bumps the
   pre-release (`0.1.0-rc.2`), and the generate → evaluate loop runs again.
3. After 3 failed iterations, stop and report to the user with the failure analysis — the reference may
   not be expressible as a portable system, or a harness rule may need to change.

## Human approval

The user sees: the four apps' screenshots (desktop/mobile, light/dark), the reference next to them, the
gate table, the critic scores and the iteration log. Only an explicit approval moves the version to
`published`.
