### Card

**Anatomy.** `color.surface.subtle`, no side or bottom border, a 4px `color.hue.*` top bar for its category or entity kind (neutral cards: a 2px `color.border.default` top rule), padding `space.16` `space.20`. Order: 24px pixel icon in the hue, title (16/24; 32/40 in feature grids) flush with the icon and meta, its marker hanging in the left padding (`.card-title`, never a reserved slot), one-line description `color.text.secondary`, meta 12/18 joined by " · ". Panel: labelled by a `size.bullet` + 12/18 caption, never a 32px title. KPI tile: label row (`size.bullet` + 12px label), 48px numeral `color.text.strong`, delta 12px in a status colour with an up/down marker, block meter. Product card: framed image area (photo, or the item's sprite on `color.surface.raised`), name, price 16/24 `color.text.strong`.

**States.** Hover (linked): `color.surface.hover`, the marker in the left padding beside the title. Focus-visible: ring, offset 3px. Active: `translate: 2px 2px`. Selected (plan, option): marker visible, 2px `color.text.accent` frame. Loading: flat static `color.surface.hover` blocks for icon, title and lines. Error: a callout with a 4px `color.status.danger` bar inside.

**Keyboard and screen readers.** The whole card is one link (the title link stretched); secondary actions are separate buttons.
