### Navigation

**Header.** Sticky, `size.header` on `color.surface.default`, a 4px `.dither` rule below, unchanged on scroll. Left: a 24px original pixel mark + product name 16/24 `color.text.strong`; then 3 to 5 nav items (`.item`, marker before the current one, `aria-current="page"`). Right: search as a framed button with a kbd hint, then the Animation and Pixel body switches as `.tool` text buttons, never tint-filled or framed:

```css
.tool{display:inline-flex;align-items:center;gap:var(--space-8);height:var(--size-control);padding-inline:var(--space-8);background:transparent;border:0;color:var(--color-text-secondary)}
.tool:hover{background:var(--color-surface-hover);color:var(--color-text-primary)}
```

 Dropdowns (user menu, sort) are marker menus: a Window under the trigger, options as `.item`, the highlighted option shows the marker. Search placeholders fit: one word ("Search") or the icon only under `breakpoint.sm`. Under `breakpoint.lg`: mark, search icon, menu button opening a marker-menu Window; Escape closes.

**Sidebar.** `size.sidebar`, `color.surface.subtle`, 2px `color.border.default` right edge. Group titles 12/18 `color.text.secondary`; items are `.item` with a 24px hue icon or a `size.bullet` hue bullet, label, count right in `color.text.secondary`; `.sep-dots` between items; the current item `color.surface.hover` + marker. Collapsible groups use right/down markers.

**Contents list.** 2px `color.border.default` left rule, items 16/24, nested items indented `space.16`, marker on the current heading. One item is always current: on load the first heading (`aria-current="location"`), then the heading under the header as the reader scrolls.

**Breadcrumbs, prev/next, pagination.** Breadcrumbs `color.text.secondary` with " / ", hover `color.text.strong` underlined. Prev/next: two columns, 2px `color.border.strong` top rule, ◀/▶ + 12px label, title 16/24. Pagination: ◀ 1 2 3 ▶ `size.control` squares, current page framed 2px `color.border.strong`, `aria-current`.

**Keyboard and screen readers.** `<nav aria-label>`; the menu button has `aria-expanded`; the mobile menu traps focus until closed.
