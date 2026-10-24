### Badge

**Anatomy.** Status or category chip: `size.bullet` square in the hue or status colour + label 16/24 (12/18 when dense) in `color.text.primary`, padding 0 `space.8`, no fill. Count badge (cart, unread): 20px-high box, `color.surface.hover`, 12px `color.text.strong`, padding 0 `space.4`. Filter chip: the chip as a toggle button, 2px `color.border.default` frame, `size.control` high. Tag: plain `#tag` in `color.text.secondary`.

**States.** Filter chip hover `color.surface.hover`; selected (`aria-pressed="true"`) `color.surface.hover`, `color.text.strong`, marker before the label; focus ring.

**Do / Don't.** Do let the bullet carry the colour. Don't fill badges with a saturated hue or round them.
