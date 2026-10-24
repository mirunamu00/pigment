# graphite-blueprint@1.2.0-rc.1 — evaluation 1

Verdict: **fail** · 2026-10-18T23:30:27.359Z

Agent spend: this candidate $21 · family $21 over 4 runs

## blog (20261018-231142)

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

## commerce (20261018-231142)

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

## dashboard (20261018-231142)

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

## settings (20261018-231142)

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

## Measured layout (reported, for the critic)

- commerce 20261018-231142 / desktop: repeated-drawing — svg [product-image] the same drawing appears 2 times on the page
- commerce 20261018-231142 / mobile: repeated-drawing — svg [product-image] the same drawing appears 2 times on the page

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 1 | 0.75 |
| type-consistency | pass | 0.804 | 0.7 |
| reference-palette-distance | pass | 0.18 | reported |
| reference-output-palette-distance | pass | 5.97 | reported |
| reference-fontSize-overlap | pass | 0.937 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.947 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | signature | 1 of 1 | The page close is gone, and with it the dot field, which now appears nowhere in this sample. The blog ends both its home and about pages with a real final call to action, a newsletter form. Published 1.1.0 built that block as the centered two-tone statement over the dot field, with a mono label and pills. Here it is a plain split row: a small 'Subscribe to the newsletter' title on the left and a bare form on the right. The spec caused this: the Applying row now reads 'Page close (optional)' and gives no trigger, and the new intro says 'never adds parts to match the row', so the agent took optional to mean skip it. Dropping the invented closing on the store grid was the right result for the update's goal. Dropping it where the page really ends in an action is a loss against the published version, and the closing statement is a trait of the reference too ('Built for the future. Available today.' centered with its pills at the foot of p1). |
| major (spec) | signature | 1 of 1 | Plate captions now repeat what sits right next to them, so the figure carries no information of its own. On every store card the plate reads 'NO. 01 · BAG' about 40px above the mono meta 'BAGS · 3 COLORS', and the item detail repeats it ('NO. 01 · BAG' beside 'BAGS · 3 COLORS'). The project detail plate reads 'NO. 01 · ACTIVE' beside an Active badge, and the payment plate reads 'NO. 4242 · VISA' beside 'Visa ending in 4242'. Published 1.1.0 captioned the same cards with a real attribute from the item's own details ('FIG 01 · 18 OZ CANVAS', and that fabric is listed in the product's details), distinct from the category label under it. The spec caused this. Its examples are now `FIG 03 · ATTRIBUTE` and `NO. 07 · CATEGORY`, and 'use its type or category' is the fallback. It also says 'never the number or category alone' yet shows number plus category as an example, and it never says the caption must differ from the labels around it. So agents reach for the category even when the item has better data. The reference's thumbnails never echo their own headline (p1 changelog cards). |
| minor (spec) | signature | 1 of 1 | The plate has spread past missing item images. Billing gives the saved payment card a generative plate (bars), a decorative figure for a record that is not an item in a list or grid. This follows from the broadened 'every item without an image of its own'. The reference keeps its generated thumbnails to content cards (p1 changelog row). |
| minor (spec) | polish | 1 of 1 | Blog grid captions mix two kinds of fact in one row: 'NO. 02 · WRITING' and 'NO. 04 · PROCESS' next to 'NO. 03 · 2 MIN' and 'NO. 07 · 1 MIN'. The agent fell back to reading time when the tag would pass the 18-character cap (agent-report.md, 'Plate captions'). The spec gives the cap but no rule that captions in one list use the same kind of fact. |
| minor (spec) | polish | 1 of 1 | Dashboard overview: 'Deployment throughput' is titled above its stage while 'Recent activity' is titled inside its card. That leaves the card's top at about y 351 and the stage's top at about y 387, so the two panels start on different lines and end together. Published 1.1.0 showed this in 1 of 3 samples. The spec still covers only the stage side ('title above'). |
| minor | componentStates | 1 of 1 | On the dashboard KPIs, '−2 since Monday' (open incidents) and '−0.6 days' (lead time) get the danger dot, because the agent mapped the trend's direction to color. Both are improvements. Published 1.1.0 showed them green. |

## Reasons

- critic major (1 of 1, spec): The page close is gone, and with it the dot field, which now appears nowhere in this sample. The blog ends both its home and about pages with a real final call to action, a newsletter form. Published 1.1.0 built that block as the centered two-tone statement over the dot field, with a mono label and pills. Here it is a plain split row: a small 'Subscribe to the newsletter' title on the left and a bare form on the right. The spec caused this: the Applying row now reads 'Page close (optional)' and gives no trigger, and the new intro says 'never adds parts to match the row', so the agent took optional to mean skip it. Dropping the invented closing on the store grid was the right result for the update's goal. Dropping it where the page really ends in an action is a loss against the published version, and the closing statement is a trait of the reference too ('Built for the future. Available today.' centered with its pills at the foot of p1).
- critic major (1 of 1, spec): Plate captions now repeat what sits right next to them, so the figure carries no information of its own. On every store card the plate reads 'NO. 01 · BAG' about 40px above the mono meta 'BAGS · 3 COLORS', and the item detail repeats it ('NO. 01 · BAG' beside 'BAGS · 3 COLORS'). The project detail plate reads 'NO. 01 · ACTIVE' beside an Active badge, and the payment plate reads 'NO. 4242 · VISA' beside 'Visa ending in 4242'. Published 1.1.0 captioned the same cards with a real attribute from the item's own details ('FIG 01 · 18 OZ CANVAS', and that fabric is listed in the product's details), distinct from the category label under it. The spec caused this. Its examples are now `FIG 03 · ATTRIBUTE` and `NO. 07 · CATEGORY`, and 'use its type or category' is the fallback. It also says 'never the number or category alone' yet shows number plus category as an example, and it never says the caption must differ from the labels around it. So agents reach for the category even when the item has better data. The reference's thumbnails never echo their own headline (p1 changelog cards).
