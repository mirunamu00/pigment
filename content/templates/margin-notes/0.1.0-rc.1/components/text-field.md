### Text field

**Use.** Single-line input. Textarea: same spec, min height 96px, padding `space.10` `space.12`, vertical resize.

**Anatomy.** Label above (`font.size.small`, `font.weight.medium`, `color.text.primary`), optional hint (`font.size.small`, `color.text.secondary`), input, message line. Input `size.control` (`size.controlSm` in toolbars), padding 0 `space.12`, `font.size.ui`, `radius.control`, `color.surface.raised` fill, 1px `color.border.control`, placeholder `color.text.tertiary`. Gaps `space.6`; stacked fields `space.20` apart. Optional leading icon (`color.text.tertiary`) or mono suffix for units.

**States.** Hover: border `color.border.strong`. Read-only: `color.surface.subtle` fill. Error: border `color.status.danger` plus the shared error message. Focus, disabled: shared.

**A11y.** Visible `<label for>` always, never placeholder-only. Messages via `aria-describedby`; errors set `aria-invalid="true"`; on submit, focus the first invalid field.

**Do / Don't.** Do validate on blur and on submit. Don't place any studio detail in a form.
