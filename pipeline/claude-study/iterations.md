# claude-study — iteration log

One entry per authoring iteration: what changed in the package, why, and which gate or critic note it answers.

## 0.1.0-rc.1 — first authoring pass

Package `content/templates/inkleaf/0.1.0-rc.1/`, written from the approved analysis (name, five signatures, ten
rules, derivations and exclusions as approved). `pnpm harness validate`: 0 errors, 0 warnings; bundle 7,397 words
(budget 7,500 for schemaVersion 2). `pnpm check:content` passes.

What went in:
- **Tokens.** Raw colors under `palette.*` with role names (paper, line, ink, pigment, kiln, pastel, status,
  scrim); none of the reference token names (clay, cactus, heather, peach, mineral, plum) survive. Semantic
  `color.*` in light and dark, including `color.stage.*`, `color.pictogram.*`, `color.chart.*`,
  `color.accent.glyph`, `color.action.send`. Non-color primitives: serif/sans/mono families, the observed type
  scale (72 to 11px, weights 400/500 only), pixel-named spacing, radii 4 to 32, 1/2px rings, three shadows plus a
  night overlay shadow, picto sizes 24 to 416, motion durations from the 83ms cel frame to the 1328ms glyph loop,
  four easings, rise distances, breakpoints 834/992/1200.
- **Derived values (flagged in manifest provenance):** tertiary text darkened to `#6b6a64` light / `#9a9890` dark
  so it holds 4.5:1 on paper, band and cards (the reference's `#87867f` meta gray is 3.5:1; kept only as
  disabled text and checkbox/switch outline at 3:1); night stage colors; moss/ochre/harbor status colors; dark
  danger; inputs ringed with the strong line color (stronger than the reference button ring).
- **Signatures as recipes.** (1) Cel-drawn pictogram: brush look from three seeds of one
  feTurbulence/feDisplacementMap filter over round-capped strokes; frames built cumulatively from stroke data,
  each frame a different seed, stepped by CSS at 83ms, played once on 30% intersection, final frame held; boil loop
  for loading; reduced motion shows the final frame. A neutral construction demo (a cup) with an explicit "never
  ship" note, a subject list per context, and a list of the reference's best-known subjects to avoid. (2) Pastel
  stage + plate. (3) Word-by-word serif write-in that keeps text content and accessible name. (4) Status glyph
  redesigned as an original written loop (three cursive loops drawn on in 12 steps, held, cleared) — no
  starburst or asterisk; breathing dot and caret as companions. (5) Ink-and-paper ring controls.
- **Dense screens.** Applying the concept table with 16 contexts; per-app placements for dashboard (header
  drawing, one sage stage on the main chart, breathing dots), store (plates by category, stage on the detail
  image), blog (masthead drawing, stage featured image), settings (header drawing per page, lilac stage on the
  plan card). Rule 4 limits product screens to one header drawing, never one per panel.
- **Lessons carried from the previous system's critic rounds:** native inputs as the visible control
  (clickable), mobile table stacking CSS, `overflow-x: clip` at the root, `table-layout: fixed`, card grids
  `align-items: start`, browser-default chrome in the Never list, success never a bare colored word.
- **Budget work.** First bundle was 9,454 words; cut by converting the typography, motion and interaction tables
  to lists, folding component Do/Don't and repeated states into Interaction, generating the three brush filters
  in a loop, and dropping unused tokens (`space.2/56/80/192`, `breakpoint.sm/xxl`, `accent.code`,
  `motion.duration.caret`).

Open for the critic: whether agents can draw convincing pictograms from the stroke recipe alone; whether the
`is-boiling` loading state is used; dark stage values are untested on screenshots.

## 0.1.0-rc.2 — critic round 1 (avg 3.43: hierarchy, spacing, polish, signature at 3)

Package `content/templates/inkleaf/0.1.0-rc.2/`. `pnpm harness validate`: 0 errors, 0 warnings; bundle 7,476
words (budget 7,500). Every promptFix in `showcase/runs/inkleaf/0.1.0-rc.1/critic-1.json` applied:

