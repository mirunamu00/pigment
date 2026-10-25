Felt-tip Market is now applied to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked screenshots of Overview, Projects, project detail, Team, Settings, the 404 page, "project not found" and a fully finished project, in light and dark. I didn't screenshot four states: the loading tiles, the empty filter result, the open user menu and hover. Their behaviour is covered by the tests but I haven't looked at them.

**What changed**
- **Tokens:** `tokens.css` is copied unchanged into `design-system/tokens.css` and imported first. The project's old variable names now point at the new tokens. Space Grotesk and JetBrains Mono load from Google Fonts. Light and dark follow the system setting.
- **Reusable pieces** (`src/components/ft/` and `src/styles/felt-tip.css`):
  - Buttons that lift on hover and slam flat when pressed.
  - The plate stack.
  - Pills.
  - Ink-framed boxes and ruled lists.
  - Dashed empty boxes and menus.
  - The price flag.
  - The coloured header band and the error band.
  - The black footer.
  - The sticker builder plus 7 original stickers (parcel, clipboard, mug, folder, gear, cone, map).
  - The "done" word badge and the rocking loading glyph.

  All motion stops under reduced motion.
- **Screens:**
  - Each area got its band colour in nav order: Overview lemon, Projects periwinkle, Team teal, Settings marigold.
  - Overview, Projects and Team have a sticker in their header band; Settings has a plain band.
  - Overview tiles use the large numbers with a dot legend. The chart is grey bars with one pink trend line.
  - Tables have an ink frame and a paper header row, with a pink flag on budgets (and on Team's project counts).
  - Empty states are dashed boxes with a sticker. While refreshing, the tiles become dashed "Loading" boxes.
  - The 404 and "project not found" pages are full-height bands with two stickers and a plate-stack button.
  - The Settings empty state also uses the plate stack.
  - A black footer now appears on every page.

  All routes, labels, `data-testid`s and ARIA attributes are kept. I only added a scrollable region label on the table containers and `aria-busy` on the Refresh button.
- **Docs:** I added `design-system/VERSION`, a `components.md` covering where each piece is used, and one-line pointers in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **One commit per screen:** git wasn't among the commands I was allowed to run, so everything is uncommitted on `main`.
- **Hero, hero action row and scroll drift:** this dashboard has no front page. The drift styling is in the kit but nothing uses it.
- **Whole-screen loading sticker:** no screen loads all at once. Only the rocking glyph in the Refresh button is used.
- **A flag on the dashboard's headline money figure:** none of the four KPIs is money, so the flag is on table budgets instead.
- **Pink limit on Overview:** the footer's pink arrow is required on every page. That means Overview shows pink in three roles at rest (flag, chart line, footer button) and a fourth (the focus halo) when you focus a field.

**Decisions I made**
- I kept the existing sidebar. Below 1024px it becomes a scrolling row of pills rather than a menu that opens a full-screen panel.
- The footer's input searches projects, the same as the top search.
- The chart's pink line follows the same deployment numbers as the bars, labelled "Trend".
- Status dots: active is periwinkle, paused is marigold, done is teal.
- A project shows the "done" word badge in its header band once every task is checked.
- The 404 page uses periwinkle, as it isn't one of the four areas.
- On phones, the line under the page title drops to body size so the header sticker covers the title block.
- On phones, the three-column files table becomes label–value rows.
- The 404 band on phones has a large empty gap above the stickers. I left it because the spec asks for a full-height band.