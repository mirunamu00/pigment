### Toast

**Anatomy.** Bottom right, `space.24` from the edges (full width minus `space.16` under `breakpoint.sm`), width
`size.toast`, `color.surface.raised`, `radius.md`, `elevation.popover`, padding `space.12` `space.16`: a 16px leading
status icon (the core glyph while running), text `font.size.small` `color.text.primary`, optional ghost
action and close icon button. Up to 3 stacked, `space.8` apart.

**States.** Enter and leave: opacity (Motion; leave `motion.duration.ui`). Running: live edge, title shimmer, core
glyph; done: the done frame.
Error: error icon, message, Retry. Auto-dismiss after 5s unless it has an action or focus.

**Accessibility.** Announced through the status region; never steals focus.
