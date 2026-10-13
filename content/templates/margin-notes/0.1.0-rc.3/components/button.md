### Button

**Use.** One primary per region; secondary for the rest; inline navigation is a text link.

**Anatomy.** Optional `size.icon` icon, label, gap `space.8`, `radius.control`, no shadow. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`. Default `size.control`, padding 0 `space.16`, `font.size.ui`. Large `size.controlLg`, padding 0 `space.20`, `radius.controlLg`. Icon-only: square, `aria-label`.

**Variants.** Primary: `color.action.primary`, `color.text.onAction`, `font.weight.medium`. Secondary: `color.surface.raised`, 1px `color.border.control`, `color.text.primary`. Ghost: no fill, `color.text.secondary`. Danger: `color.action.danger`, `color.text.onAction`, only to confirm a destructive action.

**States.** Hover: primary `color.action.primaryHover`, secondary border `color.border.strong`, ghost `color.text.primary` on `color.surface.subtle`, danger `color.action.dangerHover`. Active: primary `color.action.primaryActive`, secondary `color.surface.subtle`. Loading (width locked), focus, disabled: shared.

**A11y.** Native `<button>`.
