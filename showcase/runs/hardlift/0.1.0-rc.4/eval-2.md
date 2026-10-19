# hardlift@0.1.0-rc.4 — evaluation 2

Verdict: **fail** · 2026-10-19T13:43:56.179Z

Agent spend: this candidate $15 · family $64 over 16 runs

## blog (20261019-131819)

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

## commerce (20261019-131819)

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

## dashboard (20261019-131819)

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

## settings (20261019-131819)

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

- dashboard 20261019-131819 / mobile: clipped-text — text.chart-value [chart-bar] "186" text runs 3px past svg.chart-svg, which hides overflow

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.829 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0.92 | reported |
| reference-output-palette-distance | pass | 3.73 | reported |
| reference-fontSize-overlap | pass | 0.952 | reported |
| reference-radius-overlap | pass | 0.263 | reported |
| reference-spacing-overlap | pass | 0.855 | reported |

Review: complete, 131 of 131 checklist items covered by 9 reviewer(s) in 2 min

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | polish | 1 of 1 | This was raised in the last review and is still not fixed. At phone width, every table keeps its desktop columns and scrolls sideways inside its box, with nothing to show that more columns exist. The last visible column ends exactly at the border, so each table looks complete. On the security screen, the sessions table shows only Device and Location: Last active and every Revoke row action are off-screen, so the screen's main task can't be seen. The overview and project tables stop at Status, which hides Budget and Due date. The team table stops at Role, which hides Location and Active projects. On both the team and security tables, cell text runs into the right border. This happens in light and dark. |
| major | signature | 1 of 1 | This was raised in the last review and is still not fixed. In the desktop empty-filter state, the band's always-visible pink 'Refresh' and the empty state's pink 'Clear filters' are on screen together, in light and dark. That makes two pink actions in one viewport, which breaks the one-pink-action rule the reference is built around. |
| minor | componentStates | 1 of 1 | The save confirmation on the settings form shows as an inline chip after the form buttons, with a button's border and hard offset shadow, instead of the fixed toast the spec describes. Next to a lifted save button it reads as a third button, not as a status message. |
| minor | signature | 1 of 1 | The dashboard's empty-filter state uses a small, icon-sized magnifier instead of the one size.stickerLg sticker that the spec's empty-state row asks for. It reads as a plain icon message, while the blog's and the cart's empty states show the full sticker. |

## Reasons

- critic major (1 of 1, spec): This was raised in the last review and is still not fixed. At phone width, every table keeps its desktop columns and scrolls sideways inside its box, with nothing to show that more columns exist. The last visible column ends exactly at the border, so each table looks complete. On the security screen, the sessions table shows only Device and Location: Last active and every Revoke row action are off-screen, so the screen's main task can't be seen. The overview and project tables stop at Status, which hides Budget and Due date. The team table stops at Role, which hides Location and Active projects. On both the team and security tables, cell text runs into the right border. This happens in light and dark.
- critic major (1 of 1): This was raised in the last review and is still not fixed. In the desktop empty-filter state, the band's always-visible pink 'Refresh' and the empty state's pink 'Clear filters' are on screen together, in light and dark. That makes two pink actions in one viewport, which breaks the one-pink-action rule the reference is built around.
