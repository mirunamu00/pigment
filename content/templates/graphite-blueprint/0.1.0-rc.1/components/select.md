### Select

**Anatomy.** Trigger like the text field (`size.field`, `radius.sm`, `color.surface.card`, 1px
`color.border.default`), value `color.text.primary`, 16px chevron `color.icon.idle` at the right. Prefer the native
`<select>` styled this way (`appearance:none`). Custom menus: `color.surface.raised`, `radius.md`,
`elevation.popover`, padding `space.4`, rows `size.rowDense` with `radius.sm`, section labels mono caption tertiary,
a 16px check at the right of the selected row.

**States.** Hover: border `color.border.strong`. Focus-visible: accent border plus outline. Open: chevron 180°
(`motion.duration.open`), menu opacity and `scale(0.98)` to 1 over `motion.duration.ui`, opening with the current
option highlighted. Option hover or active: `color.surface.hover`. Disabled: `opacity.disabled`. Error: as Text field.

**Keyboard and screen readers.** Custom menus: `role="listbox"`, arrows move, Enter selects, Escape closes and returns focus.
