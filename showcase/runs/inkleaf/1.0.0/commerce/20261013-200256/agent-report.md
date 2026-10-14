Inkleaf 1.0.0 is applied to every screen of the store. The build and typecheck pass, and the final screenshot run shows no sideways scroll at 1440px or 390px, light or dark.

**Not checked:** I couldn't run the smoke tests, because they aren't one of the four commands I was allowed. Every `data-testid`, route, label, form field and accessibility attribute is kept, and the h1 accessible names match what the tests look for. The screenshot tool also only captures the empty cart, so I haven't seen a cart with items, the checkout errors or the order confirmation on screen. Their styles are written but not visually checked.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package tokens, imported by `src/styles/base.css`. Dark mode follows the system setting, and `data-theme` can override it. The three spec fonts load from Google Fonts in `index.html`. The global focus outline, reduced-motion block and no-sideways-overflow rule are in place.
- **Signature pieces** (reusable, in `src/inkleaf/`):
  - The brush filters.
  - The hand-drawn pictogram that steps in frame by frame and holds.
  - The pastel stage, drawing stage and plate.
  - The heading that writes itself in word by word.
  - The working glyph and breathing dot.
  - The ring-style buttons and controls.
  - A shared product-screen header.
  - All motion stops under reduced motion.
- **17 original drawings**, 9 of them with a hand (at least half, as the spec requires). Each product has its own drawing, shown on a plate in the grid and stepping in on a stage on its detail page. The shop header is a hanger and the cart header a basket. The empty cart is a price tag, the order confirmation a parcel, "no matching products" a spool of thread, and not found a lantern on an apricot stage.
- **Screens:**
  - **Shop:** header drawing, filter chips, custom checkbox and select, 3-column grid (2 on mobile).
  - **Product:** stage, written-in title, radios, quantity stepper, a check-circle "Added" message in the existing status region.
  - **Cart:** item lines with a small Remove button; on wide screens the order summary is a sticky side card.
  - **Empty cart, confirmation and both not-found pages:** drawing, written-in heading, one or two actions.
- `design-system/` (VERSION and components.md, which also lists each drawing's subject), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** git wasn't among the allowed commands, so all changes are uncommitted.
- **Block rise on product screens:** the hook is built, but no screen uses it. It hides blocks below the fold until they're scrolled into view, so full-page screenshots showed those cards blank. The spec forbids treating screenshots specially, so I dropped it.
- **Working glyph:** built but never shown, because the store has no requests that actually wait (cart and checkout happen instantly), and the spec forbids fake delays.

**Decisions I made**
- **Not-found size:** the lantern sits on a 4:3 stage about 320px wide, so its drawing is wider than the 128px size the spec names. The spec's own stage rules require that width.
- **Stage colours:** they rotate sage, lilac, apricot, lake down the product order, and the grid has 3 columns so cards above each other don't repeat a colour.
- **Product detail page:** no small header drawing, because the stage already carries the product's drawing.
- **Additions, none of which remove anything:**
  - An "Order summary" heading on the new side card.
  - A second "View cart" action on the not-found pages, since the spec asks for two actions.
  - A "N fields need attention" alert above the checkout button after a failed submit, as the spec requires.
- **Animation details:** short drawings hold each stroke for two frames, so every animation reaches the spec's 12 to 24 frames. Header drawings play once per session.