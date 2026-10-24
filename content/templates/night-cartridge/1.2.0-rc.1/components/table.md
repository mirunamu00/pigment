### Table

**Anatomy.** Head row on `color.surface.subtle`, 16/24 `color.text.strong`, 2px `color.border.strong` rule under it; body rows `size.row`, 2px `color.border.default` rules, no zebra, no vertical rules; cell padding 0 `space.12`; a 16px leading gutter for the marker. Numbers right-aligned in pixel numerals. Status cells: `size.bullet` in the status colour + word. Row actions: `size.controlSm` framed buttons, right. A meter goes inside its `td`.

**Small screens.** Under `breakpoint.sm` only `data-pin` columns show: the first (with the marker gutter) and one or two more (status, key value); the rest are `display:none` but stay in the DOM. One-line cells with an ellipsis, `.sub` lines hidden, every row `size.row` (`size.touch` under coarse pointers), no sideways scroll.

```css
@media (max-width:599px){.table{table-layout:fixed;width:100%}
.table :is(th,td):not([data-pin]){display:none}
.table :is(th,td){height:var(--size-row);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.table .sub{display:none}}
```

**States.** Hover: row `color.surface.hover`. Focus-visible (interactive rows): ring, offset −4px. Selected: marker in the gutter, `color.text.strong`, `aria-selected`. Sorted header: up/down marker after the label, `aria-sort`. Loading: 5 rows of flat static `color.surface.hover` blocks. Error: a danger callout above with Retry. Empty: the empty state replaces the body.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside headers.
