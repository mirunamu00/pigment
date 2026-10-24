### Card

**Anatomy.** `color.surface.card`, 1px `color.border.default`, `radius.md`, padding `space.20` (app) or `space.24`
(content). `.mono-label` meta above the title; title per Typography; body
`color.text.secondary`. Media on top: a spec plate or photo, flush, the card padding below. KPI card: mono label on one line
(ellipsis, full label in `title`; under `breakpoint.sm` a shorter label or one card per row) so values align; value `font.size.h3` 510 tabular, change in `font.size.small` with a 6px status dot. Plan card:
tier slabs, name, price `font.size.h3`, 16px checks.

**States.** Linked card: the title link stretched with `::after` makes the whole card
one link; controls inside get `position:relative;z-index:1`.
Current or selected: border `color.border.strong` plus a "Current" badge. Loading: static bars on
`color.surface.hover`. Error: a danger banner inside with Retry.

