I've applied graphite-blueprint@1.2.0-rc.4 to all four screens: the product grid, product detail, cart/checkout and not found. The build passes, all 10 smoke tests pass, and the final snapshot run shows no page scrolling sideways. I looked at the screenshots at 1440px and 390px, light and dark, and fixed what was off. Light and dark both follow the device setting; I didn't add a theme switch because the app doesn't have one.

**One leftover file:** `src/pages/ReviewPage.tsx` is still there. It was a temporary page for snapshotting a filled cart. I removed its route from `App.tsx`, but deleting the file needs a command outside the ones I was allowed to run, so please delete it.

**What I changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css`. The old variable names in `base.css` now point at the tokens. Inter and Geist Mono are self-hosted through two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`); there is no font CDN.
- **Reusable signature pieces:** `src/design/` has the stage, the dot glyph and dot meter, the blueprint helpers (including a broken-connector variant for errors), the spec plate, and the screen and section heads. `src/styles/signature.css` holds the recipe CSS from the spec.
- **Every screen:**
  - **Header and footer:** a sticky see-through header with pill nav. Shop stays highlighted on product pages. The cart is an icon button with a count badge.
  - **Product grid:** a screen head, filter chips, an indigo checkbox, a native select with a chevron, and a "SHOWING N PRODUCTS" label in mono capitals. Products sit in a hairline grid of drawn placeholder images captioned like `FIG 01 · 18 OZ`. When no products match the filters, a dot-glyph empty state appears.
  - **Product detail:** the placeholder drawing sits on a lit panel the same height as the info column. Variants are pill toggles, and "Add to cart" is the dark pill button. Adding an item shows a check icon in the existing status message.
  - **Cart:** "01 / 02 Items" and "02 / 02 Checkout" section heads, and bordered pill "Remove" buttons. A failed checkout now shows an alert banner ("3 fields need attention") above Place order.
  - **Empty cart, confirmation, not found:** a stacked-layers drawing on the empty cart, a connected-pair drawing on the order confirmation, and a broken-connection drawing with "ERR 404" on not found.
  - **Accessibility and motion:** every route, label, field, `data-testid` and accessibility attribute is kept. All looping animation stops under reduced motion.
- **Docs:** `design-system/` (VERSION, components.md), plus `CLAUDE.md` and `AGENTS.md` with the pointer line.

**Not applied, or applied only partly**
- **Placeholder images keep `role="img"` and their labels.** The spec wants these drawings hidden from screen readers, but keeping existing accessibility attributes took priority.
- **No running glyphs, shimmer, live edges, dot meter, landing-style lit stage or page close appear on any screen.** Nothing in the app actually runs in the background, and there's no landing page or 1–5 data. The pieces are built and ready to use.
- **Touch targets:** only the cart icon button gets a 44px hit area; the 32px nav pills don't.
- **Not checked by screenshot:** the order confirmation and the checkout error banner. The smoke tests cover both, but I couldn't put either state into a snapshot.

**Decisions I made**
- **No page close on the cart page.** The checkout form is the main content of the page, not a closing block, so I didn't rebuild it as a centered closing statement.
- **Screen head instead of an opener on the grid.** The grid page uses a screen head (label, large h1, two-tone summary), which avoids a second big headline.
- **Plate captions:** I added `PLATE_FACTS` to `products.ts` with a short real attribute for each product (`spec`), used on cards, and its kind name (`kind`), used on the detail page because every attribute is already listed there.
- **Small additions:**
  - **New text:** the section-head descriptions ("Change quantities or remove items.", "Where should we send it?") and the mono labels (Catalog, Cart, No results, Empty cart, Order placed).
  - **Visual tweaks:** a faint border on the variant pill track so it shows on the white background. "Cart" next to the header icon is visually hidden but still in the page.
  - **VERSION date:** set to 2026-10-17, taken from the package manifest.