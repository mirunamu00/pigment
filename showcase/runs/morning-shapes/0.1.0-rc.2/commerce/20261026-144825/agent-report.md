I've applied Morning Shapes 0.1.0-rc.2 to every screen in light and dark. The build passes, all 10 smoke tests pass, and the screenshot tool reports no page scrolling sideways. I looked at the screenshots of every page at both widths and both themes. I also checked the filled cart and the 404 page through a temporary route, which I've since removed.

## What I changed
- **Tokens and fonts:** `tokens.css` is copied into `design-system/` and imported by the app. The old CSS variable names in `src/styles/base.css` still work and now point at the new tokens. Figtree and DM Mono come from `@fontsource` packages, so nothing loads from the network. Light and dark both work, following the system setting or a `data-theme` attribute.
- **Reusable pieces:** these live in `src/components/ms/`, with their CSS in `src/styles/signature.css`:
  - color bands with curved edges, plus the shape cluster each band carries;
  - a shading helper that gives any flat shape its darker crescent, plus sparkles, clouds, plates and confetti;
  - one drawing for each of the 11 products (tote, day pack, duffel, sweater, tee and so on), used on product cards, the detail page and as cart thumbnails;
  - the error, empty-search and order-placed illustrations;
  - the breathing glyphs, which pause off-screen and stop under reduced motion, and the loading dots;
  - every pill variant, tab pills and circle buttons;
  - the fade-in and the vignette, both of which skip their animation under reduced motion.
- **Screens:**
  - **Product grid:** yellow header band, filter pills with category dots, cream cards with colored covers and category tags, and an illustrated empty state.
  - **Product detail:** yellow band with breadcrumb and title, a large cover, size and color options as tiles with glyphs, a blue "Add to cart", and the added-to-cart message as a dark pill with a sparkle.
  - **Cart:** blue band, cream panels, thumbnails, round stepper buttons, styled inputs with error icons, and a blue "Place order". The empty cart shows a glyph and a faded preview of a filled cart. The order confirmation shows a parcel illustration and an orbiting sparkle.
  - **404 and product-not-found:** a cream band rising into the page, with the spec's error illustration.
  - **Header:** sticky top bar that gets its shadow after scrolling, with a colored dot on the current page's link.
  - **Footer:** cream band with link columns, and a dark bottom bar with a back-to-top button.
- **Docs:** `design-system/VERSION` and `design-system/components.md` (color map, drawings, where each piece is used), plus the one-line pointer in new `AGENTS.md` and `CLAUDE.md` files.

All routes, behaviour, label text, form fields, `data-testid`s and accessibility attributes are unchanged. I added no UI libraries.

## What I couldn't apply
- **No commits:** the spec asks for one commit per screen, but `git` wasn't among the commands I was allowed to run. Everything is uncommitted on `main`.
- **No signup field in the footer:** there's no backend, and a fake form would be new behaviour.
- **No social icon buttons in the footer bar:** there are no social links to point them at. The bar has only a back-to-top button.
- **Built but not used on any screen:** confetti, the loading dots, and the dark-mode wave band edge. This store has no marketing sections, loading states or pricing page.
- **Detail-page nav dot:** "Shop" isn't marked as current on product pages. The original nav only matches the exact `/` path, and I left that behaviour alone.

## Decisions I made myself
- **Colors:** Shop is yellow and Cart is blue. Product categories are Bags yellow, Apparel green, Kitchen orange and Accessories pink. I skipped blue for categories so it always means Cart, and so the grid shows at most four hues. A cart holding items from all four categories can show five.
- **"/" is a product screen, not a landing page:** it gets a compact header band rather than a full hero.
- **Blue buttons:** "Add to cart" and "Place order" are blue because they're the buying actions. The other main buttons are dark.
- **Phone layout:**
  - The top bar wraps to two rows below 640px, because one row overflowed at 390px.
  - The band illustrations move below the text.
  - The added-to-cart message switches to 24px corners when it wraps, so the text isn't cut by fully rounded ends.
- **Empty cart preview:** it appears at once instead of building in, since it sits on a product screen.
- **Spec numbers without tokens:** 44px touch targets, 140px phone illustrations and 8px motion travel are written as plain pixel values. The illustration masks also use literal white and black, which isn't a design color.