### Button

**Purpose.** Starts an action. Use a link for navigation to another page; use a pill for filters and tabs, never a button.

**Anatomy.** Optional 24px icon (`size.icon`) + label, in a 1px `color.border.default` box. Gap `space.8`.

**Sizes.** Default height `size.control` (48px): padding `space.12` `space.16`, `font.size.md` on `font.lineHeight.ui`. Small `size.controlSm` (36px): padding `space.8` `space.12`, `font.size.sm`, hit area extended to `size.hit`. Icon-only: square at the same height.

**Variants.** Pink (`color.action.primary`, label `color.text.onAction`): the one main action per viewport. Ink (`color.action.inverse`, label `color.text.onInverse`): second action. Ghost (transparent, label `color.text.primary`): cancel, tertiary; hover fills pink, except on a menu, popover, select or disclosure trigger (`aria-haspopup` / `aria-expanded`), whose hover shows the ink border and lift only and whose open state is `color.surface.raised` with the ink border. Hero: pink in a `lift-hero` plate wrapper, landing only. All `radius.sm`.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | fill by variant, 1px `color.border.default`, no shadow |
| hover | translate -4px -4px (hero -8px, icon -2px), `shadow.md` (icon `shadow.sm`) in `color.shadow.hard`, `motion.duration.base` `motion.easing.standard`; ghost also fills `color.action.primary` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| active | translate 0, shadow none |
| disabled | fill `color.surface.subtle`, label `color.text.disabled`, border `color.border.hairline`, no lift, `cursor: not-allowed` |
| loading | same size, label replaced by the 16px turning coin (`motion.duration.coin`), `aria-busy="true"`, no lift |

**Token mapping.** Fill/label/border per variant above; radius `radius.sm`; shadow `shadow.md`/`shadow.sm` + `color.shadow.hard`; motion `motion.duration.base`, `motion.easing.standard`. Reduced motion: color flip to `color.action.primaryHover` only.

**Keyboard and screen readers.** Native `<button>`; Enter/Space activate; icon-only needs `aria-label`; loading sets `aria-busy` and keeps the label text in the accessible name.

**Do / Don't.** Do make persistent header, band and toolbar actions (refresh, export, share, settings) `lift--ink` or `lift--ghost` in every state; pink is for the one action the current state is about. Do keep 8px clearance so the lift shadow is not clipped. Don't put two pink buttons in one viewport: a component that ships its own pink button (empty state, form, dialog, newsletter) gives it `lift--ink` or `lift--ghost` when a screen-level pink action is already visible, and the trigger of an open menu, popover or disclosure stays raised or ink, never pink; also don't put two pink buttons in one viewport or lift a button inside a sticky bar.
