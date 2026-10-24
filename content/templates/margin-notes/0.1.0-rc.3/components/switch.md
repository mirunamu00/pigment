### Switch

**Use.** A setting that applies immediately. Settings that wait for Save use a checkbox.

**Anatomy.** Track 36 x 20px, `radius.full`; 16px thumb, 2px inset. Rows: label left, switch right, min height `size.touch`.

**States.** Off: track `color.surface.subtle` with 1px `color.text.tertiary` border; thumb `color.text.tertiary`, no shadow (4.6:1 on the track in both themes). Hover: border and thumb `color.text.secondary`. On: track `color.action.primary`, no border, never green; thumb `color.text.onAction` with `elevation.segment`; it slides 16px over `motion.duration.fast`. Loading: 10px spinner in the thumb until saved; on failure revert and show a danger toast. Focus (ring around the track), disabled: shared.

**A11y.** `role="switch"` with `aria-checked`; Space toggles; the visible label is the name.
