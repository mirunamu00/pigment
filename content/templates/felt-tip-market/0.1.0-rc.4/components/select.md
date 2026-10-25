### Select

**Purpose.** Pick one option from 5 or more; for 2–4 visible choices use option cards or outline pills.

**Anatomy.** Label → box with value and a 20px chevron at the right → popover menu.

**Sizes.** Same box as Text field (`size.control`, padding 0 `space.4`). Menu: `color.surface.raised`, `border.width.hair` `color.border.default`, `radius.sm`, static hard shadow (`offset.lift`, `color.shadow.hard`), rows `size.controlSm`, padding 0 `space.4`, max height 320px, scroll inside; rows divided by nothing, the menu by its frame.

**Variants.** Native `<select>` styled box (default, mobile); custom listbox when options need icons or descriptions; filter row (a `size.row` ruled row in a group with label left and chevron right, opening a disclosure panel).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | as Text field |
| hover | none on the box; menu row hover `color.surface.default`, `motion.duration.instant` |
| focus-visible | halo + ring as Text field; active menu row also gets the paper fill |
| open | chevron rotates 180° over `motion.duration.open` `motion.easing.open`; menu drops 8px → 0 over `motion.duration.lift` |
| disabled | `color.surface.subtle`, `color.text.secondary` |
| error | as Text field |

**Token mapping.** Box like Text field; menu `color.surface.raised`, `color.border.default`, `color.shadow.hard`; selected row 16px ink check at the right.

**Keyboard and screen readers.** Native select when possible. Custom: `role="combobox"` + `listbox`, arrows move, Enter selects, Escape closes and returns focus, type-ahead.

**Do / Don't.** Do keep the menu the trigger's width or wider. Don't use a soft-shadow floating menu.
