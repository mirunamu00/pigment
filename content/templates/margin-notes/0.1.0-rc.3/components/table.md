### Table

**Use.** Records compared by the same attributes. Key/value data: spec rows, 180px key `color.text.secondary`, value, hairlines, `space.14` vertical padding; key above value under `breakpoint.md`.

**Anatomy.** Toolbar controls `size.controlSm`. Frame `color.surface.raised`, `elevation.rest`, `radius.panel`, clipped. Rows `size.row` (dense `size.rowCompact`), cells padding 0 `space.12`, `font.size.small` `color.text.body`. Header sans `font.size.caption`, `font.weight.medium`, `color.text.secondary`, hairline below. Numbers right-aligned. Row actions are the last column, right-aligned to the cell padding edge.

**Mobile (under `breakpoint.md`): stack.** Any table with a status column, an action column or more than 4 columns becomes one block per row. Keep the `<table>`, add `role` `table`/`rowgroup`/`row`/`columnheader`/`cell` so semantics survive `display: block`, and give each `<td>` a `data-label`. Every column stays a label/value pair (max 6; status, actions and the active sort key are never dropped); sort chips list only keys shown in the block.

```css
@media (max-width: 859px) {
  .table--stack thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .table--stack, .table--stack tbody, .table--stack tr, .table--stack td { display: block; }
  .table--stack tr { padding: var(--space-14) var(--space-16); border-bottom: 1px solid var(--color-border-default); }
  .table--stack td { display: grid; grid-template-columns: minmax(96px, 38%) 1fr; gap: var(--space-12); padding: var(--space-4) 0; text-align: left; }
  .table--stack td::before { content: attr(data-label); font-size: var(--font-size-caption); color: var(--color-text-tertiary); }
  .table--stack .cell-primary { display: block; font-size: var(--font-size-ui); font-weight: var(--font-weight-medium); padding-bottom: var(--space-6); }
  .table--stack .cell-primary::before, .table--stack .cell-actions::before { content: none; }
  .table--stack .cell-actions { display: flex; gap: var(--space-8); padding-top: var(--space-12); }
  .table--stack .cell-actions > * { flex: 1; height: var(--size-touch); }
}
```

**Mobile: scroll.** Other tables scroll in `<div class="table-scroll" role="region" tabindex="0" aria-label="{name}, scrolls sideways">`, the next column cut mid-cell. A script sets `data-overflow` (`scrollWidth > clientWidth`) and `data-at-end`; while content is off-screen the edge fades and a "Scroll sideways" hint (`font.size.caption`, `color.text.tertiary`) sits right-aligned above.

```css
.table-scroll { overflow-x: auto; min-width: 0; }
.table-scroll[data-overflow]:not([data-at-end]) { mask-image: linear-gradient(to left, transparent, black 32px); }
```

**States.** No zebra. Hover: `color.surface.subtle` at 50%. Selected: `color.surface.subtle` plus `inset 2px 0 0` `color.action.primary` on the first cell. Sorted header: `color.text.primary` and a 12px arrow. Loading: 5 skeleton rows. Error: danger callout with retry. Empty: empty state, no details. Focus (inset): shared.

**A11y.** `<th scope>`; sortable headers are buttons with `aria-sort`.
