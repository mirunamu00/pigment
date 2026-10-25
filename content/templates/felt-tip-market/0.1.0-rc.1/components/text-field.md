### Text field

**Purpose.** Single-line text, search, email, numbers; textarea for multi-line.

**Anatomy.** Label (above) → box → optional leading 20px icon or trailing icon button → helper or error line.

**Sizes.** Box height `size.control`, padding 0 `space.4`, `font.size.body`; textarea min 4 lines, padding `space.3` `space.4`. Label `font.size.body` regular, `space.2` above the box. Helper and error `font.size.meta`, `space.2` below. Search in a header band: same box, leading magnifier icon.

**Variants.** Default; search (leading icon, optional trailing square icon button inside the box at `space.2` inset); with inline action (input + pink square arrow button joined, as in the footer); code (`font.family.mono`, `color.surface.subtle` fill, read-only).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, `border.width.hair` `color.border.strong`, `radius.sm`, placeholder `color.text.secondary` |
| hover | none (inputs never lift) |
| focus-visible | border unchanged; `box-shadow: 0 0 0 2px color.focus.halo`; outline 2px `color.focus.ring` at 2px offset |
| disabled | `color.surface.subtle` fill, `color.text.secondary` text, border kept |
| error | `border.width.thick` `color.status.danger` (inset 1px so height holds); message in `color.text.primary` with a 16px danger-filled, ink-outlined "!" disc; `aria-invalid` |
| success (after async check) | a lemon chip (`color.band.lemon`, 1px ink, `radius.full`, `font.size.meta`) after the helper line |

**Token mapping.** Fill `color.surface.raised`; text `color.text.primary`; border `color.border.strong`; focus `color.focus.halo` + `color.focus.ring`; error `color.status.danger`; radius `radius.sm`.

**Keyboard and screen readers.** `<label for>` always visible (no placeholder-only labels); helper and error tied with `aria-describedby`; errors announced on submit via a summary with links to fields.

**Do / Don't.** Do validate on blur and on submit, keeping the typed value. Don't put a band color or a shadow on an input.
