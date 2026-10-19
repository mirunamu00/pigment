# hardlift@0.1.0-rc.3 — evaluation 1

Verdict: **fail** · 2026-10-19T13:13:23.201Z

Agent spend: this candidate $16 · family $48 over 12 runs

## blog (20261019-125720)

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

## commerce (20261019-125720)

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

## dashboard (20261019-125720)

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

## settings (20261019-125720)

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
| palette-consistency | pass | 0.829 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0.92 | reported |
| reference-output-palette-distance | pass | 3.73 | reported |
| reference-fontSize-overlap | pass | 0.939 | reported |
| reference-radius-overlap | pass | 0.353 | reported |
| reference-spacing-overlap | pass | 0.862 | reported |

Review: complete, 129 of 129 checklist items covered by 9 reviewer(s) in 2 min

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major | componentStates | 1 of 1 | Linked product cards still don't lift on hover. The hovered card gets a pale fill on its text area only. It doesn't move -4px and gets no hard offset shadow, in light or dark, so it sits flush with the rest of the grid. The hard lift on linked cards is a signature element. This is unchanged since the previous round, even though the spec now has a 'Linked cards' paragraph and a verify step. |
| major (spec) | signature | 1 of 1 | The account-menu trigger is still solid pink while its menu is open, in light, dark and mobile. That makes a second loud pink element and breaks the one-pink-action rule. The spec bans a pink open-menu trigger, but its own ghost-button recipe ('.lift--ghost:hover fills pink') makes any ghost trigger turn pink while the pointer rests on it after the click. The Interaction table also has no open-trigger row. |
| minor (spec) | componentStates | 1 of 1 | The spec contradicts itself on selected checkboxes and switches. The Interaction table says a color.action.primary (pink) fill, while Color use and the Checkbox and Switch sections say an ink fill, never pink. This run drew ink switches, but another run could follow the table. |
| minor (spec) | componentStates | 1 of 1 | In light mode, the loading 'Refreshing...' button on the color band uses the disabled style: gray label on a pale-gray fill with a hairline border. It looks washed out against the band. The spec's disabled recipe conflicts with its own 'no disabled-looking text on a band' rule, and its loading recipe (same button, coin in place of the label) wasn't used. Dark mode stays readable. |
| minor | signature | 1 of 1 | On product detail pages the header shows no current-page pill. 'Shop' is plain text even though the page sits under the shop's band and breadcrumb, while the home and cart screens fill their own section's pill. |
| minor | signature | 1 of 1 | Two small drawings break from the sticker language. The about page's heading mark is a solid stock speech-bubble icon rather than an outline icon or an ink-outlined sticker. The sweater sticker has short sleeves and almost the same outline as the t-shirt sticker, so two items read as one drawing in two colors. |

## Reasons

- critic major (1 of 1): Linked product cards still don't lift on hover. The hovered card gets a pale fill on its text area only. It doesn't move -4px and gets no hard offset shadow, in light or dark, so it sits flush with the rest of the grid. The hard lift on linked cards is a signature element. This is unchanged since the previous round, even though the spec now has a 'Linked cards' paragraph and a verify step.
- critic major (1 of 1, spec): The account-menu trigger is still solid pink while its menu is open, in light, dark and mobile. That makes a second loud pink element and breaks the one-pink-action rule. The spec bans a pink open-menu trigger, but its own ghost-button recipe ('.lift--ghost:hover fills pink') makes any ghost trigger turn pink while the pointer rests on it after the click. The Interaction table also has no open-trigger row.
