### Switch

**Use.** A setting that applies immediately. Settings that wait for Save use a checkbox.

**Anatomy.** Track 36 x 20px, `radius.full`, `color.surface.subtle` with 1px `color.border.strong`; thumb 16px, 2px inset, `color.surface.raised`, `elevation.segment`. Settings rows: label left, switch right, min height `size.touch`, hairline dividers.

**States.** Hover: track border `color.text.tertiary`. On: track `color.action.primary`, no border; thumb slides 16px over `motion.duration.fast`. Loading: 10px spinner in the thumb until saved. Focus (ring around the track), disabled: shared.

**A11y.** `role="switch"` with `aria-checked`; Space toggles; the visible label is the name.

**Do / Don't.** Do revert and show an error toast if saving fails. Don't use a green track for on.
