# night-cartridge@1.3.0-rc.2 — evaluation 1

Verdict: **fail** · 2026-10-19T02:40:00.633Z

Agent spend: this candidate $29 · family $60 over 8 runs

## blog (20261019-020124)

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

## commerce (20261019-020124)

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

## dashboard (20261019-020124)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 0.998 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261019-020124)

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
| palette-consistency | pass | 0.938 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 2.51 | reported |
| reference-fontSize-overlap | pass | 0.772 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.888 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | signature | 1 of 1 | The two garment sprites lost the outline that names them, which is worse than the published version. The sweater is a bell-shaped trapezoid: its sleeves hang down along the body and show only as small cuffs at the hem, so at 1x it reads as a dress or a sack. The detail page makes this plainer at full size. The coat is two upright slabs with short cuff stubs at the bottom and reads as a vest or a pair of columns. In the published version (1.2.0-rc.9 s2) and in rc.1, both garments had sleeves leaving the shoulders at an angle and read at once. The step-1 wording technically allows what was drawn: an arm that runs down beside the body and flares 1 unit at the cuff meets 'angles away, 1 unit out every 1–3 rows, far end 2+ units from the centre line'. Only the subjective name test (step 5) could catch it, and it has no concrete criterion. The tee, which has room for its sleeves, kept them spread. |
| minor | signature | 1 of 1 | The towels sprite is a box with a loop on top and a folded edge. In the same grid it reads as a shopping bag and sits close to the tote (box plus top handle), against the set-mates step that applies to items in one grid. |
| minor | hierarchy | 1 of 1 | The blog hero's only action ('Read the featured post') is an outlined secondary button. The page's gold commit is the footer Subscribe. The reference hero carries its gold primary inside the hero window, so the first screen here has no strong call to action. |

## Reasons

- critic major (1 of 1, spec): The two garment sprites lost the outline that names them, which is worse than the published version. The sweater is a bell-shaped trapezoid: its sleeves hang down along the body and show only as small cuffs at the hem, so at 1x it reads as a dress or a sack. The detail page makes this plainer at full size. The coat is two upright slabs with short cuff stubs at the bottom and reads as a vest or a pair of columns. In the published version (1.2.0-rc.9 s2) and in rc.1, both garments had sleeves leaving the shoulders at an angle and read at once. The step-1 wording technically allows what was drawn: an arm that runs down beside the body and flares 1 unit at the cuff meets 'angles away, 1 unit out every 1–3 rows, far end 2+ units from the centre line'. Only the subjective name test (step 5) could catch it, and it has no concrete criterion. The tee, which has room for its sleeves, kept them spread.
