# night-cartridge@0.1.0-rc.3 — evaluation 1

Verdict: **fail** · 2026-10-14T13:22:41.823Z

## blog (20261014-124541)

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

## commerce (20261014-124541)

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

## dashboard (20261014-124541)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | **FAIL** | 1 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261014-124541)

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
| palette-consistency | pass | 0.875 | 0.75 |
| type-consistency | pass | 1 | 0.7 |
| reference-palette-distance | pass | 0 | reported |

## Critic

```json
{
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 3,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 4,
  "signature": 3,
  "notes": [
    "Overall: the core language still reads as the reference without copying it. The chunky 16px-grid face, night ground, cream type, 4px windows with darker interiors, the dither header rule and h2 rules, the bevelled gold marker, hue top bars and bullets, block meters and the checkered grass strip are all present in all four apps, in light and dark (blog/home-desktop-dark.png, dashboard/home-desktop-dark.png, settings/settings-profile-desktop-dark.png vs reference/screenshots/p1-desktop-light.png). rc.3 fixes most of the rc.2 list. It also brings three regressions: a spec bug in the scene recipe, a dashboard hierarchy slip, and a new accessibility gate failure. Arithmetic: 4, 4, 3, 4, 4, 4, 3 averages 3.71, below the 4.0 bar. Together with the failed gate, rc.3 does not pass.",
    "Gate failure (dashboard accessibility, axe `definition-list`, serious, /projects/apollo-migration). Cause: app/src/pages/ProjectDetailPage.tsx lines 128-134. The Overview tab's `<dl className=\"details\">` groups each term in a `<div>`, and the Tasks group is `<div><dt>Tasks</dt><dd>2 of 6 complete</dd><BlockMeter …/></div>`. BlockMeter (components/pixel.tsx:125) renders a `<div class=\"meter\" role=\"meter\">` as a direct child of the dl's div group. A div inside a dl may contain only dt and dd elements, so axe flags the whole dl. This came from fixing the rc.2 note: the spec now requires a meter under every n-of-m count (rule 9 and Verification), but it shows only standalone meter markup and never says where the meter goes inside description lists or table cells. This is a spec gap, not agent carelessness. The fix is to put the meter inside the `<dd>`.",
    "rc.2 issues, one by one. (1) Prop mass: mostly fixed on product screens. dashboard/drawings/projects-apollo-migration-d1.png now has racks, a server, a terminal, a dish, crates and a lit purple block about 16 to 40 units tall across the full width, which answers the 'sticks on an empty field' note. The commerce strip moved the other way (see signature). (2) Readable lights: partly fixed. The 2×2-unit LEDs on dashboard racks and the lit windows in the purple block now register (projects-apollo-migration-d1.png). The commerce strip still shows only 1 or 2 lit dots per shopfront (commerce/drawings/home-d1.png). (3) Ground-strip spread: fixed. There is one sprite per quarter in every app (dashboard/drawings/home-d2.png, settings/drawings/settings-profile-d2.png, blog/drawings/home-d2.png), and the document no longer overflows. Size is still a problem (see signature). (4) n-of-m meter: fixed (dashboard/projects-apollo-migration-desktop-dark.png), but its markup caused the gate failure above. (5) Contents-list marker on load: fixed (blog/posts-shipping-a-design-system-desktop-dark.png, '▶ Start with an inventory'). (6) Header switches: fixed. They are transparent `.tool` text buttons in all four apps. (7) Equal-height voids: fixed. The chart fills its panel (dashboard/home-desktop-dark.png), and the checkout Items window aligns to the top instead of stretching (commerce/state-checkout-errors-desktop-dark.png). (8) Sidebar: fixed. It reaches the ground strip in settings and dashboard. (9) Gap between a window and the next h2: fixed (commerce/products-canvas-field-tote-desktop-dark.png, 'Details' about 64px below the purchase window). (10) User menu with no highlighted option (rc.2 states note): NOT fixed. dashboard/state-user-menu-open-desktop-dark.png opens with the options indented for a marker slot, but no option is highlighted and no marker is visible.",
    "Regressions vs rc.2. (a) Dashboard section titles are gone. rc.2's dashboard/home-desktop-dark.png had 32px 'Deployment throughput' and 'Recent activity' titles on dither rules above the panels. rc.3 shows only 12px bullet captions inside the panels, although the Dashboard row in Applying the concept still asks for '32/40 section titles outside panels on the dither rule'. (b) The gold button moved into the dashboard header. In rc.2 the header Search was framed; in rc.3 it is the gold `.btn-gold` on every dashboard screen, desktop and mobile (dashboard/home-desktop-dark.png, projects-apollo-migration-mobile-dark.png). The agent report explains: 'the header Search button is the one gold button on every screen, since it's the app's only form submit'. (c) Scene craft in the blog hero went down. rc.2 blog/drawings/home-d1.png had multi-storey buildings with window grids, a round stepped moon and a dithered near ground. rc.3 blog/drawings/home-d1.png has bigger but flatter props (the post office front is one plain orange wall, which step 7 calls unfinished at 200%), a square checker moon, and notches in the skyline (see signature). (d) The commerce strip is squatter than rc.2 (see signature).",
    "Signature (3). Placement and motion pass. Every screen has the right placement (hero on the blog home; banners on the article, about, product detail and project detail; strips on the store, cart, dashboard and settings; vignettes on empty and error; the ground strip everywhere), and all four apps have stepped drift, twinkle, blink, a rare event and one bob or two-frame swap (shots.json motion; dashboard/motion/motion-m1.png drift at steps(100)). Reduced motion passes. Craft is still below the reference at the same size. (1) Skyline notches, a spec bug: the spec demo sets 6 sky bands × 8 units = 48 units but far-ridge tops of 40 to 52. Every column topped at 52 leaves a 4-unit gap where the stage background (`sky1`, near-black at night) shows through under the lightest band, with the ridge checker over it. These are the dark slabs floating at the horizon in blog/home-desktop-dark.png (about x=570-650 and 910-1000, y=237), about-desktop-dark.png and posts-shipping-a-design-system-d1.png (blue rectangles in light). The blog copied FAR_TOPS from the demo verbatim (app/src/art/world.ts:237), so every banner in every app has the same regular crenellated skyline. The reference ridges are irregular, layered and textured (reference/illustrations/p1-i1.png, p2-i3.png). (2) The moon or sun is a square checker block with a disc in it (blog/drawings/home-d1.png top right, posts-shipping-a-design-system-d1.png). The reference moon is a round stepped disc with a ring halo (reference/illustrations/p1-i1.png). The spec says only '2-unit checker halo', so agents draw a square. (3) The commerce strip (commerce/drawings/home-d1.png) is a row of long, low shopfronts and stall signs about 8 to 10 units tall, with dotted-noise walls. It reads as a strip of signboards, not a market street. rc.2's strip (rc.2 commerce/home-desktop-dark.png) had taller shopfronts with doors, a striped stall and lamps. (4) Ground-strip sprites all sit at the 24px minimum: dashboard cone and cable reel (dashboard/drawings/home-d2.png), settings cone (settings-profile-d2.png), blog lamp and cart (blog/drawings/home-d2.png). Spread across 1440px they read as specks. The reference's strip sprites are 48 to 56px conifers (reference/components/p1-light-footer-1.png, foot of p1-desktop-light.png). (5) The article figure (blog/drawings/posts-shipping-a-design-system-d2.png) leaves about 70% of its frame as empty flat fill above a thin ground band, with no sky bands or ridge, so it reads as unfinished next to the banner.",
    "Cross-app consistency (4): the grammar is shared, and the header switches now match. The remaining drift is the gold header Search, which appears only in the dashboard (blog and commerce use a framed Search button, and settings has no search), and the uneven strip quality: dashboard and settings strips are dense and upright, the commerce strip is flat.",
    "Hierarchy (3): blog, commerce and settings lead clearly with the scene window and h1, then content, as the reference does (reference/screenshots/p1-desktop-light.png). The dashboard does not. The gold header Search is the brightest object on every dashboard screen and pulls the eye to the header instead of the page's own action (rule 4: gold is the screen's main commit; the reference's gold is the hero CTA inside the content, not the header search, see p1-desktop-light.png). With the 32px section titles gone, the 300px solid-green chart bars outweigh the KPI numerals and the section structure (dashboard/home-desktop-dark.png vs rc.2 dashboard/home-desktop-dark.png).",
    "Spacing (4): the 4px scale, 64px sections, the window-to-h2 gap and the equal-height fixes hold. Small issues: settings/settings-billing-desktop-light.png has a half-width 'Payment method' window with an empty right half next to it, and blog/home-desktop-dark.png floats the footer tagline at the bottom right of the newsletter panel, aligned to nothing.",
    "Component states (4): designed, not defaulted. Gold 4px focus ring around danger-framed fields with pixel '!' messages (commerce/state-checkout-errors-desktop-dark.png, blog/state-newsletter-error-desktop-dark.png). Selected tab with frame and marker (dashboard/projects-apollo-migration-desktop-dark.png). A dialog window with a title bar, framed close button and gold confirm (settings/state-plan-dialog-desktop-dark.png). Empty state with a server-yard vignette, one sentence and a framed '▶ Clear filters' button (dashboard/state-empty-filter-desktop-dark.png). Current plan marked with the marker and a gold frame (settings/settings-billing-desktop-light.png). A disabled ◀ stepper on the product page. Deductions: the user menu still opens with no highlighted option, and the dashboard KPI meters encode invented ratios ('2.4 of 3.0 days last month' fills a success-coloured meter for a lead time where lower is better; agent-report.md 'Decisions'), which misreads as progress.",
    "Polish (4): no default-browser leftovers; radius, borders and shadows are right everywhere. Polish issues are listed under spacing. Scene defects are scored only under signature.",
    "Not penalized (known harness gaps): the sticky header captured mid-page (commerce/state-checkout-errors-desktop-dark.png, dashboard/state-empty-filter-desktop-dark.png, blog/state-newsletter-error-desktop-dark.png), the dialog scrim ending at about 900px in the full-page capture, and no pending request, so loading states never show."
  ],
  "promptFixes": [
    "Meter markup in lists (gate failure, spec gap): in Game-window chrome after the Block meter markup, add: 'Inside a description list the meter goes inside the dd: `<div><dt>Tasks</dt><dd><span>2 of 6 complete</span><span class=\"meter\" role=\"meter\" …></span></dd></div>`. A dl and its div groups contain only dt and dd elements; in a table the meter sits inside the td. Use span (display:flex) when the parent only allows phrasing content.' Add to Verification: 'axe shows no definition-list, list or listitem violations; every meter sits inside its dd, li or td.' Evidence: dashboard ProjectDetailPage.tsx:128-134, eval-1 dashboard accessibility.",
    "Sky meets ridge (signature, spec bug): in Pixel stage step 3, make the sky bands reach below the lowest far-ridge top: 'the last sky band runs down to the lowest far-ridge top plus 2 units (banner: bands 0 to 54, e.g. 6 bands of 9; or ridge tops 36 to 46 with 6 × 8 bands); the stage background never shows between sky and ridge.' Fix the demo's numbers to match. Also: 'Generate ridge tops per scene with irregular runs (4 to 16 units) and heights; never reuse the demo's tops array, and never repeat one period across the width.' Add to Verification: 'no horizontal gap of background colour between the last sky band and the ridge.' Evidence: blog/home-desktop-dark.png horizon slabs, blog app src/art/world.ts:237 (FAR_TOPS copied verbatim), vs reference/illustrations/p1-i1.png.",
    "Moon and sun shape (signature, spec gap): in step 3 replace 'a sun or moon with a 2-unit checker halo' with 'a stepped round disc (e.g. 10 units: rows of 4, 8, 10, 10, 10, 10, 8, 4) with 1 or 2 craters in `color.art.far`, and a stepped ring halo 2 units outside it, checkered; never a square block or a square checker field.' Evidence: blog/drawings/home-d1.png vs reference/illustrations/p1-i1.png and rc.2 blog/drawings/home-d1.png.",
    "Gold never in the header (hierarchy, spec gap plus agent decision): in rule 4 add: 'The header, search and navigation never use gold; search submits are framed buttons. A screen without a content commit has no gold button.' Add to Never: 'a gold button in the header or on search.' Add to Verification: 'the gold button sits in the page content, never in the header.' Evidence: dashboard/home-desktop-dark.png, projects-apollo-migration-mobile-dark.png, dashboard agent-report.md 'Gold button' decision.",
    "Dashboard section titles (hierarchy, agent mistake the spec already asks against): move the requirement into Verification: 'dashboard: each group of panels (chart, activity, table) is introduced by a 32/40 h2 on the dither rule outside the panel; a 12px caption inside a panel never replaces it.' Evidence: rc.3 vs rc.2 dashboard/home-desktop-dark.png.",
    "Meters need a real maximum (states, spec gap): in Block meter add: 'A meter shows a value against a real limit, target or count (quota, n of m, % of 100). Never invent a maximum to give a metric a meter; for lower-is-better metrics without a target, show the delta and no meter.' Evidence: dashboard/home-desktop-dark.png 'Median lead time' meter, agent-report.md 'KPI meters'.",
    "Strip props upright (signature, spec gap): in step 3, for the strip: 'props are 12 to 20 units tall and at most twice as wide as they are tall; a shopfront has a door, a lit window and an awning or sign above the roofline; walls are flat base + hi/shade, never per-pixel noise.' Add to step 7: 'in a strip, at least half the props are taller than they are wide.' Evidence: commerce/drawings/home-d1.png vs rc.2 commerce/home-desktop-dark.png and reference/illustrations/p2-i3.png (upright conifers and figure).",
    "Facade detail (signature): in step 4 add: 'every wall wider than 12 units carries detail: window grids, a door with a frame, a sign, siding lines every 4 units, or a 1-unit trim; a front-facing building is never one flat colour field with two windows.' Evidence: blog/drawings/home-d1.png post office vs rc.2 blog/drawings/home-d1.png buildings and reference/illustrations/p1-i1.png log cabin.",
    "Ground sprite size (signature): change the ground-strip rule from '12 to 24 units tall' to 'one sprite 20 to 24 units tall (40 to 48px), the others 14 to 24; never all at the minimum.' Evidence: dashboard/drawings/home-d2.png, settings/drawings/settings-profile-d2.png vs reference/components/p1-light-footer-1.png.",
    "Inline figure (signature): in Limits or Applying the concept, add: 'An inline prose figure is a vignette-style scene: sky bands, a ridge and ground fill its frame; the subject covers at least half the frame's width; no flat fill over 40% of the frame.' Evidence: blog/drawings/posts-shipping-a-design-system-d2.png.",
    "Highlighted option on open (states, agent mistake the spec already forbids): move into Verification: 'open each dropdown: the first option (or the current one) is highlighted with the marker and color.surface.hover as soon as it opens, before any pointer or arrow key.' Add to Navigation dropdowns: 'on open, focus moves to the first option, which shows the marker.' Evidence: dashboard/state-user-menu-open-desktop-dark.png (open since rc.2)."
  ]
}
```

## Reasons

- dashboard: accessibility = 1 (needs 0)
- critic: average 3.71 (needs 4.0), lowest 3 (needs 3)
