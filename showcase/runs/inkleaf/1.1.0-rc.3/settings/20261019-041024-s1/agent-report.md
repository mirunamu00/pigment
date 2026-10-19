I've restyled the app with inkleaf@1.1.0-rc.3. The build passes, all 8 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no page scrolling sideways. Routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**One thing that looks wrong in the screenshots but isn't:** on Billing, the Invoices table is missing from the full-page captures. The spec says blocks below the fold start hidden and fade in when you scroll to them, and a full-page screenshot never scrolls. The rows are there (the tests count them), and they appear on scroll in a real browser.

**What I changed**
- **Tokens and fonts:** an exact copy of the package's `tokens.css` is in `design-system/tokens.css` and imported first. Source Serif 4, Instrument Sans and JetBrains Mono load from Google Fonts. Dark mode follows the system setting, and `data-theme` can override it.
- **Signature pieces, as reusable code in `src/inkleaf/`:**
  - the brush filters, added once at startup;
  - the hand-drawn pictogram that draws itself in frame by frame;
  - the pastel stage with wandering lines;
  - headings that fade in word by word;
  - the "working" glyph and the breathing dot;
  - a shared product-screen header;
  - the scroll-in animation for blocks below the fold.

  All of their motion stops under reduced motion.
- **Shell:** a sticky 72px header and a 240px sidebar. Below 992px the sidebar becomes a menu button that opens a sheet; Escape and navigating close it.
- **Every screen** gets a small header drawing (it plays once per browser session) and an h1 that writes itself in.
  - **Profile:** restyled fields and dropdown, an initials tile colored from the name, a check-circle beside "Saved", and an "N fields need attention" alert.
  - **Notifications:** spec switches with a separate sliding thumb, serif group titles, and the on-count as a badge.
  - **Security:** the sessions table stacks into label/value rows on mobile, "Revoke" is a small secondary button, and "Active now" has a breathing dot.
  - **Billing:** the plan cards sit on the one sage stage, each with its own drawing, and invoice statuses are colored badges.
  - **Dialog:** restyled to spec.
  - **Not found:** a large drawing, a serif heading, and two actions.
- **Drawings:** eight original ones (badge, megaphone, key, wallet, teacup, lantern, rolled plan, map). Four show a hand, each in a different pose. I replaced a coin purse because its clasp and seam looked like a frog face.
- **Docs:** `design-system/VERSION` and `components.md`, plus pointer lines in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **One commit per screen:** git isn't on the command list you allowed, so nothing is committed.
- **The "working" glyph:** it's built but not used, because every save in this app finishes instantly and the spec forbids adding artificial delays.
- **`src/pages/TempDrawings.tsx`:** this file is left over from the temporary review route. The route itself is removed and the file is now an empty `export {}`. I couldn't delete it with the allowed commands, so please delete it.
- **Reviewing with reduced motion turned on:** the snap tool doesn't do this, so some below-the-fold drawings were caught mid-draw in the captures.
- **Spec date in `VERSION`:** the spec gives no update date, so I used the date it was applied.

**Decisions I made myself**
- The profile photo tile is 64px; the spec's avatar is 40px.
- Billing's three plan cards sit side by side when the stage is at least 640px wide, even though the stage rule says a card should span 60% of it.
- Table cards use the smaller table title size from the table spec; other panel titles use the larger panel size.
- I added a few new pieces of copy: "Go back" on the not-found page, the "N devices" / "N invoices" counts, a "Settings" label in the sidebar, and the error-count alert.
- Inputs and switches use the same box-shadow ring style as the buttons.
- Off-state switch thumbs got a stronger outline because they were nearly invisible in dark mode.