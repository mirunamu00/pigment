### Card

**Use.** One object or widget; many similar objects go in a table or gallery.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`, `font.weight.semibold`, `font.tracking.title`), body `font.size.body` `color.text.body`, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`.

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `elevation.pinned`, may carry tape (max 2 per screen). Gallery item: a media frame, then text rows on the page ground, no container. Well: `color.surface.subtle`, no edge, for grouping inside a card.

**States.** Hover (only if the whole card is a link): edge `inset 0 0 0 1px` in `color.border.strong`, no lift. Loading: skeleton lines. Error: a danger callout inside; frame unchanged. Focus (follows `radius.panel`): shared.

**A11y.** Linked card: one real link on the title heading, stretched with a pseudo-element.

**Do / Don't.** Do let most cards rest on a hairline. Don't give every card a drop shadow.
