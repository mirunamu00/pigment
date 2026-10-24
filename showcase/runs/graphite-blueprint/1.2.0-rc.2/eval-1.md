# graphite-blueprint@1.2.0-rc.2 — evaluation 1

Verdict: **fail** · 2026-10-19T01:32:46.110Z

Agent spend: this candidate $20 · family $41 over 8 runs

## blog (20261019-011443)

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

## commerce (20261019-011443)

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

## dashboard (20261019-011443)

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

## settings (20261019-011443)

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

- commerce 20261019-011443 / desktop: repeated-drawing — svg [product-image] the same drawing appears 2 times on the page
- commerce 20261019-011443 / mobile: repeated-drawing — svg [product-image] the same drawing appears 2 times on the page

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 1 | 0.75 |
| type-consistency | pass | 0.82 | 0.7 |
| reference-palette-distance | pass | 0.18 | reported |
| reference-output-palette-distance | pass | 5.97 | reported |
| reference-fontSize-overlap | pass | 0.923 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.941 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major | spacingRhythm | 1 of 1 | Billing's blocks no longer share one right edge. The plan cards and the invoices table span the controls column (x 640 to 1312), but the saved payment card stops at x 1200, the form width, so a ragged edge runs down the screen. This goes against the spec ('Wide blocks inside a settings section (cards, grids, tables) span the controls column's full width'), and it is worse than published 1.1.0, where the same payment card spans the column like the blocks above and below it. The visible miss is small (112px), but the brief rates anything worse than the published version at least major, and with one sample it counts. The spec names the rule; the agent applied the form cap (`size.form`) to a single card instead. The spec does not say which blocks count as 'wide' versus form-width, so a one-row card reads as either. |
| minor (spec) | signature | 1 of 1 | On the article page, the in-body plate (FIG 0.1, perspective grid) shares its kind with the Related card for 'Writing Release Notes People Actually Read' (perspective grid, FIG 02), so the same figure type appears twice on one page. The spec rules out shared kinds only in a grid row or column and between adjacent list items. Published 1.1.0 also showed this, so it is not a regression. |
| minor | polish | 1 of 1 | The project detail's mono meta reads 'PROJECT 01 · APOLLO-MIGRATION', which repeats the h1 right below it as a slug. The meta label carries the record's kind and number but no new fact. |

## Reasons

- critic major (1 of 1): Billing's blocks no longer share one right edge. The plan cards and the invoices table span the controls column (x 640 to 1312), but the saved payment card stops at x 1200, the form width, so a ragged edge runs down the screen. This goes against the spec ('Wide blocks inside a settings section (cards, grids, tables) span the controls column's full width'), and it is worse than published 1.1.0, where the same payment card spans the column like the blocks above and below it. The visible miss is small (112px), but the brief rates anything worse than the published version at least major, and with one sample it counts. The spec names the rule; the agent applied the form cap (`size.form`) to a single card instead. The spec does not say which blocks count as 'wide' versus form-width, so a one-row card reads as either.
