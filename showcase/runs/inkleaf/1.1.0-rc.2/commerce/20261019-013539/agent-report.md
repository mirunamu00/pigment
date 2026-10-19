I restyled the Fieldhouse Supply store with inkleaf 1.1.0-rc.2 across every screen: the product grid, product detail, cart and checkout, order confirmation and not-found. The build passes, all 10 smoke tests pass, and the full screenshot set shows no sideways scroll in light or dark at 1440px and 390px.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package tokens and is loaded first. Dark mode follows the system setting. Fonts are Source Serif 4, Instrument Sans and JetBrains Mono from Google Fonts, as the spec allows. `src/styles/base.css` was rewritten to use only tokens.
- **Signature elements, each a reusable piece:**
  - The cel-drawn pictogram plays once when it comes into view; header drawings play once per session; plates show the final frame.
  - A hand builder with the four poses.
  - The pastel stage, drawing stage and plate.
  - The heading that fades in word by word.
  - The working glyph and breathing dot.
  - The ring-style buttons, chips and inputs.
  - Block rise on a route's first visit.
  - All of the motion stops under reduced-motion.
- **18 original drawings:** 11 product drawings stand in for the missing photos, each in one color everywhere it appears. The others are three header drawings (price tag, hanger, receipt), the empty basket, the empty crate, the parcel and the compass. 9 of the 18 show a hand, and no pose is used more than 3 times.
- **Product grid:** header drawing and heading, filter chips, the "In stock only" checkbox and the sort select restyled, product cards with plates, and an empty state with a drawing.
- **Product detail:** the item's drawing on a 4:3 stage, radios, the quantity stepper, a large "Add to cart" button, and a check-circle on the "Added" message.
- **Cart:** the order summary moved into a sticky side card. The empty cart shows the basket on a stage over a faded placeholder. A failed checkout now also shows "N fields need attention" above the button.
- **Confirmation and not found:** drawing, large heading, and actions; not found now has a second "View cart" action.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md`), plus the pointer line in new `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are preserved. The headings carry an `aria-label` so their accessible names are unchanged.

**What I couldn't apply**
- **Commits:** the spec asks for one commit per screen, but `git` wasn't among the commands you allowed, so nothing is committed.
- **Leftover file:** I couldn't delete `src/pages/InkReview.tsx` with the allowed commands. The temporary review route and its styles are removed; I emptied the file and it's safe to delete.
- **Working glyph:** it's built but unused, because every action in this store is synchronous and the spec forbids adding artificial delays.
- **Cart with items:** this state is never in the screenshots, because the cart lives in memory. The smoke tests cover its behavior, and I checked its layout only by reading the CSS.

**Decisions I made**
- **Rise on product cards and cart rows:** they don't rise; I treated them as list rows, which the spec says never animate. Otherwise most of the grid stays invisible in full-page screenshots until scrolled. Blocks that still rise, and the "Details" heading, can look blank in full-page captures for the same reason. That is the specified behavior, not a bug.
- **Detail stage color:** it uses the item's own color rather than the page's color rotation, so each product keeps one color.
- **Breadcrumb:** it sits at the top of the screen header, with the specified gap to the heading below.
- **Mobile header:** the "Cart" word inside the cart button is hidden under 834px so both nav links fit; its accessible label is unchanged.
- **Empty cart:** I treated it as the first-run empty state; the drawing and placeholder sit on the stage and the text sits below it, because a stage never holds text.