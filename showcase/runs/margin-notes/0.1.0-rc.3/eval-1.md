# margin-notes@0.1.0-rc.3 — evaluation 1

Verdict: **fail** · 2026-10-12T13:20:39.004Z

## blog (20261012-122954)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261012-122954)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | **FAIL** | 9 passed, 1 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## dashboard (20261012-122954)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261012-122954)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 8 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.896 | 0.75 |
| type-consistency | pass | 0.9 | 0.7 |
| reference-palette-distance | pass | 0 | reported |

## Critic

```json
{
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 3.5,
  "polish": 3.5,
  "notes": [
    "Overall: a clear step up from rc.2 (avg 3.67 to 3.83). Every rc.2 layout blocker I checked is fixed. It still misses the bar (avg >= 4.0, nothing below 3). The new state captures show that the error states are well designed. They also show a set of weak or defaulted states: dark segmented selection, linked-card hover, a native search clear button, cramped nav focus rings, a top-pinned dialog, and a bare 'Saved' word. The hatch fix overshot, and placeholders are now the loudest pattern in commerce.",
    "rc.2 header-band dead space: FIXED. The lead-to-content gap is about 54-62px on blog home (lead y=223, FEATURED y=285), commerce home (filters y=277) and dashboard overview (KPIs y=277). The bloom stays in the band at the top right and leaves through the right edge.",
    "rc.2 invisible light hatch: FIXED, but it overshot. color.decor.hatch #c2bcb0 at 12px pitch reads clearly on every no-asset frame. On commerce home, though, 11 identical diagonal-striped 316x236 slabs are now the strongest texture on the page, louder than titles and prices. The 780x585 product frame is a wall of stripes. The reference hatch (p1 preview card) is barely there. It should read as paper texture, not a pattern.",
    "rc.2 mobile tables hiding status and actions: FIXED. Billing invoices and security sessions stack on mobile with status badges and full-width 44px Revoke buttons. Dashboard project rows stack and now show Due date, the active sort key. Team (no status or action column) scrolls, with a 'Scroll sideways' hint, an edge fade and a mid-cell cut. New small issue: on projects mobile the active sort chip 'Due date' is the one cut off at the right edge of the chip strip (only 'Du' is visible), so the selected state cannot be seen.",
    "rc.2 dark switch thumb and pinned lift: FIXED. On notifications dark the off thumb is a clearly visible grey disc on the track, and the on state is a paper track with a dark thumb. The Pro card on billing dark and the featured card on blog dark are now lifted, with a lighter fill and a ring.",
    "rc.2 heavy chart: FIXED. On dashboard overview the bars are about 28px with wide gaps. Past months are at chartRest opacity and only Oct is full ink, with mono caption labels. The chart no longer outweighs the KPIs. The current paper bar in dark is still bright but acceptable. Minor: the chart card (340px) is now 80px shorter than Recent activity, which leaves a visible dead strip under it.",
    "rc.2 mobile dashboard details: FIXED. Stat eyebrows ellipsize ('DEPLOYMENTS THI…') and the values share a baseline. Global search is in the menu sheet and no longer sits above the h1.",
    "rc.2 container width: FIXED. All four apps start content at x=40 at 1440. Settings uses the sidebar plus an 8-column form, aligned left.",
    "rc.2 code-block spacing: FIXED. Code blocks, figures and quotes in both articles get about 24px above and below.",
    "rc.2 empty-state alignment: FIXED. The cart empty panel sits on the h1's left edge, without studio details. The blog search-empty panel is left-aligned under the toolbar.",
    "rc.2 mono consistency: mostly FIXED. Table headers are sans everywhere (including billing 'Amount'). IDs, dates and amounts are mono, and '100% merino wool' monos only the digits. New side effect: rule 7 is applied to counts inside prose. 'Showing 0 of 6 posts' and 'Showing 0 of 8 projects' render a slashed mono zero in a sans sentence, which reads as a glitch.",
    "Reference fidelity: the light bloom (lavender-blue core, grey rim, grain), the tracked grotesk, ink buttons and chips, tape, Caveat notes with hooked arrows and the one serif word all read as the reference family without copying it. The dark bloom now has a ragged, pooled rim. It reads as smoky grey-blue paint rather than an out-of-focus glow, but it is still more smoke than watercolor. Bloom size is about a third of the reference p1 bloom. That is acceptable for an app header.",
    "Notes: all four arrows now land on their targets. Blog points at the featured card's right edge, commerce at the end of the lead, dashboard at 'October 2026.', and settings up at the nav list. But commerce's 'new this week' is text that nothing nearby says, which contradicts the recipe ('words that nearby text also carries'). The commerce agent flagged that the spec prescribes it anyway. The settings agent also had to override --note-x: calc(100% - 32px) because it runs into the content column.",
    "Hierarchy regressions: on dashboard /projects the h1 'Projects' is followed by the card title 'All projects', which is the repeat the spec forbids (rc.2 had fixed this). On billing the 'Current plan' marker is a 40px ink pill. That has the same mass as a primary button, and on a page with no primary action it reads as the main CTA for the plan you already own. On blog article mobile the TOC sits between the breadcrumb and the h1, about 4px under a two-line breadcrumb, and pushes the title down by about 150px.",
    "Spacing: half-empty cards remain. On security desktop the 400px password inputs sit in an 842px card. On Apollo Migration the spec rows stop at 784px inside a 1360px card. On settings profile mobile the form card has about 180px of empty space at the bottom, reserved for the save bar the agent made sticky inside the card. The 'This device' badge touches 'Chrome on Windows' with no gap (security desktop and mobile).",
    "Component states, judged on the new captures. Strong: the checkout and profile error states (danger callout at the top with a count, 16px alert icon plus message, danger borders, first invalid field focused with an ink ring), the password-mismatch state, the success callouts (newsletter, added to cart), the dashboard user menu (lifted sheet, hairline separator), row hover in both themes, focus rings on the sidebar item, the Search button and the filter field, the dark switch, and the disabled stepper minus.",
    "Component states, weak or defaulted. (1) Segmented selection in dark: the selected segment is color.surface.raised #1d1c18 on a #24231f track, darker than its tray, so 'All', 'S' and 'Natural' are nearly invisible (dashboard and projects dark, merino mobile dark). This is a spec gap: rule 9 inverts in dark. (2) Linked-card hover on commerce light: border.default to border.strong is about a 1.1:1 change and is effectively invisible. (3) Search fields show Chrome's native blue cancel 'x' (blog search-empty light, dashboard search-focus light). That is a default-browser leftover in an ink-only system. (4) Header nav focus (blog 'Home', commerce 'Cart'): the 2px ring is 52px tall but hugs the text horizontally, so the glyphs touch the outline. (5) Settings profile save shows a bare green 'Saved' word, with no icon, no toast and no callout. (6) The plan dialog is pinned about 57px from the top instead of centered, and no initial focus ring is visible on Cancel. (7) Commerce 'In stock only' checkbox: the decorative box intercepts pointer clicks (the failing smoke test).",
    "Capture coverage (harness): several state captures miss what they are meant to show. The blog newsletter-error capture ends at y=900 with the error message below the fold. Both dashboard empty-filter captures show the overview and not the empty panel. The blog search-empty capture cuts the panel after its first line. All state captures are desktop only. The empty-state and loading designs are therefore still partly unverified.",
    "Anomaly to verify: commerce home-mobile-light.png is 828px wide (414 CSS px) while every other mobile capture is 780px (390). The no-horizontal-scroll gate passed, so either the gate and the capture measure different things, or something on commerce home extends 24px past the viewport.",
    "Polish details: filtering the dashboard table reflows the column widths (Owner jumps from x=491 to x=384 on the 1-result search-focus state). The Due date column ends at x=1224 and leaves about 150px of empty frame on every row. The blog article title 'Writing Release Notes People Actually Read' leaves 'Read' as a one-word second line. On settings profile mobile the sticky save bar is narrower than the viewport and overlaps the card border.",
    "Cross-app: clearly one family. Same header, h1 and lead rhythm, bloom placement on the three landing headers, note voice, card radius and hairline, badge, chip and tab language, and the same error-callout pattern in commerce and settings. Deviations: mobile nav (dashboard menu button, settings tab row, commerce and blog inline links, each defensible), confirmation feedback (blog and commerce use a success callout, settings a bare word), and the dark segmented weakness that shows up in every app using the control.",
    "Spec contradictions found: (a) the Studio details table says serif never on 'object pages', but the blog list puts a serif word in article titles, and Typography lists 'post' as an object h1. (b) The note recipe requires words that nearby text also carries, but the store note text 'new this week' is fixed. (c) The settings note's --note-x: calc(100% - 32px) overlaps the content column at 1440."
  ],
  "promptFixes": [
    "Commerce smoke failure (spec gap, already diagnosed). In Checkbox Anatomy add: 'Custom-drawn boxes keep the native <input> as the hit target: input { position:absolute; inset:0; margin:0; opacity:0; z-index:1; cursor:pointer } and the decorative box gets pointer-events:none and z-index:0. Nothing visual may sit above a native input.' Add to Never: 'A decorative element above a native input or button.' Add to Verification: 'Click every restyled checkbox, radio and switch with the mouse in the smoke run.'",
    "Dark segmented selection (spec gap; rule 9 inverts in dark because raised #1d1c18 is darker than subtle #24231f). Add a token color.surface.selected (light #ffffff, dark #34332d) and in Segmented control States say: 'Selected: color.surface.selected, elevation.segment, plus in dark an inset 0 0 0 1px color.border.strong ring; the selected segment must be lighter than its track in both themes (at least 1.3:1).' Add to Verification under Dark: 'selected segment visibly lighter than the track.'",
    "Hatch too loud (spec gap; the rc.3 value overshot). Change color.decor.hatch to light #d4cfc4 / dark #3f3d37 and the pattern to '135deg, hatch 0 1px, transparent 1px 10px'. Replace 'at least 1.5:1' with 'between 1.15:1 and 1.35:1 against color.surface.tray: visible as texture, never louder than body text.' Add: 'In a grid of 3 or more no-asset cards the media frame drops to 3:2 so placeholders do not dominate.'",
    "Card hover invisible (spec gap). In Card States change hover to 'ring inset 0 0 0 1px color.text.tertiary and the title gets its link underline; no lift.' Add to Verification: 'Hover on a linked card is visible in a screenshot in both themes.'",
    "Native search clear button (spec gap, default-browser leftover). In Text field add: 'type=search: input::-webkit-search-cancel-button { appearance:none } — if the base app needs a clear control, render a size.controlSm ghost icon button with a 16px x in color.text.secondary and aria-label=\"Clear search\".' Add to Never: 'Browser-default UI chrome (blue search clear, default select arrow, default focus glow).'",
    "Nav-link focus ring hugging text (spec gap). In Navigation Anatomy add: 'Header links are boxes of size.controlSm height with padding 0 space.8 and radius.inner (offset with margin-inline: calc(-1 * space.8) so the text stays aligned); the focus outline follows that box.' Add to Shared states, Focus-visible: 'The outline never touches glyphs: inline links get padding 0 2px or outline-offset 3px.'",
    "Save confirmation as a bare word (spec gap). In Toast Use add: 'Every save or submit success the base app announces in text (\"Saved\", \"Subscribed\") is shown as a toast, or as an inline success callout if the text must stay in place, never as a bare colored word.' Add to Verification: 'Submit each form successfully and screenshot the confirmation.'",
    "Dialog pinned to the top (agent mistake; the spec says centered, so strengthen it). In Dialog Anatomy add: 'Native <dialog>: margin:auto; inset:0; max-height: calc(100dvh - space.64) — vertically and horizontally centered; never top-aligned.' In A11y add: 'The least destructive control receives focus with :focus-visible styling (call focus({ focusVisible: true }) or add a .is-focus class), so the opening state shows the ring.'",
    "h2 repeating the h1 (agent mistake; the rule exists, so make it concrete). In Typography add the example: 'Projects → \"All projects\" counts as a repeat: on an index page the table card has no title, or a functional one (\"8 projects\", \"Active this quarter\").' Move 'An h2 or card title repeating the h1' into the Never list.",
    "Current-plan marker styled as a primary (spec gap). In Badge Variants, Emphasis add: 'Marks the current plan or default item: 22px badge in the card header, never a button-sized pill. A non-actionable control that stays in the layout (\"Current plan\") is a disabled secondary button.' Add to rule 2: 'A filled ink element always does something.'",
    "Mobile TOC above the h1 (spec gap; the same failure class as rc.2's header search). Add an Article layout line: 'The table of contents is a right rail from breakpoint.lg; under it, it becomes a <details> \"On this page\" placed after the post meta line, never between the breadcrumb and the h1. Breadcrumbs get space.16 below.'",
    "Half-empty cards (spec gap; security password form, Apollo spec rows). In Card Anatomy add: 'Content fills the card: forms inside a card use the 2-column field grid from breakpoint.md, or the card is sized to the form (max 8 columns, fields full width); spec rows always span the card. No card has more than 30% of its width empty to the right of its content.'",
    "Mobile action bar placement (agent deviation; strengthen the rule). In Layout adaptation add: 'The mobile action bar is position:fixed to the viewport bottom and full width, never sticky inside a card, and the card does not reserve empty space for it.'",
    "Mixed-value mono applied to prose counts (spec gap in rule 7). Add: 'Counts inside a sentence or status line (\"Showing 0 of 6 posts\", \"3 of 6 notifications on\") stay sans; the mixed-value rule applies to table cells, spec rows and totals only.'",
    "Active chip hidden in the scroll strip (spec gap). In Chip add: 'In a scrolling strip, the selected chip is scrolled into view on load (scrollIntoView({ inline: \"nearest\" })), and the strip shows a 24px edge fade while more chips are off-screen.'",
    "Table column reflow on filter (spec gap). In Table Anatomy add: 'table-layout: fixed with explicit column widths (primary column flexible, numbers and dates sized to their longest value, status 120px, actions sized to their buttons); filtering never moves columns; the last column absorbs leftover width so no empty band trails the row.'",
    "Inline badge spacing (spec gap). In Badge Anatomy add: 'Inline after text: margin-left space.8, vertical-align middle.'",
    "Spec contradictions (fix the prompt). (a) In Studio details, Serif word, Never: change 'object pages' to 'product, project and record pages; blog post titles are allowed (the blog list)'. (b) In Per app, Store: replace the fixed text 'new this week' with 'a 2-5 word restatement of the lead or the featured card's label', or require the lead to carry the phrase. (c) In Per app, Settings: replace --note-x: calc(100% - 32px) with --note-x: space.16 so the note stays inside the 220px sidebar.",
    "Harness (process). The state captures must frame their subject: scroll the asserted element (error message, empty panel, toast, dialog) into view with 80px of context before the screenshot. Add mobile state captures (390px) for the form error and the dialog. Also make no-horizontal-scroll compare document.documentElement.scrollWidth with the full-page capture width, because commerce home-mobile-light.png is 828px wide while every other mobile capture is 780."
  ]
}
```

## Reasons

- commerce: functional-preservation = 9 passed, 1 failed (needs all pass)
- critic: average 3.83 (needs 4.0), lowest 3.5 (needs 3)
