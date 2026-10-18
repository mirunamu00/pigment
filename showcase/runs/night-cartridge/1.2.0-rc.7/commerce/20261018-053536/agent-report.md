Night Cartridge is applied to every screen of the store. The build passes, all 10 smoke tests pass, and the final snapshot run reports no page that scrolls sideways at 1440px or 390px. I looked at every route at both widths, plus the filled cart, the checkout errors and the 404 page through temporary routes. Those routes have been removed.

## What changed
- **Setup:** `design-system/` now holds the spec's `tokens.css` and `tokens.json` (copied unchanged), plus `VERSION` and `components.md`. `src/main.tsx` loads the tokens first. `index.html` loads the two NeoDunggeunmo pixel fonts from the spec's links. `CLAUDE.md` and `AGENTS.md` have the pointer line the spec asks for.
- **Styles:** `src/styles/base.css` was rewritten. It covers the spec's root rules (reduced motion and the Animation switch stop all motion), pixel type with no bold, the 4px gold focus ring, and press feedback that moves a control 2px or 4px. It also styles windows, dithered rules, dotted separators, block meters, callouts, pixel checkbox, radio and select controls, error messages with the "!" icon and a one-time nudge, and all the stepped animations.
- **Pixel art (`src/art/`):**
  - A scene builder ported from the spec's recipe.
  - Market-street sprites: shopfronts, stalls, kiosks, carts, barrels, crates, a fountain, sheds, booths, a clock tower, trees and lamps.
  - Two 96px scene strips: a general store on the product grid, a parcel depot on the cart.
  - 11 product banners, each with its own building and a real sign word: TOTE, PACK, GRIP, WOOL, TEES, COAT, MUGS, IRON, LOOM, KEYS, HATS.
  - Four small framed scenes for the two empty states and the two not-found pages.
  - The grass-and-sprites strip on the footer of every screen.
  - 11 product sprites that replace the grey image placeholders.
- **Reusable pieces:** `src/components/Pixel.tsx` (scene, small scene, footer strip, marker, window, dither rule, block meter, callout). `Icons.tsx` now has fill-only pixel icons and a 24px store mark.
- **Header:** sticky with the dither rule underneath. Nav items show the ▶ marker, and the current one blinks. There is an "Animation on/off" switch, saved between visits. Under 1024px the nav moves into a menu window that closes on Escape and keeps keyboard focus inside while open.
- **Product grid:** category chips with hue bullets (the marker replaces the bullet when selected), cards with hue top bars and a 12px category icon, a hover marker beside the title, and an 11-block meter next to "Showing n products".
- **Product detail:** the product's banner with category, title and summary, a sticky picture window, the purchase panel with gold "Add to cart", ◀ ▶ quantity steppers, a dither-ruled "Details" heading, and new previous/next product links.
- **Cart:** the depot strip, line items with thumbnails, an order-summary window with the total at 48px and a 10-block free-shipping meter, a checkout window with gold "Place order", and the order confirmation as a success callout.

Every route, label, form field, `data-testid` and ARIA attribute is preserved.

## What I could not apply
- **Light appearance:** the spec defines dark only and says "no light theme or theme switch", so light-mode screenshots look the same as dark.
- **Commits:** the spec asks for one commit per screen, but `git` wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Search and the Pixel body switch:** the app has no search, so I didn't add a search button that does nothing. The body-font switch is only required for apps with long prose or dense tables, so I left it and its extra fonts out.
- **Full report tables:** the spec's report asks for a full numbers table per scene. The figures below are the essentials, measured by the scene code on a temporary review page. A full list of exact numbers for every scene is not written up.

## Decisions I made
- **Shop buildings:** each product's building comes from one shopfront builder with hand-chosen roof, sign word, colour, door side and hanging sign. The two pairs that share a roof shape (gable, mansard) differ in colour, sign and chimney.
- **Category hues:** Bags cyan, Apparel violet, Kitchen blue, Accessories amber, following the spec's fixed order.
- **Not-found gold button:** the error pages make "Back to the shop" the gold button instead of the spec's "Retry".
- **Meters:** the free-shipping meter and the grid count meter are my additions, following the spec's rule that counts get a block meter.

## Scene and sprite numbers
- **Product sprites:** 20–23 visible units wide. A sprite fills 42–48% of its picture window at 1440px and 45–49% at 390px. Every one is inside the spec's 19–23-unit and 40–50% limits.
- **Banners:**
  - Lead buildings are 52–64 units tall (104–128px), with tops at y 49–62.
  - The main group of buildings sits 64–90 units off centre.
  - Each banner has 60–65 hand-placed details and 3–7 lights.
  - All gaps between props and to the edges are within 160 units, and supporting props are 20–42 units tall.
- **Strips:** leads 22–24 units, 50 details, 3–4 lights.
- **Small framed scenes:** 15–19 details each, one blinking light or one beacon.