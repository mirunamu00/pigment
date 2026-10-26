### Select

**Purpose.** Choose one option from a list of more than five. Five or fewer: choice tiles or a segmented pill row.

**Anatomy.** Label → box with value and a 16px solid chevron at the trailing edge → listbox menu.

**Sizes and tokens.** Box like Text field: `size.controlLg`, `radius.md`, padding 0 `space.12` 0 `space.4`. Menu: `color.surface.raised`, `radius.md`, `shadow.float`, padding `space.2`; options `size.control` tall, `radius.sm`, padding 0 `space.3`.

**Variants.** Native select styled as the box (preferred on phones); custom listbox; compact pill select in toolbars and filters (`size.controlSm`, `radius.full`, cream fill, ledge).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.surface.raised`, 2px `color.border.strong`, chevron `color.text.icon` |
| hover | border → `color.text.secondary` |
| focus-visible | border → 2px `color.focus.ring` |
| open | chevron rotates 180°; menu enters as Motion → menu enter |
| option hover / active | `color.surface.subtle` fill |
| selected (option) | bold label + 16px solid ink tick at the trailing edge |
| disabled | `color.surface.subtle` fill, `color.text.secondary` |
| error | 2px `color.status.danger` border + message as Text field |

**Keyboard and screen readers.** Native `<select>` or the ARIA listbox pattern (`aria-expanded`, `aria-activedescendant`); Escape closes and returns focus.

**Do / Don't.** Do keep the label above. Don't hide the label in the box.
