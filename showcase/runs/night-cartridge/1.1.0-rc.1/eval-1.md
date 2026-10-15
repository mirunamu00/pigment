# night-cartridge@1.1.0-rc.1 — evaluation 1

Verdict: **fail** · 2026-10-15T03:43:26.167Z

## blog (20261015-024805)

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

## commerce (20261015-024805)

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

## dashboard (20261015-024805)

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

## settings (20261015-024805)

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

## Critic

```json
{
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 4,
  "signature": 3,
  "notes": [
    "Update goal: REACHED. Every *-light.png capture (taken with prefers-color-scheme: light) is the night theme and looks the same as its *-dark.png twin. Evidence: blog/home-desktop-light.png vs home-desktop-dark.png (pixel-identical to the eye), commerce/home-desktop-light.png, dashboard/home-desktop-light.png, settings/settings-profile-desktop-light.png, the mobile captures (blog/home-mobile-light.png, dashboard/home-mobile-light.png), and the light state captures (commerce/state-checkout-errors-desktop-light.png, settings/state-plan-dialog-desktop-light.png, dashboard/state-empty-filter-desktop-light.png, blog/state-search-empty-desktop-light.png). Compare the published evidence: rc.6 blog/home-desktop-light.png has the parchment ground and the blue/mint day sky, and that look is now gone. In code, all four changes.patch add <meta name=\"color-scheme\" content=\"dark\"> and `color-scheme: dark` on :root. No app contains `prefers-color-scheme` or `data-theme`, and no app has a theme switch; the header toggles are only Animation and Pixel body, as in 1.0.0. In the package: dist/tokens.css has one :root block with no @media; semantic.light.json is deleted; manifest tags.appearance is [\"dark\"]; agent.md line 272 and the instructions say dark only, with no light theme and no switch. The only 'day/light' strings left are in older CHANGELOG entries, which is correct history. Gates: all pass (eval-1.md).",
    "Nothing else should change, but some things did. The spec diff is limited to the theme. Run-to-run variance still produced differences from the published 1.0.0 evidence (0.1.0-rc.6/*/20261015-012753). Each difference is judged on its own below. Two of them are worse: the commerce product detail placement and product sprites, and the dashboard chart. One is better: the hero now has a tall vertical.",
    "Signature (3, down from 4). The cause is a regression in commerce, not the dark-only change. (a) The product detail page lost its banner. Applying the concept (agent.md line 327: 'Article, product detail, about | Banner Window ... | Strong') asks for a 128-unit banner. rc.6 had one (rc.6 commerce/products-canvas-field-tote-desktop-dark.png: a 256px scene with an apartment lead, tree and mast crossing the ridge). rc.1 uses the 48-unit strip instead (commerce/products-canvas-field-tote-desktop-light.png, drawings/products-canvas-field-tote-d1.png). That strip is the same arrangement as the shop and the cart: kiosk + crate, flower stall + market house, bench + barrel at the same x positions (compare commerce/drawings/home-d1.png, state-checkout-errors-desktop-light.png, products-canvas-field-tote-d1.png). Three different screens now show one identical scene, so the scene no longer 'says where you are' (rule 8). commerce/agent-report.md line 24 states this was a deliberate choice: 'every store screen, product detail included, uses the short scene strip rather than the taller banner, so the purchase controls stay near the top'. The agent could defend it with the ambiguous line 53 ('Strip ... for product screens'). That is a spec gap, and the table row it overrode is the stronger rule. (b) The product sprites in the grid are smaller and less legible than in rc.6. The skillet is now a rectangle with a stick (rc.1 commerce/home-desktop-light.png, Cast Iron Skillet card) where rc.6 drew a round pan with a rim. The key ring is a small peg (Leather Key Ring card) where rc.6 drew a loop and a fob. Sprites fill about 30% of the picture window, down from about 45% in rc.6. The reference's subjects read at a glance at their size (reference/illustrations/p2-i2.png: the figure and trees each have one clear silhouette). (c) Better than rc.6: the hero now has a tall green cypress beside a purple house at the right that crosses the far ridge (blog/drawings/home-d1.png). This is the rc.6 'hero vertical' fix and matches the reference's tall tree (reference/screenshots/p1-desktop-light.png). The hero lead is a little smaller (about 187px vs about 230px in rc.6) and still stands above the haze line. The rise under it barely separates from the near-black ground. The reference's hill has a lit rim and a visible path (p1-desktop-light.png), while here only a 1-column path shows. (d) Unchanged and fine: blog banners at about 40% height with clusters and open ground (blog/drawings/posts-shipping-a-design-system-d1.png vs reference/illustrations/p2-i2.png); settings and dashboard strips; vignettes on the empty states; the ground strip everywhere; stepped cloud drift (blog/motion/motion-m1.png, nc-drift steps(120)); reduced motion passes. Motion frames exist for the blog only (harness gap, not penalized).",
    "Reference fidelity (4): this is the reference's language. Night ground, cream pixel type, 4px windows with darker interiors, dither rules under h2s, a gold marker, hue bars on cards, block meters, the checkered grass strip, and a gold primary with a hard shadow (blog/home-desktop-light.png vs reference/screenshots/p1-desktop-light.png). Dark-only now matches the reference, which only ever shows the night. That is a fidelity gain over 1.0.0's derived day theme.",
    "Cross-app consistency (4): one family. Same header grammar (logo glyph, marker nav, Animation toggle), the same scene window plus title block on every screen, and the same ground strip. The world split holds: post office, market street, server yard, workshop. Palette consistency is 0.938 and type consistency is 1.",
    "Hierarchy (4): each screen leads with the scene window and h1, then dither h2s, then content, and gold appears only on the commit action. One thing got worse on dashboard home (dashboard/home-desktop-light.png, drawings/home-d1.png). The chart bars are now wide, saturated cyan blocks, and the y-axis values (0/50/100/150/200 in rc.6 dashboard/home-desktop-dark.png) are gone, leaving unlabelled dotted gridlines. The rc.6 critic had already called the bars the heaviest mass on the page, and they are heavier now. The reference has no comparable mass. Not deducted to 3, because the KPI numbers still read first at the top, but the item has its own prompt fix.",
    "Spacing (4): the 4px scale and the 48–64px h2 rhythm hold. Carried from rc.6, not deducted again: the settings profile form window is about 560px wide under a scene window of about 1000px in the same column, leaving a void of about 440px on the right (settings/settings-profile-desktop-light.png). rc.1 laid the fields out in two columns inside a narrower window, which made the void a little wider than rc.6's 350px. The dashboard projects table on mobile still cuts 'Priya Natarajan' at the right edge with no scroll cue (dashboard/home-mobile-light.png).",
    "Component states (4): designed and unchanged in quality. Gold 4px focus frame (blog/state-search-empty-desktop-light.png, dashboard/state-empty-filter-desktop-light.png). Danger frames with pixel '!' messages; the focused invalid field shows the gold frame (commerce/state-checkout-errors-desktop-light.png). Disabled stepper arrow. Window dialog with a title bar, framed close, framed Cancel and gold Confirm over a scrim (settings/state-plan-dialog-desktop-light.png). Inline success callout with a green bar and check (commerce/state-added-to-cart-desktop-light.png). Empty states with a vignette, a sentence and a framed Clear filters. Loading and pending states are never captured (harness gap).",
    "Polish (4): no default-browser leftovers. Radius is 0, borders are 2/4px, and the hard shadow appears only on gold buttons. The pink identicon avatar in settings (settings/settings-profile-desktop-light.png) is a pixel pattern, not a face or initials. It is legible as a placeholder and matches rc.6's approach. Scene craft is scored only under signature.",
    "Not penalized (known harness gaps): the sticky header captured mid-page in state shots (blog/state-search-empty-desktop-light.png, dashboard/state-empty-filter-desktop-light.png); the dialog scrim ending at about 900px in the full-page capture (settings/state-plan-dialog-desktop-light.png); no pending request; motion frames for the blog only.",
    "Bar: 4, 4, 4, 4, 4, 4, 3 = 3.86, below the 4.0 average. The update reached its goal cleanly, and every gate passes. The miss comes from generation variance in commerce, which a spec ambiguity made possible. It does not come from the dark-only change. One more candidate with the product-detail fix should clear the bar."
  ],
  "promptFixes": [
    "Signature regression, spec gap with an agent override (commerce product detail lost its banner; the same strip repeats on three screens). In Pixel stage, change the Strip line (agent.md line 53) from 'for product screens' to 'for store grid, cart, dashboard and settings screens; never for product detail, article or about pages, which take the Banner'. In Applying the concept, add to the 'Store grid and cart' row: 'Product detail is not a store-grid screen: it uses the Banner row above.' Add to Never: 'the same scene arrangement (same props at the same x) on two different screens; each screen's scene has its own focal group'. Evidence: commerce/products-canvas-field-tote-desktop-light.png and drawings/products-canvas-field-tote-d1.png (a 96px strip identical to drawings/home-d1.png and the cart) vs published rc.6 commerce/products-canvas-field-tote-desktop-dark.png (a 256px banner with its own lead), and commerce/agent-report.md line 24 (the agent chose the strip 'so the purchase controls stay near the top').",
    "Signature regression (product sprites shrank and lost their silhouettes). In Applying the concept → Card grid ('missing images → sprites'), add: 'a product sprite fills 40–50% of its picture window's width, and each one is identifiable by silhouette alone: a pan is round with a rim and a handle, a key ring is a loop with a fob. Never a plain rectangle with a stick.' Evidence: rc.1 commerce/home-desktop-light.png (Cast Iron Skillet is a bar and a stick; Leather Key Ring is a small peg; sprites fill about 30% of the window) vs rc.6 commerce/home-desktop-dark.png (round skillet, loop key ring, about 45%) and reference/illustrations/p2-i2.png (each subject reads at a glance by its silhouette).",
    "Hierarchy regression, non-blocking (the dashboard chart outweighs the KPIs and lost its value axis). In Data display, extend the Charts line to: 'bars are at most 40% of their slot width and use the hue at the KPI tile's bar weight, not a solid block; keep a 12px y-axis with 3–5 values on the dotted gridlines; the chart never outweighs the KPI numbers above it.' Evidence: dashboard/home-desktop-light.png and drawings/home-d1.png (wide saturated cyan bars, no y values) vs rc.6 dashboard/home-desktop-dark.png (narrower bars, labelled 0–200 axis).",
    "Signature, hero rise legibility, non-blocking (carried detail): in Hero placement, add 'the rise under the focal group gets a 1-unit lit rim (color.scene.rim) along its top edge so it separates from the near-black ground, as the reference's hill does'. Evidence: blog/drawings/home-d1.png (the post office stands on ground that reads as flat black with a 1-column path) vs reference/screenshots/p1-desktop-light.png (the cabin's hill has a lit edge and a visible diagonal path).",
    "Spacing, non-blocking (carried from rc.5 and rc.6, still open): in Spacing or the Settings row of Applying the concept, add: 'form windows and the page's scene window share one content width; if forms cap at size.form, cap the scene window to the same column, or add a helper aside so no void over space.64 remains beside the form.' Evidence: settings/settings-profile-desktop-light.png (a form window of about 560px under a scene window of about 1000px)."
  ]
}
```

## Reasons

- critic: average 3.86 (needs 4.0), lowest 3 (needs 3)
