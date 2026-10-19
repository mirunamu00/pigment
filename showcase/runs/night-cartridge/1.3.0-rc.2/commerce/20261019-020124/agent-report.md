I've restyled the store in Night Cartridge 1.3.0-rc.2 on every screen. The build passes, all 10 smoke tests pass, and the final snapshot run found no page that scrolls sideways at 1440px or 390px. The control heights I measured match the spec (chips, select and checkbox are all 40px on mobile).

**What changed**
- **Look:** the design-system tokens are copied verbatim into `design-system/tokens.css`. The stylesheet `src/styles/base.css` is rewritten: square corners, hard shadows only, the pixel font (loaded from the CDN link the spec gives), and the spec's motion rules. All animation stops under reduced motion and when the new "Animation on/off" switch in the header is off; the switch remembers its setting.
- **Pixel art:** a small drawing engine (`src/pixel/`) uses the spec's helper functions. It draws the outline, highlight and shade of each sprite automatically. The app's "world" is an outfitter's yard at night, and each kind of screen gets its own scene:
  - **Product grid:** a strip with the general store.
  - **Product detail:** a banner with a stockroom. Its sign changes by category: BAGS, WEAR, COOK, GEAR.
  - **Cart and order confirmation:** a strip with a parcel office.
  - **Empty states and not-found:** three small square scenes (the spec's "vignettes"). The not-found one has its lights off and one blinking beacon.
  - **Footer:** the grass strip on every screen.
- **Product pictures:** all 11 products are drawn as pixel sprites, each 21 units wide, which keeps them at 40–50% of the picture frame at every grid width (the spec's rule).
- **Screens:**
  - **Header:** the gold ▶ marker on the current nav item and the dithered rule under the header. Under 1024px the nav moves into a menu panel that closes on Escape and keeps keyboard focus inside while open.
  - **Product grid:** framed windows, filter chips with category colours, a styled checkbox and select, and cards with a coloured top bar.
  - **Product detail:** a two-column layout, ◀ ▶ quantity steppers, and one gold button per screen.
  - **Checkout:** a short shake and a "!" message on invalid fields.
  - **Cart:** a free-shipping progress bar (block meter) towards the $100 threshold.
- **Docs:** `design-system/VERSION` and `components.md` describe the world, scenes and category colours. `CLAUDE.md` and `AGENTS.md` now point to `design-system/`.
- **Unchanged:** every route, label, form field, `data-testid` and accessibility attribute. I only added things, such as `role="alert"` on error messages.

**What I couldn't apply**
- **Light theme:** the spec is dark only, so there is none. The "light" screenshots look the same as the dark ones.
- **No commits:** the spec asks for one commit per screen, but git isn't among the commands I was allowed to run. All changes are uncommitted.
- **Leftover file:** for the same reason I couldn't delete files. The temporary review route is gone from the app, but `src/pages/ReviewPage.tsx` is now an empty placeholder you can delete. The old stroke icons in `src/components/Icons.tsx` now just re-export the pixel icons.
- **Scene numbers by hand:** I checked the spec's spacing rules from my placement constants. The ground height under the side props comes from a seeded random skyline, so I didn't calculate it exactly.

**Decisions I made myself**
- `/` is treated as a catalogue page (a strip scene) rather than a landing page with a large hero, since the app has no landing page.
- No search button or "Pixel body" switch in the header: the app has no search and no long text.
- Each category's colour also tints its item sprites: Bags cyan, Apparel violet, Kitchen blue, Accessories amber (the spec's fixed order).
- The error screens' only action, "Back to the shop", is the gold button, in place of the spec's "Retry".
- On mobile, the Remove button in each cart line is the same 40px height as the stepper beside it, as the spec's same-row rule requires.