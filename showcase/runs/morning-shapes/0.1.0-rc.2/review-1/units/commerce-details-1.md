```json
{
  "items": [
    { "id": "commerce--state--card-hover--desktop-light", "status": "ok", "fidelity": 4, "note": "The hovered product card's cream fill goes one step darker and its title gets an underline. That is tone-first and borderless, as the spec's linked-card row asks, and it sits inside a well-composed grid of cream cards with category-hue covers, dot filter pills and a yolk header band with a tight disc-cloud-sparkle cluster. It reads as clearly as the reference's own state treatments." },
    { "id": "commerce--state--card-hover--desktop-dark", "status": "ok", "fidelity": 4, "note": "At night the hovered card lifts from indigo to a lighter violet-indigo with an underlined title, the filter pills turn indigo and the selected pill turns white, which follows the reference's navy/indigo palette. The yolk header band stays bright as the spec says. The state is legible, though the step is a little subtle." },
    { "id": "commerce--state--card-hover--mobile-light", "status": "finding", "fidelity": 3, "note": "Two rows of header chrome and a tall yolk band come before the content. The band's cluster sits alone in a large empty yellow area below the text, so the hovered card (a warm grey fill) only starts at the bottom of the first screen. The reference's phone has one compact header row and centered text that fills its band." },
    { "id": "commerce--state--added-to-cart--desktop-light", "status": "finding", "fidelity": 4, "note": "The confirmation is an ink pill toast with a small sparkle, an exact sentence and an underlined 'view cart' link, and the header cart badge updates. It follows the system's toast recipe and reads clearly. But the tote cover is a large yolk field directly under the yolk header band, so two big same-hue fields stack, and the reference never does that." },
    { "id": "commerce--state--added-to-cart--desktop-dark", "status": "finding", "fidelity": 4, "note": "At night the toast becomes a white pill with ink text and a sparkle, matching the reference's white night pill. The choice rows turn indigo with the selected row ringed in white. The same yolk band over a yolk cover repeats the hue stacking." },
    { "id": "commerce--state--added-to-cart--mobile-light", "status": "finding", "fidelity": 3, "note": "The cover now correctly follows the title. But yolk band and yolk cover stack back to back and fill the whole first screen, and the confirmation (an ink rounded block with sparkle and link) only shows further down, under the full-width blue pill. A person sees the badge change in the header but not the message." },
    { "id": "commerce--state--checkout-errors--desktop-light", "status": "ok", "fidelity": 4, "note": "Inside a cream checkout panel beside a cream order summary, each empty field gets a 2px red border and a red alert glyph with a short instruction underneath. That is the spec's inline error with no art, and it is in the spirit of the reference's cream form panel. It is clear what to fix, though there is no summary above the fields." },
    { "id": "commerce--state--checkout-errors--desktop-dark", "status": "ok", "fidelity": 4, "note": "At night the errors use a coral danger border and coral messages on indigo inputs inside indigo panels, under a blue header band with a yellow crescent disc and cloud. It is legible, keeps the night palette, and the errors are as clear as in the light theme." },
    { "id": "commerce--state--checkout-errors--mobile-light", "status": "finding", "fidelity": 3, "note": "The first screen is the two-row header, a tall blue band whose cluster floats in an empty lower half, and the order summary. The red-bordered fields and messages, which are well drawn, are only below the fold, so a person who just pressed the order button sees no sign of what went wrong." },
    { "id": "commerce--state--keyboard-focus--desktop-light", "status": "finding", "fidelity": 3, "note": "The focused top-bar link gets a square, flush blue box that is lopsided around the text: wide on the left, tight on the right. The reference's ring is a 2px line set 2px out that follows the control's rounded shape. This is the same crude treatment rc.1 named, and it hasn't closed." },
    { "id": "commerce--state--keyboard-focus--desktop-dark", "status": "finding", "fidelity": 3, "note": "At night the focused nav link has the same square, lopsided box in yellow. It is visible, but it is a browser-default-looking rectangle next to the system's pills, not a ring that follows the link's shape." },
    { "id": "commerce--state--keyboard-focus--mobile-light", "status": "finding", "fidelity": 3, "note": "On the phone the focused second-row nav link gets a tall square blue box with the text pushed to its right edge. It is crude next to the rounded ledge pills below it and the reference's shape-following ring." },
    { "id": "commerce--drawings--home", "status": "ok", "fidelity": 4, "note": "The rc.1 gap has closed. Each product cover is now its own readable subject (tote, backpack, duffel, sweater, tee, mug with steam, pan with an egg, towels), built from a few flat primitives with a same-hue shade edge and a tucked sparkle, filling 60–70% of a category-hue field. The header-band art is one tight crescent disc with an overlapping cloud and a sparkle. One cover (a vest with two pockets) is less legible than the rest." },
    { "id": "commerce--drawings--products-canvas-field-tote", "status": "finding", "fidelity": 3, "note": "The large tote cover and the hexagon-and-pill band cluster are well built. But the color-option glyphs (a dot in a ring, two bubbles, three dots) are the same yellow on every option and say nothing about the colors they label. The reference picks each row's glyph for its label." },
    { "id": "commerce--drawings--products-merino-crew-sweater", "status": "finding", "fidelity": 3, "note": "The sweater cover is a clear, well-shaded drawing on green with a sparkle. The band uses the same hexagon-and-pill cluster as the tote page. The option glyphs (a ring, bubbles, dots, a zigzag) are again one green hue that has nothing to do with the colors offered." },
    { "id": "commerce--drawings--cart", "status": "ok", "fidelity": 3, "note": "The blue band's cluster (a yolk crescent disc overlapping a cloud, with a pink sparkle) is close to the reference's hero shape work. The empty-cart glyph is two plain overlapping blue discs, an allowed glyph but generic: it doesn't picture an empty bag or basket the way the reference's pictograms name their subject." },
    { "id": "commerce--motion", "status": "ok", "fidelity": 4, "note": "As the spec describes, option-row glyphs breathe slowly (6s, scale and rotate) and the empty-cart bubbles pulse on an 8s cycle with the breathe easing. Movement is slow, small and looping, like the reference's breathing glyphs." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "Top-bar nav links get a square, flush and lopsided focus box in every theme and size. The reference's focus ring is a 2px line set 2px out that follows the control's rounded shape. This is the rc.1 finding, still open.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/crops/commerce--state--keyboard-focus--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/crops/commerce--state--keyboard-focus--mobile-light--s1.png",
        "pipeline/headspace-study/reference/set/11-desktop.png"
      ],
      "items": [
        "commerce--state--keyboard-focus--desktop-light",
        "commerce--state--keyboard-focus--desktop-dark",
        "commerce--state--keyboard-focus--mobile-light"
      ],
      "promptFix": "Every focusable element, text and nav links included, gets a 2px focus-ring outline at 2px offset that follows its shape: radius.sm with even padding around the text for links and nav items, pill or circle for controls."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "hierarchy",
      "summary": "On phones the header takes two rows and the header band grows tall, with its cluster alone in an empty lower half. The state the screen is about (the hovered card, the field errors) is pushed to or below the fold. The reference's phone keeps one compact header row and a band that fits its centered text.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/crops/commerce--state--card-hover--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/crops/commerce--state--checkout-errors--mobile-light--s1.png",
        "pipeline/headspace-study/reference/set/04-mobile.png"
      ],
      "items": [
        "commerce--state--card-hover--mobile-light",
        "commerce--state--checkout-errors--mobile-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "referenceFidelity",
      "summary": "On the product page the item's cover uses the same yolk hue as the header band right above it, so two large same-hue fields stack (on phones they fill the whole first screen). The reference never puts two big fields of one hue together. This is the rc.1 finding, still open.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/crops/commerce--state--added-to-cart--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/crops/commerce--state--added-to-cart--mobile-light--s1.png"
      ],
      "items": [
        "commerce--state--added-to-cart--desktop-light",
        "commerce--state--added-to-cart--desktop-dark",
        "commerce--state--added-to-cart--mobile-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "Glyphs on the product's color-option rows are arbitrary marks in one hue on every option, unrelated to the colors they label. The reference chooses each row's glyph for its label.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/sheets/commerce--drawings--products-canvas-field-tote.png",
        "showcase/runs/morning-shapes/0.1.0-rc.2/review-1/sheets/commerce--drawings--products-merino-crew-sweater.png",
        "pipeline/headspace-study/reference/set/05-desktop.png"
      ],
      "items": [
        "commerce--drawings--products-canvas-field-tote",
        "commerce--drawings--products-merino-crew-sweater"
      ],
      "promptFix": ""
    }
  ]
}
```