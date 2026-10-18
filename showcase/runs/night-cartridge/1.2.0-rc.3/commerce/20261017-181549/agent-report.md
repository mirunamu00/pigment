I've applied night-cartridge@1.2.0-rc.3 to every screen. The build passes, all 10 smoke tests pass, and the last full snapshot run reported no sideways scroll. I checked the screenshots at 1440px and 390px. The spec defines dark only, so the light and dark snaps look the same.

**What changed**
- **Base setup:** the tokens are copied into `design-system/tokens.css`, and `src/styles/base.css` is rewritten on top of them. It includes the spec's root block that stops motion under reduced motion, plus the zero-radius, no-transition rules and the pixel type base. The 4px gold focus ring and both pixel fonts (NeoDunggeunmo and its Code version, loaded from the spec's links in `index.html`) are in place.
- **Signature pieces:**
  - The scene helpers are ported to TypeScript in `src/art/`, with builders for market-street props and 11 product sprites.
  - `src/components/Pixel.tsx` holds the reusable pieces: the scene frame, vignette, ground strip, ▶ marker, block meter and callout.
  - Icons are now pixel icons.
  - The header has an "Animation on/off" switch that is saved between visits. All motion is stepped: stars twinkle, lights blink, a cloud drifts, a bird flaps, a shooting star appears rarely and a beacon blinks on error screens. It all stops under reduced motion or when the switch is off.
- **Every screen:** sticky header with the dither rule, the ▶ marker on the current nav item (it blinks), and a mobile menu that traps focus. Every footer has the ground strip.
- **Shop grid:** market-street strip in a window above the title, filter chips with category-colour bullets, cards with a colour bar and the product drawn as a sprite. The empty state uses a vignette.
- **Product detail:** a banner per product, where the category's shop shows a sign word (BAGS, WEAR, COOK, KEYS) and the product sits in its lit window. It also has a sticky picture, a 48px price, pixel radio buttons, ◀ ▶ quantity steppers, a gold "Add to cart", a success callout, a ruled "Details" heading and ◀ ▶ prev/next links.
- **Cart:** its own strip, a totals window with a free-shipping meter, and the checkout form in a window with a gold "Place order". Field errors show a "!" icon and the fields shake once on a failed submit.
- **Not found:** a vignette with the lights off and a beacon, plus a gold "Back to the shop".
- **Unchanged:** routes, behaviour, labels, `data-testid`s and ARIA attributes, except where I added them (listed below).
- `design-system/` now has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` have the pointer line.

**What I could not apply**
- **No commits:** the spec asks for one commit per screen, but git isn't one of the commands I was allowed to run. All changes are uncommitted in the working tree.
- **Leftover file:** the temporary review route is removed, but `src/pages/ArtReview.tsx` is still on disk because deleting files isn't allowed either. Nothing imports it, so it isn't in the build; please delete it.
- **No light theme:** the spec defines dark only.
- **Verification report incomplete:** I didn't do the full per-scene write-up from the spec's Verification section, the required variant and sprite-percentage tables, or an axe accessibility pass. The scene numbers I did check came from a temporary review page: flat colour runs are 12 units or less in the strips and 30 or less in the banners, and the tall trees and towers top the far ridge by 5.

**Decisions I made myself**
- `/` is the store grid, so it gets a strip, not the full hero.
- Cart lines use plain 2px buttons, not the danger style, because removing a line has no confirmation dialog.
- No "Pixel body" switch, because no screen has long prose or tables.
- The free-shipping meter shows its value as a 12px caption, because the 48px total is directly above it.
- Strip ridges use narrower height ranges inside the spec's, so no flat colour run passes 12 units.
- **Additions:** a few small UI items (a "goods · departments" caption, product meta lines, prev/next links and `role="alert"` on field errors).
- **Duplicate scenes:** the empty cart and empty grid states show a vignette under the page strip, so those screens have two scenes.
- **Font links:** they use `@latest` as the spec gives them.