Night Cartridge is now applied to every screen. The build passes, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px.

**What I changed**
- **Appearance:** dark only, because the spec defines no light theme ("Dark only: no light theme, no theme switch"). The light screenshots look the same as the dark ones.
- **Tokens and fonts:** the spec's `tokens.css` is copied unchanged into `design-system/tokens.css` and imported by the app. The four font stylesheets the spec lists are loaded in `index.html`. `src/styles/base.css` is rewritten using only token values: square corners, 2px and 4px borders, one pixel typeface at weight 400, the gold focus ring, and stepped motion that stops under reduced motion or when the Animation switch is off.
- **Signature pieces:** these are reusable components in `src/components/pixel/`:
  - the RPG marker, windows, dithered rule and block meter;
  - callout, bullet and pixel icons;
  - strip stage, vignettes, ground strip and hashed pixel avatars;
  - the Animation and Pixel body header switches, saved per browser.
- **Pixel art:** one server-yard world in `src/art/`. Each of the five screens has its own strip scene with its own lead hut, props and skyline. There are three vignettes (empty table, page not found, project not found) and the ground-strip sprites. I reviewed the scenes enlarged on a temporary page, then removed its route.
- **Screens:**
  - **Header and nav:** a dithered rule under the header, and a sidebar menu whose current item gets the marker. It becomes a top menu below 1024px.
  - **Overview:** KPI tiles with hue bars, ruled section headings, and the chart redrawn as flat bars on dotted gridlines.
  - **Tables:** the projects table has filter chips, sort markers, status bullets, a marker on the hovered row and only pinned columns on mobile.
  - **Project detail:** pixel tabs, block meters for "2 of 6", and pixel checkboxes.
  - **Error states:** both not-found pages have a gold button and a blinking beacon.
- **Kept unchanged:** every route, `data-testid`, label, aria attribute and behaviour. The user menu now also focuses its first item when it opens and responds to arrow keys.

**Spec items I could not apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted on `main`.
- **Leftover file:** `src/pages/ArtReview.tsx` (the temporary review page) is still there. Its route is removed, but I couldn't delete the file with the allowed commands, so please delete it.
- **No `tokens.json` copy:** `design-system/` holds `tokens.css` but not `tokens.json`.
- **No kbd hint in search:** the app has no keyboard shortcut for search, so there's nothing honest to show.
- **No meter on the uptime KPI:** a 99.94% meter against 100 would just be full and say nothing.
- **Font links use `@latest`:** that's how the spec gives them; they aren't pinned to a version.
- **No axe audit:** I didn't run an accessibility audit, since it isn't one of the allowed commands.

**Decisions I made myself**
- **Strips on data screens:** the Projects and Team pages are data tables, for which the spec says "no art". I gave them strips anyway, because the spec also says every screen has one scene.
- **Settings scene:** the settings strip stays in the server-yard world, led by a workshop hut, because the spec says one world per app.
- **Two-row mobile header:** brand, switches and avatar on the first row, search on the second; the switch labels become icon-only below 600px.
- **Dates and data:** dates now read `YYYY.MM.DD`. I added `hue` and a better-direction field to the KPI data, so falling incidents and lead time show in green rather than red.
- **Screenshot timing:** the current-nav marker blinks, as the spec allows. It happened to be in its hidden half in every screenshot.

The world, scenes per screen and hue assignments are recorded in `design-system/components.md`, and `AGENTS.md` and `CLAUDE.md` now point to `design-system/`.