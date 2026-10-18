Graphite Blueprint is applied to every screen (product grid, both product detail pages, cart, checkout errors, order confirmation, empty cart, both not-found pages), in light and dark at 1440px and 390px. The build passes, all 10 smoke tests pass, and nothing scrolls sideways on any page.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package file, and the old CSS variables in `base.css` now point at the new tokens. Light and dark follow the device setting. Inter (variable, so weights 510 and 590 are exact) and Geist Mono are bundled from npm packages added to `package.json`; no font CDN.
- **Signature pieces,** each reusable, in `src/design/` and `src/styles/signature.css`:
  - spotlit stage
  - dot glyph (`DotGlyph`, `DotMeter`, and `DoneMark`: all dots lit, then a check)
  - blueprint helpers, including a broken connector for error states
  - spec plates
  - the shimmer, live-edge, pulse and caret styles
  - opener, screen head, section head and banner components

  Animations stop on a readable frame under reduced motion.
- **Grid:** opener heading, filter chips, a styled checkbox and native select, the count shown as `SHOWING 11 PRODUCTS`, a hairline grid of plate cards (4, 2 or 1 columns), and a closing "Over $100? Ships free." with two buttons over a dot pattern.
- **Detail:** the product figure on a quiet stage (its caption is the page's only FIG number), `BAGS · IN STOCK` above the name, segmented options built on the native radios, a confirmation that shows the done glyph then a check, and Details rows numbered `01`–`03`.
- **Cart:** a screen head, numbered `01 / 02` sections, row-style lines with bordered Remove buttons, a right-aligned summary, and a one-column form. A failed submit now also shows an "N fields need attention" banner (`role="alert"`) above the button.
- **Confirmation, empty cart and not-found pages** each get a blueprint drawing.
- **Shared parts:** a sticky blurred header with pill nav, Shop highlighted on product pages, and a cart icon with a count. The footer has link columns.
- I added `design-system/VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` pointing to them.

**What I couldn't apply**
- **No commits.** `git` wasn't among the allowed commands, so the spec's one-commit-per-screen history doesn't exist; everything is uncommitted in the working tree.
- I didn't copy `tokens.json` into `design-system/`; `components.md` points to the one in the package.
- The verification step asks for measurements (pixel widths and alignments) to be pasted with the method. I didn't take them; I only checked alignment by eye in the screenshots.
- **Not used, because nothing in the app calls for them:** a lit stage (there's no landing hero), the moving loading glyphs and dot meter (nothing loads or has a 1–5 level), the shimmer and live-edge effects (no running jobs), and the textarea character counter (the field has no length limit).
- Cart lines have no plate thumbnails: at that size the required caption wouldn't be readable.

**Decisions I made**
- **Header:** no primary button, since the store has no main header action. At 390px both nav links stay visible instead of moving into a menu sheet.
- **Opener:** the grid's opener has no top hairline and less top padding, so it doesn't sit right under the header's line.
- **Plate captions:** I wrote one fact per product (e.g. "18 oz canvas") for the `FIG nn · FACT` captions, kept in `products.ts`. Figures are assigned from the full catalogue order, so a product keeps its figure under any filter or sort.
- The stepper's "−" and "+" text became icons; the buttons' accessible labels are unchanged.
- The confirmation sentences were merged into one two-tone paragraph, wording unchanged.
- The empty-state headings are kept but styled as the first half of the sentence.

For the review I seeded the cart and form states and rendered the signature pieces on their own, using temporary code in `CartContext`, `CartPage` and `NotFoundPage`. All of it is removed. That review found one problem, now fixed: the error glyph was tinting its unlit dots red, and now only the X is red.