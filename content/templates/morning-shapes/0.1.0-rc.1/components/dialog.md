### Dialog

**Purpose.** A short task or confirmation that blocks the page. Long tasks get their own screen.

**Anatomy.** Scrim (`color.surface.overlay`) → panel (`color.surface.default`, `radius.xl`, max-width 560px) → title `font.size.h4` bold → body `font.size.body` → footer (`color.surface.subtle`, actions right-aligned) → close circle (`size.circleSm`, cream, top right).

**Sizes.** Panel padding `space.8` (`space.6` on phones); footer padding `space.6` `space.8`, gap `space.3`. On phones the dialog is a bottom sheet with `radius.xl` top corners and full-width stacked pills.

**Variants.** Confirm (cream cancel + ink confirm); destructive (cream cancel + ink pill with a leading `color.status.danger` alert glyph and a label naming the action); form dialog (fields on white, ink submit).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (open) | scrim and panel enter: opacity 0 → 1, panel translateY 8px → 0, `motion.duration.snap`, `motion.easing.snap`; no shadow |
| focus-visible | focus moves to the first field or the least destructive action; 2px `color.focus.ring` |
| closing | the reverse over `motion.duration.snap`; reduced motion: instant |

**Token mapping.** As in Anatomy.

**Keyboard and screen readers.** `role="dialog"` (`alertdialog` for destructive), `aria-modal`, `aria-labelledby`; focus trapped; Escape and the close circle close it; focus returns to the trigger.

**Do / Don't.** Do keep it to one decision. Don't put shapes, glyphs or a field inside a dialog.
