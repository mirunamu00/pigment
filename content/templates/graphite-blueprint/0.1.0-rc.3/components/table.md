### Table

**Anatomy.** No outer box: a hairline above the head and under each row (`color.border.subtle`), no zebra, no
vertical rules. Head: mono caption uppercase `color.text.tertiary`, height `size.rowDense`. Rows `size.row`
(`size.rowDense` from 20 rows), cells `font.size.small` `color.text.body`, padding 0 `space.12`; first column
`color.text.primary` 510; IDs, timestamps and codes mono caption; numbers right-aligned tabular. Status: 14px status
icon plus word. Row actions: ghost pills or icon buttons at the right. Sort: a 12px chevron after the head label.

**States.** Hover, focus-visible (interactive rows) and selected (`aria-selected`): Interaction. Sorted head
`color.text.secondary`, `aria-sort`. Syncing row: a 12px rise glyph in its status cell. Loading: 5 static rows of
`color.surface.card` bars. Empty: the empty state in one full-width cell. Error: a danger banner above with Retry.

**Small screens.** Under `breakpoint.md` the first column keeps `white-space:nowrap` and `min-width:160px`, and the
table scrolls inside its wrapper; no cell wraps past 2 lines. The pinned column (status or actions) is opaque, with a
1px edge and a 16px fade over the cells scrolling under it. Under `breakpoint.sm` hide
secondary columns (location, last active, owner); to keep a value, show it as the first cell's second line via
`content:attr(data-sub)`, never duplicated in the DOM.

```css
.pin{position:sticky;right:0;z-index:1;background:var(--pin-bg,var(--color-surface-default));box-shadow:inset 1px 0 0 var(--color-border-subtle);}
.pin::before{content:"";position:absolute;inset-block:0;right:100%;width:var(--space-16);pointer-events:none;
  background:linear-gradient(90deg,transparent,var(--pin-bg,var(--color-surface-default)));}
tr:hover .pin{background:linear-gradient(var(--color-surface-tint),var(--color-surface-tint)),var(--pin-bg,var(--color-surface-default));}
```

Inside a card set `--pin-bg:var(--color-surface-card)`.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside head cells.
