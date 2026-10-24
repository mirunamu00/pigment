Inkleaf is applied to every screen: Overview, Projects, Project detail, Team, Settings and the not-found pages. The final build passes, and nothing scrolls sideways at 1440px or 390px, light or dark. **I could not run the smoke tests** (`npm run test:e2e` isn't one of the commands you allowed), so that suite has not been run. All test ids, routes, labels, `aria-*` attributes and behaviours are kept. The heading tests should still match because each written-in heading keeps its exact text and gets a matching `aria-label`.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package tokens, imported by `src/styles/base.css`, which I rewrote around the token variables. The old ad-hoc variables are gone. The three fonts load from Google Fonts in `index.html`. Dark mode follows the system setting, and `[data-theme]` can override it.
- **Signature elements, as reusable pieces in `src/components/ink/`:**
  - The brush filters, added once at the app root.
  - The hand-drawn pictogram: plays once and holds, header drawings play once per session, and it shows the final frame under reduced motion.
  - The pastel stage with wandering lines.
  - The word-by-word heading.
  - The working glyph and the breathing dot.
  - The ring-style buttons, chips, inputs, select and checkbox.
  - The block rise on a route's first visit.
- **Every screen:**
  - The same header on each: small drawing, written-in h1, actions, lede.
  - Overview: the main chart sits on the sage stage, with grey bars, the current month in ink and three gridlines. KPI changes are coloured by meaning, so fewer incidents shows as good.
  - Projects table: filter chips plus a search field with its own clear button. On mobile the rows stack with labels and a native "Sort by" select appears.
  - Status badges with a breathing dot for active projects; underline tabs; square avatar tiles.
  - Filtered-empty, Settings and not-found are empty states, each with its own drawing.
- **Drawings:** eight original subjects (pocket watch, pennant, blueprint scroll, headset, wrench, binoculars, hourglass, lantern), half of them with a hand. In review the watch and pennant read as standing figures at 48px, so I redrew both with the hand coming in from the side.
- **Docs:** `design-system/VERSION` and `components.md` (conventions, where each element is used, the drawing for each screen), plus pointer lines in new `AGENTS.md` and `CLAUDE.md`. I updated the styling note in `README.md`.

**What I could not apply**
- **One commit per screen:** git wasn't an allowed command, so all changes are uncommitted in the working tree.
- **Working glyph:** it is built but used nowhere, because the app makes no real requests and the spec forbids faking one.
- **Settings plan stage:** the Settings page is only a placeholder, so there were no plans or setting groups to put on a lilac stage.
- **Static screenshots:** below-the-fold cards rise only when scrolled into view, so they look blank in the full-page mobile shots. That is the spec's behaviour. To review them I briefly disabled the rise, checked the shots, then re-enabled it. The header's fade-in also shows half-faded in desktop shots.
- **Settings and not-found screenshots:** neither page is in the screenshot list, so I checked them only through shared components.

**Decisions I made myself**
- Panel titles stay still; only h1s and empty-state titles write in.
- Status colours: active is blue ("info"), paused is amber ("warning"), done is green ("success").
- KPI cards drop to one column under 600px so the large values never overflow.
- The not-found screens gained a second action ("View projects" / "Go to overview"), as the spec's error state calls for two.
- The Team and Files tables scroll inside a labelled region on mobile instead of stacking, because they have no status or row actions.