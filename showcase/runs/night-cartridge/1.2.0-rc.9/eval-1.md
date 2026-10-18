# night-cartridge@1.2.0-rc.9 — evaluation 1

Verdict: **pass** · 2026-10-18T11:59:14.270Z

Agent spend: this candidate $36 · family $453 over 55 runs

## blog (20261018-112309)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 0.999 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261018-112309)

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

## dashboard (20261018-112309)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 10 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 0.997 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261018-112309)

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
| palette-consistency | pass | 0.938 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 2.51 | reported |
| reference-fontSize-overlap | pass | 0.783 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.87 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| minor (spec) | spacingRhythm | 1 of 1 | The overview chart's plot is about 415px tall at 1440, well past the 240px `size.chart` cap. The agent grew the plot so the chart panel ends level with Recent activity, because the tests fix the activity list at 5 items and it cannot be trimmed (dashboard agent-report.md, 'Chart height'). The spec offers only two ways to level side-by-side panels: grow the shorter up to the cap, or trim the longer. When neither works, it gives no third option, so the spec's wording contributes. rc.8 solved the same case with a totals row under the plot (Total / Peak / Average) and kept the plot near 240px. Published 1.1.0 also had a tall plot (about 340px, in full-strength cyan). The rc.9 bars are mixed down to muted teal, so they do not outweigh the 48px KPIs. The KPIs still read first. That makes this a weaker detail rather than a hierarchy break, and not worse than published. A general rule would close it: when the longer panel cannot be trimmed, fill the shorter one with a summary row or caption, never past `size.chart`. |
| minor | signature | 1 of 1 | The tote is back to one squared hollow arch over a box. Step 5's name test lists this outline as a usual cause of misreading. At 1x in the grid it reads as a generic shopping-bag icon or a padlock, and at detail size it reads as a padlock more than a canvas tote. It is still better than published 1.1.0, which had a narrow shackle over a small box: the handle now spans about 43% of the width, and the body is wide with a pocket. But it loses rc.8's two separate handle loops. The duffel (two square loops on a low box) and the tote still differ in outline, so set-mates are told apart. |
| minor | signature | 1 of 1 | In the blog hero, the left half of the near ground is outlined by a continuous 1-unit teal line that drops into square notches at regular intervals. It reads as a pipe, a circuit trace or a battlement rather than terrain. The reference's hill edge is an irregular lit grass line with tufts, not a geometric outline (reference p1-i1.png). The rise under the lead and the diagonal path are fine. |
