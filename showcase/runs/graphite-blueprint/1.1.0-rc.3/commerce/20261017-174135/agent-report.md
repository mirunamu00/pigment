I've restyled the whole store with Graphite Blueprint, in light and dark. The build and typecheck pass, all 10 smoke tests pass, and the final snapshot run shows no sideways scroll on any page. I compared every screenshot with the spec, desktop and mobile, light and dark.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package tokens. Appearance follows the device setting. Inter and Geist Mono are now self-hosted from two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`). No UI libraries or CSS frameworks were added.
- **Signature pieces:** each one is reusable. The recipes are in `src/signature/recipes.ts`, with React wrappers in `src/signature/Signature.tsx` and the recipe CSS in `src/styles/signature.css`.
- **Shell:** the header is sticky and blurred, with pill nav and the cart as an icon button with a count badge. The footer has a hairline top.
- **Store grid:** split opener, filter chips, a styled checkbox and sort select, and the product cards in a hairline grid. Every product image is now a line drawing with a caption like `FIG 01 · 18 OZ CANVAS`. A 48px dot glyph marks the "no results" state. The page ends with a large shipping-and-returns promise over a dot pattern, with two buttons.
- **Product detail:** the same drawing, larger, on a softly lit panel. The panel now ends level with the info column (I fixed this after the first snapshot round). Also a mono `BAGS · IN STOCK` label, pill-style option pickers, a quantity stepper, a check icon on the added-to-cart message, and numbered Details rows.
- **Cart:** a page header with a one-line summary, and "01 / 02 Items" and "02 / 02 Checkout" section headings. Failed checkouts now show a banner ("3 fields need attention", `role="alert"`). An empty cart shows a dimmed stack drawing; the order confirmation shows two connected blocks with a moving connector.
- **Not found (pages and products):** two blocks with a broken connector ending in a red dot, on a lit panel, plus `ERR 404` and two buttons.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), and `AGENTS.md` and `CLAUDE.md` with the pointer line.

All routes, test ids, accessibility attributes, form fields and validation are unchanged, and inputs stay native. I checked the signature pieces on their own on a temporary page and removed it afterwards; `App.tsx` matches the original again.

**What I could not apply**
- **Unused signature pieces:** the loading glyphs (scan, rise, core), the shimmer, the live edge and the pulse are built but not placed anywhere. Nothing in this app makes a real request or shows live data, and the spec forbids faking a working state.
- **Drawing widths not measured:** the spec asks for a measurement of each drawing's width. I couldn't run that script with the commands allowed. By construction the drawing fills 91% of its box: about 273px at 300px wide, about 146px for the empty-cart stack, and the column width minus 9% at 390px.
- **Sold-out page not inspected:** I didn't screenshot the sold-out product page. A path-rewriting quirk in the shell sent that snapshot to the 404 page. The smoke tests do cover its disabled button.
- **No commits:** the spec suggests one commit per screen, but you didn't ask for commits. Everything is uncommitted in the working tree.

**Decisions I made myself**
- I added a short `specFact` field to each product in `products.ts` for the drawing captions.
- The store's opening section drops its top hairline and uses less top padding, because it sits right under the header's hairline.
- There's no mobile menu sheet: both nav items fit at 390px.
- The checkbox tick is an inline SVG in white, which is the spec's text-on-indigo color in both modes.
- The empty-cart text is a heading followed by a grey line, not a single two-tone sentence, so the existing heading text stays intact.
- In the footer and the cart header I kept the original wording exactly ("Free shipping on orders over $100.00.").
- New copy I wrote: the section descriptions, the confirmation caption ("Order received / Packed and handed to the carrier next."), and the store promise. The second button in the promise links to Bags.
- Old CSS variable names are aliased to the new tokens. I dropped the ones whose names collide with token names (`--space-1…8`, `--font-size-h1/h2`).