I reviewed all 17 items. Every one comes out at fidelity 4, and I found no major gaps and no defects caused by the spec. Three minor gaps remain, and the first two were already raised in rc.4's first review.

- **Quantity stepper:** in all 3 samples, the disabled minus button is a grey-filled box. The "added to cart" message is also uneven: one sample has no shadow, and on phones its status dot sits alone on its own line.
- **Phone filter box:** the category pills wrap onto loose rows and leave one item alone. The reference keeps them on one tight row.
- **Drawings:** one basket drawing has its strip on a side face instead of straight down, and two hero stickers in one sample are noticeably small.

```json
{
  "items": [
    { "id": "commerce--state--card-hover--desktop-light", "status": "ok", "fidelity": 4, "note": "The hovered card lifts up-left onto a hard black offset shadow over its ink hairline frame, as in the reference's lift close-up (05). The rest of the grid stays flat, so it is clear which card is under the pointer. Above it, the lemon hero keeps the 96px headline, the black CTA and its partner at one height, and 4–6 thick stickers cropped at the edges, close to 01." },
    { "id": "commerce--state--card-hover--desktop-dark", "status": "ok", "fidelity": 4, "note": "The dark mode follows 11: black ground, a lighter raised card body, a pink CTA, a white current pill and an unchanged lemon hero with its stickers. The hovered card lifts on the pale hard shadow. That shadow reads less strongly on black than the light version, but it is still clearly the lift." },
    { "id": "commerce--state--card-hover--mobile-light", "status": "finding", "fidelity": 4, "note": "On phones the lifted first card and the hero (stacked full-width CTA and field, three or four edge-cropped stickers) match 09/10. The filter box below spreads its category pills over two loose rows, with one item alone. The reference keeps its pill row tight (10)." },
    { "id": "commerce--state--added-to-cart--desktop-light", "status": "finding", "fidelity": 4, "note": "The detail page has a lemon header band with a breadcrumb, a flagged price and a white ink-ruled buy panel. The confirmation is a white panel with a dot, one sentence and a 'view cart' action, so the outcome and next step are clear, and two samples give it the static hard shadow. The quantity stepper's disabled button is grey-filled, and the colour options mark the selection with a radio dot rather than the pink selected border of 07." },
    { "id": "commerce--state--added-to-cart--desktop-dark", "status": "ok", "fidelity": 4, "note": "The dark version keeps the lemon band and vignette as in light, lighter raised panels with pale hairlines, and a pink action. The confirmation panel carries the pale static shadow and reads clearly. It is a faithful chrome-only inversion, as in 11." },
    { "id": "commerce--state--added-to-cart--mobile-light", "status": "ok", "fidelity": 4, "note": "The phone layout stacks the band, a full-width vignette, the flag, the buy panel and the confirmation in ink-framed boxes, close to 10's density. The confirmation sits below the fold under a full-width pink button. In one sample its status dot is stranded on its own line, which is a little loose." },
    { "id": "commerce--state--checkout-errors--desktop-light", "status": "ok", "fidelity": 4, "note": "The periwinkle cart band sits over a ruled items panel with a flagged total and a white checkout panel. Each empty field gets the thicker danger border, a solid danger icon and an ink message under it, and the first field shows the pink focus halo. It is clear what to fix, and it keeps 07's ink-hairline form character." },
    { "id": "commerce--state--checkout-errors--desktop-dark", "status": "ok", "fidelity": 4, "note": "The dark version keeps the periwinkle band. The danger borders and icons stay legible on the raised panels, the focus halo plus white ring marks the first field, and the flag and pink submit button are unchanged. A clean inversion." },
    { "id": "commerce--state--checkout-errors--mobile-light", "status": "ok", "fidelity": 4, "note": "On phones the items panel and checkout panel stack, with a ruled summary, a flagged total, a danger border and message per field, and a full-width pink submit. It is dense, but rows and controls keep their size and ink hairlines, as in 10." },
    { "id": "commerce--state--keyboard-focus--desktop-light", "status": "ok", "fidelity": 4, "note": "Focus lands on a header nav pill and shows an ink outline pill with a ring next to the black current pill. It is distinct and stays inside the pill language of the reference header (01). The hero and grid are unchanged." },
    { "id": "commerce--state--keyboard-focus--desktop-dark", "status": "ok", "fidelity": 4, "note": "In dark, the focused nav pill takes a white outline ring beside the white current pill, and the pink header cart block and lemon hero follow 11. The focus is easy to find." },
    { "id": "commerce--state--keyboard-focus--mobile-light", "status": "finding", "fidelity": 4, "note": "On phones the focus ring is inset white-and-ink around the black cart block in the header, which is clearly visible. Below the hero, the filter box shows the same loose two-row pill wrap as the hover screen." },
    { "id": "commerce--drawings--home", "status": "finding", "fidelity": 4, "note": "All twelve drawings are thick die-cut objects with even ink outlines and straight-down strips, about 10–15% deep: a parcel, spool, price tag, receipt, button, hanger, and product vignettes from bags to skillets. Each reads as its object and is drawn for this item. They are less characterful than the reference's tilted coins and receipts (01, 03), and in one sample two hero stickers are small (about 100px) next to the 96px headline." },
    { "id": "commerce--drawings--products-canvas-field-tote", "status": "ok", "fidelity": 4, "note": "The tote vignette is a tilted bag with a handle, a label panel and a deep solid strip along the whole lower edge, centred with clear ground on the lemon field. It is the same chunky construction as the card vignettes, and it reads instantly." },
    { "id": "commerce--drawings--products-merino-crew-sweater", "status": "ok", "fidelity": 4, "note": "The sweater is drawn as thick board, with a neckline, cuffs and a hem inner stroke, and its strip runs straight down. In one sample the hem stroke sits close to the strip, but the garment still reads as a solid die-cut piece, as the reference's stickers do." },
    { "id": "commerce--drawings--cart", "status": "finding", "fidelity": 4, "note": "The cart drawing is a market basket with a handle and slats, in two of three samples with a proper straight-down strip. In one sample the depth shows as a slanted side face on the right, not a strip along the lower edge. That makes it weaker than the reference's swept solids." },
    { "id": "commerce--motion", "status": "ok", "fidelity": 4, "note": "The only motion caught is the hero stickers' scroll-bound linear drift (ft-drift). The frames hold still over time without scrolling, with no fades or entrance animation, which matches the spec's sparse, paper-like motion and the reference's still-until-touched behaviour." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "In the buy panel, the quantity stepper's disabled button is a grey-filled box, and the colour options mark the selection with a radio dot. The reference's selected option is a pink thick border on a white card, and every control stays white with ink hairlines (07). The added-to-cart confirmation is uneven: one sample has no static shadow, and on phones the status dot is stranded on its own line. This was raised in rc.4's first review and is still open.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/commerce--state--added-to-cart--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/commerce--state--added-to-cart--desktop-light--s3.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/sheets/commerce--state--added-to-cart--mobile-light.png",
        "pipeline/gumroad-study/reference/set/07-desktop.png"
      ],
      "items": [
        "commerce--state--added-to-cart--desktop-light",
        "commerce--state--added-to-cart--mobile-light",
        "commerce--state--checkout-errors--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "On phones, the catalogue filter box wraps its category pills onto two loose rows with one item alone, then puts the stock checkbox and sort select on separate rows. The block becomes tall and airy. The reference keeps one tight pill row and a compact filter stack (10). This was raised in rc.4's first review and is still open.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/commerce--state--card-hover--mobile-light--s2.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/commerce--state--keyboard-focus--mobile-light--s3.png",
        "pipeline/gumroad-study/reference/set/10-mobile.png"
      ],
      "items": [
        "commerce--state--card-hover--mobile-light",
        "commerce--state--keyboard-focus--mobile-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "A few drawings fall short of the swept-solid bar. One basket shows its depth as a slanted side face instead of a strip straight down the lower edge. In one sample, two hero stickers are only about 100px wide, small next to the 96px headline, where the reference's coins weigh against it (01).",
      "samples": 1,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/commerce/20261025-042715-s1/drawings/cart-d1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/commerce--state--card-hover--desktop-light--s1.png",
        "pipeline/gumroad-study/reference/set/01-desktop.png"
      ],
      "items": [
        "commerce--drawings--cart",
        "commerce--drawings--home"
      ],
      "promptFix": ""
    }
  ]
}
```