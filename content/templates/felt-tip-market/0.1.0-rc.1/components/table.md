### Table

**Purpose.** Compare many records by several attributes. Under 4 columns or on phones, prefer a ruled list of label–value rows.

**Anatomy.** Optional toolbar (search, filters as outline pills, compact buttons) → one frame (`color.surface.raised`, 1px ink, `radius.sm`, `overflow: hidden`) → header row on `color.surface.default` → body rows divided by 1px ink rules → optional footer (pagination with compact outline buttons).

**Sizes.** Header row `size.row`, labels `font.size.body` bold; body rows `size.row` (compact `size.control`), cell padding 0 `space.4`, `font.size.body`; key or id column `font.family.mono` `font.size.meta`; inline code chips `color.surface.subtle`, `radius.sm`, padding 0 `space.1`.

**Variants.** Read-only; interactive (clickable rows); selectable (checkbox column first); with one money column showing the price flag in each row's key amount (other amounts plain, right-aligned, tabular).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | white rows, ink rules, no zebra |
| hover | read-only: none; clickable rows: `color.surface.default` fill, `motion.duration.instant` |
| focus-visible | 2px `color.focus.ring` outline inset −2px on the row or cell |
| selected | inset 2px `color.selected.border` left edge + checked checkbox; `aria-selected="true"` |
| loading | the frame and header stay; body rows are dashed placeholder boxes (`color.surface.raised`, 1px dashed `color.border.default`) at final size; "Loading" text for screen readers |
| empty | one full-width row with the dashed empty-state box and one action |
| error | one row: ink message, 16px danger "!" disc, outline "Try again" |

**Token mapping.** Frame and rules `color.border.default`; header `color.surface.default`; rows `color.surface.raised`; numbers right-aligned `font-variant-numeric: tabular-nums`; status cells use status pills (Badge).

**Keyboard and screen readers.** Real `<table>` with `<th scope>`; sortable headers are buttons with `aria-sort`; row actions are reachable by Tab; horizontal scroll container is focusable with a label.

**Do / Don't.** Do keep the header row paper and every rule ink. Don't put stickers, band colors or a lift on rows.
