### Dialog

**Use.** Confirm a consequential action or collect a short input.

**Anatomy.** Scrim: fixed, full screen, `color.surface.overlay`. Panel: `color.surface.lifted`, `radius.panel`, `elevation.pinned`, width `size.dialog` (under `breakpoint.md` full width minus `space.32`), padding `space.24`, centered. Title `font.size.h3` semibold; body `font.size.body` `color.text.body` `space.8` below. Actions `space.24` below, right-aligned, `space.8` apart: secondary then primary (mobile: full width, primary on top). A `size.controlSm` ghost close button top right. Destructive: danger primary; the title names the object.

**States.** Enter and exit per Motion; the scrim only fades. Loading: primary in loading state, other actions disabled. Error: a danger callout above the actions, focused. Focus: shared.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control, trap and return focus; Escape and a scrim click close it (not while loading).
