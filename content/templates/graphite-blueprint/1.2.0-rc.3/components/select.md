### Select

**Anatomy.** Trigger as Text field, value `color.text.primary`, 16px chevron `color.icon.idle` at the right. Prefer a native
`<select>` (`appearance:none`). Custom menus: `color.surface.raised`, `radius.md`,
`elevation.popover`, padding `space.4`, rows `size.rowDense` with `radius.sm`, section labels `.mono-label`,
a 16px check at the right of the selected row.

**States.** Hover, focus-visible: as Text field. Open: chevron and menu per Motion,
the current option highlighted. Option hover or active: `color.surface.hover`. Disabled: `opacity.disabled`. Error: as Text field.

**Keyboard and screen readers.** Custom menus: `role="listbox"`, arrows move, Enter selects, Escape closes and returns focus.
