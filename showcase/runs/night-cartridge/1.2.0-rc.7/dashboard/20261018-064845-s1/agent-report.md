I've applied Night Cartridge to every screen: Overview, Projects, Project detail, Team, Settings, Not found and the empty filter state. The build passes, all 9 smoke tests pass, and the final snapshot run shows no page scrolling sideways at 1440px or 390px. I compared every screenshot against the spec, mobile included.

**What changed**
- **Base:** the tokens are copied unchanged into `design-system/tokens.css`. The pixel fonts load from the links the spec gives. The old plain stylesheet is replaced by the spec's root rules (no rounded corners, no transitions, reduced-motion support), pixel type, the gold focus ring and the dithered rule under the header.
- **Signature pieces, all reusable** (`src/components/pixel.tsx`): the ▶ marker, pixel icons, block meters, callout, window frame, scene window (art on top, title below), vignette, ground strip and avatar. The two header switches, Animation and Pixel body, save their setting in the browser. All motion is stepped and stops under reduced motion or when Animation is off.
- **Scenes** (`src/pixel/`): one server-yard world, each scene with its own lead building:
  - Overview: a server hut with a roof dish.
  - Projects: a crane depot with a SHIP sign.
  - Team: a two-storey site office.
  - Settings: a workshop whose gear turns.
  - Project detail: one banner per project, eight in all (MOVE, BILL, SCAN, JOIN, KEEP, CART, VEND, HELP).
  - Empty filter: a small scene of an empty rack under one lit lamp.
  - Not found: a dark hut with a LOST sign and a red warning light.
  - Every screen: the grass ground strip at the bottom.
- **Screens:**
  - KPI tiles have a coloured top bar, 48px numbers and block meters.
  - Section headings sit on dithered rules, and the chart uses square bars and dotted gridlines.
  - Filters are chips with the marker, and the tables show the marker in the row gutter.
  - On mobile, tables keep only the pinned columns, and every "n of m" count has a meter.
  - Tabs join their panel, and checkboxes use a pixel check.
  - Not found has the screen's only gold button.
- **Docs:** `design-system/` (version, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.
- Every route, label, `data-testid` and accessibility attribute is kept.

**What I could not do**
- **Light theme:** the spec is dark only ("no light theme or theme switch"), so light and dark screenshots are identical.
- **Commits:** I made none. Git isn't among the commands I was allowed to run, so the changes are uncommitted.
- **Lab page file:** I added the temporary review route and removed it from the router, but `src/pages/LabPage.tsx` is still on disk. It's referenced nowhere, but I couldn't delete it with the allowed commands, so please delete it.
- **Chart panel:** it still ends with about 150px of empty space below the plot, more than the spec's 64px limit. The plot is already at the spec's 240px maximum, and the activity list beside it can't drop below 5 items because the tests count them.
- **Callout:** it's built but unused, because no screen has callout content without inventing new copy.
- **Fonts:** they load from the spec's `@latest` CDN links (the versions aren't pinned).
- **Report tables:** I didn't write out the full per-scene number tables from the spec's Verification section. I checked the figures in code instead: lead heights, gaps, light and detail counts.

**Decisions I made**
- **Sidebar:** I kept the app's sidebar. Under 1024px it becomes a grid menu at the top instead of a menu button, so nav items never hide.
- **Projects scene:** the Projects list gets a scene even though the spec gives data tables no art, because the spec also says every screen has one scene.
- **KPI meters:**
  - Uptime is measured against 100%.
  - Deployments are measured against the best month in the series, so that meter reads full.
  - Incidents and lead time get no meter, since lower is better and there's no target; they show only the change.
- **Colours:** each project takes a colour by its position in the list, and avatar colours come from the person's name.
- **Dates:** dates now read `2026.12.15`, as the spec requires.
- **New text:** the project's client appears above the title on the detail banner (and again in the existing meta line). The activity panel gains a "Latest updates" caption.
- **Header avatar:** 28px with 12px initials, so it fits inside a 40px button.