### Select

**Purpose.** Choose one value from 5 or more options; use pills or radios for fewer.

**Anatomy.** Label, box with value and a 24px chevron at the end, option panel.

**Sizes.** Same as text field: `size.control`, `radius.sm`, padding `space.12` `space.16`.

**Variants.** Native select styled as the field (`appearance: none` plus chevron); custom listbox only when options need rich content.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised`, 1px `color.border.default`, chevron `color.text.primary` |
| focus-visible | same ring recipe as text field |
| open | panel `color.surface.raised`, 1px border, `radius.md`, `shadow.md` in `color.shadow.hard`, `space.4` below the box; highlighted option `color.surface.subtle`, selected option `color.action.primary` fill |
| disabled | as text field |
| error | border `color.status.danger` + message line as text field |

**Token mapping.** Panel `shadow.md`, options padding `space.8` `space.12`, `font.size.md`.

**Keyboard and screen readers.** Native `<select>` preferred; custom: `role="listbox"`, Arrow keys move, Enter selects, Escape closes and returns focus, type-ahead.

**Do / Don't.** Do use the native element on touch. Don't lift the box or add a blur to the panel.
