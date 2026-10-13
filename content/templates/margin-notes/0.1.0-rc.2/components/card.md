### Card

**Use.** One object or widget.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`, `font.weight.semibold`, `font.tracking.title`), body `font.size.body` `color.text.body`, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`.

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `elevation.pinned`, may carry tape (max 2 per screen); spans grid columns, never a fixed width. Gallery item: a media frame, then text rows on the page ground, no container.

**States.** Hover (only if the whole card is a link): edge `inset 0 0 0 1px` in `color.border.strong`, no lift. Error: a danger callout inside. Loading, focus: shared.

**Rows.** Cards of different kinds (chart beside a list) use `align-items: start`; only same-kind cards share a height.

**A11y.** Linked card: one real link on the title heading, stretched with a pseudo-element.
