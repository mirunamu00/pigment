### Dialog

**Use.** Confirm a consequential action or collect short input.

**Anatomy.** Centered on both axes at every width; never top-aligned or a bottom sheet. Native `<dialog>`: `position: fixed; inset: 0; margin: auto; height: fit-content; width: min(var(--size-dialog), 100vw - var(--space-32)); max-height: calc(100dvh - var(--space-64)); overflow: auto`, `::backdrop` `color.surface.overlay`; a custom scrim is fixed, `display: grid; place-items: center; padding: var(--space-16)`. Panel `color.surface.lifted`, `radius.panel`, `elevation.pinned`, padding `space.24`. Title `font.size.h3` semibold, body `space.8` below, actions `space.24` below: right-aligned, `space.8` apart, secondary then primary (mobile: full width, primary on top). Ghost close button top right. Destructive: danger primary.

**States.** The scrim only fades. Loading: primary loading, others disabled. Error: danger callout above the actions.

**A11y.** `role="dialog"` (`alertdialog` when destructive), `aria-modal`, `aria-labelledby`. Focus the least destructive control with its ring showing (`focus({ focusVisible: true })`); trap and return focus; Escape and a scrim click close it (not while loading).
