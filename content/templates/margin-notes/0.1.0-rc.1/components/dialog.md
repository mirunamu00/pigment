### Dialog

**Use.** Confirm a consequential action or collect a short input. Long forms get a page.

**Anatomy.** Overlay `color.surface.overlay`; panel `color.surface.raised`, `radius.panel`, `elevation.pinned`, max width `size.dialog` (mobile: full width minus `space.32`), padding `space.24`. Title `font.size.h3`, `font.weight.semibold`; body `font.size.body` `color.text.body` at `space.8`; actions right-aligned (secondary, then primary) `space.24` below, `space.8` apart. Destructive: danger primary, title names the object.

**States.** Enter: fade plus 4px rise over `motion.duration.overlay`; exit: fade. Loading: primary in loading state, other actions disabled. Error: a danger callout above the actions, focused.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control, trap it, return it on close; Escape closes unless busy.

**Do / Don't.** Do keep it to one decision. Don't put any detail in a dialog.
