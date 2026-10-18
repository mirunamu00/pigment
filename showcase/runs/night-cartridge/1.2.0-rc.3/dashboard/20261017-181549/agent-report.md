The restyle is applied to every screen. The build passes, all 9 smoke tests pass (including "no console errors" with the web fonts loading), and `pigment-snap` reports no sideways scroll at 1440px or 390px. I compared all the screenshots, mobile and dark included, against the spec, plus Settings and the 404 page.

**What changed**
- **Tokens and root:** `src/styles/tokens.css` is a verbatim copy of the package's token file. `base.css` was rewritten to use only tokens: the motion and shape rules, pixel type, the 4px gold focus ring, and no radius, soft shadows or transitions. The fonts load from the links the spec gives.
- **Dark only:** the spec says "no light theme or theme switch", so the light screenshots are dark too, on purpose.
- **Pixel scenes:** all art is built from the spec's own recipe code, with one world for the whole app: a server yard.
  - Each screen has its own scene with a different main building: Overview, Projects and Team each get a strip, Settings gets a workshop strip, and every project page gets its own banner.
  - Empty and error states get small scenes. The error ones have their lights off and one red beacon.
  - Every screen has the grass ground strip at the bottom.
  - The art animates in whole-pixel steps (twinkling stars, out-of-sync lights, drifting cloud, spinning fan, a bird, a rare shooting star). It stops under `prefers-reduced-motion` or the Animation switch.
- **Header:** sticky, with the dithered rule below, a pixel logo, the search, the Animation and Pixel body switches (both saved between visits), and the user menu as a window of marker items.
- **The ▶ marker** shows the current item in the sidebar, chips, tabs, sort headers and hovered table rows.
- **Other pieces:**
  - KPI tiles with coloured top bars, and the uptime tile has a block meter.
  - Section headings sit on dithered rules.
  - The chart is now HTML, so its 12px labels stay crisp.
  - Tables show only the pinned columns on phones.
  - Checkboxes use a pixel check mark.
  - The task progress bar is now a block meter.
  - Avatars are small pixel sprites generated from each name.
  - The only gold button is the one on the 404 pages.
- **Review fixes:** I reviewed every scene twice at 6–16× zoom. That caught:
  - stray black pixels from a colour bug, now fixed;
  - a tool board whose hammer and wrench read as the letters T and Y, now a gear;
  - a tank and crates whose highlights looked like faces;
  - a mast and a tree that didn't rise far enough above the hills (they now clear by 12 and 4 units).
- Added `design-system/` (VERSION and components.md), plus `AGENTS.md` and `CLAUDE.md` with the pointer line the spec asks for.

**What I couldn't apply**
- **No commits:** the spec wants one commit per screen, but `git` isn't among the commands I was allowed to run. Everything is uncommitted.
- **Leftover file:** `src/pages/SceneReview.tsx` was the temporary scene-review page. Its route is gone and the file is emptied to `export {}`, but I couldn't delete it with the allowed commands. Please delete it.
- **Missing token:** the gold button recipe uses `--color-action-primary-edge`, which isn't in the token files. It falls back to the normal gold.
- **Not built:** I skipped the sidebar counts and the search shortcut hint (they would add text or shortcuts the app doesn't have), and the callout component, since no screen needs one.
- **Not done from the Verification checklist:** the full per-scene measurement tables and an accessibility (axe) audit. The key placement numbers are in `design-system/components.md`.

**Decisions I made**
- **Wording changes:**
  - Dates now read `2026.12.15`, as the spec requires.
  - The header search placeholder is now just "Search".
  - The Settings placeholder heading is the title of its window, so it is 16px rather than 32px.
- **Layout:**
  - On phones, the header search drops to a second header row so the input stays usable.
  - Below 1024px the sidebar becomes a single-row top menu.
  - Team rows are taller to fit the 40px avatars.
- **KPI tiles:**
  - Only uptime gets a meter, because it's the only figure with a real maximum (100%).
  - The deltas for incidents and lead time are green when they fall, since lower is better there.
- **Banner and screenshots:**
  - Every project banner shares one far-hill skyline, so the tall mast and tree reliably rise above it. Each project still gets its own colour, lit windows and near skyline.
  - The sidebar marker blinks as the spec allows. In the screenshots it was captured in its off phase.