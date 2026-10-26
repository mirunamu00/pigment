# morning-shapes@0.1.0-rc.3 — evaluation 1

Verdict: **pass** · 2026-10-26T15:38:38.783Z

## blog (20261026-151918)

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

## commerce (20261026-151918)

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

## dashboard (20261026-151918)

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

## settings (20261026-151918)

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

- blog 20261026-151918 / mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- blog 20261026-151918 /posts/shipping-a-design-system mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- blog 20261026-151918 /posts/release-notes-people-read mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- blog 20261026-151918 /about mobile: uneven-row — a.ms-pill "Subscribe" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-151918 / mobile: uneven-row — a.ms-pill [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-151918 /products/canvas-field-tote mobile: uneven-row — a.ms-pill [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-151918 /products/merino-crew-sweater mobile: uneven-row — a.ms-pill [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px
- commerce 20261026-151918 /cart mobile: uneven-row — a.ms-pill [cart-button] "Cart0" next to button.ms-pill: tops differ 4px, bottoms 4px

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | below (reported) | 0.688 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 3.12 | reported |
| reference-output-palette-distance | pass | 4.48 | reported |
| reference-fontSize-overlap | pass | 0.751 | reported |
| reference-radius-overlap | pass | 0.275 | reported |
| reference-spacing-overlap | pass | 0.903 | reported |

Review: complete, 141 of 141 checklist items covered by 9 reviewer(s) in 3 min

## Quality against the reference

| Area | Score | Bar |
| --- | --- | --- |
| referenceFidelity | 4 | 4 |
| signature | 4 | 4 |
| crossAppConsistency | 4 | 3 |
| hierarchy | 4 | 3 |
| spacingRhythm | 4 | 3 |
| componentStates | 3 | 3 |
| polish | 4 | 3 |

> Review: 141/141 checklist items by 8 reviewer(s) and a lead reviewer (showcase/runs/morning-shapes/0.1.0-rc.3/review-1).
> Across all four apps this clearly reads as the reference's family: sunny flat fields with sagging arcs, ink pills on their ledge with the white dot, crescent-shaded flat pictograms in category hues, cream tone-on-tone panels, and a convincing navy and indigo night palette. rc.2's ballooning phone bands and fake cart are fixed, and the clusters now vary by area.
> What still separates it from the reference's own work is scale and boldness at the signature moments. Header-band art is a small sticker, not a scene that balances the headline. Stat figures and plan prices sit at 32px where the reference lets one huge number speak, and plan cards are bordered. All three trace back to the spec's own recipe values (SVG sized by height, `font.size.h3` stat number, 2px plan-card border), so they need prompt fixes, not just another run.
> Outcome states (save, subscribe, add to cart) are still timid inline ticks, and link focus is still square. These are agent-made and below the reference, but minor.

## Critic findings

| Kind | Severity | Area | Samples | Finding |
| --- | --- | --- | --- | --- |
| gap | major | signature | 1 of 1 | The header-band clusters are now varied and drawn to the recipe, with crescent shading, overlap and two sparkle sizes. On desktop, though, they are still a compact stamp about 250–300px wide on a 1440px band. That is roughly a fifth of the band, and a wide stretch of empty colour sits between the text and the art. The reference's hero art (02) is a layered scene about as wide as the text block, with a lead shape, a second shape cutting into it, a large star, a small sparkle and a cloud at the edge, and it balances the headline. The spec's own recipe causes this. The art box is 45% wide, but the SVG is sized by `height: 100%` and centred with `place-items: center`, and the sample viewBox is 240×200. In a header band about 250px tall the cluster is limited by height and can never reach the trailing 40–50% that the text asks for. The cluster also stays at 3 pieces, never 5, and both blog articles repeat one generic tilted-card-plus-disc cluster that pictures nothing about the area. |
| gap | major | hierarchy | 1 of 1 | Stat-tile figures are 32px and share the tile with a white plate of equal weight. On desktop the delta caption wraps and leaves its arrow hanging. In the reference's colour tiles (08), one huge bold number (about 64px) under a small eyebrow is the whole tile's message. This has been open since rc.2. The spec sets the size: it gives the stat number `font.size.h3` (32px) and allows a plate in every tile. |
| gap | major | referenceFidelity | 1 of 1 | Unselected billing plans are white boxes with a 2px grey border (lilac at night) and 32px prices beside a violet selected plan, so they read as a stock SaaS pricing grid. The reference never borders a card. It carries figures on borderless toned surfaces with big numbers. This has been open since rc.1. The spec writes the border in, which contradicts its own rule 9 that cards have no border. |
| gap | major | spacingRhythm | 1 of 1 | On phones, the article header band holds the whole text column to about 55% of the width, not just the line level with the 88px corner cluster. A long title breaks into six one- or two-word lines, and the band fills the entire first screen before the cover. The reference phone (04) runs its headline the full width and keeps the hero compact. The spec's CSS reserves the space on the first child only, so this is the agent's deviation, but nothing in the text says it in words. |
| gap | minor | componentStates | 1 of 1 | Successful saves and sign-ups are still a small tick and one line at the foot of a form, usually below the first screen. Add-to-cart puts its ink toast inline under the form, below the desktop fold. The spec's floating ink pill toast with a sparkle is unused, so outcomes are easy to miss, where the reference states them confidently. |
| gap | minor | componentStates | 1 of 1 | Top-bar text links get a flush square focus box, or none in commerce light, while pills and circles get the reference's rounded ring offset 2px (11). Clickable table rows show no hover tone, even though the spec specifies `color.surface.subtle`. Both have been open since rc.2. |
| gap | minor | signature | 1 of 1 | On product detail pages, the option rows are thin-bordered radio boxes, each with an arbitrary glyph (zigzag, ring, dots, spiral) that has nothing to do with its label. The reference picks each row's glyph to mean its label (05). The no-results empty state's only art is a 48px ring glyph, not the `size.art` composition the spec offers. Spot-plate pictograms fill only about half their plate. |
| gap | minor | hierarchy | 1 of 1 | On the about page, the blue header band and a large yellow vignette panel share the first screen, which breaks the one-field-per-viewport rule. The vignette's cards barely overlap, so it reads looser than the reference's single tight scene (01). |
| gap | minor | spacingRhythm | 1 of 1 | On phones, dashboard and settings compact header bands leave about 90px of empty field below the lead before the arc, so the band takes about a third of the first screen. The reference phone hero (04) is tighter. |
| defect (agent, not counted) | minor | polish | 1 of 1 | These are agent layout slips with no spec rule behind them. In dark mode the footer's bottom bar turns into a bright white strip. On phones the footer email field collapses to a sliver. The settings section strip opens scrolled so the active last pill is out of view, and a focus ring is cut off at the screen edge. The wrapped choice tiles' radio circle sits on the tile border. |
