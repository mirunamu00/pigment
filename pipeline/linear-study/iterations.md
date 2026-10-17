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

