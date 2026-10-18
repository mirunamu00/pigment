Graphite Blueprint is now applied to every screen of the store, in light and dark. The build passes, all 10 smoke tests pass, and the final screenshot run shows no page scrolling sideways at 1440px or 390px.

I checked each screen in both themes at both widths: the shop grid, both product detail pages, the empty cart, the not-found page, and a product-not-found URL. I also checked the filled cart, the checkout errors and the order confirmation on a temporary review route, which I've since removed. Every route, label text, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Base setup:** the spec's `tokens.css` is imported unmodified, so the appearance follows the device. Inter and Geist Mono are self-hosted from npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), with no font CDN. The root setup, the 1px indigo focus outline, the global reduced-motion block and the 1344px container (one left edge for header, page and footer) are as the spec describes.
- **Signature pieces:** these are reusable modules: `src/design/recipes.ts` holds the recipe code, `src/components/Signature.tsx` and `ErrorStage.tsx` hold the components, and `src/styles/signatures.css` holds the recipe CSS.
- **Shop:** split opener, hairline grid of plate cards with a caption on each (e.g. `FIG 01 · 18 OZ CANVAS`), filter chips, the result count in mono, and a closing "Over $100? Ships free." over the dot field. When filters match nothing, it shows the 48px empty glyph.
- **Product detail:** the plate figure sits on a quiet stage, with `BAGS · IN STOCK` above the name. The variant picker is segmented pills, the Details rows are numbered `01`–`03`, and "added to cart" shows the done glyph and then a check.
- **Cart:** screen head plus `01 / 02` and `02 / 02` section heads. A failed checkout shows a "3 fields need attention" banner and focus moves to the first invalid field. The empty cart shows a stack blueprint, and the confirmation shows a connected-pair blueprint whose connector marches.
- **Not found:** the broken-connector blueprint with a red end point on a quiet stage, `ERR 404`, and two pills.
- **Other files:** `design-system/` (VERSION and components.md, saying where each element is used), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Pieces with no place in this store:** the lit stage and its entrance motion, the row of three blueprints, the lift on hover, the shimmer, live edge, pulse, caret and dot meter are built but unused. The store has no landing page, no long-running work and no 1-to-5 levels. The scan and rise glyph loops, likewise, aren't shown anywhere.
- **Accessibility attribute kept over the spec:** the spec wants plates hidden from screen readers. The existing `role="img"` and alt label are kept on the image element, because you asked to preserve accessibility attributes. Only the drawing inside is hidden.
- **Tokens copied by import:** the spec says to copy `tokens.css`. I couldn't run a copy command, so `src/styles/tokens.css` imports the file from `design-packages/` instead. The values are exact, but the app now depends on that folder.
- **No commits:** the spec asks for one commit per screen. Nothing is committed yet; say if you want that.

**Decisions I made**
- The first opener sits under the header's hairline, with no second rule and 96px of top space (48px on mobile) instead of the spec's 160px.
- The header has only two nav items, so they stay as pills at 390px instead of a menu sheet. The cart is an icon button with a count; its old "Cart" text is still in the page but visually hidden.
- I added copy where the patterns needed it: a fact per product for the plate captions, "Returns within 30 days." in the cart's summary line, the section-head descriptions, and the closing's helper line and its "View cart" and "Shop bags" pills.
- On mobile, the segmented pills and stepper buttons grow to 40–44px so they meet the touch-target rule.