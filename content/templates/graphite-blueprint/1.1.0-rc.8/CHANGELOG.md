# Changelog

## 1.1.0-rc.8

App record pages get one specified treatment, article figures never repeat a Related card's figure, the
current-session badge keeps its word on phones, and tables draw their edge rule only while they scroll.

- Applying the concept: new row "App record detail (project, order, member)": screen head with mono id, name and
  status badge; one lead figure (`plate--wide` keyed by the record id, or a blueprint) captioned `FIG 01 · ` plus a
  fact shown nowhere else on the screen, else the kind name; numbered key-value rows; then its table (was: no row, so
  record pages showed no figure or a caption repeating the facts beside it).
- Spec plate: `freeKinds(kinds, pageIds)` and `KIND_NAMES` added; an article's in-body figures take kinds no plate on
  the page uses; Limits: no shared kind between an article's lead plate, in-body figures and Related cards, and a
  caption never repeats a value shown on its screen (was: in-body placeholders defaulted to `hash(id)%8`).
- Spec plate, `specKinds`: odd passes of 8 rotate each half by one (`(q+1)%4+(q&4)`), so at 2, 3 or 4 columns no kind
  repeats in a row, column, diagonal or adjacent pair within 16 items (was: shift by 3, which stepped a kind
  diagonally from row 2 to row 3 at 4 columns).
- Table: the pin's edge rule and fade apply only on `.tbl-wrap.is-scrolling`, set by a `ResizeObserver` when the
  wrapper overflows (was: an always-on `inset 1px` rule, a vertical line on desktop).
- Table, under `breakpoint.sm`: the inline badge keeps dot and word as a mono uppercase caption (was: `.badge-label`
  clipped, leaving a bare dot after the row name).
- Wording only, to stay in budget: restatements of a rule stated elsewhere were cut (Verification checks for the
  content-home headline, article order, pin heads, failed-submit focus, counts as mono labels, "+" links and double
  hairlines, each still a rule in its section; Applying the concept's settings, dashboard, article, loading and
  product-detail rows; Typography's prose measure; the glyph's loop sentence; the toast's check icon; the table's
  sort sentence, which the CSS shows; the live edge's placement, in Where; "never an ellipsis" in the plate's What,
  in its CSS). No rule removed.

## 1.1.0-rc.7

Four recurring findings fixed in the recipes: settings gaps stay 48px with an empty status line, plate grids never
stack a kind in one column, a detail page keeps its section marked, and tables sit on their section's edges.

- Spacing: `:is(.settings-group,.stack) [role=status]:empty` is visually hidden (`position:absolute`, 1px,
  `clip-path:inset(50%)`) and stays in the accessibility tree; the 48px check runs with status regions empty (was: an
  empty status paragraph as last child kept the grid gap, 56 to 64px).
- Spec plate, `specKinds`: the first 8 items take all 8 kinds, each later pass of 8 is shifted by 3
  (`order[(i+floor(i/8)*3)%8]`); Limits: no shared kind in a grid row, a grid column or between adjacent posts (was: the second pass repeated the first in the same order, so row 3 copied row 1 at 4 columns).
- Navigation: on a detail route the section's pill or row shows the current look via an `is-section` class; `end`
  and `aria-current` unchanged (was: no item marked on product detail).
- Table: first cell `padding-left:0`, last cell `padding-right:0`, so text aligns with the section head and its count
  (was: `space.12` inset on both ends).

## 1.1.0-rc.6

Rules that kept coming back now live in the recipe CSS: sort heads, the gap between settings groups and the rule
under a masthead are built in, and pages keep one left edge.

- Table, sort: `.tbl :is(.num,.pin) .sort-button{flex-direction:row-reverse}` in the recipe, and the chevron is
  rendered only on the sorted column (was: prose naming `.sort-button` alone, plus an always-rendered empty chevron
  that pushed the pin head 16px off its cells).
- Never: two hairlines with nothing between them, at any distance (was: under 32px apart). Split opener: `.masthead`
  gets the head's rule and the block after it draws none (`:is(.screen-head,.masthead)+*`), the first opener under a
  masthead starts `space.96` below it; a rule always has content directly on both sides.
- Split opener: `.opener{margin-bottom:space.96}` (`space.48` under 768px) and `.opener:has(+.prose){margin-bottom:space.32}`,
  so prose sits 32px under its opener (was: 96px whatever followed). The opener link ends in "→" ("↓" for an in-page
  anchor), never "+" (was: "→" or "+").
- Spacing: settings groups are `.settings-group` siblings with the 48px gap in CSS (padding-bottom `space.48`, the next
  group's hairline and `space.48` above its content, no margin under the last child) (was: a prose rule, measured at
  51 to 64px).
