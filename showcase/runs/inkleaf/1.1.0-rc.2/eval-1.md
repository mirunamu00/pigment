# inkleaf@1.1.0-rc.2 — evaluation 1

Verdict: **fail** · 2026-10-19T02:18:58.985Z

Agent spend: this candidate $25 · family $49 over 8 runs

## blog (20261019-013539)

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

## commerce (20261019-013539)

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

## dashboard (20261019-013539)

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

## settings (20261019-013539)

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

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.854 | 0.75 |
| type-consistency | pass | 0.811 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 4.24 | reported |
| reference-fontSize-overlap | pass | 0.642 | reported |
| reference-radius-overlap | pass | 0.85 | reported |
| reference-spacing-overlap | pass | 0.838 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | signature | 1 of 1 | Regression from 1.0.0. Long-form listing cards lost their plates. In 1.0.0 (and in 1.1.0-rc.1) every post card on the home grid and under 'Related posts' had a plate with the post's own drawing. In this sample both grids are text-only cards, so the listing pages carry only one featured stage and a header drawing. The agent reports why: 'The data has no images, so there was nothing missing to replace with a drawing.' The spec allows that reading. The Imagery rule now begins 'Missing images: first ask what the image is for' and only applies when an image is missing. The Card grid row ('plates with photos or the item's own drawing, one per card') and the Long-form row ('plates') do not say whether a card whose data has no image field counts as missing one. The reference does use text-only resource cards (p3 'Get the technical rundown', p6 'Technical resources'), so this is not off-reference. It is still clearly less of the system's signature than the published version showed on the same kind of screen. |
| minor | signature | 1 of 1 | Two drawings fail the one-word test. The sweater plate, reused on its detail stage, is a folded slab with a neckline arc, held from below. It reads as a box or a clutch, not a sweater (1.0.0 drew a whole sweater). The article header's reading glasses, temples raised, read as the letters '6d'. The reference's small objects read at once. |
| minor | signature | 1 of 1 | The inventory-board ghosted preview is one short row of six tiles inside a thin raised card. It fills about a fifth of the stage's height, so the lilac media stage reads mostly empty. The release-notes comparison figure fills its stage properly. |

## Reasons

- critic major (1 of 1, spec): Regression from 1.0.0. Long-form listing cards lost their plates. In 1.0.0 (and in 1.1.0-rc.1) every post card on the home grid and under 'Related posts' had a plate with the post's own drawing. In this sample both grids are text-only cards, so the listing pages carry only one featured stage and a header drawing. The agent reports why: 'The data has no images, so there was nothing missing to replace with a drawing.' The spec allows that reading. The Imagery rule now begins 'Missing images: first ask what the image is for' and only applies when an image is missing. The Card grid row ('plates with photos or the item's own drawing, one per card') and the Long-form row ('plates') do not say whether a card whose data has no image field counts as missing one. The reference does use text-only resource cards (p3 'Get the technical rundown', p6 'Technical resources'), so this is not off-reference. It is still clearly less of the system's signature than the published version showed on the same kind of screen.
