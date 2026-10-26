I've restyled the store with Morning Shapes on every screen, in light and dark. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked screenshots of every page, plus the filled cart, checkout errors, order confirmation, empty cart, no-results and 404 states. For the states the normal routes can't reach, I used a temporary preview route and removed it afterwards. Routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package's token file, and `src/styles/base.css` only references those tokens. The old variable names still work as aliases. Figtree and DM Mono are self-hosted through two new font packages, `@fontsource/figtree` and `@fontsource/dm-mono`. Dark mode follows the system setting.
- **Signature elements**, built as reusable pieces in `src/components/ms/`:
  - Colour bands with curved edges: one at the top of each page, a rising one for the footer and error page.
  - The flat shape kit, with 11 product pictograms, four header scenes (tote, price tag, basket, parcel) and empty and error artwork.
  - A small product-interface scene that builds in on the shop's header band.
  - A sparkle orbiting a crescent on the order confirmation.
  - Pill buttons that sink onto their ledge when pressed.
  - All motion stops under reduced motion.
- **Colour per area:** Shop is yellow and Cart is blue. Bags, Apparel, Kitchen and Accessories take green, orange, violet and pink. The footer and error page are cream.
- **Screens:**
  - **Shop:** yellow band, filter pills with colour dots, cream cards with coloured product covers instead of the grey placeholder boxes.
  - **Product page:** cream band, because the large cover is the page's colour field. A blue "Add to cart" and a dark pop-up confirmation with a sparkle.
  - **Cart:** blue band, product rows with small covers, checkout fields on white, blue "Place order", and an empty-cart panel.
  - **Every page:** white top bar with a phone menu, and a cream footer with link columns and a signup field.
- I also added `design-system/` (version, area-to-colour map, conventions), `AGENTS.md` and `CLAUDE.md`.

**Spec items I could not apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't on the list of commands I could run, so all changes are uncommitted.
- **Unused components:** the loading dots, skeletons, dialog, switch, table, closing band and confetti section opener have no matching UI in this app.
- **Size options without icons:** size and colour choices are a row of pills rather than tiles with animated icons, because an icon can't picture "XL" or "Olive".
- **Few animated icons:** they appear only where the spec places them (confirmation, toast sparkle, empty-cart drift), so most screens have none.

**Decisions I made myself**
- **Shop page header:** `/` is the store's front page, so its header shows the product-interface scene on desktop and a tote picture on phones.
- **Too many colours on the grid:** with "All" selected, the grid shows five colours (yellow band plus four category covers). The spec allows four per screen.
- **Footer signup is cosmetic:** I added it with a local "you are on the list" message only, plus a "Back to top" button. It doesn't send anything anywhere.
- **Product pages count as Shop:** the Shop nav dot stays lit on product pages.
- **Shading depth:** I set the darker crescent on shapes to 22% of the radius. The spec gives two figures that don't agree, and this sits between them.
- **Confirmation timing:** the "Added to your cart" message stays on screen. A 5-second dismiss would have changed existing behaviour.

The screenshots catch the shop header's cards partway through their build-in animation, so they look faint. I confirmed the finished state with one snap taken with the animation briefly switched off, then turned it back on.