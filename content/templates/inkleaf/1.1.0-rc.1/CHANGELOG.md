# Changelog

## 1.1.0-rc.1

Internal candidate: the package is rewritten for any product instead of the four test apps
(`pipeline/claude-study/overfit-review-2026-10-19.md`). Design language, tokens and signature recipes unchanged.

- Layout adaptation: the featured-post and article lines (which omitted figures without an image) become a
  featured-item rule and a long-form page rule; an image placeholder becomes the item's own drawing, never removed.
- Layout adaptation: cart and checkout becomes a transaction summary in a narrow sticky side column; store grid
  becomes image card grids; the chart-card and stat-card lines become a stretched-panel rule (main content takes
  the height) and stat rows that wrap evenly whatever their count.
- Applying the concept: Settings, Dashboard, Store and Article rows describe what any product of that kind has
  (Store is now "Item list and detail", Article "Long-form content"); no stage colors per screen.
- Pastel stage Where: the per-screen color map is replaced by the rotation rule; plan cards become offer or choice
  cards (rule 6, Where, Limits, Typography, card spec, Verification).
- Pictogram recipe: the misreads seen in past runs and the run-derived subject ban list become general failure
  modes and a "skip the stock symbol for the task" rule; the key example is replaced.
- Switch: "applies immediately, never behind a Save button" becomes "a switch that applies immediately needs no
  Save; inside a form, it follows the form's submit".
- "Every app" becomes "every product screen"; card "Numbered trio" becomes "Numbered steps (any count)"; badge and
  stat examples use neutral placeholders; the empty-state first-run stage takes the rotation color.

## 1.0.0

First release of Inkleaf: warm ink on cream paper, a text serif for headings and a quiet sans for everything
else, with almost no color. Its personality comes from hand-drawn brush-ink pictograms that draw themselves in
once, frame by frame, and from soft pastel stages that hold product UI. Everything settles slowly.

- Ten defining rules and a Never list: paper and ink grounds, one warm accent kept to focus rings and a single
  hero drawing, serif headings in sentence case, depth from 1px rings and tonal bands instead of shadows.
- Five signature recipes: brush-ink pictograms played once as a stepped sprite, pastel stages and plates,
  serif headings that fade in word by word, a hand-drawn "working" glyph instead of a spinner, and ink-and-paper
  ring controls.
- Drawing rules an agent can follow: one subject per drawing taken from the app's own domain; hands built from
  long, separate hairpin fingers in four poses (present, grip, pinch, point), no pose on more than a third of an
  app's hands, with a wrist that runs off the edge of its plate or stage; a one-word test for every drawing; and
  each product drawn as itself when it has no photo, in the same plate color on every screen.
- Large drawings keep a solid, unbroken line that swells in the middle and thins at the ends, like a brush. Plates
  and stages size their drawing by height, at most 416px, so no object is cut off at an edge.
- Motion tokens for slow settles (750 to 1000ms), stepped loops and hover rings; under reduced motion every
  drawing shows its final frame and nothing stays hidden.
- 14 specified components, avatar and empty state included, with designed hover, focus, disabled, loading and
  error states, and layout rules for dashboards, stores, articles and settings.
- Light and dark themes with Source Serif 4, Instrument Sans and JetBrains Mono, all openly licensed.

## 0.1.0-rc.4

Fourth candidate, answering the third critic round: drawings show the product they stand for, fill their stages,
draw hands that read as hands, and stop converging on the same office objects; card stages fit their content and
plan cards stay visible on mobile; content is never hidden without script.

- Missing images: was "the category's drawing on a plate"; now each item's own subject on its plate and the same
  drawing on its detail stage, a category drawing only when one object is true of every item; Never adds one
  product's drawing on another product's card or detail page.
- Drawing size: the drawing box on a drawing stage or plate was 50% of the inner width; it is now 80% of the full
  width, absolutely centered, so the ink spans 45 to 60%; the Never item names ink, not box.
- Hands: the demo's diverging wrist strokes that stopped at y 113-114 are replaced by palm sides that run on as a
  near-parallel wrist off the bottom edge; step 1 requires wrists 18 to 26 units apart leaving the box; the
  silhouette test adds "reads as a creature: the wrist is wrong"; Never adds hands that read as creatures.
- Stages: `aspect-ratio: 16 / 9` moved from `.stage` to `.stage--media`; card and chart stages hug their content
  with `space.48` (`space.24` mobile) padding; under `breakpoint.md` cards on a stage stack in source order, all
  fully visible, in dashboard and settings alike; never a horizontal strip.
- Subjects: step 1 names the app's domain over generic office work and bans a steaming mug, magnifier, receipt,
  envelope, lost glove, sock or mitten unless the screen is about it; no two drawings in one app share a
  silhouette; header drawings are compared side by side at 48px; straight-edged subjects (set squares, rulers,
  frames) are out unless every edge is bowed. Not-found drawings come from the app's domain, not "something lost".
- Block rise: was "below-the-fold blocks start hidden"; now only script hides a block (`is-rise-ready`), blocks in
  view on load are never hidden, and no script, print and reduced motion show final states.
- Verification: grid cards' drawings name their product; plan cards fully visible at 390px; card stages hug
  content; drawings checked on the real screens, never in preview pages or scratch files; `components.md` lists
  each drawing's subject by screen.
- Budget: SVG path data written without spaces; the stacked-table CSS block became one sentence; the Select menu
  points at the Navigation menu; shorter pictogram and stage Where lines, blog and article layout lines, button
  Use, rule 9 and several Never and Verification items.

