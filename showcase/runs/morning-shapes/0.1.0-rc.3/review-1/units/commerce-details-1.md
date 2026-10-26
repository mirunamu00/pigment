```json
{
  "items": [
    {
      "id": "commerce--state--card-hover--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The hovered product card turns one tone darker cream and its title gets an underline, as the spec says. It sits under a yolk header band with a sag arc, ink filter pills with dots and flat, shaded product covers, so the screen clearly speaks the reference's language. The band's blob, pill and sparkle cluster is bigger and more varied than rc.2's stamp, but it still fills only about a fifth of the band. The reference's art fills about half its band (02)."
    },
    {
      "id": "commerce--state--card-hover--desktop-dark",
      "status": "ok",
      "fidelity": 4,
      "note": "At night the hovered card lifts from deep indigo to a lighter indigo, and its title is underlined. Filter pills turn white and indigo, and the yolk band keeps its hue against navy, as in the reference's night palette (03). The hover is clear and quiet, with no shadow or scale."
    },
    {
      "id": "commerce--state--card-hover--mobile-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The phone header is now one row: logo, ink cart pill and a cream menu circle. The compact yolk band is short, and its cluster is tucked into the top corner, which closes rc.2's ballooning-band gap and matches the reference phone (04). The hovered card's darker cream reads clearly around a full-width cover."
    },
    {
      "id": "commerce--state--added-to-cart--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The detail header band is now cream, with a hexagon-and-pill cluster, so the big green cover is the screen's one field. That closes rc.2's two-fields gap. The cart badge updates to 1, but the ink confirmation toast with a sparkle lands just below the 900px first screen, so on arrival the outcome reads only through the small badge."
    },
    {
      "id": "commerce--state--added-to-cart--desktop-dark",
      "status": "ok",
      "fidelity": 4,
      "note": "The night version keeps the same structure: an indigo header band with the same cluster, a green cover, indigo option rows with a white selected border, and a blue add-to-cart pill. The palette is close to the reference's navy and indigo (03), and the white badge on the cart pill shows the added item clearly."
    },
    {
      "id": "commerce--state--added-to-cart--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The cream band, then the cover, price and options stack in the reference's phone order, and an ink pill toast with a sparkle sits under the blue add-to-cart button. On the wrapped color-option tiles, the radio circle sits on top of the tile's right border instead of inside the tile."
    },
    {
      "id": "commerce--state--checkout-errors--desktop-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The checkout form sits in a cream rounded panel, like the reference's form panel (09). Each empty field gets a 2px red border and an alert icon with a short instruction, and the order summary is a borderless cream card. The blue cart band's sun-and-cloud cluster is well drawn. It is clear what to fix, though there is no summary of the errors at the top."
    },
    {
      "id": "commerce--state--checkout-errors--desktop-dark",
      "status": "ok",
      "fidelity": 4,
      "note": "At night the error borders and messages shift to a lighter coral on indigo inputs and stay readable. The panel, summary card and blue band keep their roles, a faithful translation of the night palette."
    },
    {
      "id": "commerce--state--checkout-errors--mobile-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The compact blue band has its sun cluster in the corner, and the item row, summary card and then the checkout panel stack cleanly. The errors (red borders, icon and message) appear further down above a full-width blue place-order pill. The flow reads clearly, though the first screen shows no sign that errors exist."
    },
    {
      "id": "commerce--state--keyboard-focus--desktop-light",
      "status": "finding",
      "fidelity": 3,
      "note": "The rest of the shop screen is in the system's language, but no focus indicator can be seen anywhere on the first screen or the full page. The reference shows a clear blue ring 2px out around a focused pill (11)."
    },
    {
      "id": "commerce--state--keyboard-focus--desktop-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The focused top-bar link gets a flush, square white box that cuts against the word's edge. The pills and controls around it use the reference's rounded ring offset 2px (11), so the link focus still falls short, as noted in rc.1 and rc.2."
    },
    {
      "id": "commerce--state--keyboard-focus--mobile-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The focused menu circle shows a blue ring offset 2px around its cream circle and ledge, just like the reference's focus-visible pill (11). It is easy to see in the compact one-row header."
    },
    {
      "id": "commerce--drawings--home",
      "status": "ok",
      "fidelity": 4,
      "note": "Eleven product covers, each its own clear flat drawing (tote, backpack, duffel, sweater, tee, coat, mug, skillet, towels and more), in category hues, each with a darker side shade and one sparkle. They read at a glance, like the reference's spot pictograms (07). The header cluster is a shaded blue blob, a pink pill and two sparkles: crisp, but small for its band."
    },
    {
      "id": "commerce--drawings--products-canvas-field-tote",
      "status": "finding",
      "fidelity": 3,
      "note": "The tote cover is a strong, readable drawing, and the cream band's hexagon-and-pill cluster is well built. The color-option glyphs are a zigzag, a ring and two dots, all in the same green. They have nothing to do with the color names beside them, where the reference picks each row's glyph for its label (05)."
    },
    {
      "id": "commerce--drawings--products-merino-crew-sweater",
      "status": "finding",
      "fidelity": 3,
      "note": "The sweater cover is a clean shaded drawing with a sparkle, and the header cluster matches the tote page's. The option glyphs (zigzag, ring, dots, spiral), all in orange, are again arbitrary marks with no tie to the option labels."
    },
    {
      "id": "commerce--drawings--cart",
      "status": "ok",
      "fidelity": 4,
      "note": "The blue band has a large crescent-shaded sun overlapping a white flat-bottomed cloud with two sparkles, close to the reference's band art (02). The empty cart gets a well-drawn shaded basket with sparkles on a cream panel, one composition with no invented records, so rc.2's fake-cart defect is gone."
    },
    {
      "id": "commerce--motion",
      "status": "ok",
      "fidelity": 4,
      "note": "The option glyphs breathe on slow 6s scale-and-rotate loops, each at a different pace, and the empty-cart composition fades in once over 500ms without bounce. That matches the spec's calm breathing and reveal and the reference's slow glyph motion."
    }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "Top-bar text-link focus is still below the reference: invisible in light mode, a flush square box that clips the word at night. Pills and circles get the reference's rounded blue ring offset 2px. Still open from rc.1 and rc.2.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/commerce--state--keyboard-focus--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/commerce--state--keyboard-focus--desktop-dark--s1.png",
        "pipeline/headspace-study/reference/set/11-desktop.png"
      ],
      "items": [
        "commerce--state--keyboard-focus--desktop-light",
        "commerce--state--keyboard-focus--desktop-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "Glyphs in the choice rows are arbitrary marks, all in the area hue, with no tie to the option they label. The reference chooses each row's glyph for its label.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/sheets/commerce--drawings--products-canvas-field-tote.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/sheets/commerce--drawings--products-merino-crew-sweater.png",
        "pipeline/headspace-study/reference/set/05-desktop.png"
      ],
      "items": [
        "commerce--drawings--products-canvas-field-tote",
        "commerce--drawings--products-merino-crew-sweater"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "Header-band clusters are now varied (blob, hexagon, sun) and well drawn, but they still fill only about a fifth of the desktop band. The spec asks for the trailing 40–50%, and the reference's band art (02) fills about half the band.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/commerce--state--card-hover--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/02-desktop.png"
      ],
      "items": [
        "commerce--state--card-hover--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "The add-to-cart confirmation is an inline ink toast placed under the form, so on a desktop first screen it falls below the fold and only the cart badge changes. The spec's floating toast would state the outcome where the person is looking.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/commerce--state--added-to-cart--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/sheets/commerce--state--added-to-cart--desktop-light.png"
      ],
      "items": [
        "commerce--state--added-to-cart--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "On phones, the radio circle of the wrapped choice tiles sits on top of the tile's right border instead of inside it.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/commerce/20261026-151918/screenshots/state-added-to-cart-mobile-light.png"
      ],
      "items": [
        "commerce--state--added-to-cart--mobile-light"
      ],
      "promptFix": ""
    }
  ]
}
```