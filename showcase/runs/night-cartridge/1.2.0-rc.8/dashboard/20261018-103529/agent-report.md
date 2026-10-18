Night Cartridge is applied to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked the final screenshots of each screen against the spec, including mobile.

**What changed**
- **Foundation:** the tokens are copied verbatim into `design-system/` (`tokens.css` is imported by `src/main.tsx`). The four font links are in `index.html` exactly as the spec gives them, and the root setup is in `src/styles/base.css`. I rewrote `base.css` from scratch and removed the old light palette, radii and soft styling.
- **Dark only:** the spec defines no light theme ("Dark only: no light theme or theme switch"), so light and dark screenshots look the same.
- **Reusable pieces** (`src/components/pixel/`, `src/art/`):
  - `PixelScene`, `SceneWindow`, `Vignette`, `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, `PixelIcon`, `Avatar`, `Bullet`.
  - A scene engine ported from the spec's helpers (`engine.ts`), hand-drawn sprites, and one composed scene per screen (`scenes.ts`).
  - All the stepped animations. They stop under `prefers-reduced-motion` and when the header's Animation switch is off, leaving frame 1 showing.
- **Header:** pixel mark, search with a `/` shortcut, the Animation and Pixel body switches (both remembered), and the user menu as a window of marker items. Escape now also returns focus to the menu button.
- **Screens:**
  - **Overview:** a strip scene, KPI tiles with hue bars and up/down markers, the uptime meter, a chart rebuilt to spec, panels with dotted h2 rules and level bottoms, and the table with filter chips.
  - **Projects and Team:** strip scenes, plus avatars on Team.
  - **Project detail:** a banner scene, marker tabs, block meters in place of the old progress bar, and pixel checkboxes.
  - **Settings:** a strip scene and a titled window.
  - **Empty filter result, Not found, Project not found:** vignettes; the two not-found pages have lights off, one beacon, and a gold button.
  - **Every screen:** the ground strip at the bottom.
- **Docs:** `design-system/VERSION`, `components.md` (the app's world, scenes by screen, hue of each category), and `AGENTS.md`/`CLAUDE.md` with the pointer line.

**Decisions I made**
- **Navigation:** it stays in the full-height sidebar, which works as the marker menu, rather than moving into the header. Under 1024px it becomes a top menu grid. The header is sticky only from 1024px up.
- **The world:** "Northwind Harbour", a container port at night. Each scene has its own lead: dispatch house (Overview), transit shed (Projects), crew house (Team), lighthouse (Settings), gantry crane (Project detail).
- **Strips on table screens:** the spec's table context says "no art", but it also says every screen has one scene, so Projects and Team got strips.
- **No gold on most screens:** Refresh isn't a commit, so the only gold buttons are on the two not-found pages.
- **KPI meters:** only uptime has a real maximum, so it is the only one with a meter. To colour the deltas correctly I added `better` and `meter` fields to `src/data/metrics.ts`.
- **Dates and copy:** dates now read YYYY.MM.DD. A few texts changed slightly: "Refreshing…" became "Refreshing" plus the animated dots, and the detail meta line now reads "Owned by … · Due …".
- **Avatars:** the header avatar is 32px rather than the 40px list size.
- **Two layout fixes after review:** the 390px Team table was hiding the Active projects column, and the task checkbox mark was blocking the click (the one failing test).

**What I couldn't apply**
- **No commits:** I could only run the five commands you allowed, so there are no per-screen git commits (the spec's process asks for one per screen). For the same reason I couldn't delete the temporary review page: its route is removed, but `src/pages/ArtReviewPage.tsx` remains as an empty stub you can delete.
- **Not done:** an axe accessibility scan, and a hand count of the spec's per-scene lighting numbers beyond what my review page printed.
- **Fonts load from a CDN** using `@latest` URLs, as the spec gives them.

**Required report tables**
- **Sprite table:** no item sprites.
- **Variant table:** every prop appears once per scene, so there are no repeated variants.
- **Per-scene numbers** (computed by the code, not by eye):

| Scene | Lead | Lead height | Details | Lights | Gaps left to right |
|---|---|---|---|---|---|
| Overview strip | dispatch house | 24 units (48px) | 44 | 8 | 4, 106, 3, 8, 89, 4 |
| Projects strip | transit shed | 21 units (42px) | 37 | 6 | 6, 108, 4, 130, 3, 7 |
| Team strip | crew house | 23 units (46px) | 36 | 8 | 5, 93, 2, 8, 139, 4 |
| Settings strip | lighthouse | 25 units (50px) | 34 | 6 | 7, 135, 3, 141, 4 |
| Detail banner | gantry crane | 57 units (114px), top y 57 | 71 | 7 | 3, 8, 145, 4, 7, 71, 5 |

- In the banner, the two tall verticals clear the far ridge by 10 units (radio mast, x 209–215) and 8 units (flood mast, x 394–400).
- Fixes from the review round: the terminal tractor and pallet stack were raised to 20 units, and both bollards were redrawn because they read as the letter "I".