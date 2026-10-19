# Changelog

## 1.2.0

The studio details now fit any product. Where the bloom, the serif word, the tape and the pencil note go is decided
by the kind of screen, not by a fixed list of example apps, so a CRM, a docs site or a booking flow gets them in the
same places a home or catalogue screen does. The look itself is unchanged.

- Studio details: bloom and serif word on the page header of a home, index or collection screen; tape on a pinned or
  featured item; the pencil note beside the lead or the featured item's eyebrow, restating it in 2 to 4 words; on
  settings and form screens only a note on the section navigation; none on record-detail, checkout and data-dense
  screens.
- Serif word: one per screen, in a page h1 of two or more words on a home, index or collection screen, or in an
  editorial title; never on settings, form, checkout or record-detail screens.
- A featured item is pinned (tape and `elevation.pinned`) and spans the columns its content needs, not a fixed span.
- Charts: the current or selected mark is full ink and the others rest at `opacity.chartRest`, in any chart.
- Long-form articles may set one pull-quote in serif. Media frames default to 4:3 for object photos, 16:10 for
  screenshots and 3:2 for cover images.
- Examples and recipes use neutral placeholder text instead of sample product copy.

## 1.2.0-rc.1

Internal candidate. Generalizes the package for any product (overfit review 2026-10-19); tokens, components and
design language unchanged.

- Studio details: the per-app list (four demo screens with their copy, a fixed featured-card span, a 220px sidebar
  note) is replaced by placement by screen moment: home, index or collection header; pinned or featured item;
  editorial title; settings and form screens (note on the section navigation only); record-detail, checkout and
  data-dense screens (none). The details table names these screen kinds.
- Rule 6: the serif word goes in a page h1 of 2+ words on a home, index or collection screen, or an editorial title;
  never on settings, form, checkout or record-detail screens. A long-form article may add one serif pull-quote.
- Pencil-note recipe: placeholder text instead of demo copy; notes restate their target in 2 to 4 words (was 2 to 6).
- Featured item: pinned (tape plus `elevation.pinned`), spanning the columns its content needs.
- Neutral examples: "Orders" / "All orders", "{n} items", a result count in a sentence, a saved or sent
  confirmation; state markers tag the current or selected item next to its name (rule 2, Badge).
- Charts: the emphasized mark (current or selected) is full ink, the others at `opacity.chartRest`, in any chart.
- Media frame: "every product"; ratios are defaults by image kind. Object h1 row and same-height card rows name
  kinds of content.
- Agent instructions: `VERSION` records the system id and the spec's update date (was a stale version string).

## 1.1.0

Margin Notes is now called Pigment Margin Notes, because it is the design of this site itself. The design
is unchanged: projects that already use it need no changes.

- Name: "Margin Notes" → "Pigment Margin Notes". The id `margin-notes`, spec links and MCP calls stay the same.

## 1.0.0

First release of Margin Notes: warm paper and ink, hairlines, a tightly tracked grotesk, and studio details
(watercolor bloom, tape, pencil notes, one serif word) kept to the margins, in light and "night paper" dark.
Ten defining rules, a Never list, 18 specified components with designed states, copyable recipes for every
studio detail, and agent instructions for new and existing projects.

Changes since 0.1.0-rc.3 (critic avg 3.83; one failed gate: a commerce smoke test could not click a checkbox):

- Checkbox, radio and switch: the native input is the visible control (`appearance: none`, class `check` /
  `switch`), so it takes every click; drawn boxes and thumb spans get `pointer-events: none`. Never list:
  a decorative layer that intercepts clicks on a native control. Verification: click each one with the mouse.
- Segmented control: new tokens `color.surface.selected` (dark `#38362f`, lighter than the track) and
  `color.border.selected` (dark ring 4.6:1 on the track); the selected segment carries the ring in both themes.
- Hatch toned down: `color.decor.hatch` light `#d4cfc4` (1.25:1 on the tray), dark `#3f3d37` (1.34:1), 10px
  pitch, stated range 1.15:1 to 1.35:1; grids of 3 or more asset-less frames use 3:2.
- Linked-card hover: 1px `color.text.tertiary` ring plus title underline (was an invisible border step).
- Search fields hide the browser clear button; the system's own clear button is specified. Native selects
  drop the default arrow. Never list: browser-default chrome.
- Focus rings never touch text: header links are padded `size.controlSm` boxes; inline links get padding and
  a 3px offset.
- Success feedback: a toast, or a success badge with a check icon for in-place status text; never a bare
  colored word. The toast covers every save and submit.
