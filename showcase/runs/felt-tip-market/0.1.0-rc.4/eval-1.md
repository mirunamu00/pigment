# felt-tip-market@0.1.0-rc.4 — evaluation 1

Verdict: **pass** · 2026-10-25T04:18:40.327Z

Agent spend: this candidate $21 · family $129 over 26 runs

## blog (20261025-035935)

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

## commerce (20261025-035935)

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

## dashboard (20261025-035935)

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

## settings (20261025-035935)

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

- blog 20261025-035935 / desktop: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- blog 20261025-035935 / desktop: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- blog 20261025-035935 / mobile: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- blog 20261025-035935 / mobile: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- commerce 20261025-035935 / desktop: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- commerce 20261025-035935 / desktop: double-rule — span.ft-plate a line of a.button runs 0px from its own
- commerce 20261025-035935 / mobile: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- commerce 20261025-035935 / mobile: double-rule — span.ft-plate a line of a.button runs 0px from its own
- commerce 20261025-035935 /cart desktop: double-rule — span.ft-plate [cart-empty] a line of span.ft-plate runs 0px from its own
- commerce 20261025-035935 /cart desktop: double-rule — span.ft-plate [cart-empty] a line of a.button runs 0px from its own
- commerce 20261025-035935 /cart mobile: double-rule — span.ft-plate [cart-empty] a line of span.ft-plate runs 0px from its own
- commerce 20261025-035935 /cart mobile: double-rule — span.ft-plate [cart-empty] a line of a.button runs 0px from its own

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.938 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 1.42 | reported |
| reference-output-palette-distance | pass | 5.91 | reported |
| reference-fontSize-overlap | pass | 0.637 | reported |
| reference-radius-overlap | pass | 0.429 | reported |
| reference-spacing-overlap | pass | 0.714 | reported |

Review: complete, 134 of 134 checklist items covered by 9 reviewer(s) in 3 min

## Quality against the reference

| Area | Score | Bar |
| --- | --- | --- |
| referenceFidelity | 4 | 4 |
| signature | 4 | 4 |
| crossAppConsistency | 4 | 3 |
| hierarchy | 4 | 3 |
| spacingRhythm | 3 | 3 |
| componentStates | 3 | 3 |
| polish | 4 | 3 |

> Review: 134/134 checklist items by 8 reviewer(s) and a lead reviewer (showcase/runs/felt-tip-market/0.1.0-rc.4/review-1).
> The front pages now read as the reference's own work. Each has a lemon hero with a 96px headline, a paired black CTA and bordered field at one height, and four to six thick ink-outlined stickers cropped at the side edges and the seam. The dark inversion follows 11 faithfully, and all four apps are clearly one family.
> What keeps the result below the reference's craft is the product chrome. Header bands are padded to fit their sticker instead of being filled with the screen's controls. A pink flag in every table row breaks the one-hot-colour discipline. Success and hover states are underdrawn next to the well-built errors. Phones lose tightness in rows that wrap.
> Since rc.3, the gaps in sticker depth, the hero action pair and the newsletter success panel have closed. The header-band gap, the saved-state gap and the half-empty form panel are still open.

## Critic findings

| Kind | Severity | Area | Samples | Finding |
| --- | --- | --- | --- | --- |
| gap | major | spacingRhythm | 1 of 1 | On overview and list screens, the product header bands hold only a title and a one-line lead. The band is then stretched to the height of its sticker, which leaves 100–140px of empty band colour. Meanwhile the screen's search, filter field and pill tabs sit outside the band, in the top bar or on paper below it. The reference's header band (06) is compact and full: search, pill tabs and breadcrumb all sit inside it, so the colour field carries the page's controls. The detail screen, which puts its breadcrumb and pill tabs in the band, shows how much better this reads. The spec sets the sticker's minimum height but no cap on empty band, and it lists controls for the band without requiring that they move into it, so agents grow the band to fit the sticker. This gap from rc.3 is still open. |
| gap | minor | polish | 1 of 1 | Data tables put a pink notched flag in every row, including small count columns and invoice lists. A column of five to eight flags becomes the loudest thing on the screen, louder than the selected plan or the page title. The reference spends its hot colour on one or two accents and lets the ink-and-paper table carry the screen. The spec's wording leads agents here. |
| gap | minor | componentStates | 1 of 1 | Success and hover states are weaker than the errors next to them. The saved confirmation on the form is an 8px teal dot and a word, set loose beside the buttons, and in dark it nearly disappears. In the reference's language an outcome is a framed piece: the newsletter success panel in this same run shows how. A hovered table row looks no different from the others. This gap from rc.3 is still open and has regressed slightly. |
| gap | minor | componentStates | 1 of 1 | Two parts of the buy panel read as stock form UI next to the reference's white hairline controls. The quantity stepper's disabled button is a grey-filled box, and the variant chips mark the selection with a radio dot rather than a pink selected border (07). |
| gap | minor | spacingRhythm | 1 of 1 | Several screens lose the reference's tightness. Phone pill and section-link rows wrap and leave one item alone on a second line, where the reference keeps one row or scrolls it. The phone catalog filter box spreads its pills over loose rows. The phone hero runs about 150px past its actions. Phone breadcrumbs wrap and repeat the title. On desktop, the password fields fill only about 40% of a wide panel, and the item-detail body is a doubled frame that stops short of the content width. |
| gap | minor | polish | 1 of 1 | In dark mode the edges between fields go soft. The colour band meets the black body with no visible seam, the black footer melts into the black ground behind only a faint rule, and the account menu's offset shadow is a thin pale edge that barely lifts it. The reference keeps every field closed by a visible edge. |
| gap | minor | referenceFidelity | 1 of 1 | Some surfaces fall outside the paper–white–ink triad, and some chrome is weaker than the reference's. Article code blocks are grey-filled with grey borders. The search clear glyphs are browser blue or navy. The blog's trailing header action is a hairline white cell where the reference uses a solid black block (pink in dark). The settings footer has no subscribe input or pink arrow button. |
| gap | minor | signature | 1 of 1 | A few drawings fall below the chunky die-cut bar. The blog's header-band notepad shows its depth only as thin page lines. The mug's depth runs sideways and it has no rim. The featured post's vignette is an unreadable notched slab, and the about page reuses a card's vignette instead of having its own. |
| defect (agent, not counted) | minor | polish | 1 of 1 | On phones, the data tables cut a column mid-word at the frame with no sticky column or scroll cue, and the dashboard nav pill row runs past the right edge. The spec asks for a sticky first column or a ruled list, and for a menu button below the large breakpoint, so these are the agent's own errors. |
