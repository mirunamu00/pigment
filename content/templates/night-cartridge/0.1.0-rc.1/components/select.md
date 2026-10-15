### Select

**Anatomy.** The text field's box, label, helper and error; `appearance:none`; a down marker (`.cur--d`, `color.text.secondary`) at `space.12` from the right. Prefer native `<select>`. A custom list opens as a Window directly below (2px `color.border.strong` frame, `color.surface.raised`, no shadow), options as marker items (`size.row`), 8 visible, then scroll.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring. Open: down marker swaps to up; the list appears in one frame. Highlighted option: `color.surface.hover` + marker. Selected option: `color.text.strong`, `aria-selected`. Disabled and error: as text field.

**Keyboard and screen readers.** Custom: `role="combobox"` with `listbox`/`option`, `aria-activedescendant`; arrows move the marker, Enter selects, Escape closes, type-ahead.

**Do / Don't.** Do show the marker on the highlighted option. Don't use a rotating chevron or a rounded menu.
