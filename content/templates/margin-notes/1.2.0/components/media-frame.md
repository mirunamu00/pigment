### Media frame

**Use.** Photos, screenshots and their placeholders.

**Anatomy.** `radius.media`, `color.surface.tray`, `elevation.rest` (featured: `elevation.pinned`). Default ratios by image kind: 4:3 object photos, 16:10 screenshots and interface captures, 3:2 cover and editorial images; 3:2 in any grid of 3 or more asset-less frames. Thumbnails 64px, `radius.controlLg`. Hatch over the tray: `repeating-linear-gradient(135deg, var(--color-decor-hatch) 0 1px, transparent 1px 10px)`, 1.15:1 to 1.35:1, quieter than any text.

**States.** No asset (same in every product): tray, hatch, one centered `size.iconLg` outline image icon `color.text.tertiary`. Loading: tray and hatch only. Error: a 20px image-off icon and a `font.size.small` caption. Selected thumbnail: `0 0 0 2px` `color.action.primary` ring.

**A11y.** Meaningful `alt` (empty when decorative); thumbnails are buttons with `aria-pressed`.
