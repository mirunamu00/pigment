### Dialog

**Anatomy.** Native `<dialog>` or `role="dialog"`. A `.window` with `shadow.hard`, width min(`size.dialog`, 100% − `space.32`). Title bar `size.titleBar`: title 16/24 `color.text.strong`, framed close button (12px pixel ×). Body padding `space.20`, 16/28. Actions right in a `.controls` row (all `size.control`), gap `space.12`: framed Cancel, then the gold confirm (the screen's gold moves here) or, if destructive, the danger button. Scrim `color.surface.overlay`, no blur.

**States.** Focus moves to the first field or the confirm. Loading: confirm shows the gerund + `.ellipsis`, `aria-busy`. Error: a danger callout above the actions.

**Accessibility.** `aria-labelledby` the title; Escape closes; focus stays inside and returns to the opener.
