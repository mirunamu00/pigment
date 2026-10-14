# inkleaf@1.0.0 — evaluation 3

Verdict: **fail** · 2026-10-13T22:16:48.501Z

## blog (20261013-213911)

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

## commerce (20261013-213911)

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

## dashboard (20261013-213911)

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

## settings (20261013-213911)

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
| palette-consistency | pass | 0.781 | 0.75 |
| type-consistency | pass | 0.902 | 0.7 |
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
    "Average 3.86 (4/4/4/4/4/4/3). Fails the bar (avg >= 4.0) by the same narrow margin as critic-2. No score is below 3. All gates pass (eval-3.md). Signature is still the only score below 4, but the causes have changed. The critic-2 defects are mostly fixed. The remaining gap is the hand construction the revised spec now prescribes, and two side effects of the new stage CSS and frame rules. Not counted: the invisible working glyph (harness gap, no pending request); the sticky header painted mid-page (blog state-search-empty) and the dialog scrim ending at 900px (settings state-plan-dialog); the dashboard and settings sidebar rule ending at 900px in full-page captures (a 100vh sticky element, harness artifact); title-case post and product names (test-pinned).",
    "Critic-2 issues, one by one. FIXED, defect 1 (brush tearing at large sizes): strokes on plates and stages are now solid and continuous with clean edges (blog drawings/home-d1 featured stage, home-d3..d8 plates; commerce products-canvas-field-tote-d1, home-d2 backpack, home-d8 skillet). Rendered ink is about 5 to 6px at the 302 to 416px boxes, inside the spec's 5.8 to 8.3px target at 416px and close to reference/motion/p7-v1.png. FIXED, stage size: the featured box is capped at 416px. The featured drawing no longer outweighs the masthead h1 (blog home-desktop-light). FIXED, defect 2(a): no more coil or spring fingers. FIXED, defect 2(b): the goose-like key ring is gone (commerce home-d10 is now a ring and a tab). FIXED, defect 2(c): wrists leave the stage's bottom edge (products-canvas-field-tote-d1, posts-shipping-a-design-system-d1). FIXED, defect 3: Security is now an umbrella (settings-security-d1) and Projects a clipboard in a hand (dashboard projects-d1). Both name their subject at 48px. FIXED, defect 4: plate color follows the item. 'Writing Release Notes People Actually Read' is apricot on home and in the article's related posts (blog home-desktop-light vs posts-shipping-a-design-system-desktop-light). 'The Case for Smaller Pull Requests' is lake on both. FIXED, polish: the code block renders in JetBrains Mono (blog styles.json: no bare 'monospace' family); settings invoice headers align with their cells and stacked labels start left (settings-billing-desktop-light, -mobile-light); the dashboard chart fills its card with no dead band (dashboard drawings/home-d2). FIXED, spacing: stat cards are 2x2 at 390px (dashboard home-mobile-light). FIXED, cross-app: settings collapses its sidebar into the header menu button below lg, like dashboard (settings-billing-mobile-light). FIXED, process: no agent overrode motion or edited harness config to review. Commerce kept block rise.",
    "Regressions since critic-2. (1) Header strip frame counts dropped below the spec's 12-frame minimum: dashboard steps(9) in 747ms (motion-m1, was steps(15)) and settings steps(9) in 747ms (motion-m1, was steps(12)). The cause is a spec contradiction. Recipe step 4 asks for 5 to 7 strokes at size.pictoSm, and with 3 boil frames that gives 8 to 10 frames, but step 5 asks for 12 to 24. Commerce padded with repeated end frames to reach 12 (agent-report: 'Short drawings get extra repeated end frames'). That only adds dead hold time. (2) Hand drawings are now one stamped pose. The new demo is copied almost verbatim into every hand: blog featured palette, megaphone, flag, jar and the article button (home-d1, d3, d4, d7; posts-shipping-a-design-system-d3, mirrored); commerce tote, mug, skillet, tea towels and beanie (home-d1, d7, d8, d9, d11); the three settings plan drawings (settings-billing-d2..d4). Same V palm, same four stubby fingers, same angle and position. Critic-2's hands were worse built but varied. (3) The new wrist-bottom anchor clips objects at the plate's top edge (see Signature).",
    "Signature 3. What works: all five elements are in all four apps, placed per Applying the concept (written-in h1 beside a pictoSm on every product screen; sage chart stage; lilac plan stage stacking fully at 390px; drawing stages on featured post, article and product detail; plates with each item's own drawing and a stable color). Motion steps once and holds, and it never shows a blank frame (blog motion-m2 steps(15) 1245ms, motion-m3 steps(12); commerce motion-m1 steps(12)). Small drawings stand beside the reference's small crops: umbrella, bell, clipboard, hard hat, lighthouse, camera, mailbox, lamp, pencil-in-hand (reference/illustrations/p3-i1..i3, p6-i7). It stays at 3 for these reasons:",
    "Signature, defect A: the hand is not the reference's hand. Reference hands have long, narrow hairpin fingers, roughly 4 to 5 times as long as they are wide, with visible gaps between them and swelling, tapering strokes. The hands come from any edge, in varied poses: reference/motion/p7-v1.png (V palm with four long parallel fingers), illustrations/p14-i1.png (one hand from the top, one from the bottom), p14-i2.png (a hand from the top holding a pen), p10-i5.png (two hands from the sides), p6-i7.png. The app's fingers are short, fat rounded loops, about 2 to 2.5 times as long as they are wide. They touch each other and read as a mitten or cartoon glove. Each finger also starts with a small tick that pokes past the previous finger, where one hairpin ends at the palm and the next begins 4 units away (blog drawings/home-d4, home-d7, posts-release-notes-people-read-d2; commerce home-d8, home-d9). This is a spec gap: the demo `handWithEgg` encodes exactly these proportions (finger paths ~15 units long, ~7 wide, 7 apart, each starting where the last ended). The agents built it faithfully, and recipe step 1's 'built like the demo' made them copy the pose too.",
    "Signature, defect B: large strokes are a uniform monoline. At 302 to 416px every stroke has the same width end to end and round blunt caps (blog home-d5 scissors, home-d6 clock, home-d8 bell; commerce home-d2 backpack). The reference's large ink swells and tapers. Strokes thin to a point at their ends and vary within a stroke: reference/illustrations/p15-i1.png (475px column: volutes and fluting taper), p14-i2.png, motion/p7-v1.png (finger tips and the ball's bands taper). The spec asks for this monoline ('Large strokes stay solid and continuous with even edges, the same clean line as at 96px'; lg filter scale 0.9), so this fix overcorrected. Rule 5's 'uneven weight' is lost above 160px.",
    "Signature, defect C: plate drawings clipped at the top edge. On a 4:3 plate the box is min(80%, 416px) wide and square, so it is taller than the plate (blog: box 302px, plate 283px; commerce: box 220px, plate 206px). The `.wrist-bottom` anchor pins it to the bottom, which pushes its top 14 to 19px out of the plate. Objects drawn near the box top get cut: the flag's pole and pennant run into the plate's top edge (blog drawings/home-d4), the megaphone's rim touches it (home-d3, and posts-shipping-a-design-system related posts), and the jar lid is about 10px away (home-d7). Reference drawings never crop their subject; only wrists leave the frame (p14-i1, p14-i2). The article figure plate (posts-shipping-a-design-system-d3, 799x599) shows the opposite effect: the 416px box sits on the bottom edge and leaves the top 40% an empty apricot band.",
    "Signature, defect D: silhouettes that read as something else at plate size. Ribbed Wool Beanie (commerce home-d11, home-mobile-dark) is a dome held up on a V palm and reads as a head in a hat on a little body. That is the 'round object held up like a head' the Never list forbids. Leather Key Ring (home-d10) is a circle plus a flat tab, with no key, and reads as a magnifier or a paddle. Linen Tea Towels (home-d9) reads as a can or a loaf. The megaphone's handle is two short strokes floating between the cone and the hand (blog posts-release-notes-people-read-d2), and the flag's pole stops above the hand without being gripped (home-d4). The one-word test exists only in components.md at 48px. Nothing checks plates.",
    "Reference fidelity 4. Anyone who knows the reference recognizes it: cream paper and warm ink, a text serif over a quiet sans, ink and ring buttons, pastel stages with faint wandering lines, a raised chart card on a sage stage, plan cards with small drawings on a lilac stage, cel drawings that step in. Nothing is copied: no burst, no reference names, no banned reference subjects. It is held at 4 by the hands and the monoline large strokes (defects A and B, scored under signature). The reference's most recognizable mark is its hand, and here it reads as a generic mitten.",
    "Hierarchy 4. Every screen leads with the serif h1 and its drawing, then one stage or main card. The featured drawing now sits below the h1 in visual weight (blog home-desktop-light). Plan cards with full-width ink buttons match the reference's plan row (reference p3-desktop-light), so they are not marked down. Minor: on settings Notifications, Profile and Security, and on dashboard Projects and Team, the screen is a single raised card with no highlight panel. That is allowed by the spec ('one stage per viewport' is a maximum), so it is not marked down.",
    "Spacing 4. Header grid, panel gaps, form rhythm and stage padding are consistent across apps. Stat cards are now 2x2 at 390px. Minor: in the settings invoices table at 1440px about 380px of empty space sits between Date and Amount, with about 200px trailing after Status (settings-billing-desktop-light). The base app's column widths were kept, and the spec has no rule for distributing columns.",
    "States 4. Designed in every app: clay focus rings (blog state-search-empty search field, settings state-password-mismatch confirm field); card hover with title underline (commerce state-card-hover); a user menu with an email line and a hairline before Sign out (dashboard state-user-menu-open); danger rings with inline messages plus an 'N fields need attention' line (commerce state-checkout-errors, settings state-password-mismatch); a dialog with a serif title and secondary + primary actions (settings state-plan-dialog); filtered-empty states with drawing, title and one action (blog state-search-empty, dashboard state-empty-filter-mobile-light); a strength dot; a disabled stepper minus. Minor: the dashboard empty-filter drawing (a strainer in a hand) has a stray dot to its left at 390px (state-empty-filter-mobile-light). It may be a mid-animation frame.",
    "Polish 4. The critic-2 non-drawing defects are fixed. Nothing generic or default-browser remains in the captures. Kept at 4, not 5: invoice column distribution (see spacing), and centered prose h2 ('Why we write') sitting next to a left-aligned list h2 ('The authors') on blog about-desktop-light, with no spec rule deciding which one is right.",
    "Cross-app 4. One family: paper and ink, serif h1s beside 48px drawings, ring controls, stone chips with an ink selected chip, outline status badges with dots, 16px cards, clay focus, warm dark mode with dimmed pastels (blog home-desktop-dark, commerce home-mobile-dark, dashboard team-desktop-dark). Plate drawing weight now matches the header drawings. Drift: header animations run 9 frames in dashboard and settings but 12 to 16 in blog and commerce. The commerce product detail page has no header drawing (agent decision), while every other product screen has one."
  ],
  "promptFixes": [
    "Signature, hand proportions (spec gap; replace the `handWithEgg` demo and recipe step 1). Redraw the demo fingers as long narrow hairpins measured on reference/motion/p7-v1.png: each finger one open path going out 22 to 28 units and back, its two sides 3 to 4 units apart at the tip widening to 5 at the base, fingers 9 to 11 units apart with a visible gap, lengths varying (middle longest, last shortest), each finger starting at the palm line, never at the previous finger's end. Add to step 1: 'A finger is about 4 to 5 times as long as it is wide; fingers never touch; no stub or tick where a finger meets the palm.' Add to Never: 'mitten fingers: short, fat or touching loops.'",
    "Signature, stamped pose (spec gap; recipe step 1). Replace 'built like the demo' with 'built from the demo's parts, never its pose'. Add: 'Vary the hand per drawing: it enters from the bottom, the right, the top or the side; it grips, pinches, pours or points. No two hands in one app share an angle and position. On a page of plates, at most half the plates show a hand, and neighbouring plates never show the same gesture.' Add to Verification: 'Line up every hand drawing of the app: no two share a pose.'",
    "Signature, brush taper at large sizes (spec gap; Cel-drawn ink pictogram, the 'Rendered ink line' paragraph and celStrip). Keep the gentle lg filter, and restore uneven weight by geometry, not displacement. For boxes over 160px, render each stroke as two overlapping paths: the full path at 0.75 x width, plus a copy trimmed to its middle 60% (`pathLength=\"1\" stroke-dasharray=\"0.6 1\" stroke-dashoffset=\"-0.2\"`) at full width, so strokes swell in the middle and thin toward their ends. Replace 'Large strokes stay solid and continuous with even edges, the same clean line as at 96px' with 'Large strokes stay solid and continuous with no notches, but swell and taper like a brush (reference hero: thin ends, full middles); never one uniform width with blunt round caps.'",
    "Signature, plate clipping (spec bug; Pastel stage CSS). The square box at min(80%, size.pictoHero) is taller than a 4:3 plate (80% of the width > 75%). Change the plate rule to size the box by height: `.plate .picto{width:auto; height:min(92%, var(--size-picto-hero)); aspect-ratio:1}`. Drawing stages may keep the width rule, since their 416px cap is shorter than the stage. Add to Never: 'an object cut by a plate or stage edge; only wrists and stage lines leave the frame.' Add to Verification: 'On every plate, the object's top sits at least space.16 inside the plate.'",
    "Signature, frame count for small drawings (spec contradiction; recipe steps 4 and 5). Step 4 allows 5 to 7 strokes at pictoSm, which gives 8 to 10 frames with the boil. Step 5 demands 12 to 24. Pick one rule: 'At pictoSm, each stroke after the first draws over two frames (its first half, then whole: trim with `pathLength=\"1\" stroke-dasharray=\"0.5 1\"`), giving 12 to 16 frames. Never pad with repeated frames.' Add to Verification: 'Every cel-run lasts at least 12 x motion.duration.frame.'",
    "Signature, plate silhouettes (strengthen recipe step 4's one-word test; it now covers headers only). Extend it to plates and stages: 'Write the one word for every plate drawing too. Redraw any whose word is not the product.' Name the failures seen: 'A hat or any dome held up on a V palm reads as a head on a body: draw it alone, tilted, or held from the side by its brim. A key ring needs a key on it. A folded textile shows a fold, fringe or stripe, not a cylinder.' Add to step 1: 'A held object touches the fingers or palm. Handles and poles end inside the grip, never floating between object and hand.'",
    "Stage composition (spec gap; Pastel stage). On a drawing stage or plate wider than 520px, an anchored 416px box leaves a flat empty band above the drawing (blog posts-shipping-a-design-system-d3). Add: 'When a stage or plate is wider than 520px, keep its wandering lines (plates included), or center the box vertically and run the wrist off the bottom edge with longer wrist strokes; never leave more than 35% of the stage height empty above the drawing.'",
    "Harness notes (not prompt fixes). (a) Agents report that `pigment-snap` cannot emulate reduced motion, so the spec's 'review under reduced-motion emulation' cannot be followed. Add a `--reduced-motion` flag to pigment-snap. (b) Add a capture state with a mocked 1s network response per base app, so the working glyph can be judged. (c) Capture sticky headers, sidebars and dialog scrims per viewport, or scroll before full-page captures."
  ]
}
```

## Reasons

- critic: average 3.86 (needs 4.0), lowest 3 (needs 3)
