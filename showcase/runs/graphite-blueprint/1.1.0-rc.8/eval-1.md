# graphite-blueprint@1.1.0-rc.8 — evaluation 1

Verdict: **pass** · 2026-10-18T05:34:35.156Z

## blog (20261018-051613)

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

## commerce (20261018-051613)

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

## dashboard (20261018-051613)

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

## settings (20261018-051613)

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
| palette-consistency | pass | 0.969 | 0.75 |
| type-consistency | pass | 0.82 | 0.7 |
| reference-palette-distance | pass | 0.18 | reported |

## Critic

```json
{
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 4,
  "signature": 4,
  "notes": [
    "Scope: screen step, one sample per app (S0 = <app>/20261018-051613 under showcase/runs/graphite-blueprint/1.1.0-rc.8/). All gates pass on all four apps (eval-1.md). Palette consistency is 0.969 and type consistency 0.82. Desktop captures are 1440 px at 1x and mobile is 780 px at 2x. Where an image was shown scaled down, I convert with the stated factor (display × factor = capture px, and /2 for CSS px on mobile). With one sample, tracked items are judged fixed or not. New issues are one-sample observations (1 of 1) unless they appear in every app or the spec causes them.",
    "V4, record-detail caption repeating on-screen values: FIXED. The caption reads 'FIG 01 · WAVE', the kind-name fallback from the new Applying row, and repeats no value on the screen. The screen head holds the mono id 'PROJECT · APOLLO-MIGRATION', the h1, the 'Active' badge and a two-tone summary. A plate-wide lead figure (272 to 823) has numbered mono rows 01 to 04 beside it (856 to 1408). The treatment is the one the row prescribes, so the three-treatments-in-three-samples drift has a recipe now (dashboard/20261018-051613/screenshots/projects-apollo-migration-desktop-light.png, drawings/projects-apollo-migration-d1.png, projects-apollo-migration-mobile-dark.png). Published 1.0.0 captioned the same plate 'FIG 01 · INTERNAL PLATFORM', which repeated the header (0.1.0-rc.3/dashboard/20261017-095917/screenshots/projects-apollo-migration-desktop-light.png). rc.8 is better.",
    "V5, an article's figures sharing a kind with its Related cards: FIXED on both captured articles. Shipping article: the lead is bars (NO. 01) and the in-body FIG 01 is a fan. Related shows dot matrix (NO. 04), perspective (NO. 02) and rings (NO. 03), so no kind appears twice (blog/20261018-051613/screenshots/posts-shipping-a-design-system-desktop-light.png). Release-notes article: the lead is perspective (NO. 02) and the in-body FIG 01 is rings. Related shows bars, dot matrix and fan, so again no kind appears twice (posts-release-notes-people-read-desktop-dark.png).",
    "Mobile 'This device' badge word: FIXED. 'Chrome on Windows THIS DEVICE' shows a visible mono uppercase word on the first line, with 'New York, US · Active now' below it (settings/20261018-051613/screenshots/settings-security-mobile-dark.png). On desktop the pill 'This device' is unchanged (state-password-mismatch-desktop-dark.png).",
    "Pin-edge rule only when scrolling: FIXED. I found no vertical hairline in any table at 1440 or 390. Invoices STATUS (settings-billing-desktop-light.png), sessions actions (state-password-mismatch-desktop-dark.png), dashboard STATUS (home-desktop-dark.png) and the mobile PROJECTS pin (dashboard/.../team-mobile-dark.png) are all clean. The is-scrolling path itself is not exercised, because no captured table overflows at the captured widths.",
    "Diagonal plate echo: FIXED. Commerce grid, 4 columns and 11 items: row 1 perspective/sphere/dot matrix/lattice, row 2 wave/bars/rings/fan, row 3 sphere/dot matrix/lattice. No kind repeats in a column (P-W-S, S-B-D, D-R-L, L-F), on a diagonal (row 2 to row 3: wave→dot matrix, bars→lattice; anti-diagonals bars→sphere, rings→dot matrix, fan→lattice) or between neighbours (commerce/20261018-051613/screenshots/home-desktop-dark.png). Residual observation, not a defect: row 3 re-reads row 1's sequence shifted left by one column (sphere, dot matrix, lattice), which is a faint pattern at a knight's-move distance. Blog grid: perspective/rings/dot matrix over fan/wave/sphere, with bars featured (blog/.../home-desktop-dark.png).",
    "The seven Verification checks cut in rc.8 all still hold in this sample. (1) One large headline in a content home's first viewport: blog 'Field Notes' only, with 'More posts' at 625 display × 1.58 ≈ 988 > 900 (blog/.../home-desktop-dark.png). Commerce has 'Shop all goods' only (commerce/.../home-desktop-dark.png). (2) Article order: breadcrumb, h1, meta, tags and lead plate, with contents in the rail on desktop. On mobile the order is h1, meta, tags, plate, then a closed 'Contents', then prose (blog/.../posts-release-notes-people-read-mobile-light.png). (3) Pin heads readable and over their values: BUDGET ends at 1020 over '$39,000' at 1020, and STATUS ends at 1408 (dashboard/.../home-desktop-dark.png). AMOUNT ends at 1175 over 1175 (settings/.../settings-billing-desktop-light.png). PROJECTS ends on its values at 390 (team-mobile-dark.png). (4) Failed-submit focus: an indigo ring on the first invalid field over the red border (commerce/.../state-checkout-errors-desktop-dark.png 'Full name', settings/.../state-password-mismatch-desktop-dark.png, blog/.../state-newsletter-error-desktop-light.png). (5) Counts are mono labels: 'SHOWING 11 PRODUCTS', 'SHOWING 6 OF 6 POSTS', 'SHOWING 8 OF 8 PROJECTS', 'SHOWING 0 OF 8 PROJECTS'. (6) No '+' on links: 'Our shipping promise ↓', 'Get new posts by email ↓', 'Browse the archive →', 'Meet the authors ↓', 'Read their posts →'. (7) No double hairline: every pair of rules has content between them, for example the project head rule at 213 and the tab rule at 270 with the tabs between.",
    "rc.6/rc.7 R items held. R1, 48px settings gap: billing plans 646→694 (48), payment 853→902 (49), security button 658→707 (49), profile 633→682 (49). Mobile security 1078→1154 display × 1.29 / 2 ≈ 49, mobile billing 1312→1352 × 2.46 / 2 ≈ 49. R3, section-current nav: 'Projects' on project detail and 'Shop' on product detail. R4, table edges flush: 272 to 1408 in dashboard and settings.",
    "rc.1 to rc.5 items held. Mobile nav shows every item. Mobile tables have two columns, equal rows and complete emails (team-mobile-dark.png, settings-billing-mobile-light.png). Banners sit directly above the actions. Product detail shows FIG once, the name once, 'BAGS · IN STOCK' and Details 01/02/03 (products-canvas-field-tote-desktop-light.png). The masthead has one rule (blog about). One left edge on the article: brand, breadcrumb, h1, Related and footer at 19 display × 2.54 ≈ 48. Whole captions ('FIG 10 · VEG-TANNED LEATHER'). 'FEATURED' is a mono label, with the featured plate top at 213 × 1.58 ≈ 337. The opener link sits about 54 px from the prose (about: 400→439 × 1.39). Closings are one line at 1440 and two at 390 ('Over $100? Ships free.', 'Fresh notes. By email.'). The about row of three is level, about 285 px wide, with the marching pair (blog/.../drawings/about-d1.png). Chart and activity panels end together at 840/840.",
    "New, 1 of 1, spec-ambiguous (also seen in rc.7 S2, so 2 of 4 recent samples): the chart-in stagger is applied per dot column, not per bar. `--c = index*5 + column` at 8 ms gives a 232 ms sweep, so at t≈135 ms MAY and JUN are half up while AUG to OCT have not started, and OCT lands last at about 650 ms (dashboard/20261018-051613/motion/motion-m1.png, motion-m2.png, src/components/BarChart.tsx:67). Motion → 'Chart marks… 8ms stagger per column' (agent.md:414) does not say whether 'column' is a bar or a dot column. rc.7 S1 read it as bars, and the columns rose together. The motion still reads as a calm left-to-right reveal on the specified 420 ms curve, so the score is not lowered. A clarifying fix is listed.",
    "New, 1 of 1 here (2 samples across rc.7 S2 and rc.8): the dashboard panel tops are offset. The 'Deployment throughput' title sits above its stage, so the stage top is at 377, while 'Recent activity' sits inside its card, whose top is at 341. Both panels end at 840 (dashboard/.../home-desktop-dark.png). It is minor, and the bottoms align. Not lowered at the screen step, but watch for it in the confirm samples.",
    "New, 1 of 1: the about page's figure row has no opener of its own. FIG 0.1 to 0.3 sit straight under the 'Why we write' prose (blog/.../about-desktop-dark.png). This is V2 again: S0 of rc.7 had it, S1 and S2 did not, so it is now 3 of 8 samples across rc.6 to rc.8. Readable and not broken. Critic-1's optional clarifying fix stands.",
    "Process, 1 of 4: commerce left src/pages/ReviewPage.tsx behind (route removed). The agent-report asks the user to delete it, because the run could not delete files (commerce/20261018-051613/agent-report.md:3). That makes 3 of 24 runs across rc.6 to rc.8. Harness or process issue only, not scored.",
    "Published 1.0.0 comparison (0.1.0-rc.3/*/20261017-095917): nothing is worse. Better: the record-detail caption (kind name instead of a repeated header), the settings gaps (about 72 → 48 to 49), mobile tables, section-current nav and the mobile device badge.",
    "Reference fidelity (4): near-black ground and paper light mode, inverse pills, tight Inter, mono uppercase captions, split openers, two-tone dot-field closings, hairline plate grids, and the teal current column on a quiet stage (dashboard/.../home-desktop-dark.png, commerce/.../home-desktop-dark.png vs pipeline/linear-study/reference/screenshots/p1-desktop-light.png, with its teal dot columns and isometric stack row). Not a 5: blueprints are clean single outlines with a dot core, while the reference's stack has ribbed tiers and a sliced disc (blog/.../drawings/about-d1.png vs pipeline/linear-study/reference/illustrations/p1-i5.png). Unchanged from rc.7.",
    "Cross-app consistency (4): one family. Each app has the screen head (mono eyebrow, h1, two-tone summary), '01 / 0n' section heads, banners above actions, mono counts and right-aligned pins. The record-detail treatment now follows a recipe. The cart's stacked section head (number above title) differs from the settings inline head, but it stays within the spec's freedom, as in rc.7.",
    "Hierarchy (4): masthead, the featured plate in the first viewport, then the grid. App screens read head, KPIs, chart and activity, then table. The record detail reads head, lead figure, then facts. Articles read title, meta, lead plate, then body. Not a 5: the figure-less opener on the about row (1 of 1) and the light emphasis of the wave plate in a large empty card on project detail.",
    "Spacing rhythm (4): settings gaps are 48 to 49 on desktop and mobile, opener to prose about 54, and opener to grid about 108 (about authors: 1203→1281 × 1.39). Panel bottoms align and table rows are equal. Not a 5: offset panel tops on the dashboard.",
    "Component states (4): indigo focus over the red error border, inline errors, and an 'n fields need attention' banner directly above the action in all three forms. The empty filter shows the dot glyph, 'NO RESULTS', 'Clear filters' and the ringed search (dashboard/.../state-empty-filter-desktop-dark.png). The password strength dot meter appears in state-password-mismatch-desktop-dark.png. Not a 5: no pending state (harness gap).",
    "Polish (4): no default-browser leftovers, and the alignments hold (pins, table edges, one left edge). Nits are minor and one-off.",
    "Signature (4): every element is present in all four apps. Fact-captioned plates in the commerce and blog grids, lead plates, the product detail on a quiet stage, the record-detail lead figure, kind-distinct in-body figures, the about blueprint row, tier slabs on plan cards (settings/.../drawings/settings-billing-d3.png), dot meters, the empty dot glyph, the dot-column chart and the dot-field closings. Chart-in runs 420 ms on cubic-bezier(0.25,0.46,0.45,0.94). Not a 5: blueprint craft is below p1-i5, and the stagger reading is ambiguous.",
    "Not penalized, known harness gaps: no real pending request. Full-page capture artifacts: the sticky header mid-page in blog/.../state-newsletter-error-desktop-light.png, and the header offset in dashboard/.../state-empty-filter-desktop-dark.png. Motion frames come from the first route only. Colour fringes on body text in the scaled full-page captures are subpixel antialiasing, not styling (no prose colour rules in src/styles/base.css). Base-app content: 'Account Settings', title-case data and the '0' cart badge.",
    "Bar: 4, 4, 4, 4, 4, 4, 4, an average of 4.0 with nothing below 3. Every tracked rc.7 item (V4, V5, mobile badge, pin-edge rule, diagonal echo) is FIXED in this sample. The seven cut Verification checks still hold, and nothing is worse than published 1.0.0. Recommendation: the screen passes, so run the confirm step (two more samples). In confirm, watch chart-stagger granularity, dashboard panel tops and the about opener."
  ],
  "promptFixes": [
    "Optional, spec ambiguity (2 of 4 recent samples: rc.7 S2 and rc.8 S0): in Motion, change 'Chart marks, first view: scale(0.4)→1 and opacity, chart, standard, 8ms stagger per column' to '…8ms stagger per bar (data point); every dot column of one bar starts together, so the whole chart lands within 420ms + 8ms × (bars − 1)'. Evidence: dashboard/20261018-051613/motion/motion-m1.png (OCT starts at about 320 ms and lands at about 650 ms) and src/components/BarChart.tsx:67 (`--c: index*5+column`).",
    "Optional, watch in confirm (rc.7 S2 and rc.8 S0): in Applying the concept → Dashboard (or the Card anatomy), add 'side-by-side panels start at the same y: the chart's title sits inside its stage card like the activity card's title, or both sit above'. Evidence: dashboard/20261018-051613/screenshots/home-desktop-dark.png (stage top 377 vs activity card 341).",
    "Optional, unchanged from rc.7 critic-1 (V2, 3 of 8 samples across rc.6 to rc.8): in Signature 3 → Where (about row of three), say 'the row opens with its own split opener (h2 + one-line summary); never place it directly under another section's prose'. Evidence: blog/20261018-051613/screenshots/about-desktop-dark.png (FIG 0.1 to 0.3 straight under the 'Why we write' prose)."
  ]
}
```
