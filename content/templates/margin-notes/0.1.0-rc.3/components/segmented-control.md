### Segmented control

**Use.** 2 to 4 short modes of the same data (period, layout, status filter).

**Anatomy.** Track `color.surface.subtle`, padding 3px, `radius.control`, height `size.control`. Segments `size.controlSm`, padding 0 `space.12`, `font.size.small`, `radius.inner`, `color.text.secondary`.

**States.** Hover `color.text.primary`. Selected: `color.surface.raised`, `elevation.segment`, `color.text.primary`, `font.weight.medium`. Focus, disabled: shared.

**A11y.** `radiogroup` of `radio`; Arrows move.
