### Button

**Use.** One primary per region; secondary for the rest; inline navigation is a text link.

**Anatomy.** Optional `size.icon` icon, label; gap `space.8`; `radius.control`, no shadow. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`. Default `size.control`, padding 0 `space.16`, `font.size.ui`. Large `size.controlLg`, padding 0 `space.20`, `font.size.body`, `radius.controlLg`. Icon-only: square, `aria-label`.

**Variants.** Primary: `color.action.primary` fill, `color.text.onAction`, `font.weight.medium`. Secondary: `color.action.secondary` fill, 1px `color.border.control`, `color.text.primary`. Ghost: no fill, `color.text.secondary`. Danger: `color.action.danger` fill, `color.text.onAction`, only to confirm a destructive action.

**States.** Hover: primary `color.action.primaryHover`, secondary border `color.border.strong`, ghost `color.text.primary` on `color.surface.subtle`, danger `color.action.dangerHover`. Active: primary `color.action.primaryActive`, secondary `color.surface.subtle`; never scale. Loading, focus, disabled: shared; width locked.

**A11y.** Native `<button>`; Enter and Space.
