The Morning Shapes restyle is applied to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked the screenshots in light and dark, including Settings and the 404 pages, which aren't in the default capture list.

All routes, labels, form fields, `data-testid`s and accessibility attributes are preserved. Nothing under `design-packages/` or `tests/` was touched. I didn't make per-screen commits as the spec suggests, because you didn't ask for commits; everything is uncommitted in the working tree.

## What changed
- **Tokens:** `src/styles/tokens.css` is a verbatim copy of the spec's file. Light and dark follow the system setting, and `data-theme` can force either. The old variables in `base.css` are kept as aliases.
- **Fonts:** Figtree and DM Mono are added as `@fontsource` packages in `package.json`, so they're bundled with the app rather than loaded from a CDN.
- **Area colors:** Overview yellow, Projects blue, Team green, Settings cream.
- **Reusable pieces** (`src/components/ms/` and `src/styles/morning-shapes.css`):
  - Color bands with curved edges: header band, closing/footer band, panel.
  - The shape kit: discs, sparkles, clouds, three area clusters, small pictogram circles (rocket, sun, bell, clock), and magnifier, padlock and error illustrations.
  - Breathing glyphs and the three-dot loader; glyphs pause off-screen.
  - All the pill button styles, avatars, the fade-in reveal and the vignette.
  - All motion stops under reduced motion.
- **Screens:**
  - **Overview:** white header with a greeting and one breathing glyph; the stat tiles are the one strong color block; yellow chart with a legend; cream panels. While refreshing, the button shows the three-dot loader and the tiles show "Loading".
  - **Projects, project detail, Team, Settings:** each opens with a band in its area color and its own illustration. They use pill tabs and filters, framed tables with round row-action buttons, styled checkboxes and a progress bar.
  - **Empty search:** shows the magnifier illustration. The settings placeholder shows the padlock.
  - **404 and project-not-found:** the error illustration on a cream band.
- **Shell:** cream sidebar with a colored dot per area, a white top bar that gets its shadow after scrolling, and a cream footer with a dark bottom bar. On phones, the navigation moves into a menu button.
- **Docs:** `design-system/VERSION` and `components.md`, plus one-line `AGENTS.md` and `CLAUDE.md` pointers.

## What I couldn't apply
- **Confetti and vignette** are built and checked on a temporary page, which I've removed. No screen uses them, because the spec only places them on marketing, onboarding and feature-tour screens.
- **The phone top bar is two rows, not one.** The second row keeps the global search visible rather than hiding it in a menu.
- **The files table (three columns) stays a table** instead of the stacked rows the spec suggests for under four columns.
- **The footer has no signup field,** since this app has nothing to sign up for.

## Decisions I made myself
- **Chart color:** the bars are yellow, the first chart color in the spec. That's low contrast on cream, so every bar has its value printed above it. The chart is drawn at real pixel width so labels stay 14px on phones.
- **Empty search panel:** white inside the cream table panel, because the blue Projects band is often on screen at the same time.
- **Settings dot:** the cream area dot would vanish on the cream sidebar, so it uses the strong border grey.
- **Status badges:** green for Active, yellow for Paused, blue for Done.
- **Additions:** a "Welcome back, Jordan" greeting, an "Open project" round button on each table row, and filenames in DM Mono.
- **Mobile menu:** it closes on Escape or route change but doesn't trap focus, since it opens inline rather than as an overlay.