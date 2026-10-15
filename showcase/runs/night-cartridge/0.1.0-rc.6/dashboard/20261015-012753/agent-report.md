I've restyled every screen with Night Cartridge 0.1.0-rc.6, in both light and dark, following the spec's "Existing project" path. The build passes, nothing scrolls sideways at 1440px or 390px, and the final screenshots match the spec. The pigment-snap runs and the build only check what renders: I didn't run the smoke tests (`npm run test:e2e` isn't one of the commands I'm allowed). I kept every `data-testid`, route, label, ARIA attribute and test-visible text, so they should still pass, but that's unconfirmed.

**What changed**
- **Tokens and fonts:** `dist/tokens.css` is imported straight from the design package in `src/main.tsx`, so no values are retyped. `base.css` was rewritten to use only those tokens. The four font links the spec allows are in `index.html`.
- **Global setup:** the motion and square-corner rules from the spec, pixel type, the 4px gold focus ring, and the stepped animations. Reduced motion and the Animation switch freeze every scene on its first frame.
- **Pixel scenes** (`src/pixel/`): the scene helpers, 12 server-yard props, and hand-placed scenes:
  - a 96px strip at the top of every screen, each with its own crop and props;
  - three small vignettes: empty, settings, and an error one with lights off and a red beacon;
  - the ground strip at the bottom of every page.
  - Scenes have twinkling stars, out-of-sync blinking lights, one drifting cloud, one bobbing sprite (a drone, or a bird in vignettes) and a rare shooting light.
  - I reviewed them alone at 3× on a temporary route, then removed the route.
- **Reusable pieces** (`src/components/ui.tsx`, `PixelStage.tsx`): the ▶ marker, hue bullets, block meter, pixel icons, avatars generated from each person's name, and the "Animation on/off" and "Pixel body on/off" header switches, which are remembered between visits.
- **Screens:**
  - **Header and sidebar:** dither rule under the header; sidebar menu where the current page's marker blinks; the user menu opens with its first option highlighted, and arrow keys and Escape work.
  - **Overview:** KPI cards with a coloured top bar; the two panels each sit under their own 32px heading with a dither rule; the chart is flat square bars with dotted gridlines and fills its panel.
  - **Projects table:** filter chips, sort markers, a marker gutter on rows, status bullets.
  - **Project detail:** marker tabs, task counts shown as block meters, pixel checkboxes.
  - **Team, Settings and Not found** got the same treatment.
- **Fixes from the screenshot review:**
  - the chart left about 150px empty under the plot;
  - its value labels all sat at the top;
  - at 390px the main group of props was cropped off the strip, so narrow screens now centre on it;
  - table cells wrapped word by word on mobile, so they now stay on one line and the table scrolls.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (the scene world, scenes per screen, which colour belongs to which kind of thing), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Delete `src/pages/ScenePreview.tsx`.** It's a leftover from the temporary review route and is now an empty stub. My allowed commands don't include deleting files, so please remove it.
- **No gold button anywhere.** The spec reserves gold for a screen's main commit, and none of these screens has one.
- **No settings section menu or danger zone.** The Settings page is still a "coming soon" placeholder, so it shows an empty state in a titled window.
- **No search keyboard hint and no Callout.** The search has no keyboard shortcut to hint at, and no screen called for a Callout, so I didn't add one.
- **The spec asks for one commit per screen.** I made no commits because git isn't among my allowed commands.
- **I didn't run an accessibility scan.**

**Decisions I made**
- Navigation stays in the left sidebar rather than moving into the header.
- KPI change arrows are green or red by whether the change is an improvement; for incidents and lead time, lower is better.
- Only uptime gets a block meter, because it's the only KPI with a real maximum (100%).
- Dates now show as `YYYY.MM.DD`, as the spec asks.
- Status filters, sidebar items, KPIs and files each got a fixed hue.
- Per the spec, every screen gets a scene strip, including the table-heavy Projects and Team pages.
- The browser's round × that clears a search box is hidden.
- The font links use the spec's `@latest` URLs. If the test machine is offline, those requests would fail and could trip the "no console errors" smoke test.