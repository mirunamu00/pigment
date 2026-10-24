### Segmented control

**Use.** 2 to 4 short modes of the same data (period, layout, theme).

**Anatomy.** Track `color.surface.subtle`, padding 3px, `radius.control`, height `size.control`. Segments `size.controlSm`, padding 0 `space.12`, `font.size.small`, `radius.inner`, `color.text.secondary`.

**States.** Hover `color.text.primary`. Selected: `color.surface.raised` segment, `elevation.segment`, `color.text.primary`, `font.weight.medium`. Focus, disabled: shared.

**A11y.** `radiogroup` with `radio` items; Arrows move the selection.
