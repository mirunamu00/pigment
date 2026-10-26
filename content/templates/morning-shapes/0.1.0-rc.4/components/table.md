### Table

**Purpose.** Compare many records by several attributes. Under four columns, or on phones, use stacked label–value rows.

**Anatomy.** Optional toolbar (search pill, filter pills with the selected dot, compact pills) → frame (`color.surface.default`, `radius.lg`, `overflow: hidden`, 1px `color.border.default` outline) → head row on `color.surface.subtle` → body rows separated by 1px `color.border.default` → optional footer with pagination circles.

**Sizes.** Head row 44px, `font.size.label` bold `color.text.icon`, sentence case; body rows `size.row`, cell padding 0 `space.4`, `font.size.body`; compact mode `size.control` rows with `font.size.label`. Row actions `size.circleSm` cream circles. Numbers right-aligned, tabular; meta text `color.text.secondary`.

**Variants.** Read-only; clickable rows; selectable (checkbox column first); with a category column (`size.dot` dot + label, or a filled tag in the category hue with its on-field text, `font.size.fine` bold).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | white rows, 1px rules, no zebra |
| hover | clickable rows only: `color.surface.subtle`, `motion.duration.snap` |
| focus-visible | 2px `color.focus.ring` outline inset −2px on the row or cell |
| selected | `color.surface.hover` fill + checked box, `aria-selected="true"` |
| loading | head stays; five rows of cream skeleton bars (`radius.sm`, 12px, 40–80% of the cell), pulsing |
| empty | one full-width row holding the empty state (glyph `size.glyph`, one sentence, one ink pill) |
| error | one row: `color.status.danger` alert glyph + message in `color.text.primary` + cream "Try again" pill |

**Keyboard and screen readers.** Real `<table>` with `<th scope>`; sortable heads are buttons with `aria-sort` and a 16px chevron; the scroll container is focusable with an `aria-label`.

**Do / Don't.** Do show categories with a dot or tag. Don't put shapes, glyphs or a field behind or inside the table.
