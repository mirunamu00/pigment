# hardlift@0.1.0-rc.2 — evaluation 1

Verdict: **fail** · 2026-10-19T12:51:22.283Z

Agent spend: this candidate $16 · family $32 over 8 runs

## blog (20261019-123257)

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

## commerce (20261019-123257)

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

## dashboard (20261019-123257)

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

## settings (20261019-123257)

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

- dashboard 20261019-123257 / desktop: uneven-row — a.lift "Skip to content" next to aside.sidebar "Northwind OpsOverviewProjectsTeamSetting": tops differ 8px, bottoms 1577px
- dashboard 20261019-123257 / desktop: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-123257 / mobile: clipped-text — text.chart-value [chart-bar] "186" text runs 2px past svg.chart-svg, which hides overflow
- dashboard 20261019-123257 / mobile: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-123257 /projects desktop: uneven-row — a.lift "Skip to content" next to aside.sidebar "Northwind OpsOverviewProjectsTeamSetting": tops differ 8px, bottoms 894px
- dashboard 20261019-123257 /projects desktop: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-123257 /projects mobile: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-123257 /projects/apollo-migration desktop: uneven-row — a.lift "Skip to content" next to aside.sidebar "Northwind OpsOverviewProjectsTeamSetting": tops differ 8px, bottoms 844px
- dashboard 20261019-123257 /projects/apollo-migration desktop: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-123257 /projects/apollo-migration mobile: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-123257 /team desktop: uneven-row — a.lift "Skip to content" next to aside.sidebar "Northwind OpsOverviewProjectsTeamSetting": tops differ 8px, bottoms 844px
- dashboard 20261019-123257 /team desktop: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-123257 /team mobile: uneven-row — input.input [global-search] next to button.search-button [global-search-submit] "Search": tops differ 0px, bottoms 2px

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.83 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0.92 | reported |
| reference-output-palette-distance | pass | 3.73 | reported |
| reference-fontSize-overlap | pass | 0.935 | reported |
| reference-radius-overlap | pass | 0.316 | reported |
| reference-spacing-overlap | pass | 0.863 | reported |

Review: complete, 130 of 130 checklist items covered by 9 reviewer(s) in 3 min

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major | componentStates | 1 of 1 | Linked product cards don't lift on hover. They don't move -4px and get no hard offset shadow, so in both themes a hovered card looks the same as one at rest. The hard lift on linked cards in a grid is one of the system's four signature elements. |
| major (spec) | signature | 1 of 1 | More than one pink action shows in the same viewport. A component's own pink button (the empty-state 'Clear filters', the newsletter Subscribe) appears next to a screen-level pink action (Refresh), and an open menu trigger also turns pink. This breaks the rule that pink is kept for one main action per viewport. |
| major (spec) | signature | 1 of 1 | Every image and figure uses the same generic 'picture' glyph (mountains and sun, or a framed-image icon) on a band-color square. That covers all 11 product tiles, both product detail images, and both article figures under different captions. Nothing tells one item from another, and the figures read as missing images. The spec asks for original sticker objects drawn from basic shapes, and the reference's colorful product wall works because each tile is different. |
| minor (spec) | polish | 1 of 1 | On mobile, tables keep every desktop column and scroll inside their box with no cue that they scroll. Only the first one or two columns fit, the next one is cut mid-word or mid-icon, and status, dates and row actions such as 'Revoke' are off-screen. |
| minor | signature | 1 of 1 | On the product detail page the price is plain large text instead of the pink price tag used on the cards. |
| minor (spec) | crossAppConsistency | 1 of 1 | The spec's placeholder rule ('a band color with an ink glyph') conflicts with its 'one band color per screen' rule. As a result, the shop grid cycles through four band colors under a teal band. |
| minor (spec) | signature | 1 of 1 | On mobile, the landing hero shows only two small corner slivers of its stickers, so the sticker hero almost disappears. |
| minor | componentStates | 1 of 1 | Confirmation messages are drawn in the wrong form. The subscribe confirmation is a raised, hard-shadowed card nested inside the raised newsletter card. The profile 'Saved' message is a box the size of a button inside the action row, so it reads as a third button rather than a toast. |
| minor (spec) | componentStates | 1 of 1 | When a field is both invalid and focused, the pink focus halo replaces its red error border, so while focused the error shows only in the message below the field. |
| minor | componentStates | 1 of 1 | In dark mode the table-row hover fill is the same color as the rows' raised background, so you can't see which row is hovered. |
| minor (spec) | signature | 1 of 1 | The sticker in the dashboard's empty state is about 28px, not the 160px empty-state size. The spec doesn't say which size to use for an empty panel on a dense screen. |
| minor | polish | 1 of 1 | The account email in the user menu breaks in the middle of a word instead of being truncated. |
| minor (spec) | polish | 1 of 1 | The spec bans translucency but gives no rule for a modal backdrop, so the dialog uses a gray translucent scrim that turns the band color murky. |
| minor | spacingRhythm | 1 of 1 | On the desktop dashboard, the chart card is much shorter than the activity card beside it, which leaves a block of empty paper under the chart. |

## Reasons

- critic major (1 of 1): Linked product cards don't lift on hover. They don't move -4px and get no hard offset shadow, so in both themes a hovered card looks the same as one at rest. The hard lift on linked cards in a grid is one of the system's four signature elements.
- critic major (1 of 1, spec): More than one pink action shows in the same viewport. A component's own pink button (the empty-state 'Clear filters', the newsletter Subscribe) appears next to a screen-level pink action (Refresh), and an open menu trigger also turns pink. This breaks the rule that pink is kept for one main action per viewport.
- critic major (1 of 1, spec): Every image and figure uses the same generic 'picture' glyph (mountains and sun, or a framed-image icon) on a band-color square. That covers all 11 product tiles, both product detail images, and both article figures under different captions. Nothing tells one item from another, and the figures read as missing images. The spec asks for original sticker objects drawn from basic shapes, and the reference's colorful product wall works because each tile is different.
