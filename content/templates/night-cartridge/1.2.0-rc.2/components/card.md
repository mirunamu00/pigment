### Card

**Anatomy.** `color.surface.subtle`, no side or bottom border, a 4px `color.hue.*` top bar for its category or entity kind (neutral cards: a 2px `color.border.default` top rule), padding `space.16` `space.20`. Order: 24px pixel icon in the hue, title (16/24; 32/40 in feature grids) flush with icon and meta, its marker in the left padding (`.card-title`), description `color.text.secondary` wrapping to at most 2 lines (`-webkit-line-clamp:2`), never cut to 1 where the card has room, meta 12/18. Panel: a `size.bullet` + 12/18 caption, never a 32px title (the group's ruled h2 sits outside). KPI tile: label row (`size.bullet` + 12px label), 48px numeral `color.text.strong`, delta 12px in a status colour with an up/down marker, a block meter per Game-window chrome. Product card: framed picture window (photo or sprite per Imagery; `aspect-ratio:4/3` under `breakpoint.sm`, never square there), name, price 16/24 `color.text.strong`.

**States.** Hover (linked): `color.surface.hover`, marker beside the title. Focus and press per Interaction. Selected (plan, option): marker visible, 2px `color.text.accent` frame. Loading: static `color.surface.hover` blocks. Error: a callout with a 4px `color.status.danger` bar inside.

**Accessibility.** The whole card is one link (the title link stretched); secondary actions are separate buttons.
