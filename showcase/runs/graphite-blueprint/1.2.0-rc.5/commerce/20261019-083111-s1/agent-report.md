Graphite Blueprint is now applied to every screen of the store, in both light and dark. The build and typecheck pass, all 10 smoke tests pass, and the snapshot tool reports no sideways scroll at 1440px or 390px. I looked at the screenshots of every page, including the 404 and product-not-found pages. To check the filled cart and the checkout error banner, I briefly pre-filled the cart and the form errors in code, then removed that afterwards.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's tokens. The app's old CSS variable names now point to those tokens. Inter and Geist Mono are self-hosted from two npm font packages, the only dependencies I added. Light and dark both follow the device setting, since the app has no theme switch.
- **Signature elements**, built once as reusable pieces in `src/design/`:
  - the spotlit stage
  - the dot glyph
  - the isometric blueprints, including a "broken connector" drawing for error pages
  - the spec plates that stand in for product images
  - the headline and summary blocks (page heads, section heads, the two-tone text)

  The shimmer and live-dot effects exist as CSS but aren't used anywhere. I checked each piece on its own at 2x in both themes on a temporary route, which I then removed.
- **Header and footer:** sticky blurred header, pill-shaped nav links (Shop also shows as current on product pages), and a cart icon button with the count badge at its top right.
- **Catalog:** large heading with a two-tone summary, filter chips, custom checkbox and select, and the result count in mono caps. Products sit in a hairline grid of cards with spec plates; "no results" shows the empty dot glyph.
- **Product detail:** the plate sits on a quiet stage that ends level with the info column. The colour/size options are segmented pills, and adding to cart shows a success line.
- **Cart:** page head, then "01 / 02 Items" and "02 / 02 Checkout" sections. A failed submit now shows a "3 fields need attention" banner (`role="alert"`) above Place order. The empty cart and the order confirmation each get a small blueprint drawing.
- **Errors:** the 404 and product-not-found pages show the broken-connector drawing on a stage, with an "ERR 404" code.
- **Docs:** `design-system/VERSION` and `components.md` record where each element is used, plus a one-line `AGENTS.md` and `CLAUDE.md` pointing to them.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but `git` wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Product image accessibility:** the spec says plates should be hidden from screen readers. The product image already has `role="img"` and a label, so I kept those and hid only the drawing inside.
- **Variant pills:** they are 28px tall as specified, which is below the 44px touch-target rule.
- **Mobile menu sheet:** not added; with only two nav items, both fit at 390px.
- **Not used:** the lit stage, running glyphs, shimmer and live dots. The store has no hero, background work or live data, and the spec says not to add parts just to use them.
- **Plate repeats when filtered:** the rule that no two plates in a row or column share a figure holds for the full grid. After filtering or sorting, two neighbours can occasionally share one, because each product always keeps the same figure.

**Decisions I made**
- **Plate captions:** each uses one fact from the product's own details that its card doesn't already show, such as "FIG 01 · 18 OZ" or "FIG 04 · WASHABLE" (all 18 characters or fewer).
- **Page layouts:** the catalog uses the large content heading; the cart uses the smaller app-screen heading because it is mainly a form. I wrote the two short section descriptions on the cart page.
- **Count badge class:** it moved from `badge` to `count` as the spec requires; its `data-testid` is unchanged.
- **Remove button:** "Remove" is now an outlined small pill.
- **Placeholder and success figures:** the empty cart shows a three-layer stack; the confirmation shows one box.
- **Plate figure size:** on the detail page I capped the figure at 400px so it doesn't overpower the stage.