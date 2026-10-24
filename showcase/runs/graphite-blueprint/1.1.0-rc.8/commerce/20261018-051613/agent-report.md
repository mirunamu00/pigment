I've applied graphite-blueprint 1.1.0-rc.8 to every screen: the product grid, both product detail pages, the cart and checkout, the order confirmation, and the not-found pages, in light and dark. The build passes, all 10 smoke tests pass, and the final screenshot run reports no page scrolling sideways at 390px or 1440px.

**One thing you need to do:** delete `src/pages/ReviewPage.tsx`. It's the temporary page I used to screenshot the filled cart, checkout errors and confirmation. Its route is already removed, but deleting a file isn't one of the commands I was allowed to run.

## What changed
- **Tokens and fonts:** `src/styles/tokens.css` is a copy of the package's `tokens.css`. The old variable names in `base.css` now point at the new tokens. Light and dark follow the device setting. Inter and Geist Mono are self-hosted from two npm font packages I added to `package.json` (no font CDN, no UI library).
- **Signature pieces**, each built as reusable code in `src/design/` with the recipe CSS in `signature.css`:
  - the stage
  - the dot glyph, dot meter and dot field
  - the blueprints, including a broken-connector version for errors
  - the spec plates
  - the opener, screen head, numbered section heads and closing statement

  The working shimmer and live-edge styles are included too. All looping motion stops on its rest frame under reduced motion.
- **Screens:**
  - **Header:** sticky with a blur, pill nav, and the cart as an icon button with a count.
  - **Product grid:** an opener, filter chips, the in-stock checkbox and sort select restyled, a hairline grid of cards with a spec plate on each, a dot-glyph empty state, and a closing "Over $100? Ships free." over the dot field.
  - **Product detail:** the product's plate on a quiet stage, segmented size/colour pills, numbered details rows, and a success banner when you add to cart.
  - **Cart:** a screen head, "01 / 02" and "02 / 02" section heads, a "3 fields need attention" banner on a failed checkout, a blueprint stack when the cart is empty, and a connected-pair blueprint on the confirmation.
  - **Not found:** the broken-connector blueprint on a quiet stage with two buttons.
- **Docs:** `design-system/` (`VERSION` and `components.md`), plus pointer lines in `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **No commits.** The spec asks for one commit per screen, but git wasn't in the allowed commands, so everything is uncommitted.
- **Plates aren't `aria-hidden`.** The product image keeps its original `role="img"` and label, because you asked me to preserve accessibility attributes. Only the drawing inside it is hidden from screen readers.
- **The tokens exist once.** `design-system/` points to `src/styles/tokens.css` rather than holding a second copy.
- **`VERSION` has no date.** The spec doesn't give an update date, so I noted the package's capture date (2026-10-17) instead.
- **Not measured.** I didn't take the spec's `getBoundingClientRect` measurements (blueprint widths, alignment); I only compared the screenshots by eye.
- **Unused pieces.** The shimmer, live edges and loading glyphs are built but not placed anywhere, because nothing in this app loads or runs in the background.

## Decisions I made myself
- **Header:** no inverse pill, since the store has no header-level main action. On mobile the two nav pills stay visible instead of collapsing into a menu, because both fit at 390px.
- **Plate captions:**
  - **Grid:** a short fact per product, 18 characters or fewer, like "18 OZ CANVAS".
  - **Detail page:** the figure's kind, like "LATTICE", because the details list already shows every fact.
- **Plate figures:** each product keeps the same figure under any filter or sort. In some filtered views two neighbouring cards can therefore share a figure kind.
- **New copy:** the cart summary adds a short second sentence, "$52.00 to go." or "This order qualifies." I also wrote:
  - the section descriptions
  - the closing's "View cart" and "Browse bags" buttons
  - the error-page "View cart" button
  - a footer "Shop" link column

  All existing label text is unchanged.
- **Closing:** it has no top hairline, because the grid's last line would face it with nothing between, which the spec forbids.