### Card

**Anatomy.** `color.surface.subtle`, no side or bottom border, a 4px `color.hue.*` top bar (category or entity kind) (neutral: a 2px `color.border.default` top rule), padding `space.16` `space.20`. Order: 24px icon in the hue; title (16/24; 32/40 in feature grids) flush with icon and meta, marker in the left padding (`.card-title`); description `color.text.secondary` up to 2 lines (`-webkit-line-clamp:2`), never clamped to 1, meta 12/18. Panel: `size.bullet` + 12/18 caption, never a 32px title (the group's ruled h2 sits outside). KPI tile: label row (`size.bullet` + 12px label), 48px numeral `color.text.strong`, 12px delta in a status colour with an up/down marker, a block meter. Product card: framed picture window (photo or sprite per Imagery; 4:3 under `breakpoint.sm`, never square), name, price 16/24 `color.text.strong`.

**States.** Hover (linked): `color.surface.hover`, marker beside the title. Focus and press per Interaction. Selected (plan, option): marker visible, 2px `color.text.accent` frame. Loading: static `color.surface.hover` blocks. Error: a callout with a 4px `color.status.danger` bar inside.

**Accessibility.** The whole card is one link (the title link stretched); secondary actions are separate buttons.
