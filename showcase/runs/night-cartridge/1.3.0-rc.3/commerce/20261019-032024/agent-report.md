I've restyled the Fieldhouse Supply store with Night Cartridge 1.3.0-rc.3 on every route. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. The spec defines only a dark theme and says not to add a light one, so the light and dark screenshots are identical.

## What changed
- **Tokens and base:** `design-system/tokens.css` and `tokens.json` are straight copies of the package files. `src/styles/base.css` was rewritten to use only those tokens, plus the spec's root block (reduced motion, no radius, no transitions), the pixel font, and the 4px gold focus ring. The two pixel-font stylesheets are linked in `index.html` as the spec gives them.
- **Signature pieces (built once, reused):**
  - Pixel scenes, the ground strip and the small square scenes for empty and error states.
  - The ▶ marker, game windows, the dithered header rule, block meters and callouts.
  - An "Animation on/off" header switch. It is saved between visits, and it and `prefers-reduced-motion` both freeze every animation on its first frame.
  - All of it lives in `src/art/` and `src/components/Pixel.tsx`.
- **The world:** a supply store's market yard at night. Each kind of screen has its own scene:
  - **Shop grid:** a strip led by the general store, with a bag sign.
  - **Cart:** a strip led by a shipping depot.
  - **Product detail:** a banner led by a maker's workshop whose sign reads BAGS, WEAR, COOK or GIFT by category.
  - **Empty and not-found states:** three separate small scenes; the not-found one has its lights off and one red beacon.
  - **Every page:** the grass ground strip above the footer.
- **Products:** all 11 products now show a hand-drawn pixel sprite in a framed picture window instead of the grey placeholder.
- **Screens:**
  - **Shop grid:** item cards with a category-colour top bar and icon, filter chips with colour dots, and a pixel checkbox and select.
  - **Product detail:** the banner with the title block, then a two-column layout (price, ◀ ▶ quantity stepper, one gold "Add to cart"), a "Details" heading on a dithered rule, and previous/next links.
  - **Cart:** the order summary in a window with a free-shipping block meter, and checkout in a window with a gold "Place order". Field errors get a pixel "!" icon and a one-time shake.
  - **Not found:** a window with the scene and a gold "Back to the shop".
- Under 1024px the nav moves into a menu button that keeps keyboard focus inside the menu.
- Every route, label text, form field, `data-testid` and accessibility attribute is kept.

## Numbers checked from code
- **Sprite sizes:** every sprite is 21–23 units wide and fills 40–50% of its picture window. I checked the shop grid's narrowest and widest windows (172 and 499px inside, plus the measured 232 and 290px) and the product page's (475 and 330px). One sprite failed and was redrawn: the key ring was 22 units wide, which dropped to 38% at the narrowest window, so I made it 21.
- **Scene leads:** the general store is 26 units tall and the depot 24, both at least 6 taller than any other prop. The workshop is 55 units (110px), and its top sits at y 57.
- **Banner trees and mast:** the tall poplar and the lantern mast stand 11–13 units above the far ridge.
- **Spacing and lights:** gaps between prop groups and lighting counts were checked against the recipe; each scene has 6–8 lights.
- **Control heights:** the stepper, chips, select and buttons that share a row all measure 40px.

## Not applied or decided myself
- **No commits.** The spec asks for one commit per screen, but git wasn't on your list of allowed commands, so everything is uncommitted. `npm install` also created `package-lock.json`.
- **No header search.** The store has no search feature, so I didn't add a fake button.
- **No "Pixel body" switch.** The spec only calls for it in apps with long prose or dense tables.
- **The shop grid uses a strip, not a hero.** `/` is both the home page and the catalogue; I treated it as the catalogue.
- **Additions:** a free-shipping block meter (the $100 threshold is a fixed maximum), previous/next product links on the detail page, and an "All fields are required." caption on the checkout form.
- **Gold button on not-found:** the spec suggests a gold "Retry", which doesn't fit a 404, so the existing "Back to the shop" link got the gold style instead.
- **Remove button:** it's a normal 40px framed button because it shares a row with the stepper.
- **Fonts:** they come from the CDN at `@latest`, exactly as the spec writes it, so the build depends on that CDN being reachable.

The temporary review route was removed. I also added `design-system/components.md` (the world, the scene on each screen, category colours), `VERSION`, and the pointer line in `AGENTS.md` and `CLAUDE.md`.