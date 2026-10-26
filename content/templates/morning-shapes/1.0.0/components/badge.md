### Badge

**Purpose.** A short label for status, category or count. Not interactive (use filter pills for that).

**Anatomy.** Pill (`radius.full`) → optional `size.dot` dot or 12px solid icon → label.

**Sizes.** Height 24px, padding 0 `space.3`, `font.size.fine` bold, `font.tracking.snug`; count badge min-width 20px, height 20px.

**Variants.**
- Category tag: filled in the category hue (`color.category.*`) with its `color.onField.*` text.
- Status: `color.surface.subtle` fill, `color.text.primary` label, leading dot in `color.status.success` / `warning` / `danger` / `info`.
- Highlight (an offer, "new"): `color.field.yellow` fill, ink label; one per card.
- On a field: `color.surface.raised` fill, ink label. On a photo: the glass chip.
- Count: `color.action.primary` fill, `color.text.onAction`.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant; static |

**Keyboard and screen readers.** Plain text; the status meaning is in the label, never only in the dot color. Counts get a visually hidden noun.

**Do / Don't.** Do keep labels to one or two words. Don't show more than four category hues in one view.
