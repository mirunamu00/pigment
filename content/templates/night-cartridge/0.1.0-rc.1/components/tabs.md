### Tabs

**Anatomy.** A row of tabs on a 2px `color.border.strong` baseline that joins the panel. Tab: `size.control` high, padding 0 `space.12`, 16/24, marker slot before the label. Selected: 2px `color.border.strong` frame on top and sides, panel-coloured bottom covering the baseline, `color.text.strong`, marker visible. Unselected: `color.text.secondary`. Code file tabs: the same on a code Window, frame 4px.

**States.** Hover: `color.surface.hover`, `color.text.primary`. Focus-visible: ring, offset −4px. Selected: as above; the panel swaps in one frame. Disabled: `color.text.disabled`, no hover.

**Keyboard and screen readers.** `role="tablist"`/`tab`/`tabpanel`, roving tabindex, arrows, Home/End, `aria-selected`.

**Do / Don't.** Do mark the selected tab with frame and marker. Don't use a sliding underline or a pill.
