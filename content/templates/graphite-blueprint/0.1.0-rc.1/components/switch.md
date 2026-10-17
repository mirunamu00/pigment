### Switch

**Anatomy.** Track 28x16 `radius.full`; off: `color.surface.press` with 1px `color.border.check`, 12px thumb
`color.text.secondary` inset 2px. On: track `color.accent.default`, thumb `color.text.onAccent` at the right. Label
left in `font.size.small` `color.text.primary`, description below in `color.text.secondary`; the switch right-aligned
in settings rows (`size.row`, hairline between rows). Group counts in mono caption ("4 / 6 ON").

**States.** Hover: border `color.text.secondary`. Focus-visible: outline on the track. Toggle: thumb and track over
`motion.duration.hover`, `motion.easing.standard`. Disabled: `opacity.disabled`.

**Implementation.** `<input type="checkbox" role="switch">` stays native; its checked state drives the visuals.