- **Pictogram motion (signature, motion captures showed 7 blank frames then a pop).** Per-frame `<g>` animations
  replaced by one sprite strip per drawing: frames at x = k x 120 in a clipped 120-wide svg, one
  `translateX` animation with `steps(n, jump-none)` over n x `motion.duration.frame`, `forwards`; boil = the same
  strip cycling the last 3 frames. Pre-play state shows frame 0 (first stroke), never blank; no script and reduced
  motion show the final frame (`animation: none` + final translate, specificity raised with `:is()`).
- **Automation detection (blog agent disabled entrances on `navigator.webdriver`).** Never item added; Motion rule:
  in-view-on-load entrances play immediately, nothing hidden more than one frame after entering view, and under
  reduced motion no entrance hides content at all (harness page shots run with reduced motion).
- **Pictogram craft (crude marker-like drawings).** No straight segment over 15 units, boxy subjects bowed with an
  overshooting corner; a `size.pictoSm` version with 5 to 7 strokes at 4.0 to 5.0 units and a 6/5 fill offset
  (`picto--sm`). The cup demo is replaced by a hand-holding-an-egg demo (budget did not allow both).
- **Store.** Missing grid images: category outline icon `size.iconLg` bottom-left at `space.16` on the plate,
  never centered; missing detail image: `size.pictoXl` drawing directly on the stage. Store grid 2 columns under
  `breakpoint.md`, 1:1 plates, body padding `space.12`. Never: a grid of one repeated centered icon.
- **Stage limits.** Holds a chart, media, pictogram, plan cards or ghosted preview; never text-only, key-value or
  order summaries or forms; a card spans at least 60% of the inner width (no small card adrift).
- **Layout gaps.** Cart and checkout columns (items + form in main, summary side column from `breakpoint.lg`,
  sticky); product-screen header grid (drawing, h1, actions; lede `body` size spanning from the drawing's left
  edge, same in every app); header product name aligned to sidebar item text; panel rows `align-items: stretch`
  with titles inside cards; mobile table of contents after the lede and featured stage; article h2 `h4`, h3 `h5`.
- **Working glyph honesty (all three glyph agents added fake 600 to 900ms waits).** Rule 9, glyph recipe, Button
  loading and Never: glyph only while a real request is pending, inside the button replacing the label, never
  beside it, never an added delay; synchronous actions go straight to the result.
- **Status region.** Toast and Accessibility: reuse an existing `role="status"`; never add a second one.
  Existing-project step 5: never add delays, toasts or status regions the screen did not have.
- **Smaller notes.** Footer inverse band only with at least two link groups; stat change colored by meaning;
  table row hover on raised cards `color.surface.subtle`; Avatar component (40px `radius.tile`, 32px only in the
  header account button).
- **Budget.** Cut the caret companion, FAQ/toast/dialog rows of Applying the concept, the radius list, duplicated
  button-hover lines, two Never items covered by rules, and assorted wording.

Open for the critic: whether the strip animation now shows in motion frames; whether agents draw the `pictoSm`
version; whether stage-content and header rules hold across the four apps.

## 0.1.0-rc.3 — critic round 2 (avg 3.86: polish at 3; last allowed iteration)

Package `content/templates/inkleaf/0.1.0-rc.3/`. `pnpm harness validate`: 0 errors, 0 warnings; bundle 7,486
words (budget 7,500). Every promptFix in `showcase/runs/inkleaf/0.1.0-rc.2/critic-1.json` applied:

- **Empty pastel swatches (polish 3: store grid, blog plates, featured block, article figure).** The rc.2
  "plate + `size.iconLg` category icon bottom-left" rule is removed. A missing grid image is now a 4:3 plate
  (one ratio everywhere, store mobile included) holding the category's drawing at 50% of its width, final frame
  (no state classes); one drawing per category, repeats allowed only within the category; a grid without
  categories drops the media slot. Article figures without an image are omitted; diagrams and screenshots sit on
  a stage. Never: a plate or stage holding only an icon or nothing. Verification: every stage and plate holds
  content. (The critic suggested `size.pictoMd` bottom-left; the caller asked for a drawing spanning 45 to 60%
  of the plate, so it is centered at 50%.)
