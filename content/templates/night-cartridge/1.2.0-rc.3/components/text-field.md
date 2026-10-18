### Text field

**Anatomy.** Label above (16/24 `color.text.strong`), `space.8` gap; control `size.control` high, `color.surface.raised` fill, 2px `color.border.control` frame, padding 0 `space.12`, 16px pixel text, placeholder `color.text.secondary`; helper 12/18 `color.text.secondary`, `space.4` below. Textarea: min 4 rows, padding `space.12`. Search: 24px pixel magnifier at `space.8`, text from `space.40`, kbd hint right (hidden under `breakpoint.sm`).

**States.** Hover and focus per Interaction (frame unchanged). Disabled: `color.surface.subtle` fill, `color.border.default` frame, `color.text.disabled`. Read-only: `color.surface.subtle`. Error: frame `color.status.danger`, `.nudge` once on submit; the message (12px "!" icon of 6×6 units, rows `..xx..` ×4, `......`, `..xx..`, never a triangle or padlock, + text in `color.status.danger`) replaces the helper, `aria-invalid`, `aria-describedby`; a failed submit focuses the first invalid field. Loading (async check): `.ellipsis` at the right.

**Accessibility.** Visible `<label for>`; "required" in words, not only a symbol.
