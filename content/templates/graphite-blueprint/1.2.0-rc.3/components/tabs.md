### Tabs

**Anatomy.** Text tabs: `font.size.small` 510 `color.text.secondary`, height `size.control`, gap `space.24`, a
`color.border.subtle` hairline under the row; the selected tab `color.text.primary` with a 2px `color.text.primary`
indicator on the hairline that slides (Motion). Segmented pills (inside panels,
option pickers): track `color.surface.card`, `radius.full`, padding `space.2`; items `size.controlSm`; the selected
item `color.surface.press` with `elevation.ring`, text primary. Option pickers: native radios in labels, the input
visually hidden (`position:absolute;opacity:0;width:1px;height:1px`); `:has(:checked)`
selects the segment, `:has(:focus-visible)` outlines it.

**States.** Hover: `color.text.body`. Focus-visible: outline. Selected: as above, `aria-selected="true"`. Disabled:
`opacity.disabled`. No panel animation. Keyboard: arrows, Home, End.
