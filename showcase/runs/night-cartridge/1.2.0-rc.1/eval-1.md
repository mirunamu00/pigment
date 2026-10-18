# night-cartridge@1.2.0-rc.1 — evaluation 1

Verdict: **pass** · 2026-10-17T16:15:13.577Z

## blog (20261017-152451)

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

## commerce (20261017-152451)

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

## dashboard (20261017-152451)

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

## settings (20261017-152451)

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
    "Paths below are relative to showcase/runs/night-cartridge/1.2.0-rc.1/<app>/20261017-152451/. Published evidence is 1.1.0-rc.2/<app>/20261015-034853/. Gates: all pass (eval-1.md). Palette consistency is 0.917 and type consistency is 1. Dark only still holds: every *-light.png is the night theme and matches its dark twin (blog/screenshots/home-desktop-light.png, commerce/screenshots/home-desktop-light.png, settings/screenshots/state-plan-dialog-desktop-light.png). commerce/agent-report.md line 19 confirms it.",
    "Goal 1, blog hero lead identity and signs: FIXED. blog/drawings/home-d1.png shows a brick post office with an envelope pictogram plate in the gable, a flagpole with a flag, a blue pillar mailbox beside it, and lit windows plus a framed door. There are no fake-letter rows. 1.1.0 had a generic block with a 'FIMWU' glyph plate (1.1.0-rc.2 blog/drawings/home-d1.png). It now reads by shape, like the reference cabin (reference/screenshots/p1-desktop-light.png). One small gap: the mail slot, the third feature step 4 asks for, cannot be told apart at 1x.",
    "Goal 2, tall vertical inside the frame: FIXED, but only just. In blog/drawings/home-d1.png the flagpole (x≈1100) is fully in frame, and two verticals (a green cypress at x≈1365–1385 and a dark tower at x≈1400–1426) stand at the right. The tower's right edge sits at about the spec's 1424px limit (4 units in), so it hugs the frame instead of standing well inside it. The reference's tree sits well inside its frame (reference/screenshots/p1-desktop-light.png). In the article and about banners, the verticals sit well inside (blog/drawings/posts-shipping-a-design-system-d1.png, about-d1.png).",
    "Goal 3, blog hero at 390px shows the whole lead with sky: FIXED. blog/screenshots/home-mobile-light.png shows the full post office, its flag and roughly 130px of starry sky above the flag. 1.1.0 started at the roof line (1.1.0-rc.2 blog/screenshots/home-mobile-light.png). The pillar mailbox is cut by the left edge at 390px. This is minor.",
    "Goal 4, product detail sprite at 40–50% of its window: PARTLY FIXED. Desktop: commerce/screenshots/products-canvas-field-tote-desktop-light.png has a 626px window (x 72–698). The tote is 241px drawn (38.5%), or about 270px with its 1-unit outline (43%). The sweater is 287/626 = 46% (products-merino-crew-sweater-desktop-light.png). Mobile: NOT FIXED. In commerce/screenshots/products-canvas-field-tote-mobile-dark.png the tote is about 144 of 398 display px, 36% (about 39% with outline). That is up from 1.1.0's ~30% but below 40%, and far from 1.0.0's ~58%.",
    "Goal 5, garments as one connected silhouette: FIXED for the main fault, with a remainder. The sweater's sleeves now join the shoulders and body as one shape (commerce/drawings/products-merino-crew-sweater-d2.png). 1.1.0 had separate posts (1.1.0-rc.2 commerce/drawings/home-d6.png). Remaining: the ribbed cuffs and the hem band sit below a dark outline row and do not touch the sleeve or body fill. At 1x they read as three loose strips under the garment, which goes against 'one 4-connected region' in Verification. The shoulder bumps either side of the collar also read slightly like ears.",
    "Goal 6, newsletter title at heading size: FIXED. 'Subscribe to the newsletter' is a 32px heading in blog/screenshots/home-desktop-light.png and in home-mobile-light.png. 1.1.0 had a 16px label.",
    "Goal 7, store name in the mobile header: FIXED. 'Fieldhouse Supply' shows beside the cart, animation and menu buttons in commerce/screenshots/products-canvas-field-tote-mobile-dark.png and home-mobile-dark.png. The blog, dashboard and settings mobile headers keep their names too.",
    "Goal 8, hero hill rim readable at 1x: FIXED. In blog/drawings/home-d1.png a continuous light teal (sky-6) line runs along every top edge of the rise, and a path of about 9 dark steps leads down from the post office to the bottom edge. Compared with the reference (p1-desktop-light.png), the path runs nearly straight down like a dashed runway rather than the reference's long diagonal. This is a craft gap, not a regression.",
    "Goal 9, small-screen tables: FIXED to the letter, with a new weakness. dashboard/screenshots/home-mobile-light.png shows only Project, Status and Budget. Every row is one line at equal height, with an ellipsis and no clipped column. The 1.1.0 cut Status column is gone. settings/screenshots/settings-billing-mobile-light.png shows Invoice, Amount and Status cleanly. The new weakness is column widths: the identity column gets the least room. Project names collapse to about 8 characters ('Support …', 'Customer…', 'Mobile C…'), while Budget and Status keep wide spare space. The rows can no longer be told apart by name.",
    "Worse than 1.1.0, item 1, grid sprites: several are below the rule they were meant to meet. commerce/screenshots/home-desktop-light.png went from 5 to 6 columns, so the windows are 162px. Drawn silhouette widths: tote ≈49px (30%), key ring ≈50px (31%), backpack ≈57px (35%), skillet ≈57px (35%), towels ≈57px (35%). The others are 39–41%. In 1.1.0 (1.1.0-rc.2 commerce/screenshots/home-desktop-light.png) the tote was ~33% and the backpack and sweater ~41–42%. The agent sized the SVG box to 50cqi (crop boxes are 60–72px, commerce/shots.json drawings d3–d12), but the drawn silhouettes leave empty margin inside the box. commerce/agent-report.md line 31 claims '40–50%', which the image does not support.",
    "Worse than 1.1.0, item 2, the key ring sprite reads as a magnifying glass or hand mirror: a ring with a long straight fob under it (commerce/drawings/home-d3.png). The spec says 'a key ring a loop with a fob, never a rectangle with a stick'. 1.1.0's version was also ambiguous, but now the shape is clearer and still wrong.",
    "Worse than 1.1.0, item 3, card descriptions are cut to one line with an ellipsis on desktop ('A roomy everyday to…', commerce/screenshots/home-desktop-light.png) and on mobile, where there is room ('A roomy everyday tote in heavy cotton …', home-mobile-dark.png). 1.1.0 wrapped them in full. The mobile picture windows are now square (full card width), so the mobile store page grew from 10,676px to 12,668px. Each product now takes about a screen and a half, against 1.1.0's landscape windows.",
    "Worse than 1.1.0, item 4, the blog hero Window loses its frame on mobile. blog/changes.patch lines 1988–1995 set border-inline:0 and border-top:0 under 1024px, so the title block under the stage is a frameless band with only a bottom rule (blog/screenshots/home-mobile-light.png). 1.1.0 kept a framed 4px Window (1.1.0-rc.2 blog/screenshots/home-mobile-light.png). Rule 9 and Pixel stage ('the Window sits below') ask for a Window.",
    "Other remaining issues (signature). (a) The settings workshop lead carries a mark that reads as the letters 'TH' or 'T|-|' at 1x, beside the gear plate in settings/drawings/settings-profile-d1.png and beside 'PAY' in settings/screenshots/state-plan-dialog-desktop-light.png. The Never list forbids letter-like marks. If it is meant as a tool rack, it does not read as one. The 'NET' (dashboard/drawings/home-d1.png), 'SHOP' (commerce/drawings/products-canvas-field-tote-d1.png), 'POST' (blog/drawings/about-d1.png) and 'PAY' signs are real short words and follow the new rule. (b) Both product pages share one banner, as in 1.0.0 and 1.1.0 (products-canvas-field-tote-d1.png = products-merino-crew-sweater-d1.png). This is one screen type, so it is not deducted, but it sits uneasily with Never: 'the same scene on two screens'. (c) At 390px, the product-detail banner crop pushes the SHOP lead against the window's left frame, with empty ground to the right (commerce/screenshots/products-canvas-field-tote-mobile-dark.png). The focal group is visible but not centred.",
    "Other remaining issues (non-signature, carried). (a) Settings says 'A placeholder with your initials is shown until you upload a photo' above an identicon that has no initials (settings/screenshots/settings-profile-desktop-light.png). 1.1.0 at least showed a tiny 'JL' chip, so the copy now contradicts the image outright. (b) The dashboard chart is about 440px tall with saturated cyan bars. It still pulls level with the 48px KPI numbers (dashboard/screenshots/home-desktop-light.png). Bars are about 40% of their slot, so it meets the rule, as in 1.1.0. (c) The field-error icon in commerce/screenshots/state-checkout-errors-desktop-light.png is the 'warning' sprite (changes.patch line 413). At 1x it reads more like a padlock than a '!'. Low confidence; check at 2x.",
    "Signature (4). Present in all four apps and placed as Applying the concept says: a full-bleed hero on blog home; 256px banners on articles, about and product detail, each with its own lead (clock-tower post office, purple depot, green POST office); 96px strips on store, cart, dashboard and settings; a vignette on the empty state (dashboard/screenshots/state-empty-filter-desktop-light.png); and the ground strip everywhere. The hero is now clearly the reference's language: a lead on a rimmed rise, a path, a flag, a moon and stars, judged against reference/screenshots/p1-desktop-light.png. Motion: blog/motion/motion-m1.png shows nc-drift at steps(40) on the cloud and lights changing between frames. Reduced motion passes in every app. Not 3, because seven of the nine targeted craft items are fixed and the hero is the best it has been. Not 5, because of grid sprites at 30–35%, the mobile detail sprite at 36%, the loose cuffs and hem, the magnifier-like key ring and the 'TH' mark.",
    "Reference fidelity (4): night ground, cream pixel type, 4px windows, dither rules under h2s, the gold commit with a hard shadow, the gold ▶ marker, hue top bars and category icons, block meters, and the checkered grass strip. All are as in reference/screenshots/p1-desktop-light.png. The blog hero composition (framed Window left, lit building on a rise right, a path toward the viewer) is now the reference's arrangement without copying its cabin, tree or figure.",
    "Cross-app consistency (4): one family. Every app has the same header grammar, the same banner or strip window with its title block, the same ground strip and a single gold commit. The mobile wordmark drift from 1.1.0 is fixed. New drift: the blog's mobile hero Window drops its frame, while banners in the other apps keep theirs (item 4 above).",
    "Hierarchy (4): scene and h1 first, then dither h2s, and gold only on the commit. The newsletter regression is fixed. What remains small: the dashboard chart competing with the KPIs (carried), and product names in the mobile table reduced to fragments.",
    "Spacing rhythm (4): the 4px scale and the h2 rhythm hold on every screen. Forms and scene windows share widths (settings/screenshots/settings-profile-desktop-light.png). The mobile table no longer clips. Deductions are kept to notes: the starved first column, and the square mobile picture windows that stretch the store page by 19%.",
    "Component states (4): unchanged in quality. The focused invalid field has a gold 4px ring, and other invalid fields have danger frames with an icon and message (settings/screenshots/state-profile-errors-desktop-light.png, commerce/screenshots/state-checkout-errors-desktop-light.png, blog/screenshots/state-newsletter-error-desktop-light.png). The dialog has a title bar, a framed close, a framed Cancel and a gold Confirm (settings/screenshots/state-plan-dialog-desktop-light.png). The empty state has a vignette, a sentence and a framed Clear filters. The current plan has a gold-framed card and the marker (settings-billing-mobile-light.png).",
    "Polish (4): no default-browser leftovers; radius 0, 2px and 4px borders. Small things are noted above: the avatar copy contradicting the image, one-line description clamps where there is room, and the frameless mobile hero Window.",
    "Not penalized (known harness gaps): sticky headers captured mid-page in full-page state shots (settings/screenshots/state-profile-errors-desktop-light.png, commerce/screenshots/state-checkout-errors-desktop-light.png, dashboard/screenshots/state-empty-filter-desktop-light.png, blog/screenshots/state-newsletter-error-desktop-light.png); the dialog scrim ending at about 900px; no real pending request; motion frames for the blog only.",
    "Bar: seven 4s, average 4.0, none below 3. This meets the bar. Against the update goal, 7 of 9 items are fixed (lead identity, vertical in frame, 390px sky, sleeves, newsletter heading, store name, rim). The detail sprite is fixed on desktop only (mobile 36%). The small-screen tables follow the rule but starve the name column. New regressions against 1.1.0: grid sprites as small as 30%, a key ring that reads as a magnifier, clamped card descriptions, and the frameless mobile hero Window. None blocks the bar, but each has a fix below."
  ],
  "promptFixes": [
    "Signature, carried and worse in the grid (sprites measured by their box, not their drawing). In Imagery → Missing images, replace 'fills 40–50% of its window's width' with: 'its drawn silhouette (outline included) spans 40–50% of the window's inner width. The svg viewBox is cropped tight to the silhouette (no empty columns), and --w is the silhouette's width in units.' In Verification, add: 'measure the visible pixels of every grid and detail sprite at 1440px and 390px, not the svg box'. Evidence: commerce/screenshots/home-desktop-light.png (tote 49/162px = 30%, key ring 31%, backpack, skillet and towels 35%; crop boxes 60–72px in commerce/shots.json) and products-canvas-field-tote-mobile-dark.png (36%). Also an agent mistake: commerce/agent-report.md line 31 claims 40–50%. Add to the report rule: 'state the measured percentage for each sprite'.",
    "Signature, residual (garment parts joined only through outline). Extend the silhouette sentence: 'trim, cuffs, hems, ribbing and straps touch the body's fill directly; an outline row may not separate a part from the shape it belongs to'. Evidence: commerce/drawings/products-merino-crew-sweater-d2.png (cuffs and hem below a dark row) vs reference/illustrations/p2-i2.png (each subject is one solid mass).",
    "Signature, worse (the key ring reads as a magnifier). Make the outline examples testable: 'a key ring is a ring with a key or tag hanging off-axis from it; never a ring above a straight bar (that is a magnifier or mirror)'. Evidence: commerce/drawings/home-d3.png.",
    "Signature (letter-like marks survive on sign plates). In Pixel stage step 4 → Signs, add: 'every plate is exactly one of: a pictogram, one real word, or plain. No 1–2-glyph marks beside it. A tool rack is drawn as tools on a board (hammer, wrench, saw), not vertical bars that read as letters'. Evidence: settings/drawings/settings-profile-d1.png and settings/screenshots/state-plan-dialog-desktop-light.png ('TH'-like mark beside the gear and 'PAY' plates).",
    "Signature (tall verticals hug the frame). Change 'wholly inside the 1440px crop, 4+ units in' to '12+ units in from the crop edges, and not both in the outer 10% of the width'. Evidence: blog/drawings/home-d1.png (the tower's right edge at ≈1426px) vs reference/screenshots/p1-desktop-light.png (the tree well inside).",
    "Spacing/hierarchy (the small-screen table starves the identity column). In Table → Small screens, add: 'the first pinned column takes the remaining width (width:100%), and other pinned columns shrink to their content (width:1%; white-space:nowrap). The first column shows at least 16 characters at 390px.' Evidence: dashboard/screenshots/home-mobile-light.png ('Support …', 'Customer…' while Budget has spare space).",
    "Consistency/polish, regression (the mobile hero title block loses its Window frame). In Pixel stage → Hero, add: 'under breakpoint.lg the Window below the stage keeps its full 4px frame, inset by the page gutter; never a frameless band'. Evidence: blog/changes.patch lines 1988–1995 and blog/screenshots/home-mobile-light.png vs 1.1.0-rc.2 blog/screenshots/home-mobile-light.png.",
    "Hierarchy/spacing, regression (store cards clamp text, and mobile pictures got taller). In Card grid / Store row, add: 'card summaries wrap to at most 2 lines and are never cut to 1 when the card has room. Under breakpoint.sm the picture window is 4:3 (wider than tall), not square'. Evidence: commerce/screenshots/home-desktop-light.png ('A roomy everyday to…') and home-mobile-dark.png (12,668px page vs 10,676px in 1.1.0-rc.2).",
    "Polish, carried (the avatar copy contradicts the image). In Imagery → Avatars, add: 'where the product's copy promises initials, the placeholder shows the initials in pixel type on the hued square; otherwise use the hashed sprite and change no copy'. Alternatively, flag the conflicting copy in the report. Evidence: settings/screenshots/settings-profile-desktop-light.png (an identicon under 'A placeholder with your initials is shown').",
    "Signature, small (the hero path runs straight down). Change the path rule to 'a path of 3+ .haze steps, each 2–4 units sideways in the same direction, so it runs diagonally from a bottom corner toward the group'. Evidence: blog/drawings/home-d1.png (steps stacked vertically under the door) vs reference/screenshots/p1-desktop-light.png (a long diagonal path)."
  ]
}
```
