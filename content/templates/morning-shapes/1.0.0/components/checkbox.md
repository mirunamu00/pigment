### Checkbox

**Purpose.** Turn one option on or off inside a form or list; several independent choices. Radios share this spec (circle with an ink inner dot).

**Anatomy.** 24px box (`radius.check`) → label `font.size.body` → optional helper `font.size.label` `color.text.secondary`. Radio: 24px circle with a `size.dot` inner dot.

**Sizes.** Box 24px with a 2px border; gap `space.3`; row min height 44px.

**Variants.** Plain; inside a choice row (the whole row is the hit area); indeterminate (ink bar 12×3px, `radius.full`).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, 2px `color.border.strong` |
| hover | border → `color.text.secondary` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | `color.action.primary` fill and border, solid tick in `color.text.onAction`; radio: ink border, ink inner dot; `motion.duration.snap` |
| disabled | `color.surface.subtle` fill, `color.border.default`, label `color.text.secondary` |
| error | 2px `color.status.danger` border + message below the group |

**Keyboard and screen readers.** Native `<input type="checkbox">` or `radio` with a `<label>`; Space toggles; groups in a `<fieldset>` with a `<legend>`.

**Do / Don't.** Do use ink for checked. Don't use blue or a category hue.
