### Checkbox and radio

**Anatomy.** 14px box, `radius.xs` (radio: circle), 1px `color.border.check`, transparent fill; label
`font.size.small` `color.text.body`, gap `space.8`; row height `size.rowDense`. Group label:
`.mono-label` or a 590 `font.size.body` title.

**States.** Hover: Interaction. Focus-visible: outline on the box. Checked: fill and border
`color.accent.default` over `motion.duration.hover`, 1.5px `color.text.onAccent` check (radio: 6px inner dot).
Indeterminate: a 6px bar. Disabled: `opacity.disabled`. Error: outline `color.status.danger` plus the field message.

**Implementation.** Native input (`appearance:none`). The `<label>` wraps input and text (or is padded) as the hit area.
