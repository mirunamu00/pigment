### Checkbox and radio

**Anatomy.** 14px box, `radius.xs` (radio: circle), 1px `color.border.check`, transparent fill; label
`font.size.small` `color.text.body`, gap `space.8`; row height `size.rowDense`. Group label:
mono caption tertiary, or a 590 `font.size.body` title.

**States.** Hover: Interaction. Focus-visible: outline on the box. Checked: fill and border
`color.accent.default`, 1.5px `color.text.onAccent` check (radio: 6px inner dot), over `motion.duration.hover`.
Indeterminate: a 6px bar. Disabled: `opacity.disabled`. Error: outline `color.status.danger` plus the field message.

**Implementation.** Keep the native input (`appearance:none` and styled); `checked`, `name`, `value` and test ids unchanged.
Make the row the hit area by wrapping the input and its text in the `<label>`, or by padding the label to the row
height. Never cover a native input with an overlay (no `label::after{position:absolute;inset:0}`, no stretched link or
pseudo-element). If a row also has a stretched overlay, every control
inside it gets `position:relative;z-index:1`.
