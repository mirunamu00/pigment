### Table

**Purpose.** Compare many records by columns. Derived from the character; not shown in the reference.

**Anatomy.** One bordered box (1px `color.border.default`, `radius.md`, overflow clipped): header row on `color.surface.subtle`, body rows on `color.surface.raised` separated by 1px `color.border.hairline`, no zebra, no vertical rules. A toolbar above holds a search field, pill filters and the one pink action.

**Sizes.** Row height 44px; cell padding `space.8` `space.12`; header `font.size.sm`, sentence case, regular weight, `color.text.secondary`; cells `font.size.sm`; numbers right-aligned with tabular figures; totals `font.weight.bold`.

**Variants.** Sortable (header is a button with a 16px arrow), selectable (leading checkbox column), sticky header (2px `color.border.default` bottom rule). Dense is the default. Row actions are 2px-lift icon buttons in the last column.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as anatomy |
| hover | row fill `color.surface.subtle`; the row never lifts |
| selected | `color.surface.subtle` fill + 2px ink rule on the left edge |
| loading | rows replaced by the turning coin centered in the box, `aria-busy` |
| empty | in-box empty state: one `size.sticker` sticker, one sentence, one button |
| error | in-box message with `color.status.danger` icon and a retry button |
| focus-visible | 2px `color.focus.ring` outline on the focused control, offset -2px |

**Token mapping.** As above; pagination is pills below the box; below `breakpoint.md` the box scrolls horizontally inside itself with the first column sticky.

**Keyboard and screen readers.** Native `<table>` with `<th scope>`; sortable headers expose `aria-sort`; row selection via checkbox; caption or `aria-label` names the table.

**Do / Don't.** Do keep one pink action in the toolbar. Don't lift rows or cells, color header cells, or add zebra stripes.
