### Media frame

**Use.** Product photos, screenshots, post images.

**Anatomy.** `radius.media`, `color.surface.tray` ground, `elevation.rest` (featured: `elevation.pinned`, counts toward the 2 lifted objects). Ratios 4:3 products, 16:10 screenshots, 3:2 posts. Optional label bottom-left at `space.10`: mono `font.size.label`, `color.text.onGlass` on `color.surface.glass`, padding `space.4` `space.8`, `radius.inner`. Thumbnails 64px, `radius.controlLg`, `space.8` apart.

**States.** Loading: hatch `repeating-linear-gradient(135deg, var(--color-border-default) 0 1px, transparent 1px 14px)` on the tray; no shimmer. Error: hatch plus a 20px image-off icon in `color.text.tertiary` and a caption. Selected thumbnail: `0 0 0 2px` ring in `color.action.primary`. Focus: shared.

**A11y.** Meaningful `alt`, or empty `alt` when decorative; thumbnails are buttons with `aria-pressed`.

**Do / Don't.** Do show photos untouched. Don't place tape or bloom over an image.
