### Card

**Purpose.** Groups one item or topic (product, project, stat, plan). Not for decoration or to wrap page sections.

**Anatomy.** `color.surface.raised` box, 1px `color.border.default`, `radius.md`; media on top (a band-color square holding a sticker object when no photo is supplied; see Imagery and icons; 1:1 or fixed ratio, square corners inside the border), title (`font.size.lg`), meta (`font.size.sm`, `color.text.secondary`), optional price tag (`color.action.primary` pill, ink text) and footer row.

**Sizes.** Padding `space.16` (dense `space.12`, marketing `space.24`); gap inside `space.8`-`space.12`; grid gap `space.24`.

**Variants.** Static (stat, form container); linked (whole card is one anchor and lifts); selectable (outline thickens when selected).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | no shadow |
| hover (linked) | the card's outer bordered box (the anchor itself, or the element that wraps it and receives the pointer) translates -4px -4px and gets `shadow.md` in `color.shadow.hard`, `motion.duration.base` `motion.easing.standard`; never an inner element; static cards do nothing |
| focus-visible | 2px `color.focus.ring` outline on the card, 2px offset |
| selected | `border.width.thick` ink border |

Use the `.lift-card` class from Hard-lift buttons; a fill change never replaces the lift. Put the lift on the same element that carries the border and radius, with `transition: translate, box-shadow` and `@media (hover: hover)`, and keep 8px of clearance so no ancestor's `overflow` clips the shadow (grid gap `space.24` and no `overflow: hidden` on the grid or its wrappers). Verify: hover one card in each theme and confirm its position and shadow changed; a color change alone fails.

**Token mapping.** As anatomy; no band color or pink on the card body.

**Keyboard and screen readers.** One stretched link with the title as its accessible name; nested buttons stay separate focus stops.

**Do / Don't.** Do keep all cards of a grid the same height only when they hold the same kind of data. Don't nest cards or fill them with band colors.
