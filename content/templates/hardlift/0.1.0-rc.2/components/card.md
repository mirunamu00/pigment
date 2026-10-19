### Card

**Purpose.** Groups one item or topic (product, project, stat, plan). Not for decoration or to wrap page sections.

**Anatomy.** `color.surface.raised` box, 1px `color.border.default`, `radius.md`; media on top (1:1 or fixed ratio, square corners inside the border), title (`font.size.lg`), meta (`font.size.sm`, `color.text.secondary`), optional price tag (`color.action.primary` pill, ink text) and footer row.

**Sizes.** Padding `space.16` (dense `space.12`, marketing `space.24`); gap inside `space.8`-`space.12`; grid gap `space.24`.

**Variants.** Static (stat, form container); linked (whole card is one anchor and lifts); selectable (outline thickens when selected).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | no shadow |
| hover (linked) | translate -4px -4px + `shadow.md` in `color.shadow.hard`, `motion.duration.base` `motion.easing.standard`; static cards do nothing |
| focus-visible | 2px `color.focus.ring` outline on the card, 2px offset |
| selected | `border.width.thick` ink border |

**Token mapping.** As anatomy; no band color or pink on the card body.

**Keyboard and screen readers.** One stretched link with the title as its accessible name; nested buttons stay separate focus stops.

**Do / Don't.** Do keep all cards of a grid the same height only when they hold the same kind of data. Don't nest cards or fill them with band colors.
