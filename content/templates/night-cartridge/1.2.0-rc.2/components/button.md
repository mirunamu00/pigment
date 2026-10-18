### Button

**Anatomy.** Label 16/24 pixel; optional 24px pixel icon before it (gap `space.8`); forward actions end with a trailing ▶ (`.cur`, no bevel, `currentColor`). Heights: `size.controlLg` (hero, gold), `size.control` (default), `size.controlSm` (copy, row actions, padding `space.8`). Padding `space.20` (gold), `space.12` (others). Icon-only: square.

**Variants.**
- Gold, the page content's one main commit (rule 4): `.btn-gold` (RPG marker recipe).
- Framed, every other action: transparent, 2px `color.border.control`, `color.text.primary`; optional kbd chip (2px `color.border.default`, 12px).
- Tool, header switches and icon actions: `.tool` in Navigation; label + state word ("Animation on").
- Danger, destructive actions confirmed in a dialog: transparent, 2px `color.status.danger` border and text.

**States.** Hover, press, focus-visible: per Interaction. Disabled: `color.surface.hover`, `color.text.disabled`, `color.border.default`, no shadow or press. Loading (real request only): gerund + `.ellipsis`, width held, `aria-busy`.

**Accessibility.** Native `<button>`; icons and markers `aria-hidden`; icon-only buttons `aria-label`; toggles `aria-pressed`.
