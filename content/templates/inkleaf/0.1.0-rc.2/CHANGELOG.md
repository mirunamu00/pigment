# Changelog

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
