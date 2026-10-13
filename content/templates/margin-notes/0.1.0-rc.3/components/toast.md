### Toast

**Use.** Confirms a finished action or a non-blocking failure.

**Anatomy.** Ground `color.action.primary`, text and 16px icon `color.text.onAction`, `elevation.segment`, `radius.callout`, min height `size.controlLg`, padding `space.12` `space.16`, gap `space.10`, max width 420px, `font.size.ui`. Optional action: underlined text button, `color.text.onAction`, `font.weight.medium`. Fixed `space.24` from the bottom right; under `breakpoint.md` `space.16` from the sides, above the action bar. Stack `space.8` apart, max 3, newest at the bottom.

**Variants.** Tones differ only by icon and wording; the ground never changes.

**States.** Enter per Motion. Hover pauses dismissal. Focus: 2px outline in `color.text.onAction`, 2px offset.

**A11y.** `role="status"` (`alert` for danger). Auto-dismiss after 5s unless it has an action; Escape dismisses.
