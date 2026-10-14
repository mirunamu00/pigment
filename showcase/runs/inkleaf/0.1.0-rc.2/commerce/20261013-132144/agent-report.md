I've restyled the Fieldhouse Supply store with Inkleaf, covering every screen in light and dark. The build and typecheck pass, and the final snapshot run reports no sideways scroll at 1440px or 390px. I looked at every screenshot, and also captured the not-found page and the "no matching products" state by adding them to the capture list for one run, then removed them. **I haven't run the smoke tests**, because the Playwright test command isn't among the commands I was allowed to run. I kept every `data-testid`, label text, route and accessibility attribute, and checked the test assertions by reading them, but `npm run test:e2e` is still the real check.

**What changed**
- **Tokens and fonts:** an unedited copy of the package's `tokens.css` now lives in `design-system/` and is loaded first. Dark mode follows the system setting. The three web fonts load from Google Fonts in `index.html`. `src/styles/base.css` was rewritten to use only the tokens.
- **Signature pieces**, built as reusable parts in `src/components/inkleaf/`:
  - the hand-drawn pictogram, drawn frame by frame;
  - 11 original drawings, each a new subject;
  - the pastel stage with wandering lines, and the plain colour plate used in the grid;
  - headings that fade in word by word;
  - the written-loop "working" glyph and the breathing dot;
  - the ring-style buttons and form controls.
  
  All the motion stops under reduced motion and never checks for automation.
- **Shared parts:** every screen now opens with the same header (small drawing, heading, intro line). `LostState.tsx` handles not-found pages.
- **Shop:** stone filter chips, with the selected one in ink; a custom checkbox and select; a 4/3/2-column grid of cards on category-coloured plates with an outline icon; a magnifier drawing when no products match.
- **Product detail:** breadcrumb in the header; a drawing of the product on a sage stage; selectable variant boxes; a check-circle beside the "Added…" message.
- **Cart:** items, a sticky order summary card, and the checkout form; on narrow screens the summary sits between them. Includes an open-drawer drawing for the empty cart and an envelope drawing for the order confirmation.
- **Not found:** a drawing of a hand with a map on an apricot stage, a large heading and two actions.
- **Docs:** `design-system/VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** git isn't among the allowed commands, so everything is uncommitted on `main`.
- **Working glyph and breathing dot:** they're built but not shown anywhere. The store makes no network requests, and the spec forbids adding delays just to show a waiting state.
- **Font loading offline:** if the machine running the tests can't reach Google Fonts, the browser may log an error and the "no console errors" test could fail.
- **Two states weren't screenshotted:** the cart with items in it and the checkout errors. I checked them in the code only.

**Decisions I made myself**
- **Plate colours:** bags sage, apparel lilac, kitchen apricot, accessories sage. The spec reserves the fourth colour (lake) for cards and drawings.
- **Detail-page stage:** square and at most 480px wide, so the drawing doesn't look lost in a big panel. The drawing is one per category, not per product.
- **Short drawings:** those with under 9 strokes show each stroke for two frames, so every drawing runs within the spec's 12–24 frames.
- **No orange accent fill:** the store has no landing hero, so I didn't use it anywhere.
- **Small additions:**
  - an "Order summary" heading on the summary card;
  - an "N fields need attention" alert line when checkout fails validation;
  - a second "View cart" button on the not-found pages.
- **Mobile header:** the "Cart" text inside the cart button is hidden below 420px so the header fits at 390px.