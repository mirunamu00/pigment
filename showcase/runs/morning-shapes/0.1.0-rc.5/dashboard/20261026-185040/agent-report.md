I've applied Morning Shapes 0.1.0-rc.5 to every screen. The build passes, all 10 smoke tests pass, and the last screenshot run at 1440px and 390px, light and dark, found no page that scrolls sideways. I looked at every screenshot. The settings page, the 404 page and a temporary page showing each shape enlarged were also checked.

**What changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of the package file; I checked that the line and declaration counts match. The old variable names in `base.css` now point at the tokens, so nothing that used them breaks. Dark mode follows the system setting, or can be forced with `data-theme`.
- **Fonts:** Figtree (400/500/700) and DM Mono (400) are served from the app's own files via `@fontsource`, with the spec's fallbacks.
- **Reusable pieces (`src/components/ms/`, `src/styles/morning-shapes.css`):**
  - colour bands with curved edges: a header band that sags, a closing band that rises, and contained panels
  - the shape kit with crescent shading; each header band and empty state gets its own original drawing
  - four small pictogram plates on the dashboard tiles
  - the breathing crescent glyph, the three-dot loader, and a fade-in helper
  - every pill variant, tab pill and circle button, and avatars with a crescent
  - All motion stops under reduced-motion, and the glyph pauses when off-screen.
- **Colour per area:** Overview is yellow, Projects blue, Team green, Settings cream.
- **Screens:**
  - **Overview:** white header with a greeting and one breathing glyph, four stat tiles in category colours (the one saturated block), a yellow chart, cream panels and a styled table.
  - **Projects, project detail, Team:** a header band in the area colour with its own drawing; filter pills with the selected dot; status badges; a framed table.
  - **Settings:** cream header band and an empty-state panel with art.
  - **404 and unknown project:** cream band rising from the bottom, the error drawing, and a dark pill back.
  - **Phones:** a 64px top row with a menu button. The menu holds the navigation, with search and the user menu at the bottom; it traps focus and closes on Escape.
- `design-system/VERSION` and `components.md` record the colour map and where each piece is used. `AGENTS.md` and `CLAUDE.md` contain the one-line pointer.

All routes, labels, form fields, `data-testid`s and accessibility attributes are preserved.

**What I could not apply**
- **No commits:** git wasn't among the commands I was allowed to run, so the "one commit per screen" step wasn't done and everything is uncommitted.
- **Leftover file:** I couldn't delete files either, so `src/pages/KitPage.tsx` is an empty placeholder from the temporary review page. Its route is removed; please delete the file.
- **No real settings controls:** the settings page is a placeholder, so the spec's switches and grouped panels have nothing to apply to.
- **Missing features not added:** I didn't add the blue "conversion" pill (no action is a conversion), toasts, dialogs, or the round row-action buttons in tables, because the app has none of these.

**Decisions I made**
- **Fonts:** I self-hosted them rather than loading Google Fonts, so a missing network can't cause console errors in the smoke test.
- **Settings menu dot:** it uses the stone colour, because a cream dot is invisible on the cream sidebar.
- **Status badges:** green for active, yellow for paused, blue for done.
- **Status badge on a coloured band:** I used white with dark text. The spec's "raised surface" colour turns indigo in dark mode and the dark text would disappear.
- **Phone tables:** they scroll sideways with the first column fixed, rather than becoming stacked label–value rows. The spec allows both.
- **Phone side margins:** 24px for the page body, to line up with the header band's own spec, instead of the 16px the general layout section gives.
- **Chart:** the single series uses yellow (category 1, as the spec orders). It's low-contrast on cream in light mode, but each bar has its value printed on it.
- **Copy I added:** "Hello, Jordan", a one-line lead on the Settings band ("How Northwind Ops works for your workspace."), and a visible "Loading metrics" note while refreshing.