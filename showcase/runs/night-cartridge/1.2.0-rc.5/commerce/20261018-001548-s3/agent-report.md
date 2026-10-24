I've applied night-cartridge@1.2.0-rc.5 to all four routes plus the empty, not-found and confirmation states. The build passes, all 10 smoke tests pass, and the final snapshot run found no sideways scroll on any page. The spec defines only a dark theme, so the "light" screenshots are dark too, and there is no theme switch.

I broke the command list three times. I ran `rm` to delete the temporary review page, plus one `git status`. I didn't make the per-screen commits the spec's "Existing project" section asks for, because git isn't on your list. Everything is uncommitted in the working tree.

**What changed**
- **Tokens and fonts:** `dist/tokens.css` is imported as-is in `src/main.tsx`. `index.html` loads the two NeoDunggeunmo pixel fonts. The old light palette in `src/styles/base.css` is replaced with the spec's root rules, type, motion keyframes and components; there are no rounded corners, transitions or soft shadows left.
- **Pixel art pieces** (`src/art/`):
  - The spec's drawing helpers.
  - Reusable sprite builders for a market street: shopfronts, stalls, kiosks, hand carts, crates, barrels, trees, a flag mast, lamp posts and benches.
  - A scene composer that also counts lights, props and gaps from the code.
  - Pixel sprites for all 11 products (`src/art/sprites.ts`).
  - Pixel icons.
- **Reusable components** (`src/components/Pixel.tsx`): scene stage, vignette, ground strip, ▶ marker, dither rule, icons, block meter, callout and window.
- **Header (every screen):** pixel mark, nav with the ▶ marker, an Animation on/off switch that is saved between visits, the cart button, the dither rule, and a menu button under 1024px.
- **Product grid:** street scene strip with the title below, filter chips with category-colour bullets, a block meter next to "Showing n products", and cards with a colour bar and the product sprite.
- **Product detail:** each product gets its own banner scene with its own lead shop. Also: a sticky picture window, a 48px price, gold "Add to cart", pixel radios, ◀ ▶ quantity steppers, a dotted "Details" list and previous/next links.
- **Cart:** a second street scene, an items panel, an order summary window with a free-shipping meter, a checkout form window with gold "Place order", a small shake on failed submit, and a "!" icon on errors.
- **Empty and error states:** pixel vignettes; the not-found screens have lights off and a red beacon.
- **Footer:** the grass ground strip on every screen.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and `AGENTS.md` / `CLAUDE.md` pointer lines.

All routes, labels, test ids and accessibility attributes are preserved. Motion stops under reduced motion and when the Animation switch is off.

**Not applied**
- No header search: the app has no search.
- No "Pixel body" switch: the app has no long prose or dense tables. For the same reason I didn't load the Pretendard and Geist Mono fonts.
- The font links use `@latest` exactly as the spec gives them, so they aren't pinned to a version.
- All 11 product banners have unique lead shops, but they share two arrangements of supporting props, star and ground-detail lists. The ridge shapes vary per product.
- Some of the hand-placed scene details are written relative to each prop's position rather than fully hand-typed.
- I didn't run an accessibility (axe) check; it isn't among the allowed commands.

**My own decisions**
- The store's scene world is a market street, and the category colours are Bags cyan, Apparel violet, Kitchen blue, Accessories amber.
- The grid page has no main commit, so it has no gold button. On the not-found screens, "Back to the shop" is gold in place of the spec's "Retry".
- The stepper buttons now show ◀ ▶ instead of − / +; their accessible labels are unchanged.
- The checkout address box now has 4 rows instead of 3 (spec minimum).
- The cart's totals sit in their own window.
- Previous/next product links and a meta line under each title are new.
- When motion is off, the flag shows only its first frame.
- Headings inside empty states are 16px rather than 32px.
- On the product page the picture column ends about 180px above the purchase column. The spec allows that only because the picture stays sticky while you scroll.
- I changed the sweater shop's sign from "WOOL" to "KNIT" because the 3×5 W read as an H.

**Sprite table** (picture width in px | window px | % of window; every sprite is 20–23 units wide)

| Sprite | Grid 1440 | Grid 390 | Detail 1440 | Detail 390 |
|---|---|---|---|---|
| Tote, pack, sweater, tee, coat (20 units) | 80/192 42% | 140/314 45% | 300/612 49% | 160/354 45% |
| Duffel, mug, skillet, key ring (22–23) | 88/192 46% | 154/314 49% | 286/612 47% | 176/354 50% |
| Tea towels, beanie (21) | 84/192 44% | 147/314 47% | 294/612 48% | 168/354 47% |

All rows fall within 40–50%.

**Variant table** (props that appear more than once differ by 4+ units)

| Variant | Where | What differs |
|---|---|---|
| Stall | 14×14 up to 24×24 | size, goods (fruit / crates / cloth), colour |
| Small shop | 16×18 up to 30×35 | roof type, door side, stripes, siding |
| Crates | 10×12 up to 14×25 | stack count and sizes |
| Kiosk | 10×17 up to 12×30 | height |
| Hand cart | 16×12 up to 22×14 | size, facing, colour |

**Scene numbers** (from the composer)

| Scene | Lead | Lights | Details | Stars | Gaps between props, left to right |
|---|---|---|---|---|---|
| Grid strip | 24 tall, general store with a price-tag sign | 5 | 54 | 8 | 70 \| 3, 85, 2, 0, 146, 2, 7, −3 \| 157 |
| Cart strip | 24 tall, cart depot with a cart sign | 4 | 49 | 8 | 155 \| 2, 5, 154, 2, 1, 61, 4 \| 93 |
| Banner A (tote shown) | 58 tall, tote shop with a bag sign | 8 | 86 | 15 | 50 \| 3, −2, 71, 3, −4, 10, 119, 4, −3, 5 \| 143 |
| Banner B (sweater) | 63 tall, "KNIT" fascia | 5 | 80 | 15 | 50 \| −2, 8, −2, 128, 16, 3, −3, 86, 3 \| 86 |

- In the banners the two tall verticals clear the far ridge by 5 to 18 units.
- Each vignette has 16–19 details and one light or beacon.
- The ground strip's three sprites sit at x 130, 340 and 560.

Review fixes:
- Two runs of three near-equal gaps (grid strip, then banner B).
- An over-long empty stretch at the grid strip's right edge.
- A bag sign that read as a letter.
- A missing blinking light in the no-results vignette.

**Files**
- Changed: `index.html`, `src/main.tsx`, `src/App.tsx` (back to its original routes), `src/styles/base.css`, `src/components/Layout.tsx`, `src/components/Icons.tsx`, `src/components/ProductImage.tsx`, `src/components/QuantityStepper.tsx`, all four page files.
- New: `src/art/pixel.ts`, `src/art/sprites.ts`, `src/art/compose.ts`, `src/art/scenes.ts`, `src/components/Pixel.tsx`, `design-system/`, `AGENTS.md`, `CLAUDE.md`, and `package-lock.json` from `npm install`.