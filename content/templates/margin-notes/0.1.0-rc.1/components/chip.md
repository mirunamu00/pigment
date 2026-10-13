### Chip

**Use.** Toggleable filters in a row. Static labels use badges.

**Anatomy.** `size.controlMd`, padding 0 `space.14`, `radius.full`, `font.size.small`, `color.surface.raised`, 1px `color.border.control`; optional icon or mono count. Chips `space.6` apart; a 1px x 24px `color.border.default` divider between groups; the row scrolls horizontally under `breakpoint.md`.

**States.** Hover: border `color.border.strong`. Selected: `color.action.primary` fill, `color.text.onAction`, no border. Focus, disabled: shared.

**A11y.** `<button aria-pressed>`; a removable chip has a separate "Remove {name}" button.

**Do / Don't.** Do invert to ink when pressed. Don't tint a selected chip.
