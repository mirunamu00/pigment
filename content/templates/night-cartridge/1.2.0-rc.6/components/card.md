### Card

**Anatomy.** `color.surface.subtle`, no side or bottom border, a 4px `color.hue.*` top bar (category or entity kind; neutral: a 2px `color.border.default` top rule), padding `space.16` `space.20`. Order: 24px hue icon; title (16/24; 32/40 in feature grids) flush with icon and meta, marker in the left padding (`.card-title`); description `color.text.secondary`, whole in `.cards` (clamped past 4 lines), at 2 lines in `.tiles` and product cards (never 1); meta 12/18. Panel: `size.bullet` + 12/18 caption, never a 32px title (its ruled h2 sits outside). KPI tile: label row (`size.bullet` + 12px label), 48px numeral `color.text.strong`, 12px delta in a status colour with an up/down marker, a block meter. Product card: framed picture window (photo or sprite per Imagery; 4:3 under `breakpoint.sm`, never square), name, price 16/24 `color.text.strong`.

**States.** Hover (linked) per Interaction, marker beside the title. Selected (plan, option): marker visible, 2px `color.text.accent` frame. Error: a callout with a 4px `color.status.danger` bar inside.

**Accessibility.** The whole card is one link (the title link stretched); secondary actions are separate buttons.
