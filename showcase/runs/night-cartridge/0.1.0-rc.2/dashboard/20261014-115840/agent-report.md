I've applied Night Cartridge across every screen. The build passes, nothing scrolls sideways at 1440px or 390px in light or dark, and I checked the final screenshots against the spec. I couldn't run the Playwright smoke tests because that command isn't on the allowed list. Every `data-testid`, label, aria attribute, route and piece of behaviour the tests check is unchanged, but the tests themselves haven't been run.

**What changed**
- **Tokens and base styles:** `src/styles/tokens.css` is a copy of the spec's `tokens.css`. Light and dark follow the system setting. `src/styles/base.css` was rewritten with the spec's root setup: no rounded corners, no transitions, reduced motion and the Animation switch respected, 2px/4px borders, focus ring and hard shadow. It also sets up the pixel type, and the fonts load from the CDN links the spec gives in `index.html`.
- **Reusable signature pieces** in `src/components/pixel/`:
  - A scene builder for one world: a server yard at night, with 11 kinds of props.
  - The scene in three sizes: a 96px strip, a 256px banner, and a small framed scene for empty and error states.
  - The ground strip along the bottom of every screen.
  - The ▶ marker, plus fill-only pixel icons.
  - Pixel avatars generated from each name.
  - Block meters, a window frame, and the "Animation on/off" and "Pixel body on/off" header switches (both remembered between visits).
- **Moving parts:** lights blink out of sync, stars twinkle, a cloud drifts, the generator fan swaps between two frames, and a shooting light passes every 14 seconds. All movement is stepped and stops under reduced motion or when Animation is off.
- **Screens:**
  - **Every screen:** sidebar menu with the ▶ marker, header with search, the two switches, the user menu and a dithered rule, and the ground strip.
  - **Overview:** scene window, KPI tiles with colour bars, 48px numbers and meters, section titles on dotted rules, a flat bar chart, and the activity list with dotted separators.
  - **Projects table:** filter chips with status squares (the marker replaces the square on the selected chip), up/down markers on sorted columns, status shown as square + word, and a small scene in the empty state.
  - **Project detail:** banner, framed tabs with the marker, a block meter for task progress, and pixel checkboxes that are still the real inputs.
  - **Team:** strip scene and pixel avatars.
  - **Settings:** strip scene and a window with a title bar.
  - **404 and missing-project pages:** the small scene with its lights off and a red beacon, plus the gold button.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **Fonts may not load offline:** they come from CDN links using `@latest`, as the spec says. If the test machine has no network, each failed font load logs a console error, and the "no console errors" smoke test would fail.
- **Header search:** there's no keyboard-shortcut hint, because no shortcut exists. Under 1024px the sidebar becomes a wrapping top menu rather than a menu button that opens a window.
- **Gold button on the dashboard screens:** these screens have no main save-type action, so they have none. Only the error screens use gold.

**Decisions I made myself**
- **Dates and avatar size:** dates now read YYYY.MM.DD. Avatars are drawn 32px inside a 40px box.
- **KPI meters:** the data has no targets, so each meter comes from figures already on its tile:
  - deployments against the six-month peak;
  - uptime out of 100%;
  - open incidents now (3) against Monday (5);
  - lead time against last month.
- **Table rows** show the marker on hover or focus, since there's no row selection.
- **Nav marker doesn't blink:** I turned the blink off because every screenshot caught it in its hidden frame. The spec makes that blink optional.
- **Phone layout:** under 600px the header switches and user button hide their words visually (screen readers still get the full names).
- **Prop spacing:** the gaps between scene props are wider than the spec's 4–24 units. With its 6–12 prop limit, a 720-unit-wide scene can't be filled otherwise; cables between the poles bridge the gaps.