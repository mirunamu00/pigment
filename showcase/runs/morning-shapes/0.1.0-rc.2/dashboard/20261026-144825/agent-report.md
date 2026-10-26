I've applied Morning Shapes to every screen. The build passes, all 10 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scrolling. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

## What changed
- **Tokens:** `design-system/tokens.css` is a verbatim copy of the package file. The old variable names in `src/styles/base.css` still work as aliases. Dark mode follows the system setting.
- **Fonts:** Figtree (400/500/700) and DM Mono (400) load from Google Fonts in `index.html`, with the spec's fallbacks.
- **Reusable signature pieces** (`src/components/ms/`, styled in `src/styles/morning.css`):
  - color fields: header band (sag arc), rise band, night wave, panels and hue classes;
  - the shape kit: crescent-shaded shapes, sparkles, clouds, spot plates, covers, compositions, the error composition, three header-band clusters (one per area) and initial avatars;
  - 13 pictograms, each of a subject from this product;
  - breathing glyphs and the pop-dots loader;
  - every pill variant, tab pill and circle;
  - the vignette, and a motion helper that pauses glyphs off-screen and fades decoration in once.

  All motion stops under reduced motion.
- **Area colors:** Overview yellow, Projects blue, Team green, Settings cream.
- **Screens:**
  - **Shell:** cream sidebar with a colored dot per area and an ink pill for the current page; white top bar with a search pill, and a shadow once you scroll.
  - **Overview** (dashboard): white greeting header with one breathing glyph, and four stat tiles in the area colors (the screen's one saturated field). The chart uses the Overview yellow. Refresh shows pop-dots and pulsing placeholders.
  - **Projects and project detail:** blue header band, filter pills, a framed table, and a cover showing each project's picture.
  - **Team:** green header band and initial avatars.
  - **Settings:** cream header band and a "coming soon" panel with an illustration.
  - **404 and unknown project:** cream band with the error illustration and an ink pill home.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.

## What I couldn't apply
- **No per-screen commits.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so nothing is committed.
- **A leftover stub file.** For the same reason I couldn't delete the temporary review page. Its route is removed, and `src/pages/KitPage.tsx` is now an empty module you can delete.
- **Not used because nothing calls for them:** the vignette, switches, dialogs, toasts and the footer band. This app has no front page, onboarding, dialogs or settings controls; the vignette is built but not placed.
- **No mobile menu button.** On phones the sidebar becomes a scrolling row of nav pills rather than the spec's menu button and full-screen menu, so the nav behaves the same as before.

## Decisions I made
- **Stat tiles stay two per row on phones** instead of one column. One full-width tile per row would put several large fields on screen at once.
- **Pictograms on the blue cover avoid blue**, so the rocket, padlock and payment card are pink, yellow and orange.
- **The Settings nav dot is stone grey**, because a cream dot disappears on the cream sidebar. In dark mode the cream Settings band is the same indigo as the sidebar, so the two run together.
- **Avatars and role dots are colored by discipline:** green for engineering, orange for design.
- **Status badges** use green for Active, yellow for Paused and blue for Done.
- **Tables:** project names in table cells are bold primary text rather than blue links. On phones tables are at least 640px wide and scroll inside their frame.
- **Chart labels** are slightly larger than the spec's label size so they stay readable when the chart scales down.
- **Header-band text lines up with the page margins**, so on phones it uses 16px side padding instead of the recipe's 24px.
- **Wording:** I added a "Welcome back, Jordan" greeting line to Overview.