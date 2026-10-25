### Card

**Purpose.** A white ink-framed box for one item, one stat, one link or one choice. Lists of similar rows use a ruled group, not stacked cards.

**Anatomy.** Frame (`color.surface.raised`, `border.width.hair` `color.border.default`, `radius.sm`) → optional media separated by a 1px ink rule (full bleed inside the frame) → body: title, description, meta → footer row.

**Sizes.** Padding `space.6` (`space.4` below 640px); title `font.size.cardTitle`; description `font.size.body` `color.text.secondary`, clamp 3 lines; grid gap `space.6`.

**Variants.**
- Item card: media on top (or left half on wide cards; an item without an image gets a drawn vignette or a dashed glyph box, never a picture glyph or grey fill, see Imagery), title, description, underlined author or source link, footer with the price flag left and a rating or count right.
- Stat tile: label `font.size.meta` with an 8px dot legend, number `font.size.section` medium, optional flag on the money figure, optional trend in `font.size.meta`.
- Link tile: min height `size.tile`, centered `font.size.cardTitle` text, the whole tile is the link.
- Option card: icon + bold-free title + one-line description; selection state below.
- Panel: a titled section of a form or settings page (title `font.size.lead`, ruled sub-rows).
- Showcase card (marketing only): `radius.lg`, `color.border.soft`, padding `space.8`, title `font.size.section`, a drawn mockup on an ink slab.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | no shadow |
| hover | linked or selectable cards lift (`offset.lift` + `color.shadow.hard`, `motion.duration.lift`); static panels don't |
| focus-visible | 2px `color.focus.ring` outline, 2px offset, on the card |
| active | slam flat |
| selected | `border.width.thick` `color.selected.border` + 20px pink check disc with ink outline top-right; `aria-checked` or `aria-pressed` |
| disabled | content `color.text.secondary`, no lift |

**Token mapping.** Media without an image: vignette ground `color.band.*`, objects `color.art.ink` outline; or glyph box `color.surface.raised` with a dashed `color.border.default` border. Frame `color.surface.raised`, `color.border.default`, `radius.sm`; shadow `color.shadow.hard`; selected `color.selected.border`.

**Keyboard and screen readers.** A linked card has one real link (the title) stretched over the card; option cards are radios or checkboxes styled as cards.

**Do / Don't.** Do keep every card the same white with an ink frame. Don't color a card with a band color or add a shadow at rest.
