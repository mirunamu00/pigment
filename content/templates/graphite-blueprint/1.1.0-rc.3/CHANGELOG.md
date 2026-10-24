# Changelog

## 1.1.0-rc.3

Phone tables keep a row's second line whole, product pages show one figure number and get their stock line and
numbered details back, and closings, legends, headings and KPI labels line up the same way in every app.

- Table: a badge naming the row moves from beside the first cell's lines to inline at the end of the first line
  (`margin-left:space.8`); under `breakpoint.sm` it shows its dot only, label in `.badge-label` for screen readers. The
  pin's head is one short word or `.sr-only`, the pin at most its widest value plus `space.24`, and `.pin` (now
  `.tbl .pin`) goes on the `th` too so the head aligns right like its cells.
- Spec plate, Limits: one figure number per plate (its caption or a `.fig`, never both); the item name once per
  viewport; no shared kind in a grid row or between adjacent posts. `specKinds` now waits until all 8 kinds are used
  before repeating one (was: not among the previous 4), over the full list.
- Applying → Product detail: the plate's caption is the only FIG; a mono `CATEGORY · IN STOCK` line over the name;
  Details rows numbered in mono.
- Never: a closing statement under `font.size.h2`. Typography: closing statement
  `clamp(h2, 6vw, display)`, 1 or 2 sentences, longer copy in the form's helper line (was "`display` size").
- Root setup: fonts self-hosted (font packages or local files, never a font CDN); headings `text-wrap:balance`,
  `p, li` `text-wrap:pretty`; fieldset and legend padding and borders reset. Existing projects apply the same.
- Card, KPI: the label stays on one line (ellipsis, full label in `title`; shorter or one card per row on phones) so
  values align.
- Layout: a preview, banner or panel stacked in a form column takes the form's width.
- Verification: review pieces are rendered by temporarily editing an existing page and undoing the edit, never in new
  files; at 390px a badged row's second line is uncut and KPI values are level.
- Budget: true duplicates shortened (Character, Verification's recipe values and token-file check, Shape's checkbox
  and toast radii, a few repeated parentheticals).

## 1.1.0-rc.2

Blueprints now fill their frame, content pages keep a large headline and description at every section, and phone
navigation, segmented options and table pins stop clipping. Working rules trimmed in the previous candidate are back.

- Isometric blueprint: new `pair()` (slab 2 at 2w right, w down, a marching link between their sides) and
  `blueprint()` (viewBox cropped to the slabs' bounds plus 5%, figure group `g.bp-fig`); size is measured on the
  drawn group (at least 85% of the svg; about 270px in a row of three, at least 240px at 1440px). `.bp--pair` CSS
  removed (its 368px minimum did not fit a phone column); `.bp--md`, `.bp--sm` and a full-width `.bp--lg` under
  `breakpoint.sm` added. Where: the about row is a stack, a connected pair and a box, never two that differ only in
  slab count; 1-2-3 tier stacks only on plan cards. `size.blueprintLg` 280px → 300px.
- Split opener, Limits: "one headline of `font.size.h2` or larger per viewport" replaced by: every content section
  down the page opens with the full opener (48px h2 and the description right), filters or counts never replace the
  description, section h2s never shrink to protect the h1. Applying → Blog: "one opener" → "an opener per section".
- Split opener, Where: app sections (cart, checkout, settings groups) get a mono counter and title left, a one-line
  description right; Applying → Cart says the same.
- `.screen-head + *` loses its top border; Never: two hairlines under 32px apart with nothing between.
- Navigation, sidebar under `breakpoint.lg`: "a pill row that scrolls inside itself" → text-only pills that wrap
  (over 6 items: one pill named after the current page opens the sheet); never a clipped or scrolling nav row.
- Table: row actions are bordered pills at every width; a badge naming the row stays in the first cell with its dot;
  the pin holds one action or one status, right-aligned (`text-align:right`), empty when a row has no action.
- Tabs, segmented pills: native radios visually hidden, selected by `:has(:checked)`, never a drawn circle or dot
  (also in Never).
- Spec plate: caption is number and one fact (`FIG 03 · 18 OZ CANVAS`, `NO. 07 · DESIGN`), never the number or
  category alone.
- Text field: the failed-submit banner on every form, one-field forms (newsletter) included.
- Applying → Data table: a 1-to-5 load shows the dot meter beside its number.
- Restored from the published version: "Closing sections: the dot field", "Closing statement: `display` size",
  "never bare red text", the checkbox `z-index` note, the Motion pointer to signatures 1, 2, 3, 5, "(actions column
  pinned)", the dashboard fallback wording, the `specKinds` comment, "exclamation marks or emoji", the empty-state
  test-id note.
- Verification: at 390px every nav item visible; blueprints measured on `.bp-fig`; every review route, page and
  script deleted before finishing.
- Budget: duplicate lines cut (surface map, quiet-stage values, glyph and dot-field values, Interaction lines for
  tabs, menu items and checked controls, the dialog row of Applying, and others that repeat a recipe or component).

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
