I've restyled every screen to Night Cartridge, including Settings and the 404. The build passes, all 9 smoke tests pass, nothing scrolls sideways at 1440px or 390px, and the final screenshots match the spec. I had no permission to run `git`, so nothing is committed. The spec's "one commit per screen" is yours to do.

**Sprite table:** no item sprites. The app has no product or item grid.

**Variant table:** no sprite appears twice in the same scene. Props are reused between scenes only in different arrangements, and each scene has its own lead.

**Scenes.** The numbers come from a temporary review page that computed them from the scene code; I removed that page before finishing.

| Scene | Lead (features) | Lead height | Lights | Dots | Gaps left → right (units) |
|---|---|---|---|---|---|
| Overview strip | dish hut (roof dish, LED rack door, lit window, cable) | 24 | 6 | 70 | edge 112 · 5, 115, 2, −2, 142, 3, 8 · edge 155 |
| Projects strip | rack tower (dish, two LED rack bays, cable) | 26 | 6 | 69 | edge 152 · 6, −3, 156, 1, 4, 92, 9 · edge 131 |
| Team strip | container data centre (dish on stand, LED door, window pair, siding) | 22 | 7 | 68 | edge 100 · 7, 99, 3, −1, 158, 2, 8 · edge 160 |
| Settings strip (workshop) | saw-tooth roof, open bay, gear plate | 22 | 5 | 67 | edge 155 · 4, 6, 160, −1, 3, 120, 5 · edge 82 |
| Detail banner | server house, size and shape set per project; odd-numbered projects mirror the layout | 50–58 | 6–7 | 81 | mast tops the far ridge by 16; floodlight tower now tops it by 4 (it was 2, fixed) |
| Empty-state / error vignettes | lamp post + open crate / dead rack + blinking red beacon | 26 / 24 | 1 / beacon only | 15 / 15 | — |

- Every scene is placed in the content's left or right half, its lead offset from centre by 60–80 units, and is centred on its focal group at 390px.
- Each scene has its motion: stars twinkle, lights blink out of sync, a cloud drifts, a fan swaps frames, and a shooting star crosses every 14 seconds. All of it stops under reduced motion and with the Animation switch off.

**What changed**
- **Global look:** the tokens are imported unchanged from the package. I rewrote `src/styles/base.css` with the root rules, pixel type, stepped motion and the window/meter/marker chrome. The fonts load in `index.html`.
- **Art:** the scene engine is in `src/art/` and the reusable pieces are in `src/components/pixel.tsx`. The header switches persist in the browser.
- **Header:** it is now sticky with the dither rule and holds the main navigation with the marker, search with a `/` shortcut, and the user menu with arrow keys. Under 1024px a menu button opens the navigation and keeps focus inside it until closed.
- **Screens:**
  - Overview, Projects and Team each open with a strip scene in a window.
  - KPI tiles have hue bars, 48px numbers and up/down markers.
  - The chart has dotted gridlines and the activity list has avatars.
  - Status filters became chips with a meter for the "Showing n of m" count. Tables show only the pinned columns on phones.
  - The detail page has a banner, tabs with the marker, block meters for the task counts and pixel checkboxes.
  - Settings has its own full-height sidebar.
  - The 404 page is a window with the error vignette and a gold "Go to overview" button.
- **Docs:** added `design-system/` (VERSION, components.md) and `AGENTS.md` / `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Light appearance:** the spec is dark-only, so light-mode screenshots look the same as dark.
- **Commits:** none were made (see above).
- **"Each project gets its own lead in its own arrangement":** I only partly met this. The eight leads differ in shape, but there are just two arrangements, one normal and one mirrored.
- **Hand-placed details:** most are, but the lattice mast, the floodlight tower and the banner server houses are drawn by small routines rather than typed row by row.
- **Never-list "letter-like marks":** I checked these by eye only.
- **"View all" link on the activity panel:** left out because there is no page for it to open.
- **Font loading:** the fonts come from a CDN. The tests passed with network access; without it, the failed downloads would log console errors and fail the "no console errors" test.

**Decisions I made myself**
- The navigation moved from the sidebar into the header. With the sidebar, scenes would have been cropped narrower than the spec assumes. Only Settings keeps a sidebar.
- The header avatar is 28px rather than 40px, and the user's name is hidden visually but still read by screen readers.
- Between 1024px and 1279px the switch labels collapse to icons. On phones search stays visible as a second header row instead of becoming an icon.
- Only uptime gets a block meter (out of 100%). The other KPIs have no real maximum, so they show only their change.
- Dates now read `YYYY.MM.DD`.
- The project-not-found screen reuses the 404 vignette.
- I added one line of copy under the Settings heading: "Workspace preferences for Northwind Ops."
- The Settings menu items that don't exist yet are marked "soon" and aren't links.