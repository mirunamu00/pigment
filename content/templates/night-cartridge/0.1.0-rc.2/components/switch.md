### Switch

**Anatomy.** Track 32×16px, 2px `color.border.control` frame, `color.surface.raised`; an 8×8px square thumb inside, `color.text.secondary` at the left when off; on: the thumb jumps right in `color.text.accent`, track `color.surface.hover`. A state word follows ("on"/"off", 12px `color.text.secondary`). The whole row (label, 12/18 description, switch) is the target, at least `size.touch`.

**States.** Hover: frame `color.border.strong`. Focus-visible: ring around the track. Selected: one-frame jump, no slide. Disabled: `color.border.default`, thumb `color.text.disabled`. Loading (saved remotely): the state word becomes `.ellipsis`.

**Keyboard and screen readers.** `<button role="switch" aria-checked>` or a checkbox with `role="switch"`; the label names the setting.

**Do / Don't.** Do flip instantly. Don't slide the thumb.
