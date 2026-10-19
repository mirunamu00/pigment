### Checkbox

**Purpose.** Independent yes/no choices and multi-select; use a switch for instant settings.

**Anatomy.** 24px box (`size.icon`), label `font.size.md` at `space.12` gap; the whole row is the hit area (`size.hit` high).

**Sizes.** Box 24px, `radius.sm`, 1px `color.border.default`, `color.surface.raised` fill.

**Variants.** Single, group (fieldset with legend), indeterminate (ink dash).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | empty box |
| hover | border becomes `border.width.thick` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | fill `color.action.inverse`, 2px check in `color.text.onInverse` (never pink: selection is not an action) |
| disabled | `color.surface.subtle` fill, `color.border.hairline`, label `color.text.disabled` |

**Token mapping.** `radius.sm`, `border.width.thin`/`thick`, `motion.duration.fast` (instant fill).

**Keyboard and screen readers.** Native `<input type="checkbox">`; Space toggles; groups use `<fieldset><legend>`; indeterminate set by property.

**Do / Don't.** Do make the label clickable. Don't animate the check or use a round box.
