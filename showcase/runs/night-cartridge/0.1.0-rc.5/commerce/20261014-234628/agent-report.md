I've applied night-cartridge to every screen: the product grid, both product detail pages, the cart (empty, filled, with checkout errors, and the confirmation), and both not-found pages. The final `node pigment-snap.mjs` builds cleanly and reports no sideways scroll. I looked at every screenshot at 1440px and 390px, light and dark. **I could not run the smoke tests**: `npm run test:e2e` isn't one of the commands I was allowed. Every `data-testid`, test-visible text, label, route and behaviour is unchanged, but that's from reading the test file, not from a test run.

**What changed**
- **Setup:** The token file is imported straight from the design package rather than copied, so no value is retyped. The pixel font is loaded from the link the spec gives. Every-element rules remove rounded corners and transitions. Animation stops under reduced motion or when the new header switch is off.
- **Signature pieces** (reusable, in `src/art/` and `src/components/Pixel.tsx`):
  - The spec's art helpers, ported.
  - A night market-street world: two focal shops, kiosks, a stall, crates, a hand cart, lamps, a vendor and a cat.
  - Three strip scenes (grid, detail, cart), each with different skyline seeds, props and lights.
  - A small square scene for empty states, and an error version with every light off and one red beacon.
  - The ground strip above the footer, on every screen.
  - Also: the ▶ marker, game-style windows, the checkered rule under headings, dotted separators, block meters, callouts, and an "Animation on/off" header switch saved in local storage.
  - The motion follows the spec: stars twinkle, lamps blink out of sync, a cloud drifts, the vendor bobs, a bird passes rarely, the error beacon blinks, and the error fields shake once.
- **Screens:**
  - **Header:** pixel logo mark, nav with a blinking marker on the current item, framed cart button with a count badge.
  - **Grid:** filter chips with a coloured square per category (the marker replaces it when selected), category colour bar on each card, a marker beside the title on hover.
  - **Product pictures:** each of the 11 products is drawn as a pixel sprite, since there are no photos.
  - **Detail:** the picture window stays in place as you scroll, a 48px price, the purchase form in a window with the one gold "Add to cart", and ◀ ▶ quantity buttons.
  - **Cart:** totals in a window with a 10-block meter towards the real $100 free-shipping threshold, checkout in a window with the gold "Place order", and errors shown with a warning icon.
  - **Not found:** the error scene and a gold "Back to the shop".
- **Docs:** I added `design-system/` (version file and a components note covering the world, scenes per screen and category colours), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **One commit per screen:** git isn't among the allowed commands, so nothing is committed.
- **Temporary file left behind:** `src/pages/ArtPreview.tsx` is an empty stub from the temporary review pages. Their routes are removed, but I couldn't delete the file, so please delete it.
- **Pixel body switch, Geist Mono and Pretendard fonts:** left out. The store has no long prose or dense tables, so I only load the pixel font.
- **Header search:** left out, because the app has none.
- **Nav marker on detail pages:** neither Shop nor Cart is marked current there. Changing that would alter the existing `aria-current` behaviour, so the breadcrumb's current item carries the marker instead.
- **Filled-cart and checkout-error states:** the snap routes don't cover them, so I checked them on a temporary pre-filled route that I've since removed.

**Decisions I made**
- **Order-summary meter:** free-shipping progress was the only real maximum in the app, so that's what it measures.
- **Card grid:** it uses `auto-fill` rather than the spec's `auto-fit`, so filtered results keep a normal card size.
- **Mobile header:** under 600px it wraps to two rows instead of using a menu button, which would have added new behaviour. On mobile the Animation switch shows only its icon.
- **Stepper buttons:** the "−"/"+" glyphs are now ◀ ▶ markers. Their accessible labels are unchanged.
- **Narrow screens:** the strip scene shifts so the two focal shops stay centred.
- **Strip scene counts:** each strip has 8 props, 8 lights and roughly 70 hand-placed detail pixels. The focal shops are 5 units taller than the tallest supporting prop.