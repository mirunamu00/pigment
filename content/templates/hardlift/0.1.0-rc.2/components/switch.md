### Switch

**Purpose.** An on/off setting that applies immediately; use a checkbox when a save step follows.

**Anatomy.** Track 48x28px with a 20px knob, label at `space.12`.

**Sizes.** Track `radius.full`, 1px `color.border.default`; knob a circle with 1px ink border, inset `space.4`.

**Variants.** Single only.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (off) | track `color.surface.raised`, knob `color.surface.subtle` at the start |
| hover | track border `border.width.thick` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected (on) | track `color.action.primary`, knob `color.surface.raised` slid to the end, `motion.duration.base` `motion.easing.standard` |
| disabled | `color.surface.subtle`, `color.border.hairline`, label `color.text.disabled` |

**Token mapping.** As states; reduced motion: knob jumps.

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; Space toggles; label names the setting, not the state.

**Do / Don't.** Do show the state in text nearby ("On"). Don't use the switch for destructive actions.
