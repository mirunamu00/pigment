### Navigation

**Header.** `size.header`, sticky, `color.surface.default`, 1px `color.border.default` bottom ring. Product name
as serif `font.size.h5` text (no invented logo); in a product shell its left edge lines up with the sidebar item
text (`space.16` + `space.12` from the edge). Links `font.size.ui`, `color.text.secondary`, padded boxes
`size.controlSm` high, gap `space.16`; current `color.text.primary`, 500, `aria-current="page"`. Right: small
secondary, then small primary. Below `breakpoint.lg`, more than 3 links collapse into a `size.touch` menu button and a
full-width sheet of hairline `size.touch` rows.

**Sidebar** (from `breakpoint.lg`). `size.sidebar`, right hairline, padding `space.16`; items `size.control`,
`radius.control`, padding 0 `space.12`, 16px icon; current `color.surface.subtle`, `color.text.primary`, 500; group
labels `font.size.micro` uppercase `color.text.tertiary`.

**Breadcrumb.** `font.size.small`, `color.text.secondary`, "/" in `color.text.tertiary`, `space.16` below.

**Footer.** Content sites with at least two link groups: `color.surface.inverse` band, padding `space.96` 0,
`font.size.caption` link columns in `color.text.inverseMuted`. Otherwise, and in product apps: a hairline, then one
caption line, padding `space.24` 0; the inverse band never holds a single sentence.

**A11y.** `<nav aria-label>`, skip link, Escape closes menus.
