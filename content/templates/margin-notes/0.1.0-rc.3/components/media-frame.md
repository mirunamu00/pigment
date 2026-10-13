### Media frame

**Use.** Photos, screenshots and their placeholders.

**Anatomy.** `radius.media`, `color.surface.tray` ground, `elevation.rest` (featured: `elevation.pinned`). Ratios 4:3 products, 16:10 screenshots, 3:2 posts. Thumbnails 64px, `radius.controlLg`. Hatch: `repeating-linear-gradient(135deg, var(--color-decor-hatch) 0 1px, transparent 1px 12px)` over the tray (at least 1.5:1 in both themes).

**States.** No asset (identical in every app): tray, hatch, one centered `size.iconLg` outline image icon in `color.text.tertiary`; nothing else. Loading: tray and hatch, no icon, no shimmer. Error: hatch plus a 20px image-off icon and a `font.size.small` caption. Selected thumbnail: `0 0 0 2px` ring in `color.action.primary`. Focus: shared.

**A11y.** Meaningful `alt`, or empty `alt` when decorative; the icon is `aria-hidden`; thumbnails are buttons with `aria-pressed`.
