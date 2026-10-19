I've applied Inkleaf 1.1.0-rc.3 to every screen: the product grid, product detail (in-stock and sold-out), the cart (empty, filled, checkout errors, confirmation) and not found. The build passes, all 10 smoke tests pass, and the final screenshot run reports no sideways scrolling at 390px or 1440px, light or dark.

**One thing for you to do:** delete `src/pages/DrawingsReview.tsx` and `src/pages/CartReview.tsx`. They backed temporary review pages; I removed the routes, but I couldn't delete the files because you limited me to five commands. Nothing uses them now.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `design-system/tokens.css` and is the only token source. Light and dark both work and follow the system setting. The specified Google Fonts load in `index.html`, and the global focus outline, reduced-motion rules and no-sideways-scroll rule are in place.
- **Signature pieces, all reusable (in `src/inkleaf/`):**
  - **Hand-drawn pictograms:** drawn stroke by stroke as in the spec, played once when they come into view. The header drawing plays only the first time per session.
  - **Pastel stage and item plates:** each item keeps the same plate color everywhere.
  - **Headings that fade in word by word:** used on every h1 and empty-state title.
  - **Waiting glyph, breathing dot and check-circle.**
  - **Button and control styles.**

  All motion stops under reduced motion.
- **Drawings:** 18 original drawings, half of them with hands. There is one for each product (the same one on its card and its detail page), one per screen header, one for each empty state, the confirmation and not found.
- **Screens:**
  - **Header:** sticky header with a serif name and a small cart button.
  - **Page headers:** the same header pattern on every screen.
  - **Product cards:** a plate on every card, plus filter chips, a custom checkbox and select.
  - **Product detail:** the drawing sits on a stage beside the text.
  - **Cart:** a sticky order summary in a narrow side column (it moves below the items on phones), and the empty cart sits on a small stage.
  - **Not found:** a large drawing and two actions.
- **Docs:** `design-system/VERSION` and `components.md` (where each piece is used, plus every drawing's subject and one-word test), and pointer lines in `AGENTS.md` and `CLAUDE.md`.

All routes, test ids, labels and accessibility attributes are unchanged.

**What I couldn't apply**
- **Waiting glyph and breathing dot:** they're built but not used. Checkout is instant and the spec forbids adding fake delays, so nothing ever waits.
- **One commit per screen:** not done, because git wasn't in the allowed commands. Everything is uncommitted.
- **Screenshots of cards below the fold:** they come out blank. The spec makes them fade in when scrolled into view, and the screenshot tool takes a full-page capture without scrolling. I left the behavior alone because the spec forbids changing motion to make screenshots look right. I checked those cards through the filtered views instead.

**Decisions I made**
- **New elements and text:** I added an "Order summary" card heading, a second action ("View cart") on not found, and the "N fields need attention" alert on a failed checkout. The spec calls for all three.
- **Detail-page stage color:** it uses the product's own color rather than the next one in the rotation, so the item looks the same on the grid and its page.
- **Empty cart:** I treated it as a first visit, so it gets the stage over a faint skeleton.
- **Section titles:** "Items", "Checkout", "Order summary" and "Details" stay static instead of fading in.
- **Drawings that didn't read well:** I dropped the hand from the skillet drawing because it looked like hash marks, and redrew the hanger and key ring.
- **File-name clash:** `picto.ts` and `Picto.tsx` collide on Windows. I import `./Picto.tsx` with its extension and turned on `allowImportingTsExtensions` in `tsconfig.json`.
- **Version date:** the spec gives no release date, so `VERSION` uses 2026-10-19, taken from a reference in the changelog.