I've applied Inkleaf 1.1.0-rc.3 to all four screens (shop grid, product detail, cart/checkout, not found). The build and typecheck pass, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark.

**One thing that will look wrong in the screenshots but isn't.** The spec requires blocks below the fold to "rise" into view when you scroll to them, on a page's first visit. Full-page screenshots don't scroll, so the rows of product cards further down the grid, the checkout card on mobile and the "Details" heading appear blank in `.snaps/`. Drawings on stages and empty states are also caught halfway through their entrance animation. With reduced motion turned on, everything shows in its final state at once. I didn't add a way around this, because the spec forbids detecting automation or turning motion off to review.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a verbatim copy of the package's tokens and is loaded first. It covers light and dark (dark follows the system setting). `index.html` loads Source Serif 4, Instrument Sans and JetBrains Mono from Google Fonts. `src/styles/base.css` is rewritten using tokens only.
- **Signature pieces (`src/ink/`):**
  - the brush filters, added once at the app root
  - the frame-by-frame pictogram (draws in once, holds; header drawings play once per session; final frame under reduced motion)
  - pastel stages, plates and item colours
  - headings that fade in word by word, keeping their accessible names
  - the waiting glyph and breathing dot
  - the new button, chip, input, select, checkbox and radio styles
  - the scroll-in rise
- **Drawings:** 18 original ones. Each of the 11 products has its own drawing, shown on a plate in the grid and on a stage on its detail page, in the same colour everywhere. There are 3 small header drawings (price tag, spool, parcel) and 4 for states: receipt (order confirmed), empty basket (empty cart), empty hanger (no filter results) and lantern (not found). Half of them show a hand, with poses spread as the spec requires. Using a temporary review route, I caught two that read as the wrong object (the key ring looked like a magnifying glass, the folded sweater like a box) and redrew both.
- **Screens:** every screen has the same header (small drawing, heading, intro line). The cart's order summary is now its own sticky card in a side column. Not found has a large drawing and two actions. A failed checkout shows "N fields need attention" (`role="alert"`) above the button.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md` (what goes where, each drawing's one-word name and hand pose) and the pointer line in new `AGENTS.md` and `CLAUDE.md`.

All routes, behaviour, labels, form fields, `data-testid`s and ARIA attributes are kept.

**What I couldn't apply**
- **Commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted.
- **Leftover file:** I couldn't delete files either, so `src/pages/InkReview.tsx` (from the temporary review route) is left as an empty stub. Its routes are removed; please delete the file.
- **Waiting glyph and breathing dot:** they're built but never shown. The store makes no network requests, and the spec forbids fake delays.
- **`tokens.json`:** I didn't copy it into `design-system/`; `tokens.css` covers the same values.

**Decisions I made myself**
- I treated the store as an app, so every screen uses the app-style header layout.
- Quantity stepper buttons are 44px so they meet the minimum touch size.
- On phones the header cart button is icon-only, with the count on its corner, so the store name and both nav links fit at 390px.
- I added an "Order summary" heading for the new summary card, and a second "View cart" action on the not-found pages (the spec asks for two actions).
- The empty cart is a plain empty state rather than the pastel first-run version.