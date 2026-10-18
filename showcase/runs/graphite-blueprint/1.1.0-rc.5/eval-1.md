# graphite-blueprint@1.1.0-rc.5 — evaluation 1

Verdict: **fail** · 2026-10-17T22:00:24.559Z

## blog (20261017-212652)

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

## commerce (20261017-212652)

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

## dashboard (20261017-212652)

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

## settings (20261017-212652)

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
| palette-consistency | pass | 1 | 0.75 |
| type-consistency | pass | 0.888 | 0.7 |
| reference-palette-distance | pass | 0.18 | reported |

## Critic

```json
{
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 4,
  "spacingRhythm": 3,
  "componentStates": 4,
  "polish": 3,
  "signature": 4,
  "notes": [
    "All paths are under showcase/runs/graphite-blueprint/1.1.0-rc.5/<app>/20261017-212652/ unless they say otherwise. Gates: all pass on all four apps (eval-1.md). Palette consistency is 1.0. Type consistency is 0.888, up from 0.869 in rc.4, now that result counts are mono again in every app. Reference palette distance is 0.18.",
    "rc.4 items (1.1.0-rc.4/critic-1.json), the goal of this iteration. N1 'Featured' as an h2 opener: FIXED. A mono 'FEATURED' label sits over the plate and text. The plate top is at about y≈355 CSS (y≈210 display ×1.69), and the only large headline in the first 900px is 'Field Notes' (blog/screenshots/home-desktop-dark.png; rc.4 was about y≈680). N2 sans result counts: FIXED. 'SHOWING 6 OF 6 POSTS' (blog/home-desktop-dark.png), 'SHOWING 11 PRODUCTS' (commerce/home-desktop-dark.png) and 'SHOWING 8 OF 8 PROJECTS' (dashboard/home-desktop-dark.png) are all mono uppercase, and so are the labels over the closings ('SUBSCRIBE TO THE NEWSLETTER', 'SHIPPING AND RETURNS'). N3 hidden pin head: FIXED. 'PROJECTS' is visible over a five-dot meter plus the number on every row at 390px. The six rows are equal at about 104px at 2x (dashboard/team-mobile-dark.png). N4 echoing description and doubled link: FIXED. The 'Why we write' description ('Where the blog came from, and the bar every post has to clear…') shares no phrase with the prose. The links go to different places ('Read the featured post →' and the inline 'latest writing'). The three paragraphs now sit under the opener from the left edge at measure (blog/about-desktop-dark.png y≈424–557 display). A new problem it introduced is in N10. N5 mid-phrase dim: FIXED. 'Over $100? Ships free.' is one line at 1440px, with one tone per sentence (commerce/home-desktop-dark.png), and two lines, 'Over $100? / Ships free.', at 390px (commerce/home-mobile-dark.png). N6 banner repeated as the form's first child: not exercised. In every captured failed form the first invalid field is within one viewport of the banner. Settings profile: 'Full name' y≈403 and banner y≈948, 545px apart (settings/state-profile-errors-desktop-dark.png). Checkout: y≈288 to y≈638 (commerce/state-checkout-errors-desktop-dark.png). Nothing to score. Security form gap (60px against 48): NOT FIXED. 'Update password' ends at y≈1197 display and the sessions rule is at y≈1287, ×1.27 = 114px at 2x, about 57 CSS px (settings/settings-security-mobile-dark.png). N8 payment card narrower: FIXED. The payment card, plan grid and invoice table all span x≈661–1376 (settings/settings-billing-desktop-light.png). Measuring blueprints (process, not scored): NOT FIXED. The blog agent again 'didn't measure the blueprint widths in a browser' and pasted no numbers (blog/agent-report.md 'Spec review steps').",
    "Published 1.0.0 items (0.1.0-rc.3/critic-1.json), all rechecked and held. Mobile team table: the emails are complete ('marcus@northwind.example', 'tomas@northwind.example'), rows are equal, and nothing runs under the pin (dashboard/team-mobile-dark.png). Ghost '$' on mobile projects: none. Only Project and Status show (dashboard/projects-mobile-light.png). About blueprints at about 190px: FIXED and held, measured. On blog/about-desktop-dark.png (1440px shown at 830px, ×1.73) the stack spans x≈62–221, about 275 CSS px. The pair spans x≈308–467, about 275px, and the box x≈554–712, about 273px. In the native crops each figure is about 274px wide (blog/drawings/about-d1.png stack x≈58–332; about-d2.png box; about-d3.png pair, each slab about 138px with the dotted connector). On mobile (blog/about-mobile-light.png, ×4.70 at 2x) the stack spans about 137 of 166 display px, about 320 of 390 CSS px.",
    "rc.1 items (1.1.0-rc.1/critic-1.json). Mobile nav clipping: held, every item visible (dashboard/team-mobile-dark.png, settings/settings-security-mobile-dark.png). Badge in the pin: held. Radio circles in segments: held, text only ('S M L XL', commerce/products-merino-crew-sweater-mobile-dark.png; 'Natural Olive Charcoal', products-canvas-field-tote-desktop-light.png). Demoted blog openers: held ('More posts', 'Why we write', 'How a post gets made', 'The authors', 'Related posts' are 48px h2s with descriptions). Double hairlines: held in cart (one rule at y≈173, commerce/cart-desktop-dark.png) and mobile tables, but a new double rule appears on the about page (N10). Cart heads without descriptions: held ('1 item in your cart', 'Ships to one address'). Team dot meter: held, and now on mobile too. Plate caption facts: held, but one is now cut (N12). Look-alike about stacks: held (a stack, a connected pair, a box). Blog newsletter banner: held ('1 field needs attention' above the actions, blog/state-newsletter-error-desktop-dark.png). Review files: settings used a temporary route and reports it removed. Blog used no review route.",
    "rc.2 items (1.1.0-rc.2/critic-1.json). Sessions badge cutting 'Active now': held. The green dot is inline after 'Chrome on Windows', 'New York, US · Active now' is complete, and the pin is empty on that row (settings/settings-security-mobile-dark.png). Pin width and head alignment: REGRESSED (N9). Blog closing size: held at display size. Double FIG and the name twice: held. One 'FIG 04 · 100% MERINO WOOL', the name once, 'APPAREL · IN STOCK' and 01/02/03 Details (commerce/products-merino-crew-sweater-mobile-dark.png). Legend indent: held. KPI wrap: held, one per row on mobile (dashboard/state-empty-filter-mobile-light.png). Plate repeats: held. Commerce runs all eight kinds before any repeat. Fonts: self-hosted (@fontsource, blog and settings agent-reports). Profile preview width: no longer applies. The settings agent moved the quiet-stage preview from Profile to Notifications, an inert inbox (settings/settings-notifications-desktop-dark.png). The spec's 'a settings preview' still holds (agent.md Stage → Where). Profile now has a plain Photo group, so it lost rc.4's member-card preview (rc.4 settings-profile-desktop-light.png). Noted, not scored.",
    "rc.3 items (1.1.0-rc.3/critic-1.json). (A) 6-line mobile closing: held at 2 lines ('New posts. / One email.', blog/about-mobile-light.png and home-mobile-light.png; 'Over $100? / Ships free.', commerce/home-mobile-dark.png). (B) About captions level: held. 'FIG 0.1/0.2/0.3' are all at y≈809 display and the titles all at y≈995 (blog/about-desktop-dark.png). (C) Orphaned prose: held (see N4 above). (D) Contents list above the h1 on mobile: held. The order is breadcrumb, h1, meta, tags, lead plate, then a closed 'On this page' (blog/posts-release-notes-people-read-mobile-dark.png). (E) Lead plate: held ('NO. 01 · DESIGN', 'NO. 02 · WRITING' under the meta; the contents list is a side rail on desktop). (F) Banner distance: held (545px, above). Sort-head offset: REGRESSED (N9). Billing gap: REGRESSED (N11). Box blueprint craft: held. It has a front vertical edge and a seam band (blog/drawings/about-d2.png).",
    "Regressions against rc.4, each with its own prompt fix. N9, MINOR, polish, regression of rc.2 item 2 and the rc.3 sort fix: the pinned 'STATUS' head ends 16px short of its values on desktop and mobile. On desktop the head ends at x≈1380 and 'Done', 'Active' and 'Paused' at x≈1396 (dashboard/home-desktop-dark.png). On mobile the head ends at x≈684 at 2x and 'Done' at x≈716 (dashboard/projects-mobile-light.png). rc.4 had both at 1396 and 716. Cause: the agent applies the spec's row-reverse only to `.num .sort-button` (base.css:1149). The pin head keeps the label first, and an always-rendered empty 12px `.sort-indicator` plus the 4px gap pushes the label left (ProjectsTable.tsx:142–147). N10, MINOR, polish, new: on the about page two hairlines frame an empty 96px band under the masthead. The rules are at y≈157 and y≈213 display (×1.73), about 272 and 368 CSS px, with nothing between, in both appearances (blog/about-desktop-dark.png, about-desktop-light.png). Cause: the masthead's border-bottom, then `.masthead + section{margin-top:space.96}`, then the opener's own top rule (base.css:687–722). rc.4 had one rule (1.1.0-rc.4/blog/20261017-191438/screenshots/about-desktop-dark.png y≈205). The Never rule says 'two hairlines under 32px apart', so a 96px pair slips through. The reference never stacks two section rules with nothing between (pipeline/linear-study/reference/screenshots/p1-desktop-light.png). N11, MINOR, spacing, regression of the rc.3 billing fix: the plan grid ends at y≈576 and the Payment rule is at y≈640, 64px. The payment content ends at y≈733 and the Invoices rule is at y≈784, about 51px. The spec says 48 and rc.4 measured 48 (settings/settings-billing-desktop-light.png, native 1440). Together with the security form's 57px (above), settings group gaps are again uneven. N12, MINOR, signature, new: the commerce desktop caption 'FIG 03 · DETACHABLE SHOULDER STR…' is cut by an ellipsis (commerce/home-desktop-dark.png). rc.4 showed it whole, and mobile still does (commerce/home-mobile-dark.png). The reference's captions are short and never truncated.",
    "Other issues, with severity. N13, MINOR, polish: the article column's left edge is at x≈140 CSS while the header brand, 'Related posts', the closing and the footer are at x≈96 on the same page (blog/posts-shipping-a-design-system-desktop-light.png x≈54 vs 37 display ×2.6; posts-release-notes-people-read-desktop-dark.png x≈58 vs 40 ×2.41). The page has two left edges 44px apart. In rc.4 the article and Related shared one edge. N14, MINOR, polish: two opener links end in a literal '+' instead of the arrow every other link uses ('Get them by email +', blog/home-desktop-dark.png; 'Subscribe +', blog/about-desktop-dark.png; AboutPage.tsx:76). It reads like an add action. N15, MINOR, spacing: about 'Why we write' leaves 96px between the description and the prose (y≈355 to y≈424 display, about 120 CSS px including line boxes), because `.opener{margin-bottom:space.96}` applies even when prose, not a grid, follows. Combined with the empty band (N10), the first section reads loose next to the reference's tight opener-to-paragraph pairing (p1-desktop-light.png). N16, NOTED: the commerce grid's third row repeats row 1's kinds in the same columns (perspective, sphere, dot matrix under perspective, sphere, dot matrix). The spec allows a repeat after all eight kinds, but at 1440px the pattern is visible. Not scored. N17, NOTED: on product detail no nav pill is marked current (commerce/products-canvas-field-tote-desktop-light.png, 'Shop' unmarked), while 'Shop' is marked on the grid. This is minor and possibly base-app routing. N18, NOTED: the settings screen-head summary ends at x≈1308–1323 while the content runs to 1376. Dashboard's summary is flush right at 1408 (dashboard/home-desktop-dark.png vs settings/settings-billing-desktop-light.png). Small cross-app drift.",
    "Against published 1.0.0 (0.1.0-rc.3/*/20261017-095917): nothing the published review praised is lost. The things rc.4 found worse than published (Featured, sans counts, hidden pin head) are all fixed. What is worse than published now is N10 (empty double-ruled band on about), N12 (one truncated caption) and N13 (two left edges on the article). The published run had a misaligned pin head too, so N9 is a return to the published flaw, not a new one.",
    "Reference fidelity (4): the reference's language without copying it. Near-black ground, inverse pills, Inter with tight tracking, mono uppercase captions now consistent in every app, 48px split openers, two-tone one-line closings over the dot field, hairline grids of generative plates, and the dot-column chart with the teal current column on a quiet stage (blog/about-desktop-dark.png, commerce/home-desktop-dark.png, dashboard/home-desktop-dark.png vs pipeline/linear-study/reference/screenshots/p1-desktop-light.png). Not a 5: the blueprints are still single clean outlines, simpler than the reference's ribbed stack with its inner disc (blog/drawings/about-d1.png vs reference/illustrations/p1-i5.png).",
    "Cross-app consistency (4): one family. Screen heads (mono label, h1, two-tone summary), '01 / 0n' section heads in settings and cart, banners above actions in all three form apps, mono counts in all apps, right-aligned pins, empty dot glyph with 'NO RESULTS', and two-line mobile closings. Drift: the screen-head summary is flush right in dashboard but not in settings (N18), and only the dashboard pin head is misaligned (N9). Type consistency is 0.888.",
    "Hierarchy (4): the blog home leads with the masthead, then the featured plate and title inside the first viewport, then the grid. App screens read head, KPIs, chart and activity, then table. Articles read title, meta, lead plate, then contents. Held back slightly by the about page's empty band (N10), which delays the first section.",
    "Spacing rhythm (3): below 4 because a rule the spec states and verifies (settings groups 48px from the last content, 'after form actions too') is broken twice. The billing gap is 64px after plans and about 51 after payment, and the security form gap is about 57 on mobile (N11). The billing gap was 48 in rc.4, so it regressed. Add the 96px empty band on about (N10) and the 96px opener-to-prose gap (N15). Elsewhere the 4/8 scale holds: 32px app padding, 16 KPI gap, equal table rows, level about row.",
    "Component states (4): focus is a 1px indigo outline plus the accent border, layered over the red error border (commerce/state-checkout-errors-desktop-dark.png 'Full name', settings/state-profile-errors-desktop-dark.png, blog/state-newsletter-error-desktop-dark.png 'nope'). Banners sit above the actions. The empty filter shows the dot glyph, 'NO RESULTS', a two-tone line and 'Clear filters' (dashboard/state-empty-filter-mobile-light.png). The plan dialog is a bottom sheet with a mono 'PLAN CHANGE', an inverse Confirm and a bordered Cancel (settings/state-plan-dialog-mobile-light.png). Not a 5: no pending state was captured (harness gap), and the banner-repeat branch is untested.",
    "Polish (3): below 4 because two of the four items are regressions of fixes made in earlier rounds, and one introduces a pattern the Never list was written to stop. N9 is the pin head 16px off its values again on desktop and mobile. N10 is two hairlines with nothing between them, at 96px. N13 is two left edges on article pages, and N14 is the '+' link glyphs. No default-browser leftovers.",
    "Signature (4): every element is in all four apps and placed as Applying the concept says. That includes fact-captioned plates (commerce and blog grids, the article lead plates, product detail on a quiet stage), the about row of three at about 274px, tier slabs on plan cards (settings/drawings/settings-billing-d1..d3.png), the empty slab stack (commerce/cart-desktop-dark.png), dot meters (team, password strength), the empty dot glyph, quiet stages (dashboard chart, product image, the notifications inbox preview) and two-line dot-field closings. Chart-in motion: dashboard/motion/motion-m1.png shows 420ms on cubic-bezier(0.25,0.46,0.45,0.94), columns rising from the base and the teal OCT column arriving with the rest by about 480ms. Not a 5: blueprint craft is below the reference (p1-i5.png), and one caption is truncated (N12).",
    "Not penalized (known harness gaps and base-app content): no real pending request, so no scan glyph, shimmer or loading button was captured. Sticky headers appear mid-page in full-page captures (blog/state-newsletter-error-desktop-dark.png header and 'Skip to content' at y≈1365–1405; dashboard/state-empty-filter-mobile-light.png search bar at y≈1300; settings/state-profile-errors-desktop-dark.png taller header). Motion frames come from the first route only. Colored fringes on article body text in downscaled captures are subpixel antialiasing, and color adherence is 1.0. Title-case data, 'Account Settings' and the always-visible '0' cart count come from the base apps. The run's agents cannot commit.",
    "Bar: 4, 4, 4, 3, 4, 3, 4, an average of 3.71 with nothing below 3. It does not clear the bar (average under 4.0). The update reached rc.4's goal: N1, N2, N3, N4, N5 and N8 are FIXED, and N6 is not exercised. But the security gap is still not fixed, and three earlier fixes regressed: the pin-head offset (rc.2/rc.3), the billing 48px gap (rc.3) and a double hairline (rc.1, in a new spot). One new truncation also appeared. All are minor and each has a one-line fix. Against published 1.0.0 it is still better overall."
  ],
  "promptFixes": [
    "Polish (N9), agent mistake the spec half-covers: in Table → Sort, replace the prose-only rule with recipe CSS: `.tbl :is(.num,.pin) .sort-button{flex-direction:row-reverse}` and 'render the chevron element only on the sorted column (no empty placeholder span)'. Add to Verification: 'every right-aligned head (numbers and the pin) ends on the same x as its cells at 1440px and 390px; paste both x values'. Evidence: dashboard/20261017-212652/screenshots/home-desktop-dark.png (STATUS ends x≈1380, values x≈1396), projects-mobile-light.png (684 vs 716 at 2x), app/src/styles/base.css:1149 and ProjectsTable.tsx:142–147, vs 1.1.0-rc.4/dashboard/20261017-191438/screenshots/home-desktop-dark.png (both at 1396).",
    "Polish (N10), spec gap: in Never, replace 'two hairlines under 32px apart with nothing between' with 'two hairlines with nothing between them, at any distance'. In Signature 6 → Limits add: 'the first section after a masthead drops its top rule (the masthead's rule divides them) and starts space.96 below it; a rule always has content directly on both sides'. Evidence: blog/20261017-212652/screenshots/about-desktop-dark.png and about-desktop-light.png (rules at about 272 and 368 CSS px, empty band), app/src/styles/base.css:687–722, vs 1.1.0-rc.4/blog/20261017-191438/screenshots/about-desktop-dark.png (one rule) and pipeline/linear-study/reference/screenshots/p1-desktop-light.png.",
    "Spacing (N11 and the security gap), agent mistake against a stated rule: make the 48px gap structural. Add recipe CSS to Spacing: `.settings-group+.settings-group{margin-top:0;padding-top:var(--space-48);border-top:var(--border-width-hairline) solid var(--color-border-subtle)} .settings-group{padding-bottom:var(--space-48)} .settings-group>:last-child,.settings-group :is(.card-grid,.form-actions):last-child{margin-bottom:0}`. Add to Verification: 'paste the measured gap (last content bottom to next rule) for every settings group at 1440px and 390px'. Evidence: settings/20261017-212652/screenshots/settings-billing-desktop-light.png (64px after plans, about 51 after payment), settings-security-mobile-dark.png (about 57 CSS px after Update password), vs 1.1.0-rc.4 billing (48).",
    "Signature (N12): in Spec plate → Limits add 'a caption fact is at most 18 characters (a material, a capacity, a weight) so it never truncates in a 4-column grid; captions never use text-overflow:ellipsis'. Add to Verification: 'no plate caption ends in an ellipsis at 1440px'. Evidence: commerce/20261017-212652/screenshots/home-desktop-dark.png ('FIG 03 · DETACHABLE SHOULDER STR…') vs 1.1.0-rc.4/commerce/20261017-191438/screenshots/home-desktop-dark.png (whole) and the reference's short captions (p1-desktop-light.png).",
    "Polish (N13), spec gap: in Layout add 'every block on a page shares the page's left edge (the header brand's x). An article column narrows from the right (body at size.measure, the rail at the right), never with its own left inset'. Add to Verification: 'on an article page the breadcrumb, h1, Related opener and footer start at the same x'. Evidence: blog/20261017-212652/screenshots/posts-shipping-a-design-system-desktop-light.png (article x≈140 vs Related/header x≈96 CSS).",
    "Polish (N14), minor: in Signature 6 → What (opener link), add 'the link ends in → (or ↓ for an in-page anchor), never \"+\"'. Evidence: blog/20261017-212652/screenshots/home-desktop-dark.png ('Get them by email +') and about-desktop-dark.png ('Subscribe +'), app/src/pages/AboutPage.tsx:76.",
    "Spacing (N15), minor: in Signature 6 → Limits add 'opener to a following grid or figure row is space.96 (space.48 under breakpoint.sm); opener to following prose is space.32'. Evidence: blog/20261017-212652/screenshots/about-desktop-dark.png (about 120 CSS px between the 'Why we write' description and its prose) vs reference p1-desktop-light.png (paragraph close under its headline).",
    "Process, harness, not scored: the blog agent again did not paste blueprint widths ('checked them in the full-page screenshots instead', blog/agent-report.md). The 2x-screenshot method the spec now allows needs a native-size capture the agent can open, so either have pigment-snap write per-element crops (as the harness's drawings/ do) into the agent's workspace, or print `.bp-fig` getBoundingClientRect widths from pigment-snap."
  ]
}
```

## Reasons

- critic: average 3.71 (needs 4.0), lowest 3 (needs 3)
