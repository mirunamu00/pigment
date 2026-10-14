### Select

**Anatomy.** Text field's box, label, hint and error, `appearance: none`, a 16px chevron in
`color.text.secondary` at `space.12` from the right, text stopping at `space.40`. Prefer native `<select>`. Custom
menu: `color.surface.raised`, `radius.tile`, `shadow.overlay`, padding `space.6`, max height 320px; options
`size.control`, `radius.control`, padding 0 `space.12`; selected option 500 with a 16px check.

**States.** Hover, focus-visible, disabled, error: as Text field. Open: chevron rotates 180°, menu per Motion.
Option hover and keyboard-active: `color.surface.hover`.

**A11y.** Custom menus: `role="listbox"`, `aria-expanded`, arrows, Home/End, typeahead, Escape returns focus.
