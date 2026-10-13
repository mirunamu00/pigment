### Checkbox

**Use.** Independent options and row selection. One immediate on/off setting uses a switch.

**Anatomy.** 18px box, `radius.swatch`, 1px `color.border.strong` on `color.surface.raised`; check or dash glyph at 1.5px stroke; label `font.size.ui` at `space.10`; optional description `font.size.small` `color.text.secondary`. Hit area at least `size.controlSm` (`size.touch` on touch). Rows `space.12` apart. Radio: same with `radius.full` and an 8px dot.

**States.** Hover: border `color.text.tertiary`. Selected and indeterminate: `color.action.primary` fill, glyph `color.text.onAction`. Error: border `color.status.danger`, group message below. Focus (ring around the box), disabled: shared.

**A11y.** Native input; Space toggles. Groups use `<fieldset>` and `<legend>`; indeterminate is exposed as mixed.

**Do / Don't.** Do let the whole label row toggle. Don't use a colored check fill.
