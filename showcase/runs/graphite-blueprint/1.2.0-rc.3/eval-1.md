# graphite-blueprint@1.2.0-rc.3 — evaluation 1

Verdict: **fail** · 2026-10-19T03:19:02.346Z

Agent spend: this candidate $20 · family $61 over 12 runs

## blog (20261019-023228)

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

## commerce (20261019-023228)

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

## dashboard (20261019-023228)

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

## settings (20261019-023228)

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

- commerce 20261019-023228 / desktop: repeated-drawing — svg [product-image] the same drawing appears 2 times on the page
- commerce 20261019-023228 / mobile: repeated-drawing — svg [product-image] the same drawing appears 2 times on the page

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 1 | 0.75 |
| type-consistency | pass | 0.75 | 0.7 |
| reference-palette-distance | pass | 0.18 | reported |
| reference-output-palette-distance | pass | 5.97 | reported |
| reference-fontSize-overlap | pass | 0.928 | reported |
| reference-radius-overlap | pass | 1 | reported |
| reference-spacing-overlap | pass | 0.939 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| major (spec) | signature | 1 of 1 | The page close lost its two-tone voice. On the blog home, about and article pages the close reads 'Subscribe to the newsletter': one sentence, all in the primary tone. A secondary line sits under it and wraps to two lines at 1440 ('Never more than / twice a month.'). Published 1.1.0 closed with a split two-tone statement ('New post? One email.'), rc.2 did too ('Follow along. By email.'), and so does the reference ('Built for the future. Available today.', p1-desktop-light.png). The dot field, mono label and centered form are still there, but the close is now a generic heading at display size, not the system's statement. That is worse than the published version, so it rates at least major. The spec allows it in two places. The Page close row asks for a 'two-tone statement'. Typography allows 'one or two short sentences, each one tone', so a single sentence is legally one tone. And 'never adds parts' let the agent keep the base heading copy unchanged (agent-report: 'styled as the page close: a centered large heading'). |
| minor | signature | 1 of 1 | On item detail, the plate caption repeats a fact that the details list beside it shows: 'FIG 01 · 18 OZ' next to '18 oz cotton canvas', and 'FIG 04 · 100% WOOL' next to '100% merino wool'. Signature 4 says to fall back to the kind name when every attribute is already visible nearby. rc.2 did ('FIG 01 · TOTE'). The grid cards use these captions correctly, because the cards do not show those details. It is a one-word caption detail, and published 1.1.0 repeated the category on its plates, so it is not worse than published. |
| minor | polish | 1 of 1 | Billing's third section ('03 / 03 Invoices') has no one-line description under its title. The two sections above it have one, and rc.2 had 'Issued on the first of each month.' here, so the section heads are uneven. |

## Reasons

- critic major (1 of 1, spec): The page close lost its two-tone voice. On the blog home, about and article pages the close reads 'Subscribe to the newsletter': one sentence, all in the primary tone. A secondary line sits under it and wraps to two lines at 1440 ('Never more than / twice a month.'). Published 1.1.0 closed with a split two-tone statement ('New post? One email.'), rc.2 did too ('Follow along. By email.'), and so does the reference ('Built for the future. Available today.', p1-desktop-light.png). The dot field, mono label and centered form are still there, but the close is now a generic heading at display size, not the system's statement. That is worse than the published version, so it rates at least major. The spec allows it in two places. The Page close row asks for a 'two-tone statement'. Typography allows 'one or two short sentences, each one tone', so a single sentence is legally one tone. And 'never adds parts' let the agent keep the base heading copy unchanged (agent-report: 'styled as the page close: a centered large heading').