- **Blog featured post built as a plate.** Layout adaptation: the blog home featured post is a drawing stage
  (never a plate), 7 of 12 columns beside the text from `breakpoint.lg`, first below it. Added to Stage Where,
  Applying the concept and Verification.
- **Banner stages (article 6:1, commerce detail drawing at 27%).** `.stage` gets `aspect-ratio: 16 / 9` as a
  minimum (16:9 to 1:1, never a banner); new `stage--drawing` (4:3, drawing centered at 50% of the inner width);
  Stage Limits: a drawing spans 45 to 60%; Never: a stage flatter than 16:9, a drawing under 45%.
- **Rule 4 vs one-large-per-viewport.** Rule 4 rewritten once: prose sections open with `size.pictoLg`, list
  sections (more posts, related, archive) with the h2 alone, a second opener in one viewport is `size.pictoMd`.
  Pictogram Limits and Applying the concept point to rule 4 instead of restating a count.
- **Legibility, hands, converging subjects.** The fixed subject list (dashboard watering can, billing coin purse,
  profile hand mirror, ...) is gone; step 1 is a method: task verb, three held objects from the app's domain,
  clearest silhouette not yet drawn; never vehicles or toys; never a subject the spec names (so the examples
  cannot be copied). At least half of each app's drawings, headers included, show a hand. Step 2: draw the
  defining feature first and oversized (examples: spout and rose, kiss-lock clasp, strap loops); rectangular
  bodies 2 to 4 bowed strokes, never one rectangle path. Step 4: 48px silhouette test. Empty-state "hand with a
  magnifier" variant removed for the same reason.
- **Smaller notes.** Button: `.btn--block` keeps flex centering, never `display: block` (+ Verification at
  390px). Navigation: new Menu entry (all items `size.control`, `font: inherit`, start-aligned; sign out after a
  hairline, same size and inset). Table: toolbar spec (head row title + count; chips and search `space.16` below,
  both `size.control`, center-aligned, search label visually hidden); stacked mobile tables hide the header row
  and sort with a native "Sort by" select. Avatar: (sum of char codes) mod 3 over sage, lilac, apricot.
- **Block rise misread (blog m4).** Motion: below-the-fold blocks start hidden and rise on entry; never start
  them in their final state; only reduced motion does.
- **Not applied (harness note).** A mocked 1s network capture state to verify the working glyph is a harness
  change, not a prompt fix.
- **Budget (rc.2 + ~560 new words).** Cut duplicated limits in the glyph, write-in and ring-control recipes,
  the pictogram Motion paragraph (now one line pointing at the CSS), the connector-draw line, the browser-chrome
  Never item (components cover it), card padding in Spacing, the "Surfaces" color line, the dialog close-button
  line, the toast `size.pictoXs` option, and wording across rules, Typography, Interaction, Layout and the agent
  instructions (Existing project steps 1 and 2 merged).

Open for the critic: whether plates with category drawings read as designed rather than placeholder; whether
agents honor the hand share and the silhouette test; whether 16:9-minimum stages leave charts and plan cards
looking adrift.

## 0.1.0-rc.4 — critic round 3 (avg 3.86: polish at 3; extra iteration approved by the user)

The user approved one iteration beyond the usual three; this is the final one. Package
`content/templates/inkleaf/0.1.0-rc.4/`. Every promptFix in `showcase/runs/inkleaf/0.1.0-rc.3/critic-1.json` applied:

- **Wrong product on store cards and detail (polish).** Imagery: a missing image is the item's own subject (the
  tote a tote, the beanie a beanie), the same drawing on the plate and the detail drawing stage; a category
  drawing only when one object is true of every item; product drawings are exempt from the banned-subject lists.
  Never: one product's drawing on another product's card or detail page. Verification: read each grid card.
  Card media variant: "photo or the item's own drawing".
