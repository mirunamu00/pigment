### Table

**Use.** Records compared by the same attributes. Key/value data: spec rows (180px key `color.text.secondary`, hairlines, `space.14` vertical padding; key above value on mobile).

**Anatomy.** Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row`, cells padding 0 `space.12`, `font.size.small`. Header sans caption, medium, `color.text.secondary`, hairline below. `table-layout: fixed` with `<col>` widths: numbers and dates sized to their longest value, status 120px, actions to their buttons, the primary column takes the rest, so filtering moves no column. Numbers right-aligned; row actions last, right-aligned.

**Mobile (under `breakpoint.md`): stack.** A table with a status or action column or more than 4 columns becomes one block per row. Keep the `<table>`, add `role` `table`/`rowgroup`/`row`/`columnheader`/`cell`, and a `data-label` per `<td>`. Columns become label/value pairs (max 6; never drop status, actions or the active sort key); sort chips list only shown keys.

```css
@media (max-width: 859px) {
  .table--stack thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .table--stack, .table--stack :is(tbody, tr, td) { display: block; }
  .table--stack tr { padding: var(--space-14) var(--space-16); border-bottom: 1px solid var(--color-border-default); }
  .table--stack td { display: grid; grid-template-columns: minmax(96px, 38%) 1fr; gap: var(--space-12); padding: var(--space-4) 0; text-align: left; }
  .table--stack td:not(.cell-primary, .cell-actions)::before { content: attr(data-label); font-size: var(--font-size-caption); color: var(--color-text-tertiary); }
  .table--stack .cell-primary { display: block; font-size: var(--font-size-ui); font-weight: var(--font-weight-medium); padding-bottom: var(--space-6); }
  .table--stack .cell-actions { display: flex; gap: var(--space-8); padding-top: var(--space-12); }
  .table--stack .cell-actions > * { flex: 1; height: var(--size-touch); }
}
```

**Mobile: scroll.** Other tables scroll in `<div class="table-scroll" role="region" tabindex="0" aria-label="{name}, scrolls sideways">`, a column cut mid-cell. A script sets `data-overflow` and `data-at-end`; while content is off-screen the edge fades and a caption "Scroll sideways" hint sits right-aligned above.

```css
.table-scroll { overflow-x: auto; min-width: 0; }
.table-scroll[data-overflow]:not([data-at-end]) { mask-image: linear-gradient(to left, transparent, black 32px); }
```

**States.** Hover: `color.surface.subtle` at 50%. Selected: `color.surface.subtle` plus `inset 2px 0 0` `color.action.primary` on the first cell. Sorted header: `color.text.primary`, 12px arrow. Loading: 5 skeleton rows. Error: danger callout with retry. Empty: empty state without details. Focus: inset.

**A11y.** `<th scope>`; sortable headers are buttons with `aria-sort`.
