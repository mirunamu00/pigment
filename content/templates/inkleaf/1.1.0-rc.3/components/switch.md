### Switch

**Anatomy.** `<input type="checkbox" role="switch">` with `appearance:none` is the track: `size.control` x
`space.24`, `radius.full`, `color.surface.subtle`, inset 1px `color.border.check` ring. Thumb: sibling span,
`space.16` circle, `color.surface.raised`, `pointer-events:none`, `space.4` inset. Switch rows: label left,
`font.size.small` secondary description below, at least `size.touch`, hairline below.

**States.** Hover: ring `color.text.primary`. Focus-visible: outline on the track. Selected: track
`color.action.primary`, thumb `color.text.onAction`, moved `space.16` over `motion.duration.hover`,
`motion.easing.settle`. Disabled: ring `color.border.default`, label `color.text.disabled`. A switch that applies
immediately needs no Save; inside a form, it follows the form's submit.
