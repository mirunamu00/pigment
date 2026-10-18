# linear-study — iteration log

One entry per authoring iteration: what changed in the package, why, and which gate or critic note it answers.

## 0.1.0-rc.1 — first package

Built from the approved analysis. Answers no gate or critic note yet (first candidate).

- Appearance both, dark canonical. Light values from the reference's docs theme; light stage, blueprint, plate and
  glyph derived in neutral cool greys (stage peak `paper.320`, mid `paper.120`, ground `paper.60`; blueprint front
  `paper.800`, back seam `paper.250`).
- Contrast-driven departures from the observed values: tertiary text lifted from the observed idle-icon grey to
  `graphite.520` (dark) / `paper.600` (light) so table heads and mono labels pass 4.5:1 up to `surface.raised`;
  control outlines `border.check` at 3:1; light status hues darkened (danger `redLight` 5.2:1 on white).
- Six signature elements as recipes with code: spotlit stage (lit + quiet), dot-matrix glyph (scan / rise / core
  loops, done / error / empty stills, dot field, dot meter), isometric hairline blueprint (`roundPoly`, `slab`,
  `link` with marching dashes and chevrons), spec plate (generative hairline figure from the item id; derived from
  the reference's monochrome news thumbnails, for missing product and post images), working shimmer and live edges,
  split opener with two-tone voice and mono figures.
- Self-review done on the recipes themselves: rendered alone at 2x in dark and light, with and without reduced motion,
  two rounds. Round 1 found the rise and core patterns too blocky (rise reached all-lit, core filled the whole 5x5)
  and the slab's 68px drop shadow leaving a visible halo; round 2 after rewriting the patterns and keeping only the
  12px shadow (sRGB filter interpolation) was clean; 0 loops running under reduced motion.
- Bundle budget: cut from 8,224 to 7,476 words (tables to lists, unused primitives removed).
- Agent instructions: mode question in the plan, self-review loop (2 rounds, 2x, temporary route never committed),
  no automation detection, no artificial delays, stage content never repeats on-screen text (smoke tests).

## 0.1.0-rc.2 — critic-1 fixes

Answers the rc.1 run (avg 3.71; componentStates 3, polish 3; dashboard functional-preservation gate failed) by applying
every promptFix in `showcase/runs/graphite-blueprint/0.1.0-rc.1/critic-1.json`.

- Gate (dashboard e2e, stretched `label::after` over the task checkbox): Checkbox → Implementation now builds the hit
  area by wrapping input + text in the `<label>` or padding the label, and bans overlays over native controls; if a
  row has an overlay its controls get `position:relative;z-index:1`. Same rule added to Card → States and to Never.
  Verification: click the box itself, run the project's e2e command or report it was not run. Accessibility no longer
  suggests a pseudo-element for touch targets (padding only).
- Polish (cart count blank in both modes, `.badge` overriding `.badge-count`): Badge gets a separate `.count` class
  with a CSS block, never combined with `.badge`, numeral 4.5:1 in both modes; Verification checks every badge, chip
  and count at 2x.
- Polish (captions explaining the system): Spec plate → Limits and Never ban "spec figure", "drawn from the id",
  "until photography is ready"; the stage caption example now reads "Item name / One fact about it".
- Polish (card → stage → window, dead band under the chart; plate inside the blog featured card): Stage → Limits says
  a stage sits on the ground or in one hairline cell, a panel whose content is a quiet stage drops its border and fill,
  rows `align-items:start`; Never bans frames more than two deep; Applying → Dashboard and Blog rows updated.
- Signature conflict (blog featured post): picked the wide plate; removed "blog featured post" from Stage → Where.
- Signature (pillowy slabs): `r=w*0.08, s=w*0.05` (was 0.14 / 0.07); What says about 8%, machined; review loop checks
  tight vertices.
- Signature (fan figure off-centre): fan origin fixed at x 80, y 96, angles -160° to -20° in 17 steps, length
  66-78 (critic suggested x 68-92, y 104; y 96 and a fixed x centre the bbox exactly); What: bounding box centred,
  inside the central 78%.
- Signature (static about-page connector): Blueprint → Motion states every connector marches, the illustrative one in
  an opener row included; only a stopped connection is static.
- Spacing (mobile table squeeze): Table → Small screens: first column nowrap, min-width 160px, scroll in wrapper,
  cells at most 2 lines.
- Budget: additions took the bundle to 7,884 words; compressed back to under 7,500 without dropping a rule
  (component states that repeated Interaction now point to it; duplicate wording in rules, Never, Motion, Shape,
  Layout and the Applying table merged; unused primitives `space.64`, `motion.easing.inOut`, `motion.distance.flow`
  removed).

## 0.1.0-rc.3 — critic-1 fixes

Answers the rc.2 run (avg 3.86; polish 3, all else 4; all gates green) by applying every promptFix in
`showcase/runs/graphite-blueprint/0.1.0-rc.2/critic-1.json`. All rc.1 fixes kept.

- Polish, blocking (dashboard hole, 670x195px of ground under the chart stage, caused by the rc.2 `align-items:start`
  rule): Stage → Limits now has one rule reconciling both rc.2 and rc.3 notes: panels in a row end together (stage
  column a flex column, stage `flex:1`, window and chart grow to the row height, at least `size.stageMini`; or the
  list is capped with "View all →"), no empty band inside a panel, no column more than `space.48` short. Stage recipe:
  `.stage--quiet` is a flex column, its window `flex:1`. Applying → Dashboard: chart and activity end on one line, else
  the chart spans the row. Verification: at 1440px columns end within 48px.
- Polish, blocking (pinned columns slicing text on mobile): Table → Small screens: pinned column opaque with `--pin-bg`
  (surface default, card inside a card), 1px subtle edge, 16px gradient fade via `::before`, row tint layered on hover
  (CSS block); under `breakpoint.sm` secondary columns hidden, a kept value shown via `content:attr(data-sub)` so text
  is never duplicated in the DOM (smoke tests). Verification: no cell cut mid-letter at 390px.
- Signature (lost store dot-field closing): Applying → Closing row now "newsletter, store and blog lists"; Store grid
  row ends with the closing.
- Signature (plates alike): 8 figure kinds (bars, perspective grid, latitude-ring sphere, square lattice added; all
  bboxes centred on 80,60, checked in node); `specKinds(ids)` assigns kinds over the catalog order so no kind repeats
  the 4 before it (covers left and above neighbours in 2 to 4 columns) while each id keeps one kind everywhere.
- Signature (small blueprint): Blueprint → Limits: half-widths are rendered px, at least 40; slabs side by side get
  `size.blueprintMd` each; a narrow column shows one slab and the connector.
- Component states (bare commerce error summary): Text field: the failed-submit summary is the danger banner on every
  form, checkout included.
- Budget: additions took agent.md to 7,851 words; compressed to under 7,500 without dropping a rule (recipe-duplicated
  values removed from What paragraphs, component motion now points to Motion, Verification items already covered by
  the ten rules folded into "walk the ten rules", duplicate lines in Never/Imagery/Layout/Accessibility removed).


## 2026-10-17 — update: leftovers from the 1.0.0 review (1.1.0)

Goal: fix the three non-blocking issues the rc.3 critique left open (`showcase/runs/graphite-blueprint/0.1.0-rc.3/critic-1.json`),
so none remains:
- Mobile tables: on the dashboard team page the email line runs under the pinned column and is cut
  mid-letter, and two rows grow ~30px taller; on mobile projects a ghost "$" from the budget column shows beside
  the pinned Status column. Rule: under `breakpoint.sm` only the first column and the pinned one stay; long
  values end with an ellipsis; no other column's content may show.
- Blog about page: the three blueprints render ~190px and slabs ~100px against the spec's 280px / 160px. Add a
  rendered-width check to Verification and make the size rule unambiguous.

### 1.1.0-rc.1

Answers the two promptFixes of `showcase/runs/graphite-blueprint/0.1.0-rc.3/critic-1.json` (polish: residual
pinned-column clipping on dashboard team and projects at 390px; signature: about-page blueprints at ~190px / ~100px
per slab).
- Table → Small screens: under `breakpoint.sm` only the first and the pinned column show, every other `th`/`td`
  `display:none` (the ghost "$" came from a scrolled Budget column); the first cell is `width:100%;max-width:0` with
  the pin `width:1%`, so its lines end in an ellipsis instead of running under the pin; at most two single-line lines
  (own second span, else `data-sub`), and every row gets the same line count (`data-sub=""`), so rows are equal.
  New CSS block in the recipe.
- Signature 3 → Limits: sizes are rendered CSS px (`getBoundingClientRect().width`), not viewBox units: row of three
  `svg.bp--lg` at `size.blueprintLg` or the full column, never under `size.blueprintMd`; each `.bp-slab` of a pair
  (`svg.bp--pair`) at least `size.blueprintMd`, else one slab and the connector. `.bp-row`/`.bp--lg`/`.bp--pair` CSS.
- Verification: tables at 390px (two columns, no stray glyph, no cut word except by ellipsis, equal rows) and a
  measured width for every blueprint and pair slab at 1440px and 390px; the old "no table cell cut mid-letter" folded in.
- Budget: 7,490 words (validator count) after cutting duplicated lines; no rule dropped.

### 1.1.0-rc.2

Answers the rc.1 run (`showcase/runs/graphite-blueprint/1.1.0-rc.1/critic-1.json`, avg 3.57: hierarchy, polish and
signature at 3). Goals (a) and (b) held; (c) was fixed only on paper, and rc.1's budget cuts removed working rules
from 1.0.0 that the regressions map to. All rc.1 mobile-table rules kept.
- Restored from 1.0.0 (each checked against the 0.1.0-rc.3 run): "Closing sections: the dot field" (team/closing dot
  signatures), "Closing statement: `display` size", "never bare red text" (plus "every failed submit, one-field forms
  too": blog newsletter error had no banner), the checkbox `z-index` note, the Motion pointer line, "(actions column
  pinned)", the dashboard fallback wording, the `specKinds` comment, "or emoji in copy", the empty-state test-id
  note. Not restored, true duplicates: stage gradient stops (in the recipe CSS), "at least `size.stageMini`" in Stage
  → Where (in Limits), plate `aria-hidden` (Accessibility), "a background-job toast title" (Toast → States), the
  longer Character line (the manifest description opens the bundle), "Build all six first" (New project step 4).
- Signature (c), promptFix 1: Blueprint recipe gains `blueprint(inner, boxes, cls)`, which crops the viewBox to the
  slabs' bounds (x cx±w, y top vertex to y+w+h) plus 5% and wraps the figure in `g.bp-fig` (figure = 91% of the svg,
  checked in node: stack viewBox 32 12 176 164, pair -96 -16 352 212). Limits: size is the drawn figure, at least 85%
  of the svg, about 270px in a row of three (at least 240px at 1440px, 85% of the column at 390px).
  `size.blueprintLg` 280px → 300px (300 × 0.91 ≈ 273px, the reference's ~270px). `.bp-row` columns now
  `minmax(min(100%, blueprintLg), 1fr)`; `.bp--lg` full width under `breakpoint.sm`; `.bp--md`, `.bp--sm` added.
  Verification measures `.bp-fig` getBoundingClientRect width at 1440px and 390px and reports it.
- Signature, promptFix 2: new `pair(cx,y,w,h)` puts slab 2 at 2w right and w down on the isometric axis with a
  marching link between their sides (rendered and checked: ~70px of visible connector at 300px; slabs half the figure
  each, ~136px, vs rc.3's ~105px). `.bp--pair` and its 368px min-width removed (it could not fit a 350px phone column,
  the likely reason rc.1's agent dropped the pair). Where: the about row is a stack, a connected pair and a box, never
  two that differ only in slab count; 1-2-3 tier stacks only on plan cards.
- Polish, promptFix 3 (mobile nav clipped): Navigation → Sidebar under `breakpoint.lg`: text-only pills that wrap so
  every item shows at 390px; over 6 items one pill named after the current page opens the sheet; never a clipped or
  scrolling row. Verification: every nav item, the current one included, visible at 390px. (Chose wrap over a
  scroll-with-fade row: rc.3's wrapped row was the good result.)
- Polish, promptFix 4 (badge in the pin): Table: a badge naming the row stays in the first cell after the primary
  value with its dot (markup: after `.cell-lines`, `flex:none`); the pin holds one action or one status (else the key
  number), right-aligned (`text-align:right` in `.pin`), empty when a row has no action; row actions are bordered
  pills at every width (was "ghost pills", which read as bare text).
- Polish, promptFix 5 (radio circles in segments): Tabs → segmented: native radios visually hidden
  (`position:absolute;opacity:0;width:1px;height:1px`), `:has(:checked)` / `:has(:focus-visible)`; Never: a radio
  circle or indigo dot in a segmented option; Checkbox points segmented radios to Tabs.
- Hierarchy, promptFix 6 (section openers demoted): Signature 6 → Limits rewritten: every content section down the
  page opens with the full opener (48px h2, description right), filters or counts never replace the description,
  section h2s never shrink to protect the h1, no second h2-size headline in a section. Applying → Blog said "Plates,
  one opener", which also read as permission to drop section openers: now "an opener per section".
- Polish, promptFix 7 (double hairlines): `.screen-head+*, .screen-head+* :is(thead th,.tbl){border-top:0}` in the
  recipe; Never: two hairlines under 32px apart with nothing between.
- Signature, promptFix 8: Spec plate caption is number and one fact (`FIG 03 · 18 OZ CANVAS`, `NO. 07 · DESIGN`),
  never the number or category alone; Applying → Data table and Glyph → Where: a 1-to-5 load shows the dot meter.
- Cross-app, promptFix 9: Signature 6 → Where and Applying → Cart: app section heads with counter and title left, a
  one-line description right; Text field: banner on every failed submit, one field included.
- Process (ReviewPage left on disk): Verification's last step deletes every review route, page and script and checks
  the diff.
- Budget: additions took agent.md to 7,984 words; cut to 7,494 (validator count) by removing true duplicates only
  (surface map in Color use, quiet-stage and glyph/dot-field values repeated from the recipes, the elevation mapping
  shown in the tokens, Interaction lines for tabs, menu items and checked controls, the Applying dialog row (its "no
  drawings" moved to Blueprint → Limits), Never's "any loop for work that is not running" (rule 8), rule 5's
  "nothing above `radius.xl`" (Never), verification items repeated by the ten rules) and tighter wording.

### 1.1.0-rc.3

Answers the rc.2 run (`showcase/runs/graphite-blueprint/1.1.0-rc.2/critic-1.json`, all seven at 4, bar cleared). All
three update goals and the nine rc.1 fixes kept; no working rule cut. Every promptFix applied:
- NOT FIXED, sessions badge cuts "Active now" (promptFix 1, the spec's own markup "then a row badge (`flex:none`)"):
  Table now puts the badge inline at the end of the first line's span (`margin-left:space.8`), dot only under
  `breakpoint.sm` (`.cell-lines .badge-label{position:absolute;clip:rect(0 0 0 0)}`), never beside the lines; Badge
  gets a `.badge-label` span. Verification: a badged row's second line uncut at 390px.
- Pin width and head alignment (promptFix 2): pin head one short word or `.sr-only` (new class in the recipe), pin at
  most widest value + `space.24`; `.pin` on the `th` too and the selector raised to `.tbl .pin` so `.tbl th{text-align:left}`
  can't win.
- Blog closing at 32px (promptFix 3): Never gains "a closing statement under `font.size.h2`"; Typography gives the
  clamp, 1-2 sentences, longer copy in the helper line.
- Double FIG on product detail and the name twice (promptFix 4, worse than published): Spec plate Limits: one figure
  number per plate, item name once per viewport (breadcrumbs aside). Product detail also lost the `BAGS · IN STOCK`
  meta and the 01/02/03 Details numbers that the published run had
  (`0.1.0-rc.3/commerce/20261017-095917/app/src/pages/ProductDetailPage.tsx`, screenshot
  products-canvas-field-tote-desktop-light.png); neither was ever in the spec, so Applying → Product detail now names
  both.
- Legend indent and lone "like." (promptFix 5): root setup resets fieldset/legend, headings `text-wrap:balance`,
  `p, li` `text-wrap:pretty`.
- KPI label wrap (promptFix 6): Card → KPI label one line with ellipsis and `title`; shorter or one per row under
  `breakpoint.sm`. Verification: KPI values level at 390px.
- Plate motif repeats (promptFix 7): `specKinds` window 4 → 7 (a kind repeats only after all 8), over the full list
  with the featured item; Limits: no shared kind in a grid row or adjacent posts.
- ReviewPage stub (promptFix 8): the run's agent cannot delete files, so Verification now says never create a review
  file; temporarily edit an existing route's page, capture, undo the edit; check the diff. Fonts: self-hosted in every
  app, never a font CDN (New project step 3; Existing step 2 points to it).
- Other remaining (d): Layout adaptation: a preview, banner or panel stacked in a form column takes the form's width.
- Not addressed: the 80px vs 48px gap before Payment method (minor, the Spacing rule already says 48); drawing-crop
  numbering (harness).
- Budget: 7,718 words after additions; 7,493 (validator count) after cutting true duplicates only: Character (the
  manifest description opens the bundle), Verification's recipe values and token-file check (Ongoing development),
  "build and tests pass" merged with the e2e line, Shape's checkbox/toast radii (components), Sig 6 "(2 lines at
  most)" (rule 6), Sig 3 "at `size.blueprintLg`" and "a pair's slabs half the figure" (Limits, `pair()`), "marching
  while connected" (Motion), Sig 4 caption examples (Never), Sig 2 "never decorative or idle" (rule 8), Motion's
  "script-armed reveals" (Never), Tabs "never a drawn circle" (Never), checkbox overlay CSS (Never), Applying rows that
  restated `.screen-head` and Table anatomy, step 4's piece list (the recipes name them), comments that restated prose.

### 1.1.0-rc.4

Answers the rc.3 run (`showcase/runs/graphite-blueprint/1.1.0-rc.3/critic-1.json`, all seven at 4, bar cleared). Every
rc.3 fix and earlier item kept; nothing working cut. Every promptFix applied:
- (A) 6-line mobile closing, a spec conflict the blog agent reported (promptFix 1). One rule, in Typography: the
  closing keeps `clamp(h2, 6vw, display)` and its copy is at most 24 characters ("New posts. One email.", "Free
  shipping over $100."), so it is at most 2 lines and 48px at 390px; longer copy goes in the form's helper line.
  This follows the caller's "stay at h2 or larger" and keeps the Never "a closing under `font.size.h2`", instead of the
  critic's h3 floor; the 2-line limit holds either way. Verification: closing at most 2 lines at 390px.
- (B) about-row captions out of line (promptFix 2): `.bp-row` gets `align-items:start`, and each `figure` becomes a
  3-row subgrid (caption, svg aligned to the bottom, title and text), so captions, figure bases and titles line up
  whatever the text length. Sig 3 → Where: "captions and titles level across the row". Verification.
- (C) prose below the figures in one half, and a description that repeats the prose (promptFix 3): Sig 6 → Limits:
  a section's prose follows its opener (right column under the description, or at `size.measure` from the left
  edge), never below a figure row in one half; the description never repeats the prose's first sentence. Verification.
- (D, E) contents list above the h1 on mobile; lead plate dropped (promptFix 4): new Applying → Article row:
  breadcrumb, h1, meta, lead plate (`plate--wide`, `NO. 05 · TOPIC`); contents list as a side rail from
  `breakpoint.lg`, else after the plate in a closed `<details>`, never above the h1. Sig 4 → Where names the lead
  plate. Verification.
- NOT FIXED, sortable head offset (promptFix 5): Table → Sort: in a right-aligned head the chevron comes first
  (`.sort-button{display:inline-flex;flex-direction:row-reverse;padding-inline:0}`) so the label ends on the cells'
  edge. Verification.
- (F) banner far from the fields (promptFix 6): Text field → Error: the banner sits directly above the actions; focus
  moves to the first invalid field, scrolled into view; if that field is over one viewport above the banner, the banner
  also opens the form. Layout: a preview in a form column sits above the fields, never between them and the actions.
  Verification.
- NOT FIXED, billing gap (promptFix 7): Spacing: settings groups are `space.48` from one group's last content (card
  grids too, no margin under a grid) to the next hairline. Verification: all settings group gaps 48px.
- Blueprint craft (promptFix 8): `slab()` draws the front vertical edge (`.bp-edge`, `color.blueprint.front`) and, when
  h ≥ 0.3w, a rib round the side faces in the seam.
- Measuring (promptFix 9): Verification runs `document.querySelectorAll('.bp-fig')` → `getBoundingClientRect().width`
  in the browser and pastes the numbers; a width computed from CSS does not count.
- Budget: about 7,800 words (validator count) after the additions; 7,497 after cutting true duplicates and tighter wording only: the Applying
  "App screen header" row (Sig 6 → Where), Sig 2 → Where's button, row, toast and empty placements (their components),
  Sig 3's "Empty states" (moved to Empty state with its `opacity:0.8`) and "confirmation" (Applying → Cart), Sig 4's
  "Captions never describe the drawing" (Never), Sig 5's async check (Text field), Badge's live edge (Sig 5) and
  4.5:1 note (Accessibility), Card's title type (Typography), "Never a clipped nav row" (Verification), "Nothing depends
  on motion", rule 1's hairline (rule 4), Sig 1 Limits' 48px column gap (Verification), restated recipe comments,
  "status icons, mono timestamps", "mono counts, dot meter for strength", `.screen-head` in Applying rows, Existing
  step 4's "spinners become glyphs" (rule 8, Sig 4), Sig 6's mono examples (rule 6, Sig 6 → Where), KPI "never a colored
  number" (Color use). The Applying "Blog, article" row is now "Blog", with the new Article row under it.

### 1.1.0-rc.5

Answers the rc.4 run (`showcase/runs/graphite-blueprint/1.1.0-rc.4/critic-1.json`, all seven at 4, bar cleared, every
earlier item FIXED, no regressions). Every rc.4 rule kept; only true duplicates cut; no Verification line removed.
- N1 "Featured" became an h2 opener (promptFix 1): Sig 6 → Limits: a content home's featured block continues the
  masthead, a "FEATURED" `.mono-label` over its plate and text, no h2; one large headline in the first viewport, plate
  top above 900px at 1440px. Applying → Blog row says the same. Verification: one large headline in the first viewport.
- N2 sans result counts (promptFix 2): Typography: counts, result lines and the label over a closing are uppercase
  `.mono-label` in every app. Verification (Check line): the same mono caption across apps.
- N3 hidden pin head (promptFix 3, with the caller's alternative): Table → Small screens: the pin head is one short
  visible mono word, or the value carries its unit ("4 projects") under an `.sr-only` head; only an actions pin's head
  may be empty. Verification: every pin head readable.
- N4 echoing description and doubled link (promptFix 4): Sig 6 → Limits: prose beside an opener is one paragraph,
  longer prose under it at `size.measure`; the description repeats no phrase of the prose; each destination linked once
  per section. Verification: no phrase or link twice in a section.
- N5 mid-phrase dim (promptFix 5): Typography → Closing: two sentences of at most 12 characters, each one tone in a
  `white-space:nowrap` span (first in `<b>`), one line from `breakpoint.lg` (no max-width under it), two at 390px,
  breaking only between sentences. Store example now "Over $100? Ships free.". Verification: one line at 1440px, one
  tone per sentence.
- N6 unclear banner wording (promptFix 6): Text field → Error: if the first invalid field is more than one viewport
  above the banner, repeat the banner as the form's first child (above the first group), keeping the one above the
  actions. The Verification focus check now reads "a banner within one viewport of it" so it holds for both cases.
- Spacing (security form ~60px): settings groups are `space.48` from a form's actions too. Verification: "after form
  actions too".
- N8 payment card narrower than plans/invoices: Layout: cards, grids and tables in a settings group span the controls
  column's full width; `size.form` stays for fields, their banner and preview ("a preview or banner", no longer "panel").
- Measuring (promptFix 7, harness gap): Verification accepts a browser `getBoundingClientRect()` or a 2x screenshot at
  native size (leftmost to rightmost stroke in pixels ÷ 2); paste numbers and method; CSS-computed widths still do not count.
- Budget: 7,793 words after the additions, 7,498 (validator count) after cutting true duplicates and tighter wording:
  pointer sentences (Sig 2 → Where's component list and dot field, Motion's "signatures 1, 2, 3, 5", Layout's "Wide
  tables", Checkbox's "see Tabs", Navigation's "(Shape and depth)", "(Badge)", Card's "title per Typography", Applying's
  "(Signature 6 → Where)"), Color use's Appearance bullet (New project step 1 and Ongoing's semantic-token rule), Data
  table's pin note (Table), Article row's caption example (Sig 4 What), Empty state's and Checkbox's test-id notes
  (Existing step 5), Button's and Toast's status-region notes (Accessibility), Checkbox's stretched-link note (Card),
  Card's KPI value type (Typography), Switch's group count (Typography counts), the bp viewBox comment (Sig 3 Limits),
  step 2's "never retype" (bundle intro), Sig 6 Where's content-section placements (Applying, closing pills moved
  there), Sig 4 Where folded; tighter Table → Small screens, Sig 6 Limits, Sig 1, Sig 3 Motion, Never, review loop.

### 1.1.0-rc.6

Answers the rc.5 run (`showcase/runs/graphite-blueprint/1.1.0-rc.5/critic-1.json`: 4, 4, 4, 3, 4, 3, 4, average 3.71,
bar not cleared; three earlier fixes regressed). The evaluation now judges three samples per app, so each fix is made
mechanical (recipe CSS) where it can be, with a pasted measurement in Verification. Every rc.5 rule kept.
- N9 pin head 16px off (promptFix 1, regression of rc.2/rc.3): Table → recipe CSS `.tbl .sort-button{inline-flex;gap 4;
  padding-inline:0}` and `.tbl :is(.num,.pin) .sort-button{flex-direction:row-reverse}`; `.num` named on `th` and `td`;
  the chevron rendered only on the sorted column, no empty placeholder. Verification: right-aligned head x vs its
  cells at 1440 and 390, pasted.
- N10 empty double-ruled band (promptFix 2, regression of rc.1 in a new spot): Never now "two hairlines with nothing
  between them, at any distance". Sig 6 recipe: `.masthead` takes the hairline, `:is(.screen-head,.masthead)+*` (and a
  first `.opener` inside it) draw no top rule, the first opener under a masthead has `padding-top:space.96`; Limits: a
  rule always has content directly on both sides. Applying → Blog names `.masthead`. Check line: no double hairline.
- N11 + security gap (promptFix 3, regression of rc.3): Spacing carries the critic's `.settings-group` CSS (without
  `padding-bottom:0` on the last child, which would strip a card's padding). Verification: every settings gap pasted.
- N12 truncated caption (promptFix 4): Sig 4 What: caption fact at most 18 characters, never an ellipsis; plate CSS
  `.plate .mono-label{right:space.12;overflow:visible;text-overflow:clip}`. Check line: no ellipsised caption.
- N13 two left edges (promptFix 5): Layout: one left edge per page; `size.container` everywhere, articles and docs
  narrow from the right, never centered in `size.containerProse` (the likely cause). Verification: article left x for
  brand, breadcrumb, h1, Related and footer pasted.
- N14 "+" link (promptFix 6): Sig 6 What: the opener link ends in "→" ("↓" for an in-page anchor), never "+" (the old
  text offered "+"). Check line: no "+" on a link.
- N15 opener-to-prose 96px (promptFix 7): Sig 6 recipe `.opener{margin-bottom:space.96}` (`space.48` under 768px),
  `.opener:has(+.prose){margin-bottom:space.32}`; Limits: longer prose goes under the opener in `.prose`. Spacing's
  restated 96/48 replaced by "the opener recipe".
- Process note (promptFix 8, harness): not addressed in the template; the blueprint measuring line now sits in one
  merged "Measure ... and paste" Verification line with the other measurements.
- Budget: 7,677 words (wc) after the additions, 7,481 (validator count) after cutting true duplicates (Sig 3 Where
  "captions level" is the subgrid CSS; Table "only the first and pinned column show", "right-aligned" pin and the
  badge-dot sentence are in the CSS; Color use's banner pointer; Sig 6's h2-size parenthesis, "never shrink h2s" and
  "Mono labels number figures" (rule 6); the review loop's "undo the edit" (the final diff check); the second closing
  example; the separate blueprint-measure line merged; small wording trims). No Verification check removed.

## graphite-blueprint 1.1.0-rc.7

Answers critic R1-R4 of 1.1.0-rc.6 (critic-1.json promptFixes 1-4); nothing else changed, every rule kept.
- R1 (spacingRhythm, spec gap): Spacing recipe hides an empty `[role=status]` in `.settings-group`/`.stack` (sr-only via
  `clip-path:inset(50%)`); Verification measures the 48px gap with status regions empty.
- R2 (signature, spec-caused): `specKinds` rewritten: first-8 permutation as before, later passes offset by 3, so no kind
  returns to a column at 2, 3 or 4 columns within 16 items; Limits line added.
- R3 (polish): Navigation "Section current": `is-section` class from the pathname on a detail route; `end`/`aria-current`
  untouched.
- R4 (polish): Table first/last cell outer padding 0, flush with the section head; card padding is the only inset.
- Budget: to stay under 7,500 words, wording-only tightening in Text field (second banner, async checking), Card
  (linked card), Checkbox (hit area), Table (sort placeholder), Badge, Tabs, Switch, Dialog, Empty state, Spec plate
  Motion and the Blog row of Applying the concept (points to Signature 6); no rule removed. agent.md 7,495 words
  (validator count), validate 0 errors, 0 warnings.

## graphite-blueprint 1.1.0-rc.8

Answers the recurring, spec-caused items of 1.1.0-rc.7's confirm step (critic-2.json promptFixes 1-5); rc.7's rules kept.
- V4 record detail (signature, spec gap, 2 of 3 repeat facts, 3 treatments in 3 samples): Applying the concept row
  "App record detail (project, order, member)": screen head (mono id, name as h1, status badge), one lead figure
  (`plate--wide` keyed by the record id, or a blueprint of its parts) captioned `FIG 01 · ` plus a fact absent from
  the screen, else its kind name (`KIND_NAMES`), numbered mono key-value rows beside it, then its table. Signature 4
  Where lists it; Limits: a caption repeats no value on its screen. Follows the launching agent's direction (plate or
  blueprint) rather than critic-2's quiet-stage variant.
- V5 in-body figure kind (signature, spec-caused, 3 of 3): `freeKinds(kinds, [post.id, ...relatedIds])` helper and the
  in-body call `specFigure(`${post.id}-${i}`, free[i%free.length])`; Limits: no shared kind among an article's plates
  and Related cards. Verification check: no plate kind twice on an article page.
- Mobile "This device" bare dot (optional fix, 3 of 3): `.cell-lines .badge-label` clip removed; the badge becomes a
  mono uppercase caption with dot and word. Verification: a badged row's word visible.
- Pin edge rule (optional fix, 1 of 3): sticky and background stay global; the `inset 1px` rule and the fade apply
  only on `.tbl-wrap.is-scrolling`, toggled by a ResizeObserver (`scrollWidth>clientWidth`), so no vertical rule where
  the table does not scroll (chosen over a media query: a table can overflow at any width in a sidebar layout).
- Diagonal echo (optional fix, 3 of 3): `specKinds` odd passes now rotate each half of the 8-order by one
  (`(q+1)%4+(q&4)`, i.e. 1230 5674). Brute-forced all 40,320 second-pass permutations: it is the only one with no
  shared kind in a row, column, diagonal or adjacent pair at 2, 3 and 4 columns for 16 items (shift-by-3 had 3
  diagonal conflicts at 4 columns; no shift or reversal works). A third pass cannot keep whole columns distinct at 2
  columns (8 kinds), but alternating passes keep rows, diagonals and adjacent pairs clean up to 48 items.
- Budget: +222 words added, so true restatements were cut: Verification checks that repeat a section's rule verbatim
  (content-home headline, article order, pin heads, failed-submit focus, counts as mono labels, "+" links, double
  hairlines — all held 3 of 3 for several versions and remain rules in their sections), Applying rows restating
  Signature 1/6 and Table (dashboard, settings, article, loading, product detail's "only FIG"), Typography's prose
  measure, the glyph's loop sentence, the toast's check icon, the table sort sentence (in the CSS), the live-edge
  placement (in Where), "never an ellipsis" in plate What (in CSS and Verification). agent.md 7,494 words (validator
  count; wc 7,467); validate 0 errors, 0 warnings.

## graphite-blueprint 1.1.0-rc.9

Answers the four recurring findings of 1.1.0-rc.8's confirm step (critic-2.json promptFixes 1-5); every rc.8 rule and
Verification guard kept.
- (A) closing flush with the grid (spacingRhythm, 2 of 3, worse than published): Spacing bullet "`.closing`: `space.128`
  of plain ground above it (`space.96` under `breakpoint.md`); its `.dot-field` fills only its own box", the recipe line
  `.closing{position:relative;isolation:isolate;margin-top:var(--space-128);padding-block:var(--space-96);}` beside
  `.dot-field`, and Verification → Measure "the last grid or card bottom to the dot field (≥ 96)".
- (B) panel tops offset (polish, 2 of 3, spec-caused): Signature 1 → Limits' quiet-stage parenthetical now says every
  card in the stage's row also titles above ("tops align"), and Card → Anatomy says the same from the card side, so
  the two sections no longer conflict. Verification measures panel tops in a row (one y).
- (C) product-detail caption fell back to the kind name (signature, 3 of 3, caused by rc.8): Signature 4 What "Same id,
  same figure and caption everywhere"; Limits "Only a record-detail caption avoids values shown on its screen; a
  product's keeps its card caption even if Details repeat it". The kind-name fallback stays only in the App record
  detail row. Verification: "captions name the item (the card's caption on its detail)" and the repeat check scoped
  "on a record detail".
- (D) ReviewPage.tsx left behind (process, 2 of 3): Never now reads "changing motion or config, or adding any file, for
  review (edit an existing page, then undo it; the run cannot delete files)". The diff check in Verification stays.
- Optional: Motion "8ms stagger per bar (its dot columns together)".
- Budget: about +200 words added, so wording-only cuts of restatements (each still held by a recipe or another
  section): quiet-stage and glyph What restating CSS, live-edge gloss, two-tone "same size and weight", the specKinds
  comment restating code, "kinds from freeKinds" in plate Where, Signature 6's "a rule has content on both sides"
  (Never's double-hairline item), Never's "closing statement under h2" (clamp minimum), lead-text and body-text type
  lines, table outer-padding gloss and sort-order note (CSS), checkbox "never an overlay", the review loop's "(never a
  new file)" (now in Never), settings-group examples, "590" in app section heads. agent.md 7,497 words (validator
  count; wc 7,470); validate 0 errors, 0 warnings.
