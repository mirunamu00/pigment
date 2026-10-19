```json
{
  "items": [
    { "id": "commerce--page--home--desktop-light", "status": "ok", "note": "A full-width teal band runs under a paper header. It holds a regular-weight title, a lead line and an All/Bags/Apparel pill strip, with the selected pill filled raised. Below is a 4-column grid of outlined cards with bold flat placeholder tiles, small category meta and pink price tags, which matches the dense, colorful product wall in the reference. The ink-filled Shop pill marks the current page." },
    { "id": "commerce--page--home--mobile-light", "status": "ok", "note": "The band collapses to the title and a horizontally scrolling pill strip that runs off the right edge, which the spec asks for. The filter and sort controls stack above a 1-column list of outlined cards with pink price tags. Nothing overflows the page and the 16px gutters hold." },
    { "id": "commerce--page--home--desktop-dark", "status": "ok", "note": "The ground is black, cards are raised dark gray with light borders and the teal band keeps ink text. The Shop pill flips to a paper fill and the pink price tags stay readable. The hierarchy matches the light version and the reference's dark marketplace." },
    { "id": "commerce--page--home--mobile-dark", "status": "ok", "note": "The dark mobile grid has the same structure as light: a teal band with the pill strip cropped at the edge, then raised dark cards with saturated placeholder tiles and pink price tags. Text on the cards and the band is legible." },
    { "id": "commerce--page--products-canvas-field-tote--desktop-light", "status": "finding", "note": "A teal band, the same color as the parent shop, carries an underlined breadcrumb and the h1. Below it, an outlined yellow image frame sits beside $48.00 as plain large text, the copy, Color choice pills, a quantity stepper, a pink Add to cart button and a ruled Details list. The price is not given the pink tag the cards use." },
    { "id": "commerce--page--products-canvas-field-tote--mobile-light", "status": "ok", "note": "The band holds the breadcrumb and title, then a full-width image frame and a single column: price, copy, ink rule, color pills, stepper, pink Add to cart and Details. The spacing is even, the hit targets are large and nothing is cut off." },
    { "id": "commerce--page--products-canvas-field-tote--desktop-dark", "status": "ok", "note": "The dark variant keeps the teal band with ink breadcrumb and title. The selected color pill is filled raised gray, and the pink Add to cart is the only pink action. The rules and Details list read clearly on black." },
    { "id": "commerce--page--products-canvas-field-tote--mobile-dark", "status": "ok", "note": "The dark mobile detail has the band, the image frame, white price and copy, the selected Natural pill raised, the outlined stepper and the pink Add to cart. All of it has good contrast and an even vertical rhythm." },
    { "id": "commerce--page--products-merino-crew-sweater--desktop-light", "status": "ok", "note": "This page uses the same band-plus-two-column layout as the other product page, so the section color is consistent. The size choices S/M/L/XL are pills with S selected, there is one pink Add to cart, and the plain price matches the finding on the other product page." },
    { "id": "commerce--page--products-merino-crew-sweater--mobile-light", "status": "ok", "note": "A single column: band title, yellow-green image frame, price, copy, ink rule, size pills, stepper, pink button and Details. The size pills fit on one row with room to spare and nothing overlaps." },
    { "id": "commerce--page--products-merino-crew-sweater--desktop-dark", "status": "ok", "note": "In dark mode the teal band and ink title stay. The size pills show the raised selected fill on S, and the outlined stepper and pink button read cleanly against black." },
    { "id": "commerce--page--products-merino-crew-sweater--mobile-dark", "status": "ok", "note": "The dark mobile detail stacks the band, image, price, copy, size pills, stepper and pink Add to cart with even spacing. The light text and borders have enough contrast on the black ground." },
    { "id": "commerce--page--cart--desktop-light", "status": "ok", "note": "The cart section owns a yellow band with an ink title and a shipping line. Below it is a centered empty state: a pink coin sticker with an ink outline and a yellow extruded rim, a regular-weight heading, one sentence and one pink Continue shopping button. This is the spec's empty-state recipe, and the Cart pill is ink-filled as the current page." },
    { "id": "commerce--page--cart--mobile-light", "status": "ok", "note": "The yellow band collapses to the title and shipping line. The coin sticker, heading, sentence and pink button are centered and scaled up for touch, with comfortable space above and below." },
    { "id": "commerce--page--cart--desktop-dark", "status": "ok", "note": "The yellow band keeps ink text on the dark ground. The coin sticker switches to a light outline and keeps its pink face and yellow rim. The Cart pill flips to a paper fill and the single pink button is the only pink action." },
    { "id": "commerce--page--cart--mobile-dark", "status": "ok", "note": "The dark mobile empty cart stacks the yellow band, the light-outlined coin sticker, the white heading, the secondary sentence and the pink Continue shopping button. Nothing is cramped or cut off." }
  ],
  "findings": [
    {
      "severity": "minor",
      "area": "signature",
      "summary": "On the product detail page the price is plain large text, not the pink price tag the spec and the product cards use, so the detail page loses one of the system's pink accents.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.2/review-1/sheets/commerce--page--products-canvas-field-tote--desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.2/review-1/sheets/commerce--page--products-merino-crew-sweater--desktop-light.png"
      ],
      "items": ["commerce--page--products-canvas-field-tote--desktop-light"]
    },
    {
      "severity": "minor",
      "area": "crossAppConsistency",
      "summary": "The image placeholders cycle through four band colors on a screen that already has a teal band. The spec's own placeholder rule ('a band color with an ink glyph') conflicts with its 'never pair a band color with another band color on one screen' rule. The result reads well and matches the reference's colorful product wall, but the conflict is in the spec.",
      "samples": 1,
      "of": 1,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.2/review-1/sheets/commerce--page--home--desktop-light.png"
      ],
      "items": ["commerce--page--home--desktop-light"]
    }
  ]
}
```