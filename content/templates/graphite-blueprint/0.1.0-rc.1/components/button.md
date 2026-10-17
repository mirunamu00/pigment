### Button

**Use.** One inverse pill per region (form, dialog, header); secondary for the rest; ghost in toolbars and nav.

**Anatomy.** Pill (`radius.full`), label `font.size.small` 510, sentence case, verb first, 1 to 3 words; optional
trailing arrow or 16px icon, gap `space.6`. Sizes: `size.control` (padding 0 `space.12`), `size.controlLg` (0
`space.16`; forms and content actions), `size.touch` (0 `space.20`, `font.size.body`; landing hero only). Icon
button: square `size.controlSm`, `radius.full`, `aria-label`. Full width: `display:flex;width:100%`, label centered.

**Variants.** Inverse: `color.action.primary`, `color.text.onAction`. Secondary: `color.action.secondary`,
`color.text.body`. Bordered: transparent, `color.text.secondary`, 1px `color.border.default`. Ghost: transparent,
`color.text.secondary`. Danger: `color.action.danger`, `color.text.onDanger`. Send (message composers only): a
`color.accent.default` circle with a `color.text.onAccent` icon.

**States.** Hover, press, focus-visible: Interaction. Disabled: `opacity.disabled`, no hover or press. Loading, only
while a real request runs: a 12px scan glyph replaces the trailing icon, the label becomes a gerund ("Saving"), width
held, `aria-busy="true"`. Done: the label returns; the result is announced in the status region.

