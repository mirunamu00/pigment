### Toast

**Anatomy.** Bottom-right stack (bottom, full width under `breakpoint.sm`), `space.16` from the edges. 2px `color.border.strong` frame, `color.surface.raised`, padding `space.12` `space.16`, max 400px; 12px pixel status icon or `size.bullet` in the status colour, message 16/24, optional framed action and a 12px × close.

**States.** Appears and disappears in one frame (optional 2-step drop: `translateY(-8px)` → 0, `steps(2)`, 100ms); auto-hides after 5000ms unless it has an action or is hovered. Focus-visible ring on its buttons. Error toasts stay until dismissed.

**Keyboard and screen readers.** Announced through the screen's one `role="status"` region (errors `role="alert"`); never steals focus.

**Do / Don't.** Do keep toasts art-free. Don't slide them in from off-screen or fade them.
