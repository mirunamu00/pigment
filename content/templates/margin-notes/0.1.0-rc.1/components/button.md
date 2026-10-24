### Button

**Use.** One primary per view region (page header, card, dialog); secondary for the rest; inline navigation is a text link.

**Anatomy.** Optional `size.icon` leading icon, label, optional trailing arrow glyph; icon gap `space.8`; `radius.control`, no shadow. Small `size.controlSm`, padding 0 `space.12`, `font.size.small`. Default `size.control`, padding 0 `space.16`, `font.size.ui`. Large `size.controlLg`, padding 0 `space.20`, `font.size.body`, `radius.controlLg`. Icon-only: square, `aria-label`.

**Variants.** Primary: `color.action.primary` fill, `color.text.onAction`, `font.weight.medium`. Secondary: `color.action.secondary` fill, 1px `color.border.control`, `color.text.primary`. Ghost: no fill, `color.text.secondary`. Danger: `color.action.danger` fill, `color.text.onAction`, only to confirm a destructive action. Command: mono `font.size.small`, 44px, a `color.code.muted` "$" prefix.

**States.** Hover: primary `color.action.primaryHover`, secondary border `color.border.strong`, ghost `color.text.primary` on `color.surface.subtle`, danger `color.action.dangerHover`. Active: primary `color.action.primaryActive`, secondary `color.surface.subtle`; never scale. Loading: label kept, 14px spinner replaces the leading icon, width locked. Focus, disabled: shared.

**A11y.** Native `<button>`; Enter and Space.

**Do / Don't.** Do pair one ink primary with secondaries. Don't add a colored, gradient or shadowed button.
