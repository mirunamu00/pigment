Night Cartridge is now applied to every screen. The build passes, all 10 smoke tests pass, and the final screenshots show no sideways scroll at 1440px or 390px.

**One file to delete:** `src/pages/ReviewPage.tsx` was my temporary review page. Its route is gone and nothing imports it, but I wasn't allowed to run a delete command, so the file is still there.

**What changed**
- **Base:** `src/styles/tokens.css` is an unedited copy of the package tokens. `src/styles/base.css` was rewritten to use only those tokens and holds the spec's root block, pixel type, marker, window chrome and stepped animations. The two pixel fonts load in `index.html`.
- **Reusable pieces:**
  - `src/scene/` holds the scene engine (the spec's recipe functions plus a numbers check), the market-street props and buildings, and the 11 product sprites.
  - `PixelScene.tsx` has the scene window, small vignette and footer ground strip.
  - `Chrome.tsx` has the ▶ marker, block meter and callout.
  - `Icons.tsx` has the pixel icons, and `MotionSwitch.tsx` is the Animation on/off button (saved between visits).
- **Header:** shop mark and name, Shop/Cart with a blinking ▶ on the current item, the Animation switch and a framed Cart button. Under 1024px the nav moves into a Menu window that keeps keyboard focus until closed. Every screen ends in the ground strip.
- **Grid:** a store-street strip with the title inside its window, category chips with colour squares, a pixel checkbox and select, a meter under "Showing n products", and cards with a category colour bar and a pixel picture of each product. When filters match nothing, a small scene appears.
- **Product detail:** a banner scene per product, the picture beside the purchase column, a 48px price, square option buttons, ◀ ▶ quantity buttons, a gold Add to cart, callouts for "sold out" and "added", a Details list and Previous/Next links.
- **Cart:** a tea-house strip, items panel, totals window with a free-shipping meter, and a checkout window with a gold Place order. Fields shake briefly on a failed submit and show "!" error messages. The empty cart and order confirmation are styled too.
- **Not found pages:** a small scene with its lights off and a red beacon, a message window and a gold "Back to the shop".
- Every route, label, `data-testid` and accessibility attribute is kept. All animation stops under reduced motion or when the Animation switch is off.
- **Docs:** `design-system/` has `VERSION`, `tokens.md` and `components.md`, and `AGENTS.md`/`CLAUDE.md` point to it.

**Numbers from the code checks**
- **Product pictures:** all 11 are 19–23 units wide and fill 40–50% of their window in all four sizes (grid and detail, desktop and mobile).
- **Scenes:**
  - **Sky:** 38–40% of each scene's height.
  - **Lead buildings:** in banners 55–57 units tall (110–114px) and 65–90 units off centre.
  - **Lights:** 4–8 per scene.
  - **Details:** 70+ per strip and 82–93 per banner.
  - **Vertical props:** every tree, flag mast and street clock clears the far ridge by 4–16 units.
  - **Spacing:** every group-spacing rule passes.

**What I couldn't apply**
- **Light mode:** the spec is dark-only and forbids a theme switch, so there is no light appearance. The light screenshots are dark.
- **Header search:** left out, because the app has no search and a dead button would mislead.
- **Pixel body switch:** left out; it is only required for long prose or dense tables.
- **One building per product:** detail banners share one building per category (4, not 11). Each product still has its own arrangement, so no two screens show the same scene.
- **Commits:** none were made, since git wasn't in the allowed commands.

**Decisions I made**
- Category colours: Bags cyan, Apparel violet, Kitchen blue, Accessories amber. Product pictures use their category colour.
- The not-found pages make "Back to the shop" the gold button in place of "Retry".
- On product pages the Shop nav item keeps its marker.
- The stepper's ◀ ▶ and the forward arrows use the button's text colour, not gold.
- The checkout address box now shows 4 rows (it was 3), per the spec's minimum.
- The product-detail URL check didn't fully run: Git Bash rewrites `/products/nope`, and the `//products/nope` workaround landed on the general 404 page. Its scene renders correctly on the review page, but I never saw it in place.