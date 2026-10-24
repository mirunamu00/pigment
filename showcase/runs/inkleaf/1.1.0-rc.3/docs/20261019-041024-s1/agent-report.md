I've restyled the Ferrule docs with Inkleaf 1.1.0-rc.3. The build passes, all 16 smoke tests pass, and the snapshot tool reports no sideways scroll on any page, light or dark, at 1440px or 390px. I couldn't commit: you limited me to the five npm/node commands, so `git` isn't allowed and all changes are uncommitted in the working tree. The spec asks for one commit per screen.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/` and `design-system/`. The fonts load from Google Fonts. Dark mode follows the system setting, and a `[data-theme]` attribute can override it.
- **Signature pieces** (in `src/inkleaf/` and `src/styles/inkleaf.css`):
  - the brush filters, `finger()` and `celStrip()` from the recipe;
  - a `Pictogram` component that draws once when it scrolls into view and then holds;
  - `Stage`, the pastel panel with wandering lines;
  - `WriteIn`, the word-by-word heading;
  - the working glyph and breathing dot;
  - the ring-control button classes, block rise, icons and the check-circle.
  
  All motion stops under reduced motion.
- **Drawings:** eight new subjects (brush, stopwatch, plug, signpost, tape measure, lantern, hourglass, folded map). Four have hands, each in a different pose. Each has strokes + 3 frames. I checked them up close on a temporary route and then removed it.
- **Screens:**
  - **Docs home:** the hero brush drawing in the accent colour on a sage stage, a written-in h1, text-only section cards, and a Quick start section opening with the stopwatch.
  - **Doc pages:** a drawing above the h1 for each docs group, written-in h1 and h2s, reference tables in cards that scroll inside their own region on phones, restyled callouts and copy button, segmented tabs, and numbered steps.
  - **Changelog:** hourglass drawing above the h1, with outline badges carrying a coloured dot.
  - **Not found:** the map drawing with two actions.
  - **Shell:** a 72px header, a 240px sidebar that becomes a sheet below 992px, and a search field with an icon and a clear button.
- `design-system/` (`VERSION`, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Working glyph and breathing dots:** nothing in the docs makes a real request, so they're built but unused. Copy is instant and goes straight to "Copied".
- **Group open/close motion:** groups use the `hidden` attribute, so only opening animates; closing is instant.
- **Screenshot coverage:** the snapshot tool doesn't scroll, so content below the first screen stays hidden in its full-page shots. I reviewed those parts by snapping URLs with a `#heading` so the page scrolls there on load.
- **`VERSION` date:** the spec gives no update date, so I used today's.

**What I decided myself** (also listed in `components.md`)
- One drawing per docs group (4) rather than one per page (12).
- The home section cards are a link list, so they get no plates or drawings.
- The "On this page" list sits beside the text only from 1200px, because the sidebar leaves too little room at 992px. Below that it's a collapsed toggle after the intro.
- The header is sticky only from 992px. Below that it wraps onto two rows and scrolls away. Under 834px the small header icon hides so the name, version and both links fit at 390px.
- The menu button is a 44px icon button; "Menu" is still its text, visually hidden.
- Added content: a "Clear search" button, a second "See what changed" action on both not-found pages, and line icons replacing the callouts' letter placeholders.
- Doc page titles shrink between 36px and 52px.
- I kept the existing `role="status"` regions as they were, including one inside each code block.