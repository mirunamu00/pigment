### Card

**Use.** One object or widget.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`), body, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`; sized to content (Layout adaptation).

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `color.surface.lifted`, `elevation.pinned`, may carry tape; spans grid columns, never a fixed width. Stat: one-line eyebrow (ellipsis, full text in `title`), value sans `clamp(28px, 3vw, 40px)` semibold, `font.tracking.h1Article`, delta `font.size.small` `color.text.secondary` with a 12px arrow.

**States.** Hover (linked card): ring `inset 0 0 0 1px` `color.text.tertiary` (pinned: after `elevation.pinned`), title underlined; no lift. Focus: on the card. Error: a danger callout inside.

**A11y.** One link on the title, stretched with a pseudo-element.
