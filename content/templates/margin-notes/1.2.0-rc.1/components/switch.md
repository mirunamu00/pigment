### Switch

**Use.** A setting that applies immediately; settings that wait for Save use a checkbox.

**Anatomy.** The control itself is the track and takes every click: `<input type="checkbox" role="switch">` (or an existing `<button role="switch">`) with `appearance: none; box-sizing: border-box; margin: 0; padding: 0; position: relative`, 36 x 20px, `radius.full`, 1px `color.text.tertiary` border, `color.surface.subtle`. Thumb: its `::before`, 16px circle at `top: 1px; left: 1px`, `color.text.tertiary` (4.6:1 on the track); a thumb span gets `pointer-events: none`. Rows: label left, switch right, min height `size.touch`.

**States.** Hover: border and off thumb `color.text.secondary`. On (`:checked`, `[aria-checked="true"]`): track and border `color.action.primary`; thumb `translate: 16px 0` over `motion.duration.fast`, `color.text.onAction`, `elevation.segment`; never green. Loading: 10px spinner in the thumb; on failure revert and show a danger toast.

**A11y.** `aria-checked`; Space toggles; the visible label is the name.
