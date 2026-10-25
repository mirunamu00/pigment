# felt-tip-market@0.1.0-rc.2 — evaluation 1

Verdict: **fail** · 2026-10-25T03:09:15.685Z

Agent spend: this candidate $21 · family $87 over 18 runs

## blog (20261025-025002)

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

## commerce (20261025-025002)

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

## dashboard (20261025-025002)

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

## settings (20261025-025002)

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

- blog 20261025-025002 / desktop: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- blog 20261025-025002 / desktop: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- blog 20261025-025002 / mobile: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- blog 20261025-025002 / mobile: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- commerce 20261025-025002 / desktop: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- commerce 20261025-025002 / desktop: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- commerce 20261025-025002 / mobile: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- commerce 20261025-025002 / mobile: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- commerce 20261025-025002 /cart desktop: double-rule — span.ft-plate [cart-empty] a line of span.ft-plate runs 0px from its own
- commerce 20261025-025002 /cart desktop: double-rule — span.ft-plate [cart-empty] a line of a.ft-btn runs 0px from its own
- commerce 20261025-025002 /cart mobile: double-rule — span.ft-plate [cart-empty] a line of span.ft-plate runs 0px from its own
- commerce 20261025-025002 /cart mobile: double-rule — span.ft-plate [cart-empty] a line of a.ft-btn runs 0px from its own

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 1 | 0.75 |
| type-consistency | pass | 0.972 | 0.7 |
| reference-palette-distance | pass | 1.42 | reported |
| reference-output-palette-distance | pass | 5.91 | reported |
| reference-fontSize-overlap | pass | 0.658 | reported |
| reference-radius-overlap | pass | 0.467 | reported |
| reference-spacing-overlap | pass | 0.687 | reported |

Review: complete, 134 of 134 checklist items covered by 9 reviewer(s) in 3 min

## Quality against the reference

| Area | Score | Bar |
| --- | --- | --- |
| referenceFidelity | 4 | 4 |
| signature | 3 | 4 |
| crossAppConsistency | 4 | 3 |
| hierarchy | 4 | 3 |
| spacingRhythm | 4 | 3 |
| componentStates | 4 | 3 |
| polish | 3 | 3 |

> Review: 134/134 checklist items by 8 reviewer(s) and a lead reviewer (showcase/runs/felt-tip-market/0.1.0-rc.2/review-1).
> This is clearly the reference's language across all four apps. The paper ground, white bars with black current pills and full-height black blocks, colour header bands closed by ink seams, 1px ink panels, 48px controls, dashed empty states and black footers all match. The rc.1 dark-depth inversion is fixed everywhere: black ground with raised panels, white current pill, pink CTA block.
> The part the system is known for is still the weakest. The hero sticker rings are real now, but the objects are smaller, thinner-rimmed and more varied clip-art than the reference's large repeated coins. Band stickers are sometimes corner fragments, and the large product drawings are flat thin outlines cut by their frame. The earlier sticker gap has only partly closed, so signature stays at 3.
> Component states are mostly strong (errors, focus, empty, dialog, loading). Success confirmations are still undesigned, and polish is held back by the thin large drawings, grey code boxes and pink flags repeated in every table row.

## Critic findings

| Kind | Severity | Area | Samples | Finding |
| --- | --- | --- | --- | --- |
| gap | major | signature | 1 of 1 | The stickers exist now across all apps: a ring around each front-page hero, one object per header band, and one vignette per card and figure. They are original and on-topic, but they still don't have the reference's scale and heft. Hero objects are mostly 100–150px on desktop and about 100px on phones. Most show a side band only a few px deep, a sliver about 5% of their height, so they read as flat outlines with a lip. Several band stickers (the overview parcel, the about-page notepad) are pushed into a top corner with half the object off-screen, so they read as fragments. The reference's coins are 200–260px thick die-cut objects with a deep solid rim. They are mostly visible where cropped, and they weigh against the headline to hold the composition. |
| gap | major | signature | 1 of 1 | On the product detail page, the item's drawing is one flat outline scaled up to fill a roughly 600px image box. Its 2px ink looks hairline-thin at that size, it has no visible back or side band, and on desktop the frame cuts the object off at the bottom. The reference's objects stay chunky die-cut stickers at every size: a heavy outline relative to the object, a solid rim, and the whole object kept inside its field, or cropped only on purpose at a band edge. |
| gap | minor | signature | 1 of 1 | Each hero rings the headline with a mixed set of unrelated clip-art objects, all different, at different sizes. The reference repeats one large motif in one fill around the headline (the coin family), and that repetition gives the scatter its rhythm and makes it read as one poster. Here the ring reads busier and more like an illustration set. The hero action is also a compact single pink button, where the reference sets a large block CTA paired with a bordered search field. |
| gap | minor | componentStates | 1 of 1 | Success moments are the least designed states in the family. A saved form shows only an 8px dot and one word next to the buttons, and it nearly disappears in dark. The newsletter confirmation is a small bordered box with a dot and text and no hard shadow in light. The recipe's confirmation panel (white, ink frame, static hard shadow, a word badge or flag) is missing, while the error and empty states next to them are fully drawn. This gap was named in the earlier verdict and is still open. |
| gap | minor | componentStates | 1 of 1 | On the buy panel, the selected option is marked with a 2px ink border and a pink radio dot, and the disabled stepper button is a grey-filled box. The reference marks selection with a pink border and a check disc on a white card, and never uses a grey fill. |
| gap | minor | componentStates | 1 of 1 | In dark mode, a menu that opens over a colour band loses its hard shadow, because a 35% white offset does not show on lemon. The menu reads as a flat pasted box, where the reference's overlays always look picked up. |
| gap | minor | polish | 1 of 1 | Data tables put a pink notched flag in every row, so a column of 6–8 pink flags becomes the loudest thing on the screen. The reference spends pink on a few accents and lets the ink-and-paper table carry the screen. |
| gap | minor | polish | 1 of 1 | Some surfaces fall outside the paper, white and ink set. Code samples are a flat grey box with a grey border in light and a mid-grey slab in dark. The focused search field's clear glyph is still the default blue, which the earlier verdict also named. The reference builds every box as white or the raised tone with a 1px ink hairline, and keeps every chrome icon ink. |
| gap | minor | polish | 1 of 1 | In dark mode the black footer runs straight on from the black ground with no hairline or tone step, so the page has no visible end. The reference closes every field with a visible seam. |
| gap | minor | spacingRhythm | 1 of 1 | The password form's fields stop at about half the panel width and leave the right half of the white panel empty. The reference fills its settings panels with full-width fields or a description column beside the controls. This gap is still open from the earlier verdict. |
| gap | minor | spacingRhythm | 1 of 1 | On article pages, the header logo, the band's breadcrumb and title, and the body column each start at a different left edge. The reference aligns header, band content and body to one edge. |
| defect (agent, not counted) | minor | polish | 1 of 1 | On phones, horizontal pill rows (section nav, category filters) overflow with no scroll cue. The last item, sometimes the current pill, is cut mid-word, and the first item sits flush against the screen edge with no gutter. |
| defect (agent, not counted) | minor | polish | 1 of 1 | On phones, data tables give the first column about two thirds of the width. The next column is cut mid-word at the frame, and nothing shows that the table scrolls. |

## Reasons

- critic quality: signature 3 (needs 4)
