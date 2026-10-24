### Media frame

**Use.** Photos, screenshots and their placeholders.

**Anatomy.** `radius.media`, `color.surface.tray` ground, `elevation.rest` (featured: `elevation.pinned`, counts toward the 2 lifted objects). Ratios 4:3 products, 16:10 screenshots, 3:2 posts. Optional label bottom-left at `space.10`: mono `font.size.label`, `color.text.onGlass` on `color.surface.glass`, padding `space.4` `space.8`, `radius.inner`. Thumbnails 64px, `radius.controlLg`. Hatch: `repeating-linear-gradient(135deg, var(--color-border-default) 0 1px, transparent 1px 14px)` on the tray.

**States.** No asset (identical in every app): tray, hatch, one centered `size.iconLg` outline image icon in `color.text.tertiary`; nothing else. Loading: tray and hatch, no icon, no shimmer. Error: hatch plus a 20px image-off icon and a `font.size.small` caption. Selected thumbnail: `0 0 0 2px` ring in `color.action.primary`. Focus: shared.

**A11y.** Meaningful `alt`, or empty `alt` when decorative; the no-asset icon is `aria-hidden`; thumbnails are buttons with `aria-pressed`. No tape or bloom over an image.
