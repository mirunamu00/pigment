### Switch

**Anatomy.** Track 32×16px, 2px `color.border.control` frame, `color.surface.raised`; an 8×8px square thumb, `color.text.secondary` at the left when off, at the right in `color.text.accent` on a `color.surface.hover` track when on; a 12px state word follows. The whole row is the target, at least `size.touch`.

**States.** Hover and focus per Interaction (ring around the track). On: one-frame jump, no slide. Disabled: `color.border.default`, thumb `color.text.disabled`. Loading (saved remotely): the state word becomes `.ellipsis`.

**Accessibility.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; the label names the setting.
