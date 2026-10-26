# morning-shapes@0.1.0-rc.2 — evaluation 1

Verdict: **fail** · 2026-10-26T15:08:58.696Z

## blog (20261026-144825)

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

## commerce (20261026-144825)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 10 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | below (reported) | 1 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## dashboard (20261026-144825)

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

## settings (20261026-144825)

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

- commerce 20261026-144825 /products/canvas-field-tote desktop: uneven-row — button.ms-pill [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px
- commerce 20261026-144825 /products/canvas-field-tote mobile: uneven-row — button.ms-pill [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px
- commerce 20261026-144825 /products/merino-crew-sweater desktop: uneven-row — button.ms-pill [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px
- commerce 20261026-144825 /products/merino-crew-sweater mobile: uneven-row — button.ms-pill [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.833 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 3.12 | reported |
| reference-output-palette-distance | pass | 3.12 | reported |
| reference-fontSize-overlap | pass | 0.768 | reported |
| reference-radius-overlap | pass | 0.269 | reported |
| reference-spacing-overlap | pass | 0.907 | reported |

Review: complete, 141 of 141 checklist items covered by 9 reviewer(s) in 3 min

## Quality against the reference

| Area | Score | Bar |
| --- | --- | --- |
| referenceFidelity | 4 | 4 |
| signature | 3 | 4 |
| crossAppConsistency | 4 | 3 |
| hierarchy | 3 | 3 |
| spacingRhythm | 3 | 3 |
| componentStates | 3 | 3 |
| polish | 3 | 3 |

> Review: 141/141 checklist items by 8 reviewer(s) and a lead reviewer (showcase/runs/morning-shapes/0.1.0-rc.2/review-1).
> All three apps clearly speak the reference's language: yolk, blue and green bands with sag arcs, ink pills on ledges, cream borderless cards, category-dot filter pills, saturated stat tiles and a convincing navy/indigo night palette. rc.1's scattered stickers and hue-swapped covers are fixed, and product covers now picture their subject well.
> It still reads as a tidier, more generic cousin rather than the same team's work. Header-band art has shrunk to one repeated small disc-cloud-sparkle stamp in an empty corner, where the reference fills its bands with big, varied, overlapping scenes. Phone bands balloon with a stacked art row, detail pages stack two saturated fields, and the spec's empty-state 'preview' rule produces fake cart data. Fix the cluster scale and variety, the phone band, and the one-field rule to reach signature 4.

## Critic findings

| Kind | Severity | Area | Samples | Finding |
| --- | --- | --- | --- | --- |
| defect (prompt-induced) | major | polish | 1 of 1 | On every empty cart, the vignette rule makes agents add a 'preview of the filled screen' next to the empty message: made-up line items with names, options, prices and a total, in tinted chips on a saturated blue panel. It reads as real cart data and contradicts the empty message. It also puts a second blue field right under the blue header band. The empty state's own art is a lone pair of overlapping discs. The reference gives an empty or feature panel one composed piece of art and never shows invented records. |
| gap | major | signature | 1 of 1 | Header-band art is one small stamp, about 150px, that nearly every area repeats across all three apps: a crescent disc, a flat cloud and a pink sparkle, with the occasional hexagon-plus-pill. The disc-and-cloud version appears on the shop home, cart, checkout, projects, project detail, profile and security pages. The reference's bands carry a big, varied composition that fills roughly half the band: a blob-cut image with an offset edge, a cloud, a large four-point star, a bubble, all overlapping. Here the art is a small icon in an empty corner, so the bands read as a generic colored header with a sticker, not the reference's sunny scenes. |
| gap | major | hierarchy | 1 of 1 | On product detail pages, a saturated area-hue header band sits right above a large saturated item cover, often in the same yolk. Two big fields fill the desktop first screen and the whole phone screen, so the title and the product image blur together. The reference holds one field per view and puts white or cream between it and the next colored element. |
| gap | major | spacingRhythm | 1 of 1 | On phones, every header band drops its shape cluster onto a row of its own below left-aligned text. The band grows to 40–75% of the first screen, mostly empty color, and on product screens the header also takes two rows. On the blog home the vignette stacks the same way. The reference phone has one compact header row and a centered hero, with the art tucked against the band's edge or trimmed small. The spec says decoration 'moves last', and agents read that as moving it to a new row inside the band. |
| gap | minor | componentStates | 1 of 1 | Text and top-bar nav links get a flush, square, sometimes lopsided focus box that touches the current-page dot. Sidebar and pill items show the reference's rounded ring 2px out, so it is the links that fall short. This was named in rc.1 and is still open. On the phone's scrolling section strip, the ring is clipped at the edge. |
| gap | minor | componentStates | 1 of 1 | Confirmations are timid. A saved profile or a newsletter signup shows only a small inline tick and a word, often below the fold. The spec calls for an ink pill toast with a sparkle, which the add-to-cart state does well, and the reference states outcomes confidently. Data-table rows show no visible hover. |
| gap | minor | signature | 1 of 1 | Small-scale art is thinner than the reference. Empty states carry a lone 40px blob, a zigzag or a pair of discs, sometimes in a grey-bordered white box. Settings plates and stat-tile plates fill about half their plate with little crescent shading. Option-row glyphs are arbitrary marks in one hue, unrelated to their labels. The reference fills its plates, picks each glyph for its label, and never borders a card. |
| gap | minor | hierarchy | 1 of 1 | Stat-tile figures are about 32px, and a white-plated, stock-looking icon in each tile competes with them. In the reference's color tiles a huge bold number dominates under a small eyebrow. |
| gap | minor | referenceFidelity | 1 of 1 | On the billing page, unselected plans are grey-outlined white (lilac-outlined indigo at night) boxes with small prices, a generic SaaS pricing grid. The reference uses borderless toned cards and big bold figures. This is still open from rc.1. |
| gap | minor | signature | 1 of 1 | The front-page hero vignette is loose. The disc pins to one card's corner, and a lone sparkle and a stray dot float apart. The third card is an empty typing bubble that reads as a ghost strip. The reference's vignette overlaps product fragments, bubble, disc and sparkles into one tight scene. |
| defect (agent, not counted) | minor | polish | 1 of 1 | Two phone layout slips by the agents. The footer email input collapses to a thin sliver. The scrolling section and tab strip leaves the active pill out of view, so nothing marks the current page. |

## Reasons

- critic quality: signature 3 (needs 4)
- critic defect induced by the prompt (major): On every empty cart, the vignette rule makes agents add a 'preview of the filled screen' next to the empty message: made-up line items with names, options, prices and a total, in tinted chips on a saturated blue panel. It reads as real cart data and contradicts the empty message. It also puts a second blue field right under the blue header band. The empty state's own art is a lone pair of overlapping discs. The reference gives an empty or feature panel one composed piece of art and never shows invented records.
