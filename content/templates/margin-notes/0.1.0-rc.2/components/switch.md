### Switch

**Use.** A setting that applies immediately. Settings that wait for Save use a checkbox.

**Anatomy.** Track 36 x 20px, `radius.full`; thumb 16px, 2px inset, `color.surface.raised`, `elevation.segment`. Settings rows: label left, switch right, min height `size.touch`, hairline dividers.

**States.** Off: track `color.surface.subtle` with 1px `color.text.tertiary` border (3:1 in both themes); hover: border `color.text.secondary`. On: track `color.action.primary`, no border, never green; thumb slides 16px over `motion.duration.fast`. Loading: 10px spinner in the thumb until saved; on failure revert and show an error toast. Focus (ring around the track), disabled: shared.

**A11y.** `role="switch"` with `aria-checked`; Space toggles; the visible label is the name.
