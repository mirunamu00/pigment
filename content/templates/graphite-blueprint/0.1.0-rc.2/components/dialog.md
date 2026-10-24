### Dialog

**Anatomy.** Native `<dialog>` where it exists. Panel max `size.dialog`, `color.surface.subtle`, `radius.lg`,
`elevation.popover`, padding `space.24`: mono caption label (the object or step), title `font.size.title` 590, body
`font.size.body` `color.text.body`; footer right-aligned, gap `space.8`: bordered Cancel, then the inverse pill
(danger for destructive confirms). Scrim `color.surface.overlay` with `backdrop-filter:blur(4px)`. Under
`breakpoint.sm`: full width at the bottom, top corners `radius.lg`, actions stacked, primary first.

**States.** Open: scrim fade, panel opacity and `scale(0.98)` to 1 over `motion.duration.ui`; close 60% as long.
Focus moves to the first control; Escape and Cancel close it and focus returns to the trigger. Submitting: button
loading state. Error: a danger banner above the footer. `aria-labelledby` the title.
