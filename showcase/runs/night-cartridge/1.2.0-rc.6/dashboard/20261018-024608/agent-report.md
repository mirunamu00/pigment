I've applied Night Cartridge 1.2.0-rc.6 to every screen. The build passes, all 9 smoke tests pass, and the final snapshot run reported no sideways scrolling. I checked the screenshots at 1440px and 390px in light and dark mode; both modes look the same because the spec is dark only.

**What changed**
- **Tokens and base styles:** `src/styles/tokens.css` is a verbatim copy of the package file. `base.css` is rewritten on top of it with the spec's root setup: pixel type, the gold focus ring, no rounded corners or transitions, the reduced-motion freeze and the `data-motion` / `data-body` switches. The four font stylesheet links the spec lists are in `index.html`.
- **Pixel art engine (`src/art/`):** the spec's recipe helpers, a server-yard set of sprites, and a scene for every screen. Each scene has its own lead:
  - Overview: server hut (the emblem)
  - Projects: cooling plant
  - Team: control booth
  - Settings: workshop
  - Project detail: a banner, with a different lead for each of the 8 projects
  - Empty filter result: a vignette with one blinking light
  - Not-found pages: a vignette with the lights off and one red beacon
  - Every screen has the ground strip as its footer.

  Every scene's motion is stepped (twinkling stars, out-of-sync lights, a drifting cloud, one sprite swapping two frames, a rare shooting light) and freezes under reduced motion or the Animation switch.
- **Reusable pieces:** the marker, dithered rule, block meter, callout, scene window, ground strip, vignette, avatar, pixel icons, and the Animation and Pixel body switches. The switches are saved per browser.
- **Screens:**
  - Header has the dither rule under it. The sidebar is a menu with the ▶ marker, and the marker on the current item blinks.
  - KPI tiles have hue bars and up/down deltas.
  - The chart uses flat bars and dotted gridlines.
  - "Showing n of m" and the task counts now have block meters.
  - Status filters are chips; status badges use the status colours.
  - Tables follow the spec: marker gutter, sort markers, only pinned columns under 600px.
  - Project detail has its banner and spec-styled tabs, and pixel checkboxes.
  - Settings has a titled window; the not-found screens have a gold button.
- **Also added:** `design-system/` (version plus `components.md`), and `AGENTS.md` / `CLAUDE.md` with the pointer line.

All routes, test IDs, label text, form fields and accessibility attributes are kept. I didn't change anything under `design-packages/` or `tests/`.

**What I could not apply**
- **Light mode:** the spec defines dark only and forbids a light theme.
- **Commits:** the spec asks for one commit per screen, but I haven't committed anything since you didn't ask. All changes are uncommitted in the working tree.
- **Font links:** they use `@latest` CDN URLs exactly as the spec gives them. They loaded fine here, but they aren't pinned to a version.
- **Number checks:** I couldn't produce the spec's computed scene and sprite tables, because I'm limited to the five allowed commands and can't run a script. I checked sprite heights and positions on a temporary close-up page instead, which I've since removed.
- **Search shortcut hint:** I left it out, because the app has no keyboard shortcut to point to.

**Decisions I made myself**
- **Navigation:** it stays in the full-height sidebar rather than the header. Under 1024px it becomes a wrapping top menu, and under 600px the header stops being sticky.
- **KPI meters:** only uptime gets one (against 100%); the other KPIs have no real maximum, so they show only their change.
- **Delta colours:** green means good. Falling incidents and falling lead time therefore show green.
- **Dates:** they now display as `YYYY.MM.DD`, as the spec requires. Sorting is unaffected.
- **Chart height:** the plot grows with its panel so it lines up with Recent activity.
- **Project hues:** each project takes the hue for its position in the data.
- **New labels:** each scene window has a small category label above the title ("Dashboard", "Catalogue", "Directory", "Workshop", "Project"), and the sidebar has a "Workspace" heading.
- **Gold button:** it appears only on the not-found screens, since no other screen has a main action to commit.