### Navigation

**Purpose.** Moves between pages and sections: top header, section pill row, sub-nav, breadcrumb.

**Anatomy.** Header 80px high on `color.surface.raised` with a 1px bottom border: wordmark slot, pill links, a 1px vertical rule, secondary link, optional full-height `color.action.inverse` block. Section pages add the color band with the pill row. Breadcrumb: text links separated by 16px chevrons, current item `color.text.primary`.

**Sizes.** Links are pills (`space.8` `space.12`, `font.size.md`); header padding `space.16` `space.64` (mobile `space.16`).

**Variants.** Top header; band nav (pills on a `color.band.*`); settings sub-nav (vertical list of pills); mobile: header shows the wordmark and a menu button that opens a dialog list.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | transparent pill border |
| hover | ink border, `motion.duration.fast` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | current page: `color.action.inverse` fill, `color.text.onInverse`, `aria-current="page"` |

**Token mapping.** Pills as Tabs; the full-height header block has no shadow and no lift.

**Keyboard and screen readers.** `<nav aria-label>`; links are anchors; mobile menu is a dialog with focus trap and Escape; breadcrumb `<nav aria-label="Breadcrumb">` with `<ol>`.

**Do / Don't.** Do mark the current page with `aria-current`. Don't use a sliding underline or a sticky header taller than 80px.
