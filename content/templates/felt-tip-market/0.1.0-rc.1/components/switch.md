### Switch

**Purpose.** An instant on/off setting that takes effect without a save button. Inside a form that is submitted, use a checkbox.

**Anatomy.** Track (36 × 20px, `radius.full`, 1px border) → knob (14px circle) → label at `space.3` gap.

**Sizes.** Track 36 × 20px; knob 14px with 2px inset; row min 44px.

**Variants.** Default only. Label to the right; in a settings row, label left and switch right.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default (off) | track `color.surface.raised`, border `color.border.strong`, knob `color.text.primary` at the left |
| hover | none |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected (on) | track `color.action.primary`, ink border, knob `color.art.ink` slides right, `motion.duration.lift` `motion.easing.lift` (instant under reduced motion) |
| disabled | track `color.surface.subtle`, knob `color.text.secondary` |

**Token mapping.** Track `color.surface.raised` / `color.action.primary`; border `color.border.strong`; knob `color.text.primary` / `color.art.ink`.

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; Space toggles; label names the setting, not the state.

**Do / Don't.** Do show the saved result right away (a toast on failure). Don't color the off track grey-filled.
