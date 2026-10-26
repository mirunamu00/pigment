Morning Shapes 0.1.0-rc.4 is applied to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark. I looked at every screenshot. Measured values match the spec: the pill is 48px tall and fully rounded, the stat tiles have 8px corners, and the phone top bar is 64px.

I haven't committed anything. The spec asks for one commit per screen, but you didn't ask me to commit, so all the changes are in the working tree.

## What changed
- **Tokens:** `tokens.css` is copied unchanged into `src/styles/` and `design-system/`. The old variable names in `base.css` still work and now point at the new tokens. Dark mode follows the system setting, and `data-theme` on the root forces either mode.
- **Fonts:** Figtree and DM Mono are bundled with the app through the `@fontsource` packages (font files only), so nothing loads from the network at runtime.
- **Reusable pieces** (`src/components/ms/`, `src/styles/morning-shapes.css`):
  - colour bands with arcs that sag, rise, or wave on night bands, plus contained panels;
  - flat shapes with one darker crescent, sparkles, clouds, small round "plates" holding a picture, and larger compositions;
  - a breathing glyph that pauses off-screen, plus a three-dot loader;
  - every pill, tab and circle button variant, and a fade-in on first view.
  
  All motion stops under reduced motion.
- **Overview (dashboard):** a white header with a greeting and one breathing zigzag. The four KPI tiles are yellow, blue, green and orange, each with its own small picture (rocket, heart, bell, clock). The chart has rounded bars and a dot legend; the other panels are cream. Loading shows a "Loading metrics" note, pulsing placeholder tiles and the dot loader inside the Refresh button.
- **Projects, project detail, team:** each opens with a coloured header band (blue, blue, green) and its own artwork: a folder, a clipboard and two people. Tables have a frame, filter pills that show a dot when selected, status badges with dots, round "open" buttons on each row, and a first column that stays put while the table scrolls sideways on phones. The empty search result shows a folder-and-magnifier picture with an ink "Clear filters" pill. Tabs are pills, and tasks are bordered rows with styled checkboxes.
- **Settings:** a cream band with a gear-and-switch picture and a cream group panel.
- **Error pages:** "Page not found" and "Project not found" share a cream band with the stone disc and rain cloud from the spec.
- **App shell:** a white top bar that gets a shadow once you scroll, a search pill, and a cream sidebar with a coloured dot per area. Every page ends with a cream footer band.
- Added `design-system/` (VERSION, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and ARIA attributes are preserved.

## Not applied
- **Product vignettes and confetti:** the spec reserves these for front pages, marketing sections and onboarding, and this app has none.
- **Footer signup field:** an internal ops tool has nothing to sign up for.
- **Filter pills on the Team table:** the table never had filtering, so I didn't add new behaviour. Its colour comes from the avatars instead.
- **Choice tiles, switch, select and dialog:** no screen in the app uses these components, so they weren't built.

## Decisions I made
- **Area colours:** Overview is yellow, Projects blue, Team green, Settings cream. The Settings nav dot uses the stone colour, because a cream dot would be invisible on the cream sidebar.
- **Avatar colours:** avatars use only orange, pink and yellow, which keeps each screen at four colours or fewer.
- **Phones and tablets:** below 1024px the sidebar becomes a full-screen menu behind a round menu button. While it's open, Escape closes it and the page behind can't be focused. Below 768px the top bar is one 64px row and the search moves into the menu. I couldn't screenshot the open menu, because the snapshot tool only captures pages, not clicks.
- **Header band height:** the spec's formula sizes the artwork from the viewport width. Because of the sidebar, I sized it from the band's own width instead.
- **Top-bar search height:** it's 48px instead of the 56px the spec sets for inputs, so it lines up with the Search pill.
- **Status dots:** Active is blue, Paused yellow, Done green.
- **Chart width:** the chart's drawing area follows its real width, so labels stay 14px on phones rather than shrinking.
- **Empty state colour:** an empty state inside a cream panel is white, so it doesn't vanish into the panel.