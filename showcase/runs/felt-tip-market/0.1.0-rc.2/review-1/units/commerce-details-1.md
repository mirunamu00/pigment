```json
{
  "items": [
    { "id": "commerce--state--card-hover--desktop-light", "status": "ok", "fidelity": 4, "note": "The hovered first card is lifted up-left on a hard black offset shadow over a paper grid of white, ink-framed cards with band-coloured drawn vignettes and pink notched flags. It matches the reference's lift recipe (05) and its flat drawn chrome. Above it, a lemon hero has a 96px-class headline and five thick, cropped stickers, now close to the reference's sticker composition (01)." },
    { "id": "commerce--state--card-hover--desktop-dark", "status": "ok", "fidelity": 4, "note": "The ground is black and the panels and card bodies are one step lighter, so depth now reads the right way up, as in reference 11. Bands, vignettes, flags and the pink cart block are unchanged, and the current pill turns white. The 35% white hover shadow on the lifted card is faint but visible." },
    { "id": "commerce--state--card-hover--mobile-light", "status": "finding", "fidelity": 4, "note": "On a phone, the lemon hero stacks the headline, a pink CTA and five stickers cropped at the edges, close to the reference's phone bands (09). Below it is an ink-framed filter box and full-width lifted cards. The category pill row inside the filter box runs past the frame and hides the last category, with no scroll cue." },
    { "id": "commerce--state--added-to-cart--desktop-light", "status": "finding", "fidelity": 4, "note": "Under the pink button, which lifts on its hard shadow, the confirmation is a white ink panel on a static hard shadow, with a status dot, one sentence and an outline next-step button: the spec's toast recipe, in the reference's language. The buy panel is cruder than the reference's option cards (07): the selected option has a thick ink border and a pink radio dot, not the pink selected border with a check disc, and the disabled stepper button is a grey-filled box." },
    { "id": "commerce--state--added-to-cart--desktop-dark", "status": "ok", "fidelity": 4, "note": "The same confirmation sits on the raised dark panel with a visible light hard shadow. The lemon header band and the vignette stay exactly as in light mode, and the cart block turns pink, matching how the reference's CTA swaps in dark (11). The selection treatment is the same as in light." },
    { "id": "commerce--state--added-to-cart--mobile-light", "status": "ok", "fidelity": 4, "note": "The stacked buy panel has a full-width lifted pink button and the white shadowed confirmation panel with its next-step button below it, all on 48px controls and ink rules. It reads as clearly as the reference's phone app screen (10). The product vignette sits in an ink frame under the lemon header band." },
    { "id": "commerce--state--checkout-errors--desktop-light", "status": "ok", "fidelity": 4, "note": "Invalid fields get the 2px danger border, a small red icon and an ink message. The focused field adds the pink halo and the ink ring. The total is a pink flag, and a periwinkle header band carries a thick receipt sticker cropped at its trailing edge. This is dense UI that keeps the reference's ink-hairline character (07), and the next action is clear." },
    { "id": "commerce--state--checkout-errors--desktop-dark", "status": "ok", "fidelity": 4, "note": "Raised dark panels sit on the black ground and the danger borders stay legible. In dark mode, the focus on the first field becomes a pink halo inside a white ring, and the band and sticker are unchanged. This is consistent with the reference's dark appearance (11) and just as readable." },
    { "id": "commerce--state--checkout-errors--mobile-light", "status": "ok", "fidelity": 4, "note": "The items panel and the checkout panel stack as ink-framed white boxes, and the total is a pink flag. The first invalid field shows the thick danger border with a pink halo. The header-band receipt sticker sits at the trailing edge, mostly visible and not cut by a seam, close to the reference's tidy phone app chrome (10)." },
    { "id": "commerce--state--keyboard-focus--desktop-light", "status": "ok", "fidelity": 4, "note": "Focus on the secondary nav item is a clear 2px ink outline pill next to the black current pill, inside the white bar with its full-height black cart block. It is as plain and drawn as the reference's focus treatment (04, 05). The hero below keeps its stickers and pink CTA." },
    { "id": "commerce--state--keyboard-focus--desktop-dark", "status": "ok", "fidelity": 4, "note": "On the black bar, the focused nav item is a white outline pill next to the white current pill, and the cart block turns pink, matching the reference's dark header (11). The focus is easy to find." },
    { "id": "commerce--state--keyboard-focus--mobile-light", "status": "ok", "fidelity": 4, "note": "The focused cart block in the phone header gets a white inner and ink outer ring that stays fully inside the frame, next to the outlined menu button. It is visible and in the system's ink-on-white idiom." },
    { "id": "commerce--drawings--home", "status": "ok", "fidelity": 4, "note": "There are eleven different product vignettes on cycled band grounds, each a thick ink-outlined object with a visible back or side band and inner seams, plus a separate hero parcel. Every drawing is its own noun and reads at once. The earlier generic picture glyphs are gone. They are a little thinner-edged than the reference's chunky coins and slips (01, 03), but in the same language." },
    { "id": "commerce--drawings--products-canvas-field-tote", "status": "finding", "fidelity": 3, "note": "At the large product-media size, the tote is a white bag on lemon with a thin outline. Its depth is only a narrow strip along the bottom edge, so it reads closer to a flat line drawing than the reference's die-cut objects with a solid rim at the same size (01, 03)." },
    { "id": "commerce--drawings--products-merino-crew-sweater", "status": "finding", "fidelity": 3, "note": "A periwinkle sweater on marigold, drawn with hairline strokes that are thin for a ~600px drawing. The side band shows only as slivers at the cuffs and hem, and the sleeve construction is awkward. It is recognisable, but cruder and flatter than the reference's thick stickers." },
    { "id": "commerce--drawings--cart", "status": "ok", "fidelity": 4, "note": "The empty-cart drawing is an open parcel in its own pose, with a dark interior, flaps and a solid side band, not a recoloured copy of the header sticker. The periwinkle header carries a separate curled receipt with ruled lines and a torn edge, in the reference's paper-slip register (03)." },
    { "id": "commerce--motion", "status": "ok", "fidelity": 4, "note": "Motion is limited to the scroll-linked, linear drift of the hero stickers (static in these captures without scroll) and the lift on hover. Nothing fades or plays on load, which matches the spec and the reference's sparse, paper-like movement." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "At large product-media size the vignette objects lose their die-cut thickness. The strokes stay hairline on a ~600px drawing, and the back or side band shrinks to a sliver at the hem or cuff, so the tote and sweater read as flat outline drawings. The reference's stickers keep a solid, visible rim at any size.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.2/commerce/20261025-025002/drawings/products-merino-crew-sweater-d1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.2/commerce/20261025-025002/drawings/products-canvas-field-tote-d1.png",
        "pipeline/gumroad-study/reference/set/01-desktop.png"
      ],
      "items": ["commerce--drawings--products-canvas-field-tote", "commerce--drawings--products-merino-crew-sweater"],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "In the buy panel, the selected option card has a thick ink border and a pink radio dot, not the pink selected border with a check disc, and the disabled stepper button is a grey-filled box. The reference marks the selection with a pink border on a white card (07) and never uses a grey fill.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.2/review-1/crops/commerce--state--added-to-cart--desktop-light--s1.png",
        "pipeline/gumroad-study/reference/set/07-desktop.png"
      ],
      "items": ["commerce--state--added-to-cart--desktop-light"],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "On phones, the category pill row inside the filter box runs past the frame and hides the last category, with no scroll cue.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.2/review-1/crops/commerce--state--card-hover--mobile-light--s1.png"
      ],
      "items": ["commerce--state--card-hover--mobile-light"],
      "promptFix": ""
    }
  ]
}
```