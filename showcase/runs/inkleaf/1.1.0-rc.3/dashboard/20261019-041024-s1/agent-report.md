I'm not cleared to run git commands (only the five listed), so I'll leave the work uncommitted rather than make the per-step commits the spec asks for.

The whole app is now on Inkleaf 1.1.0-rc.3. The build passes, all 10 smoke tests pass, and no page scrolls sideways in the final full snapshot run (1440px and 390px, light and dark). I looked at every screenshot. The project-detail Tasks and Files tabs, the open user menu and the refresh loading state can't be reached by the snapshot tool, so I only know they work from the smoke tests, not from seeing them.

## What changed
- **Tokens and fonts:** `tokens.css` copied unchanged to `src/styles/` (and with `tokens.json` into `design-system/`). Source Serif 4, Instrument Sans and JetBrains Mono load from Google Fonts. Light/dark follows the OS setting, and `[data-theme]` overrides it.
- **Signature elements, built as reusable pieces in `src/ink/`:**
  - The brush filters, added once at the app root.
  - `Picto`: the stepped drawing animation. It plays once (header drawings once per session), can "boil" while work is pending, and shows the final frame under reduced motion.
  - `Stage`: the pastel panel with wandering lines.
  - `WriteIn`: word-by-word headings. Text, ids and accessible names are unchanged.
  - The working glyph and the breathing dot.
  - The ring-control button classes.
  - Block rise: below-the-fold cards rise in on a route's first visit only.
- **Shell:** a 240px sidebar from 992px up. Below that it becomes a menu button and sheet, using the same nav element so test ids stay unique. The 72px header is sticky, with a search field (icon and its own clear button) and a restyled account menu.
- **Shared header** (`PageHeader`), identical on every screen: small drawing, written-in h1, actions on the right, lede below.
- **Screens:**
  - **Overview:** the deployment chart is the screen's one stage (current month in ink); stat cards; KPI changes colored by meaning ("−2 open incidents" is good news); the glyph inside Refresh while loading.
  - **Projects table:** filter chips; on phones the rows stack and a "Sort by" select appears; status badges, with Active dots breathing; the filtered-empty state has its own drawing.
  - **Project detail:** underline tabs, a restyled checkbox, the files table.
  - **Team:** avatar tiles.
  - **Settings:** its "coming soon" panel is now an empty state with a drawing.
  - **Not found** (page and project): a large drawing and two actions.
- **Drawings:** eight original subjects:
  - Headers: windsock (Overview), signpost (Projects), lantern (project detail), lanyard (Team), plug (Settings).
  - Elsewhere: key (Settings empty state), half-unrolled plan (empty filter), binoculars (not found).
  - Four of the eight have a hand, one in each pose.
- Added `design-system/` (`VERSION`, tokens, `components.md`) and pointer lines in `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **Commits:** none were made, per above.
- **Project detail stage:** the spec wants a detail page's main image on a stage, but projects have no images. That would mean drawing eight more subjects, one per project, so the detail page has only its header drawing.
- **Screenshots:** in the full-page shots, the Overview's activity list and projects table look blank. Those cards are waiting to rise into view, which a full-page screenshot never triggers. The same table shows correctly on the Projects page and in the empty-filter snapshot.

## Decisions I made
- The chart sits on a white card on the stage, because small grey labels directly on the pastel color don't meet the contrast minimum.
- "Refreshing…" keeps its original wording next to the glyph, and the button has a minimum width so it doesn't change size.
- Not-found pages gained a second action ("View projects" / "Go to overview"), since the spec asks for two.
- The visible "Filter projects" label is now visually hidden, as the spec's toolbar requires; it is still in the page for screen readers.
- I dropped a hand from the plug and redrew others where the hands read as a beak or a coil.
- I used a temporary route to inspect the drawings at large size, then removed it.
- `npm install` created a `package-lock.json`. I left it in place, uncommitted.