### Segmented control

**Use.** 2 to 4 short modes of the same data.

**Anatomy.** Track `color.surface.subtle`, padding 3px, `radius.control`, height `size.control`. Segments `size.controlSm`, padding 0 `space.12`, `font.size.small`, `radius.inner`, `color.text.secondary`.

**States.** Hover `color.text.primary`. Selected: `color.surface.selected`, `box-shadow: var(--elevation-segment), inset 0 0 0 1px var(--color-border-selected)` (dark ring 4.6:1 on the track), `color.text.primary`, medium.

**A11y.** `radiogroup` of `radio`; Arrows move.
