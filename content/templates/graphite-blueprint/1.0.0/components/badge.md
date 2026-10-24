### Badge

**Anatomy.** Height 20px, `radius.full`, padding 0 `space.8`, 1px `color.border.default`, transparent fill,
`font.size.caption` sans 510 `color.text.body`; a leading 6px dot in the status hue (or a 12px status icon), gap
`space.6`. Count badge: its own class, never combined with `.badge`; the numeral reads at 4.5:1 in both modes; on an
icon button it sits inside the button (`position:absolute`, `pointer-events:none`):

```css
.count{display:inline-grid;place-items:center;min-width:16px;height:16px;padding:0 var(--space-4);border:0;
  border-radius:var(--radius-full);background:var(--color-action-primary);color:var(--color-text-on-action);
  font:var(--font-weight-semibold) var(--font-size-micro)/1 var(--font-family-sans);font-variant-numeric:tabular-nums;}
```

**States.** Static by default. Interactive chips follow Interaction (filter chip). A running item gets the live edge
on its badge only. Current: border `color.border.strong`.

