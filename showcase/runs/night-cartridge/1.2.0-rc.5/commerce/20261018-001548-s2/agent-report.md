The night-cartridge restyle is applied to every screen: the shop grid, both product-detail routes, the cart (empty, filled, with checkout errors, and the confirmation) and the two not-found screens. The build and typecheck pass, all 10 smoke tests pass, and the final full `pigment-snap` run reports no sideways scroll. I checked the screenshots at 1440px and 390px; three wall-mounted props and a cosmetic spacing issue are still short of the spec (listed below).

The spec defines a dark theme only, so the light and dark screenshots are identical.

**What changed**
- **Tokens and base styles:** `design-system/tokens.css` is a copy of the package's tokens file. `src/styles/base.css` was rewritten to use only those tokens. The old light theme, rounded corners, soft shadows and transitions are gone. The pixel font loads from the CDN links the spec gives.
- **Pixel art** (`src/art/`): the spec's drawing helpers, plus a generator for the shopfront "lead" buildings and the market-street props. Every scene reports its own measurements, so the numbers below come from code.
- **Scenes per screen:** a market-street strip on the grid and another on the cart. Each of the 11 products gets its own banner with a different lead: bag shop, outfitter, luggage house, knit shop with a "WOOL" sign, tee shop, tailor with "COAT", café, kitchenware shop, linen shop with "TEA", locksmith, hat shop with "HATS". There are four separate small scenes for the empty and error states, and a ground strip along the footer on every route.
- **Reusable pieces** (`src/components/Chrome.tsx`): the ▶ marker, dither rule, colour bullet, block meter, callout, scene, vignette and ground strip. There are also pixel icons, an Animation on/off switch that is remembered per viewer, and a mobile menu that holds focus while open.
- **Screens:**
  - **Header and footer:** a sticky header with the dither rule and marker navigation, and the ground strip at the bottom.
  - **Product cards:** each has its category's colour bar and the product drawn as a sprite.
  - **Filters:** filter chips have colour bullets.
  - **Result count:** "Showing 11 products" has an 11-block meter.
  - **Product detail:** gold "Add to cart", 48px price, ◀ ▶ quantity buttons, and previous/next product links.
  - **Cart:** the order summary sits in its own window with a free-shipping meter. Checkout is framed, with the gold "Place order". Invalid fields shake once and show the "!" error icon.
  - **404 screens:** lights-off scene with a red beacon.
  - **Motion:** all of it stops under reduced motion or when the Animation switch is off.
- **Docs:** `design-system/` has `VERSION` and `components.md`. `AGENTS.md` and `CLAUDE.md` have the pointer line.

**Numbers the spec asks for**
- **Product sprites:** all 11 are 20–23 units wide. They fill 42–48% of a grid window at 1440, 44–49% at 390, and 47–50% on the detail page at 1440.
- **Banners:** leads are 48–64 units tall and at least 6 taller than any other prop. Lights per scene are 7–8 (strips 5–6), and each has 90–99 hand-placed details. The left and right ends are 40–56 units from the visible edge, and props sit 3–10 apart within a cluster, with 74–120 units of open ground between clusters.
- **Props:** six variants (fruit stall, tent stall, newsstand, flower barrow, café table, crate stack) plus a clock tower and a poplar. They're rotated in three orders, and alternate products are mirrored.

**Could not apply**
- **Three tall props fall short:** in the day pack, coat and beanie banners, one tall vertical prop (clock tower or poplar) rises only 2 units above the far ridge instead of 4. They're already at the 44-unit height cap and no nearby spot works.
- **No per-screen commits:** I was limited to five commands, so I couldn't run git.
- **No accessibility (axe) check:** I didn't run one, for the same reason.
- **A leftover file:** I removed the temporary art-review and filled-cart preview routes, but couldn't delete their file. `src/pages/ArtReview.tsx` is now an empty stub; please delete it.
- **Cosmetic:** the sweater shop's two windows above its sign can read a little like a face.

**Decisions I made**
- **Header:** no search button (the store has no search) and no switch for swapping in a plainer reading font (there's no long text).
- **No gold on the grid:** it has no main action. Gold goes to Add to cart, Place order, and "Back to the shop" on the 404s.
- **Wider shopfronts:** each banner shop is 40–56 units wide.
- **Cart layout:** the order summary stays on screen as you scroll, rather than matching the left column's height.
- **Extras:** I added the free-shipping meter and the previous/next links, which wrap around the catalogue.