```json
{
  "items": [
    { "id": "commerce--page--home--desktop-light", "status": "ok", "fidelity": 4, "note": "This is a lemon hero band with a large medium-weight headline and five thick stickers placed around it. They are cropped at the side edges and the bottom seam, as the reference's coins are. Below the headline the black block CTA and an outline button sit at one shared height of about 60px, so the rc.3 gap of a lone small button has closed. The drawn card grid underneath (vignettes on band grounds, notched flags, ink-ruled filter box) holds up well against the reference's chrome. It is a little less airy than reference 01, and the button sticker and wallet sit tighter to the headline." },
    { "id": "commerce--page--home--mobile-light", "status": "finding", "fidelity": 4, "note": "The phone hero keeps three thick stickers cropped by the side edges and the seam, with a full-width black CTA stacked over an outline button, as reference 09/10 stack. Below the actions about 150px of empty lemon surrounds one centred tag, and the filter box below wraps its category pills into loose rows. The reference's band ends close under its content, and its filters form a ruled stack." },
    { "id": "commerce--page--home--desktop-dark", "status": "ok", "fidelity": 4, "note": "This matches reference 11's inversion: black bar with a white current pill and a pink cart block, the CTA turned pink, and the lemon band and stickers unchanged. The cards are one step lighter than the ground with light hairlines. The outline partner stays white on the band, as the spec asks." },
    { "id": "commerce--page--home--mobile-dark", "status": "finding", "fidelity": 4, "note": "The dark inversion is right on the phone: pink cart block, pink full-width CTA, white outline button on the band, filter box one step lighter than the black. It has the same loose band tail under the actions and the same wrapped pill rows in the filter box as the light phone version." },
    { "id": "commerce--page--products-canvas-field-tote--desktop-light", "status": "finding", "fidelity": 4, "note": "A compact lemon header band carries the breadcrumb, a section-size title and a lead, and closes on an ink seam over paper. A large lemon media box holds a white tote with a visible side face and lower strip, now a real thick object rather than rc.3's sliver. It fills only about 45% of the box width, so the box reads a little empty. On the buy panel, the radio chips, the grey disabled stepper and the plain pink button look more like stock form UI than the reference's hairline option cards (07)." },
    { "id": "commerce--page--products-canvas-field-tote--mobile-light", "status": "ok", "fidelity": 4, "note": "On the phone the band, the media box with the thick tote and the flag plus outline status pill stack cleanly, with type sizes and 32px gutters close to reference 10. The tote's 3px outline and strip hold up at this size. The header bar marks no current page, where the reference always shows a filled pill." },
    { "id": "commerce--page--products-canvas-field-tote--desktop-dark", "status": "finding", "fidelity": 4, "note": "The dark version keeps the lemon band, lemon media box and pink flag unchanged, and the panels are lighter than the black ground. The selected colour chip keeps only a light 2px border with a pink radio dot, and the disabled stepper is a mid-grey block. In the reference's language a selected option is marked by a pink border, as on 07." },
    { "id": "commerce--page--products-canvas-field-tote--mobile-dark", "status": "ok", "fidelity": 4, "note": "This is a faithful phone inversion: black bar with the pink cart block, lemon header band with ink text, and the media vignette unchanged on the black ground. The flag and a dark status pill sit beneath. Spacing matches the light phone version and the reference's mobile rhythm." },
    { "id": "commerce--page--products-merino-crew-sweater--desktop-light", "status": "finding", "fidelity": 4, "note": "The lemon header band sits over a marigold media box with a teal sweater. The garment has a deep solid hem strip and cuff depth, so the rc.3 doubled-outline problem has closed. The buy panel has the same stock-looking size radio chips and grey disabled stepper as the tote page." },
    { "id": "commerce--page--products-merino-crew-sweater--mobile-light", "status": "finding", "fidelity": 4, "note": "The phone item page stacks the band, the vignette, the flag, a hairline buy panel with a full-width pink button, a ruled details box and the black footer, all close to reference 10's structure. The breadcrumb wraps onto a second line in the band, and the size chips wrap with a grey disabled stepper below." },
    { "id": "commerce--page--products-merino-crew-sweater--desktop-dark", "status": "ok", "fidelity": 4, "note": "This has the same composition as light: the lemon band and marigold vignette survive the inversion, and the panels sit lighter than the ground with light hairlines. The pink is limited to the flag, the cart block and one button, which keeps to the reference's one-hot-colour discipline." },
    { "id": "commerce--page--products-merino-crew-sweater--mobile-dark", "status": "finding", "fidelity": 4, "note": "The dark phone item page is correct in colour roles, with a thick sweater sticker on its marigold ground. The breadcrumb wraps so the band repeats the item name just above the title and grows taller. Reference 10 keeps its breadcrumb to one short line." },
    { "id": "commerce--page--cart--desktop-light", "status": "ok", "fidelity": 4, "note": "The periwinkle header band (the area colour for cart) is closed by a seam. Below it a dashed white empty box holds one marigold basket sticker, one sentence and a black CTA, close to reference 06's dashed empty state with a richer drawing. The basket's strip shows mostly on its rim and right side rather than along the whole lower edge. The rc.3 plate strip peeking above the button is gone." },
    { "id": "commerce--page--cart--mobile-light", "status": "ok", "fidelity": 4, "note": "The phone cart keeps the band, the dashed empty box with a large basket and the black CTA, with generous but even spacing that matches reference 10's empty state and black footer. Type sits at the reference's mobile sizes." },
    { "id": "commerce--page--cart--desktop-dark", "status": "ok", "fidelity": 4, "note": "Dark inverts as reference 11 does: white current Cart pill, pink cart block and a pink CTA in a dashed raised box one step lighter than the black. The periwinkle band is unchanged and the footer is separated by a light rule." },
    { "id": "commerce--page--cart--mobile-dark", "status": "ok", "fidelity": 4, "note": "This is a clean phone inversion: periwinkle band, a raised dashed box with a light dashed border, the marigold basket and a pink CTA with an ink outline. The light seam before the footer keeps the fields distinct, as the reference closes every field." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "On item pages, the variant picker is a row of radio chips: the chosen one has a thick ink border and a pink radio dot. The quantity stepper's disabled minus is a grey-filled box. Next to the reference's white hairline option cards, where a pink border marks the selection (07), the buy panel reads as stock form UI. The grey disabled fill follows the spec's own disabled rows ('color.surface.subtle fill'), and it persists from rc.3.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/commerce--page--products-canvas-field-tote--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/commerce--page--products-merino-crew-sweater--desktop-dark--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/sheets/commerce--page--products-merino-crew-sweater--mobile-light.png",
        "pipeline/gumroad-study/reference/set/07-desktop.png"
      ],
      "items": [
        "commerce--page--products-canvas-field-tote--desktop-light",
        "commerce--page--products-canvas-field-tote--desktop-dark",
        "commerce--page--products-merino-crew-sweater--desktop-light",
        "commerce--page--products-merino-crew-sweater--mobile-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "Phone layouts lose some tightness in three places. The hero band runs about 150px past its actions to fit one centred sticker at the seam. The catalog filter box wraps its category pills into loose two-line rows. The item-page breadcrumb wraps and repeats the item name right above the title. The reference's phone bands end close under their content, its filters are a ruled stack, and its breadcrumb is one short line.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/commerce--page--home--mobile-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/commerce--page--products-merino-crew-sweater--mobile-dark--s1.png",
        "pipeline/gumroad-study/reference/set/10-mobile.png",
        "pipeline/gumroad-study/reference/set/09-mobile.png"
      ],
      "items": [
        "commerce--page--home--mobile-light",
        "commerce--page--home--mobile-dark",
        "commerce--page--products-merino-crew-sweater--mobile-dark"
      ],
      "promptFix": ""
    }
  ]
}
```