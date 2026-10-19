```json
{
  "items": [
    { "id": "commerce--state--card-hover--desktop-light", "status": "finding", "note": "Four-column grid of outlined cards with sticker placeholders under a yellow shop band. Every card sits flush on the grid: no card is moved -4px, and none has a hard offset shadow. Nothing on the screen shows which card is under the pointer." },
    { "id": "commerce--state--card-hover--desktop-dark", "status": "finding", "note": "The same dark grid: charcoal card bodies with light borders and pink price tags. Again no card is lifted and none carries a 35%-white offset shadow, so the hover state is invisible." },
    { "id": "commerce--state--card-hover--mobile-light", "status": "ok", "note": "Single-column stack of full-width outlined cards. Under the band are a scrolling pill strip and a stacked filter row. With touch there should be no lift (the hover: hover guard), and the cards correctly rest flush." },
    { "id": "commerce--state--added-to-cart--desktop-light", "status": "ok", "note": "A raised toast sits bottom-left with an ink border and a hard offset shadow. It has a pink check, the message 'Added 1 item … to your cart' with an underlined 'View cart' link, and an outlined close button. The cart count in the header turned to 1. Above it are the yellow band and breadcrumb, then a pink price tag and a pink 'Add to cart' button." },
    { "id": "commerce--state--added-to-cart--desktop-dark", "status": "ok", "note": "The dark toast is a charcoal card with a light border and light offset shadow, bottom-left. It has the pink check, readable light text and the 'View cart' link. The header cart badge shows 1, and the selected 'Natural' option pill is filled." },
    { "id": "commerce--state--added-to-cart--mobile-light", "status": "ok", "note": "On mobile the toast spans the bottom of the screen with its hard shadow and close button. It covers only the footer, not the form, and the header cart badge reads 1." },
    { "id": "commerce--state--checkout-errors--desktop-light", "status": "ok", "note": "In the Checkout card a summary well with a red border and icon reads 'Fix the 3 fields marked below.' Each empty field has a red border and a red-icon message under it. The first field is focused with the ink border and pink halo, and the one pink 'Place order' sits below. The cart is under a periwinkle band." },
    { "id": "commerce--state--checkout-errors--desktop-dark", "status": "ok", "note": "In dark mode the error summary, red field borders and messages stay readable on charcoal. The focused field shows the pink halo, and 'Place order' is the only pink action. The current-page 'Cart' pill in the header is filled with paper." },
    { "id": "commerce--state--checkout-errors--mobile-light", "status": "ok", "note": "On mobile the items card and the Checkout card stack in one column. Below them come the error summary, three red-bordered fields with their messages, the halo-focused first field, and the pink 'Place order' in the flow. Nothing is clipped." },
    { "id": "commerce--state--keyboard-focus--desktop-light", "status": "ok", "note": "Keyboard focus is on the 'Cart' nav pill, which shows an outline ring that follows the pill's full radius. It sits next to the ink-filled current 'Shop' pill. The rest of the grid is at rest, and the focus is drawn in the system's own outline, not the browser default." },
    { "id": "commerce--state--keyboard-focus--desktop-dark", "status": "ok", "note": "In dark mode the focused 'Cart' pill gets a pink ring with a gap, which reads clearly against the charcoal header beside the paper-filled 'Shop' pill." },
    { "id": "commerce--state--keyboard-focus--mobile-light", "status": "ok", "note": "On mobile the nav pills sit under the brand row. The focused 'Cart' pill shows the ringed outline beside the ink 'Shop' pill, and the band and grid below are untouched." },
    { "id": "commerce--drawings--home", "status": "ok", "note": "Eleven different flat stickers, each on its own band color: tote, backpack, duffel, sweater, tee, chore coat, mug, skillet, towels, key ring and beanie. Fills are pink, periwinkle, teal and yellow under a heavy ink outline, and the tilted shapes read clearly at tile size. That matches the reference's dense, colorful wall of goods." },
    { "id": "commerce--drawings--products-canvas-field-tote", "status": "ok", "note": "A tilted pink tote with a round handle and a periwinkle patch, with a heavy ink outline on a yellow square. It is the same tote as its grid tile, so it is consistent between list and detail." },
    { "id": "commerce--drawings--products-merino-crew-sweater", "status": "ok", "note": "A pink long-sleeved sweater with a teal crew neck and hem band, with a heavy ink outline on yellow. The long sleeves and ribbed hem now set it apart from the short-sleeved tee." },
    { "id": "commerce--drawings--cart", "status": "ok", "note": "A pink coin with a heavy plus glyph and a periwinkle rim offset down-right, all in heavy ink outline. It follows the coin recipe and reads as a coin at its small size, though it sits upright with no tilt." }
  ],
  "findings": [
    {
      "severity": "major",
      "area": "signature",
      "summary": "Linked product cards still don't lift on hover, in light or dark. Every card in the hover screenshot sits flush, with no -4px translate and no hard offset shadow, so the hovered card can't be told apart from the rest. The spec now has a 'Linked cards' paragraph, a .lift-card class and an Interaction-table row, but the build still left the card's hover out. This is carried over from rc.3 and not fixed.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.4/commerce/20261019-131819/screenshots/state-card-hover-desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.4/commerce/20261019-131819/screenshots/state-card-hover-desktop-dark.png"
      ],
      "items": [
        "commerce--state--card-hover--desktop-light",
        "commerce--state--card-hover--desktop-dark"
      ],
      "promptFix": "Make the linked-card lift a required step of building any card grid, not only a recipe. Whenever a card (or its wrapper) is a link or is clickable, add the .lift-card class to its outermost bordered element in the same change that creates the card component. In the Verification section, add a mandatory check: hover the first card of every grid in each theme and confirm that its bounding box moved -4px -4px and that a box-shadow other than none is computed. A card with no translate fails the build, even if anything else changed."
    }
  ]
}
```