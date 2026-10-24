### Text field

**Anatomy.** Label above (`font.size.ui`, 500), `space.8`; control `size.control` high (never shrinks in a flex
row), `radius.control`, `color.surface.raised`, inset 1px `color.border.strong` ring, padding 0 `space.12`,
placeholder `color.text.tertiary`; hint `space.6` below, `font.size.small`, `color.text.secondary`. Search: 16px
icon at `space.12`, text from `space.40`, browser clear button hidden (`appearance: none` on
`::-webkit-search-cancel-button`), own 16px clear button. Textarea: min 3 rows, padding `space.12`. Prompt field:
`radius.tile`, send square at the right.

**States.** Hover: ring `color.border.check`. Focus-visible: outline, ring unchanged. Disabled:
`color.surface.subtle`, `color.text.disabled`. Error: ring `color.status.danger`; the message replaces the hint in
`color.status.danger`, `aria-invalid`, `aria-describedby`; no red fill. A failed submit adds one line above the
actions ("2 fields need attention", `role="alert"`) and focuses the first invalid field. Loading: glyph inside, right.
