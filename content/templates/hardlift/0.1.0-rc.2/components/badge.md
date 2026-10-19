### Badge

**Purpose.** Labels a status, category or count. Not clickable (if clickable, it is a pill).

**Anatomy.** Pill with 1px `color.border.default`, optional 12px dot or 16px icon, label `font.size.sm`.

**Sizes.** Height 24px, padding `space.4` `space.8`, `radius.full`.

**Variants.** Neutral (`color.surface.raised`), accent (`color.action.primary` fill, ink text: price or "new"), status (neutral fill with a 16px icon in `color.status.success`, `color.status.warning`, `color.status.danger` or `color.status.info` plus the word). Never filled by status color.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant; no hover, no lift |

**Token mapping.** `radius.full`, `border.width.thin`, text `color.text.primary`.

**Keyboard and screen readers.** Plain text, not focusable; status meaning is in the word and icon, not hue.

**Do / Don't.** Do pair an icon and a word. Don't use more than one accent badge per card.
