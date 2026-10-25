### Navigation

**Purpose.** Moving between areas and pages: top bar, area header band, sidebar, breadcrumb, footer.

**Anatomy.**
- Top bar: `color.surface.bar` (white in light, a black field in dark), 80px tall (64px below `breakpoint.lg`), 1px ink rule below. Product mark left; pill links; at the right edge full-height blocks separated by 1px ink rules: a secondary block (raised, ink text) and a primary block (`color.action.ink` fill, `color.action.onInk`), each padding 0 `space.6`.
- Area header band: see the bands signature (title, breadcrumb, search, pill tabs).
- Sidebar (apps with many areas): 240px on `color.surface.default`, 1px ink rule on its edge, pill links stacked `space.1` apart, group labels `font.size.meta` `color.text.secondary`.
- Breadcrumb: underlined ink links, " / " separators, current item plain; `font.size.cardTitle` in a header band, `font.size.body` elsewhere.
- Footer: black band (bands signature).

**Sizes.** Pills `size.controlSm`, padding 0 `space.4`; top-bar blocks full height; menu button 40px with two 2px ink lines 24px wide.

**Variants.** Marketing top bar; product top bar inside the area band (band color, search box, ink CTA); sidebar; mobile full-screen panel (`color.surface.raised`, `size.row` rows ruled in ink, current row with a filled pill).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | pill transparent border, `color.text.primary` |
| hover | pill: 1px ink outline appears instantly; edge blocks: lift |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | primary nav: `color.nav.current` fill, `color.nav.onCurrent` text (white pill in dark); sidebar same; `aria-current="page"` |

**Token mapping.** Bar `color.surface.bar`, rules `color.border.default`, current `color.nav.current` / `color.nav.onCurrent`, edge CTA `color.action.ink` / `color.action.onInk`.

**Keyboard and screen readers.** `<nav aria-label>`; skip link first; mobile menu button has `aria-expanded`, traps focus in the open panel, Escape closes.

**Do / Don't.** Do mark exactly one current item per nav. Don't underline nav pills or use a colored current state.
