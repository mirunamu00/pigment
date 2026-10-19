Hardlift is applied to every screen of the store. The build and typecheck pass, all 10 smoke tests pass, and the final snap run shows nothing scrolling sideways. I checked the screenshots at 1440px and 390px, in light and dark.

**Nothing is committed.** The spec asks for one commit per screen, but `git` isn't one of the commands I was allowed to run, so all changes are uncommitted in the working tree.

## What changed
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. The old variable names in `base.css` are aliased onto the new tokens. DM Sans (400 and 700) loads from Google Fonts. Light and dark follow the system setting, and `data-theme` on the page forces one.
- **Signature elements**, built to their recipes as reusable pieces in `src/styles/signature.css`, `Band.tsx`, `Stickers.tsx` and `ProductImage.tsx`:
  - **Lift buttons:** Add to cart, Place order and the empty-state and error buttons are pink. The header cart button, the quantity buttons, Remove and the toast close are outline buttons; the small ones lift 2px.
  - **Product cards:** the whole card is one link and lifts with the hard shadow.
  - **Color bands:** Shop and product pages are yellow, cart and order confirmation are periwinkle, and both not-found pages are red. Text inside a band is ink, and the focus ring there is ink too.
  - **Pills:** header nav (current page is the filled pill), category filters inside the Shop band, and the variant choices.
  - **Pink price tags and badges.**
  - **Stickers:** each of the 11 products has its own drawing on a band-colored square, and each empty or error state has its own 160px sticker.
  - **Toast:** "Added to cart" is now a bottom-left toast with the hard shadow that slides up 16px.
  - **Motion:** all of it stops under reduced motion.
- **Forms:** inputs have the pink focus halo, errors show an icon next to the message, and the select has a custom chevron.
- **Docs:** added `design-system/` (`VERSION`, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md`.

## Fixes found by checking the screenshots
- The old `--space-4` and `--space-8` names meant 16px and 32px. They clashed with Hardlift's pixel-named tokens and made every pill and badge twice as tall, so I dropped those two aliases.
- The header measured 83px; it is now exactly 80px.
- On mobile, the Remove button stretched across the cart line; it no longer does.

## What I couldn't apply
- **Landing hero, drifting shapes and tag wall:** the store has no landing page, so they aren't used. The CSS for them exists.
- **Loading coin:** built as `LoadingCoin` but unused, because nothing in the app loads asynchronously.
- **Search field in the band:** the app has no search feature, so I didn't add one.
- **Mobile menu dialog:** with only two nav links, the pills wrap onto their own row on mobile instead.
- **One band color per screen:** the spec also requires band-colored squares behind product stickers, so grid and detail pages show several band colors. I followed the placeholder rule.

## Decisions I made myself
- **Checkbox colour:** the spec contradicts itself on the checked checkbox. I followed the component section and the changelog: ink fill, not pink.
- **Small additions:** a one-line error summary at the top of the checkout form ("Fix 3 fields…"), and a dismiss button plus Escape to close the toast.
- **Product detail layout:** the product title and breadcrumb moved into the band, with the price tag above the description.
- **Title links:** links on cart item names are ink with an underline, not the gray link color.
- **Version date:** `VERSION` uses 2026-10-19 (the reference capture date), because the spec gives no update date.

Hover, toast, error and loading states can't be captured on the normal routes, so I checked them on a temporary review page and removed it afterwards.