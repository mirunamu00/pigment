Graphite Blueprint is now applied to every screen, in light and dark. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I looked at every screenshot (both widths, both themes), plus a temporary route showing each signature piece on its own and the hard-to-reach states (order confirmation, failed-checkout banner, not found). That route is removed. Nothing is committed, because git wasn't one of the commands I was allowed to run.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package tokens; I wrote it out rather than copying the file. The old CSS variables now point at the new tokens. Inter and Geist Mono are self-hosted through npm packages, added to `package.json`.
- **Signature pieces:** the recipe code is in `src/design/recipes.ts` and `src/styles/signature.css`. Reusable React parts are in `src/design/Signature.tsx`: the stage (including its entry animation), the dot glyph and dot meter, the blueprint drawing, and the screen and section heads. Their animations stop under reduced motion.
- **Header:** sticky and blurred, with pill nav links and a cart icon button with its count at the top right.
- **Product grid:** a split heading, filter chips, the "In stock only" checkbox (the only indigo besides the focus ring), and a native sort select. Products sit in a hairline grid of cards, each with a generated line drawing captioned like `FIG 01 · 18 OZ COTTON CANVAS`. The no-results state uses the empty dot glyph. The page ends with "Over $100? Ships free." over a dot field, with two buttons.
- **Product detail:** the drawing sits on a quiet stage and its caption is the only FIG on the page. Above the name is `BAGS · IN STOCK`, variants are segmented pills, and the Details rows are numbered `01`. After Add to cart, the dot glyph lights up for 400ms, then a check icon appears.
- **Cart:** a screen heading, then "01 / 02 Items" and "02 / 02 Checkout" section heads. Remove is now an outlined pill and the order summary sits in a card. A failed checkout shows a "3 fields need attention" banner above Place order.
  - The empty cart shows a blueprint stack.
  - The confirmation shows two blueprint slabs joined by a moving dashed line.
- **Not found and unknown product:** a broken-connector drawing on a quiet stage, with "ERR 404" and two buttons.
- **Docs:** `design-system/` holds `VERSION`, the tokens and `components.md`; `AGENTS.md` and `CLAUDE.md` point to it.

**What I couldn't apply**
- **Product image accessibility:** the spec says drawings should be hidden from screen readers. The existing product image has `role="img"` and an `aria-label`, so I kept those and hid only the drawing inside.
- **Elements with nothing to show:** the app has no landing section, background work or 1-to-5 values. So the lit stage, the looping glyphs, shimmer, live edge, pulse, caret and dot meter are built but not placed anywhere. They rendered correctly on the review route.
- **One commit per screen:** not done, since I couldn't run git.

**Decisions I made**
- **Mobile nav:** with only two links, the nav pills stay visible at 390px instead of collapsing into a menu sheet.
- **Cart label:** the hidden "Cart" text next to the cart icon is kept in the markup, just not displayed.
- **Spacing:** the grid page heading has less space above it (96px) and no top hairline, so it doesn't stack against the header's border.
- **Product detail layout:** the stage stretches to the height of the info column so both end together.
- **Header cart button:** 32px rather than the spec's 28px, because it holds the 20px toolbar icon.
- **Empty-state text:** the heading and sentence are the same size and weight, primary then secondary colour.
- **New copy and links:**
  - "Returns within 30 days." in the cart summary.
  - The two-slab drawing for not found.
  - The "View cart" and "Shop bags" buttons in the grid's closing.
  - The "View cart" button on not-found screens.
  - "Ships to one address" under Checkout.
  - A brand line in the footer.