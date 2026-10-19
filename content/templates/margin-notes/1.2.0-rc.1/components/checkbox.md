### Checkbox

**Use.** Independent options and row selection; an immediate setting uses a switch.

**Anatomy.** The native input, with class `check`, is the visible 18px box, so it takes every click; nothing sits above it. Label `font.size.ui` at `space.10`; hit area at least `size.controlSm`; rows `space.12` apart. Existing markup with a drawn box: the input covers it (`position: absolute; inset: 0; opacity: 0; z-index: 1`), the box gets `pointer-events: none`.

```css
.check { appearance: none; box-sizing: border-box; margin: 0; flex: none; width: 18px; height: 18px;
  display: inline-grid; place-content: center; border: 1px solid var(--color-text-tertiary); border-radius: var(--radius-swatch);
  background: var(--color-surface-raised); cursor: pointer; }
.check[type="radio"] { border-radius: var(--radius-full); }
.check:is(:checked, :indeterminate) { background: var(--color-action-primary); border-color: var(--color-action-primary); }
.check[type="checkbox"]:checked::before { content: ""; width: 9px; height: 5px; border: solid var(--color-text-on-action);
  border-width: 0 0 1.5px 1.5px; transform: translateY(-1px) rotate(-45deg); }
.check:indeterminate::before { content: ""; width: 8px; height: 1.5px; background: var(--color-text-on-action); }
.check[type="radio"]:checked::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--color-text-on-action); }
```

**States.** Hover: border `color.text.secondary`. Error: border `color.status.danger`, group message below.

**A11y.** Groups use `<fieldset>` and `<legend>`.
