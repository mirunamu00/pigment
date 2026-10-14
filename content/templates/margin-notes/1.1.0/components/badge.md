### Badge

**Use.** Non-interactive status, version, count, category or marker.

**Anatomy.** 22px tall, padding 0 `space.8`, `font.size.caption`, `radius.full`, optional 6px dot or 12px icon at `space.6`, 1 to 2 words. After inline text: `margin-left: space.8; vertical-align: middle`.

**Variants.** Status: `color.status.{tone}Subtle` ground, `color.status.{tone}` text and dot. Neutral: `color.surface.subtle`, `color.text.secondary`; also markers (current plan, "This device") beside the card title. Count (max 1 per screen, e.g. cart): `color.action.primary`, `color.text.onAction`. Version or ID: mono, `radius.inner`, 1px `color.border.strong`. A marker rendered as a `<button>` keeps the element, styled as this badge.

**A11y.** Counts get a hidden noun ("3 unread").
