### Switch

**Purpose.** An immediate on/off setting that takes effect without saving. In forms that are submitted, use a checkbox.

**Anatomy.** Pill track 48×28px (`radius.full`) on `shadow.ledge` → 22px knob (`radius.full`) → label to the left, optional helper below.

**Sizes.** Track 48×28, knob 22px inset 3px, travel 20px; row min height `size.control`; label `font.size.body` medium.

**Variants.** Default (on = ink); area (on = the area's `color.category.*` when the setting belongs to one area; the knob stays white).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (off) | track `color.surface.hover`, knob `color.art.white`, `shadow.ledge` |
| hover | off track → `color.surface.pressed`; on track → `color.action.primaryHover` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset around the track |
| selected (on) | track `color.action.primary` (in dark: white track, knob `color.text.onAction`), knob slides 20px over `motion.duration.snap`, `motion.easing.snap` |
| active | track sinks 2px, `shadow.ledgeGone` |
| disabled | track `color.surface.subtle`, knob `color.border.default`, label `color.text.secondary`, no ledge |

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or `<input type="checkbox" role="switch">`; Space toggles; the label names the setting, not the state.

**Do / Don't.** Do put the switch at the trailing edge of a settings row. Don't write on/off inside the track.
