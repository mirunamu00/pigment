I restyled every screen of Northwind Ops with Morning Shapes, in light and dark. The build passes, all 10 smoke tests pass, and no page scrolls sideways. I checked the final screenshots of every route at 1440px and 390px in both modes, plus `/settings`, a 404 page and the empty search result.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is a verbatim copy of the package's token file. The old variable names in `base.css` still work as aliases. Figtree and DM Mono are bundled through two `@fontsource` packages, added to `package.json` and installed with `npm install`, so the tests can't fail on a font download.
- **Area colours:** Overview is yellow, Projects blue, Team green, Settings cream. Each colour is used for that area's nav dot, header band and empty state.
- **Reusable pieces** in `src/components/ms/`:
  - header bands with their curved edges, and the cream error band;
  - the shape kit, a different shape cluster for each area, the empty-state and error pictures, and 12 small pictures (one per stat tile, one per client);
  - breathing glyphs that pause off-screen, the three-dot loader, and every pill, tab and circle button style.
  - All motion stops under reduced motion.
- **Shell:** cream sidebar with area dots, white top bar with a search pill that gets a shadow once you scroll, and a menu circle with a focus-trapped menu on phones.
- **Screens:**
  - **Overview:** a greeting with one breathing glyph; the four stat tiles are the screen's one coloured field; yellow chart bars; cream panels. Refresh shows the three-dot loader and visible "Loading metrics" text.
  - **Projects, project detail, Team:** a header band in the area colour; tables in a framed box with status badges, a round "open" button per row, and a pinned first column on phones.
  - **Project detail:** pill tabs and a small picture of the project's subject.
  - **Settings:** a cream band and a padlock empty state.
  - **404 and unknown project:** the error picture with an "ink" (dark) button home.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and the pointer line in `AGENTS.md` and `CLAUDE.md`.

All routes, labels, `data-testid`s and ARIA attributes are unchanged. I only added things: the greeting line, an "Open …" button per table row, labelled table scroll areas, and the mobile menu button.

**What I couldn't apply**
- **One commit per screen:** I had no permission to run git, so everything is uncommitted in the working tree.
- **Phone top bar:** the spec wants one 64px row. Mine is two rows: wordmark and menu button, then search and avatar. The search box and user menu have to stay in the top bar.
- **Fade-in of decorations:** it only plays when a picture first scrolls into view. Full-page screenshots can catch below-the-fold pictures before they appear.
- **Footer:** the app has no footer, so I didn't add the footer band.

**Decisions I made myself**
- The Settings nav dot uses the darker stone colour, because a cream dot is invisible on the cream sidebar.
- The top-bar search box is 48px tall instead of 56px, so it lines up with the Search button.
- Status dots: Active is blue, Paused yellow, Done green.
- Chart bars use the first category colour, yellow, as the spec orders. Each bar also shows its number, because yellow on cream is low contrast.
- The empty search result uses a blue panel on the Overview and a cream one on Projects, where the blue band is already in view.
- Avatars all use the Team green.
- The project detail picture keeps the blue header band, since the picture is smaller than a third of the page width.
- Small picture backgrounds turn white inside cream panels, so they don't disappear.