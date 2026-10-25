### Badge

**Purpose.** Short status, category or count labels. Money, counts that matter and "new" use the price flag instead.

**Anatomy.** Status pill: outline pill → 8px dot (status or band color, 1px ink outline) → label. Chip: filled band color, ink text. Count: ink circle.

**Sizes.** Pill height 28px, padding 0 `space.3`, `font.size.meta`, `radius.full`, gap `space.2`. Count min 20px, `font.size.meta`.

**Variants.**
- Status pill: `color.surface.raised`, `border.width.hair` `color.border.default`, dot `color.status.*`.
- Chip (category, success): `color.band.*` fill, 1px ink, ink text.
- Count: `color.action.ink` fill, `color.action.onInk` text.
- Removable chip: chip + 16px ink × button.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant; static (removable chips lift on hover like buttons) |

**Token mapping.** Border `color.border.default`; dot `color.status.success` / `warning` / `danger` / `info`; chip `color.band.*` + `color.text.onBand`; count `color.action.ink` + `color.action.onInk`.

**Keyboard and screen readers.** The label text carries the meaning (never the dot alone); counts get context ("3 unread").

**Do / Don't.** Do use the dot for status and keep text ink. Don't write status text in a status color or use uppercase.
