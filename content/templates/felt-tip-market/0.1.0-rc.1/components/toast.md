### Toast

**Purpose.** Brief confirmation or failure after an action. Errors that block work stay inline.

**Anatomy.** Panel (`color.surface.raised`, 1px ink, `radius.sm`, static hard shadow `offset.lift`) → status dot or 20px glyph (or a price flag for money/"New") → one sentence → optional compact outline action → close icon button.

**Sizes.** Width 360px (full width − `space.8` on phones), min height `size.row`, padding `space.3` `space.4`, gap `space.3`; stack `space.2` apart at bottom-right, `space.6` from the edges (bottom-center on phones).

**Variants.** Success (teal dot), info (periwinkle dot), warning (marigold dot), error (danger "!" disc; stays until dismissed), money or new (flag).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | slides up 8px → 0 over `motion.duration.lift` `motion.easing.lift`; leaves by sliding 8px down; auto-dismiss after 5s (paused on hover and focus) except errors. Reduced motion: appears and leaves in place |

**Token mapping.** Panel `color.surface.raised`, `color.border.default`, `color.shadow.hard`; dots `color.status.*`; text `color.text.primary`.

**Keyboard and screen readers.** Region `role="status"` (`role="alert"` for errors), `aria-live` polite; actions reachable by keyboard; never the only place an outcome is shown.

**Do / Don't.** Do keep it to one sentence. Don't color the whole toast with a band.
