I've applied Night Cartridge to all four routes, plus the empty, error and order-confirmation states. The build passes and nothing scrolls sideways at 1440px or 390px, in light or dark.

**Not verified:**
- **Smoke tests not run.** `npm run test:e2e` isn't one of the commands I was allowed to run. I kept every route, label, form field, `data-testid` and ARIA attribute, and checked each test's selectors against the new markup by reading them.
- **Some states have no screenshots.** `pigment-snap.mjs` only captures the four routes. The cart with items, the checkout errors and the order confirmation were never seen rendered.
- **Fonts and console errors.** The pixel font loads from the CDN link the spec gives. If the test machine has no network, that failed load could show up as a console error and fail the "no console errors" test.

**What I changed**
- **Tokens:** `tokens.css` is imported straight from `design-packages/` in `src/main.tsx` rather than copied, so no values were retyped. `src/styles/base.css` is rewritten to use only tokens.
- **Root setup:** the spec's motion, shape and type rules are in place, along with the gold focus ring, the 2px press and the gold button's 4px press into its shadow.
- **Signature pieces:** built as reusable components and helpers in `src/components/Pixel.tsx` and `src/pixel/`. That covers the pixel scene, vignette, ground strip, marker, window, dither rule and block meter. The Animation on/off switch is in the header and is saved between visits.
- **The world:** a market street at night.
  - Product grid: a strip with the lit stall, crates, a cat whose tail flicks, and a drifting cloud.
  - Product detail: a banner with four closed stalls around the lit one, stars and an occasional bird.
  - Cart: a strip with a basket and one sign bulb off. Confirmation: all bulbs lit.
  - Empty grid and empty cart: a small framed scene with a blinking lantern. Not-found pages: the lantern is replaced by a red warning light.
  - Every screen: grass along the footer with crates, a plant, a sign board and a barrel.
- **Screens:**
  - Product grid: filter chips with category colour squares and a marker on the selected one, pixel checkbox and select, and cards with a colour bar that show the marker on hover.
  - Product detail: square-style radio options, stepper buttons with ◀ ▶, the gold Add to cart, and Details under a dithered heading.
  - Cart: a Checkout window holding the totals, the form and the gold Place order. Errors get a warning icon, and invalid fields shake briefly on a failed submit.
- **Category colours:** bags cyan, apparel violet, kitchen blue, accessories amber.
- **Product images:** each of the 11 products is now a pixel drawing in its category colour, replacing the grey placeholder box.
- **Docs:** I added `design-system/` (`VERSION`, `components.md`) and the pointer line in new `AGENTS.md` and `CLAUDE.md` files.

**What I couldn't apply**
- **Pixel body switch and readable fonts:** no screen has long prose or dense tables, so I left the switch out and didn't load Pretendard or Geist Mono.
- **No menu button on narrow screens:** with only two nav items, the nav drops to a second header row below 600px instead of opening a menu.
- **No commits:** the spec asks for one commit per screen, but you didn't ask me to commit, so everything is uncommitted.
- **Stray file:** I accidentally created an empty `src/scratch-detail.txt` and had no allowed command to delete it. Please remove it.

**Decisions I made**
- Product drawings are 24 units wide, shown at 4px per unit in cards (96px) and 8px on the detail page (192px). Both are whole-pixel scales.
- Below 600px, card image areas are 2:1 so the single column isn't so tall.
- Main sections are 40px apart rather than 64px.
- Additions not in the original app:
  - A free-shipping progress meter (10 blocks) in the Checkout window.
  - Summary lines under the page titles, e.g. "11 goods · 4 categories · 9 in stock" and "Ships within two days".
  - An "Order placed" label on the confirmation.
- The stepper's "−" and "+" became ◀ ▶ as the spec asks. Their screen-reader labels are unchanged.
- The "Shop" nav marker blinks as the spec allows, so a screenshot can catch it in its off frame.