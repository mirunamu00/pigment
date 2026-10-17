### Table

**Anatomy.** No outer box: a hairline above the head and under each row (`color.border.subtle`), no zebra, no
vertical rules. Head: mono caption uppercase `color.text.tertiary`, height `size.rowDense`. Rows `size.row`
(`size.rowDense` from 20 rows), cells `font.size.small` `color.text.body`, padding 0 `space.12`; first column
`color.text.primary` 510; IDs, timestamps and codes mono caption; numbers right-aligned tabular. Status: 14px status
icon plus word. Row actions: ghost pills or icon buttons at the right. Sort: a 12px chevron after the head label.

**States.** Hover: `color.surface.tint`. Focus-visible (interactive rows): outline offset -2px. Selected:
`color.accent.subtle` with a 2px `color.accent.default` bar at the left, `aria-selected`. Sorted head
`color.text.secondary`, `aria-sort`. Syncing row: a 12px rise glyph in its status cell. Loading: 5 static rows of
`color.surface.card` bars. Empty: the empty state in one full-width cell. Error: a danger banner above with Retry.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside head cells.
