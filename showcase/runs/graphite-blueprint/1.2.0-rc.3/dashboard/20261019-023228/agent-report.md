Graphite Blueprint 1.2.0-rc.3 is now applied to every screen. The build and typecheck pass, all 10 smoke tests pass, and nothing scrolls sideways on any page at 1440px or 390px, light or dark. I opened every screenshot, fixed what was wrong, and snapped again.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` unchanged, so there is no retyped copy. Light is the default and dark follows the device; there is no theme switch because the app had none. Inter and Geist Mono are self-hosted from two npm font packages I added to `package.json`. Old CSS variable names still work and point at the new tokens.
- **Signature pieces:** each recipe is a reusable module in `src/design/` (stage, dot glyph and dot meter, blueprint, spec plate, screen head and opener, icons). The recipe CSS is copied as given into `src/styles/signature.css`, along with the reduced-motion block. I looked at each piece on its own in both themes using a temporary route, which I have since removed.
- **Shell:** a 240px sidebar with mono group label, icons and the current page highlighted. Below 1024px it turns into text-only nav pills that wrap. The top bar is sticky and blurred, with a pill search field and a ghost user-menu button whose menu fades in.
- **Overview:** screen head, then metric cards. The deployment chart now sits on a quiet stage and is drawn as dot columns with the latest month highlighted. The chart and activity panels end level. While Refresh runs, the button shows a scan glyph, keeps its width and sets `aria-busy`.
- **Projects and Team tables:** hairline rows, mono column heads and dates, numbers right-aligned, a status icon plus word, and a sort chevron only on the sorted column. On a phone only the first column and the pinned column show.
- **Project detail:** mono ID above the name, a status badge, text tabs with a sliding underline, a styled checkbox and progress bar, and the project's spec plate on a quiet stage (caption `FIG 01 · 4 PEOPLE`).
- **Settings and 404s:** Settings shows a blueprint stack in an empty state. The 404 page and "project not found" show a broken-connector blueprint on a quiet stage.
- **Docs:** `design-system/` now has `VERSION` and `components.md`, and I added `AGENTS.md` and `CLAUDE.md` with the pointer line.
- **Measured:** on Team, the "Active projects" head and its cells both end at x = 1408. On Settings at 390px, the blueprint drawing is 145px wide inside a 160px svg (91%, above the 85% minimum).

**What I could not apply**
- **Shimmer, live edge and pulse:** they are built and work, but nothing in the app is a running job or live feed, so no screen uses them.
- **One commit per screen:** not done. Git isn't one of the commands you allowed, so all changes are uncommitted.
- **Fake refresh delay:** the spec bans artificial delays that only exist to show a working state. The 1.5s refresh is exactly that, but your tests depend on it, so I kept it.
- **Spec release date:** the package doesn't state one, so `VERSION` records the date it was applied.

**Decisions I made myself**
- **Column order:** the pinned column has to be last, so Status is now the last column in the projects table and Size the last in the files table.
- **"Active projects" on a phone:** the head was too wide, so below 640px it is visually hidden and each cell reads "2 projects".
- **Hidden user name:** below 640px the user's name in the header button is visually hidden but still read by screen readers.
- **Metric dot colour:** it is green when the change is an improvement. Open incidents and lead time count a drop as good.
- **Mapping project statuses to icons:** active → in-progress (yellow), paused → ring with bars (grey), done → green check.
- **Small additions:**
  - Mono labels "Dashboard", "Portfolio", "Directory", "Workspace" and the sidebar's "Workspace" group label.
  - "Not configured" and "No results" captions on the empty states.
  - A second pill on the 404 pages ("View projects" / "Go to overview"), because the error state calls for two.
- **Metric cards:** they are separate bordered cards rather than a hairline grid, because a grid's top line would sit directly under the screen head's line with nothing between.
- **Header avatar:** 20px; the spec only defines 16px and 32px.
- **Grey sub-text:** the client and email lines in tables use secondary grey.