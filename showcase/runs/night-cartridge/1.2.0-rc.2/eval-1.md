# night-cartridge@1.2.0-rc.2 — evaluation 1

Verdict: **fail** · 2026-10-17T17:40:34.997Z

## blog (20261017-164852)

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

## commerce (20261017-164852)

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

## dashboard (20261017-164852)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 0.999 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261017-164852)

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
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 4,
  "signature": 3,
  "notes": [
    "Paths are relative to showcase/runs/night-cartridge/1.2.0-rc.2/<app>/20261017-164852/. The published evidence is 1.1.0-rc.2/<app>/20261015-034853/. Gates: all pass (eval-1.md). Palette consistency is 0.875 (1.2.0-rc.1: 0.917) and type consistency is 1. Dark only still holds: every *-light.png is the night theme and matches its dark twin (blog/screenshots/home-desktop-light.png, commerce/screenshots/home-desktop-light.png, settings/screenshots/state-plan-dialog-desktop-light.png). commerce/agent-report.md line 17 and blog/agent-report.md line 25 confirm it.",
    "Measurements. All are from the 1:1 desktop captures. Mobile values are converted from the downscaled captures, at about ±3%. GRID at 1440: picture windows are 162px outer and about 158px inner, 4:3 (commerce/screenshots/home-desktop-light.png). Drawn ink width ÷ inner width: tote 56px (35%), backpack 51px (32%), duffel 54px (34%), sweater 56px (35%), tee 55px (35%), chore coat 55px (35%), mug 65px (41%), skillet 53px (34%), towels 58px (37%), key ring 65px (41%), beanie 56px (35%). Only 2 of 11 are in the 40–50% range. GRID at 390: about 40–45% (commerce/screenshots/home-mobile-dark.png). This is low confidence because the capture is shown at 1/5.8 scale. DETAIL at 1440: the window is x 72–602 (about 526px inner). Tote 224px = 43% (products-canvas-field-tote-desktop-light.png). Sweater 236px = 45% (products-merino-crew-sweater-desktop-light.png). DETAIL at 390: tote about 43% (products-canvas-field-tote-mobile-dark.png), sweater about 41% (products-merino-crew-sweater-mobile-light.png). HERO verticals at 1440 (blog/drawings/home-d1.png, blog/screenshots/home-desktop-light.png): the lamp mast is at x≈1345–1365px (scene units ≈396–401) and the cypress at x≈1365–1393px (≈401–408). That puts the cypress's right edge exactly at the spec's 408-unit limit, about 12 units from the frame. Both verticals sit inside the outer 10% (x>1296px). A market stall at x≈1412–1440 is cut by the viewport edge. MOBILE HERO SKY: about 100 CSS px of sky above the flag (blog/screenshots/home-mobile-light.png; the spec asks 64+). TABLE first column at 390: dashboard/screenshots/home-mobile-light.png shows full names up to 24 characters ('Customer Onboarding Flow') with no ellipsis. Pinned columns are Project + Status, and Budget is dropped. settings/screenshots/settings-billing-mobile-light.png shows 'INV-1006' whole. CHART: the 0→200 plot is 243px tall (dashboard/screenshots/home-desktop-light.png; size.chart is 240) and bars are about 39% of their slot.",
    "Items from 1.1.0-rc.2/critic-1.json. (1) Product-detail sprite 40–50%: FIXED. 43% and 45% on desktop, about 43% and 41% at 390 (paths above). (2) Sweater sleeves detached: FIXED for the sleeves, which join the shoulders (commerce/drawings/products-merino-crew-sweater-d3.png). (3) Hero lead identity and fake lettering: FIXED. A blue post office with an envelope plate, flag, framed door with a slot and pillar mailbox (blog/drawings/home-d1.png). Banners use real words, 'NEWS' and 'MAIL' (blog/drawings/posts-release-notes-people-read-d1.png, about-d1.png). (4) Mobile hero framing: FIXED. The whole lead shows under about 100px of sky (blog/screenshots/home-mobile-light.png). (5) Hero rim at 1x: FIXED. A continuous sky-6 line along the rise in blog/drawings/home-d1.png. (6) Newsletter title: FIXED. A 32px heading in blog/screenshots/home-desktop-light.png. (7) Commerce mobile wordmark: FIXED. 'Fieldhouse Supply' shows at 390 (commerce/screenshots/products-canvas-field-tote-mobile-dark.png). (8) Mobile table: FIXED, see item (f) below.",
    "Items from 1.2.0-rc.1/critic-1.json. (a) Grid sprites measured by box, not ink: NOT FIXED. 9 of 11 grid sprites are 32–37% at 1440, against 30–35% in rc.1 (commerce/screenshots/home-desktop-light.png). The grid crops (commerce/shots.json drawings d3–d12, 60–75px boxes around 51–65px ink) show the svg boxes still carry empty margin. commerce/agent-report.md gives no percentage per sprite, although Verification asks for 'report each percentage'. This is an agent mistake against an explicit rule. (b) Cuffs and hem joined only through an outline row: NOT FIXED. In commerce/drawings/products-merino-crew-sweater-d3.png a dark outline row still separates both cuffs and the hem band from the fill above them, which breaks 'no outline row between'. The shoulder bumps either side of the collar still read as ears. At 1x in the grid (commerce/drawings/home-d9.png) the garment reads as an arch or a pair of trousers. (c) Key ring reads as a magnifier: NOT FIXED in effect. The letter of the rule is met: the leather tag hangs to one side. But a big ring with a stitched tag hanging diagonally to the lower right is the canonical magnifying-glass icon (commerce/drawings/home-d3.png, commerce/screenshots/home-desktop-light.png). (d) Letter-like mark on the settings workshop: NOT FIXED. The 'board of hammer, wrench and saw' renders at 1x as the glyphs 'TIF' or 'T|F' on the lead's wall (settings/drawings/settings-profile-d1.png, settings/screenshots/settings-billing-mobile-light.png, state-plan-dialog-desktop-light.png). This is the same fault as rc.1's 'TH'. (e) Tall verticals hug the frame: NOT FIXED. The hero's only two tall verticals both stand in the outer right 10%, which the new rule forbids by name, and the cypress ends at the 408-unit limit (blog/drawings/home-d1.png). Banner verticals sit well inside (blog/drawings/posts-shipping-a-design-system-d1.png). (f) Starved first table column: FIXED (dashboard/screenshots/home-mobile-light.png). (g) Frameless mobile hero Window: FIXED. A 4-sided frame inside the gutter (blog/screenshots/home-mobile-light.png). (h) Clamped summaries and square mobile pictures: FIXED. 2-line clamp on desktop (commerce/screenshots/home-desktop-light.png). `.product-image` is aspect-ratio 4/3 at every width (commerce/changes.patch lines 1985–1993, 2407–2408). The mobile store page is 11,612px, against rc.1's 12,668px. (i) Avatar copy vs image: FIXED. A 'JL' initials square under 'A placeholder with your initials…' (settings/screenshots/settings-profile-desktop-light.png). (j) Hero path straight down: FIXED. Steps run diagonally from the door toward the lower left (blog/drawings/home-d1.png). They end mid-ground rather than at a bottom corner, which is minor. (k) Same banner on both product pages: FIXED. A teal shop with the tote in its window vs a mirrored purple shop with the sweater (products-canvas-field-tote-desktop-light.png vs products-merino-crew-sweater-desktop-light.png). commerce/agent-report.md line 20 admits all 11 banners come from one mirrored layout, which is formulaic but within the rule. (l) Mobile banner lead pushed against the frame: FIXED. The lead is centred at 390 (products-canvas-field-tote-mobile-dark.png, products-merino-crew-sweater-mobile-light.png). (m) Chart outweighing KPIs: FIXED. A 243px plot with muted bars, and the 48px KPIs lead (dashboard/screenshots/home-desktop-light.png). (n) Error icon reading as a padlock: FIXED. A clear '!' (commerce/screenshots/state-checkout-errors-desktop-light.png, settings/screenshots/state-profile-errors-mobile-light.png). Tally: 14 of 19 items are fixed. The 5 not fixed are all signature craft: grid sprite size, cuff/hem outline row, key ring, the 'TIF' mark and hero verticals.",
    "Other issues not in either critique. (1) HIGH, signature. The Canvas Field Tote reads as a padlock: a square shackle over a body with a slot-like pocket. Its handle is also cut off from the body by a dark outline row, which breaks the 'one silhouette, straps touch the body' rule (commerce/drawings/products-canvas-field-tote-d2.png, commerce/drawings/home-d5.png). The same shape sits in the banner's shop window (commerce/screenshots/products-canvas-field-tote-desktop-light.png). 1.1.0 had the same shackle shape (1.1.0-rc.2 commerce/screenshots/products-canvas-field-tote-desktop-light.png), so this is carried. Now that the detail sprite is 43% of the window instead of about 30%, the padlock is the page's hero image. (2) MEDIUM, signature. Several other grid sprites do not read by outline at 1x. The chore coat reads as a closed book (commerce/drawings/home-d8.png). The duffel is a flat box with two posts, like a toaster (home-d12.png). The skillet is a small dot with a stub (about 34% in commerce/screenshots/home-desktop-light.png). 1.1.0's skillet was a larger, clear round pan (1.1.0-rc.2 commerce/screenshots/home-desktop-light.png). The reference's subjects read at a glance at their size (reference/illustrations/p2-i2.png). (3) LOW, consistency. The blog hero's focal group is reused almost verbatim as the 'shipping-a-design-system' banner's focal group: the same blue envelope post office with a mailbox on its left and a green cart on its right (blog/drawings/home-d1.png vs blog/drawings/posts-shipping-a-design-system-d1.png). This sits uneasily with Never: 'the same scene on two screens'. (4) LOW, worse than 1.1.0. The product detail page no longer has the Previous/Next product links that 1.1.0 showed (1.1.0-rc.2 commerce/screenshots/products-canvas-field-tote-desktop-light.png vs commerce/screenshots/products-canvas-field-tote-desktop-light.png). They are not base-app behaviour, so this is not deducted. (5) LOW. The grid went from 5 columns (1.1.0) back to 6. That shrinks the picture windows from about 196px to 162px, and the already small sprites shrink in absolute size with them. (6) LOW. blog/agent-report.md line 29 says the scene tolerances were 'checked by eye, not by measuring' and that the hero has about 55 units of open ground against the 60 asked. Verification asks for measured reports.",
    "Worse than the published 1.1.0: no blocking regressions. The items under 'other issues' (4) and (5) are minor. The grid sprites are about the same as 1.1.0 in percentage (1.1.0 tote about 33% of a 196px window), but smaller in absolute pixels.",
    "Signature (3). Present in all four apps and placed per Applying the concept: a full-bleed hero, banners on article/about/product, strips on store/cart/dashboard/settings, empty-state vignettes (dashboard/screenshots/state-empty-filter-desktop-light.png, blog/screenshots/state-search-empty-desktop-light.png) and the ground strip everywhere. Motion: blog/motion/motion-m1.png shows nc-drift steps(48) on the cloud, and the nav marker blinks via nc-swap, which is allowed. Reduced motion passes everywhere. The scenes themselves are at their best: the hero reads as the reference's arrangement (reference/screenshots/p1-desktop-light.png), with a lit lead on a rimmed rise, a diagonal path, moon and stars, and a framed Window. Why 3 and not 4: the product sprites, the most visible signature element in the store, still fail the recipe on size (9 of 11 under 40%) and on silhouette (a padlock tote, a magnifier key ring, cuffs and hem behind an outline row). The workshop still carries a letter-like mark. The hero breaks the new vertical-placement rule. These are the items this update was opened to fix, two iterations running, and a design lead who knows the reference (its subjects read at once at small size, reference/illustrations/p2-i2.png) would not ship a store whose bag reads as a lock.",
    "Reference fidelity (4): night ground, cream pixel type, 4px windows, dither h2 rules, a single gold commit with a hard shadow, the gold ▶ marker, hue top bars, block meters and the checkered grass strip, as in reference/screenshots/p1-desktop-light.png. It is derived, not copied: no cabin, figure or snow.",
    "Cross-app consistency (4): one family with the same header grammar, banner/strip window and title block, ground strip and gold commit. The mobile hero Window drift from rc.1 is fixed. Small drift: the blog reuses its hero focal group in one banner, while the other apps vary their leads.",
    "Hierarchy (4): scene and h1 first, then ruled h2s. The dashboard KPIs now lead over a 240px muted chart (dashboard/screenshots/home-desktop-light.png). Full project names are back at 390.",
    "Spacing rhythm (4): the 4px scale and h2 rhythm hold. Side-by-side panels end level (the chart and activity both end at y≈1064 in dashboard/screenshots/home-desktop-light.png). The 4:3 mobile pictures cut the store page by about 1,000px against rc.1.",
    "Component states (4): a gold focus ring on the invalid field, danger frames with a readable '!' and a message (commerce/screenshots/state-checkout-errors-desktop-light.png, settings/screenshots/state-profile-errors-mobile-light.png). A titled dialog with framed close and Cancel and a gold Confirm (settings/screenshots/state-plan-dialog-desktop-light.png). A menu opening with the marker on the first item (dashboard/screenshots/state-user-menu-open-desktop-light.png). Empty states with a vignette and a framed Clear filters. Loading is never captured (harness gap).",
    "Polish (4): radius 0, 2/4px borders, and no default-browser leftovers. The avatar contradiction is fixed. Scene and sprite craft is scored only under signature.",
    "Not penalized (known harness gaps): sticky headers captured mid-page in full-page state shots (commerce/screenshots/state-checkout-errors-desktop-light.png, dashboard/screenshots/state-empty-filter-desktop-light.png, blog/screenshots/state-search-empty-desktop-light.png, settings/screenshots/state-profile-errors-mobile-light.png); the dialog scrim ending at about 900px (settings/screenshots/state-plan-dialog-desktop-light.png); no real pending request; motion frames for the blog only.",
    "Bar: six 4s and one 3 average 3.86, below the 4.0 bar. The update goal is NOT fully reached. 14 of 19 targeted items are fixed and nothing material regressed against 1.1.0, but five signature craft items remain, and the padlock-shaped tote is now prominent on the product page. Since the same sprite and sign faults survived two rounds of rule tightening, the fix is probably a stronger mechanism (a measured gate in Verification, or shipped reference sprites) rather than more prose."
  ],
  "promptFixes": [
    "Signature, carried twice (grid sprites at 32–37%). The existing formula round(down,50cqi/--w)*--w would give about 44% on a 158px window for a 14-unit sprite, so the agent's svg boxes still carry blank columns. Prose has not moved the number twice, so make the check mechanical. In Imagery → Missing images, add: 'the viewBox's width equals the ink's width in units: column 0 and the last column each contain at least one non-empty pixel; any blank edge column fails'. Move 'measure the visible ink of every grid and detail sprite at 1440 and 390 and list each % in the report' into the ten rules, and make a missing table an explicit fail. Evidence: commerce/screenshots/home-desktop-light.png (backpack 32%, duffel 34%, skillet 34%, tote 35%), the crop boxes in commerce/shots.json (60–75px around 51–65px ink) and commerce/agent-report.md (no percentages).",
    "Signature (tote reads as a padlock, handle detached; carried from 1.1.0). Add to the outline examples: 'a tote is wider than tall, with two straps rising from the top corners of the body and meeting in an arch at least half the body's width; never one square shackle over a box (that is a padlock)'. Extend the connected-silhouette check to 'the strap's fill touches the body's fill'. Evidence: commerce/drawings/products-canvas-field-tote-d2.png and commerce/drawings/home-d5.png.",
    "Signature, carried twice (cuffs and hem behind an outline row; shoulders like ears). Replace the prose with a sprite rule the agent can check row by row: 'in a garment sprite, the row directly above a cuff or hem band is fill (base/shade), never `ol`; the outline runs only around the outside of the whole garment. The collar is a 1–2-row dip in the shoulder line, never two raised bumps'. Evidence: commerce/drawings/products-merino-crew-sweater-d3.png (dark row above both cuffs and the hem; two bumps either side of the collar).",
    "Signature, carried twice (key ring reads as a magnifier). The 'hang to one side' wording still allows the diagonal magnifier pose. Change it to 'a key ring is a small ring (≤40% of the sprite width) with a key (bow, shaft and 2+ teeth) and/or a tag hanging straight down from it; never a large ring with a single diagonal handle'. Evidence: commerce/drawings/home-d3.png.",
    "Signature, carried twice (letter-like marks on the workshop). Tools drawn at 1–2-unit stroke read as letters at 1x, whatever they are meant to be. In Pixel stage step 4 → Signs, add: 'no vertical or horizontal 1-unit bars in groups of 2–4 on any wall or board; a tool board shows tools as filled silhouettes at least 4 units in each direction (a hammer head 4×2 on a 1×4 handle), or is replaced by a pictogram plate (gear) or left plain'. Add to Verification: 'squint at each lead at 1x: if any part reads as a letter, redraw it'. Evidence: settings/drawings/settings-profile-d1.png and settings/screenshots/settings-billing-mobile-light.png ('TIF').",
    "Signature (hero verticals both in the outer 10%). The rule exists, but the agent placed both verticals in the right-hand prop cluster. Make it positional: 'in the hero, one tall vertical stands within 40 units of the focal group and the other in the far cluster; neither x span ends beyond unit 396 at the 1440 crop'. Also add: 'no prop is cut by the 1440px crop edge'. Evidence: blog/drawings/home-d1.png (mast and cypress at x≈1345–1393px, a stall cut at 1412–1440).",
    "Signature, medium (product sprites do not read at 1x). Add to Verification: 'name each grid sprite from its 1x silhouette alone; if it reads as another object (lock, magnifier, book, toaster), redraw'. Add outline examples for the common failures: 'coat: open front with lapels and a sleeve each side; duffel: a long rounded body with handles arching over the top; skillet: a pan disc at least 60% of the sprite width with a handle'. Evidence: commerce/drawings/home-d8.png (coat as a book), home-d12.png (duffel as a toaster), and the skillet at about 34% in commerce/screenshots/home-desktop-light.png vs 1.1.0-rc.2 commerce/screenshots/home-desktop-light.png.",
    "Consistency, low (the blog hero's focal group is reused in an article banner). In Recipe step 1, add: 'the hero's lead sprite and focal group appear only in the hero; banners use another variant of the world's lead'. Evidence: blog/drawings/home-d1.png vs blog/drawings/posts-shipping-a-design-system-d1.png.",
    "Process, low (agents report tolerances by eye). Verification already asks for measurements, and blog/agent-report.md line 29 and commerce/agent-report.md skip them. Move 'report measured numbers for: sprite %, vertical x spans, open-ground gaps' into the ten rules as a deliverable, with 'checked by eye' named as a failure."
  ]
}
```

## Reasons

- critic: average 3.86 (needs 4.0), lowest 3 (needs 3)
