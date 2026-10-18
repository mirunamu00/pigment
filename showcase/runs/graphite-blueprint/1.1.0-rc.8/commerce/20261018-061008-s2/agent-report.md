I've restyled the Fieldhouse Supply store with Graphite Blueprint 1.1.0-rc.8 on every screen, in light and dark. The build passes, all 10 smoke tests pass, and the final snapshot run found no sideways scroll. I opened the screenshots of every page and state (the review page I built was 2x zoom, dark) and they match the spec.

**What changed**
- **Fonts and tokens:** Inter (variable) and Geist Mono 400 are now self-hosted from two `@fontsource` packages added to `package.json`; there's no font CDN. `tokens.css` is copied unchanged into `src/styles/`. Light and dark follow the device setting, since the app has no theme switch. The store's old CSS variables now point at the new tokens.
- **Signature elements:** each one is a reusable piece in `src/design/`: the stage, the dot glyphs and dot meter, the blueprints, the spec plates, and the section heads. There's also an empty-state component with panel, full-screen and error versions. The shimmer and live-edge styles are copied from the spec. Every looping animation stops on its resting frame under reduced motion.
- **Product grid:** a split heading with the intro text beside it, filter chips, a native checkbox and select, and the result count in mono. Products sit in a hairline grid of cards, each with a generated figure in place of a photo. The page ends with a closing line, "Over $100? Ships free.", over a faint dot pattern. "No results" shows the empty-dots glyph.
- **Product detail:** the product figure sits on a dim stage, with "BAGS · IN STOCK" above the name. Variants are pill buttons and Details rows are numbered 01, 02. Add to cart briefly shows the all-dots-lit glyph, then a check.
- **Cart:** a screen header, "01 / 02" and "02 / 02" section heads, and form fields per the spec. A failed checkout now shows a "3 fields need attention" banner above the button. The confirmation has a two-part drawing (cart to warehouse) with a two-tone sentence, and an empty cart shows a stacked-slab drawing.
- **Not found (page or product):** a broken-connector drawing on a dim stage, "ERR 404", and two buttons.
- **Header:** sticky with a blurred background. The cart is now an icon button with a count badge. On product pages, Shop stays highlighted.
- I added `design-system/` (VERSION and `components.md`), plus `CLAUDE.md` and `AGENTS.md` with the pointer line.

All routes, test IDs, label text and accessibility attributes are unchanged.

**What I couldn't apply**
- **One commit per screen:** git isn't one of the commands I was allowed to run, so nothing is committed.
- **Stray file:** `src/pages/ReviewPage.tsx` was a temporary page for checking the pieces up close. I emptied it but couldn't delete it with the allowed commands, so please delete it. The spec also says to review in an edited existing page rather than a new file; I should have done that.
- **Working-state animations:** the shimmer, live edge, pulse, caret and the looping glyphs are built but not used. Nothing in the store runs background work, and the spec allows them only while something really runs.
- **Product images:** the spec marks its figures as hidden from screen readers, but the existing `role="img"` and `aria-label` were kept because you asked me to preserve accessibility attributes.
- **Measurements:** I didn't do the spec's pixel measurements with `getBoundingClientRect()`. My checks were visual, from the screenshots.

**Decisions I made**
- The first heading on the product grid has no hairline above it and less top padding (96px, 48px on mobile). It sits right under the header's line, and the spec forbids two lines with nothing between them.
- I added an 18-character `specFact` to each product for the card captions. The detail page captions the figure type instead (e.g. "FIG 01 · PERSPECTIVE"), so the caption doesn't repeat a fact listed beside it.
- The grid is 4 columns from 1280px, 3 from 1024px, 2 from 640px, then 1.
- I gave the variant pill track a faint border, because the spec's light card grey is nearly invisible on white.
- There's no mobile menu: both nav items fit at 390px.
- Checkout copy is mine: the section descriptions, the confirmation figure caption, and the closing's second button "Shop bags".
- Empty-state headings get a trailing ". " from CSS so the two-tone sentence reads correctly. The heading text in the markup is unchanged.