### Tabs

**Anatomy.** A row of tabs on a 2px `color.border.strong` baseline that joins the panel. Tab: `size.control` high, padding 0 `space.12`, 16/24, marker slot before the label. Selected: 2px `color.border.strong` frame on top and sides, panel-coloured bottom covering the baseline, `color.text.strong`, marker visible. Unselected: `color.text.secondary`.

**States.** Hover: `color.surface.hover`, `color.text.primary`. Focus-visible: ring, offset −4px. Selected: as above; the panel swaps in one frame. Disabled: `color.text.disabled`, no hover.

**Accessibility.** `role="tablist"`/`tab`/`tabpanel`, roving tabindex, arrows, Home/End, `aria-selected`.
