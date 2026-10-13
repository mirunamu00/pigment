### Checkbox

**Use.** Independent options and row selection; an immediate setting uses a switch.

**Anatomy.** 18px box, `radius.swatch`, 1px `color.text.tertiary` border on `color.surface.raised`; 1.5px check or dash; label `font.size.ui` at `space.10`; hit area at least `size.controlSm` (touch `size.touch`); rows `space.12` apart. Radio: `radius.full`, 8px dot.

**States.** Hover: border `color.text.secondary`. Selected, indeterminate: `color.action.primary` fill, glyph `color.text.onAction`. Error: border `color.status.danger`, group message below. Focus (ring around the box), disabled: shared.

**A11y.** Native input; groups use `<fieldset>` and `<legend>`.
