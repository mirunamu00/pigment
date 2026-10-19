### Navigation

**Use.** Header for sections; sidebar from 6 sections.

**Anatomy.** Header `size.header` (mobile `size.headerMobile`), `color.surface.default`, 1px `color.border.default` bottom, the page container, never `overflow: hidden`. Product name as text (`font.size.lead`, semibold, `font.tracking.title`). Links `font.size.ui` `color.text.secondary`, each a `size.controlSm` box, padding 0 `space.8`, `radius.inner`, `space.8` apart; the focus outline follows the box. Search (`size.controlSm`) and one action at the right. Sidebar 220px: mono eyebrows, items `size.controlSm`, padding 0 `space.10`, `radius.inner`.

**Mobile.** More than 3 links: product name, at most 1 action, a `size.touch` menu button opening a sheet below the header (styled as the Select menu, rows `size.touch`, global search first at full width).

**States.** Hover `color.text.primary` (sidebar item also `color.surface.subtle`). Current: header link `color.text.primary`, medium, no pill or underline; sidebar item `color.surface.subtle`.

**A11y.** `<nav aria-label>`, `aria-current="page"`; menu button `aria-expanded`; Escape closes the sheet.
