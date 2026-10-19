Inkleaf 1.1.0-rc.2 is now applied to all four settings screens and the not-found page. The build and typecheck pass, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark. I checked every screenshot against the spec, fixed what was off (missing gaps between panels, overly tall stacked table rows on mobile, the spacing under the group titles), and snapped again.

**What changed**
- **Tokens and root:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`, and every value in the stylesheet comes from it. Dark mode follows the system setting unless `[data-theme]` overrides it. Fonts are Source Serif 4, Instrument Sans and JetBrains Mono at the weights the spec names. The brush filters, warm focus outline and reduced-motion rules are set once at the root.
- **Signature elements**, each a reusable piece in `src/design/`:
  - **Pictogram:** each drawing plays once as a stepped strip, can boil, and shows its last frame under reduced motion.
  - **Pastel stage** with faint wandering lines.
  - **Headings:** every h1 fades in word by word.
  - **Waiting and success marks:** the written-loop glyph, the breathing dot and the check-circle.
  - **Buttons** are ring-style controls.
  - **Block rise:** panels rise into view on a route's first visit.
  - **Shared header:** `PageHeader` gives every screen the same header.
- **Drawings:** eight original drawings, half with a hand, each hand pose used once.
  - Screen headers: Profile is a tag, Notifications a megaphone, Security a safe, Billing a coin purse.
  - Billing plan cards: Free is a pencil (pinch), Pro a notebook (present), Business a briefcase (grip).
  - Not found: a folded map with a pointing hand.
- **Screens:**
  - **Shell:** sticky header with the product name in serif. The sidebar collapses into a 44px menu button and sheet below 992px.
  - **Profile:** restyled fields; a chevron on the native time-zone select; a check-circle with "Saved".
  - **Notifications:** spec switches with a thumb element added next to each native input.
  - **Security:** a strength dot; small "Revoke" row actions; tables stack on phones.
  - **Billing:** the plan cards sit on a sage stage; invoice statuses are outline badges with colored dots.
  - **Dialog** and **not-found page** restyled; not found now has two actions.
- **Docs:** `design-system/` holds `VERSION`, the tokens and `components.md` (where each piece is used, plus each drawing's one-word name). `CLAUDE.md` and `AGENTS.md` point to it.

**What I couldn't apply**
- **Working glyph:** nothing in the app waits on a request, so the glyph is built but never shown. The spec forbids adding fake delays.
- **Status regions:** the spec wants one per screen, but Security already has two and Billing's plan status sits beside the dialog. I kept them as they were because the tests depend on them.
- **One commit per screen:** I didn't commit anything, because you didn't ask for commits.
- **Leftover file:** I used a temporary page to look at the drawings up close and removed its route. Deleting files isn't among the commands I was allowed to run, so `src/TempPicto.tsx` is now an empty stub. Please delete it.
- **Screenshots and motion:** the snapshot tool captures before animations finish, so some drawings appear half-drawn and panels below the fold appear blank. Those panels are hidden until scrolled into view, as the spec requires. I checked the hidden mobile tables by measuring them instead.

**Decisions I made**
- **Font packages:** I added three font packages (`@fontsource/source-serif-4`, `@fontsource/instrument-sans`, `@fontsource/jetbrains-mono`) instead of loading Google Fonts. The fonts then load from the app itself, so a blocked network can't log console errors and fail the "no console errors" test.
- **Additions to the markup:**
  - A "N fields need attention" alert on failed submits, which is in the spec's text-field rules.
  - A "Go back" button on the not-found page.
  - Explicit table roles and per-cell labels so tables can stack on phones.
- **Widths:** form panels are capped at the form width plus padding. The plan grid switches to 3 columns based on its own width, so the "Switch to…" buttons never get cramped.
- **Headings:** panel titles stay static; only h1s fade in.
- **Avatar size:** the profile photo placeholder is 64px instead of the spec's 40px avatar size.
- **Revoke style:** "Revoke" is a small secondary button rather than red, since the spec reserves red for confirming a destructive action. Its tap target still extends to 44px.