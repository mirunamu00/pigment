### Checkbox

**Use.** Independent options and row selection. One immediate on/off setting uses a switch.

**Anatomy.** 18px box, `radius.swatch`, 1px `color.text.tertiary` border (3:1) on `color.surface.raised`; check or dash glyph at 1.5px stroke; label `font.size.ui` at `space.10`. Hit area at least `size.controlSm` (`size.touch` on touch). Rows `space.12` apart. Radio: same with `radius.full` and an 8px dot.

**States.** Hover: border `color.text.secondary`. Selected and indeterminate: `color.action.primary` fill, glyph `color.text.onAction`. Error: border `color.status.danger`, group message below. Focus (ring around the box), disabled: shared.

**A11y.** Native input; Space toggles. Groups use `<fieldset>` and `<legend>`.
