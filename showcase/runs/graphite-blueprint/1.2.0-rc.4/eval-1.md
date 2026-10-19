# graphite-blueprint@1.2.0-rc.4 — evaluation 1

Verdict: **pass** · 2026-10-19T04:52:17.136Z

Agent spend: this candidate $21 · family $82 over 16 runs

## blog (20261019-035003)

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

## commerce (20261019-035003)

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

## dashboard (20261019-035003)

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

## settings (20261019-035003)

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

- commerce 20261019-035003 / desktop: repeated-drawing — svg.spec-figure [product-image] the same drawing appears 2 times on the page
- commerce 20261019-035003 / mobile: repeated-drawing — svg.spec-figure [product-image] the same drawing appears 2 times on the page

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.969 | 0.75 |
| type-consistency | pass | 0.855 | 0.7 |
| reference-palette-distance | pass | 0.18 | reported |
| reference-output-palette-distance | pass | 4.77 | reported |
| reference-fontSize-overlap | pass | 0.919 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.93 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| minor | signature | 1 of 1 | On the blog, the post plate captions use a section count as their attribute ('FIG 02 · 3 PARTS', 'FIG 03 · 2 PARTS', and so on). It is a real fact that the card does not show, so it follows the Spec plate rule. But five of the seven cards read '2 PARTS', so the caption barely tells the posts apart. The store's captions ('18 OZ', '22 L', '240 GSM') show how much more a caption can carry. |
