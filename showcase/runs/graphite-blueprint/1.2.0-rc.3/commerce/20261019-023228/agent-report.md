I've applied graphite-blueprint@1.2.0-rc.3 to all four routes, plus the empty-cart, empty-filter, confirmation and 404 states. The build passes, all 10 smoke tests pass, and the final screenshot run (1440 and 390px, light and dark) shows no page scrolling sideways. Every route, label, form field, `data-testid` and accessibility attribute is unchanged. Light and dark both follow the device setting.

## What I changed
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css`. The store's old CSS variables now point at the new tokens. Inter and Geist Mono are self-hosted from two npm font packages I added to `package.json`; there's no font CDN and no UI library.
- **Signature elements:** each is a reusable piece in `src/components/signature/` and `src/styles/signature.css`, built to its recipe:
  - the spotlit stage
  - the dot-matrix glyph and dot meter
  - the blueprints, including a broken-connector version for errors
  - the spec plates
  - the shimmer and live edges
  - the openers, screen head and section heads

  I checked each one alone at 2x in both themes on a temporary page, then removed it.
- **Product grid:** a split opener, filter chips, a styled checkbox and select, the "SHOWING 11 PRODUCTS" count in the mono label style, and a hairline grid of cards with spec plates. Each plate caption gives the item number and one real attribute the card doesn't show, such as `FIG 01 · 18 OZ` (a new `plateSpec` field in `products.ts`).
- **Product detail:** the plate sits on one quiet stage, with the category and variant count above the name. Colour and size pickers are segmented pills over the native radios. Below them are the stepper and the Add to cart button, then a success notice and the details list.
- **Cart:** a screen head, then numbered sections "01 / 02 Items" and "02 / 02 Checkout", with table-style item rows and the totals. A failed submit now also shows a "3 fields need attention" banner above Place order (`role="alert"`).
- **Other states:** the empty cart shows a blueprint stack, the confirmation shows a small connected-pair blueprint, and both 404 pages show the broken connector on a quiet stage with "ERR 404".
- **Hand-off files:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

## What I couldn't apply
- **No commits.** The spec asks for one commit per screen, but git wasn't in the commands I was allowed to run. Everything is uncommitted.
- **One leftover file to delete:** `src/components/signature/Blueprint.tsx`. It clashed with `blueprint.ts` on Windows' case-insensitive filesystem, so I moved the component to `BlueprintFigure.tsx` and left an empty stub I couldn't remove.
- **Unused pieces.** Nothing in the store actually runs in the background, and the spec forbids showing a working state without real work. So the running glyph loops, shimmer, live edge, pulse, caret and lit stage are built and checked (and stop under reduced motion) but don't appear on any screen. Nothing used on screen loops except the confirmation's marching connector.
- **I left out parts the screens don't have:** the opener's secondary link, the 404's second button and a mobile menu sheet. The spec says not to add parts just to match its patterns, and there are only two nav items, which fit at 390px.
- **The plate's role stays.** The spec wants plates hidden from screen readers, but the existing `role="img"` and `aria-label` on the product image had to be preserved. The drawing inside is hidden.
- **Touch targets:** the segmented pills (28px) and stepper buttons (36px) are below the 44px minimum.
- **Tokens location:** `design-system/` points to `src/styles/tokens.css` rather than holding a second copy.

## Decisions I made
- The page opener has no top hairline and uses 96px top padding (48px on mobile), so the header's hairline isn't doubled.
- The header cart button is 32px, to match the nav pills, instead of 28px.
- The grid has 4 columns on desktop, 2 under 1024px and 1 under 640px.
- The cart sections are stacked in one column instead of side by side, so the columns don't end at very different heights.
- The banner sits 32px below the last field, with the actions 32px below it.
- In the cart's screen head I added one line: "Add $X more to qualify." or "This order ships free."
- The `VERSION` date is today (2026-10-19), because the spec gives no update date.