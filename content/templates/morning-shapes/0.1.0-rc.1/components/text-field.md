### Text field

**Purpose.** Single-line text, email, search, numbers; textarea for multi-line.

**Anatomy.** Label above → box → optional leading `size.iconSm` icon or trailing circle button → helper or error line.

**Sizes.** Box `size.controlLg` tall, padding 0 `space.4`, `font.size.body`, `radius.md`; textarea min 4 lines, padding `space.3` `space.4`. Label `font.size.body` medium, `space.2` above. Helper and error `font.size.label`, `space.2` below. Search variant is a pill: `radius.full`, leading icon, padding-inline `space.5`.

**Variants.** Default; search pill; with inline action (field + ink pill, gap `space.2`, as in a signup row); read-only code (`font.family.mono`, `color.surface.subtle` fill).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised` fill, 2px `color.border.strong`, placeholder `color.text.secondary` |
| hover | border → `color.text.secondary`, `motion.duration.snap` |
| focus-visible | border → 2px `color.focus.ring`; no glow, no outline |
| disabled | `color.surface.subtle` fill, `color.text.secondary` text, border `color.border.default` |
| error | border 2px `color.status.danger`; message `color.status.danger`, `font.size.label` medium, after a 16px solid alert glyph; `aria-invalid="true"` |
| success (after an async check) | a 16px solid `color.status.success` tick and short text after the helper line |

**Token mapping.** As in States; text `color.text.primary`; radius `radius.md` (search `radius.full`).

**Keyboard and screen readers.** Visible `<label for>` always (never placeholder-only); helper and error linked with `aria-describedby`; on submit, focus moves to the first invalid field and a summary lists the errors.

**Do / Don't.** Do validate on blur and on submit and keep the typed value. Don't place inputs on a saturated field (white and cream only) or give them a shadow.
