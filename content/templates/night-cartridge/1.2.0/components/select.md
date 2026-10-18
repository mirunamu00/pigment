### Select

**Anatomy.** The text field's box, label, helper and error; `appearance:none`; a down marker (`.cur--d`, `color.text.secondary`) at `space.12` from the right. Prefer native `<select>`. A custom list opens as a Window directly below (2px `color.border.strong` frame, `color.surface.raised`, no shadow), options as marker items (`size.row`), 8 visible, then scroll.

**States.** Hover and focus per Interaction. Open: the down marker turns up; the list opens with the selected (or first) option highlighted. Highlighted option: `color.surface.hover` + marker. Selected option: `color.text.strong`, `aria-selected`. Disabled and error: as text field.

**Accessibility.** Custom: `role="combobox"` + `listbox`/`option`, `aria-activedescendant`; arrows move the marker, Enter selects, Escape closes.
