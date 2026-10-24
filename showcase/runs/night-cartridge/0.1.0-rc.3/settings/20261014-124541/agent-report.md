I restyled all four settings screens (Profile, Notifications, Security, Billing), the change-plan dialog and the not-found page to night-cartridge@0.1.0-rc.3, in light and dark. The final `node pigment-snap.mjs` run built cleanly and reported no sideways scroll. I checked the screenshots at 1440px and 390px in both themes. I couldn't run the smoke tests themselves: `npm run test:e2e` isn't one of the commands I'm allowed. I did keep every route, label, form field, `data-testid`, ARIA attribute and the one-`role="status"`-per-page structure the tests depend on.

**What changed**
- **Tokens and fonts:** `src/main.tsx` imports `dist/tokens.css` straight from the package rather than a copy, so no value is retyped. `index.html` loads the four font links the spec gives and applies the saved header-switch settings before the page draws.
- **Reusable pieces in `src/pixel/`:**
  - A drawing toolkit built from the spec's helpers, plus a world drawn for this app: a workshop yard at night with workbenches, switch panels, tool chests, cable reels, shelving, a lit shed and a robot helper.
  - The 96px scene strip with its window and title block, the error and empty-state vignettes, and the ground strip shown on every screen.
  - The ▶ marker, pixel icons, the product mark, a pixel avatar generated from the user's name, the block meter, and the Animation / Pixel body header switches.
- **`src/styles/base.css` rewritten:** the reduced-motion / no-radius block, pixel type, stepped animations (blinking lights, twinkling stars, a drifting cloud, the bobbing robot, a rare shooting light, the error nudge, meter fill), framed windows, dithered rules, forms, switches, tables, badges, cards, dialog, and layouts for under 1024px and under 600px.
- **Layout:** a sticky header with the dither rule, the mark and both switches. The sidebar is a full-height marker menu with a colour-coded icon per section; under 1024px it becomes a top menu.
- **Screens:**
  - **Profile:** the form sits in a framed window with a gold "Save changes"; the avatar is a bobbing sprite.
  - **Notifications:** each group is a framed window; "3 of 6" now has a 6-block meter, and switches show on/off.
  - **Security:** the password window has a 12-block strength meter; your own session row carries the marker; the "no other devices" message gets the empty-state vignette.
  - **Billing:** plan cards each have their own colour bar, the current plan is framed with the marker, invoice statuses show a status bullet, and the gold button appears only inside the dialog.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits.** The spec asks for one per screen, but git isn't in the allowed commands.
- **Not-found page has no screenshot.** The snapshot tool only captures the four routes in `pigment.app.json`. I also used "Go to profile settings" as its gold button instead of "Retry", because that's the existing label.
- **Security still has three status regions**, not the spec's one, because the tests rely on all three.
- **No search box or header nav links.** The app has neither, and I didn't invent them.
- **No danger zone.** The app has nothing destructive enough to need one.
- **Fonts and console errors:** the fonts load from CDNs. If the test machine is offline, the failed stylesheet loads could trip the "no console errors" test.

**What I decided myself**
- The sidebar marker stays still instead of blinking (the spec says it "may" blink). Blinking made it invisible in half the screenshots.
- I added title-bar labels "Profile details", "Change password" and "Active sessions", and a short line of details under each page title (email, session count, plan price).
- Invoice dates now display as `YYYY.MM.DD`. The underlying data is unchanged.
- The avatar is a sprite, but the initials stay visible as a small caption under it. The existing text promises a placeholder with your initials, and the tests check them.
- The password and payment windows are sized to their content rather than full width, so they don't leave large empty interiors.
- The ground strip sits directly under the content so the sidebar reaches it; the content and sidebar carry the bottom spacing instead.
- Colours: sections are cyan, violet, blue and amber; plans are green, pink and orange.