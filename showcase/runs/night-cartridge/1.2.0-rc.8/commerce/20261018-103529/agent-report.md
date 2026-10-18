The Night Cartridge restyle is applied to every screen: the product grid, all product detail pages, the cart (empty, with items, checkout errors, confirmation) and both not-found screens. The build passes, all 10 smoke tests pass, and the final snapshot run shows no sideways scroll at 1440px or 390px. I checked the screenshots at both widths against the spec and fixed what was off.

**What changed**
- **Look:** the old light theme is replaced by the spec's dark one, using the token file copied unchanged into `design-system/tokens.css`. Everything uses the NeoDunggeunmo pixel font (loaded from the spec's link). There are no rounded corners, transitions or soft shadows, and gold appears only on each screen's one main button.
- **Reusable pieces** (`src/components/Pixel.tsx`): the ▶ marker, fill-only pixel icons, the scene window with its title block, the small empty-state scene, the footer ground strip, the dithered rule, block meters, callouts, and the "Animation on/off" header switch (saved per browser, default on).
- **Art** (`src/art/`): the recipe's scene helpers ported to TypeScript, plus a supply-yard world at night (store, dispatch depot, canvas loft, wool mill, cookhouse, market hall). That gives:
  - 2 strips (product grid, cart) and 4 banners (one per category, on detail pages).
  - 3 small empty/error scenes and the footer ground strip.
  - 11 product sprites drawn in their category colour.
  - All scene motion uses stepped frames and stops under reduced motion or when the switch is off.
- **Screens:**
  - **Grid:** filter chips with colour bullets, a meter for "Showing n products", and cards with a colour bar and picture window.
  - **Detail:** banner with the title, a picture window as tall as the purchase column, framed ◀ ▶ quantity buttons, gold Add to cart, and new previous/next product links.
  - **Cart:** totals in a framed window with a free-shipping meter, and the checkout form in a framed window. Errors show a red frame and a "!" message, the field nudges, and the first bad field gets focus.
  - **Not found:** a lights-off scene with one red beacon and a gold "Back to the shop" button.
- **Unchanged:** all routes, test ids, label text and ARIA attributes. The "−"/"+" glyphs on the quantity buttons became ◀ ▶ markers; their accessible names are the same.
- **Docs:** `design-system/` (VERSION, tokens, `components.md` describing the world, scenes and category colours), plus `AGENTS.md` and `CLAUDE.md` pointer lines.

**Numbers that were measured**
- Every control sharing a row is 40px high; a gold button alone on its row is 48px.
- Product picture windows are 193px inside at 1440px; the detail picture is 604px wide, level with the purchase column.
- Product sprites are 20–22 visible units wide and fill 42–50% of their window at both widths (all within the spec's 40–50%).

**Not applied**
- **Light appearance:** the spec is dark-only, so both colour-scheme screenshots render dark.
- **Header search and the "Pixel body" font switch:** the app has no search and no long text.
- **Banner flat-tone limit:** the band between the far and near ridges can reach about 34 units, slightly over the spec's 32.
- **One commit per screen:** git wasn't in the allowed commands, so nothing is committed.
- **Leftover file:** `src/pages/ReviewPage.tsx`, the temporary review page, is still on disk. Its route is removed and nothing imports it, but I couldn't delete files with the allowed commands, so please remove it.
- **Not checked:** no accessibility scan was run, and I didn't see the mobile menu open, reduced motion, the Animation switch, or the error nudge in a browser.

**Decisions I made**
- **Banners:** 4 per-category banners instead of one per product. A unique scene for each of 11 products wasn't practical.
- **Shared error scene:** "Page not found" and "Product not found" use the same error scene.
- **Rounding up:** strip haze ridges stop at y 17 instead of 18 so the sky fits the 40% height limit, and lidded barrels and far chimneys were redrawn after the first review.
- **Small screens:** under 1024px, the nav and Animation switch move into a Menu dropdown.
- **"Sold out"** uses the warning colour.