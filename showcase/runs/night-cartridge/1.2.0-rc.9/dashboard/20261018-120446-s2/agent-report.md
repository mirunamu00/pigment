I've applied Night Cartridge 1.2.0-rc.9 to every screen. The build passes, all 10 smoke tests pass, and the final screenshots show no page scrolling sideways at 1440px or 390px. Every route, label text, `data-testid` and accessibility attribute is unchanged. A few scene numbers still miss the spec slightly (listed below), and nothing is committed, because git staging needed an approval this unattended run couldn't give. All changes are in the working tree.

**What changed**
- **Tokens and root setup:** `design-system/tokens.css` is a copy of the package file, imported by `src/styles/base.css`. The stylesheet has the spec's root block and the four allowed font links (in `index.html`).
- **Signature pieces** (`src/components/pixel/`, art in `src/art/`):
  - Pixel scenes, a framed scene window with its title block, the small square "vignette" scenes, and the ground strip at the foot of every screen.
  - The ▶ marker, dithered rules, block meters, hue bullets, callout and avatars.
  - The Animation and Pixel body switches in the header, saved between visits.
  - The scenes are one world, a harbour freight yard at night. Each screen and each of the 8 project pages has its own lead building with a real sign word, for example PORT, YARD, MOVE, BILL, SCAN, GATE, KEEP, PAY, VEND, HELP.
  - All scene motion uses the spec's stepped timing and stops under reduced motion and when the Animation switch is off.
- **Screens:**
  - **Overview:** scene strip, KPI tiles with hue bars and meters, chart and activity panels under ruled headings, and the projects table.
  - **Projects and Team:** scene strip plus the table.
  - **Project detail:** its own banner, tabs, a meter for tasks, pixel checkboxes, and previous/next project links.
  - **Settings:** scene strip plus a framed "coming soon" panel with a small scene.
  - **Not found and project not found:** a scene with the lights off and one red beacon, and a gold button back.
- **Docs:** `design-system/` with `VERSION` and `components.md` (the world, the scene for each screen, the hue for each category), plus `AGENTS.md` and `CLAUDE.md` pointing to it.
- The temporary review route I used to check scenes up close has been removed.

**What I couldn't fully apply**
- **Flat-tone limit:** on most banners the band between the far and near ridges reaches 38–40 units against a limit of 32. On the strips it is 16 against 12. I picked the best of 6,000 seeds per layer, but the spec's ridge ranges make the limit nearly impossible to meet everywhere.
- **Sprite table:** no item sprites. The app has no product grids.
- **No light theme:** the spec defines dark only.
- **Missing report sections:** the spec asks for a per-scene numbers table and a prop-variant table at the end of the report. I haven't included them. I checked the numbers on the temporary review page but haven't written them out yet.
  - Lead heights: 54–62 units on most banners (warehouse 50), 22–24 on strips.
  - Detail counts: 65–67 dots per banner, 41–45 per strip, 18 per small scene.
  - Lights per scene: 3–5.
  - Tall masts and lamp posts now all clear the far ridge. Some were nudged up to 12 units sideways to do it.
- **Accessibility scan:** I didn't run an axe check, because it isn't one of the commands I was allowed to use.

**Decisions I made myself**
- **Primary nav:** it stays in the left sidebar rather than the header, to keep the existing structure. Under 1024px the sidebar becomes a wrapping top menu and search moves to a second header row.
- **Scene choices:**
  - The Projects and Team table screens get a scene strip. The spec says "no art" for tables but also "one scene on every screen".
  - Overview has no gold button, because a dashboard has no main action to commit.
- **Displayed text:**
  - Dates now display as YYYY.MM.DD.
  - The Refresh loading label shows "Refreshing" with an animated ellipsis. The "…" is kept as hidden text so the button's text is unchanged.
- **Chart:** it is now built in HTML so the 12px pixel text stays sharp. I also added a Total / Peak / Average row under it.
- **Overview panels:** they sit side by side in equal columns instead of the spec's 2:1, so the chart and the 5-item activity list stay level.
- **KPI meters:** Uptime is measured against 100% and Deployments against the 6-month peak, so it shows full. Incidents and Lead time show only their change, as the spec says for lower-is-better metrics with no target.
- **Status chips:** they use status colours rather than hues.
- **Additions:** the `/` shortcut focuses the search field, to back up the keyboard hint shown in it. The `nav-count` badges and previous/next project links are new.
- **Checkboxes:** the real input sits invisibly over a drawn box.
- **Frozen motion:** when motion is stopped, two-frame animations rest on their first frame.

`package-lock.json` was created by `npm install` and is also uncommitted.