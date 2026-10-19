I've restyled the whole store with Graphite Blueprint 1.2.0-rc.1, and it works in light and dark. The build passes, all 10 smoke tests pass, and the final screenshots at 1440px and 390px in both themes show no page scrolling sideways.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied verbatim into `design-system/tokens.css` and follows the device's light or dark setting. Inter and Geist Mono are self-hosted from two npm font packages I added (`@fontsource-variable/inter`, `@fontsource/geist-mono`). The store's old CSS variable names now point at the new tokens.
- **Signature elements:** built as reusable pieces in `src/design/recipes.ts`, `src/design/Signature.tsx` and `src/styles/signature.css`: the stage, dot glyph and dot meter, blueprints, spec plates, shimmer/live classes, and the screen and section heads. All loops stop under reduced motion.
- **Product grid:** a large heading with a two-tone line beside it, filter chips, a styled checkbox and sort select, and the result count in mono caps. Products sit in a hairline grid of cards, each with its own generated line drawing (no two alike in a row or column). When filters match nothing, it shows the empty-state dot glyph.
- **Product detail:** the drawing sits on a quiet stage, with category and option count in mono above the name. Variants are segmented pills, the quantity stepper is restyled, and "Added to cart" shows as a success banner.
- **Cart and checkout:** numbered "01 / 02 Items" and "02 / 02 Checkout" section heads, table-like line rows and a totals summary. A failed submit shows a "3 fields need attention" alert banner above Place order. The empty cart shows a stacked drawing; the confirmation shows a connected pair with a two-tone sentence.
- **Not found pages (404 and unknown product):** a broken-connector drawing on a quiet stage, "ERR 404", and two buttons.
- **Docs:** `design-system/` now has `VERSION`, the tokens and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **One leftover file:** I couldn't delete files either, so `src/pages/ReviewPage.tsx` remains as an empty stub (`export {};`). It held the temporary route I used to screenshot the filled cart, checkout errors and confirmation; the route is removed, so please delete the file.
- **Elements with nothing to show:** running glyphs, shimmer, live edge, pulse and caret are built but unused, because nothing in this store actually runs and the spec allows them only while something does. There is also no landing page, so there is no lit stage or section opener.
- **Cart rows have no drawing:** a spec plate needs a caption, and that doesn't fit at row size.
- **Not fully verified:** I didn't do the spec's separate 2x review of each piece on its own. The 390px product grid screenshot was too small to read closely; I relied on the overflow check and the layout rules. Hover, keyboard focus and reduced motion weren't screenshot-checked.

**Decisions I made**
- **Drawing captions:** they use a singular category word ("NO. 11 · ACCESSORY") to stay within the 18-character limit.
- **Retired variables:** the store's old spacing variables (`--space-1` to `--space-8`) and its `--font-size-h1`/`h2` clashed with token names, so I removed them instead of aliasing.
- **Product image:** the wrapper keeps its original `role="img"` label and test id; only the drawing inside is hidden from screen readers.
- **Header:** the cart is an icon button with its count badge. Nav and icon buttons are padded to a 44px tap area. Product pages also mark "Shop" as the current section.
- **Header extras skipped:** no main action button, because the header has no primary action. No mobile menu either, since both nav items fit at 390px.
- **Two buttons on error pages:** "Back to the shop" plus a "View cart" button I added, since the spec asks for two.
- **New screen text:** each cart section has a one-line description, and the cart heading's summary now reads "Below that, shipping is a flat $8.00."
- **Stepper and success banner:** the spec doesn't cover these, so I built them from the tokens and noted them in `components.md`.