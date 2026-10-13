### Text field

**Use.** Single-line input, including search. Textarea: min height 96px, padding `space.10` `space.12`, vertical resize.

**Anatomy.** Label above (`font.size.small`, `font.weight.medium`, `color.text.primary`), optional hint (`font.size.small`, `color.text.secondary`), input: `height: var(--size-control)` (toolbars `size.controlSm`), `box-sizing: border-box`, padding 0 `space.12`, `font.size.ui`, `radius.control`, `color.surface.raised`, 1px `color.border.control`, placeholder `color.text.tertiary`. In a flex row: `flex: 1 1 240px; min-width: 0`, one height for every control. Gaps `space.6`; fields `space.20` apart.

**States.** Hover: border `color.border.strong`. Read-only: `color.surface.subtle`. Error, focus, disabled: shared.

**A11y.** Visible `<label for>`, never placeholder-only.
