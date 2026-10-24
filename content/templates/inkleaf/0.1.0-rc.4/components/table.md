### Table

**Anatomy.** In a clipped card or bare. Head row `size.rowDense`, eyebrow type (Typography). Rows `size.rowDense` (comparison `size.row`), `font.size.dense`, hairlines only, no
zebra; cells padding 0 `space.16`; first column `color.text.primary`, others secondary; numbers right,
`tabular-nums`; `table-layout: fixed`. Group rows: serif `font.size.h5`. Booleans: check-circle or thin cross. Status: badge, running ones breathe. Row actions last:
small secondary buttons or a `size.controlSm` menu button.

**Toolbar** (a table in a card). Card head: one row, serif `font.size.h5` title left, count `font.size.caption`
`color.text.tertiary` right. Toolbar row `space.16` below, no other gap: filter chips left, search right, both
`size.control` high, `align-items: center`; the search label is visually hidden (`.sr-only` or `aria-label`),
never stacked above the field.

**States.** Hover, focus-visible, selected: Interaction. Sortable header: a button, `aria-sort`, sorted column
`color.text.primary` with a 12px arrow. Loading: 5 static skeleton rows. Empty: the empty state with a
`size.pictoMd` drawing. Error: danger line and "Retry".

**Mobile** (under `breakpoint.md`): tables with status or actions stack and hide the header row (never a
wrapped header above stacked rows); sorting moves to a native "Sort by" select in the toolbar. Others scroll in a
labelled `role="region"` wrapper, `tabindex="0"`.

Stacked: `thead` visually hidden; table, `tbody`, `tr`, `td` `display: block`; rows padded `space.12` `space.16`
over a hairline; each `td` a grid `minmax(96px, 38%) 1fr`, gap `space.12`, its `data-label` in a `::before` at
`font.size.caption`, `color.text.tertiary`.

Keep `<table>`, explicit `role`s, `data-label` per cell, `<th scope>`.
