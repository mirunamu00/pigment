Hardlift is applied to every screen. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I opened every screenshot, plus temporary captures of the filled cart with checkout errors, the empty filter result, both not-found pages and the add-to-cart toast.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package file. It gives light and dark from the OS setting, with a `data-theme` override. The old variable names in `base.css` still work as aliases. DM Sans and Noto Sans KR (the CJK fallback) load from Google Fonts.
- **Signature elements** (all in `src/styles/hardlift.css`, all built to the spec's recipes):
  - **Lift buttons and cards:** a ghost-button variant, 2px icon and row-action lifts, and the hero-CTA plate, which no screen here needs.
  - **Bands:** a `<Band>` component, one color per section.
  - **Pills:** nav, filters and option choices.
  - **Stickers:** drift, tag wall, turning coin and draw-on motion, and a toast. All of it stops under reduced motion.
  - **Drawings** (`Sticker.tsx`): 11 different product drawings plus 4 figures (tag, coin, parcel, signpost, question blob), so no two items share one.
- **Header:** 80px, white, pill nav with the current page filled in ink, and a ghost cart button with a pink count badge.
- **Product grid:** yellow band holding the title and category filter pills, then a toolbar (in-stock checkbox, select with chevron). Whole product cards lift on hover, have pink price tags, and use a colored square with a sticker instead of a photo. The no-matches state has a sticker and one pink button.
- **Product detail:** breadcrumb above the yellow band, framed image, pink price tag, size/color pills, ghost stepper buttons, pink "Add to cart". The "Added…" message is now a bottom-left toast with a close button; Escape also dismisses it.
- **Cart:** teal band, cart lines in a card, 2px-lift Remove buttons, bold total. Inputs get a pink focus ring. Errors show an icon and a red border, plus one summary line at the top of the form. The empty cart and the order confirmation each get a sticker and one pink button.
- **Not-found pages:** red band, sticker, pink "Back to the shop".
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the one-line pointer.

Every route, label, form field, `data-testid` and ARIA attribute is unchanged.

**What I could not apply**
- **One commit per screen:** git wasn't on the list of commands I was allowed to run, so nothing is committed. All changes are uncommitted in the working tree.
- **Turning-coin loader:** it's built (`CoinLoader`), but the app has no loading states, so it isn't used anywhere.
- **Hero, tag wall and draw-on:** there's no landing page, so these exist only as CSS.
- **Ghost cancel button on the form:** the checkout form has no cancel action, and I didn't add one.

**Decisions I made**
- **Band colors:** Shop (grid and detail) is yellow, Cart is teal, error pages are red.
- **Placeholder colors next to a band:** the spec asks for varied colors on photo placeholders, but it also says never to put two band colors on one screen. I treated the placeholders as images, not bands, so they keep their own colors.
- **Phone header:** it wraps into two rows instead of using a menu dialog, since there are only two nav links.
- **Sticker outlines:** on colored squares they stay black in dark mode, and glyphs on pink or colored faces stay black. The recipe's "currentColor" would turn them light in dark mode.
- **Coin rim:** the recipe's rim line sits inside the coin face, so I moved it to the true tangent point and added the second rim line the text describes.
- **Spacing names:** the old `--space-4` and `--space-8` now mean 4px and 8px, because they clash with Hardlift's pixel-named spacing. Nothing in the app still uses the old values.
- **Item names in the cart:** they're underlined but shown in the main text color rather than the gray link color, so they still read as titles.