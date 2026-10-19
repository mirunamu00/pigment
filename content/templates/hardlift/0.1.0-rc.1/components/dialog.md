### Dialog

**Purpose.** A blocking task or confirmation. Derived from the character; not shown in the reference. Prefer inline editing and toasts for non-blocking work.

**Anatomy.** Scrim (`color.scrim`) + panel: `color.surface.raised`, 1px `color.border.default`, `radius.md`, `shadow.lg` in `color.shadow.hard`. Title `font.size.xl`, body, footer row (ghost cancel, one pink action) right-aligned; close icon button top right.

**Sizes.** Width 480px (form 640px), max `100vw - 32px`; padding `space.24`; gap `space.16`. Under `breakpoint.md` full width with `space.16` margins.

**Variants.** Confirm, form, destructive (confirm button is ink with a `color.status.danger` icon beside the title; never a red fill).

**States.**

| State | What changes (tokens) |
| --- | --- |
| open | panel translates up 8px into place over `motion.duration.slow` `motion.easing.out`, scrim appears instantly; no scale, no fade |
| focus-visible | 2px `color.focus.ring` outline, 2px offset, on every control |
| closing | instant |

**Token mapping.** As anatomy; reduced motion: appears in place.

**Keyboard and screen readers.** `role="dialog"` + `aria-modal`, labelled by the title; focus moves into the dialog and is trapped; Escape closes; focus returns to the trigger; scrim click closes unless a form is dirty.

**Do / Don't.** Do keep the title a verb phrase. Don't stack dialogs or blur the scrim.
