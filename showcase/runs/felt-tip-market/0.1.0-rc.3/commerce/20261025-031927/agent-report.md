I've applied Felt-tip Market to every screen, in light and dark. The build passes, all 10 smoke tests pass, and the final screenshot run reports no sideways scrolling.

**What changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of the package's token file and is loaded first. The project's old variable names still work and now point at the new tokens. Dark mode follows the system setting.
- **Fonts:** Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`. That needs network access; if the fonts fail to load offline, the console error would break the "no console errors" smoke test.
- **Reusable signature pieces:** lift and slam, the plate stack, bands, ink boxes and ruled groups, pills, the dashed empty box, the price flag, status pills and the toast. All motion stops under reduced motion.
- **Stickers:** 20 original drawings of the store's own things, each built thick (face, back and side band). There are 5 for the home hero, one per product (11), 2 for empty states and 2 for error pages, plus a "done" word badge.
- **Top bar:** the current nav item is a filled pill, and Cart is a full-height black block at the right (pink in dark). Below 1024px a two-line menu button opens a full-screen menu, which closes on Escape and keeps keyboard focus inside it.
- **Home:** a lemon hero with the 96px headline, five stickers (four on phones) that drift on scroll, and a plate-stack "Browse goods" button. The filters sit in one white ink box. Product cards lift on hover, each has its own drawn image and a pink price flag. The no-results state shows an empty magnifier.
- **Product page:** a lemon header band with breadcrumb, title and summary, then a large drawing, a price flag, variant options with a pink selected border, the quantity stepper and Add to cart. The added-to-cart message is a toast panel, and details are a ruled list.
- **Cart:** a periwinkle header band, ruled item rows, a price flag on the total, and a checkout panel. Field errors show a 2px danger border and a "!" disc. The empty cart shows an empty basket and a plate-stack "Continue shopping". Order confirmation is a periwinkle band with the "done" badge.
- **404 and unknown product:** a full-screen marigold band with a map and a compass.
- **Footer:** a black band with a headline, link columns and an email field with a pink arrow button.
- **Docs:** `design-system/` now holds `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` each have the one-line pointer.

I checked every route at 1440px and 390px in light and dark. I also checked the cart with items, the order confirmation and the 404 through a temporary route, then removed it. Measurements confirm the phone hero stickers are 120px, cropped by one side edge only, and clear of the text.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't in your allowed commands, so everything is uncommitted.
- **Leftover file:** I couldn't delete files either, so `src/pages/ReviewPage.tsx` remains as an empty stub. It's safe to delete.
- **No hero input:** the store has no search, so the hero has only the CTA, not the bordered input the spec pairs with it.
- **No loading states:** the app has none, so the rocking loading sticker is built but not used. The header-band sticker is also built but not used, since no screen is an overview or dashboard.
- **Not snapped:** the snap tool only captures pages, so I didn't take screenshots of the hover state or the checkout errors.

**Decisions I made myself**
- **Footer email signup:** I added the email field the spec's footer calls for. It only shows a thank-you line in the browser; nothing is sent anywhere.
- **Shop stays current on product pages:** I replaced the nav links with ones that keep Shop highlighted on product pages. Test IDs are unchanged.
- **Error band colour:** errors use marigold, since they belong to no area.
- **Pressed category chips** also show a small check, so the selected one doesn't look the same as a hovered one.
- **Things on bands and in the footer:** on bands, text, borders and focus rings keep their light-mode colours in dark mode. In the footer the focus ring is white.
- **Sticker outline:** the outline is drawn around the whole sticker shape at once, so the top edge of each face is about 3px against 2px elsewhere.
- **Hero and 404 between 768px and 1023px** use the phone layout (stickers above and below the text), because side stickers would overlap the headline there.
- **Pink count:** the product page has pink on the button, the flag and the selected variant, plus the focus halo while an input is focused. That makes four pink roles at moments, one more than the spec's limit of three.