The Morning Shapes restyle is applied to every screen, in light and dark. The build passes, all 10 smoke tests pass, and the final screenshot run shows no page scrolling sideways at 1440px or 390px.

**What changed**
- **Tokens and fonts:** `src/styles/base.css` loads the package's `tokens.css` directly, so no values were retyped. The old variable names (`--color-bg`, `--radius`, …) still work as aliases. Dark mode follows the system setting, or `data-theme` on `<html>`. Figtree and DM Mono come from Google Fonts in `index.html`.
- **Area colours:** Overview is yellow, Projects blue, Team green, Settings cream.
- **Reusable pieces** in `src/components/ms/`, styled in `src/styles/morning-shapes.css`:
  - colour bands with curved edges, and a different shape cluster for each area
  - the flat shape kit with five pictograms: rocket, sunrise, storm cloud, stopwatch, padlock
  - the error-page artwork
  - breathing glyphs that pause off-screen, and the three-dot loader
  - the initials avatar and the pill buttons
  
  All motion stops under reduced motion.
- **Screens:**
  - **Overview (dashboard):** a greeting with one breathing glyph, four coloured KPI tiles with plates, a yellow chart and cream panels. Refresh now shows the dot loader.
  - **Projects list and detail:** a blue header band with filter pills and the table restyled. The detail page has pill tabs, custom checkboxes and a progress bar. The "no projects match" state has a glyph and a pill.
  - **Team:** a green header band and avatars in the table.
  - **Settings:** a cream header band and a cream panel with a padlock plate.
  - **Not found:** a cream band with the error artwork.
  - **Shell:** sidebar with area-coloured dots, a top bar that gets a shadow once you scroll, and a cream footer. Phones get a menu button with a full-screen menu.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

All routes, labels, form fields, `data-testid`s and accessibility attributes are kept.

**Things you need to do or know**
- **Delete `src/pages/KitPage.tsx`.** I made it as a temporary page to view the shapes on their own. The route is removed, but I couldn't delete the file because `rm` isn't among the commands I was allowed to run.
- **No commits.** The spec asks for one commit per screen, but git wasn't among the allowed commands, so everything is uncommitted.
- **The footer has no signup field or round icon buttons.** This product has nothing to sign up for.
- **Project clients have no category tags.** There are 8 clients, and the spec allows at most four colours per view.
- **On phones the top bar is two rows.** The wordmark and menu button are on the first, the search and avatar on the second, because I kept the global search visible instead of moving it into the menu.

**Decisions I made myself**
- The Settings dot uses the grey strong-border colour, because the spec's cream would be invisible on the cream sidebar.
- All avatars use the Team green.
- The 404 page hides the cream footer band so two cream bands don't stack.
- The chart labels are enlarged on phones so they stay readable.
- The search box in the top bar is 56px tall next to a 48px Search button.