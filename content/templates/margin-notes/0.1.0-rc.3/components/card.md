### Card

**Use.** One object or widget.

**Anatomy.** Optional mono eyebrow, title (`font.size.cardTitle` or `panelTitle`), body `color.text.body`, meta `font.size.small` `color.text.tertiary`, actions. Padding `space.24` (`space.20` under `breakpoint.md`), gap `space.12`, `radius.panel`.

**Variants.** Rest: `color.surface.raised`, `elevation.rest`. Pinned: `color.surface.lifted`, `elevation.pinned`, may carry tape; spans grid columns, never a fixed width. Stat: eyebrow on one line (ellipsis, full text in `title`), value sans `clamp(28px, 3vw, 40px)` semibold, `font.tracking.h1Article`, delta `font.size.small` `color.text.secondary` with a 12px arrow; a row of stats shares one height.

**States.** Hover (whole card is a link): ring `inset 0 0 0 1px` `color.border.strong`, no lift. Focus: shared (outline on the card). Error: a danger callout inside. Loading: shared.

**A11y.** Linked card: one link on the title, stretched with a pseudo-element.
