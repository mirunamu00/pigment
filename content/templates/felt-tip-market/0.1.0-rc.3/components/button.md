### Button

**Purpose.** Triggers an action or navigation that looks like an action. Use a text link for navigation inside prose.

**Anatomy.** Box (fill, 1px border, `radius.sm`) → optional 20px leading icon → label → optional trailing text arrow.

**Sizes.** Default height `size.control`, padding 0 `space.6`, gap `space.2`, `font.size.body` regular. Compact `size.controlSm`, padding 0 `space.4` (toolbars, table rows, headers). Icon-only: square `size.control` or `size.controlSm`, 20px glyph. Full width below `breakpoint.sm` in forms and dialogs.

**Variants.**
- Primary: `color.action.primary` fill, `color.text.onAction`, ink border (`color.art.ink`). One or two per screen.
- Ink: `color.action.ink` fill, `color.action.onInk` label, ink border. The strong secondary action; becomes pink in dark mode.
- Outline: transparent (on paper) or `color.surface.raised` fill, `color.border.strong` border, `color.text.primary`. Everything else, including "Cancel".
- On a band or the footer: outline with `color.surface.onBand` fill, `color.art.ink` border, `color.text.onBand` label, unchanged in dark (the closing band's button).
- Danger (confirm a destructive action only): outline with a `border.width.thick` `color.status.danger` border and ink label.
- Plate stack: the screen's one main CTA, wrapped as in the signature recipe.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | no shadow, translate 0 |
| hover | translate −`offset.lift` both axes, shadow `offset.lift offset.lift 0 0 color.shadow.hard`, `motion.duration.lift` `motion.easing.lift`; fill unchanged |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| active | slam: translate 0, shadow none |
| disabled | `color.surface.subtle` fill, `color.text.secondary` label, border kept, no lift, `cursor: not-allowed` |
| loading | label kept, leading icon replaced by a 16px rocking ink glyph (`ft-rock`), width locked, no lift, `aria-busy="true"` |

**Token mapping.** Fill `color.action.primary` / `color.action.ink` / `color.surface.raised` (on a band `color.surface.onBand`); label `color.text.onAction` / `color.action.onInk` / `color.text.primary`; border `border.width.hair` `color.art.ink` (outline: `color.border.strong`); radius `radius.sm`; shadow color `color.shadow.hard`; motion `motion.duration.lift`, `motion.easing.lift`.

**Keyboard and screen readers.** Native `<button>` (or `<a>` for navigation); Enter and Space activate. Icon-only buttons need `aria-label`. Loading sets `aria-busy` and keeps the accessible name.

**Do / Don't.** Do pair one pink button with an outline "Cancel". Don't give buttons `radius.full`, a hover color change or a soft shadow.
