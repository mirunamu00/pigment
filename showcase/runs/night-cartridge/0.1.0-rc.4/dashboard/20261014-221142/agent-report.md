Night Cartridge is applied to all six screens, in light and dark. The build and typecheck pass, the full snap at 1440px and 390px shows no sideways scroll, and the screenshots match the spec. I did not run the Playwright smoke tests: `npm run test:e2e` wasn't on the allowed command list. I kept every `data-testid`, ARIA attribute, route, form field and test-visible text, but that is not the same as a passing run.

**What I changed**
- **Tokens and fonts:** `tokens.css` is imported unchanged from `design-packages/` in `src/main.tsx`, because copying it would have meant retyping it. The four font links the spec allows are in `index.html`. The old base styles are replaced by `src/styles/base.css`, which has no raw colours.
- **Signature pieces:**
  - **Pixel art** (`src/art/`): the spec's drawing helpers, eight server-yard prop types, and one scene per screen. Each scene has its own skyline seed, focal group and hand-placed details. Counts: 75–77 per strip (minimum 30), 106 for the banner (minimum 60), 20–22 per small framed scene (minimum 15). I reviewed every scene on its own at 2× in two rounds.
  - **Shared components** (`src/components/pixel.tsx`): the scene frames, the ground strip, the ▶ marker, block meters, bullets, pixel icons, hashed pixel avatars, and the "Animation" and "Pixel body" header switches. Both switches are saved in the browser.
  - **Motion:** stepped animations (blinking lights, twinkling stars, a drifting cloud, a fan or monitor that swaps two frames, a rare bird). All of it stops under reduced motion and when the Animation switch is off.
- **Screens:**
  - **Overview:** a scene strip with the title, then KPI tiles with hue bars. Key metrics, chart, activity and table each have their own large heading on the dithered rule.
  - **Projects table:** filter chips, a sort marker in the headers, and a meter next to "Showing n of m".
  - **Project detail:** a banner scene with a moon. Tabs show the marker, and task progress is a block meter.
  - **Team:** a scene strip and a table with pixel avatars.
  - **Settings:** a strip plus the existing placeholder, now an empty state with a small workbench scene.
  - **Not found:** a lights-off scene with a beacon and a gold link back.
  - **Every screen:** the dithered rule under the header, the ground strip at the bottom, and a marker on the current menu item.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** git wasn't on the allowed list, so nothing is committed.
- **Leftover file:** I couldn't delete the temporary review page, so `src/pages/ArtReview.tsx` is now an unused stub. Please delete it.
- **Real settings layout:** the settings section list and settings groups weren't built, because the page is only a "coming soon" placeholder and I didn't invent settings.
- **Search shortcut hint:** I left out the keyboard hint in the search box, since showing one would mean adding a shortcut that doesn't exist.

**Decisions I made**
- **Layout:** the sidebar stays as the navigation. Under 1024px it becomes a wrapped top menu. Under 600px the header wraps to two rows and stops being sticky.
- **Every screen gets a scene:** that includes the Team table, even though the spec's table row says "no art", because the spec also says every screen has one scene.
- **Scene layering:** I added a dithered middle hill between the far ridge and the props. Without it, the middle of each scene was one flat field.
- **Table marker:** the tables have no selected row, so the marker shows in the left gutter on row hover and focus.
- **Gold buttons:** only the error screens have one. No other screen has a main action to commit.
- **Data shown differently:**
  - Dates now read `2026.12.15` instead of "Dec 15, 2026".
  - Avatar initials became pixel sprites.
  - The native clear (×) button in search boxes is hidden, because it is round.
  - KPI deltas are coloured good or bad using a new `better` field in `src/data/metrics.ts`.
  - Only uptime gets a meter, because it is the only KPI with a real maximum (100%).
- **Hues:** deployments is cyan, uptime violet, incidents blue, lead time amber, projects green and people pink. Statuses use success for active, warning for paused and info for done.