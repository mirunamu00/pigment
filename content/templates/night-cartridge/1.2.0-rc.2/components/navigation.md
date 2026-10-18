### Navigation

**Header.** Sticky, `size.header` on `color.surface.default`, a 4px `.dither` rule below. Left: a 24px original pixel mark + product name 16/24 `color.text.strong`; then 3 to 5 nav items (`.item`, marker before the current one, `aria-current="page"`). Right: search as a framed button with a kbd hint, then the Animation and Pixel body switches as `.tool` text buttons (no fill or frame):

```css
.tool{display:inline-flex;align-items:center;gap:var(--space-8);height:var(--size-control);padding-inline:var(--space-8);background:transparent;border:0;color:var(--color-text-secondary)}
.tool:hover{background:var(--color-surface-hover);color:var(--color-text-primary)}
```

Dropdowns (user menu, sort) are marker menus: a Window under the trigger, options as `.item`. On open, in the same frame, focus moves to the current (or first) option, highlighted; arrows move it; Escape closes and refocuses the trigger. Search placeholders fit: one word ("Search") or the icon only under `breakpoint.sm`. Under `breakpoint.lg`: mark and product name, search icon, menu button opening a marker-menu Window; the name never hides at any width, in any app (nav items collapse into the menu instead).

**Sidebar.** `size.sidebar`, `color.surface.subtle`, 2px `color.border.default` right edge. Group titles 12/18 `color.text.secondary`; `.item` rows: 24px hue icon or `size.bullet`, label, count right in `color.text.secondary`; `.sep-dots` between; current item `color.surface.hover` + marker.

**Contents list.** 2px `color.border.default` left rule, items 16/24, nested items indented `space.16`, marker on the current heading. One item is always current: on load the first heading (`aria-current="location"`), then the heading under the header as the reader scrolls.

**Breadcrumbs, prev/next, pagination.** Breadcrumbs `color.text.secondary` with " / ", hover `color.text.strong` underlined. Prev/next: two columns, 2px `color.border.strong` top rule, ◀/▶ + 12px label, title 16/24. Pagination: ◀ 1 2 3 ▶ `size.control` squares, current page framed 2px `color.border.strong`, `aria-current`.

**Accessibility.** `<nav aria-label>`; the menu button has `aria-expanded`; the mobile menu traps focus until closed.
