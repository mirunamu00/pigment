### Select

**Use.** One of 5 or more options; 2 to 4 use the segmented control or radios.

**Anatomy.** Trigger as Text field plus a 16px chevron `color.text.secondary`. Menu: `color.surface.lifted`, `radius.media`, `elevation.pinned`, padding `space.4`, max height 320px; options `size.controlMd`, padding 0 `space.10`, `radius.inner`.

**States.** Hover: trigger border `color.border.strong`; active option `color.surface.subtle`. Selected option: `font.weight.medium`, trailing check. Error, focus, disabled: shared.

**A11y.** Prefer a styled native `<select>`; custom: `combobox` plus `listbox`.
