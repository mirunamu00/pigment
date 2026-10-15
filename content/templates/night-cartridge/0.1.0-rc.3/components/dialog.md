### Dialog

**Anatomy.** Native `<dialog>` or `role="dialog"`. A Window: 4px `color.border.strong` frame, `color.surface.raised`, `shadow.hard`, width min(`size.dialog`, 100% − `space.32`). Title bar `size.titleBar` with the title 16/24 `color.text.strong` and a framed close button (12px pixel ×). Body padding `space.20`, 16/28. Actions right, gap `space.12`: framed Cancel, then the gold confirm (the screen's gold moves into the dialog); destructive confirms use the danger button. Scrim `color.surface.overlay`, no blur.

**States.** Opens and closes in one frame. Focus moves to the first field or the confirm; focus-visible ring. Loading: confirm shows the gerund + `.ellipsis`, `aria-busy`. Error: a danger callout above the actions.

**Keyboard and screen readers.** `aria-labelledby` the title; Escape closes; focus stays inside and returns to the opener.
