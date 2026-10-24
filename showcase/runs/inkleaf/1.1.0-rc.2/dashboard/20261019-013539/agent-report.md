I've restyled every screen to Inkleaf 1.1.0-rc.2. The build passes, all 10 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no page scrolling sideways. One temporary file still needs deleting: `src/pages/InkCheckTemp.tsx`. I couldn't delete it because `rm` isn't one of the commands I'm allowed to run. Its route is already gone from `App.tsx`, but the file still compiles, so please delete it.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `design-system/tokens.css` and imported by `src/styles/base.css`, which I rewrote using only tokens. Fonts load from Google Fonts in `index.html`. Dark mode follows the system setting, or `data-theme` if set.
- **Signature pieces (`src/ink/`), all reusable:**
  - The hand-drawn pictogram: brush filters installed once at the app root, a frame-by-frame strip that plays once when it scrolls into view and then holds, and a pending-work "boil" option.
  - The pastel stage with faint wandering lines.
  - Headings that fade in word by word.
  - The written-loop working glyph and the breathing dot.
  - The ring-style buttons, chips and fields.
  - A shared product-screen header.
  - Blocks below the fold rise in on a route's first visit.
  
  All of this motion stops under reduced-motion.
- **Shell:** header 72px tall with the serif product name; 240px sidebar with icons. Below 992px the sidebar becomes a menu button that opens a sheet. The account menu is restyled with the email shown as a heading line.
- **Each screen:**
  - Every screen has its own small header drawing (8 original drawings in total, 4 with hands, each hand pose used once).
  - Overview: the chart is on the screen's one stage, metric changes are coloured by whether the change is good news, and the Refresh button shows the glyph while loading.
  - Projects table: filter chips, a search field with its own clear button, and status badges ("Active" breathes). On phones the rows stack and a "Sort by" select replaces the column headers.
  - Project detail: underline tabs, custom checkboxes and a restyled progress bar.
  - Team: square avatar tiles, and the table scrolls inside a labelled region on phones.
  - Empty, settings and not-found states each have a drawing and a title that writes itself in.
- **Docs:** `design-system/` holds `VERSION`, the tokens and `components.md`, which records which drawing each screen uses and the one word a stranger would give it. `AGENTS.md` and `CLAUDE.md` carry the pointer line.

**What I couldn't apply**
- **No commits:** git isn't on the allowed command list, so the "one commit per screen" rollback structure doesn't exist yet.
- **Screenshots:** the snapshot tool captures right after load and without reduced-motion, so drawings and headings appear part-way through their animation. Blocks below the fold (e.g. the Overview projects table) appear blank because they only rise in once scrolled into view. I left this as the spec intends and checked the same table on the Projects page, where it starts on screen.
- **Refresh delay:** the spec bans artificial delays to show a working state, but the existing 1.5s refresh delay stays because the tests depend on it.
- **No stage on detail:** the project detail page has no main image to put on a stage, so it has none.

**Decisions I made**
- **Status colours:** Active is blue with a breathing dot, Paused amber, Done an ink check-circle.
- **Phone header:** the search box moves to a second header row on phones.
- **Not-found pages:** I added a second action to both ("See all projects" / "Go to overview"), because the spec asks for two.
- **Settings:** the "coming soon" message is shown as a large empty state rather than a card.
- **Small additions:** an email address is shown as a heading line in the account menu, and the "Refreshing…" button keeps its width while loading.
- **Weakest drawings:** at 48px the windsock may read as "flag", and the blueprint as "scroll".