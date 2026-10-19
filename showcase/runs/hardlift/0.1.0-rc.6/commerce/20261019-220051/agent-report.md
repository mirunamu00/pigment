Hardlift is applied to every screen: the product grid, both product detail pages, the cart (empty, with items, and with form errors), the order confirmation and both not-found pages. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 390px or 1440px. I checked the screenshots in light and dark at both widths.

**What changed**
- **Tokens and font:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css`, which covers light, dark and `prefers-color-scheme`. DM Sans loads from Google Fonts in `index.html`. The old variable names in `base.css` are kept as aliases of the new tokens, and `base.css` was rewritten to use tokens only.
- **Signature elements** (`src/styles/hardlift.css`, built to the spec's recipes):
  - **Lift buttons:** solid, ink, ghost, icon (2px lift), row-action and small variants, plus the linked-card lift and the hero plate.
  - **Pills:** used for navigation, filters and options.
  - **Color bands:** a reusable `Band` component.
  - **Stickers:** the four loop animations from the spec are included. All motion stops under reduced motion.
- **Where they appear:**
  - **Header:** 80px tall, with pill navigation (the current page is ink-filled). The cart button is a ghost lift button with a pink count tag.
  - **Shop pages:** a yellow band with breadcrumb, title and the category filter pills, which scroll sideways on phones. Product cards lift as a whole when hovered. Prices are pink tags. The checkbox and select are styled to the spec.
  - **Product photos:** each placeholder is now a band-colored square with its own drawing (tote, backpack, sweater, mug, skillet and so on). The generic image icon is gone.
  - **Cart pages:** periwinkle band. Inputs show the pink focus ring. Errors show an alert icon and message, and one summary line at the top of the form. "Place order" is the one pink button, and "Remove" is a small ghost button.
  - **Errors and empty states:** not-found pages use the red band. Empty and error states each have their own 160px sticker, one sentence and one pink button.
  - **Add to cart:** the "Added…" message appears next to the button rather than as a toast.
- **`design-system/` and pointers:** the folder holds `VERSION` and `components.md`, which says where each piece is used and how to reuse it. `AGENTS.md` and `CLAUDE.md` each contain the one-line pointer.

**What I could not apply**
- **One commit per screen:** git isn't among the commands I was allowed, so nothing is committed.
- **Leftover files I couldn't delete:** I can't delete files with the allowed commands. `scratch-detail.txt` in the project root was created by mistake. `src/pages/PreviewCart.tsx` was a temporary preview page and is now an empty module. Its route has been removed. Please delete both files.
- **Tokens in `design-system/`:** I didn't copy them there. `components.md` points to `src/styles/tokens.css` and the package's `tokens.json` instead of keeping a third copy.
- **No landing hero, tag wall, loading state or toast:** the app has none of these contexts. Their CSS exists for reuse but nothing uses it yet.
- **Mobile menu dialog:** with only two links, the navigation pills stay visible on a second header row instead.
- **Clashing name:** `--space-4` and `--space-8` existed in the old styles as 16px and 32px. They now mean the Hardlift values, 4px and 8px.

**Decisions I made**
- **Band colors:** the shop pages (grid and detail) use yellow, the cart and confirmation use periwinkle, and errors use red.
- **Band colors in product photos:** the spec asks for varied band colors in placeholders but also forbids two band colors on one screen. I read that ban as applying to header bands, so the photos use varied band colors.
- **Outline color on bands:** inside a band, the focus ring and pill outlines use the band's ink color. In dark mode the pink ring and light outline wouldn't be visible on yellow.
- **Placeholder alt text:** placeholders keep their existing `role="img"` and alt text so accessibility attributes are preserved. Only the drawing inside is hidden from screen readers.
- **Variant radios:** they are visible dots inside pills, and the selected dot is ink rather than pink. I had to place the radio above the pill's enlarged tap area, which had been blocking clicks in the tests.
- **Additions the spec suggests:** a one-line error summary at the top of the checkout form, and the product title moved into the band. All test ids and visible labels are unchanged.