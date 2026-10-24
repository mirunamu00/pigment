### Table

**Use.** Records compared by the same attributes. Key/value data uses spec rows: 180px mono key, value (mono when it is a number, date, amount or ID), hairline between rows, `space.14` vertical padding; under `breakpoint.md` the key stacks above the value.

**Anatomy.** Toolbar controls `size.controlSm`. Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row` (dense `size.rowCompact`), cells padding 0 `space.12`, `font.size.small` `color.text.body`. Header `font.size.caption`, `font.weight.medium`, `color.text.secondary`, hairline below. Row dividers `color.border.default`. Numbers, amounts, IDs, dates: mono, tabular, numbers right-aligned.

**Mobile (under `breakpoint.md`).** Up to 4 columns: the frame becomes `overflow-x: auto` (its grid or flex parents `min-width: 0`), first column at least 140px, primary text max 2 lines, trailing action column kept. 5 or more columns: stacked rows, one block per record: primary cell as a `font.size.ui` medium title, then 1 or 2 key values (status badge, amount) on one meta line, hairline between blocks; other columns move to the record's detail.

**States.** No zebra. Hover: `color-mix(in srgb, var(--color-surface-subtle) 50%, var(--color-surface-raised))`. Selected: `color.surface.subtle`, a 2px `color.action.primary` marker as `inset 2px 0 0` on the first cell. Loading: 5 skeleton rows. Error: a danger callout with retry. Empty: empty state without details. Focus (inset): shared.

**A11y.** Native `<table>`, `<th scope>`; sortable headers are buttons with `aria-sort`. A scrolling wrapper gets `tabindex="0"` and an `aria-label`.
