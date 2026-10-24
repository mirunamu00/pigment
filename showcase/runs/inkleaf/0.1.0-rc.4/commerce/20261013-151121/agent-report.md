I've applied Inkleaf 0.1.0-rc.4 to every screen: the shop grid, both product detail pages, the cart, the order confirmation and not-found. The build and typecheck pass, and no page scrolls sideways at 1440px or 390px in light or dark. I checked the screenshots against the spec and fixed what was off. I didn't run the Playwright smoke tests, because that command wasn't on the allowed list. I kept every route, `data-testid`, label, form field, validation rule and accessibility attribute the tests use, so they should pass.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of `dist/tokens.css`, so dark mode follows the system setting. `src/styles/base.css` is rewritten to use only token values. The three fonts load from Google Fonts in `index.html`.
- **Signature pieces** (`src/components/ink.tsx`):
  - The brush filters, added once at the app root.
  - The hand-drawn pictogram. It draws itself once when it scrolls into view; header drawings draw only once per session.
  - The pastel stage, the 4:3 drawing stage and the plate.
  - The h1 that fades in word by word, on every screen.
  - The working glyph and breathing dot.
  - The button and input styles, and the block rise for blocks below the fold.
  
  All motion stops under `prefers-reduced-motion`.
- **Drawings** (`src/components/drawings.ts`): 17 original subjects. There is one per product: the tote, backpack, duffel, sweater, tee, coat, mug, skillet, towels, key ring and beanie. The rest are for screens:
  - The shop header has a hang tag.
  - The cart header has a basket.
  - The filtered-empty state has a coat hanger.
  - The empty cart has a paper bag.
  - The confirmation has a parcel.
  - Not-found has a counter bell.
  
  Nine of the 17 include a hand. Each product's grid drawing is the same one shown on its detail page.
- **Screens:**
  - **Shop:** a standard product-screen header with a small drawing, h1 and lede. It has stone filter chips, a restyled checkbox and select, and product cards with drawings on rotating pastel plates. The filtered-empty state has a drawing and a single "Clear filters" button.
  - **Product detail:** the drawing sits on a 4:3 stage. Variants are bordered radio options, and the quantity stepper and buttons use the new control styles. "Added to cart" now shows a check-circle.
  - **Cart:**
    - Items come first, then checkout, with the order summary as a sticky side card on wide screens.
    - Remove is now a small secondary button.
    - The empty cart sits on a lilac stage over faded placeholder cards.
    - The confirmation is a centred drawing with the h1.
  - **Not found:** a bell drawing on an apricot stage, with two actions.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (conventions, where each signature piece is used, and the drawing for each screen), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Commits:** the spec asks for one commit per screen, but git wasn't among the allowed commands, so everything is uncommitted.
- **Working glyph and breathing dot:** they're built but not used anywhere. The app makes no network requests, and the spec forbids faking a delay to show a working state.
- **Lower product cards in screenshots:** cards below the fold stay hidden until scrolled into view, as the spec's block rise requires. Full-page screenshots never scroll, so they show empty space there, which is most noticeable on mobile. For one review run I disabled this and confirmed all 11 cards render, then put it back. The spec forbids special-casing screenshots.
- **Drawings mid-draw in screenshots:** some screenshots catch a drawing partway through its first draw, since the snapshot doesn't wait for it to finish.

**Decisions I made**
- **No header drawing on product detail:** the product's own drawing sits next to the h1, and a second drawing would break the one-per-viewport rule.
- **Not-found stage size:** I capped it at 256px wide. A 128px drawing on a stage would make the ink too small relative to the stage, and the spec's ink-to-width rule takes priority.
- **Plate colours:** they rotate sage, lilac, apricot by grid position, so neighbours never match. That's why the grid is 4 columns from 834px and 2 below.
- **Small additions:**
  - An "Order summary" panel title.
  - A category label above the product title.
  - A "View your cart" second action on not-found pages.
  - An "N fields need attention" alert on a failed checkout, as the spec's form rules ask.