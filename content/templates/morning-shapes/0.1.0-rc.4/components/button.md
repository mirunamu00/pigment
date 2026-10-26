### Button

**Purpose.** Triggers an action, or navigation that reads as an action. Inside running text use a link.

**Anatomy.** Pill → optional `size.iconSm` solid leading icon → label → optional trailing chevron. Circles hold one icon.

**Sizes.** As in the pill recipe (small, default, large, mega). Circles: `size.control` (pagination, carousel, media), `size.circleSm` (table row actions, 44px hit area). Mega: one per page, closing band only. Full width below `breakpoint.sm` in forms and dialogs.

**Variants.**
- Ink (default): `color.action.primary`, `color.text.onAction`. Every main action.
- Blue: `color.action.accent`, `color.text.onAccent`. The one conversion action of a region.
- Cream: `color.action.secondary`, `color.text.onSecondary`. Secondary actions, cancel, circle buttons.
- On-field: `color.action.onField`, `color.text.onFieldAction`, `shadow.ledgeOnField`. Any secondary pill on a field; a blue pill may sit on any field except blue.
- Outline: transparent, 2px `currentColor` border, no ledge. Tertiary actions on fields.
- Danger: cream pill, `color.status.danger` label. Destructive confirm (dialogs): ink pill, leading danger alert glyph, a label naming the action.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | fill per variant, `shadow.ledge` |
| hover | fill one step darker (`*Hover` token of the variant), `motion.duration.snap` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset (`ringOnField` on blue, green, violet, night) |
| active | translateY 2px, `shadow.ledgeGone`; cream → `color.action.secondaryPressed` |
| disabled | `color.surface.hover` fill, `color.text.secondary` label, no ledge, no press, `cursor: not-allowed` |
| loading | label hidden visually (kept for screen readers), the pop-dots glyph in the label color centered, width locked, `aria-busy="true"` |

**Keyboard and screen readers.** Native `<button>` (`<a>` for navigation); Enter and Space activate. Icon-only and circle buttons need `aria-label`. Loading keeps the accessible name and sets `aria-busy`.

**Do / Don't.** Do pair one ink or blue pill with a cream one. Don't square the corners, blur the ledge, scale on hover or put two blue pills in one region.
