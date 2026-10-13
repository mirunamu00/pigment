### Select

**Use.** One of 5 or more options. For 2 to 4 options, use the segmented control or radios.

**Anatomy.** Trigger identical to the text field, plus a 16px chevron in `color.text.secondary`. Menu: `color.surface.raised`, `radius.media`, `elevation.pinned`, padding `space.4`, max height 320px; options `size.controlMd`, padding 0 `space.10`, `radius.inner`.

**States.** Hover: trigger border `color.border.strong`; option `color.surface.subtle`. Keyboard-active option: `color.surface.subtle`. Selected option: `font.weight.medium` plus a trailing 16px check. Menu enters like an overlay. Error, focus, disabled: shared.

**A11y.** Prefer a styled native `<select>`. Custom: `combobox` plus `listbox` roles; Arrows move, Enter selects, Escape closes and returns focus, typing jumps.

**Do / Don't.** Do keep the native element in forms. Don't tint the selected option with a hue.
