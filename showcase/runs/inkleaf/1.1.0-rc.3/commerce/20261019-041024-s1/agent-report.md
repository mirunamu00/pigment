I've restyled every screen with Inkleaf 1.1.0-rc.3 in light and dark. The build and typecheck pass, all 10 smoke tests pass, and the final snapshot run reports no sideways scroll at 1440px or 390px.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css`, and `src/styles/base.css` is rewritten to use only those values. Dark mode follows the system setting, and `data-theme` can override it. The three fonts load from Google Fonts in `index.html`.
- **Signature pieces (`src/design/`):**
  - **Pictograms:** the brush filters sit once at the app root, and `Pictogram` steps each drawing in once and holds it. Header drawings play once per session; drawings on product cards show the final frame.
  - **Stages:** a pastel `Stage` with wandering lines, and a `.plate` whose color comes from the product id, so it matches on every screen.
  - **Headings:** `WriteIn` fades headings in word by word.
  - **Working glyph:** built, but unused for now (see below).
  - **Controls and motion:** ring-style buttons, chips and inputs, plus a block-rise hook.
  - **Reduced motion:** everything shows its final state.
- **18 original drawings** (11 products, 3 header drawings, filtered-empty, empty cart, order confirmation, not found). Half of them show a hand, no pose is used more than three times, and each product category has at most one hand. Each drawing's subject and one-word test are in `design-system/components.md`.
- **Screens:**
  - **All screens:** the same header (small drawing, heading, lede).
  - **Product grid:** every card gets a plate with its product's own drawing.
  - **Product detail:** the same drawing sits large on a 4:3 stage.
  - **Cart:** two-column layout with a sticky order summary.
  - **States:** the filtered-empty state, empty cart and order confirmation each get a drawing; the not-found pages get a large drawing and two actions.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits.** The spec wants one commit per screen, but git wasn't among the commands I'm allowed to run. All changes are uncommitted on `main`.
- **`src/pages/TempDrawings.tsx` still exists** as an empty module. The temporary review routes are removed, but I can't delete files with the allowed commands. It's safe to delete.
- **The working glyph and breathing dot aren't placed anywhere.** Every action in the store finishes instantly, and the spec forbids showing a waiting state without a real pending request.
- **`design-system/` points to `src/styles/tokens.css`** rather than holding its own copy of the token files.
- **No landing hero or accent fill:** the store has no hero.

**Decisions I made myself**
- **Detail page header:** the product name is now the heading in the standard header, with the product summary as its lede. The breadcrumb sits above it, so the header's top padding shrinks to 16px there.
- **Order summary:** it moved out of the items card into its own card titled "Order summary".
- **New text:**
  - A second "View your cart" action on both not-found pages.
  - A "N fields need attention" alert above "Place order" after a failed submit.
- **Mobile header:** the "Cart" word on the cart button is hidden under 834px so the header fits at 390px. It was already hidden from screen readers.
- **Snapshots:** in the full-page captures, product cards and some headings below the fold appear missing. They appear when scrolled into view on a first visit, which is the spec's intended behaviour. I didn't add code to detect the snapshot tool to get around this, since the spec forbids that.
- **Fonts need a network connection:** they come from Google Fonts, so without network access the page falls back to Georgia and system sans.