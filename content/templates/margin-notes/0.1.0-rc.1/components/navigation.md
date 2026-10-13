### Navigation

**Use.** Header for sections; sidebar from 6 sections; footer (hairline top, `font.size.small` links) for the rest.

**Anatomy.** Header `size.header` (`size.headerMobile` under `breakpoint.md`), `color.surface.default`, 1px `color.border.default` bottom: product name as text (`font.size.lead`, `font.weight.semibold`, `font.tracking.title`; no logo is provided), links `font.size.ui` `color.text.secondary` `space.28` apart, one action at the right. Sidebar 220px: mono uppercase eyebrows (`font.size.caption`, `font.tracking.eyebrow`, `color.text.tertiary`), items `size.controlSm`, padding 0 `space.10`, `radius.inner`. Mobile: a two-line menu icon opens a sheet (`color.surface.raised`, `radius.media`, `elevation.pinned`, rows `size.touch`).

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary` plus `font.weight.medium`, no pill or underline; sidebar item `color.surface.subtle`. Focus: shared.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded`; Escape closes the sheet.

**Do / Don't.** Do keep a single header action. Don't put a detail inside the header bar.
