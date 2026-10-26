Morning Shapes is applied to every screen: Overview, Projects, Project detail, Team, Settings and the 404 page. The build and typecheck pass and all 10 smoke tests pass. After my last fix, `pigment-snap` reports no page scrolling sideways at 1440px or 390px. I opened the PNGs for every captured route plus `/settings`, the 404 page and the no-results state, and they match the spec in light and dark. Every route, label, form field, `data-testid` and ARIA attribute is unchanged.

**What I changed**
- **Tokens and fonts:** the tokens come straight from the package's `tokens.css`, not retyped. The app's old CSS variables still work as aliases. Figtree and DM Mono are served from the app itself through the `@fontsource` packages (added to `package.json`), so pages make no network calls for fonts. Dark mode follows the system setting.
- **Reusable pieces:**
  - **Color bands** in `src/styles/morning-shapes.css`, with arched edges that sag or rise.
  - **Pills** in all variants, including tab and filter pills with the white selected dot, and round circle buttons.
  - **Shape kit:** shading helper, sparkle, cloud, plates, and avatars made of initials on a shaded disc.
  - **Breathing glyph and pop-dots loader:** they pause when off-screen and stop under reduced motion.
  - **Icons:** solid ones, replacing the ▲▼ text arrows.
- **Area colors:** Overview yellow, Projects blue, Team green, Settings cream.
- **Screens:**
  - **App shell:** cream sidebar with colored dots per area, and a white top bar that gets a shadow when scrolled. On phones there is a single 64px bar with a menu button; the menu traps focus and closes on Escape.
  - **Overview:** a greeting with one breathing glyph, and four colored stat tiles each with a small illustration plate. The chart uses yellow bars, and the cream panels have no borders. The loading state shows pop dots in the button, pulsing placeholders and "Loading metrics" text.
  - **Project screens and Team:** each opens with a colored header band and its own illustration (folder, flag on a hill, two people, bell). Each table has a white frame, a cream header row and status badges with dots, plus a sticky first column on phones. The Projects table also gets round "open" buttons on each row.
  - **Empty and error states:** the no-results state shows a magnifying glass, Settings "coming soon" shows a padlock, and the 404 page has a cream rising band with the spec's error illustration.
- **Docs:** `design-system/` (`VERSION`, `tokens.css`, `components.md` with the color map and illustration subjects), plus `AGENTS.md` and `CLAUDE.md` pointers.

**What I couldn't apply**
- **One commit per screen:** I made no commits, because you didn't ask for any. Everything is uncommitted in the working tree.
- **Mobile avatar:** the spec moves the avatar into the phone menu. I kept it in the top bar so the user menu still works on phones.
- **Category dots in table cells:** I didn't add these. The status badge dots fill that role, and the Overview already shows four colors.
- **Spec features with no matching screen:** there are no forms, dialogs, toasts, switches or onboarding in this app, so those parts weren't used.

**Decisions I made myself**
- **Settings dot:** it's cream with a darker rim, because a plain cream dot disappears on the cream sidebar.
- **Status colors:** active is blue, paused is yellow, done is green.
- **Greeting:** I added the eyebrow "Welcome back, Jordan" and a one-line description on Settings.
- **Chart sizing:** the chart now resizes to its container, so its labels stay at real 14px size on phones.
- **Phone stat tiles:** these use smaller padding and numbers so the 2×2 group fits in half a screen.
- **Desktop band illustrations:** these fill about a quarter to a third of the band width, which is near the spec's lower limit.