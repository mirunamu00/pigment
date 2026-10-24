### Button

**Use.** One ink primary per region, paper secondary for the rest, stone tertiary for small utilities; danger
only confirms a destructive action.

**Anatomy.** The ring-controls recipe. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`; default
`size.control`, 0 `space.16`; large `size.controlLg`, 0 `space.24`, `font.size.body`. Optional `size.icon` icon,
gap `space.8`; icon-only is square with `aria-label`. Full width
(`.btn--block`): `display: flex; width: 100%`, keeping `align-items: center; justify-content: center`, never
`display: block`. Labels 500, verb first, 1 to 3 words. On
`color.surface.inverse`: primary fill `color.text.inverse`, label `color.surface.inverse`; ghost transparent,
`color.text.inverse`, 1px `color.border.inverse` ring.

**States.** Hover, focus-visible, active: Interaction. Disabled: `color.surface.subtle`, `color.text.disabled`.
Loading, only while a real request is pending: glyph and gerund replace the label inside the button, width held,
`aria-busy="true"`. Danger: `color.action.danger`,
`color.text.onAction`, hover ring in the same color.
