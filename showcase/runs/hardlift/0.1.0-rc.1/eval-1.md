# hardlift@0.1.0-rc.1 — evaluation 1

Verdict: **fail** · 2026-10-19T12:30:30.567Z

Agent spend: this candidate $16 · family $16 over 4 runs

## blog (20261019-121214)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | **FAIL** | 1 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261019-121214)

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

## dashboard (20261019-121214)

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

## settings (20261019-121214)

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

- blog 20261019-121214 / mobile: clipped-text — span "Writing" text runs 53px past div.tagwall-strip, which hides overflow
- commerce 20261019-121214 / desktop: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 3 times on the page
- commerce 20261019-121214 / desktop: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 3 times on the page
- commerce 20261019-121214 / desktop: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 3 times on the page
- commerce 20261019-121214 / desktop: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 2 times on the page
- commerce 20261019-121214 / mobile: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 3 times on the page
- commerce 20261019-121214 / mobile: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 3 times on the page
- commerce 20261019-121214 / mobile: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 3 times on the page
- commerce 20261019-121214 / mobile: repeated-drawing — svg.product-image-glyph [product-image] the same drawing appears 2 times on the page
- dashboard 20261019-121214 / mobile: clipped-text — text.chart-value [chart-bar] "186" text runs 2px past svg.chart-svg, which hides overflow

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.853 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0.92 | reported |
| reference-output-palette-distance | pass | 5.64 | reported |
| reference-fontSize-overlap | pass | 0.928 | reported |
| reference-radius-overlap | pass | 0.241 | reported |
| reference-spacing-overlap | pass | 0.825 | reported |

## Reasons

- blog: accessibility = 1 (needs 0)
