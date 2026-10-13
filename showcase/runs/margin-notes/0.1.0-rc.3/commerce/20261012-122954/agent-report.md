I applied Margin Notes 0.1.0-rc.3 to all four captured screens: the product grid, product detail (both color and size products), and the cart. Each was checked at 1440px and 390px in light and dark. The build and typecheck pass, and `node pigment-snap.mjs` reports no page that scrolls sideways. **I could not run the smoke tests**, because `npx playwright test` isn't on the allowed command list. Instead I checked each test by hand against the new markup: every `data-testid`, route, label, heading name, ARIA attribute and form field is kept, and the hidden native radios and checkbox can still be clicked and focused.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package file (confirmed with `diff`). The four fonts the spec names (Geist, Geist Mono, Instrument Serif italic, Caveat) are now served from the app itself through `@fontsource` packages, so there are no runtime font requests. Old CSS variable names still work and point to the new tokens. Dark mode follows the system setting or `data-theme`.
- **Shared parts:** the watercolor filters are added once at the app root, and the header has the spec's container and gutters. Buttons, fields, select, checkbox, segmented control, stepper, badge, card, callout, image placeholder, empty states and the mobile bottom action bar are rebuilt with every state the spec lists.
- **Home:** watercolor bloom behind the header, the title "Shop all *goods*" with one serif word, a pencil note "new this week" beside the intro line, and black ink filter chips. On mobile the chips scroll in their own strip. Cards are linked, with a hover ring and focus outline. The empty-filter state is a plain panel.
- **Product detail:** 7/5 column layout, a segmented control for variants, a single-piece quantity stepper, and spec rows where only the digits are mono. On mobile, Add to cart sits in a sticky bottom bar.
- **Cart:** line rows with thumbnails, mono amounts, a summary and a checkout panel. Field errors show an icon, and a danger message ("N fields need attention") appears above the form after a failed submit. The order confirmation has a success badge.
- **Not found pages:** a pinned panel with tape, a bloom and a pencil note.
- **Docs:** `design-system/` contains `VERSION`, `tokens.css` and `components.md`, which records which screen gets which decoration and every decision below. `AGENTS.md` and `CLAUDE.md` now carry the spec's pointer line, and the README's styling section is updated.

**What I could not apply**
- **One commit per screen:** git commands aren't allowed in this run, so everything is uncommitted. The spec's rollback plan depends on separate commits; the CSS is split per screen so you can still commit it that way.
- **Smoke tests:** not run (see above).
- **Filled cart and checkout:** the snapshot tool only captures an empty cart. To check the filled layout I temporarily put two items in the starting cart, took snapshots, then removed the change and ran a clean final pass. The checkout-error state was checked in code, not by eye.
- **Tape on featured cards:** not used, because the product data has no "featured" flag and I didn't want to invent one.
- **Snapshot artifact:** in mobile full-page screenshots the fixed bottom bar appears over page content. The page reserves space for it, so this doesn't happen when scrolling in a real browser.

**Decisions I made**
- **Product card:** the image sits flush at the top of the card and shares its corners. The spec's "inner radius = outer minus padding" rule doesn't work for an image inside a padded card.
- **Toolbar:** the sort select is 36px tall, matching the chips, rather than the 32px toolbar size, so the whole row has one control height.
- **Grid:** 4 products per row on desktop, 2 between the two breakpoints, 1 on mobile.
- **Headings:** the cart and confirmation use the smaller product-page title size.
- **Mobile bottom bar:** used for both Add to cart and Place order.
- **Stepper on mobile:** grows to 44px so the buttons meet the spec's touch-target size.
- **Not-found note text:** the pencil note says "back to the shop", repeating the button.
- **Home note text:** "new this week" is the spec's prescribed text, even though no nearby text says it.