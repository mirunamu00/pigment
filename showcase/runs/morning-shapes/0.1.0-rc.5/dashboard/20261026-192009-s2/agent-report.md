Morning Shapes is now applied to every screen: Overview, Projects, Project detail, Team, Settings and both not-found pages. The build passes and all 10 smoke tests pass. I checked screenshots at 1440px and 390px, light and dark, and nothing scrolls sideways.

**What changed**
- **Tokens:** `tokens.css` is copied unchanged into `design-system/tokens.css`. Dark mode follows the system setting. The old variable names in `src/styles/base.css` still work as aliases. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - Colour bands with curved edges: the header band at the top of each screen, the rising band used on error pages and the footer, and panels.
  - Every pill variant, plus tab pills that show a dot when selected.
  - The flat shape kit (crescent shading, sparkle, cloud, round plate) and original artwork for each area.
  - The breathing glyph, which pauses off-screen.
  - The three-dot loader and the fade-in helper.
  - All motion stops under reduced-motion settings.
- **Colour per area:** Overview yellow, Projects blue, Team green, Settings cream.
- **Shell:** cream sidebar with a colour dot per area (the current page is a dark pill), a white top bar with a search pill that gets a shadow once you scroll, and a cream footer with a dark bottom bar.
  - On phones it's a single 64px row: name, avatar and a menu button that opens a full-screen menu.
- **Overview (dashboard):** a greeting with one breathing sun glyph, and four coloured stat tiles, each with its own picture (rocket, clock, storm cloud, hourglass). The chart is rebuilt in HTML so its labels stay readable on phones; the cream panels sit beside it.
  - Refresh now shows the three-dot loader while loading, plus a visible "Loading metrics" note.
- **Projects table:** filter pills, a search pill, a framed table with the first column pinned when it scrolls sideways, status badges with a dot, chevron sort arrows and a round "open" button on each row.
  - When nothing matches, a cream panel shows a magnifying glass and a "Clear filters" pill.
- **Other screens:**
  - Projects, Project detail and Team each open with a header band in their colour, with its own picture (folder, clipboard, two people). Team avatars are initials on coloured discs.
  - Settings has a cream band with sliders and a bell empty state.
  - Both not-found pages use the error picture (stone moon with a cloud and rain) and a single pill back home.
- **Docs:** `design-system/` (VERSION, tokens, components.md), plus `AGENTS.md` and `CLAUDE.md`.

Every route, label, test id and accessibility attribute is kept. I only added things: a greeting line, a sentence under some page titles, the round "open" button on table rows, the mobile menu and the footer.

**Not applied**
- **One commit per screen:** you limited me to the npm and snap commands, so nothing is committed.
- **Spec items with nothing to attach to:** the product-scene illustrations and confetti are meant for a marketing front page, which this app doesn't have. The footer's sign-up field doesn't suit an internal tool, so I left it out.
- **Cream twice on Settings:** its colour is cream, so the header band and the empty-state panel are both cream. This brushes against the "two fields never share a colour" rule.

**Decisions I made**
- Search fields are 48px tall to line up with the pills next to them; the spec's text field is 56px.
- The Settings dot in the sidebar is grey-brown instead of cream, because a cream dot is invisible on the cream sidebar.
- The chart has a single data series, so its bars use the first category colour (yellow).
- On phones the avatar stays in the top row; the spec moves it into the menu. Menu links are pills rather than ruled rows.
- Stat-tile pictures don't fade in, because the spec says numbers must appear at once.
- On error pages the cream error band runs straight into the cream footer.
- Tables scroll sideways inside their frame instead of stacking into label–value rows on phones.

I didn't screenshot the open mobile menu or the Refresh loading state. Both are covered by code and the smoke tests, but not checked visually.