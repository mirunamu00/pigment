### Empty state

**Use.** Nothing to show yet; the main in-app place for details.

**Anatomy.** Centered panel, max 480px: `color.surface.raised`, `radius.panel`, `elevation.pinned`, padding `space.40` `space.32`. Title `font.size.h3` `font.weight.semibold`, sans; one sentence `font.size.body` `color.text.secondary` saying what will appear and how to start; one secondary button (primary only if creating is the page's job) `space.24` below; gaps `space.12`. No illustration or emoji.

**Details.** Page-level: 1 tape strip, the empty-state bloom (bloom recipe) behind the panel's top-right corner, and 1 pencil note beside the button repeating its label's intent ("add the first one"). Inside a table, widget, cart or form: no details, `elevation.rest`.

**States.** Failed to load: a danger callout with retry, no details.
