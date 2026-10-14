I've applied Inkleaf 1.0.0 to every screen. The build and typecheck pass, and the last `node pigment-snap.mjs` run found no sideways scroll on any captured page at 1440px or 390px, light or dark. I could not run the smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed. Every `data-testid`, route, label text, ARIA attribute and native input is kept, and I checked each test's selectors against the new markup by reading them. I also couldn't commit "one commit per screen" as the spec asks, since git wasn't allowed either, so all changes are uncommitted in the working tree.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `dist/tokens.css` unchanged, so no values were retyped. Dark mode follows the system setting unless `[data-theme]` overrides it. `index.html` loads Source Serif 4, Instrument Sans and JetBrains Mono from Google Fonts. `src/styles/base.css` was rewritten to use tokens only.
- **Signature pieces, all reusable (`src/ink/`):**
  - the brush filters, rendered once at the app root;
  - the hand-drawn pictogram (one stepped animation that plays once, plus the "boil" state);
  - the pastel stage with faint lines;
  - headings that fade in word by word;
  - the "working" glyph and breathing dot;
  - block rise for blocks below the fold;
  - the ring-style button, chip, input and checkbox classes.
  
  Motion stops under `prefers-reduced-motion`: drawings show their final frame and headings appear whole.
- **Screens:**
  - **Every screen:** the same page header, with a small drawing beside a write-in h1.
  - **Overview:** stat cards coloured by meaning (fewer incidents is good), and the chart in a raised card on a sage stage.
  - **Projects table:** a card with chips and search. Under 834px rows stack with labels and a native "Sort by" select appears.
  - **Team:** square serif-initial avatars, and the table scrolls inside a labelled region on mobile.
  - **Project detail:** underline tabs and styled checkboxes.
  - **Empty and placeholder states:** the empty filter shows binoculars. Settings shows its placeholder in a raised card on a lilac stage over faded cards.
  - **Not found (both pages):** a large drawing on an apricot stage, with two actions.
  - **Shell:** sticky header, sidebar from 992px, and a menu button below that.
- **Eight drawings, all different:** flag, blueprint roll, stopwatch, hard hat, key, binoculars, wrench and flashlight. Four of them include a hand.
- **Docs:** `design-system/VERSION` and `components.md` (conventions, where each piece is used, drawing subjects by screen), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Working glyph:** the app makes no real requests, so it is built but never shown. The spec forbids showing it idle.
- **Project detail stage:** that screen has no stage. Its only candidate panel is a key-value summary, which the spec bans from stages.

**Decisions I made**
- "Active" projects count as running, so their status badge gets the breathing dot (status colours: Active info, Paused warning, Done success).
- The header drawing plays once per session; on later visits it shows the finished drawing.
- I added a few small elements the spec requires:
  - clear buttons inside the search fields;
  - a "Sort by" select on mobile;
  - a mobile navigation menu;
  - a second action on both not-found pages ("View projects" and "Go to overview").
- The chart redraws at its actual width so labels stay 12px on mobile.

**How I reviewed it**
In normal screenshots the drawings and the top bar are caught mid-animation, and blocks below the fold stay hidden. To review them I temporarily disabled those animations, enlarged the header drawings, and added the settings, not-found and empty-filter routes to `pigment.app.json`. That review led me to redraw two hands that read as a ball on legs. I then removed every temporary change and ran the final screenshots on the real code. In those final screenshots the settings, not-found and empty-filter pages aren't captured, and below-the-fold blocks start hidden; that matches the spec.