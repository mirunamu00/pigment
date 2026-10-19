### Text field

**Purpose.** Single- and multi-line text entry (also search, email, number). Use select for fixed options.

**Anatomy.** Label above (`font.size.md`, `space.8` gap), box, optional hint or error line below (`space.8`, `font.size.sm`).

**Sizes.** Height `size.control` (48px), padding `space.12` `space.16`, `radius.sm`, `font.size.md`; textarea min 96px high. Search adds a 48px square icon button at the end, joined by a shared border.

**Variants.** Default; search (placeholder "Search...", 24px icon button); textarea.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, 1px `color.border.default`, placeholder `color.text.secondary` |
| hover | no change (no lift on inputs) |
| focus-visible | border stays ink, 2px `color.accent.halo` box-shadow ring flush outside the border, plus 2px `color.focus.ring` outline at 2px offset; `motion.duration.fast` |
| disabled | `color.surface.subtle` fill, `color.text.disabled`, border `color.border.hairline` |
| error | border `color.status.danger`; below: 16px alert icon + message in `color.text.primary`, icon `color.status.danger`; `aria-invalid="true"`, `aria-describedby` |

**Token mapping.** As above; helper text `color.text.secondary`; success after validation: 16px ink check on a `color.action.primary` circle beside the field.

**Keyboard and screen readers.** Native `<input>` with a visible `<label for>`; errors announced by `aria-describedby` and `role="alert"` on submit; a submit with errors focuses the first invalid field and shows one summary line at the form top.

**Do / Don't.** Do write errors as what to do ("Enter an email like name@site.com"). Don't signal an error with color alone or lift the field.
