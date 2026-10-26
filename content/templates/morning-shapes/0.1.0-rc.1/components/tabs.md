### Tabs

**Purpose.** Switch between views of the same content, or filter a list. Also covers segmented controls and filter chips.

**Anatomy.** Row of pills with `space.2` gap → optional `size.iconSm` icon or category dot → label. The selected pill gets a white `size.dot` dot before its label.

**Sizes.** `size.control` tall (`size.controlSm` in toolbars and above tables), padding 0 `space.5`, `font.size.body` bold, `font.tracking.tight`. A row that overflows scrolls horizontally.

**Variants.** Pill tabs (default); filter chips (multi-select, `aria-pressed`); segmented control (pills inside a cream track, `radius.full`, padding `space.1`, inner pills without a ledge).

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | `color.action.secondary` fill, `color.text.onSecondary`, `shadow.ledge` |
| hover | `color.action.secondaryHover`, `motion.duration.snap` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| active | sink 2px, `shadow.ledgeGone` |
| selected | `color.action.primary` fill, `color.text.onAction`, white `size.dot` dot before the label |
| disabled | `color.text.secondary`, no ledge |

**Token mapping.** As in States; radius `radius.full`.

**Keyboard and screen readers.** `role="tablist"`, `tab`, `tabpanel`, `aria-selected`; arrow keys move between tabs, Home and End jump. Filter chips are toggle buttons with `aria-pressed`.

**Do / Don't.** Do show the selected dot. Don't underline tabs or make the selected tab blue.
