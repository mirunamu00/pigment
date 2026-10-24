I've applied Night Cartridge 1.3.0-rc.3 to every screen: the product grid, product detail, cart and checkout (including the order confirmation), and the not-found pages. The build passes, all 10 smoke tests pass, and the final `node pigment-snap.mjs` run reports no sideways scrolling. I checked every screenshot at 1440 and 390, plus a temporary review page that showed the art enlarged.

**Two things you need to do:**
- **Delete `src/pages/ReviewPage.tsx`.** It was the temporary review page. I removed its route, but none of the commands I'm allowed to run can delete a file, so it's still there. Nothing imports it.
- **Nothing is committed.** The spec asks for one commit per screen, but `git` isn't in the allowed commands. Everything is uncommitted in the working tree.

**What changed**
- **Base:** the old light theme in `src/styles/base.css` is replaced by the spec's tokens and root setup. The tokens come in through `design-system/tokens.css`, which imports the package's `dist/tokens.css` directly. The NeoDunggeunmo pixel font loads from the CDN link the spec gives. The spec only defines a dark theme, so the light and dark screenshots look the same.
- **Pixel art:** the scene recipe is in `src/art/pixel.ts`. The world is a supply street at night:
  - **Product grid:** a strip with the general store (SHOP sign) as the main building.
  - **Cart:** a strip with a parcel post office (POST sign).
  - **Product detail:** a banner with a warehouse whose sign word and colour change by category: BAGS, WEAR, COOK, GEAR.
  - **Empty and error states:** three small scenes, for no filter results, an empty cart, and not found (with a red warning light).
  - **Footer:** a grass strip with props, on every screen.
  - **Products:** the 11 grey placeholder boxes are now pixel drawings of each product.
- **Reusable pieces** in `src/components/Pixel.tsx`: the scene window, small empty-state scene, footer strip, selection marker, dotted rule, block meter, callout, pixel icons and an Animation on/off switch. The switch is saved between visits, and all motion stops when it is off or when the system asks for reduced motion.
- **Screens:**
  - Header with the selection marker on the current nav item, and a menu button below 1024px.
  - Product cards with a category colour bar and the marker on hover; filter chips with colour dots.
  - Custom checkbox, radio and select controls; quantity steppers with arrow buttons.
  - Gold button only for Add to cart and Place order.
  - Checkout errors show a "!" icon and the fields shake once.
  - The cart summary has a 10-block meter toward the $100 free-shipping threshold.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md`.

All test IDs, labels, routes and accessibility attributes are unchanged.

**What I couldn't apply or check**
- I didn't run an accessibility (axe) check; it isn't one of the allowed commands.
- Scene measurements are worked out by hand from the code, not measured. Main building heights: store 25 units (50px), post office 24 (48px), warehouse 56 (112px). The spec's numeric rules for prop spacing and quarters were also planned by hand, and the far-ridge shapes come from a seeded random generator I couldn't preview numerically.
- **Product drawing sizes:** they are 19–23 units wide; the 40–50% sizing check is also by hand:

  | Width | Narrowest grid window (≈202px) | Widest one-column window (≈451px) | Detail at 1440 (≈527px) | Detail at 390 (354px) |
  |---|---|---|---|---|
  | 19 (towels) | 47% | 46% | 47% | 48% |
  | 21 (tote, mug) | 42% | 47% | 48% | 47% |
  | 22 (key ring) | 44% | 49% | 46% | 50% |
  | 23 (the rest) | 46% | 46% | 48% | 45% |

  Whenever the window is at least 8 times the drawing's width, the rounding keeps every case between 40% and 50%. The smallest window is about 196px, so this holds everywhere.

**Decisions I made**
- **Strip, not a hero, on the home page:** `/` is both the home page and the only product listing, so I gave it the listing's short strip rather than the large hero. The hero would have pushed the products below the fold.
- **No search button or "Pixel body" switch:** the app has no search, and no long text or dense tables.
- **Smaller layout choices:**
  - The free-shipping meter is an addition.
  - "Sold out" uses a warning-coloured dot.
  - Each product drawing uses its category colour.
  - "Back to the shop" on the not-found pages is the gold button, standing in for the spec's "Retry".
- **Art fixes after review:** I redrew the handcarts (they read as animals), the barrier and the footer crate pile. I swapped a tree that looked like a cactus for a flagpole.