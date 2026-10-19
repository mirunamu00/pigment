### Select

**Anatomy.** Text field's box, label, hint and error, `appearance:none`, a 16px chevron in
`color.text.secondary` at `space.12` from the right. Prefer native `<select>`. Custom menu: the Navigation menu's
surface and items, max height 320px; selected option 500 with a 16px check.

**States.** Hover, focus-visible, disabled, error: as Text field. Open: chevron rotates 180°, menu per Motion.
Option hover and keyboard-active: `color.surface.hover`.

**A11y.** Custom menus: `listbox`, `aria-expanded`, arrows, typeahead, Escape returns focus.
