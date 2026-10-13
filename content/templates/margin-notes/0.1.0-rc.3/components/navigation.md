### Navigation

**Use.** Header for sections; sidebar from 6 sections.

**Anatomy.** Header `size.header` (`size.headerMobile` under `breakpoint.md`), `color.surface.default`, 1px `color.border.default` bottom, inner width `size.container`, never `overflow: hidden`: product name as text only (`font.size.lead`, `font.weight.semibold`, `font.tracking.title`), links `font.size.ui` `color.text.secondary` `space.24` apart, search (`size.controlSm`) and one action at the right. Sidebar 220px: mono eyebrows, items `size.controlSm`, padding 0 `space.10`, `radius.inner`.

**Mobile (under `breakpoint.md`).** More than 3 links: product name, at most 1 action, and a `size.touch` two-line menu button at the right opening a sheet below the header (`color.surface.lifted`, `radius.media`, `elevation.pinned`, padding `space.8`, rows `size.touch`; global search first, `size.control`, full width). Links never overflow.

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary` plus `font.weight.medium`, no pill or underline; sidebar item `color.surface.subtle`. Focus: shared.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded` and `aria-controls`; Escape closes the sheet.
