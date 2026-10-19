# hardlift@0.1.0-rc.4 — evaluation 1

Verdict: **fail** · 2026-10-19T13:34:29.606Z

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
| major | signature | 1 of 1 | Linked product cards still don't lift on hover, in light or dark. In the hover capture every card sits flush: none moves -4px and none gets the hard offset shadow, so the hovered card looks like all the others. The spec now has the .lift-card recipe, a 'Linked cards' paragraph and a row in the Interaction table, and the build still leaves the card's hover out. This is the third round this is carried over (rc.2, rc.3, rc.4). The hard lift on linked cards is where the reference shows its signature most. |
| major | signature | 1 of 1 | Two pink actions show at once on the dashboard's empty-filter state, in light and dark: the band's always-visible 'Refresh' and the empty state's 'Clear filters'. This regresses from rc.3, where both were ink. Refresh is now pink by default, and the empty-state component adds its own pink button without checking what pink is already in view. The spec forbids exactly this. |
| major (spec) | polish | 1 of 1 | At phone width, tables keep their desktop columns and scroll sideways inside their box with no cue. On the security screen only Device and Location are visible: Last active and every Revoke row action are off-screen, and the location text runs into the box's right border, so the screen's main task can't be seen. The team table has the same problem: it looks like a complete two-column table, and its other columns are found only by swiping. The spec's 'tables scroll inside their bordered box' rule has no exception for row actions and asks for no cue. |
| minor (spec) | signature | 1 of 1 | In dark mode the empty-state coin sticker's outline and glyph turn paper-white, because the recipe strokes with currentColor set to color.text.primary. The product stickers on the same site keep black ink outlines, and a white plus on pink is weak. |
| minor (spec) | signature | 1 of 1 | The blog's empty search result puts the yellow band inside a bordered card as its header strip. Bands are page or section headers and never go on cards. The spec's 'empty state (band above the sticker)' wording invites this. |
| minor | componentStates | 1 of 1 | In dark mode, hovering a table row shows no visible fill. The hovered row has the same raised gray as the other rows, while the light theme shows the subtle fill. |
| minor (spec) | componentStates | 1 of 1 | On mobile, the horizontally scrolling pill strip clips a focused pill's outline at the top and bottom, so only the two side arcs of the ring show. |
| minor | spacingRhythm | 1 of 1 | On desktop, the settings screens put their content in a narrow column of about 60% of the container, pinned left under a full-width band. That leaves a large empty strip on the right, where the reference fills its container with dense content. |
| minor | spacingRhythm | 1 of 1 | On the desktop project detail page, the status pill sits alone at the band's far right edge, on the meta line and away from the title it describes. Mobile puts it right under the title. |

## Reasons

- critic major (1 of 1): Linked product cards still don't lift on hover, in light or dark. In the hover capture every card sits flush: none moves -4px and none gets the hard offset shadow, so the hovered card looks like all the others. The spec now has the .lift-card recipe, a 'Linked cards' paragraph and a row in the Interaction table, and the build still leaves the card's hover out. This is the third round this is carried over (rc.2, rc.3, rc.4). The hard lift on linked cards is where the reference shows its signature most.
- critic major (1 of 1): Two pink actions show at once on the dashboard's empty-filter state, in light and dark: the band's always-visible 'Refresh' and the empty state's 'Clear filters'. This regresses from rc.3, where both were ink. Refresh is now pink by default, and the empty-state component adds its own pink button without checking what pink is already in view. The spec forbids exactly this.
- critic major (1 of 1, spec): At phone width, tables keep their desktop columns and scroll sideways inside their box with no cue. On the security screen only Device and Location are visible: Last active and every Revoke row action are off-screen, and the location text runs into the box's right border, so the screen's main task can't be seen. The team table has the same problem: it looks like a complete two-column table, and its other columns are found only by swiping. The spec's 'tables scroll inside their bordered box' rule has no exception for row actions and asks for no cue.
