Morning Shapes is now applied to every screen: the product grid, both product detail pages, the cart and checkout, the order confirmation, and the two error pages. The build passes, all 10 smoke tests pass, and nothing scrolls sideways. I opened the final screenshots at 1440px and 390px in light and dark and fixed the problems I found. Two mobile bugs (cart line layout and the footer email field) were confirmed fixed by a fresh screenshot. The third (variant tiles overflowing) was checked with measurements only, and the smoke tests ran after all three fixes.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `design-system/` and loaded first. The old variable names in `base.css` still work and now point to the new tokens. Figtree and DM Mono are bundled with the app through `@fontsource` (added to `package.json`), so nothing loads from the network at runtime. Light and dark follow the system setting.
- **Area colors:**

  | Area | Color |
  | --- | --- |
  | Shop | yellow |
  | Cart | blue |
  | Bags | green |
  | Apparel | orange |
  | Kitchen | violet |
  | Accessories | pink |
  | Error pages | cream |
- **Reusable pieces in `src/design/`:**
  - Header bands with their curved edges and corner shape clusters (a different lead shape for Shop and Cart).
  - The shape kit, with one original pictogram for each of the 11 products.
  - Breathing glyphs that pause off-screen and stop under reduced motion, plus the loading dots.
  - All the pill button styles, filter pills with the selected dot, and option tiles.
- **Product grid:** yellow header band, pill filters with category dots, a compact pill sort menu, and cream cards. Each card has a cover in its category color with its pictogram, in place of the grey placeholder box. The empty result shows a breathing glyph and one button.
- **Product detail:** cream header band (the large cover is the page's one color field), option tiles with glyphs, a stepper made of circle buttons, a blue "Add to cart", and an inline confirmation pill with a sparkle.
- **Cart:** blue header band, small product plates on each line, white inputs on cream cards, and a blue "Place order". The empty cart and the order confirmation each get their own drawing; the confirmation also has an orbiting sparkle.
- **Error pages:** cream band with a rising curve, the rain-cloud drawing, and a "Back to the shop" button.
- **Header and footer:** an 80px white top bar that gains a shadow on scroll. The current area shows a colored dot, including on product pages. Phones get a menu button that opens a full-screen menu (Escape closes it). The new footer is a cream band with link columns, a restock email signup, and a dark bottom bar with round buttons.
- **Docs:** `design-system/` holds the version, tokens and `components.md`. I also added `AGENTS.md` and `CLAUDE.md` pointing to it.

Every route, `data-testid`, label and accessibility attribute is unchanged. The files under `design-packages/` and `tests/` are untouched.

**What I couldn't apply**
- **Commits:** the spec asks for one commit per screen, but you didn't ask me to commit, so all changes are uncommitted.
- **Colors on the grid:** with all products showing, the grid has five colors (yellow band plus the four category covers). The spec allows four per screen.
- **Error pages:** the cream error band and the cream footer are separated by white space but share a color. The spec says two fields should never share one. Also, the white cloud is low-contrast on cream in light mode.
- **Not needed in this app:** the reveal animation and the illustrated "vignettes" are meant for marketing pages, and this store has none. There is no loading state, so the loading dots are built but unused.

**Decisions I made**
- The detail page's confirmation stays inline below the form and doesn't disappear after 5 seconds, so existing behavior is kept.
- The footer signup is new. It only shows a local "Thanks" message and isn't connected to anything.
- Cream buttons inside cream cards use white so they stay visible.
- The variant radios stay visible inside the option tiles, styled to spec, so the tests can still check them.
- "Add to cart" and "Place order" are blue because they're the buying actions.
- I added a short "Your order is on its way" heading to the confirmation panel.

A temporary preview route I used to screenshot the filled cart, plus its screenshots, has been removed.