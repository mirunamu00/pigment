### Toast

**Anatomy.** Bottom-right at `space.24` (mobile: bottom, full width minus `space.16`). `color.surface.raised`,
`radius.tile`, inset 1px `color.border.default` ring, `shadow.overlay`, padding `space.12` `space.16`, max width
`size.dialog`, `font.size.ui`. Leading: the glyph while running, a 16px check-circle on success. Optional action, close button. Error: 2px inset `color.status.danger` left rule.

**States.** Enter and leave per Motion; at most 3, gap `space.8`. Success dismisses after 5s, paused on hover or focus;
errors stay. `role="status"` (errors `alert`); if the screen already has a status region, "Saved" goes there instead.
