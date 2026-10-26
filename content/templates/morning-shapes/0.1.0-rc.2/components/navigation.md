### Navigation

**Purpose.** Top bar, sidebar and mobile menu: where the user is and where they can go.

**Anatomy.** Top bar (`size.header`, `color.surface.default`): the product's own name as a wordmark in `font.size.title` bold (never a single-dot mark) → links → actions (one blue or ink pill, avatar). Optional sidebar (`size.sidebar`, `color.surface.subtle`): items each with a `size.dot` dot in its area's hue. Footer: see Applying the concept.

**Sizes.** Top-bar links `font.size.body` medium, gap `space.8`; actions `size.control` pills. Sidebar items `size.control` tall, `radius.full`, padding 0 `space.4`, gap `space.1`; group labels `font.size.label` bold `color.text.secondary`. Phones: top bar 64px; the menu button is a cream `size.control` circle.

**Variants.** Marketing top bar (links + blue pill); app top bar (area links or search pill + avatar); sidebar shell; mobile full-screen menu (`font.size.h4` bold links in `size.listRow` rows, 1px `color.border.rule`, pills at the bottom).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | links `color.text.primary`, medium |
| hover | top bar: bold instantly (reserve the bold width); sidebar: `color.surface.hover` pill |
| focus-visible | 2px `color.focus.ring` outline, 2px offset (inset in the sidebar) |
| selected | top bar: bold + `size.dot` area-hue dot before the label, `aria-current="page"`; sidebar: ink pill (`color.action.primary`), white label and white dot |
| scrolled | top bar gets `shadow.header` after 8px of scroll |

**Token mapping.** As above; area dots `color.category.*`.

**Keyboard and screen readers.** `<nav aria-label>`, `aria-current="page"`, a skip link first; the mobile menu button has `aria-expanded`, the open menu traps focus and closes on Escape.

**Do / Don't.** Do color each area's dot with its hue. Don't fill the top bar with a field color.
