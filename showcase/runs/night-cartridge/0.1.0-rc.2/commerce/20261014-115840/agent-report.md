The restyle is done. The build passes, all 16 screenshots (4 pages × 1440/390 × light/dark) show no sideways scroll, and on the second round they match the spec in both themes. I could not run the smoke tests: Playwright isn't on the list of commands I was allowed. Every `data-testid`, label, route, form field and ARIA attribute is kept, but the tests still need a run on your side (`npm run test:e2e`).

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` as-is, so no value is retyped. NeoDunggeunmo loads from the CDN link the spec gives. Dark mode follows the system setting.
- **Base styles:** `src/styles/base.css` is a full rewrite. It has the spec's root block (no radius, no transitions, everything stops under reduced motion or with the Animation switch off), pixel type at weight 400, the 4px gold focus ring, the stepped animations, and all the stage, marker and window CSS.
- **Pixel art** (`src/art/`): the spec's drawing helpers, plus one that adds the outline, top-left highlight and bottom-right shade to any shape automatically. The app's world is a market street: stalls, shop fronts, a lamp, a lit sign, a hand cart, crates and barrels. There are three strip variants, one banner, three vignettes and the footer ground strip. Each of the 11 products is drawn as a 48×48 sprite in its category colour, replacing the grey image boxes.
- **Reusable pieces** (`src/components/Pixel.tsx`): scene, ground strip, marker, window, dither rule, block meter, callout, and the "Animation on/off" header button (saved in `localStorage`). The icons are now pixel icons.
- **Header:** sticky, with the pixel logo, a dither rule underneath, the marker on the current nav item, the Animation switch and the cart count.
- **Product grid:** strip scene window; filter chips with colour squares (a chip shows the marker instead of its square when selected); pixel checkbox and select; cards with a colour bar on top and the marker on hover. When no products match, it shows a vignette and a "Clear filters" button.
- **Product detail:** banner scene window with the category, title, summary and a meta line; 48px price; the purchase form in a window with square radios, ◀ ▶ quantity buttons and the gold "Add to cart"; a callout after adding; a "Details" heading on the dither rule.
- **Cart:** strip scene window; an items-and-totals window with a free-shipping block meter; a checkout window with the gold "Place order", pixel warning icons on errors and a small shake on failed submit; a vignette when the cart is empty; the order confirmation in a scene window.
- **Not found** (page and product): a vignette with the lights off and one red beacon, inside a window, with a gold "Back to the shop".
- I also added `design-system/` (`VERSION`, `components.md`) and `AGENTS.md` / `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** git wasn't on the allowed command list, so everything is uncommitted in the working tree.
- **The menu-button header under 1024px:** under 600px the header wraps to two rows instead, and the button labels become hidden text for screen readers.
- **The spec's `role="alert"` on errors:** I didn't add it, because the spec also says not to add live regions a screen didn't already have.
- **The other fonts and the Pixel body switch:** I loaded only the pixel font. The store has no long prose or code, which is when the spec calls for them.

**What I decided myself**
- I replaced the visible "−" and "+" in the quantity stepper with ◀ ▶ markers, as the spec asks; their `aria-label`s are unchanged.
- The main nav marker doesn't blink. The spec allows it to, but every screenshot caught it in its hidden half.
- Wood, leather and cloth details in sprites use the spec's earth and highlight art colours. Product sprites use the category colour rather than the variant colour (Olive, Navy, …).
- I added visible text the original pages didn't have:
  - a summary and a "4 size options · In stock" line in the detail title block;
  - an "Order placed" label on the confirmation;
  - "$48.00 of $100.00 for free shipping" above the cart meter.
- On the detail page the price and description moved into the image column so the two columns end level; all `data-testid`s are unchanged.
- Some scenes have 13 to 14 props rather than the spec's 6 to 12, because the spec's spacing limits can't fill 720 units otherwise.