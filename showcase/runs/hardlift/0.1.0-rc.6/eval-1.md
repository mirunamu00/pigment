# hardlift@0.1.0-rc.6 — evaluation 1

Verdict: **pass** · 2026-10-19T22:19:28.849Z

Agent spend: this candidate $17 · family $143 over 34 runs

## blog (20261019-220051)

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

## commerce (20261019-220051)

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

## dashboard (20261019-220051)

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

## settings (20261019-220051)

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

- blog 20261019-220051 / desktop: clipped-text — li.tagwall-item "Remote work" text runs 9px past div.tagwall-strip, which hides overflow
- blog 20261019-220051 / mobile: clipped-text — li.tagwall-item "Remote work" text runs 76px past div.tagwall-strip, which hides overflow
- blog 20261019-220051 / mobile: double-rule — footer.site-footer "Subscribe to the newsletterOne email whe" a line of section.newsletter runs 1px from its own
- blog 20261019-220051 /posts/shipping-a-design-system mobile: double-rule — footer.site-footer "Subscribe to the newsletterOne email whe" a line of section.newsletter runs 1px from its own
- blog 20261019-220051 /posts/release-notes-people-read mobile: double-rule — footer.site-footer "Subscribe to the newsletterOne email whe" a line of section.newsletter runs 1px from its own
- blog 20261019-220051 /about mobile: double-rule — footer.site-footer "Subscribe to the newsletterOne email whe" a line of section.newsletter runs 1px from its own
- dashboard 20261019-220051 / desktop: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-220051 / mobile: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-220051 /projects desktop: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-220051 /projects mobile: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-220051 /projects/apollo-migration desktop: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-220051 /projects/apollo-migration mobile: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-220051 /team desktop: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px
- dashboard 20261019-220051 /team mobile: uneven-row — input.input [global-search] next to button.lift [global-search-submit] "Search": tops differ 0px, bottoms 2px

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.851 | 0.75 |
| type-consistency | pass | 0.967 | 0.7 |
| reference-palette-distance | pass | 0.92 | reported |
| reference-output-palette-distance | pass | 3.73 | reported |
| reference-fontSize-overlap | pass | 0.94 | reported |
| reference-radius-overlap | pass | 0.24 | reported |
| reference-spacing-overlap | pass | 0.876 | reported |

Review: complete, 130 of 130 checklist items covered by 9 reviewer(s) in 2 min

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| minor (spec) | signature | 1 of 1 | In dark mode, any sticker shape filled with white in light mode (the tag, speech bubble, document sheets and card or button shapes) switches to the dark raised surface. On the yellow band and panels these shapes become dark-gray silhouettes, and the ink glyphs and text lines inside them almost disappear. The pink coin and star stay bright, so the hero still reads as the sticker hero, but the reference's dark hero keeps all of its sticker art bright. This is caused by the spec: the recipe asks for fills from semantic tokens but doesn't say that sticker fills must stay the same in both themes. |
| minor (spec) | componentStates | 1 of 1 | While it is busy, the ghost Refresh button in the page-header band changes from its ink outline to a solid pink fill, in light, dark and mobile. The spec says a busy control keeps its variant's fill. The ghost hover rule that turns the fill pink doesn't exclude busy or disabled buttons, so this comes from the spec. The label and the turning coin stay readable, and no other pink action is in view. The rc.5 problem (a gray, unreadable busy button) is fixed. |
| minor | polish | 1 of 1 | When a table reflows into stacked blocks at phone width, each block's title (the device name or invoice number) is bold. The spec keeps all type at regular weight and allows bold only for totals and inline emphasis. |
| minor | componentStates | 1 of 1 | In light mode, the keyboard focus ring on a header nav pill sits almost flush with the pill and touches the ink current-page pill next to it, so the two read as one shape instead of a ring with a 2px offset. The dark pink ring is clear. |
| minor | componentStates | 1 of 1 | In the newsletter error state, the recovery action (Subscribe) is an ink button, even though at that scroll position no pink action is in view. The colour rule reserves pink for the one action the current view is about. |
