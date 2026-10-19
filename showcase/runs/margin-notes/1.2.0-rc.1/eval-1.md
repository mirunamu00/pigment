# margin-notes@1.2.0-rc.1 — evaluation 1

Verdict: **pass** · 2026-10-18T23:16:12.715Z

Agent spend: this candidate $17 · family $17 over 4 runs

## blog (20261018-225518)

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

## commerce (20261018-225518)

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

## dashboard (20261018-225518)

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

## settings (20261018-225518)

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
| palette-consistency | pass | 0.896 | 0.75 |
| type-consistency | pass | 0.917 | 0.7 |
| reference-palette-distance | pass | 0 | reported |
| reference-output-palette-distance | pass | 0.37 | reported |
| reference-fontSize-overlap | pass | 0.898 | reported |
| reference-radius-overlap | pass | 0.764 | reported |
| reference-spacing-overlap | pass | 0.931 | reported |

## Critic findings

| Severity | Area | Samples | Finding |
| --- | --- | --- | --- |
| minor | polish | 1 of 1 | In the article's code block the <code> element inside <pre class="code-block"> keeps the browser's default 'monospace' family (Courier-like serif mono), because the mono family is set on the <pre> but the UA rule on <code> overrides inheritance. styles.json records a bare 'monospace' family at 2.68% of text, which no earlier margin-notes run has. The font gate passes only because 'monospace' counts as a fallback. The reference's code panels use the template mono throughout. |
| minor | spacingRhythm | 1 of 1 | On the record-detail screen the tab list sits about 8 to 10px under the meta line ('Internal Platform · Owned by …'), so the header has no bottom padding before the tabs and they read as attached to the meta. The spec asks for a space.40 bottom on the page header. The 1.0.0 sample of the same screen left a clear gap there. This is agent variance in an area the update did not touch, on one screen of one app. |
| minor | signature | 1 of 1 | On the dashboard overview the header's 'Refresh' button sits on the lower edge of the bloom, light and dark. In the reference the bloom sits beside or behind content cards and never under a control. Everywhere else the bloom stays in the empty right margin of the header band. |
