# morning-shapes@0.1.0-rc.5 — evaluation 1

Verdict: **pass** · 2026-10-26T19:12:52.200Z

## blog (20261026-185040)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | below (reported) | 1 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261026-185040)

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

## dashboard (20261026-185040)

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

## settings (20261026-185040)

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

- blog 20261026-185040 / mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- blog 20261026-185040 /posts/shipping-a-design-system mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- blog 20261026-185040 /posts/release-notes-people-read mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- blog 20261026-185040 /about mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-185040 / mobile: uneven-row — a.button [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-185040 /products/canvas-field-tote desktop: uneven-row — button.button [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px
- commerce 20261026-185040 /products/canvas-field-tote mobile: uneven-row — a.button [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-185040 /products/canvas-field-tote mobile: uneven-row — button.button [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px
- commerce 20261026-185040 /products/merino-crew-sweater desktop: uneven-row — button.button [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px
- commerce 20261026-185040 /products/merino-crew-sweater mobile: uneven-row — a.button [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-185040 /products/merino-crew-sweater mobile: uneven-row — button.button [quantity-decrement] "−" next to input.input [quantity-input]: tops differ 4px, bottoms 4px
- commerce 20261026-185040 /cart mobile: uneven-row — a.button [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px
- dashboard 20261026-185040 / mobile: clipped-text — text.chart-value [chart-bar] "186" text runs 1px past svg.chart-svg, which hides overflow

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | below (reported) | 0.729 | 0.75 |
| type-consistency | pass | 0.976 | 0.7 |
| reference-palette-distance | pass | 3.12 | reported |
| reference-output-palette-distance | pass | 3.12 | reported |
| reference-fontSize-overlap | pass | 0.767 | reported |
| reference-radius-overlap | pass | 0.31 | reported |
| reference-spacing-overlap | pass | 0.897 | reported |

Review: complete, 140 of 140 checklist items covered by 9 reviewer(s) in 4 min

## Severity overrides

- major → minor: In every desktop state capture, the front-page hero vignette appears as a bare saturated slab. The anchor card, chips, star and cloud are invisible or only ghosted, so the first screen reads as an unfinished block rather than the reference's composed scene (01, 02). The recipe animates every child of the vignette with fill-mode `both` and a staggered delay, but leaves the `::before` offset edge static. So whenever `is-in` is applied, the edge is the only thing showing until the build finishes. — Transient: the one-time entry build (about 1-2s) has not finished in state captures taken 300ms after an interaction; the reduced-motion page captures show the complete scene. A real but brief polish issue (the offset edge should build with its children), not a broken first screen. (2026-10-26T19:19:57.566Z)

## Quality against the reference

| Area | Score | Bar |
| --- | --- | --- |
| referenceFidelity | 4 | 4 |
| signature | 4 | 4 |
| crossAppConsistency | 4 | 3 |
| hierarchy | 3 | 3 |
| spacingRhythm | 4 | 3 |
| componentStates | 3 | 3 |
| polish | 3 | 3 |

> Review: 140/140 checklist items by 8 reviewer(s) and a lead reviewer (showcase/runs/morning-shapes/0.1.0-rc.5/review-1).
> At rest, rc.5 reads clearly as the reference's language in all four apps. It has the yolk and category-hue bands with arcs, ink pills on ledges, cream panels, saturated stat tiles and crescent-shaded flat pictograms, and a convincing derived night palette. The rc.4 gaps in band height, phone stacking and vignette composition have closed, and the family holds across the apps.
> It stays below the reference's craft in these ways: (1) a spec-caused build animation leaves the hero as a bare slab in every desktop state capture; (2) the dark footer ends in a white bar; (3) stat figures are too small to dominate their tiles; (4) nav-link focus is square, off switches are faint, and hover and confirmation states are thin; (5) some pictograms are undersized or repeated. Items 1 to 3, the off switch and the focus ring have quotable fixes in the spec.

## Critic findings

| Kind | Severity | Area | Samples | Finding |
| --- | --- | --- | --- | --- |
| defect (agent, not counted) | minor | signature | 1 of 1 | In every desktop state capture, the front-page hero vignette appears as a bare saturated slab. The anchor card, chips, star and cloud are invisible or only ghosted, so the first screen reads as an unfinished block rather than the reference's composed scene (01, 02). The recipe animates every child of the vignette with fill-mode `both` and a staggered delay, but leaves the `::before` offset edge static. So whenever `is-in` is applied, the edge is the only thing showing until the build finishes. |
| defect (agent, not counted) | minor | polish | 1 of 1 | On every night page, in all four apps, the footer ends in a bright white bottom bar under the indigo footer band. It is the only light surface on the page, while the reference's night palette stays dark to the edge (03). This has been open since rc.3. The spec maps the bar to `surface.inverse`, which is white at night. |
| gap | minor | hierarchy | 1 of 1 | Stat-tile numbers are about 32px on desktop and 28px on phones, barely heavier than the bold label above them, so the tiles read as coloured cards rather than numbers. In the reference (08), one large bold figure, about twice that size, dominates each saturated field, with a small eyebrow above and the caption below. This was named in rc.4. The spec still sets the number at h3 and the label in bold. |
| gap | minor | componentStates | 1 of 1 | In all three apps with a top bar, keyboard focus on top-bar links is still a square box drawn tight to the word, sometimes clipping the current-page dot. It looks like the browser default, where the reference draws a rounded ring offset around the whole control (11). Pills, switches and the menu circle get the right ring. This has been open since rc.2. The spec only says 'ring' for nav links, without a shape or offset. |
| defect (agent, not counted) | minor | signature | 1 of 1 | The dashboard's stat-tile plates fade in with a staggered reveal. In the captures, one plate is a ghost and the others are missing, so the shape kit is absent from the one saturated field on the screen. On data screens, decoration that arrives late reads as absent. |
| gap | minor | componentStates | 1 of 1 | In light mode an off switch is a warm-grey track one tone away from the cream panel, so it nearly disappears beside the crisp ink on-switches. The reference's controls always hold a clear edge (09, 11). The night version is clear. This carries over from rc.4. |
| gap | minor | componentStates | 1 of 1 | Some states are barely designed. Hovering a table row changes nothing visible. Newsletter success and a saved profile are a small tick and a word, and on desktop the saved tick sits below the first screen. The reference makes every state read at a glance and gives confirmations a designed moment (09, 11). |
| gap | minor | signature | 1 of 1 | Some pictograms are below the reference's spot-pictogram craft (07). Blog cover pictograms fill only about a third of their cover, with the sparkle always in the same corner and only a thin offset edge for shading. Several settings plates (card, receipt, monitor) are flat front-on icons at half size. Every product page in the shop reuses one price-tag band cluster with the hues swapped, and the size tiles repeat one meaningless dot-in-ring glyph. The band scenes elsewhere are at the right standard. |
| gap | minor | spacingRhythm | 1 of 1 | Phone rhythm is coarser than the reference's (04) in three places. The arc of a header band lands directly on the next panel with no air. Small fact groups become stacked full-width cards, one value per slab. The shop catalogue becomes a run of full-width square colour slabs, one product per screen. |
| gap | minor | signature | 1 of 1 | A lone blue confetti dot floats in the middle of the front-page hero below the pills on desktop and phone, attached to nothing. Marketing sections such as the about page open with plain left-hugging headings and no confetti. The reference places every small piece against a subject or in a deliberate scatter around a centred heading (02, 06). |
| defect (agent, not counted) | minor | polish | 1 of 1 | Agent slips that are not in the spec: the open user menu is almost transparent; the confirmation sheet on phones renders at the end of the document; a colour tile's label touches its border; the checkout submit pill is cut off at the fold; the sidebar stops at the viewport height; a trend arrow hangs beside a wrapped caption. |
