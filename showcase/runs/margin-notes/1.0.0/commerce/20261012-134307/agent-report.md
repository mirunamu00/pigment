I've restyled all three screens (the product grid, product detail and cart/checkout) with margin-notes@1.0.0, in light and dark. The final `node pigment-snap.mjs` run built cleanly and reported no sideways scrolling. I checked the screenshots against the spec at 1440px and 390px in both themes. **I could not run the smoke tests**, because Playwright isn't one of the commands I was allowed. Every `data-testid`, route, label text, form field and accessibility attribute is unchanged, so they should still pass, but that hasn't been checked by running them. Nothing is committed either, since git wasn't on the allowed list; the spec asks for one commit per screen.

**What I changed**
- **Tokens and setup:** `design-system/tokens.css` is a verbatim copy of the package's tokens, imported by `src/styles/base.css`, which I rewrote on top of them. The old variable names are kept as aliases. The four fonts load from Google Fonts in `index.html`. The watercolor filters are added once in `Layout`.
- **Layout:** one page container (40px gutter, 16px on mobile), a 72px header (60px on mobile), hairline borders and focus rings on every control.
- **Product grid:** a full-width header band with the watercolor bloom, "goods" set in the serif italic, and the pencil note "made for every day" beside the lead (wide screens only). Filter chips scroll in their own strip on mobile with a faded edge. The checkbox, the sort select and the product cards (striped image placeholder, linked-card hover and focus) are restyled.
- **Product detail:** the size/color options are a segmented control, with the native radio covering each segment. On mobile the title and price come before the image, and Add to cart sits in a fixed bottom bar. The add-to-cart confirmation is now a toast with its "View cart" link.
- **Cart:** cart lines rearrange on mobile; the summary values use the mono font. The checkout fields show an alert icon with each error.
- **New:** `design-system/` with `VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` containing the pointer line.

**Things I added that the spec requires but the app didn't have**
- A danger callout at the top of the checkout form ("N fields need attention") after a submit with errors.
- An "Order placed" success badge on the confirmation screen.
- Small React logic in `ProductsPage` that keeps the selected chip in view and drives the edge fade.

**What I couldn't apply**
- **Tape:** there are no featured products in the data, so no card is taped.
- **The "last row" rule:** no same-height cards were broken, but the final grid row has 3 cards out of 4 by design of the data.
- **Toast auto-dismiss:** the add-to-cart toast has an action, so per the spec it doesn't time out. It also doesn't close on Escape.
- **Not checked:** the cart with items, the checkout error state and the confirmation screen aren't among the captured pages, so I reviewed those only in the code.

**Decisions I made myself**
- Cart and confirmation titles use the smaller object-page heading size, not the large index size.
- Product cards are 4 per row on wide screens, 2 on medium and 2 on mobile. On mobile, card titles drop to 15px so two cards fit across.
- The "Details" heading on the product page uses the panel-title size.
- Product images are 4:3 per the spec (they were square). The per-product color tints are dropped because the spec makes every image placeholder look the same.
- The quantity control is two 40px buttons plus a number input, built from the button and text-field styles since the spec has no stepper.
- The mobile action bar is only on the product page; "Place order" stays in the form as a full-width button.
- The bloom's top edge looked fairly flat. I tried a larger filter area and letting the graphic overflow, but neither changed it, so the edge is the wash's own uneven outline rather than a clip. I reverted both tries to keep the recipe exact.