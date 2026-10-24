### Card

**Anatomy.** `color.surface.card`, 1px `color.border.default`, `radius.md`, padding `space.20` (app) or `space.24`
(content). Mono caption meta above the title; title `font.size.body` (590 app, 510 content) `color.text.primary`; body
`color.text.secondary`. Media on top: a spec plate or photo, flush, the card padding below. KPI card: mono label, value
`font.size.h3` 510 tabular, change in `font.size.small` with a 6px status dot (never a colored number). Plan card:
tier slabs, name, price `font.size.h3`, 16px checks.

**States.** Linked card: hover and focus per Interaction; the whole card is one link (the title link stretched with
`::after`); every control inside the card gets `position:relative;z-index:1` so the overlay never covers it.
Current or selected: border `color.border.strong` plus a "Current" badge. Loading: static bars on
`color.surface.hover`. Error: a danger banner inside with Retry.

