# inkleaf@1.1.0-rc.1 — evaluation 1

Verdict: **fail** · 2026-10-18T23:56:00.773Z

Agent spend: this candidate $24 · family $24 over 4 runs

## blog (20261018-233041)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261018-233041)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## dashboard (20261018-233041)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261018-233041)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.823 | 0.75 |
| type-consistency | pass | 0.811 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 4.24 | reported |
| reference-fontSize-overlap | pass | 0.613 | reported |
| reference-radius-overlap | pass | 0.822 | reported |
| reference-spacing-overlap | pass | 0.864 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | signature | 1 of 1 | Regression from 1.0.0, caused by the update's new long-form rule. In-article figures that stand for a diagram or a screenshot are now replaced by one large pictogram of a loosely related object, and the drawing no longer shows what its caption says. A caption about an inventory board of grouped components sits under a single sewing button. A caption about one release written for two audiences sits under a pencil. Both are full text-column plates holding a 416px drawing in the middle of the prose. In 1.0.0 the same figures were ghosted UI previews on a stage: a grid of grouped tiles, and two side-by-side panels. Those matched their captions and followed the reference's habit of putting UI on stages. The cause is the new line in Layout adaptation: 'An image without a photo becomes a drawing of the page's or item's own subject (Imagery), never removed.' It treats every missing image as an item photo. The rc.3 distinction ('diagrams and screenshots sit on a stage') is gone. |
| major (spec) | spacingRhythm | 1 of 1 | Regression from 1.0.0, caused by the update's rewrite of the stat-row rule. At 390px the four stat cards (a label, one number, a delta) now stack one per row as full-width cards. Together they take about 540 CSS px, more than half a phone screen, before the first chart. 1.0.0 showed them 2x2, a fix added after an earlier critic round ('Stat cards: 2 per row under breakpoint.md'). The new wording, 'Stat rows wrap evenly whatever their count (equal columns, never one card alone on the last row)', is satisfied by one column, so the density rule is lost. |
| minor | signature | 1 of 1 | One plate fails the one-word test. The tea-towel product is drawn as a lidded canister with a hanging loop, with no fold, fringe or stripe that says cloth. It reads as a bin or jar. The reference's small objects read at once (hanger, toolbox). |
| minor | componentStates | 1 of 1 | In the pending state, the working glyph sits beside the 'Refreshing…' label instead of replacing it. The spec says the glyph sits inside the button and replaces the label, never beside it. The agent kept the wording on purpose. |
| minor | polish | 1 of 1 | On wide screens the posts search field is placed visually to the right of the filter chips but comes first in the tab order, so keyboard focus runs against the visual order. The agent reported this. |
| minor | spacingRhythm | 1 of 1 | On the item detail screen there is about 90px of empty paper between the header lede and the tab bar, a larger gap than any other header-to-content gap in the family. It reads as a missing block. |

## Reasons

- critic major (1 of 1, spec): Regression from 1.0.0, caused by the update's new long-form rule. In-article figures that stand for a diagram or a screenshot are now replaced by one large pictogram of a loosely related object, and the drawing no longer shows what its caption says. A caption about an inventory board of grouped components sits under a single sewing button. A caption about one release written for two audiences sits under a pencil. Both are full text-column plates holding a 416px drawing in the middle of the prose. In 1.0.0 the same figures were ghosted UI previews on a stage: a grid of grouped tiles, and two side-by-side panels. Those matched their captions and followed the reference's habit of putting UI on stages. The cause is the new line in Layout adaptation: 'An image without a photo becomes a drawing of the page's or item's own subject (Imagery), never removed.' It treats every missing image as an item photo. The rc.3 distinction ('diagrams and screenshots sit on a stage') is gone.
- critic major (1 of 1, spec): Regression from 1.0.0, caused by the update's rewrite of the stat-row rule. At 390px the four stat cards (a label, one number, a delta) now stack one per row as full-width cards. Together they take about 540 CSS px, more than half a phone screen, before the first chart. 1.0.0 showed them 2x2, a fix added after an earlier critic round ('Stat cards: 2 per row under breakpoint.md'). The new wording, 'Stat rows wrap evenly whatever their count (equal columns, never one card alone on the last row)', is satisfied by one column, so the density rule is lost.
