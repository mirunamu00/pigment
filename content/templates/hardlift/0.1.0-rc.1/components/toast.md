### Toast

**Purpose.** Confirms a finished action or a non-blocking failure. Derived from the character; not shown in the reference.

**Anatomy.** `color.surface.raised` card, 1px `color.border.default`, `radius.sm`, `shadow.md` in `color.shadow.hard` always on; 24px icon (check on a pink circle for success, ink glyph otherwise), message `font.size.md`, optional text action, close button.

**Sizes.** Min height `size.control`, padding `space.12` `space.16`, max width 420px; fixed bottom-left `space.24` from the edges (under `breakpoint.md` `space.16`, full width); stack `space.8`, max 3, newest at the bottom.

**Variants.** Neutral, success, warning, danger, info differ by icon and wording only; the card never changes color.

**States.**

| State | What changes (tokens) |
| --- | --- |
| enter | slides up 16px in `motion.duration.base` `motion.easing.out`, no fade |
| hover | pauses auto-dismiss |
| focus-visible | 2px `color.focus.ring` outline on the action or close button |
| exit | instant |

**Token mapping.** As anatomy; reduced motion: appears in place.

**Keyboard and screen readers.** `role="status"` (`role="alert"` for danger); auto-dismiss after 5s unless it has an action; Escape dismisses.

**Do / Don't.** Do state what happened ("Saved"). Don't color the toast by status or stack more than 3.
