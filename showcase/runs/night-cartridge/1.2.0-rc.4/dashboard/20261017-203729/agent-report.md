I restyled every screen of Northwind Ops in Night Cartridge 1.2.0-rc.4. The build passes, all 9 smoke tests pass, and the final snap of every route at 1440px and 390px reports no sideways scroll.

**What changed**
- **Tokens and base:** `design-system/tokens.css` is an exact copy of the package tokens and is imported by `src/styles/base.css`, which I rewrote. It adds dark-only setup, the pixel fonts as the spec's CDN links in `index.html`, focus ring, markers, windows, dither rules, meters and stepped animation. Animation stops under reduced motion and when the Animation switch is off.
- **Scene kit (`src/scene/`):** the spec's helper functions, a sprite painter, and hand-placed scenes for one world, a server yard:
  - Overview, Projects, Team and Settings each get a strip with its own lead sprite (server hut, data container stack, ops cabin, and a workshop with a gear plate).
  - Each of the 8 projects gets a banner with a different lead (server hall, data vault, warehouse, gatehouse, tape silo, radio mast, container stack, switch tower).
  - Three small framed scenes for the empty filter, page-not-found and project-not-found (the last two with the lights off and one red beacon), plus the grass ground strip at the bottom of every screen.
  - Stars twinkle, lights blink out of sync, a cloud drifts, a fan swaps frames, and a shooting light passes now and then.
- **Reusable pieces (`src/components/pixel.tsx`):** scene, ground strip, vignette, marker, window, dither rule, block meter, callout, bullet, pixel icons, hued-initial avatars, and the Animation / Pixel body header switches (saved between visits).
- **Shell:** the sidebar became a sticky header with the logo mark and name, nav items with the ▶ marker, search with a `/` shortcut, the two switches and the user menu. The user menu now supports arrow keys and returns focus on Escape. Below 1024px everything moves into a menu window. The footer is the ground strip.
- **Screens:**
  - Overview: KPI tiles with colour bars, the uptime tile gets a block meter, and the bar chart is rebuilt in HTML/CSS.
  - Projects table: filter chips, sort markers, status bullets, a "Showing n of m" block meter, and only the pinned columns on phones.
  - Project detail: tabs with markers, block meters for task progress, pixel checkboxes.
  - Team: avatars as hued initials.
  - Settings: a marker sidebar and a titled window.
  - Not-found: a framed window with a gold button.

All routes, labels, `data-testid`s and ARIA attributes are preserved. I added `design-system/` (VERSION, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **No light theme:** the spec is dark-only, so the "light" screenshots are dark too.
- **No commits:** git isn't among the allowed commands, so nothing is committed, one per screen or otherwise.
- **Temporary review route:** it's removed from `App.tsx`, but I can't delete files, so `src/pages/ScenePreview.tsx` is left as an empty placeholder. Please delete it.
- **No measured scene report:** the spec wants per-scene numbers measured on the render. I could only run the snap tool, so I reviewed scenes by eye in zoomed-in crops (one round of fixes: the small tree was redrawn) and didn't produce that report or the sprite/variant tables.
- **No axe accessibility pass:** it wasn't available to run.
- **Interactive states not screenshotted:** the open mobile menu, open user menu and the Tasks/Files tabs. The snap tool only takes paths; the user menu and tabs are covered by the smoke tests.

**Decisions I made myself**
- **Header at mid widths:** between 1024 and 1439px the switch names and the user's name are visually hidden (the icon and on/off word stay; screen-reader names are complete) so the header fits. The tests run at 1280px, so the full nav has to stay visible there.
- **One world:** Settings uses a workshop inside the server yard rather than a separate world, to keep one world per app.
- **Placeholders unchanged:** I kept "Search projects…" rather than the spec's one-word "Search", since you asked for label text to be preserved.
- **Dates and status colours:** dates now read YYYY.MM.DD. Active is green, Paused amber, Done blue.
- **KPI meters:** only uptime gets one, because it's the only KPI with a real maximum (100%). The other three show just their change, with lower-is-better metrics coloured as good when they fall.
- **Gold buttons:** gold appears only on the not-found screens ("Go to overview", "Back to all projects"), since no other screen has a main commit action.
- **Settings sidebar:** it lists the three upcoming areas named in the page text as disabled items.