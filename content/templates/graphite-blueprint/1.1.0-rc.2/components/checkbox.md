### Checkbox and radio

**Anatomy.** 14px box, `radius.xs` (radio: circle), 1px `color.border.check`, transparent fill; label
`font.size.small` `color.text.body`, gap `space.8`; row height `size.rowDense`. Group label:
`.mono-label` or a 590 `font.size.body` title.

**States.** Hover: Interaction. Focus-visible: outline on the box. Checked: fill and border
`color.accent.default` over `motion.duration.hover`, 1.5px `color.text.onAccent` check (radio: 6px inner dot).
Indeterminate: a 6px bar. Disabled: `opacity.disabled`. Error: outline `color.status.danger` plus the field message.

**Implementation.** Native input (`appearance:none`); `checked`, `name`, `value` and test ids unchanged. The row is the
hit area by wrapping input and text in the `<label>` or padding the label, never an overlay over the input (no
`label::after{position:absolute;inset:0}`). Controls in a row with a stretched link get `position:relative;z-index:1`.
Segmented radios: see Tabs.
