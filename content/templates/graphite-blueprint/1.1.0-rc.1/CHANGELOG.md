# Changelog

## 1.1.0-rc.1

Tables on phones now show only the first column and the pinned one, with long values ending in an ellipsis, and
blueprints keep their size in groups.

- Table, small screens: "hide secondary columns (location, last active, owner)" is replaced by: under `breakpoint.sm`
  every column except the first and the pinned one is `display:none`; the first cell holds at most two single-line
  lines with an ellipsis (`white-space:nowrap`, `text-overflow:ellipsis`, `max-width:0` cell), the second from the
  cell's own text or `data-sub`; every row of a table has the same number of lines. New CSS block in the recipe.
- Isometric blueprint, Limits: sizes are now rendered CSS pixels (`getBoundingClientRect().width`): a row of three
  renders each drawing at `size.blueprintLg` or its full column, never under `size.blueprintMd`; each slab of a
  connected pair at least `size.blueprintMd`. Was "a row of three at `size.blueprintLg`" and "half-widths are rendered
  px". New `.bp-row`, `.bp--lg`, `.bp--pair` CSS.
- Verification: two new steps, tables at 390px (two columns, no stray glyph, no cut word, equal rows) and a measured
  width for every blueprint.
- Budget: duplicate lines cut to stay under 7,500 words (Character shortened; stage gradient stops, dot-field and
  toast-shimmer placements, Motion's signature pointer, checkbox z-index note, empty-state test-id note and others
  that repeat a recipe, Applying or the Never list).

## 1.0.0

First release of Graphite Blueprint: a near-black instrument panel. Graphite greys stacked in five steps,
1px hairlines, pill controls and one indigo kept for focus and selection. The product's own interface is the
main image, set on a softly lit stage; work in progress speaks in a 5x5 dot matrix and a passing shimmer, and
explanations are drawn as isometric hairline blueprints with mono figure captions. Dark is the default, with a
light mode in cool neutral greys.

- Ten defining rules and a Never list: the ground covers most of every screen, text in four steps of grey,
  indigo at most three times a screen, hairlines instead of shadows, pills and 8px panels.
- Six signature recipes: the spotlit stage, the dot-matrix status glyph, isometric blueprints with marching
  connectors, spec plates for items without a picture, the working shimmer, and the split section opener.
- Motion in two speeds: state changes in 100 to 160ms, slow stepped loops only for work in progress, and every
  loop frozen on a readable frame under reduced motion.
- Layout rules for dense screens: side-by-side panels end together, tables keep a pinned first column on small
  screens, and frames never nest more than two deep.
- 13 specified components with designed states, Inter and Geist Mono (both openly licensed).

## 0.1.0-rc.3

Panels side by side now end on one line, pinned table columns on phones no longer cut the text beside them, and
stores close with a statement over the dot field again. Spec plates have twice as many figures, so neighbouring cards
no longer look alike.

- Spotlit stage: "panels in one row align to their content" is replaced by "panels in one row end together": the chart
  stage stretches to the row height (at least `size.stageMini`) or the list beside it is capped with "View all →";
  no empty band inside a panel, no column ending more than `space.48` above its neighbour.
- Applying the concept, dashboard: the chart and the activity list end on one line, otherwise the chart takes the full
  row and activity goes below.
- Table, small screens: the pinned column is opaque (`color.surface.default`, or `card` inside a card), with a 1px
  `color.border.subtle` edge and a 16px fade over the scrolling cells; under `breakpoint.sm` secondary columns are
  hidden instead of half-visible.
- Applying the concept, closing: was "newsletter" only; now newsletter, store and blog list pages end with a two-tone
  statement over the dot field (a store: its shipping or returns promise).
- Spec plate: figure kinds 4 → 8 (bars, perspective grid, ringed sphere, square lattice added); neighbours in a grid
  never share a kind (`specKinds`).
- Blueprint: slab half-widths are rendered pixels, at least 40; slabs side by side get `size.blueprintMd` each, and a
  narrow column shows one slab and the connector instead of four shrunk ones.
- Text field: a failed submit shows the danger banner (hairline box, `color.status.dangerTint` wash, danger dot) on
  every form, checkout included; never bare red text.
- Verification: rows at 1440px end within 48px of each other; no table cell cut mid-letter at 390px.

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
