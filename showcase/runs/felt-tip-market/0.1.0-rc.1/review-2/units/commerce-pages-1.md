```json
{
  "items": [
    {
      "id": "commerce--page--home--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "A white marketing header with a black current pill and a full-height black cart block, a lemon header band with a medium grotesk title and outline category pills, and white ink-framed product cards with notched pink flags. This is close to the reference's lemon product chrome (06). Two things fall short: the band's tote sticker is a roughly 70px fragment jammed into the top-right corner, and in two of the three samples the product media are flat grey boxes with a stock picture glyph, a tone the reference never uses."
    },
    {
      "id": "commerce--page--home--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The phone keeps the reference's structure (10): white header with a black cart block, a lemon band with a large title, a 1px seam, paper body and stacked filters. The band sticker is only a cropped sliver at the right edge, well under the 64–96px the spec allows on phones. The category pill row either wraps with one pill left alone on a second line or is cut off at the edge, where the reference keeps one tidy row."
    },
    {
      "id": "commerce--page--home--desktop-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The chrome swaps correctly: black header, white current pill, pink cart block, and the lemon band is unchanged. Below the band, though, the ground is dark grey and the cards are pure black with mid-grey media boxes. That reverses the reference's crisp black ground (11), so the page reads murky and the black footer no longer stands apart as its own field."
    },
    {
      "id": "commerce--page--home--mobile-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "Same as desktop dark: the band, flags and pink cart block survive, but the grey ground with black cards and grey placeholders loses the reference's black-ground contrast. The cards stack as murky dark blocks with no clear separation from the page."
    },
    {
      "id": "commerce--page--products-canvas-field-tote--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "A lemon band with an underlined breadcrumb and a section-size title, then a framed media box beside a pink price flag, a white option panel with 48px controls, a pink add-to-cart button and a ruled details box. This is the reference's form language (07). The selected option is marked with an ink outline (inside a pill in two samples) rather than the pink selected border, and the media box is grey in two samples."
    },
    {
      "id": "commerce--page--products-canvas-field-tote--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The band, the full-width framed media, the flag, the white option panel and the ruled details list stack cleanly at a 16px gutter, much like the reference's phone app screen. The option choices are pills that wrap onto a second line, and the selected one has no pink border, so the selection reads weaker than the reference's option cards."
    },
    {
      "id": "commerce--page--products-canvas-field-tote--desktop-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The band, the pink cart block, the flag and the pink button carry over, but the panels are black on a dark grey ground with a grey media box. The depth order is inverted from the reference's dark mode, and the option panel's hairlines are faint, so the drawn-frame character weakens."
    },
    {
      "id": "commerce--page--products-canvas-field-tote--mobile-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The lemon band sits on a dark grey body with black panels. The flag and the pink action still read, but the grey-over-black layering is muddier than the reference's black ground with lighter boxes."
    },
    {
      "id": "commerce--page--products-merino-crew-sweater--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "Identical in structure to the tote page: lemon band with breadcrumb, a flag-led buy panel, ink-framed boxes on paper. It is close to the reference's hairline form screens. The size choices are again marked by an ink outline and pill shape rather than the pink selected border, and the media box is grey in two samples."
    },
    {
      "id": "commerce--page--products-merino-crew-sweater--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "A clean stacked product page in the reference's phone language. However, in all three samples the breadcrumb wraps so that the slash separator starts the second line, and in one sample the size choices wrap to leave a single option alone. The reference keeps its breadcrumb on one line."
    },
    {
      "id": "commerce--page--products-merino-crew-sweater--desktop-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "Chrome swaps are right (pink cart block), but the black panels sit on a dark grey ground. The size pills and the details rows lose contrast against it, so the page is flatter and murkier than the reference's dark appearance."
    },
    {
      "id": "commerce--page--products-merino-crew-sweater--mobile-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "A stacked dark product page with the lemon band intact. The grey ground with black boxes and grey media inverts the reference's depth, and the hairlines nearly vanish."
    },
    {
      "id": "commerce--page--cart--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "A periwinkle band with a large title, then a dashed white empty state holding a drawn tote sticker, one sentence and a pink action. This is the reference's dashed empty pattern (06) raised with a drawing. The main action is a plain pink button with no plate stack, and two of the three stickers are thin and only lightly extruded next to the reference's chunky die-cut objects."
    },
    {
      "id": "commerce--page--cart--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The band, the dashed empty box with its sticker and the pink action stack well on a phone, close to the reference's app phone screen. As on desktop, the only action is a flat pink button with no plate stack, so the screen's one main next step lacks the brand's signature CTA."
    },
    {
      "id": "commerce--page--cart--desktop-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The empty state's box turns pure black, so the sticker's black ink outline disappears into it and the drawing becomes flat colored shapes. The dashed border is barely visible against the dark grey ground. The reference keeps its ink-outlined stickers fully drawn in dark mode."
    },
    {
      "id": "commerce--page--cart--mobile-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "Same as desktop dark: the tote sticker loses its outline on the black box, and the dashed frame almost vanishes into the dark grey ground. The band and pink action survive, but the drawn character of the empty state is gone."
    }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "major",
      "area": "referenceFidelity",
      "summary": "Dark mode still reverses the reference's depth. The page ground is dark grey and the boxes are pure black, where the reference has a black ground with lighter boxes. Every dark screen reads murky, hairlines and dashed frames nearly vanish, and a sticker drawn with a black ink outline loses that outline inside a black box and turns into flat shapes. The earlier verdict named this gap, and it has not closed because the spec's dark tokens still set it up.",
      "samples": 3,
      "of": 3,
      "specCaused": true,
      "specRule": "Dark tokens: `color.surface.default` | `#242423`; `color.surface.raised` | `#000000`",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--home--desktop-dark--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--cart--desktop-dark--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--products-canvas-field-tote--desktop-dark--s2.png",
        "pipeline/gumroad-study/reference/set/11-desktop.png"
      ],
      "items": [
        "commerce--page--home--desktop-dark",
        "commerce--page--home--mobile-dark",
        "commerce--page--products-canvas-field-tote--desktop-dark",
        "commerce--page--products-canvas-field-tote--mobile-dark",
        "commerce--page--products-merino-crew-sweater--desktop-dark",
        "commerce--page--products-merino-crew-sweater--mobile-dark",
        "commerce--page--cart--desktop-dark",
        "commerce--page--cart--mobile-dark"
      ],
      "promptFix": "Dark mode: the page ground (`color.surface.default`) is black (#000000) and raised boxes (`color.surface.raised`) are one step lighter (#242423), edged with the 35% white hairline. Depth then reads as it does in light mode, with paper under white. Media placeholders use `color.surface.raised` too, never a third grey. A sticker keeps its ink outline in both modes, so wherever a sticker would sit on a black field, give it a raised or band-colored field behind it."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "polish",
      "summary": "Missing product images are flat grey boxes with a stock picture glyph, a grey that is neither paper nor white. The reference keeps empty media in white or paper inside the ink frame, and one sample here already does that.",
      "samples": 2,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--home--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--home--desktop-light--s3.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--home--desktop-light--s2.png",
        "pipeline/gumroad-study/reference/set/06-desktop.png"
      ],
      "items": [
        "commerce--page--home--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "The header band's sticker is still a small fragment jammed into the band's top-right corner, about 70px on desktop and a sliver on phones. The reference's stickers are big, chunky objects that clearly belong to the composition.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--home--mobile-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--home--mobile-light--s2.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--home--desktop-light--s2.png",
        "pipeline/gumroad-study/reference/set/01-desktop.png"
      ],
      "items": [
        "commerce--page--home--mobile-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "Choices on the buy panel (color, size) are drawn as pill radios, or as boxes with a thicker ink border, and the selected one is marked only by a pink radio dot and an ink outline. The reference's option cards are `radius.sm` boxes whose selected state is a pink border, and its pills are kept for position only.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--products-canvas-field-tote--desktop-light--s2.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--products-merino-crew-sweater--desktop-light--s3.png",
        "pipeline/gumroad-study/reference/set/07-desktop.png"
      ],
      "items": [
        "commerce--page--products-canvas-field-tote--desktop-light",
        "commerce--page--products-canvas-field-tote--mobile-light",
        "commerce--page--products-merino-crew-sweater--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "The empty state's single main action is a plain pink button with no lemon and red plate stack behind it, so the screen's one next step lacks the reference's signature CTA. Two of the three stickers are thin and only lightly extruded next to the reference's chunky die-cut objects.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--cart--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/commerce--page--cart--desktop-light--s2.png",
        "pipeline/gumroad-study/reference/set/04-desktop.png"
      ],
      "items": [
        "commerce--page--cart--desktop-light",
        "commerce--page--cart--mobile-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "On phones the header band's breadcrumb wraps so that the slash separator starts the second line. In one sample the option choices also wrap and leave one item alone.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/sheets/commerce--page--products-merino-crew-sweater--mobile-light.png"
      ],
      "items": [
        "commerce--page--products-merino-crew-sweater--mobile-light"
      ],
      "promptFix": ""
    }
  ]
}
```