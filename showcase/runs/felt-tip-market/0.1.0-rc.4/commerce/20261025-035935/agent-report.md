Felt-tip Market is applied to every screen of the store, in light and dark. The build passes, all 10 smoke tests pass, and the final screenshot pass of every page shows no sideways scrolling at 1440px or 390px. Routes, behavior, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's `tokens.css`, and the old variable names in `base.css` now point to the new tokens. Space Grotesk and JetBrains Mono are loaded from npm packages (`@fontsource/space-grotesk`, `@fontsource/jetbrains-mono`) rather than from Google. That way a failed font request can't put a console error into the smoke tests.
- **Signature pieces, built as reusable parts:**
  - Lift on hover and slam on press.
  - The plate stack (two colored plates behind the main button).
  - The hero action row.
  - Poster bands: hero, header and error bands, plus the black footer.
  - White boxes with ink borders, ruled lists, pills, dashed empty boxes.
  - The price flag, status pills and dots, the "!" error disc, and the "thanks" word badge.
- **Stickers:** `src/stickers/Sticker.tsx` builds them to the recipe. `kit.tsx` holds 18 original drawings: one per product (11), five for the hero, and two for empty states. Hero stickers drift on scroll, and they all stop under reduced motion.
- **Shop (`/`, lemon):**
  - A hero band with the 96px headline (48px on phones) and stickers around it: five on desktop, three on phones.
  - Below the headline, a "Browse goods" button on the plate stack beside a "View cart" button of the same height.
  - The filter toolbar in a white box, and product cards that lift, with a drawn picture of each item instead of the old placeholder.
  - Each card has a price flag and an in-stock or sold-out pill. The empty state shows a magnifier.
- **Product page (lemon):** a header band with breadcrumb and title, a large drawing, the price flag, and the purchase form in one white panel. Size and color choices are selectable cards, Add to cart is pink, the "added" message is a small confirmation panel, and the details are a ruled list.
- **Cart (periwinkle):** a header band, ruled item rows with outline Remove buttons, a price flag on the total, and a checkout panel. Field errors get a 2px red border and the "!" disc. The empty cart shows a basket drawing, and the confirmation shows the "thanks" badge. Both have a plate-stack "Continue shopping" button.
- **404 and product-not-found:** a full-screen marigold band with a 72px headline, two tilted stickers and a plate-stack "Back to the shop".
- **Top bar and footer:**
  - The top bar has nav pills (the current page is filled) and the cart as a full-height edge block.
  - Below 1024px the nav collapses into a menu button that opens a full-screen panel; Escape closes it and focus stays inside while it's open.
  - The black footer has a large headline, link columns and an email box with a pink arrow button.
- `design-system/` now holds `VERSION`, `tokens.css` and `components.md`, which records the color per area, the sticker subjects and where each piece is used. `AGENTS.md` and `CLAUDE.md` point to it.

**What I couldn't apply**
- **One commit per screen:** git wasn't in the commands I was allowed to run, so nothing is committed.
- **Temporary preview file:** I added a temporary route to screenshot a filled cart and removed it from `App.tsx`. I couldn't delete `src/pages/PreviewCart.tsx` without a delete command, so it's now an unused stub you can delete.
- **Pink closing band:** I left it out of the shop page. With the price flags, the focus halo and the footer's pink button, it would have put pink in a fourth role.
- **Loading sticker:** the rocking style exists, but no screen ever loads, so nothing uses it.
- **Card hover, checkout errors, keyboard focus:** the screenshot script only takes paths, so I didn't screenshot these states. The smoke tests do exercise these flows.

**Decisions I made myself**
- **"View cart" in the hero:** the spec pairs the main button with an input, but the store has no search. I used an outline button of the same height rather than invent a search feature.
- **Selected size/color cards:** they get a 2px black border with a pink radio dot, not the pink border the spec gives. This keeps the product page to three pink roles: Add to cart, the price flag and the focus halo.
- **Selected category chips:** they show a 2px black outline. Rule 1 says selected states use the thick border; the pill section alone would give 1px, which looks the same as hover.
- **Pink in a few places:** the "In stock only" checkbox fills pink when ticked, as the checkbox spec says. In dark mode, the black buttons (including the cart block) turn pink as the spec requires. This can put a page slightly over the "three pink roles" guideline.
- **New footer copy and form:** the footer headline, link columns and email signup are new. The email box only checks the address and shows a thank-you line; nothing is sent anywhere.
- **Card titles:** they aren't underlined, because the whole card is the link.