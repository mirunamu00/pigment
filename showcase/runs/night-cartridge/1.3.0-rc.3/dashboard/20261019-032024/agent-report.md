I've applied night-cartridge@1.3.0-rc.3 to every screen. The build passes and all 10 smoke tests pass. The final screenshots at 1440px and 390px show no page scrolling sideways. I didn't commit anything; the spec suggests one commit per screen, but you didn't ask for commits.

**Light and dark:** the spec only defines a dark look and says there should be no light theme or theme switch. So the app is dark in both appearances, and the "light" screenshots match the dark ones.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package tokens; the old variables, rounded corners, soft shadows and transitions are gone. The four font stylesheets are linked in `index.html` exactly as the spec gives them.
- **Reusable pieces** (`src/components/pixel.tsx`):
  - the ▶ marker
  - the scene window with its title block underneath
  - the grass strip along the bottom of every screen
  - the small framed scenes for empty and error states
  - the dotted rules, colour bullets and block meters
  - the callout box
  - colour-coded initials avatars, pixel icons and a product mark
  - the Animation and Pixel body switches in the header, which are remembered between visits
- **Pixel scenes:** the app's world is a rail freight depot at night, written up in `design-system/components.md`. Each kind of screen has its own main building and layout:
  - Overview: dispatch office with a clock
  - Projects: freight shed with a loading dock
  - Project detail: signal box with a "YARD" sign, shared by every project
  - Team: crew bunkhouse
  - Settings: engine shed with a gear sign

  Stars twinkle, lights blink, a cloud drifts, chimney smoke alternates between two frames, and a bird or shooting star passes now and then. All of it stops under reduced motion or when Animation is switched off.
- **Screens:**
  - The header has a dotted rule underneath and the sidebar menu marks the current page with a blinking ▶.
  - The metric tiles have colour bars. Service uptime gets a block meter because it has a real maximum (100%).
  - The chart was redrawn as flat square bars on dotted gridlines.
  - Status filters became toggle chips, and the tables follow the spec. On phones they show only the name and status columns.
  - Tabs carry the marker. Task checkboxes are pixel-style, and task progress is a block meter.
  - The not-found screens have a buffer-stop scene and a gold button.
  - Dates now read YYYY.MM.DD.
- Every route, label, form field, `data-testid` and accessibility attribute is unchanged. I also added `design-system/` (`VERSION`, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md` pointing to it.

## What I couldn't apply
- **Leftover file:** `src/pages/ArtReview.tsx` was my temporary review page. Its route is removed and the file is now an empty stub, because deleting files wasn't among the commands I was allowed to run. Please delete it.
- **No gold button on most screens:** the spec allows gold only for a page's main commit action, and Overview, Projects, Team and Detail have none, so only the not-found screens use gold.
- **Danger zone and settings menu:** the Settings page is still a placeholder, so there's no danger zone and no settings-specific menu. The main sidebar serves as its marker menu.
- **Search in the header** stays a real input plus a Search button rather than the spec's search button, because the tests use both fields.
- **Scene measurements:** I checked the scenes at 2× and in place, and the main numbers come from the code (strip buildings are 23–24 units tall; the signal box is 56 units = 112px). I didn't fill in the spec's full per-scene report tables, so some recipe counts (gaps, details per prop, how much of each scene is one flat colour) are close but unverified.
- **No full-width header image:** none was needed, since there's no landing page.
- I ran no automated accessibility (axe) check.

## Decisions I made
- The existing sidebar stays as the main menu. The header holds the brand, the search form, the two switches and the user menu.
- The grass strip sits flush under the layout, with bottom padding on the content, so the sidebar runs all the way down to it.
- Under 600px the search form moves to a second header row, and the switch labels become icons that screen readers still announce.
- The chart panel gets a small totals row (six-month total, monthly average, busiest month) so it matches the height of the activity panel beside it.
- The uptime meter uses 12 blocks so they fit the tile at the spec's block size.