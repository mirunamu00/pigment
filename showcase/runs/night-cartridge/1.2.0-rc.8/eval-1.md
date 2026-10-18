# night-cartridge@1.2.0-rc.8 — evaluation 1

Verdict: **fail** · 2026-10-18T11:11:27.928Z

Agent spend: this candidate $33 · family $417 over 51 runs

## blog (20261018-103529)

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

## commerce (20261018-103529)

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

## dashboard (20261018-103529)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 10 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 0.998 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261018-103529)

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

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.875 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 2.51 | reported |
| reference-fontSize-overlap | pass | 0.766 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.876 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | signature | 1 of 1 | Garment sprites are back to sleeves drawn as separate bars with a background gap down their whole length. The sweater and the coat are both a shoulder bar with two straight sleeves hanging from it and a gap of about 3 units between each sleeve and the body. At 1x they read as a gate or a table, not as clothing. They also share one silhouette and differ only in the coat's button column, so the two items in one category cannot be told apart by outline. Detached sleeves were one of the regressions this update was meant to fix: published 1.1.0 had them, and rc.6 and rc.7 had fixed them. The rc.8 rewrite of Imagery step 3 brings them back. It says that parts that 'hang free in the real object (sleeves beside a body, two legs, a handle loop) ... keep a 1-unit background gap along the rest of their length', and the agent followed it. Spec-caused, and worse than rc.7. For this item the update goal is not reached. |
| major (spec) | hierarchy | 1 of 1 | Product-card summaries are cut at 2 lines mid-phrase on the catalogue grid at 1440: 'Water-resistant backpack for commutes and short…', 'A two-night bag with a separate shoe…', 'A lightweight knit for layering in every…', 'A sturdy steel mug for coffee at home or…', 'A pre-seasoned pan that works on every heat…', 'A simple loop of vegetable-tanned…'. Published 1.1.0 shows them whole in 3 lines in the same 5-column cards, and rc.7 had fixed this. rc.8 is built on rc.6, whose Card rule still says 'at 2 lines in .tiles and product cards', so the regression comes back. Spec-caused, and worse than published. |
| minor | signature | 1 of 1 | The store detail banners are one per category, not one per item: 4 banners for 11 products. The agent says a unique scene for each product was not practical (commerce agent-report.md, Decisions). This goes against Pixel stage step 1 ('every ... detail or content page has its own lead sprite'). The reference does the same thing, though: one banner per category, shared by the category page and its articles (reference p7-i1.png and p4-i1.png show the same snowy Infra banner). So it is fidelity rather than a defect, and the spec is stricter than its source. The two captured detail pages are in different categories and show different leads. |
| minor | hierarchy | 1 of 1 | Empty-state titles render at body size ('No posts match these filters', 'No projects match your filters'), so the title barely outranks the hint line under the vignette. The same watch item was raised on rc.7. It now appears in both apps that have an empty result. |
| minor | signature | 1 of 1 | Two more catalogue sprites fail the name test at 1x. The key ring is a flat brown bar with a hole, which reads as a strap or a USB stick: no key, and nothing hangs from it. It is no longer a magnifier, so it is still better than published. The tea towels read as two cans or a thermos. |
| minor | signature | 1 of 1 | The settings strips use small slab and cross shapes (a teal rounded slab, a dark arched slab, upright crosses or signposts). At 1x they read as headstones and grave crosses, giving the 'civic street' strips a graveyard feel. On the Profile strip the moon is also cut in half by the right edge of the window. |
| minor | componentStates | 1 of 1 | The dashboard user menu opens with no option highlighted or marked, and no ▶ on 'Account settings'. The spec asks dropdowns to open with the first or current option focused and highlighted. |
| minor | spacingRhythm | 1 of 1 | In the Security 'Change password' window at 1440 the three fields are about 560px wide in a window about 1000px wide, which leaves a band about 400px wide empty to their right. The Profile form fills its window in two columns, so the two settings windows look inconsistent. |

## Reasons

- critic major (1 of 1, spec): Garment sprites are back to sleeves drawn as separate bars with a background gap down their whole length. The sweater and the coat are both a shoulder bar with two straight sleeves hanging from it and a gap of about 3 units between each sleeve and the body. At 1x they read as a gate or a table, not as clothing. They also share one silhouette and differ only in the coat's button column, so the two items in one category cannot be told apart by outline. Detached sleeves were one of the regressions this update was meant to fix: published 1.1.0 had them, and rc.6 and rc.7 had fixed them. The rc.8 rewrite of Imagery step 3 brings them back. It says that parts that 'hang free in the real object (sleeves beside a body, two legs, a handle loop) ... keep a 1-unit background gap along the rest of their length', and the agent followed it. Spec-caused, and worse than rc.7. For this item the update goal is not reached.
- critic major (1 of 1, spec): Product-card summaries are cut at 2 lines mid-phrase on the catalogue grid at 1440: 'Water-resistant backpack for commutes and short…', 'A two-night bag with a separate shoe…', 'A lightweight knit for layering in every…', 'A sturdy steel mug for coffee at home or…', 'A pre-seasoned pan that works on every heat…', 'A simple loop of vegetable-tanned…'. Published 1.1.0 shows them whole in 3 lines in the same 5-column cards, and rc.7 had fixed this. rc.8 is built on rc.6, whose Card rule still says 'at 2 lines in .tiles and product cards', so the regression comes back. Spec-caused, and worse than published.
