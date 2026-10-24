### Select

**Use.** One of 5 or more options; 2 to 4 use the segmented control or radios.

**Anatomy.** Trigger as Text field with `appearance: none`, `padding-right: space.32` and a 16px chevron `color.text.secondary` at `space.12` from the right. Menu: `color.surface.lifted`, `radius.media`, `elevation.pinned`, padding `space.4`, max height 320px; options `size.controlMd`, padding 0 `space.10`, `radius.inner`.

**States.** Hover: trigger border `color.border.strong`; active option `color.surface.subtle`. Selected option: `font.weight.medium`, trailing check.

**A11y.** Prefer a native `<select>`; custom: `combobox` plus `listbox`.
