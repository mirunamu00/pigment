I restyled the store with Inkleaf 0.1.0-rc.3 across all four routes, in light and dark. The build and typecheck pass, and the final `node pigment-snap.mjs` run reports no horizontal overflow at 1440px or 390px. I could not run the smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed. I kept every `data-testid`, route, label, form field and ARIA attribute, but the tests have not actually been run.

**Before you commit, delete `src/pages/PictoGallery.tsx`.** It was a temporary sheet I used to check the drawings at full size. Its route and the extra snapshot entries are already reverted, and nothing imports it, but I had no allowed command that deletes a file.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `dist/tokens.css` unchanged, so no values were retyped. Dark mode follows the system setting or `[data-theme]`. `index.html` loads Source Serif 4, Instrument Sans and JetBrains Mono from Google Fonts with `display=swap`. I rewrote `src/styles/base.css` from scratch; it uses tokens only.
- **Signature elements**, each a reusable piece in `src/components/ink/`:
  - the three brush filters, rendered once at the app root;
  - the pictogram (one strip of frames stepped once, a once-per-session option for header drawings, and a boil state);
  - the pastel stage, drawing stage and plate;
  - the word-by-word heading, block rise, the working glyph and breathing dot, and the ring-control button classes.
  - All motion stops under reduced motion.
- **Ten original drawings**, half with a hand: day pack, sweater, mug in hand, key on a leather loop, magnifier in hand, basket, parcel in hand, lost sock, hang tag in hand (shop header) and receipt in hand (cart header). I checked them in screenshots and redrew four that didn't read well: the key, the mug hand, the parcel hand (it looked like a table on legs) and the tag hand.
- **Screens:**
  - **Header:** sticky, serif brand name.
  - **Shop:** header drawing beside the h1, ink chips, restyled checkbox and select, product cards with drawing plates, and an empty state with the magnifier.
  - **Product detail:** a drawing stage, restyled radios and stepper, and a check-circle on the "added" message.
  - **Cart:** item, summary and checkout cards; the summary is sticky in a side column on wide screens. Plus field errors, the empty-cart drawing and the confirmation drawing.
  - **Not found:** applies to unknown pages and unknown products; an apricot stage with the lost sock.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and I added `AGENTS.md` and `CLAUDE.md` with the pointer line.

## Spec items I couldn't apply
- **The working glyph and breathing dots** are built but not shown anywhere. Every action in the store is synchronous, and the spec forbids fake waiting states.
- **One commit per screen** didn't happen, because git wasn't an allowed command. All changes are uncommitted in the working tree.
- **Snapshots look sparse below the fold.** The spec says blocks rise only when they scroll into view and must not be special-cased for screenshots. The snapshot tool never scrolls, so lower product cards appear blank in the full-page PNGs. I reviewed with a temporary override, which I removed.
- **No accent fill and no hero:** the store has no landing hero to put them on.

## Decisions I made
- **No small drawing on the detail page header:** the drawing stage already carries that screen's drawing.
- **Two additions to the markup:** a "View cart" second action on the not-found page, and an "Order summary" heading on the summary, which is now its own card. Both follow the spec's layouts.
- **One new message:** a "N fields need attention" alert above Place order after a failed checkout, per the text field spec.
- **Stage colours** come from each product's existing tone: sand and clay → apricot, olive → sage, slate and stone → lilac.
- **Extra hold frames on small drawings:** these have only 5–7 strokes, so they hold their last frame longer to reach the spec's minimum of 12 frames.
- **Stage-line opacity** sits on the whole line group rather than each line. Per-line opacity left a visible rectangle seam inside the stages.