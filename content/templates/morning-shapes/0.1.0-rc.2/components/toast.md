### Toast

**Purpose.** Brief confirmation of something that already happened, with at most one action (undo, view).

**Anatomy.** Pill (`color.surface.inverse`, `radius.full`, `shadow.float`) → 24px leading mark (a sparkle from the shape kit for success, a solid `color.status.danger` alert glyph for failure, a `color.status.info` dot otherwise) → text `font.size.body` medium → optional text action, bold, underlined.

**Sizes.** Height 48px, padding 0 `space.5`, gap `space.3`, max-width 480px; bottom center, `space.6` from the edge; up to three stacked, gap `space.2`.

**Variants.** Success, info, error (error toasts stay until dismissed and add a close circle).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | enters as Motion → toast enter; the success sparkle turns once (`ms-orbit`); stays 5s, pauses on hover and focus; fades out over `motion.duration.snap` |

**Token mapping.** As in Anatomy; text `color.text.inverse`, sparkle `color.field.yellow`.

**Keyboard and screen readers.** Container `role="status"` (`role="alert"` for errors), `aria-live="polite"`; the action is reachable by keyboard; a toast is never the only report of a form error.

**Do / Don't.** Do keep it to one line. Don't stack more than three or use it for errors the user must fix in a form.
