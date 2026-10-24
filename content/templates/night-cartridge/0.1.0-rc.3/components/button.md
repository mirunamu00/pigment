### Button

**Use.** Gold: the screen's one main commit. Framed: every other action. Tool: header switches and icon actions. Danger: destructive actions, confirmed in a dialog.

**Anatomy.** Label 16/24 pixel; optional 24px pixel icon before it (gap `space.8`); forward actions end with a trailing ▶ (`.cur`, no bevel, `currentColor`). Heights: `size.controlLg` (hero, gold), `size.control` (default), `size.controlSm` (copy, row actions, padding `space.8`). Padding `space.20` (gold), `space.12` (others). Icon-only: square, `aria-label`.

**Variants.**
- Gold: `color.action.primary` fill, `color.text.onAction`, 2px `color.action.primaryEdge` border, `shadow.hard`.
- Framed: transparent, 2px `color.border.control`, `color.text.primary`; optional kbd chip (2px `color.border.default`, 12px).
- Tool: transparent, no frame, `color.text.secondary`, label + state word ("Animation on"); the header switches always use it (`.tool` in Navigation).
- Danger: transparent, 2px `color.status.danger` border and text.

**States.** Hover: gold unchanged; others `color.surface.hover` and `color.text.strong`. Active: gold moves 4px and loses `shadow.hard`; others move 2px. Focus-visible: 4px `color.focus.ring`, offset 3px. Disabled: `color.surface.hover`, `color.text.disabled`, `color.border.default`, no shadow or press. Loading (real request only): gerund + `.ellipsis`, width held, `aria-busy`.

**Keyboard and screen readers.** Native `<button>`; Enter and Space; icons and markers `aria-hidden`; toggles use `aria-pressed`.
