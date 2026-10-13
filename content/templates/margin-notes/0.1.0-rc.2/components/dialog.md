### Dialog

**Use.** Confirm a consequential action or collect a short input.

**Anatomy.** Overlay `color.surface.overlay`; panel `color.surface.raised`, `radius.panel`, `elevation.pinned`, max width `size.dialog` (mobile: full width minus `space.32`), padding `space.24`. Title `font.size.h3`, `font.weight.semibold`; body `font.size.body` `color.text.body` at `space.8`; actions right-aligned (secondary, then primary) `space.24` below, `space.8` apart. Destructive: danger primary, title names the object.

**States.** Enter and exit per Motion. Loading: primary in loading state, other actions disabled. Error: a danger callout above the actions, focused.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control, trap and return focus; Escape closes.
