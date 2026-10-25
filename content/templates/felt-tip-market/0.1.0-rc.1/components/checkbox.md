### Checkbox and radio

**Purpose.** Checkbox for independent on/off choices and multi-select; radio for one of 2–5. For rich choices use option cards (Card → option).

**Anatomy.** 20px box (checkbox `radius.sm`, radio `radius.full`) → label `font.size.body` at `space.3` gap → optional helper `font.size.meta`.

**Sizes.** Control 20px; whole row is the hit target, min 44px tall. Group gap `space.3`.

**Variants.** Checkbox, radio, indeterminate (2px ink bar).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, `border.width.hair` `color.border.strong` |
| hover | none |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | fill `color.action.primary`, ink border, 2px ink check (radio: 8px ink dot); no motion beyond `motion.duration.instant` |
| disabled | `color.surface.subtle` fill, label `color.text.secondary` |
| error | `border.width.thick` `color.status.danger` on the control, message as Text field |

**Token mapping.** Fill `color.surface.raised` → `color.action.primary`; mark `color.art.ink`; border `color.border.strong`.

**Keyboard and screen readers.** Native inputs with `<label>`; Space toggles; radios in a `fieldset` with `legend`, arrows move.

**Do / Don't.** Do keep the ink check on pink so state doesn't rely on color. Don't use a colored check or rounded-square 8px corners.
