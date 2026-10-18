Graphite Blueprint is applied to every screen: the product grid, both product detail pages, the cart, checkout errors, the order confirmation, the empty grid and empty cart, and both not-found pages. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I checked the screenshots of every screen and state against the spec.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css` (checked with `diff`). The site follows the device's light or dark setting. Inter (variable) and Geist Mono are now self-hosted through the `@fontsource` npm packages, so I added those two dependencies. Old CSS variable names are kept as aliases of the new tokens.
- **Signature elements:** all six are built as reusable pieces. The recipe CSS is copied unchanged into `src/design/signature.css`, the recipe maths is in `src/design/recipes.ts`, and the React pieces are in `src/design/Signature.tsx`.
- **Header:** sticky with a blurred background, pill-shaped nav links, and a cart icon button with a count badge.
- **Product grid:** opening headline section, filter chips, an uppercase mono result count, and a grid of product cards divided by thin lines. Each card shows a generated line drawing captioned like `FIG 01 · 18 OZ CANVAS`. The page ends with a closing section ("Over $100? Ships free.") with two buttons over a dot pattern. When no product matches, the empty state shows a dot glyph.
- **Product detail:** the line drawing sits on a softly lit panel. Above the name is a mono `BAGS · IN STOCK` line. Variants are a segmented pill picker built on the original radio buttons, and the Details rows are numbered `01`, `02`.
- **Cart and checkout:** a screen header plus "01 / 02 Items" and "02 / 02 Checkout" section heads. A failed submit now also shows a "3 fields need attention" banner above Place order. The confirmation shows a two-tone sentence and a joined-blocks drawing with an animated connector.
- **Not found:** a broken-connector drawing on a lit panel, `ERR 404`, and two buttons.
- **Motion:** the animated pieces were checked on their own on a temporary page, which I have since removed. Under reduced motion every loop stops on its resting frame.
- I also added `design-system/` (VERSION and `components.md`) plus `AGENTS.md` and `CLAUDE.md`, as the spec asks.

**What I couldn't apply**
- **One commit per screen:** git isn't one of the commands I was allowed, so everything is uncommitted in the working tree.
- **Unused live-work effects:** nothing in this app does real background work, so the running dot glyphs, shimmer, live edge and pulse are built but not shown anywhere. The spec forbids faking a working state.
- **Spec date:** the spec gives no update date, so `VERSION` records the date it was applied.
- **Textarea counter:** the address field has no length limit, so the spec's character counter doesn't apply.
- **Drawings when sorted or filtered:** each product keeps the same drawing everywhere, as the spec requires. In some sorted or filtered views, two cards in one row can therefore share a drawing type.
- **Cart column heights:** on desktop, the Items column ends about 190px above the checkout form. The spec wants columns in a row to end within 48px of each other. I left it rather than add filler.
- **Header:** with only two nav links, the mobile menu button and the header's dark main button would have no purpose, so I left both out.

**Decisions I made myself**
- **Wording:** all visible and tested text is unchanged. I kept the stepper's − and + characters rather than swapping in icons. The empty-state headings get their full stop from CSS only.
- **Image placeholder:** it keeps `role="img"` and its aria-label, because the tests and accessibility rules depend on them. The drawing inside is hidden from screen readers.
- **Badges:** the cart counter now uses the separate count-badge style. "Sold out" is a status badge with a neutral grey dot.
- **Grid opener:** it drops its top line, because the header's line is directly above it, and its top padding is 96px instead of 160px.
- **New copy:** I wrote the plate captions, the closing section text, the section-head descriptions and the drawing captions.
- **Button order:** the closing section's buttons are "View cart" (main) and "Shop bags".
- **Mobile closing:** at 390px the dot pattern fades out top to bottom rather than left to right, so it never sits under the text.