- Spec plate: a caption fact is at most 18 characters and never ellipsised; the caption spans the plate (`right:space.12`)
  and wraps rather than truncates (was: no length limit).
- Layout: one left edge per page; every page uses `size.container`, articles and docs narrow from the right (body at
  `size.measure`, rail right), never centered in `size.containerProse` (was: `size.containerProse` for articles, which
  gave articles a second left edge).
- Verification: one measured line at 1440px and 390px with numbers and method: blueprint widths, right-aligned head x
  against cells, every settings gap, the article's shared left x; the check line adds no double hairline, no
  ellipsised caption, no "+" link.
- Budget: true duplicates cut (Sig 3's "captions level" now in the subgrid CSS, Table's "only first and pin show" and
  badge-dot sentences now in the CSS, Color use's banner pointer, Sig 6's restated h2 size, h1 note and mono-figures
  line, the review loop's "undo the edit", the second closing example, the merged blueprint-measuring line, shorter wording in Sig 3, Sig 4, Sig 6, Text field and Layout).

## 1.1.0-rc.5

A content home opens with one large headline again, counts read the same in every app, phone table pins keep a
visible label, and closings and failed forms behave the same way everywhere.

- Split opener, Limits: a content home's featured block is a mono "FEATURED" label over its plate and text, no h2
  (was: a full h2 opener, which pushed the lead plate below the fold); the plate's top sits above 900px at 1440px.
- Split opener, Limits: prose beside an opener is one paragraph, longer prose goes under it; the description repeats no
  phrase of the prose and each destination is linked once per section (was: only the first sentence was protected).
- Typography: counts, result lines and the label over a closing are uppercase `.mono-label` in every app (was:
  unstated, so two apps set them in sentence-case sans).
- Typography, closing statement: two sentences of at most 12 characters, each one tone in a no-wrap span, one line from
  `breakpoint.lg` and breaking only between sentences (was: a 24-character limit, which let a tone split mid-phrase).
- Table, small screens: the pin head is a short visible mono word, or the value carries its unit ("4 projects") under a
  hidden head; only an actions pin's head may be empty (was: hidden over any number).
- Text field, error: when the first invalid field is more than a viewport above the banner, the same banner is repeated
  as the form's first child, and the one above the actions stays (was: "the banner also opens the form").
- Spacing: the 48px settings-group gap also runs from a form's actions to the next hairline. Layout: cards, grids and
  tables in a settings group span the controls column's full width.
- Verification: blueprint widths can be measured in a browser or from a 2x screenshot (pixels divided by 2); new checks
  for one headline in the first viewport, no repeated phrase or link, readable pin heads, and the same mono counts and
  one-line closing across apps.
- Budget: true duplicates removed (pointer sentences, restated test-id and status-region notes, the group-count and
  appearance notes now covered by Typography and Ongoing development).

## 1.1.0-rc.4

Closings stay two short lines on phones, blueprint rows and section prose line up, article pages open with their
title and a wide plate again, and failed forms keep their summary next to the fields.

- Typography, closing statement: copy at most 24 characters ("New posts. One email."), so it sets in 2 lines or fewer
  at 48px at 390px (was: 1 or 2 sentences, which ran to 6 lines on phones); size stays
  `clamp(h2, 6vw, display)`, longer copy in the form's helper line.
- Isometric blueprint: `.bp-row` aligns to the start and each figure is a 3-row subgrid (caption, drawing on a shared
  base, title and text), so captions and titles are level across the row. `slab()` draws the front vertical edge
  (`.bp-edge`) and a rib round the sides when h is at least 0.3w.
- Split opener, Limits: a section's prose follows its opener (right column or at `size.measure`), never below a figure
  row in one half; the description never repeats the prose.
- Applying the concept, new Article row: breadcrumb, h1, meta, then a `plate--wide` lead plate; the contents list is a
  side rail on wide screens and a closed "On this page" after the plate on small ones, never above the h1.
- Table, sort: in a right-aligned head the chevron comes before the label so the label ends on the cells' edge.
- Text field, error: the banner sits directly above the actions; focus moves to the first invalid field, and the
  banner also opens the form when that field is more than a viewport away. Layout: a form's preview sits above the
  fields.
- Spacing: settings groups are `space.48` from one group's last content to the next hairline, card grids included.
- Verification: blueprint widths measured in the browser and pasted; new checks for the closing, blueprint captions,
  section prose, article order, sortable heads, settings gaps and failed-submit focus.
- Budget: true duplicates removed (Applying's app-header row, placements repeated from components, restated notes).

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
