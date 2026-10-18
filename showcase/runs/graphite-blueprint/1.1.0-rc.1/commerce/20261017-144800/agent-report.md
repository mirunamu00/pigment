I've applied graphite-blueprint 1.1.0-rc.1 to every screen: the product grid, both product detail variants, the cart (empty, filled, checkout errors, confirmation) and not-found. The build passes, all 10 smoke tests pass, and the last full `node pigment-snap.mjs` run found no sideways scroll. Light and dark both work and follow the device setting. Routes, labels, form fields, test ids and accessibility attributes are unchanged. Nothing is committed, because `git` wasn't in the list of commands I was allowed to run, so the spec's "one commit per screen" didn't happen.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package file. Inter and Geist Mono are now served from the project itself (two font packages added to `package.json`), so the app makes no network font requests. Inter is the variable version, so weights 510 and 590 render exactly.
- **Reusable signature pieces** in `src/components/signature/`, built to the spec's recipes: the stage (lit and quiet), dot glyph with all its patterns, dot meter, dot field, blueprint drawings, spec plates, opener and screen headers, and the empty state. The shimmer, live-edge, pulse and caret styles are in `signature.css`. Everything stops looping under reduced motion.
- **Header and footer:** a sticky blurred header with pill nav, and the cart as an icon button with its count badge.
- **Product grid:** an opener-style header, filter chips, a restyled checkbox and select, and a hairline grid of linked cards with a generated spec plate and mono category label. It ends with a centered shipping-and-returns statement over the dot field. The no-results state uses the empty glyph.
- **Product detail:** the same product figure, larger, on a quiet stage with a FIG caption. Variants are segmented pills, add to cart is the dark pill, the added-to-cart message is a banner, and details are a numbered hairline list.
- **Cart:** the app-screen header and "01 / 02" section heads. On a failed checkout a "n fields need attention" alert banner appears. The confirmation shows the joined-parts drawing with a two-tone sentence. The empty cart uses a dimmed slab stack, and not-found / product-not-found use the error variant with "ERR 404" and two pills.
- **Docs:** `design-system/VERSION` and `components.md` (conventions, where each piece is used, what each drawing stands for), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Not applied from the specification**
- **No running glyphs, shimmer, live edge or pulse on any screen.** The store has no real background work, and the spec forbids faking it.
- **No lit stage.** There's no landing hero; the store only uses quiet stages.
- **Cart columns don't end together.** On desktop the items column ends about 145px above the checkout column, beyond the spec's 48px limit. I didn't move the order summary to fix it.
- **Header on mobile:** I kept the two nav pills, which fit at 390px, instead of a menu sheet. The header also has no dark "primary" pill, because the store has no such action.
- **Touch targets:** only icon buttons grow to 44px on touch screens. Chips and nav pills stay 32px.
- **Verification gaps:** the screenshot tool can't capture at 2x, so I reviewed the pieces at a large size on temporary routes instead. I didn't emulate reduced motion or tab through the pages myself.

**Decisions I made**
- **Page-top opener spacing:** the opener at the top of the grid uses 48px/32px of spacing instead of the 160px meant for content sections.
- **Closing statement:** set at 24–48px so it stays within two lines. It's new copy, with buttons "View cart" and "Shop kitchen", and the header link "Shipping and returns →" jumps to it.
- **Segmented pills:** each segment keeps its small native radio visible, so the control itself can be clicked.
- **Image fallback names:** the product image keeps its existing `aria-label` ("… product photo placeholder"). Plates are captioned "FIG 01"–"FIG 11" by catalog order.
- **Cart summary copy:** the line now continues with "Returns within 30 days." after the original sentence.
- **Order total:** shown at 20px weight 510 rather than the 32px value size.

I added temporary review routes and screenshotted the empty, filled, error and confirmation cart states and a not-found URL. They're removed and `src/App.tsx` is back to its original form.