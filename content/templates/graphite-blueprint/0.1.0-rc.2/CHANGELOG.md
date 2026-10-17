# Changelog

## 0.1.0-rc.2

Rows and controls stay clickable, count badges are readable, captions describe the item, and frames no longer stack
inside each other. Slab drawings have tighter corners, plate figures sit centred and connectors move.

- Checkbox and radio: the row's hit area now comes from wrapping input and text in the `<label>` (or padding the
  label), never from an overlay; controls inside a row or card with a stretched link get `position:relative;z-index:1`.
- Never: nothing stacked above a native control; no stage inside a bordered card or frames nested more than two deep;
  no copy that explains the system or how a drawing was made.
- Badge: the count badge is its own `.count` class (16px, `color.action.primary` fill, `color.text.onAction`
  numeral), never combined with the generic badge.
- Spotlit stage: sits on the ground or in one hairline cell; a panel whose content is a quiet stage drops its border
  and fill; panels in a row align to their content. The blog featured post is a wide plate, not a stage.
- Blueprint: vertex rounding `r` 14% → 8% and `s` 7% → 5% of the half-width; every connector marches except a
  stopped connection.
- Spec plate: the fan figure is centred (origin at the tile's centre line, length 66 to 78); every figure stays inside
  the central 78%; captions name the item.
- Table: under `breakpoint.md` the first column keeps `white-space:nowrap` and `min-width:160px`, cells wrap to at
  most 2 lines.
- Verification: click each checkbox, radio and switch on the box itself, run the project's end-to-end tests (or say
  they were not run), and check badge and count legibility in both modes.
- Unused primitives `space.64`, `motion.easing.inOut` and `motion.distance.flow` removed.

## 0.1.0-rc.1

First candidate of Graphite Blueprint, derived from the reference study. Dark is canonical; light comes from the
reference's documentation theme, with derived light versions of the stage, blueprint, spec plate and glyph.

- Tokens: graphite ladder, four text steps, white-alpha hairlines, one indigo, light and dark semantics; tertiary text
  and control outlines lifted for contrast.
- Signature elements: spotlit stage (lit and quiet), dot-matrix glyph with dot field and meter, isometric hairline
  blueprint, spec plate, working shimmer and live edges, split opener with two-tone voice and mono figures.
- Thirteen components specified, empty state included.
