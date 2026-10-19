# hardlift@0.1.0-rc.5 — evaluation 1

Verdict: **pass** · 2026-10-19T20:58:17.612Z

Agent spend: this candidate $16 · family $80 over 20 runs

## blog (20261019-204125)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261019-204125)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 10 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## dashboard (20261019-204125)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 10 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261019-204125)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 8 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## Measured layout (reported, for the critic)

- blog 20261019-204125 / desktop: clipped-text — li.tagwall-item "Process" text runs 50px past div.tagwall-strip, which hides overflow

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.851 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0.92 | reported |
| reference-output-palette-distance | pass | 5.64 | reported |
| reference-fontSize-overlap | pass | 0.948 | reported |
| reference-radius-overlap | pass | 0.25 | reported |
| reference-spacing-overlap | pass | 0.853 | reported |

Review: complete, 130 of 130 checklist items covered by 9 reviewer(s) in 2 min

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| minor | polish | 1 of 1 | At phone width, the project tables reflow into stacked blocks, but they still open with a gray strip of desktop column names (Project, Owner, Status, Budget). The strip wraps, which leaves the active sort ('Due date ↑') as a lone outlined pill on a second line. Every block already labels its fields, so the strip repeats them and reads as a broken, half-styled header row instead of one clear sort control. This shows in light, dark and the row-hover state. |
| minor | polish | 1 of 1 | When phone-width tables reflow into stacked blocks, each block's title (the session's device name, the invoice ID) is set semibold or bold. The type rule is regular weight only, with bold allowed just for totals and inline emphasis. |
| minor | signature | 1 of 1 | At phone width, the 'On this page' pill strip on article pages draws an ink outline on every pill at rest. The pill recipe calls for a transparent border at rest, with the outline only on hover or when selected, which is how the home page's filter pills behave. |
| minor | signature | 1 of 1 | The figure in the design-system article is a generic composition: two rounded rectangles on a yellow ellipse inside a frame. It doesn't show its subject, many buttons grouped into a few jobs, though the spec asks for a figure that shows what it stands for. The other article's figure does this well. |
| minor | componentStates | 1 of 1 | The keyboard focus ring on the header's 'Cart' link sits flush against the current-page 'Shop' pill next to it, with no gap. This crowds the two pills and weakens the 2px-offset ring the spec asks for. It shows in light desktop only. |
