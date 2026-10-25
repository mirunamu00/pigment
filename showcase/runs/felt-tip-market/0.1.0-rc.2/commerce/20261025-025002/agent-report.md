I've restyled every screen with felt-tip-market 0.1.0-rc.2, in light and dark. The build passes, all 10 smoke tests pass, and nothing scrolls sideways. I checked the screenshots at 1440px and 390px, light and dark, and fixed what was wrong.

**Not committed.** The spec asks for one commit per screen, but `git` isn't in the commands you allowed, so all changes are uncommitted in the working tree. `package-lock.json` (created by `npm install`) is also untracked.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied into `src/styles/`. The old variable names in `base.css` still work as aliases of the tokens. Space Grotesk and JetBrains Mono load from Google Fonts.
- **Reusable pieces:** `src/styles/felt-tip.css` holds the lift-and-slam effect, the plate stack, bands (including header bands with a sticker), ink boxes, ruled groups, pills, dashed empty boxes, the price flag, status pills, and styled inputs, selects, checkboxes and radios. All motion stops under reduced motion.
- **Sticker kit** (`src/components/art/`): one helper draws any shape as a thick object (back, side band, face, inner strokes). There are 18 original drawings:
  - five store objects for the hero: parcel, receipt, thread spool, ticket, sewing button
  - two for empty states: an open empty box and an empty magnifier
  - one per product (11) as its image, so none uses a picture glyph or a grey fill
  - a "done" word badge for the order confirmation
- **Area colors:** Shop is lemon, Cart is periwinkle, and the error pages are marigold.
- **Screens:**
  - **Shell:** top bar with pill nav and a black cart block on the right; below 1024px a menu button opens a full-screen panel (keeps focus inside, Escape closes). The footer is a black band.
  - **Home:** hero band with five drifting stickers and a plate-stack button, a white toolbar, and lifting product cards with a price flag.
  - **Product detail:** lemon header band with breadcrumb, option boxes for variants, and an inline "added" confirmation with a hard shadow.
  - **Cart:** periwinkle band with a receipt sticker, ruled item list, price flag on the total, error states on the form, and a dashed empty state with a plate-stack button.
  - **404 and unknown product:** a full-screen band with two stickers.
- Every route, `data-testid`, test label and accessibility attribute is preserved. I added `design-system/` (VERSION, tokens, `components.md`) and the one-line pointer in `AGENTS.md` and `CLAUDE.md`. The temporary preview routes I used for checking are removed.

**Could not apply**
- The hero's search box: the store has no search, so I left it out.
- The error summary with links to each field: checkout still focuses the first invalid field, as before.
- Loading states: the app never loads anything, so the rocking sticker and dashed loading box exist only as CSS.

**Decisions I made**
- **Selected variant border:** the chosen variant gets a 2px ink border instead of pink, to keep the detail page within three pink roles. The radio button itself is still pink.
- **Footer email signup:** I added it because the spec requires one in the footer. Submitting only shows "Thanks, you are on the list."
- **Shop marked current on product pages:** product pages mark Shop as current with `aria-current="true"`. To do this I replaced the nav's NavLink with a plain Link.
- **Cart badge colors:** the cart count is inverted because it sits on the black cart block.
- **Added text:** I added a one-line lead (the product summary) to the detail band, a "Browse 11 goods" hero button, and a "View cart" button in the added confirmation.
- **Footer focus ring:** it is white so it shows on the black footer.
- **Remaining fixed sizes:** two layout sizes stay as fixed pixels (the 80px/64px header height in the error page's height calculation, and a 720px text width), and the badge text has an SVG font size taken from the spec's own recipe.