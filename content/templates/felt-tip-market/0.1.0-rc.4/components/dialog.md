### Dialog

**Purpose.** A focused task or confirmation that blocks the page. Short notices use a toast; long tasks use a page.

**Anatomy.** Scrim `color.surface.overlay` → panel (`color.surface.raised`, 1px ink, `radius.sm`, static hard shadow `offset.lift offset.lift 0 0 color.shadow.hard`) → header (title `font.size.title`, close icon button) → body → footer (actions right, primary last), header and footer divided by 1px ink rules.

**Sizes.** Width 480px (confirm) or 640px (form), max 100vw − `space.8`; header and footer padding `space.4` `space.6`, body `space.6`. Below `breakpoint.sm`: full width at the bottom, top corners `radius.sm`.

**Variants.** Confirm (one sentence, outline Cancel + primary or danger button); form; destructive confirm.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (open) | panel drops from 8px above to 0 over `motion.duration.lift` `motion.easing.lift`; scrim appears instantly; no opacity animation |
| focus-visible | 2px `color.focus.ring` on the focused control |

**Token mapping.** Panel `color.surface.raised`, `color.border.default`, `radius.sm`; shadow `color.shadow.hard`; scrim `color.surface.overlay`.

**Keyboard and screen readers.** `role="dialog"` `aria-modal` `aria-labelledby`; focus moves to the first field (or the safe action), is trapped, Escape closes, focus returns to the trigger.

**Do / Don't.** Do keep one primary action. Don't put stickers or bands in a dialog.
