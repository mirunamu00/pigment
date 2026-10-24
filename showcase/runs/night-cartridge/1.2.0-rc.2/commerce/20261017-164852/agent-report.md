Night Cartridge is applied to every screen: product grid, product detail, cart (empty, filled, errors, confirmation) and not-found. The build passes, all 10 smoke tests pass, and the final snapshot run reports no sideways scroll at 1440px or 390px. I checked the screenshots for every page, plus the filled cart, the checkout errors and not-found on temporary routes, which I've since removed.

**What changed**
- **Base setup:** `tokens.css` is copied unchanged. The pixel fonts load from the links the spec gives, and type, focus ring, motion and the no-rounding rule are set once at the root. The old light palette is gone.
- **Art:** I built the store's "market street" world in `src/art/` from the spec's recipe. It has a shopfront, stall, kiosk, trees, crates, planter, lamp and handcart, and each of the 11 products is drawn as its own pixel sprite instead of the old grey placeholder.
- **Reusable pieces** (`src/components/Pixel.tsx`, `Icons.tsx`): marker, window, scene, vignette, ground strip, block meter, callout, and pixel icons. The scenes move in steps (twinkling stars, blinking lights, a drifting cloud, a bobbing shop sign, a rare bird). All of it stops under reduced motion and with the header's "Animation on/off" switch, which remembers your choice.
- **Header:** dither rule under it, the blinking marker on the current nav item, and a menu button below 1024px that opens the nav as a small window.
- **Grid:** scene strip in a window with the title below; filter chips with category colour squares (selected shows the marker instead); category-coloured card top bars; a scene for the empty state.
- **Product detail:** each product gets its own banner (its category colour and sign, and the item itself in the shop window). The picture window is sticky, the price is 48px, and "Add to cart" is the page's one gold button. Details sit under a dithered heading.
- **Cart:** scene strip, order summary in a window with a free-shipping meter against the real $100, and the checkout form in a window with a gold "Place order". Errors show the "!" icon and nudge the field once.
- **Not found / product not found:** a window with an unlit scene and one blinking red light.
- **Docs:** `design-system/` (VERSION, tokens, components.md), plus `AGENTS.md`, `CLAUDE.md` and a README note.

Every route, `data-testid`, aria attribute and the text the tests use is unchanged. I added a few things: `role="alert"` on error messages, an "All fields are required." note, and meta lines under the page titles.

**What I couldn't apply**
- **Light theme:** the spec is dark only and forbids a light theme or switch, so the light and dark screenshots are identical.
- **One commit per screen:** git wasn't in the commands I was allowed to run, so nothing is committed.
- **Pixel body switch:** not added, because no screen has long prose or dense tables.
- **Hand-composed banners:** the 11 product banners come from one layout, mirrored for every other product, rather than 11 separate hand-placed scenes. Each still differs in colour, sign, the item shown, lit windows and skylines.
- **Fonts:** they load from the CDN links in the spec, so the page needs network access to look right.

**What I decided myself**
- **Colours:** bags are cyan, apparel violet, kitchen blue, accessories amber.
- **Stepper buttons:** − and + became ◀ ▶ markers, as the spec asks. Their accessible names are unchanged.
- **"Back to the shop":** on not-found pages it's a framed button with the marker, not a gold "Retry", because there is nothing to retry.
- **Cart layout:** I added a free-shipping meter. "Items" and "Checkout" now open with ruled 32px headings, and Remove became a small framed button.
- **Animation switch:** its "Animation on/off" label is visually hidden under 600px; screen readers still get it and the icon shows the state.