- Dialog: exact centering CSS for native and custom dialogs, mobile width, initial focus ring visible.
- Hierarchy: h1 repeats moved to the Never list with the "Projects / All projects" example; state markers
  ("Current plan") are neutral badges, never button-sized ink; the article table of contents is a right rail
  or a collapsed "On this page" after the meta line, never between breadcrumb and h1; headings balance-wrap.
- Spacing: card grids `align-items: start`, cards span only the columns their content fills (no card more
  than 30% empty); the mobile action bar is fixed to the viewport at full width; tables use
  `table-layout: fixed` with column widths so filtering moves no column; inline badges get `space.8`.
- Mono rule: numbers inside sentences and status lines stay sans.
- Contradictions resolved: serif words are allowed in blog post titles but not on product, project or record
  pages; pencil-note words must restate their target (per-app wording given; the store note no longer
  prescribes fixed text); the settings note sits inside the sidebar (`--note-x: space.16`).
- Budget: shadows written with 8-digit hex, unused tokens removed (`color.action.disabled`, `color.code.ring`,
  `font.size.display`, `font.tracking.normal`, `size.rowCompact`), prose compressed; bundle 5,993 words.

## 0.1.0-rc.3

Revision answering the critic review of rc.2 (avg 3.67). Header band sized to content, a visible hatch token,
stacked mobile tables that keep status and actions, pencil-note anchoring recipe, dark switch thumb and
lifted surface, rebuilt night bloom, lighter charts, stat cards, one container width in every app, article
prose spacing, empty states on the h1's axis, and an exact mono rule. Details in `pipeline/pigment-study/iterations.md`.

## 0.1.0-rc.2

Revision answering the first critic review of rc.1 (avg 3.25, polish 2.5; all automated gates passed).

- Bloom: new recipe in a full-bleed band (`overflow-x: clip`, never `overflow: hidden` on an ancestor), a feathered
  radial `mask-image` so no straight edge can appear, a 500 x 320 box inside a 320px-min band, and a separate
  geometry below 1200px (176 x 112, behind the h1 only, ending above the lead). Empty-state bloom placement.
- Dark bloom: new `mn-wash-night` filter (blurred, no grain or rim) switched by `prefers-color-scheme` and
  `[data-theme]`; dark `opacity.bloom` 0.22 → 0.3.
- Serif word: never a whole title, only in titles of 2 or more words, max 1 per screen, per-app list (none in
  settings, forms, cart, checkout, product and record pages). Added to Never.
- Mobile: no horizontal scroll at 390px (`overflow-x: clip` on root, `min-width: 0`), navs with more than 3 links
  collapse to a menu button, tables scroll in their own wrapper (up to 4 columns) or stack (5 or more), sticky-bar
  pages get bottom padding.
- Controls: explicit input, select and search heights that never shrink in flex rows (rule 8); switch off-track and
  checkbox borders use `color.text.tertiary` for 3:1.
- Media frame "no asset" state (tray, hatch, one 20px outline icon); illustrated placeholders added to Never.
- Object pages use the 44px `h1Article` size; no h2 repeating the h1; status badge next to the title.
- Mono rule 7 made explicit (tables, spec rows, key/value rows, totals; prices and stat values stay sans).
- Pencil notes: one concrete placement per app type.
- States: hover, focus-visible, disabled and error moved into rule 9 and the Never list; Verification gains
  code-checkable rules for agents that cannot render.
- Cards in mixed rows align to the top; featured cards span grid columns; product name as text, no icon.
- Trimmed for the 6,000-word budget: component Do/Don't lines folded into states or the Never list, swash filter
  without rim, removed the unavailable badge variant, the alternate pencil arrow and the second tape clip-path.

## 0.1.0-rc.1

First release candidate of Margin Notes, derived from the approved reference analysis (captured 2026-10-12; see `provenance` in the manifest).

- Tokens: warm paper neutrals, ink action and focus, deep status colors including a derived ochre warning and
  derived status tints, decor colors for the watercolor bloom and tape, code colors, radii 5 to 20 plus pill,
  a pixel-named spacing scale, a type scale with size-dependent tracking, weights 400/500/600, rest, pinned and
  segment elevation, motion 120/180ms on `cubic-bezier(0.2, 0, 0, 1)`, breakpoints 860/1200/1440.
- Dark mode "night paper" is derived (the reference is light only): action and focus invert to paper.
- Principles: the ten defining rules, a Never list, and "Studio details in a product" with placement limits,
  per-app guidance and copyable recipes for the bloom, tape, pencil note, serif word and swash.
- Components: the 12 required components specified with derived disabled, loading and error states, plus
  segmented control, chip, code block, callout, empty state and media frame.
