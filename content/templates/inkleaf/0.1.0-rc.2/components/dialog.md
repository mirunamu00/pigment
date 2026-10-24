### Dialog

**Anatomy.** Native `<dialog>` with `showModal()`. `color.surface.raised`, `radius.stage`, padding `space.32`,
width `min(var(--size-dialog), 100% - 2 * var(--space-16))`, centered, `shadow.overlay`; backdrop `color.surface.overlay`. Title serif `font.size.h4`, 500, static; body `font.size.ui`,
`color.text.secondary`; actions right, `space.32` below, gap `space.12`: cancel secondary, confirm primary or
danger; stacked full width under `breakpoint.md`. Close: `size.controlSm` icon button.

**States.** Open and close per Motion. Focus-visible on open: first field, or cancel for destructive confirms.
Loading: glyph in confirm, others disabled. Error: `color.status.danger` line above actions, `role="alert"`.
Escape closes; focus returns to the trigger.
