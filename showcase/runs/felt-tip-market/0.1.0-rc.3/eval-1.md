# felt-tip-market@0.1.0-rc.3 — evaluation 1

Verdict: **fail** · 2026-10-25T03:39:39.176Z

Agent spend: this candidate $21 · family $108 over 22 runs

## blog (20261025-031927)

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

## commerce (20261025-031927)

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

## dashboard (20261025-031927)

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

## settings (20261025-031927)

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

- blog 20261025-031927 / desktop: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- blog 20261025-031927 / desktop: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- blog 20261025-031927 / mobile: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- blog 20261025-031927 / mobile: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- commerce 20261025-031927 / desktop: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- commerce 20261025-031927 / desktop: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- commerce 20261025-031927 / mobile: double-rule — span.ft-plate a line of span.ft-plate runs 0px from its own
- commerce 20261025-031927 / mobile: double-rule — span.ft-plate a line of a.ft-btn runs 0px from its own
- commerce 20261025-031927 /cart desktop: double-rule — span.ft-plate [cart-empty] a line of span.ft-plate runs 0px from its own
- commerce 20261025-031927 /cart desktop: double-rule — span.ft-plate [cart-empty] a line of a.ft-btn runs 0px from its own
- commerce 20261025-031927 /cart mobile: double-rule — span.ft-plate [cart-empty] a line of span.ft-plate runs 0px from its own
- commerce 20261025-031927 /cart mobile: double-rule — span.ft-plate [cart-empty] a line of a.ft-btn runs 0px from its own

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 1 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 1.42 | reported |
| reference-output-palette-distance | pass | 5.91 | reported |
| reference-fontSize-overlap | pass | 0.642 | reported |
| reference-radius-overlap | pass | 0.428 | reported |
| reference-spacing-overlap | pass | 0.729 | reported |

Review: complete, 135 of 135 checklist items covered by 9 reviewer(s) in 4 min

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

> Review: 135/135 checklist items by 8 reviewer(s) and a lead reviewer (showcase/runs/felt-tip-market/0.1.0-rc.3/review-1).
> This is clearly the reference's language across all four apps, more than rc.2 was. Lemon and periwinkle bands closed by ink seams, the black current pill and full-height CTA block, ink-hairline tables and option cards, dashed empty states with their own sticker, and a faithful dark inversion all read as one family. The hero sticker rings now have real scale and edge cropping.
> What keeps it from the reference's craft is how the drawings and the hero are built. The largest objects (product media, flat-paper hero stickers) are still flat line drawings with a sliver of edge where the reference has chunky die-cut coins. Every hero ends in a small lone pink button instead of the heavy CTA-plus-input pair. Those two keep the signature at 3.
> Dark mode seams and overlay shadows, the quiet success states and loud per-row flags are minor. The phone overflow slips are the agents' own errors and do not count against the scores.

## Critic findings

| Kind | Severity | Area | Samples | Finding |
| --- | --- | --- | --- | --- |
| gap | major | signature | 1 of 1 | Large drawings still read as flat outlines. On the item page the main drawing has a back strip only a few pixels deep, or its depth shows as a second hem line. In the heroes, objects that are thin in real life (notepad, envelope, clipboard) have a side strip of about 3–5% of their height. The reference's objects are chunky die-cuts with a deep solid rim at every size, and that weight is what makes them hold their own against the headline. Boxy and round nouns (button, jar, clock, ticket, folder, badge) now meet the recipe, so the gap has narrowed but is still open on the largest and flattest objects. The spec already says 'at least 10%' and 'measure before you finish', and agents still miss it on irregular and flat shapes. |
| gap | major | signature | 1 of 1 | Every front-page hero anchors its action with one compact pink button, about 48px tall. The reference sets a large block CTA next to a bordered input of the same height under the 96px headline, and that pair gives the hero its weight. The spec asks for 'plate-stack CTA + bordered input' in the hero row. No app followed it, so the hero rows look light and generic beside a strong sticker ring. |
| gap | minor | polish | 1 of 1 | Data tables put a pink price flag in every row, including on a plain count column, so a column of 6–8 flags becomes the loudest thing on the screen. The reference spends pink on a few accents and lets the ink-and-paper table carry the screen. The spec leads agents here with 'one amount cell per table row'. |
| gap | minor | componentStates | 1 of 1 | Success states are quieter than the errors next to them. Saving a profile shows only a small outline pill with an 8px dot, which nearly disappears in dark. The subscribe confirmation is a word badge loose on the black footer, and its slab is lost against the black. The reference draws outcomes as framed, picked-up ink panels. |
| gap | minor | componentStates | 1 of 1 | Disabled stepper buttons are a grey-filled box in light mode, and the selected option on the buy panel is marked with a radio dot rather than a check disc. Both read as browser-default UI next to the reference's white, hairline controls. The spec's disabled rows prescribe a 'color.surface.subtle fill', which puts agents on this path. |
| gap | minor | spacingRhythm | 1 of 1 | On desktop, product header bands are sized to their sticker, not their content, so a 100–150px empty strip of band colour sits under the title. The reference's header band is compact and full (search, pills, breadcrumb). Elsewhere, the password form leaves half its panel empty, and the phone catalog filters wrap into loose rows instead of the reference's ruled stack. |
| gap | minor | polish | 1 of 1 | Dark mode loses some ink edges. Colour bands on blog and product pages meet the black ground with no seam. The account menu's light offset shadow vanishes over the lemon band, so the menu looks pasted on. The reference closes every field with a visible seam and keeps overlays visibly picked up. |
| gap | minor | referenceFidelity | 1 of 1 | Settings pages end on the ground with no black footer, so the settings app is the one member of the family without the closing black field that balances the colour band at the top, as the reference does on every page. Smaller off-system marks: article code blocks are grey boxes with grey borders, and a search clear glyph is still browser blue. |
| gap | minor | hierarchy | 1 of 1 | On phones, the article header band's breadcrumb wraps and repeats the full title right above the large title, so the band says the title twice and grows tall. The reference keeps its breadcrumb to one short line. |
| defect (agent, not counted) | minor | polish | 1 of 1 | Phone overflow slips: data and invoice tables cut their second or amount column mid-word at the frame with no scroll cue, and the section or nav pill rows run past the screen edge. The spec asks for a sticky column or a ruled list, so these are the agent's own errors. |
| defect (agent, not counted) | minor | polish | 1 of 1 | At rest, the empty cart's plate-stack CTA shows a strip of the lemon plate above the button, and the account address in the menu header breaks mid-word. Neither comes from the spec: the given plate CSS stacks the plates behind the button. |

## Reasons

- critic quality: signature 3 (needs 4)
