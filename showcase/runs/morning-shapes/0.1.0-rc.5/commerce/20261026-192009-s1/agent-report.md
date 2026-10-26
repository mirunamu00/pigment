Morning Shapes is now applied to every screen of the store, in light and dark. The build and typecheck pass, all 10 smoke tests pass, and the final snapshot run shows nothing scrolling sideways at 1440px or 390px. I opened the screenshots of the product grid, both product detail pages and the cart, plus a 404 and a filled cart through temporary routes, and fixed what didn't match. The checkout error and order-confirmation screens were never screenshotted; they are covered by the smoke tests only. Every route, label, form field, `data-testid` and accessibility attribute is preserved.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's `tokens.css`, and the old variable names in `base.css` now point to the new tokens. Dark mode follows the system setting. Figtree and DM Mono are bundled with the app through two `@fontsource` packages, the only dependencies added.
- **Reusable pieces** (`src/components/ms/`, `src/styles/morning-shapes.css`): colour bands with curved edges, the shape kit with crescent shading, sparkles and clouds, 11 product pictograms, 7 band illustrations, 3 empty/error illustrations and a spot plate. Also breathing glyphs that pause off-screen and stop under reduced motion, every pill and circle variant, the loading dots, the fade-in, and the vignette.
- **Colour per area:** Shop is yellow and Cart is blue. Product categories take green (Bags), orange (Apparel), violet (Kitchen) and pink (Accessories).
- **Top bar:** the current page gets a bold link and a dot in its area colour, and the bar gets a shadow once you scroll. On phones it is one row with a menu button; the menu is full-screen, keeps keyboard focus inside and closes on Escape.
- **Product grid:** yellow header band with a storefront illustration, filter pills with category dots, a pill-style sort menu, and cream cards with a coloured cover per product. When no products match, a "no results" panel appears.
- **Product detail:** the header band turns cream because the large product cover below is the one coloured area. Size and colour options are choice tiles with glyphs, "Add to cart" is the blue pill, the added message shows as a dark pill with a sparkle, and a tape-measure plate sits beside "Details".
- **Cart:** blue band with a basket illustration, small covers on each line, a cream "Remove" pill in the danger colour, and a blue "Place order" pill. Field errors now show an alert icon. The order confirmation has its own band with a parcel and an orbiting sparkle.
- **Error pages and footer:** both are cream bands with a rising curve. The footer has link columns, an email signup and a dark bottom bar with a back-to-top button.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md` (colour map, pictogram subjects, where each piece is used) and one-line `AGENTS.md` / `CLAUDE.md` pointers.

**What I couldn't apply**
- **Vignette:** it's built but not placed anywhere. The spec only uses it on front pages and onboarding, and this store has neither.
- **Hue count:** the product grid shows five category colours (the yellow Shop band plus four category colours) where the spec suggests at most four.
- **No commits:** the spec asks for one commit per screen, but I left everything uncommitted because you didn't ask for commits. `package-lock.json` is new from `npm install`.
- **Toast:** the "added to cart" message stays in place and doesn't disappear after 5 seconds, because it is the page's existing status area and its behaviour has to stay the same.

**Decisions I made myself**
- **Colour swatches:** colour options use the nearest colour from the design palette, for example Olive → green and Charcoal → near-black ink. Size options use a disc that grows with the size.
- **Band height:** I added an uppercase eyebrow line to the Shop, Cart and order-placed bands. This brings them to about 220px so their illustrations aren't sticker-sized.
- **Phone margins:** page margins on phones are 24px to line up with the bands, not the 16px the layout section gives.
- **Raised pills on cream panels:** cream buttons inside cream panels use the raised (white) surface so they stay visible.
- **New footer pieces:** the email signup only validates and shows a thank-you message, since there is no backend. "Back to top" is the one icon button in the bottom bar.

The temporary review routes and their styles are removed.