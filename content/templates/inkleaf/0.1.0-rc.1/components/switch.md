### Switch

**Anatomy.** `<input type="checkbox" role="switch">` with `appearance: none` is the track: `size.control` x
`space.24`, `radius.full`, `color.surface.subtle`, inset 1px `color.border.check` ring. Thumb: sibling span,
`space.16` circle, `color.surface.raised`, `pointer-events: none`, `space.4` inset. Settings rows: label left,
description below in `font.size.small`, `color.text.secondary`, row at least `size.touch`, hairline below.

**States.** Hover: ring `color.text.primary`. Focus-visible: outline on the track. Selected: track
`color.action.primary`, thumb `color.text.onAction`, moved `space.16` over `motion.duration.hover`,
`motion.easing.settle`. Disabled: ring `color.border.default`, label `color.text.disabled`. Loading: the glyph
replaces the description until saved. Applies immediately, never behind a Save button.
