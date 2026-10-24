### Text field

**Anatomy.** Label above (16/24, `color.text.strong`), `space.8`; control `size.control` high, `color.surface.raised` fill, 2px `color.border.control` frame, padding 0 `space.12`, 16px pixel text, placeholder `color.text.secondary`; helper 12/18 `color.text.secondary`, `space.4` below. Textarea: min 4 rows, padding `space.12`, counter 12px right-aligned under it. Search: 24px pixel magnifier inside at `space.8`, text from `space.40`, kbd hint at the right (hidden under `breakpoint.sm`). Placeholders fit; shorten, never clip.

**States.** Hover: frame `color.border.strong`. Focus-visible and focus: the 4px ring, offset 3px, frame unchanged. Disabled: `color.surface.subtle` fill, `color.border.default` frame, `color.text.disabled`. Read-only: `color.surface.subtle`. Error: frame `color.status.danger`, `.nudge` once on submit, the message replaces the helper: 12px pixel warning icon + text in `color.status.danger`, `aria-invalid="true"`, `aria-describedby`. A failed submit focuses the first invalid field. Loading (async check): `.ellipsis` at the right.

**Keyboard and screen readers.** Visible `<label for>`; "required" in words, not only a symbol.

**Do / Don't.** Do keep the 2px frame. Don't fill the field red.
