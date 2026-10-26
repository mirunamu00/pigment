### Card

**Purpose.** Group one item's content: an item in a grid, a feature, a quote, a stat, a plan, a group of settings.

**Anatomy.** Optional media (photo framed `radius.lg`, or a cover in the item's category hue with one shape composition) → optional category tag → title → body → meta or actions.

**Sizes.** Padding `space.8` (`space.12` for quote cards, `space.6` on phones); gap `space.4`; title `font.size.h4` or `font.size.title`; grid gap `space.6`; media 4:3 or 16:9.

**Variants and tokens.**
- Cream card (default): `color.surface.subtle`, `radius.lg`, no border, no shadow, on a white page.
- White card: `color.surface.raised` on cream or on a field.
- Stat tile: a small field in a category hue (`radius.sm`, padding `space.6`): label `font.size.label` bold, number `font.size.h3` bold, caption `font.size.body`, all in that hue's `color.onField.*`; optional `size.plateSm` plate beside the number; no min-height. Below `breakpoint.md` the tiles stay one group — 2×2 (plate dropped) or a sideways-scrolling row — in half the first screen.
- Option card (plans, tiers, packages, any pick-one set): the cream card — `color.surface.subtle` (indigo at night), `radius.lg`, no border, no shadow. Name as an eyebrow; the price or key figure is the card's largest type, `font.size.h2` bold tight; features with green ticks. Selected: the set's one saturated field with its `color.onField.*` text and the check disc, in a hue clearly apart from the ground (Color use). Depth from tone alone.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as variant |
| hover (linked cards) | fill one step darker (`color.surface.subtle` → `color.surface.hover`; white → `color.surface.subtle`), title underlined, `motion.duration.snap` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset, around the whole card |
| active | fill `color.surface.pressed` |
| selected | 2px `color.action.primary` inset border + ink check disc (option cards: the saturated field) |
| disabled | content `color.text.secondary`, no hover |
| loading | cream skeleton blocks (`radius.md`) for media, title and two lines, with the opacity pulse |

**Keyboard and screen readers.** A linked card is one link (stretched from the title over the card); other buttons inside sit above it. Covers and shapes are `aria-hidden`.

**Do / Don't.** Do separate cards from the page by tone. Don't add borders or shadows, or lift cards on hover.
