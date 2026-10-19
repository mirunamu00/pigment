# inkleaf@1.1.0-rc.3 — evaluation 1

Verdict: **pass** · 2026-10-19T03:23:45.799Z

Agent spend: this candidate $27 · family $76 over 12 runs

## blog (20261019-025120)

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

## commerce (20261019-025120)

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

## dashboard (20261019-025120)

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

## settings (20261019-025120)

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

- blog 20261019-025120 /posts/release-notes-people-read desktop: repeated-drawing — svg.stage-lines [article] the same drawing appears 2 times on the page
- blog 20261019-025120 /posts/release-notes-people-read mobile: repeated-drawing — svg.stage-lines [article] the same drawing appears 2 times on the page

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.781 | 0.75 |
| type-consistency | pass | 0.811 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 4.24 | reported |
| reference-fontSize-overlap | pass | 0.601 | reported |
| reference-radius-overlap | pass | 0.802 | reported |
| reference-spacing-overlap | pass | 0.792 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| minor | spacingRhythm | 1 of 1 | On long-form pages the lead stage is narrower than the prose column under it. It ends about 100px short of the text's right edge, while the in-article figure stage further down does span the full column. The spec says the lead image or drawing 'spans the text column'. The gap is small, but it leaves the lead looking unaligned with the text below. |
| minor | signature | 1 of 1 | The key-ring plate is a large open ring with a long leather strap and a tiny key hanging off it. At card size it reads first as a magnifying glass, and the key is the smallest part. This is the misread the recipe's step 5 warns about ('an object drawn without its defining part read as another'). The reference's small objects read at once. |
| minor | polish | 1 of 1 | In the stacked invoice list at 390px, each status badge stretches to the full width of the value column, so 'Due' and 'Paid' read as bars. On desktop the same badges hug their text. |
| minor | hierarchy | 1 of 1 | One article section heading ('Lead with the / effect, not the cause') breaks onto two lines inside a wide column, with a short first line, while the other h2s on the page sit on one line. It looks like a narrow max-width or balance setting on that heading, and it breaks the steady rhythm of the section heads. |
