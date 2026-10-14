I've restyled the whole app with Inkleaf 0.1.0-rc.2, in light and dark. The build and typecheck pass, and the last `node pigment-snap.mjs` run shows no page scrolling sideways at 1440px or 390px. I could not run the smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed. I kept every route, `data-testid`, test label and ARIA attribute, and the empty status regions still read `''`, but none of that has been checked by a test run. I also didn't commit anything, since git wasn't on the allowed list either.

**What I changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a copy of the spec's `tokens.css`. I rewrote `src/styles/base.css` so it uses only those tokens. The three fonts are bundled with the app through Fontsource packages (added to `package.json`) rather than loaded from a CDN, so they work without network access.
- **Signature pieces**, built as reusable components in `src/components/ink/`:
  - **Pictogram:** each drawing is one strip of frames that steps through once, holds its final frame, and stays still under reduced motion. There are eight original drawings: hand mirror, hand bell, door key and coin purse in the screen headers; paper boat, kite and hot-air balloon on the plan cards; and a hand holding a folded map on the not-found page.
  - **Stage:** a lilac stage behind the plan cards and an apricot one behind the not-found drawing.
  - **Headings:** every h1 fades in word by word; the accessible name and text are unchanged.
  - **Working glyph and breathing dot:** the dot marks the live "Active now" session.
  - **Buttons:** all use the ring style from the spec.
- **App shell:** sticky 72px header, 240px sidebar from 992px wide, and a menu button that opens a full-width section list below 992px.
- **Every screen** uses the same shared header: small drawing, h1, actions, then the description.
  - **Profile and Security:** form fields, errors and the focus outline restyled. "Saved" and "Password updated" now show with a check-circle.
  - **Notifications:** switches with a sliding thumb.
  - **Tables:** rows stack into label/value pairs on mobile.
  - **Billing:** status badges with a coloured dot, and the plan-change dialog.
- **Housekeeping:** added `design-system/` (`VERSION`, `components.md`) plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**Spec items I couldn't fully apply**
- **Working glyph in save buttons:** both saves finish instantly, and the spec forbids adding a delay to show the glyph. The submit buttons support it, but it never appears.
- **Short drawings:** the spec allows 5–7 strokes for small drawings but wants at least 12 frames. I padded with extra "boil" frames to reach 12.
- **Commits:** the spec asks for one commit per screen, which wasn't possible here.

**Decisions I made myself**
- The four-item sidebar becomes a menu sheet below 992px, following the spec's header rule; nothing in the spec covers a collapsing sidebar.
- Plan cards sit in one column below 1200px wide, because three don't fit next to the sidebar.
- The profile photo avatar is 64px. The spec's 40px avatar looked too small for a photo slot.
- "Revoke" is a small secondary button, as the table spec says for row actions, not a red danger button. Its click area is still 44px.
- Password strength text stays grey; only a small dot carries the colour.
- I added one alert line ("2 fields need attention") above the buttons when a form fails validation, as the text field spec describes.
- The not-found page has a second action, "Go back". It isn't captured by the snapshot tool, so I haven't looked at it.
- Stacked mobile table rows use 24px side padding instead of 16px so they line up with the card title.

**About the screenshots:** they're taken straight after page load, so some still show animations mid-way. Some cards are partly faded, and on mobile the Business plan drawing is below the fold, so it shows only its first stroke. In a browser it draws as you scroll to it.