- **Drawings adrift on stages (polish).** Box 50% → 80% of the full width (`position: absolute; left: 10%;
  top: 50%; translate: 0 -50%`, so the 4:3 plate cannot grow and the box's empty margins clip); stated that a
  drawing fills ~60% of its box so the ink spans 45 to 60%. Never item names ink, not box.
- **Hands read as creatures (signature, polish; caused by the demo).** Demo strokes 3 and 9 rewritten: the palm's
  two sides run on as near-parallel wrist strokes leaving the box at y 126, 25 units apart; the closed bottom arc
  and the diverging stubs are gone. Step 1: open palm, wrist 18 to 26 units apart off the bottom or side edge,
  never ending in the air. Silhouette test: creature or figure means the wrist is wrong. Never: hands that read as
  creatures.
- **Stage sizing and mobile plans (polish; two agents, two answers).** `aspect-ratio: 16 / 9` moved to
  `.stage--media`; card and chart stages hug content with `space.48`/`space.24` padding. Under `breakpoint.md`
  cards on a stage stack in source order, all fully visible, the stage stays in dashboard and settings alike;
  never a horizontal strip. Rule 6 drops "16:9 to 1:1"; Never and Verification updated; Applying the concept
  settings row says "stacked on mobile". Kept source order rather than "current plan first" so focus order and
  tests do not change.
- **Converging subjects and silhouettes (signature).** Step 1: domain over generic office work, with examples;
  bans mug, magnifier, receipt, envelope, lost glove/sock/mitten unless the screen is about them; no two drawings
  in one app share a silhouette. Step 4: compare header drawings side by side at 48px (badge on a clip vs
  padlock). Step 2: straight-edged subjects out unless every edge bows. Not-found row: "drawing from the app's
  domain" instead of "something lost" (which invited the mitten). `components.md` lists subjects by screen.
- **Block rise hides content without script.** Only script hides a block (`is-rise-ready` on mount, removed at
  15% in view); blocks in view on load never hidden; no script, print, reduced motion: final. Review under
  reduced motion; no overrides; still never special-case screenshots.
- **Preview leftovers.** Verification: check drawings on the real screens; never create preview pages, galleries
  or scratch files.
- **Not applied (harness notes).** Mocked network capture for the glyph, scrolling full-page captures, cleaning
  untracked preview files.
- **Budget.** ~+430 words of fixes. Cuts: SVG path data written comma-separated without spaces (same paths,
  ~180 fewer whitespace-split words), stacked-table CSS → one sentence, Select custom menu points at Navigation
  menu, pictogram and stage Where/Motion lines, blog and article layout lines, Button Use, rule 9 offsets,
  automation Never item wording, Verification wording. Bundle 7,480 words (budget 7,500).

## 1.0.0 (pre-publish revision) — critic round 4 (avg 3.86: signature at 3, everything else 4)

1.0.0 was cut from rc.4's text without a log entry, so rc.4 critic-1's open fixes (plate color by item, stroke
weight at large sizes, a Never item against motion overrides for review) were never applied; they are applied
here together with every promptFix of `showcase/runs/inkleaf/1.0.0/critic-2.json`. Edited in place (unpublished),
no new rc. Judged against the reference per the rubric's "The reference is the measure": `motion/p7-v1.png`
(hero, ~400px, solid 6 to 9px ink, V palm with four parallel hairpin fingers), `illustrations/p15-i1.png`
(475px, 7 to 8px ink), `p14-i1/i2` (218px, 3 to 5px), `p6-i7`, `p10-i5` and the 111px crops (2 to 3px).

- **Large drawings tear (signature, defect 1; the user's main ask).** The brush displacement is in viewBox units,
  so at 3 to 6x it notched the strokes (reproduced in a scratch render at 416px). Root snippet now builds two
  filter sets: the old one for boxes up to 160px, `inkleaf-brush-lg-*` (baseFrequency 0.02, 1 octave, scale 0.9)
  above. `celStrip(data, { weight })` multiplies every stroke width: 1 up to 160px, 0.7 on plates, 0.6 on drawing
  stages and the hero; any weight under 1 takes the lg filter. Stated rendered ink targets measured on the
  reference: 2.2 to 3.2px at 96px, 3.3 to 4.7px at 200px, 5.8 to 8.3px at 416px. Never: notched, dashed or torn
  strokes, ink over the targets. Verification: zoom a plate and a drawing stage to 200%.
- **Stage drawing size (signature, hierarchy note).** Box `min(80%, size.pictoHero)`, centered with
  `left:50%; translate:-50% -50%`. Ink-span Never relaxed to 35% once the box is capped. Verification: the
  featured drawing never outweighs the h1.
- **Hands (signature, defect 2).** New demo built like the reference hero: V palm (thumb up, down into a V, up to
  the finger base), four separate near-parallel hairpin fingers 8 to 11 units apart, both wrists leaving the bottom edge (rendered and
  checked at 48, 96, 200, 416px). Step 1 rewritten to that construction, never one spiral or stacked loops.
  `.wrist-bottom` / `.wrist-right` anchor classes put the box on the plate or stage edge the wrist leaves through;
  if it cannot reach one, the object is drawn alone. Never: coil/spiral/stacked-loop fingers, a ball palm, a wrist
  ending in the air or inside a stage, a round object held up like a head (key ring, key by its bow, balloon).
- **48px silhouettes (signature, defect 3).** Step 4: in a header drawing the object is at least 70% of the ink, a
  hand grips only from the side or below, the defining feature is the largest shape (key blade not bow; unrolled
  gridded corner not a tube). One-word test written into `components.md`; redraw when the word is not the subject.
- **Plate color by item (signature, defect 4; carried from rc.4).** (sum of the item id's char codes) mod 4 over
  sage, lilac, apricot, lake; stages still rotate. Verification: same item, same plate color on two screens.
- **Polish.** Root rule `pre, code, kbd, samp` in `font.family.mono` `small` (instructions step 3, Typography);
  Verification: no text in bare `monospace`/`serif`. Table: header cells align like their cells; stacked labels and
  values start-aligned, numeric right-align reset. Layout: stretched chart cards flex so the chart fills
  (`min-height: 240px`); stat cards 2 per row under `breakpoint.md` (spacing note).
- **Review overrides (process; carried from rc.4).** Never: disabling, removing or overriding motion, editing test
  or harness config, or detecting automation to review; review under reduced-motion emulation; block rise stays on
  product screens. Same sentence leads Verification. Motion section points at it.
- **Cross-app sidebar.** Navigation: below `breakpoint.lg` the sidebar collapses into the header's `size.touch`
  menu button opening the same sheet, in every product app; never a link grid above the content.
- **Kept.** Small-drawing rules (subjects, bans, 5 to 7 strokes at 48px, fill offsets, frames, motion) unchanged.
- **Not applied (harness notes).** Mocked-network glyph capture; scrolling before full-page captures.
- **Budget.** ~+600 words of fixes. Cuts: CSS recipe blocks written without the space after property colons and
  with braces joined (same declarations), the same for inline CSS in prose; shorter Verification, Never, stage
  Limits and Motion lines, rules 1, 2, 5, 6, glyph Where, Imagery, Article and Cart layout lines, Button block
  width, Table toolbar, Avatar sizes. Bundle 7,450 words (budget 7,500).
- **Public changelog.** The 1.0.0 drawing-rules bullet now names the V palm, separate fingers, the one-word test
  and the stable plate color; a bullet for solid large drawings capped at 416px was added.

## 1.0.0 (second pre-publish revision) — critic round 5 (avg 3.86: signature at 3, everything else 4)

Applies the promptFixes of `showcase/runs/inkleaf/1.0.0/critic-3.json`, edited in place (unpublished). Judged
against `motion/p7-v1.png` (hero hand: long hairpin fingers with gaps, strokes that swell and thin), `p14-i1`/`p14-i2`
(hands from the top and bottom), `p10-i5` (hands from the sides), `p15-i1` (tapering large ink) and the `-g` crops.
Every change was rendered in a scratch page (Chromium, 48/96/200/416px, a 283px plate, a 799px stage) before writing.
Kept from the last revision: solid large lines with the gentle `lg` filter, the weight multipliers and ink targets,
wrists leaving the plate or stage edge, plate color by item, and the polish items.

- **Plate clipping (defect C; CSS bug).** The square box was `min(80%, size.pictoHero)` of the *width*, taller than a
  4:3 plate, so `.wrist-bottom` pushed objects out of the top. Now `.stage--drawing .picto, .plate .picto{width:auto;
  height:min(92%, size.pictoHero)}`, for drawing stages too (a 4:3 stage under ~740px wide had the same overflow).
  Added `wrist-top` / `wrist-left` anchors. Never: "an object cut by a plate or stage edge". Verification: the object
  stays `space.16` inside every edge. The ink-span Never is now relative to the box (under 55%), since box sizes are
  fixed by rule.
- **Stray marks from neighboring frames (found while rendering; the critic's "stray dot" beside the dashboard
  strainer).** Strokes that run past x = 120 (wrists leaving the right edge) showed in the next frame of the strip.
  Root snippet adds `<clipPath id="inkleaf-cel">` (0 0 120 120) and every frame group takes it. Verification: no
  marks from a neighboring frame.
- **Frame rule contradiction (regression 1).** Step 4 allowed 5 to 7 strokes at pictoSm while step 5 demanded 12 to
  24 frames, so agents padded with repeated frames. Now one rule: frames = strokes + 3 boil, never padded; 8 to 10 at
  `size.pictoSm`, 10 to 17 above (larger drawings 7 to 14 strokes). Took the caller's rule over the critic's
  half-stroke frames.
- **Hands (defect A, regression 2).** The `handWithEgg` demo (stubby 15x7 loops, each starting at the previous
  finger's end, plus a round object held up like a head) is replaced by `finger(x, y, deg, len)`, a hairpin
  generator (sides 5 units apart at the base, 3.5 at the tip, so 4 to 5x as long as wide) and a `leafOnHand` demo in
  the Present pose (fingers 24/28/26/21 on a knuckle line 10 units apart, no ticks). New **Hands** paragraph: parts
  instead of a pose, plus four poses as construction rules (Present, Grip with fanned fingers, Pinch, Point), each
  rotated or mirrored to enter from any edge. A test render of Grip with parallel fingers read as a coil, so the rule
  says "fanned 8 to 12°, never parallel rungs". One pose on at most a third of an app's hands, neighboring plates
  differ, at most half the plates on a page show a hand. At pictoSm: at most 3 one-stroke fingers 12 apart. Never:
  mitten fingers, ticks, a dome held up like a head, one pose on over a third. Verification: line up the hands.
- **Brush taper on large drawings (defect B).** `celStrip` with weight under 1 renders each stroke as 6 nested
  copies (`pathLength="1"`, dash spans 100% to 40% centered, widths 45% to 100%), so strokes are full in the middle
  and thin at the ends. Three layers showed shoulders at 200% zoom; six do not. Ink targets are measured at a
  stroke's middle. "Even edges" wording replaced; Never: "one uniform width with blunt ends".
- **One-word test on plates (defect D).** Now its own step covering every drawing (header, plate, stage, empty
  state) at its rendered size, naming the failures seen: hat held up as a head, a key ring without a key as a
  magnifier, folded towels as a can. A held object touches the fingers or palm; a handle ends inside the grip.
- **Empty band above drawings on wide stages.** Drawing stages and plates are capped at `size.pictoHero` x 1.25
  (520px) high, so at most 35% of the height is empty above the drawing; plates wider than 520px get wandering lines
  (`.plate` adds `isolation:isolate` so the lines stay inside). Verification checks the 35%.
- **Cross-app (header drawing on product detail).** Applying the concept, Store: a header drawing on every screen,
  detail included.
- **Not applied (harness notes).** A `--reduced-motion` flag for pigment-snap, a mocked-network glyph capture,
  per-viewport capture of sticky elements.
- **Budget.** About +650 words of fixes. Cuts: JS blocks written compactly (no spaces around operators; same code,
  executed to check: 11 strokes give 14 frames), no space after `;` or `,` in CSS blocks, shorter Hands, stage
  What/Where/Limits, Never automation item, Verification, Motion, Layout, Imagery, examples in recipe steps 1, 2 and
  4, Navigation sidebar and Table mobile lines; removed the duplicate "two header drawings with one outline" sentence
  (step 1 already bans shared silhouettes). Bundle 7,489 words by the lint's count (budget 7,500).
- **Public changelog.** The 1.0.0 drawing-rules bullet now names the hairpin fingers, the four poses, the one-third
  cap and the one-word test for every drawing; the large-drawing bullet now names the taper and height-sized boxes.
