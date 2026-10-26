Morning Shapes 0.1.0-rc.4 is applied to every screen of Fieldhouse Supply, in light and dark. The build and typecheck pass, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked the final screenshots of every page, desktop and mobile, light and dark, against the spec.

To see states the four routes don't show, I used a temporary preview route and then removed it: the filled cart, checkout errors, the order confirmation, the no-results panel and the 404 page. `App.tsx` is back to the original.

**What changed**
- **Tokens and fonts:** `tokens.css` copied unchanged into `src/styles/`, and the old CSS variable names still work as aliases. Figtree and DM Mono load from local font packages (`@fontsource`) rather than Google Fonts, so a page never logs a font-loading error offline. These are fonts, not UI libraries. Dark mode follows the system setting, and `data-theme` on the root forces either mode.
- **Hues:** Shop is yellow and Cart is blue; the footer and error pages are cream. Product categories get their own hues: Bags yellow, Apparel blue, Kitchen green, Accessories orange.
- **Reusable pieces (`src/components/ms/`):**
  - colour bands with curved edges, and colour panels
  - the shape kit: crescent shading, sparkles, clouds, spot plates
  - breathing glyphs and the pop-dots loader
  - the pill buttons on their 2px ledge
  - the vignette and the fade-in helper

  All motion stops under reduced motion, and glyphs pause when off-screen.
- **Shop (`/`):**
  - Yellow header band whose art is an animated vignette of shop UI cards on desktop and a shopping-bag cluster on phones.
  - Filter pills with category dots; the selected one is ink with a white dot.
  - Cream cards with no border, each showing a cover in its category hue.
  - A cream no-results panel with its own illustration.
- **Product detail:** the header band is cream, as the spec requires when a large cover follows, with a price-tag cluster. Variant options are tiles whose glyph pictures the label: a growing disc for sizes, a colour swatch for colours. "Add to cart" is the one blue pill. The added message is styled as a dark pill toast with a sparkle, and a spool plate sits by "Details".
- **Cart:**
  - Blue header band with a basket cluster and a white "Keep shopping" pill.
  - Cream items panel with small covers, quantity steppers and cream "Remove" pills with a red label.
  - Checkout fields on white, with an alert mark on each error; "Place order" is blue.
  - The empty cart and order confirmation each get their own illustration, and the confirmation has an orbiting sparkle.
- **Shell and error pages:** a sticky white top bar that gains a shadow once you scroll, with a dot in the area's hue on the current link. On phones it is a single 64px row with a menu button; the menu closes on Escape and keeps keyboard focus inside it. The footer is a cream band with a rising curve, link columns and a dark bottom bar with a back-to-top button. 404 and "product not found" share a cream error band with the illustration the spec prescribes.
- **Docs:** `design-system/` (version, tokens, `components.md` with the hue map and where each piece is used), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **No commits:** git wasn't among the commands I was allowed, so all changes are uncommitted rather than one commit per screen.
- **No newsletter signup in the footer:** the spec's footer has one, but there is no backend, so it would be a fake form. The footer has the link columns and bottom bar only.
- **Vignette not visible in the screenshots:** the snap is taken before its cards finish building in. I measured the cards and they are present and laid out correctly.

**Decisions I made myself**
- Product pages light the Shop nav dot, without changing which link is marked as the current page.
- Filter pills and quantity buttons are 48px rather than the 40px toolbar size, to keep touch targets at 44px or more.
- On yellow, orange and pink bands the keyboard focus ring is ink, because the dark-mode yellow ring would disappear on them.
- Colour-swatch hues are approximations from the system's art colours: olive shows as green, brown and rust as orange, "Stripe" as a two-colour disc.
- The confirmation toast stays in the page flow rather than floating at the bottom, so the existing `data-testid="added-message"` and its text keep working.
- On phones the toast's corners become less round so wrapped text fits.
- Header bands keep the spec's minimum height, which leaves some empty space under short titles on desktop.