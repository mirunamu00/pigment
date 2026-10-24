### Tabs

**Variants.** Segmented (views of one thing, up to 5): track `color.surface.subtle`, `radius.tile`, padding
`space.4`; segments `size.controlSm`, padding 0 `space.16`, `radius.control`, `color.text.secondary`; selected: a
`color.surface.raised` pill with 1px `color.border.default` ring, `color.text.primary`, 500. Underline (page
sections): tabs `size.control`, gap `space.24`, hairline below; selected `color.text.primary`, 500, 2px
`color.action.primary` rule.

**States.** Hover, focus-visible, selected: Interaction. Disabled: `color.text.disabled`, skipped by arrows.
Mobile: underline tabs scroll in their own strip; segmented go full width.

**A11y.** `tablist`, `tab`, `tabpanel`, `aria-selected`, arrows. Filter chips: `aria-pressed` buttons.
