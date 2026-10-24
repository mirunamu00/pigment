### Table

**Use.** Many records compared by the same attributes. Key/value data uses spec rows: 180px mono key, value, hairline between rows, `space.14` vertical padding.

**Anatomy.** Toolbar controls `size.controlSm`. Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row` (dense `size.rowCompact`), cells padding 0 `space.12`, `font.size.small` `color.text.body`. Header `font.size.caption`, `font.weight.medium`, `color.text.secondary`, hairline below. Row dividers `color.border.default`. Numbers, IDs, dates: mono, tabular, right-aligned. Selectable: a 40px checkbox column.

**States.** No zebra. Hover: `color-mix(in srgb, var(--color-surface-subtle) 50%, var(--color-surface-raised))`. Selected: `color.surface.subtle`, a 2px `color.action.primary` marker as `inset 2px 0 0` on the first cell. Loading: 5 skeleton rows. Error: a danger callout with retry replaces the rows. Empty: the empty-state component without details. Focus (inset): shared.

**A11y.** Native `<table>`, `<th scope>`; sortable headers are buttons with `aria-sort`.

**Do / Don't.** Do right-align numbers in mono. Don't put a detail or a colored header in or behind a table.
