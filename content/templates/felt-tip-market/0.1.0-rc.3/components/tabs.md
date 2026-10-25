### Tabs

**Purpose.** Switch between views of the same subject or sort/filter modes. Different destinations use Navigation.

**Anatomy.** A row of outline pills, `space.2` apart, left-aligned under a heading (or right-aligned opposite a section title).

**Sizes.** Pill height `size.controlSm`, padding 0 `space.4`, `font.size.body` regular; 2px invisible hit extension to 44px.

**Variants.** Pill tabs (default); pill tabs inside a header band (`color.text.onBand` text, `color.art.ink` outline on hover and selected, in both modes); scrolling row below `breakpoint.md` (horizontal scroll, no wrap, edge fade not allowed — crop at the padding).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | transparent fill, `border.width.hair` transparent, `color.text.primary` |
| hover | border becomes `color.border.default`, `motion.duration.instant` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | border `color.border.default` (outline pill), fill unchanged |

**Token mapping.** Text `color.text.primary`; border `color.border.default`; radius `radius.full`.

**Keyboard and screen readers.** `role="tablist"`, `tab` with `aria-selected`, `tabpanel`; arrows move, Home/End jump; links to separate pages use `aria-current` instead.

**Do / Don't.** Do keep tabs flat (no lift). Don't fill the selected tab or underline it.
