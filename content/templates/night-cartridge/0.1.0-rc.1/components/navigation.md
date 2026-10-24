### Navigation

**Header.** Sticky, `size.header` on `color.surface.default`, a 4px `.dither` rule below, unchanged on scroll. Left: a 24px original pixel mark + product name 16/24 `color.text.strong`; then 3 to 5 nav items (`.item`, marker before the current one, `aria-current="page"`). Right: search as a framed tool button with a kbd hint, the Animation switch, other tools. Under `breakpoint.lg`: mark, search icon, menu button; the menu opens as a Window under the header with marker items; Escape closes.

**Sidebar.** `size.sidebar`, `color.surface.subtle`, 2px `color.border.default` right edge. Group titles 12/18 `color.text.secondary`; items are `.item` with a 24px hue icon or a `size.bullet` hue bullet, label, count right in `color.text.secondary`; `.sep-dots` between items; the current item `color.surface.hover` + marker. Collapsible groups use right/down markers.

**Contents list.** 2px `color.border.default` left rule, items 16/24, nested items indented `space.16`, marker on the current heading.

**Breadcrumbs, prev/next, pagination.** Breadcrumbs `color.text.secondary` with " / ", hover `color.text.strong` underlined. Prev/next: two columns, 2px `color.border.strong` top rule, ◀/▶ marker + 12px label, title 16/24. Pagination: ◀ 1 2 3 ▶ as `size.control` squares, the current page in a 2px `color.border.strong` frame with `aria-current="page"`.

**Keyboard and screen readers.** `<nav aria-label>`; the menu button has `aria-expanded`; the mobile menu traps focus until closed.

**Do / Don't.** Do keep one marker per menu. Don't mark the current item with a coloured underline bar.
