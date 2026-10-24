### Card

**Anatomy.** `color.surface.card`, 1px `color.border.default`, `radius.md`, padding `space.20` (app) or `space.24`
(content). `.mono-label` meta above the title; body
`color.text.secondary`. Media on top: a spec plate or photo, flush, the card padding below. Metric card: mono label on one line
(a long one ends in an ellipsis, full label in `title`) so values in a row align; change in `font.size.small` with a
6px status dot. Choice card (one of several options side by side): name, its key figure in `font.size.h3`, then its
items; ranked choices add a `bp--sm` stack, one slab per rank.

**States.** Linked card: the title link's `::after` covers the card; controls inside get `position:relative;z-index:1`.
Current or selected: border `color.border.strong` plus a badge naming the state. Loading: static bars on
`color.surface.hover`. Error: a danger banner inside with Retry.

