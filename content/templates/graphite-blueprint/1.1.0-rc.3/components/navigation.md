### Navigation

**Header.** `size.header`, sticky (Shape and depth). Left: the product name as text (`font.size.body` 590); ghost nav pills (`size.control`, `font.size.small` 510, gap `space.4`); right:
secondary links, a 1px 16px-tall `color.border.default` divider, one inverse pill. Cart or inbox: icon button with a
count badge (Badge) at its top right. Under `breakpoint.md`: name, inverse pill and a menu icon button opening a sheet
(`color.surface.subtle`, rows `size.row`, hairlines).

**Sidebar.** `size.sidebar`, `color.surface.subtle`, hairline right edge, padding `space.12` `space.8`; group labels
mono caption tertiary, `space.16` above; rows `size.rowDense`, `radius.sm`, 16px icon `color.icon.idle`,
`font.size.dense` `color.text.secondary`. Current row: `color.surface.tint`, text and icon primary,
`aria-current="page"`. Under `breakpoint.lg`: text-only nav pills (no icons) that wrap (`flex-wrap:wrap`, gap
`space.4`), so every item shows at 390px; over 6 items, one full-width secondary pill named after the current page
opens the sheet. Never a clipped or scrolling nav row.

**Contents list.** `font.size.small` secondary links; the current one primary with a 2px `color.text.primary` bar
on a hairline track at its left. Breadcrumbs: " / " separators.

**Footer.** Hairline top; `font.size.small` secondary link columns under 510 primary titles.
