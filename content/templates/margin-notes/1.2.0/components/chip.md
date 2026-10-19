### Chip

**Use.** Toggleable filters in a row.

**Anatomy.** `size.controlMd`, padding 0 `space.14`, `radius.full`, `font.size.small`, `color.surface.raised`, 1px `color.border.control`; optional icon or mono count; `space.6` apart. A scrolling strip scrolls the selected chip into view on load (`scrollIntoView({ inline: "nearest" })`) and fades its edge over 24px while chips are off-screen.

**States.** Hover: border `color.border.strong`. Selected: `color.action.primary` fill, `color.text.onAction`, no border.

**A11y.** `<button aria-pressed>`.
