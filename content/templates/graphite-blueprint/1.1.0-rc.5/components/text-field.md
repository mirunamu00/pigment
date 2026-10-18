### Text field

**Anatomy.** Label above (`font.size.small` 510, `color.text.body`); control `size.field` high,
`radius.sm`, `color.surface.card`, 1px `color.border.default`, padding 0 `space.12`, text `font.size.dense`
`color.text.primary`, placeholder `color.text.tertiary`; helper (Spacing) in `font.size.caption` sans,
`color.text.secondary`. Textarea: min 3 rows, padding `space.8` `space.12`, a mono counter right of the helper
("120 / 160"). Search: pill, `size.control`, 16px icon at `space.12`, text from 36px.

**States.** Hover and focus-visible: Interaction.
Disabled: `opacity.disabled` on `color.surface.subtle`. Error: border `color.status.danger`; the message replaces the
helper in `color.status.danger`, `aria-invalid="true"`, `aria-describedby`; never a red fill. Every failed submit,
one-field forms too, shows a banner directly above the actions (`space.32` gap, hairline box,
`color.status.dangerTint` wash, 6px danger dot, "2 fields need attention" in `color.text.body`, `role="alert"`), never
bare red text. Focus moves to the first invalid field, scrolled into view. If that field is more than one viewport
above the banner, repeat the banner as the form's first child (above the first group), keeping the one above the
actions.
Checking (async only): the helper becomes a shimmer line ("Checking").

**Keyboard and screen readers.** Native input; the visible label is its `<label for>`.
