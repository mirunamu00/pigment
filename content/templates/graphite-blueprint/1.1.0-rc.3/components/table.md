### Table

**Anatomy.** No outer box: a hairline above the head and under each row (`color.border.subtle`), no zebra, no
vertical rules. Head: `.mono-label`, height `size.rowDense`. Rows `size.row`
(`size.rowDense` from 20 rows), cells `font.size.small` `color.text.body`, padding 0 `space.12`; first column
`color.text.primary` 510; IDs, timestamps and codes mono caption; numbers right-aligned tabular. Status: 14px status
icon plus word. Row actions: bordered pills (`size.controlSm`) or icon buttons at the right, the same style at every
width. A badge naming the row ("This device") sits inline at the end of the first line's span
(`margin-left:space.8`), never in the pin or beside the lines. Sort: a 12px chevron after the head label.

**States.** Hover, focus-visible (interactive rows) and selected (`aria-selected`): Interaction. Sorted head
`color.text.secondary`, `aria-sort`. Syncing row: a 12px rise glyph in its status cell. Loading: 5 static rows of
`color.surface.card` bars. Empty: the empty state in one full-width cell. Error: a danger banner above with Retry.

**Small screens.** From `breakpoint.sm` to `breakpoint.md` the table scrolls in its wrapper, the first column
`white-space:nowrap` and `min-width:160px`; the pinned column (row actions, else status, else the key number) is `.pin`
on `th` and `td`: one action or status, right-aligned, empty on a row without it. Its head is one short word or
`.sr-only` over a number; the pin is never wider than its widest value plus `space.24`. Under `breakpoint.sm` only the
first and the pinned column show; the first cell holds at most two lines, each one line with an ellipsis: the primary
value, then its own second span (email, ID) or a hidden column's value via `data-sub` (never duplicated in the DOM).
If one row has a second line, all do (`data-sub=""`). A row badge shows its dot only there, label kept for screen
readers. Markup: `table.tbl` in `.tbl-wrap`; first `td` > `.cell-first` > avatar, `.cell-lines` > one or two spans
(`data-sub` only with one).

```css
.tbl .pin{position:sticky;right:0;z-index:1;text-align:right;background:var(--pin-bg,var(--color-surface-default));box-shadow:inset 1px 0 0 var(--color-border-subtle);}
.pin::before{content:"";position:absolute;inset-block:0;right:100%;width:var(--space-16);pointer-events:none;
  background:linear-gradient(90deg,transparent,var(--pin-bg,var(--color-surface-default)));}
tr:hover .pin{background:linear-gradient(var(--color-surface-tint),var(--color-surface-tint)),var(--pin-bg,var(--color-surface-default));}
.cell-first{display:flex;align-items:center;gap:var(--space-12);min-width:0;}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}
@media (max-width:639.98px){ /* breakpoint.sm */
  .tbl-wrap{overflow-x:visible;}
  .tbl{width:100%;}
  .tbl :is(th,td):not(:first-child):not(.pin){display:none;}
  .tbl :is(th,td):first-child{width:100%;max-width:0;overflow:hidden;}
  .tbl .pin{width:1%;white-space:nowrap;}
  .tbl .pin::before{display:none;}
  .cell-lines{flex:1;min-width:0;}
  .cell-lines>*,.cell-lines[data-sub]::after{display:block;line-height:var(--font-line-height-ui);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .cell-lines[data-sub]::after{content:attr(data-sub) "\00a0";color:var(--color-text-tertiary);}
  .cell-lines .badge{padding:0;border:0;} .cell-lines .badge-label{position:absolute;clip:rect(0 0 0 0);}
}
```

Inside a card set `--pin-bg:var(--color-surface-card)`.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside head cells.
