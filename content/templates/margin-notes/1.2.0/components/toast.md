### Toast

**Use.** Confirms every save or submit, or a non-blocking failure.

**Anatomy.** Ground `color.action.primary`, text and 16px icon `color.text.onAction`, `elevation.segment`, `radius.callout`, min height `size.controlLg`, padding `space.12` `space.16`, gap `space.10`, max width 420px, `font.size.ui`. Optional action: underlined medium text button. Fixed `space.24` from the bottom right; under `breakpoint.md` `space.16` from the sides, above the action bar. Max 3, `space.8` apart, newest at the bottom. Tones differ only by icon and wording.

**States.** Hover pauses dismissal. Focus: 2px `color.text.onAction` outline, 2px offset.

**A11y.** `role="status"` (`alert` for danger). Auto-dismiss after 5s unless it has an action; Escape dismisses.
