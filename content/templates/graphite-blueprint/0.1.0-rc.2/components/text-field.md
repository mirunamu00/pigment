### Text field

**Anatomy.** Label above (`font.size.small` 510, `color.text.body`); control `size.field` high,
`radius.sm`, `color.surface.card`, 1px `color.border.default`, padding 0 `space.12`, text `font.size.dense`
`color.text.primary`, placeholder `color.text.tertiary`; helper (Spacing) in `font.size.caption` sans,
`color.text.secondary`. Textarea: min 3 rows, padding `space.8` `space.12`; a counter right of the helper in mono
caption ("120 / 160"). Search: pill (`radius.full`), `size.control`, 16px icon at `space.12`, text from 36px.

**States.** Hover and focus-visible: Interaction (strong border; accent border plus outline).
Disabled: `opacity.disabled` on `color.surface.subtle`. Error: border `color.status.danger`; the message replaces the
helper in `color.status.danger`, `aria-invalid="true"`, `aria-describedby`; never a red fill. A failed submit shows
the count above the actions ("2 fields need attention", `role="alert"`) and focuses the first invalid field.
Checking (async only): the helper becomes a shimmer line ("Checking").

**Keyboard and screen readers.** Native input; the visible label is its `<label for>`.
