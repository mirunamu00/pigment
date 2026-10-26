# morning-shapes@0.1.0-rc.3 — evaluation 3

Verdict: **fail** · 2026-10-26T16:54:17.754Z

## docs (20261026-154535-s1)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 16 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## landing (20261026-154535-s1)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 15 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## Measured layout (reported, for the critic)

- landing 20261026-154535-s1 / desktop: repeated-drawing — svg.ms-arch [cta-band] the same drawing appears 2 times on the page
- landing 20261026-154535-s1 / mobile: uneven-row — a.ms-pill [header-signup] "Sign up" next to button.ms-pill [menu-toggle] "Menu": tops differ 4px, bottoms 4px
- landing 20261026-154535-s1 /pricing desktop: repeated-drawing — svg.ms-arch [cta-band] the same drawing appears 2 times on the page
- landing 20261026-154535-s1 /pricing mobile: uneven-row — a.ms-pill [header-signup] "Sign up" next to button.ms-pill [menu-toggle] "Menu": tops differ 4px, bottoms 4px
- landing 20261026-154535-s1 /customers desktop: repeated-drawing — svg.ms-arch [cta-band] the same drawing appears 2 times on the page
- landing 20261026-154535-s1 /customers mobile: uneven-row — a.ms-pill [header-signup] "Sign up" next to button.ms-pill [menu-toggle] "Menu": tops differ 4px, bottoms 4px
- landing 20261026-154535-s1 /signup mobile: uneven-row — a.ms-pill [header-signup] "Sign up" next to button.ms-pill [menu-toggle] "Menu": tops differ 4px, bottoms 4px

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| reference-palette-distance | pass | 3.12 | reported |

Review: complete, 78 of 78 checklist items covered by 5 reviewer(s) in 4 min

## Quality against the reference

| Area | Score | Bar |
| --- | --- | --- |
| referenceFidelity | 4 | 4 |
| signature | 3 | 4 |
| crossAppConsistency | 4 | 3 |
| hierarchy | 4 | 3 |
| spacingRhythm | 4 | 3 |
| componentStates | 4 | 3 |
| polish | 4 | 3 |

> Review: 78/78 checklist items by 4 reviewer(s) and a lead reviewer (showcase/runs/morning-shapes/0.1.0-rc.3/review-3-holdout).
> On both new products the language carries clearly. Yolk bands with sagging arcs, 64px tight headlines, blue and white pills on their ledges, ink pills with the white dot, cream panels, confetti headings and a convincing navy night palette make the two apps read as one family. The landing hero vignette is as good as the reference's 01/02.
> The system's most recognisable moment, the header-band scene, falls back on inner pages to a small two-to-three-piece sticker. It is often copied from the spec's one sample and rarely pictures its page, so the signature misses the bar.
> Pricing is the weakest screen. Its bordered stock-SaaS plan cards come straight from the spec, and the purple night band muddies the selected plan. Together with the white footer bar at night, these spec-caused gaps are what keep the result below the reference's craft.

## Critic findings

| Kind | Severity | Area | Samples | Finding |
| --- | --- | --- | --- | --- |
| gap | major | signature | 1 of 1 | Header-band art is still a small sticker on both new products. On desktop it is a two-to-three-piece cluster about 230–310px wide, roughly a fifth of the band, with a wide empty stretch of colour between the text and the art. It almost never pictures the page's subject. The sign-up band copies the spec's one sample nearly piece for piece: a violet hexagon, an overlapping orange pill, a large yellow star and a small pink sparkle. The pricing and docs inner-page clusters reuse its layout with a disc as the lead shape. The reference's hero (02) is a layered scene about as wide as the headline block that balances it. This gap was named in rc.3 reviews 1 and 2 and is unchanged on products the system was never tuned on. The landing front page shows what is possible: its hero is a product vignette with overlapping cards and confetti, and it reaches the reference's bar. |
| gap | major | referenceFidelity | 1 of 1 | The pricing plan cards are white boxes with 2px grey borders (lilac at night) and mid-size prices, set beside one violet selected plan, so the page reads as a stock SaaS pricing grid. The reference never borders a card. It carries figures on borderless tone-on-tone fields where one big bold number dominates (08). The spec writes the border into the plan card, against its own no-border card rule. This has been open since rc.1 and now shows on a new product. |
| gap | major | hierarchy | 1 of 1 | In the dark appearance the pricing night band turns purple, and the selected plan is violet on top of it, so the plan the page is selling barely separates from its ground. The bordered indigo plans beside it make the first screen muddy. In the reference's night palette (03), a deep navy ground lets one bright panel, knob or pill carry the eye. |
| gap | minor | signature | 1 of 1 | The no-results search state uses three yellow dots as its only art. That is the system's loading glyph, so 'nothing found' reads as 'still loading'. The state also offers no next step. The reference states outcomes with a pictogram of the subject (07). |
| defect (agent, not counted) | minor | polish | 1 of 1 | In dark mode every page on both products ends in a bright white bottom bar under the indigo footer. It is the one light element at night. The spec puts the bar on `surface.inverse`, which is white in the dark table. The reference's night band (03) stays dark to the edge. Named in rc.3 review 2 and still open. |
| gap | minor | hierarchy | 1 of 1 | The landing front page's stat row is three short, wide strips with figures of about 24px, so no number dominates. The reference's colour tiles (08) are tall saturated fields, each carried by one big bold number under a small eyebrow. The spec sets the stat number at h3. |
| gap | minor | signature | 1 of 1 | Small glyphs are often chosen without meaning or drawn too small for their plate. The docs page-foot controls (feedback, previous/next) carry a ring, a zigzag and bubbles unrelated to their labels, and they repeat on every page in a new hue. The pictograms on the customer-category covers fill only about a quarter of each cover, so the covers read as empty colour blocks. The sign-up success screen pairs an envelope with an unrelated floating moon. The reference chooses each glyph for its row and fills its plates (05, 07). |
| gap | minor | spacingRhythm | 1 of 1 | On phones, hero bands run long. The docs front page stacks its art as its own row under the pills, so the yellow band fills the whole first screen. Sign-up and customers leave about 150px of white below the arc before the content. The reference phone (04) keeps the band compact and tucks the art at the edge. |
| gap | minor | componentStates | 1 of 1 | Keyboard focus on text links (the wordmark, top-bar links) is a flush, square-cornered box that looks like the browser default. Pills get the reference's rounded ring offset by 2px (11). Open since rc.2. |
| defect (agent, not counted) | minor | polish | 1 of 1 | Reveal-on-view content never appears in some full-page captures. On the landing front page the features grid is left blank, the testimonials row is empty in dark, and one card of the hero vignette sits near zero opacity. This comes from the agent's observer and timing; the spec says content must be complete without the runtime class. |
| defect (agent, not counted) | minor | polish | 1 of 1 | On phones the docs breadcrumb is squeezed beside the band's corner cluster and wraps, leaving a separator and the current page alone on a second line. In the changelog, change-type tags size to their labels, so the entry text after them starts at a different indent on each line. |

## Reasons

- critic quality: signature 3 (needs 4)
