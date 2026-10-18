### Table

**Anatomy.** Head row `color.surface.subtle`, 16/24 `color.text.strong`, 2px `color.border.strong` rule under it; body rows `size.row`, 2px `color.border.default` rules, no zebra or vertical rules; cell padding 0 `space.12`; a 16px leading gutter for the marker. Numbers right-aligned in pixel numerals. Status cells: `size.bullet` in the status colour + word. Row actions: `size.controlSm` framed buttons, right.

**Small screens.** Under `breakpoint.sm` only `data-pin` columns show: the first (`data-pin="first"`, marker gutter inside) and one or two short ones (status, key value); hidden ones stay in the DOM. The first shows 16+ characters at 390px before its ellipsis (else pin one fewer); no sideways scroll.

```css
@media (max-width:599px){.table{width:100%}
.table :is(th,td):not([data-pin]){display:none}
.table :is(th,td){height:var(--size-row);white-space:nowrap}.table .sub{display:none}
.table [data-pin="first"]{width:100%;max-width:0;overflow:hidden;text-overflow:ellipsis}
.table [data-pin]:not([data-pin="first"]){width:1%}}
```

**States.** Hover and focus (interactive rows, −4px) per Interaction. Selected: marker in the gutter, `color.text.strong`, `aria-selected`. Sorted header: up/down marker after the label, `aria-sort`. Loading: 5 rows of flat static `color.surface.hover` blocks. Error: a danger callout above with Retry. Empty: the empty state replaces the body.

**Accessibility.** Real `<table>`, `<th scope>`, sort buttons inside headers.
