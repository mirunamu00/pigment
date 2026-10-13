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
hover, validation errors, dialogs, toasts, empty results) defined in each base app's `pigment.app.json`.

| Score | Question |
| --- | --- |
| Reference fidelity | Would someone who knows the reference recognize its character — without it being a copy? |
| Cross-app consistency | Do the four apps look like one family? |
| Hierarchy | Is it obvious what matters first on each screen? |
| Spacing rhythm | Is spacing consistent and on the scale? |
| Component states | Are focus, hover, disabled, error and empty states designed, not defaulted? |
| Polish | Alignment, optical balance, no default-browser leftovers, no AI-generic look |
| Signature | Are the signature elements present in all four apps, placed as Applying the concept says, built to their recipes and moving as specified (check the motion frames)? Scored for `schemaVersion: 2` packages |

**Bar:** average ≥ 4.0 and no single score below 3. Every score below 4 must come with a concrete
prompt fix ("add `color.surface.raised` usage rule for cards on subtle backgrounds").

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
