# night-cartridge@1.1.0-rc.2 — evaluation 1

Verdict: **pass** · 2026-10-15T04:44:04.208Z

## blog (20261015-034853)

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

## commerce (20261015-034853)

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

## dashboard (20261015-034853)

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

## settings (20261015-034853)

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
| palette-consistency | pass | 0.917 | 0.75 |
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
  "signature": 4,
  "notes": [
    "Update goal (dark only): STILL REACHED. Every *-light.png capture is the night theme and matches its *-dark.png twin: blog/home-desktop-light.png, commerce/home-desktop-light.png, dashboard/home-desktop-light.png, settings/settings-profile-desktop-light.png, and the light state captures (commerce/state-checkout-errors-desktop-light.png, settings/state-plan-dialog-desktop-light.png, dashboard/state-empty-filter-desktop-light.png). In code, all four changes.patch add <meta name=\"color-scheme\" content=\"dark\">. Commerce, dashboard and settings also set `color-scheme: dark` in CSS. Blog sets only the meta, while instructions step 2 asks for it on :root as well. The effect is the same, so this is noted but not deducted. No app contains prefers-color-scheme or data-theme, and none has a theme switch. In the package: no light theme remains. visual-language.md line 266, agent.md lines 272/646/656 and instructions.md say dark only. 'Day/light' text appears only in older CHANGELOG entries, which is correct history. commerce/agent-report.md line 23 states that the light captures match the dark ones by design. Gates: all pass (eval-1.md). Palette consistency is 0.917 (rc.1: 0.938) and type consistency is 1.",
    "rc.1 regressions: FIXED. (a) The product detail page has its banner back. commerce/products-canvas-field-tote-desktop-light.png and drawings/products-canvas-field-tote-d1.png show a 256px scene: a brick apartment lead of about 103px (about 40% of the window), a blue house + cypress + crates cluster on the left, and a lamp mast + market stall + kiosk cluster on the right, with open ground between. This matches rc.6 (0.1.0-rc.6 commerce/products-canvas-field-tote-desktop-dark.png) and the clustered rhythm of reference/illustrations/p2-i2.png. The shop strip (commerce/home-desktop-light.png) and the cart strip (state-checkout-errors-desktop-light.png) now differ from each other and from the banner, as commerce/agent-report.md line 15 says ('a different focal group'), so rule 8 holds. Both product pages share one banner (products-merino-crew-sweater-desktop-light.png), but rc.6 did the same (rc.6 drawings/products-*-d1.png are identical), so this is one screen type and not a regression. (b) The product sprites in the grid are back to readable silhouettes at about 40–50% width. The skillet is a round pan with a rim and a handle (drawings/home-d10.png), the key ring is a loop with a fob, and the towels and mug read clearly (commerce/home-desktop-light.png, compared with rc.6 home-desktop-dark.png).",
    "Things that changed against the published evidence (0.1.0-rc.6/*/20261015-012753), judged one by one. BETTER: (1) The settings form window now shares the scene window's width (settings/settings-profile-desktop-light.png: both about 960px, with fields in two columns). The roughly 350px void open since rc.5 is gone. (2) The dashboard chart keeps its labelled 0–200 y-axis. Its bars are about 39% of the slot (dashboard/home-desktop-light.png), in line with rc.6. WORSE, non-blocking: (3) The blog hero lead lost its identity. rc.6's post office had an envelope sign and a flag on the roof (rc.6 blog/home-desktop-dark.png). rc.2's lead is a generic brick block whose sign is a row of illegible pseudo-glyphs (blog/drawings/home-d1.png, the 'FIMWU'-like plate above the door). The reference's cabin is identified by its shape, not by text (reference/screenshots/p1-desktop-light.png). The only tall vertical is a clock tower cut off by the viewport's right edge. rc.1's cypress is gone, so the 'hero vertical' fix did not carry over. rc.6 also lacked one, so this is no loss against the published version. (4) On the blog home mobile (blog/home-mobile-light.png), the hero stage starts at the lead's roof line with no sky above it. rc.6 (blog/home-mobile-dark.png) showed the whole building with its flag and moonlit sky above. (5) The product detail sprite is smaller: about 30% of the picture window on desktop (products-canvas-field-tote-desktop-light.png) and about 30% on mobile (products-canvas-field-tote-mobile-dark.png). rc.6 had about 34% on desktop and about 58% on mobile (rc.6 products-canvas-field-tote-mobile-dark.png). The new 40–50% rule was applied to the grid only. (6) The sweater sprite's sleeves are separate bars with a dark gap from the body (drawings/home-d6.png, products-merino-crew-sweater-desktop-light.png), so it reads as a body between two posts. rc.6's sleeves were attached (rc.6 home-desktop-dark.png). (7) The blog newsletter title shrank from an h2-size heading (rc.6 blog/home-desktop-dark.png) to a 16px label (blog/home-desktop-light.png). (8) The commerce mobile header hides the brand name (products-canvas-field-tote-mobile-dark.png), and agent-report.md line 30 says this was deliberate. The blog and dashboard mobile headers keep theirs.",
    "Signature (4, up from 3 in rc.1). Present in all four apps and placed per Applying the concept: a full-bleed hero on blog home; 256px banners on articles, about and product detail; 96px strips on the store grid, cart, dashboard and settings; vignettes on empty states (dashboard/state-empty-filter-desktop-light.png); the checkered ground strip with sparse props on every page; and the marker, dither rules, block meters and hue bars throughout. Banners match the reference's scale and clustering: blog/drawings/posts-shipping-a-design-system-d1.png has a lead of about 47% of the window height, with clusters on each side and open ground between, against reference/illustrations/p2-i2.png. Motion: stepped bob and drift are in blog/motion/motion-m1.png (nc-bob, steps(1)), and reduced motion passes in all apps. Motion frames for the other apps are missing (harness gap, not penalized). Not a 5: the craft gaps in items 3–6 above, and the hero rise still barely separates from the ground. The 1-unit rim from the rc.2 iteration is not visible at 1x in blog/drawings/home-d1.png, while the reference's hill has a lit edge and a long diagonal path (reference/screenshots/p1-desktop-light.png).",
    "Reference fidelity (4): the reference's language holds. Night ground, cream pixel type, 4px windows with darker interiors, dither rules under h2s, a gold primary with a hard shadow and the gold marker, hue bars on cards, block meters, and the checkered grass strip (blog/home-desktop-light.png vs reference/screenshots/p1-desktop-light.png). Commerce now adds per-category pixel icons beside category labels (commerce/home-desktop-light.png), as the reference's category cards do (p1-desktop-light.png: React, TS, JS icons). Being dark-only matches the reference.",
    "Cross-app consistency (4): one family with the same header grammar, the same scene window and title block, the same ground strip and the same gold commit action. The worlds stay distinct: a town for the blog, a market street for commerce, a server yard for the dashboard, a workshop for settings. One small drift: the commerce mobile header drops the wordmark that the blog and dashboard keep (item 8).",
    "Hierarchy (4): each screen leads with the scene window and h1, then dither h2s and content, and gold appears only on the commit action. The dashboard KPI numbers read before the chart, and the chart's axis is back. The only regression is the demoted newsletter title on the blog (item 7). It is minor because the newsletter is a footer block.",
    "Spacing (4): the 4px scale and the 48–64px h2 rhythm hold, and the settings void is fixed. Carried and not deducted again: the dashboard projects table on mobile (dashboard/home-mobile-light.png) still cuts off its last column. Status is now the column clipped at the right edge, with no scroll cue.",
    "Component states (4): designed and unchanged in quality. A gold 4px focus frame on the focused invalid field and salmon danger frames with pixel '!' icons (commerce/state-checkout-errors-desktop-light.png, settings/state-profile-errors-desktop-light.png). A window dialog with a title bar, framed close, framed Cancel and gold Confirm over a scrim (settings/state-plan-dialog-desktop-light.png). A menu with the marker on the current item (dashboard/state-user-menu-open-desktop-light.png). An empty state with a vignette, a sentence and a framed Clear filters (dashboard/state-empty-filter-desktop-light.png). Loading and pending states are never captured (harness gap).",
    "Polish (4): no default-browser leftovers. Radius is 0, borders are 2/4px, and the hard shadow appears only on gold buttons. One copy-to-visual mismatch was carried over from rc.6: settings says 'A placeholder with your initials is shown' over an identicon, with the initials shrunk into a tiny 'JL' chip beneath it (settings/settings-profile-desktop-light.png). Scene craft is scored only under signature.",
    "Not penalized (known harness gaps): the sticky header captured mid-page in full-page state shots (settings/state-profile-errors-desktop-light.png, commerce/state-checkout-errors-desktop-light.png, dashboard/state-empty-filter-desktop-light.png); the dialog scrim ending at about 900px (settings/state-plan-dialog-desktop-light.png); no pending request; motion frames for the blog only.",
    "Bar: seven scores of 4, average 4.0, none below 3. This meets the bar. The update reached its goal, the rc.1 signature regression is fixed, and the long-open settings spacing gap is closed. Against the published 1.0.0 evidence, four small craft regressions remain (hero lead identity, mobile hero framing, product-detail sprite size, sweater silhouette) plus one small hierarchy regression (newsletter title). None blocks the bar, but each has a fix below for a future version."
  ],
  "promptFixes": [
    "Signature, non-blocking regression (the product detail sprite is smaller than in 1.0.0 and smaller than the grid rule). Extend the rc.2 sprite rule in Applying the concept → Card grid / Product detail so it reads: 'a product sprite fills 40–50% of its picture window's width in the grid AND on the product detail page, at every breakpoint; on mobile the detail sprite scales with the window, never a fixed pixel size'. Evidence: commerce/products-canvas-field-tote-desktop-light.png (about 30%) and products-canvas-field-tote-mobile-dark.png (about 30%) vs rc.6 products-canvas-field-tote-mobile-dark.png (about 58%).",
    "Signature, non-blocking regression (the sweater's sleeves are detached posts). Add to the sprite rule: 'a sprite is one connected silhouette — parts that touch in the object (sleeves and body, handle and pan, strap and bag) share at least one unit edge; no background-colored gap inside the outline'. Evidence: commerce/drawings/home-d6.png and products-merino-crew-sweater-desktop-light.png vs rc.6 commerce/home-desktop-dark.png (sleeves attached) and reference/illustrations/p2-i2.png (each subject is one silhouette).",
    "Signature, non-blocking regression (the hero lead lost its identity and carries fake lettering). In Pixel stage, add: 'the focal lead names its world by shape and one emblem (an envelope plate, a flag, an awning, a dish), never by letters; no text-like glyph rows inside scenes'. Also make the existing rule enforceable: 'the hero has at least one tall vertical (tree, mast, tower) fully inside the stage at desktop width, not cut by the viewport edge'. Evidence: blog/drawings/home-d1.png (a generic brick block with an illegible glyph plate, and a clock tower cut at the right edge) vs rc.6 blog/home-desktop-dark.png (a post office with envelope sign and flag) and reference/screenshots/p1-desktop-light.png (a cabin read by shape, with a tall tree fully in frame).",
    "Signature, non-blocking regression (mobile hero framing). In Hero placement, add: 'under breakpoint.lg the lead's full silhouette plus at least 16 units of sky above its highest point are inside the visible stage; check home at 390px in Verification'. Evidence: blog/home-mobile-light.png (the stage starts at the lead's roof line) vs rc.6 blog/home-mobile-dark.png (the full building, flag and sky).",
    "Signature, carried (the hero rise rim is not visible at 1x). Raise the rc.2 rule from a 1-unit `.haze` rim to: 'a 2-unit `.haze` rim along the top of the rise, plus a path of at least 3 visible steps running toward the viewer'. In Verification, add 'at 1x the rise's outline is visible against the near ground'. Evidence: blog/drawings/home-d1.png vs reference/screenshots/p1-desktop-light.png (lit hill edge and long diagonal path).",
    "Hierarchy, non-blocking regression (the newsletter title is demoted). In the Blog row of Applying the concept or in Newsletter/Form windows, add: 'a standalone section window (newsletter, subscribe) opens with its title at the h2 style, not the title-bar label'. Evidence: blog/home-desktop-light.png (a 16px 'Subscribe to the newsletter' label) vs rc.6 blog/home-desktop-dark.png (an h2-size heading).",
    "Consistency, non-blocking (the commerce mobile header drops the wordmark). In Navigation → mobile, add: 'the brand glyph and name stay visible at every width; collapse the nav into the menu button instead of hiding the name'. Evidence: commerce/products-canvas-field-tote-mobile-dark.png and commerce/agent-report.md line 30 vs blog/home-mobile-light.png and dashboard/home-mobile-light.png.",
    "Spacing, carried (the mobile table cuts its last column without a cue). In Table, add: 'under breakpoint.sm, either stack rows as label/value pairs or show a right-edge fade plus a scroll hint; no column may be cut silently'. Evidence: dashboard/home-mobile-light.png (Status cut at the right edge)."
  ]
}
```
