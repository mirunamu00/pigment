The store now uses felt-tip-market@0.1.0-rc.1 on every screen: product grid, product detail, cart and checkout, order confirmation, the 404 page and the "product not found" page. The build passes and all 10 smoke tests pass. Every page was snapshotted at 1440px and 390px, light and dark, and nothing scrolls sideways. All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

## What changed
- **Tokens:** `design-system/tokens.css` is an exact copy of the package's file and loads before `src/styles/base.css`. `base.css` was rewritten to use only tokens. The old variable names (`--color-bg`, `--color-primary`, …) still work as aliases. Dark mode follows the system setting, and `data-theme="light"` or `"dark"` on the root forces a mode.
- **Fonts:** Space Grotesk (400–700) and JetBrains Mono (400) load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - `src/components/Felt.tsx`: the area header band, the plate stack behind a main button, and the price flag.
  - `src/components/LostBand.tsx`: the full-screen error band.
  - `src/components/stickers/Stickers.tsx`: original ink-outlined drawings of the store's own goods (tote, mug, parcel, key, skillet, receipt slip), a "done" word badge, and a rocking loading variant.
- **Colour per area:** Shop is lemon, Cart is periwinkle, the error pages are teal.
- **Header:** white bar with pill links (the current page is a filled pill) and a full-height black cart block. Below 1024px a two-line menu button opens a full-screen panel; Escape closes it and focus stays inside it while open.
- **Shop:** the band holds the title and the category pills, with one tote sticker at its edge. Cards are white with ink frames, lift on hover and show a price flag; "Sold out" is a pill with a status dot.
- **Product detail:** breadcrumb and title in the band, price flag, the purchase form in a white panel, variants as outline pills with pink radios, and a ruled details list with check discs.
- **Cart and checkout:** ruled item rows, a summary with a flag on the total, and form errors shown with a 2px red border and a "!" disc.
- **Empty states, error pages and confirmation:** empty states use a dashed box with a sticker. Each of these screens has exactly one plate-stack button. The confirmation shows the word badge.
- **Footer:** a black band with a headline, link columns and an email field with a pink arrow button.
- **Motion:** hover lifts the item on a hard shadow and pressing slams it flat; stickers drift as the page scrolls. All of it stops under reduced motion.
- **Docs:** `design-system/VERSION` and `components.md` (colour map, sticker subjects, where each piece is used), plus the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply or check
- **No commits:** git wasn't in the allowed commands, so the spec's one-commit-per-screen rollback isn't in place. Everything is uncommitted in the working tree.
- **Leftover file:** `src/pages/StickerSheet.tsx` is now an empty stub left from the temporary sticker preview page. I couldn't delete files with the allowed commands, so please delete it.
- **`tokens.json`:** not copied into `design-system/`; the app only needs the CSS file, and the JSON is still in the package.
- **No date in the spec:** it gives no "updated" date, so `VERSION` records today's date as the date applied.
- **Not exercised:** the loading sticker and the outline/split-band styles exist but no screen uses them (the app has no loading states or marketing pages). There is no header search because the app has no search feature.
- **Not seen:** the snapshot tool can't click through to the confirmation screen, the "added to cart" message, or a cart with items, so I haven't seen those rendered. The smoke tests do cover those flows.
- **Offline fonts:** if Google Fonts can't be reached, the font falls back as the spec allows, and the failed request may log a console error. The console-errors smoke test passed in this run.

## Decisions I made myself
- **Product images:** the old pastel placeholder tints are gone (the spec bans pastels); placeholders are now a flat grey box with an ink icon.
- **"Added to cart" message:** styled like a toast but kept inline and never auto-dismissed, so the existing behaviour doesn't change.
- **Variant choice:** outline pills rather than option cards, so the detail page stays within the limit of three pink roles.
- **Cart badge:** a white circle with an ink outline, because the spec's black counter would disappear on the black cart block.
- **"Remove" buttons:** now small outline buttons instead of text links, so they lift like other row actions.
- **New footer pieces:** the email form only shows a thank-you message; nothing is sent anywhere. The footer links (categories and Cart) are also new. Inside the footer the focus ring is white and the hover shadow is translucent white, so both show on black.
- **Bands:** pill outlines and the focus ring stay black on bands in both modes, since bands don't change in dark mode.
- **Dark-mode check discs:** they use the text colour instead of black, because black discs vanished on the black dark-mode panels.