## 0.1.0-rc.3

Third candidate, answering the second critic round: no more empty pastel blocks, stages keep their proportions,
drawings read at small sizes and include hands more often, and a handful of product-screen details are pinned.

- Missing images: a grid image without a photo was a plate with a `size.iconLg` category icon bottom-left; it is
  now a 4:3 plate holding the category's drawing at 50% of its width, final frame, one drawing per category; a
  grid without categories drops the media slot. Article figures without an image are omitted.
- Stages: proportion now 16:9 to 1:1 (`.stage` gets `aspect-ratio: 16 / 9` as a minimum), never a banner; new
  drawing stage (`stage--drawing`, 4:3, drawing at 50% of the inner width) for the blog home featured post and
  for article or product images that are missing; a drawing on a stage spans 45 to 60% of its width.
- Rule 4: was "every section opens with a pictogram"; now prose sections open with a `size.pictoLg` drawing,
  list sections (more posts, related, archive) open with the h2 alone, and a second opener in one viewport is
  `size.pictoMd`.
- Pictogram recipe: the fixed subject list is replaced by a subject-picking method (task verb, three held
  objects from the app's domain, clearest silhouette not yet drawn); no vehicles or toys, no subject the spec
  names; at least half of each app's drawings include a hand; the defining feature is drawn first and oversized;
  rectangular bodies are 2 to 4 bowed strokes; a 48px silhouette test.
- Never list: adds a plate or stage holding only an icon or nothing, a stage flatter than 16:9, and a drawing
  under 45% of its stage or plate.
- Button: full width (`.btn--block`) keeps flex centering, never `display: block`.
- Navigation: new Menu entry (items `size.control`, `font: inherit`, start-aligned; sign out after a hairline,
  same size).
- Table: toolbar row spec (title and count head, chips and visually labelled search `space.16` below); stacked
  mobile tables hide the header row and sort with a native select.
- Avatar: tile color was "hashed from the name"; now (sum of char codes) mod 3 over sage, lilac and apricot.
- Motion: below-the-fold blocks start hidden and rise on entry; only reduced motion starts them final.
- Verification: stages and plates never empty, stage proportions, blog featured drawing stage, centered button
  labels at 390px, silhouette test and hand share.
- Budget cuts: duplicated limits in the glyph, write-in and ring-control recipes, the connector-draw motion line,
  the browser-chrome Never item (covered by components), card padding in Spacing, and assorted wording.

## 0.1.0-rc.2

Second candidate, answering the first critic round: pictograms animate as one visible stepped strip, the working
glyph is honest, and product-screen layouts get explicit rules.

- Pictogram recipe: per-frame `cel-flash`/`cel-hold` animations replaced by one sprite strip (`celStrip`) stepped
  with `steps(n, jump-none)`; pre-play state shows the first stroke, never a blank frame; reduced motion shows the
  final frame. Drawing limits: no straight segment over 15 units, boxy subjects bowed; `size.pictoSm` version with
  5 to 7 strokes at 4.0 to 5.0 units and a 6/5 fill offset; the cup construction demo replaced by a hand holding
  an egg (object, palm, thumb, noodle fingers, wrist).
- Never list: automation detection to skip animations; artificial delays for a working state; glyph beside a
  button; a second `role="status"`; text or summaries on a stage; small card adrift on a stage; repeated centered
  placeholder icons. Rule 9: glyph only while a real request is pending, inside the control.
- Motion: in-view-on-load entrances play immediately; nothing hidden more than one frame after entering view.
- Stage limits: holds a chart, media, pictogram, plan cards or ghosted preview; card at least 60% of inner width.
- Layout: product-screen header grid (drawing, h1, lede on one left edge, `body` lede), panel rows stretch with
  titles inside cards, cart and checkout columns, store grid at 2 columns under `breakpoint.md`, article table of
  contents after the lede on mobile, article h2 `h4` and h3 `h5`.
- Components: Avatar spec added (40px, `radius.tile`); stat change colored by meaning; toast reuses an existing
  status region; footer inverse band only with two or more link groups; header product name aligned to sidebar
  text; table row hover on raised cards uses `color.surface.subtle`; missing images use a bottom-left category
  icon in grids and a `size.pictoXl` drawing on detail stages.
- Reduced motion: entrances never hide content; everything renders in its final state.
- Budget cuts: the streaming caret companion, the FAQ, toast and dialog rows of Applying the concept, the radius
  list (now one line), duplicate button-hover lines in Interaction and two Never items already covered by rules 2
  and 3.

## 0.1.0-rc.1

First release candidate of Inkleaf, derived from the approved reference analysis (captured 2026-10-13).

- Tokens: warm paper and ink neutrals, a single warm accent for focus, send square, working glyph and one hero
  drawing; four stage pastels with derived night values; pictogram ink and fills; derived moss, ochre and harbor
  status colors beside the observed brick error; Source Serif 4, Instrument Sans and JetBrains Mono; pixel-named
  spacing; radii 4 to 32; ring widths 1 and 2px; hover, float and overlay shadows; motion from 83ms frames to
  1200ms breaths on a settle curve; breakpoints 834, 992 and 1200.
- Principles: ten rules, a Never list, and five signature recipes (cel-drawn ink pictogram, pastel stage, serif
  write-in heading, written-loop working glyph, ink-and-paper ring controls), Interaction, Motion with reduced
  motion, and an Applying the concept table covering 16 contexts including dashboards, tables, settings and stores.
- Components: the 12 required plus empty state, all specified with states.
