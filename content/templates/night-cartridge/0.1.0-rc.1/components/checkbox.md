### Checkbox and radio

**Anatomy.** Checkbox: 16px square, 2px `color.border.control` frame, `color.surface.raised` fill; checked shows a pixel check drawn with `sprite()` (6×5 units at `size.unit`: rows `.....x`, `....xx`, `x..xx.`, `xxxx..`, `.xx...`) in `color.text.accent`. Indeterminate: an 8×4px bar in `color.text.accent`. Radio: the same square; selected shows an 8px square in `color.text.accent`, never a circle. Label 16/24 at `space.8`; rows at least `size.touch` under coarse pointers. A radio group with long labels may render as a marker menu, the chosen option with the marker.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring around the box, offset 3px. Checked: mark appears in one frame. Disabled: `color.border.default`, mark and label `color.text.disabled`. Error: frame `color.status.danger`, message under the group.

**Keyboard and screen readers.** Native inputs, visually replaced but focusable; `<fieldset>` + `<legend>` for groups; Space toggles, arrows move within radios.

**Do / Don't.** Do keep the box square and the mark pixel-drawn. Don't use a font check glyph or a rounded box.
