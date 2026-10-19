# hardlift@0.1.0-rc.6 — evaluation 3

Verdict: **pass** · 2026-10-19T23:14:08.513Z

Agent spend: this candidate $60 · family $186 over 44 runs

## docs (20261019-222324-s1)

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

## landing (20261019-222324-s1)

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

- docs 20261019-222324-s1 /docs/guides/configuration mobile: double-rule — code.inline-code [doc-paragraph] "ferrule run --watch" a line of kbd.kbd runs 2px from its own
- docs 20261019-222324-s1 /docs/guides/configuration mobile: double-rule — kbd.kbd [kbd] "r" a line of kbd.kbd runs 1px from its own
- docs 20261019-222324-s1 /changelog mobile: double-rule — code.inline-code [change-item] "ferrule.config.json" a line of code.inline-code runs 2px from its own
- docs 20261019-222324-s1 /changelog mobile: double-rule — code.inline-code [change-item] "ferrule migrate" a line of code.inline-code runs 2px from its own
- landing 20261019-222324-s1 / mobile: clipped-text — li.logo-item [logo-item] "Copperfield Schools" text runs 7px past div.tagwall-viewport, which hides overflow

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| reference-palette-distance | pass | 0.92 | reported |

Review: complete, 76 of 76 checklist items covered by 5 reviewer(s) in 2 min

## Severity overrides

- major → minor: At phone width, when a table reflows into stacked label/value blocks, inline code inside a value cell becomes a separate grid item. The code chip and the rest of the sentence drop into the label column on their own lines, so descriptions break apart ('Named sets of overrides, selected with' / '--profile' / '.', 'Set to' / 'false' / 'for tasks…'). The text is all there, but it no longer reads as one sentence in the value column. The spec's reflow rule says each other cell becomes one label/value line, but it never says that the value keeps its inline content in one text flow. — Owner decision to release with this known flaw: the holdout reviewer graded it major, the owner accepted it (2026-10-19T23:23:26.039Z)

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| minor (spec) | polish | 1 of 1 | At phone width, when a table reflows into stacked label/value blocks, inline code inside a value cell becomes a separate grid item. The code chip and the rest of the sentence drop into the label column on their own lines, so descriptions break apart ('Named sets of overrides, selected with' / '--profile' / '.', 'Set to' / 'false' / 'for tasks…'). The text is all there, but it no longer reads as one sentence in the value column. The spec's reflow rule says each other cell becomes one label/value line, but it never says that the value keeps its inline content in one text flow. |
| minor (spec) | componentStates | 1 of 1 | At phone width the plan-comparison table (a feature column plus three plan columns) scrolls sideways inside its bordered box instead of reflowing. The third column header is cut part-way at the right edge and the last plan column is out of view. The spec allows this for a read-only table of three or four short columns and uses the cut column as the scroll cue, so the agent followed it. For a comparison of options the cue is weak, because the top plan's column is the one that ends up hidden. Graded minor: the content can be reached by scrolling inside the box, the page does not scroll sideways, and the spec was followed. |
| minor | spacingRhythm | 1 of 1 | On desktop the single featured quote card fills only the left half of the container. It sits under a full-width band and above a full-width grid, so the section looks stranded with a large empty area on the right. |
