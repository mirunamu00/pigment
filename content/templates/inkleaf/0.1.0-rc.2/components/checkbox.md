### Checkbox and radio

**Anatomy.** The native `<input>` with `appearance: none` is the visible control and takes every click:
`size.iconLg` square, `radius.badge` (radio `radius.full`), `color.surface.raised`, inset 1px `color.border.check`
ring. The tick is a sibling 12px SVG (1.75px stroke, `color.text.onAction`) over the box with
`pointer-events: none`; the radio dot is an inset 5px `color.action.primary` ring on a `color.text.onAction` fill.
Label `font.size.ui` at `space.8`; rows at least `size.touch`; groups in a `<fieldset>`.

**States.** Hover: ring `color.text.primary`. Focus-visible: outline. Selected: `color.action.primary` fill,
`motion.duration.press`. Disabled: `color.surface.subtle`, ring `color.border.default`, label
`color.text.disabled`. Error: ring `color.status.danger`, message under the group.
