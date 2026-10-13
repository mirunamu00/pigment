### Tabs

**Use.** Sibling views of one object. Filtering the same data in 2 to 4 ways uses the segmented control.

**Anatomy.** Tab list over a full-width 1px `color.border.default` line; tabs `size.touch` tall, `space.24` apart, `font.size.ui`; panel `space.24` below. Overflow scrolls inside the list.

**States.** Default `color.text.secondary`. Hover `color.text.primary`. Selected: `color.text.primary`, `font.weight.semibold`, 2px underline as `inset 0 -2px 0` in `color.action.primary`. Focus (`radius.inner`), disabled: shared.

**A11y.** `tablist`, `tab` (`aria-selected`, `aria-controls`), `tabpanel`; Left and Right move.
