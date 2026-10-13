### Navigation

**Use.** Header for sections; sidebar from 6 sections; footer (hairline top, `font.size.small`) for the rest.

**Anatomy.** Header `size.header` (`size.headerMobile` under `breakpoint.md`), `color.surface.default`, 1px `color.border.default` bottom: product name as text only, no icon (`font.size.lead`, `font.weight.semibold`, `font.tracking.title`), links `font.size.ui` `color.text.secondary` `space.28` apart, one action at the right. Sidebar 220px: mono uppercase eyebrows (`font.size.caption`, `font.tracking.eyebrow`, `color.text.tertiary`), items `size.controlSm`, padding 0 `space.10`, `radius.inner`.

**Mobile (under `breakpoint.md`).** More than 3 links (header or sidebar): product name, at most 1 action, and a `size.touch` two-line menu button at the right opening a sheet below the header (`color.surface.raised`, `radius.media`, `elevation.pinned`, padding `space.8`, rows `size.touch`). Header search moves into the page. Links never overflow.

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary` plus `font.weight.medium`, no pill or underline; sidebar item `color.surface.subtle`. Focus: shared.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded` and `aria-controls`; Escape closes the sheet.
