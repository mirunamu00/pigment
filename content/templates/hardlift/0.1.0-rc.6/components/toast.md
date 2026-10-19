### Toast

**Purpose.** Confirms a finished action or a non-blocking failure. Derived from the character; not shown in the reference.

**Anatomy.** `color.surface.raised` card, 1px `color.border.default`, `radius.sm`, `shadow.md` in `color.shadow.hard` always on; 24px icon (check on a pink circle for success, ink glyph otherwise), message `font.size.md`, optional text action, close button. The action and close button are `lift--ghost` or `lift--ink`, never pink (pink is reserved for the one main action of the screen).

**Sizes.** Min height `size.control`, padding `space.12` `space.16`, max width 420px; fixed to a viewport bottom corner (bottom-right by default) `space.24` from the edges, outside the content column when the viewport is wider than the column; under `breakpoint.md` `space.16` from the edges, full width. A toast never covers content or controls: while any toast is shown, the page gets bottom padding equal to the toast stack height plus `space.16` so the last content can scroll clear of it, and a confirmation for a form or row action (Saved, Copied) is shown inline beside the control that triggered it (check icon + message, `role="status"`) instead of as a toast whenever the toast would land on that control. Stack `space.8`, max 3, newest at the bottom.

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

**Do / Don't.** Do state what happened ("Saved"), and after it appears check in each theme and at 390px that the control which triggered it is still fully visible. Don't place it over a form action row, sticky bar or primary button. Don't color the toast by status or stack more than 3.
