I've restyled the whole app to Night Cartridge 1.2.0-rc.9. Build and typecheck pass, all 10 smoke tests pass, and the final screenshot run shows no page that scrolls sideways at 1440px or 390px. I looked at every screen in the screenshots, desktop and mobile, and they match the spec.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a verbatim copy of the package tokens, and the old variables are gone. The four font links come straight from the spec and load correctly.
- **Shell:** a sticky 64px header with the dithered rule under it, a pixel logo mark, search (input and button both 40px), the Animation and Pixel body switches (both saved between visits) and the user menu. The sidebar uses the ▶ marker on the current page, and the Overview marker blinks. The grass ground strip runs along the bottom of every screen.
- **Scenes:** the depot world is drawn in `src/art/`, and the scene recipe is ported in `src/art/engine.ts` and `stage.ts`. Overview, Projects, Team and Settings each get a strip at the top. Every project page gets its own banner with a different lead building and a sign word nobody else uses (MOVE, BILL, SCAN, GATE, DATA, SHOP, VEND, HELP). The empty table state and the not-found page each get a small square scene; not-found has a single red warning light and everything else dark.
- **Motion:** stars twinkle, lights blink, clouds drift, one sprite per scene bobs, and a bird or shooting light passes now and then. All of it stops under reduced motion or when the Animation switch is off.
- **Components:**
  - KPI tiles have a hue bar, 48px numbers, a coloured up/down marker and a block meter for uptime.
  - The chart uses flat bars and a dotted grid.
  - Status filters became chips that show the marker when selected.
  - "Showing n of m" and task progress are block meters.
  - Tables show the marker on hover, ▲/▼ on the sorted column, and only the pinned columns on phones.
  - Tabs, pixel checkboxes, square colour-coded avatars, a Settings panel with an info note, and a gold "Go to overview" button on the not-found page.

**What I couldn't apply**
- **Light theme:** the spec says it is dark only, so the light and dark screenshots look the same.
- **Commits:** the spec asks for one commit per screen, but git wasn't in my allowed commands, so everything is uncommitted on `main`.
- **Leftover file:** `src/pages/ArtReview.tsx` held the temporary review route. I removed the route, but I couldn't delete the file, so it's now an empty stub you can remove.
- **Refresh delay:** the 1.5s Refresh delay breaks the spec's "no artificial delays" rule. The tests depend on it, so I kept it.
- **Chart height:** the chart's plot grows past the spec's 240px cap so the chart and Recent activity panels stay level. The tests fix the activity list at 5 items, so it can't be trimmed instead.

**Decisions I made myself**
- Dates now read `2026.12.15`, per the spec's date format. KPI labels and the title block's status line moved to new spots; no tested label text changed.
- There's no gold button on the main screens, because none has a real "commit" action. Refresh and Clear filters use the plain framed button.
- The project page's title block uses the status badge as its category line, which avoids repeating the client name.
- KPI tiles sit 4 across only from 1440px wide (2 below that, 1 on phones), because "2.4 days" at 48px needs about 224px.
- On phones the sidebar becomes a two-by-two menu and the search box stays visible on its own row.
- Settings is still a placeholder, so it got no sidebar menu or danger zone.
- Tall poles and trees can shift up to 8 units from where I placed them so they always rise clear of the hills behind.

**Scene numbers**
- Banner leads are 49–57 units tall (98–114px), 70–90 units off centre.
- Each scene has 4–9 lights and about 60 hand-placed dots on banners.
- No item sprites are used, so there is no sprite size table.

The full per-scene figures, the world description and the colour assignments are in `design-system/components.md`. `AGENTS.md` and `CLAUDE.md` now point to that folder.