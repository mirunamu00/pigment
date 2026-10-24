### Empty state

**Use.** Nothing to show yet; the main in-app place for details.

**Anatomy.** Panel max 480px on the page h1's axis: at the content column's left edge under a left-aligned h1, centered only on a page without an h1. `color.surface.lifted`, `radius.panel`, `elevation.pinned`, padding `space.40` `space.32`, text left-aligned. Title `font.size.h3` `font.weight.semibold`, sans; one sentence `color.text.secondary` saying what will appear and how to start; one secondary button (primary only if creating is the page's job) `space.24` below; gaps `space.12`.

**Details.** Page-level: 1 tape strip, the empty-state bloom (bloom recipe), and a `.note--beside` note on the button repeating its intent ("add the first one"). Inside a table, widget, cart or form: no details, `color.surface.raised`, `elevation.rest`.

**States.** Failed to load: a danger callout with retry, no details.
