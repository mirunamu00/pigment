```json
{
  "items": [
    { "id": "landing--page--home--desktop-light", "status": "ok", "note": "Paper hero with centered regular-weight display title, one pink 'Start free trial' CTA next to a ghost button, and flat ink-outlined stickers (coin with rim, star, ticket) tilted and cropped at the edges around a sticker calendar. Below it, outlined feature cards, a full-bleed yellow band section, an ink stat block and FAQ disclosure rows with 1px rules give the reference's loud, flat marketplace voice with clear hierarchy." },
    { "id": "landing--page--home--mobile-light", "status": "ok", "note": "The hero collapses cleanly: the title drops a step, the CTA and ghost button stack, and the hero stickers sit static in a row below the calendar so they never cover text. The 'trusted by' pill strip runs off the right edge as a scrolling tag wall, and the cards, yellow band, stats, FAQ and final CTA all stack in one column with even gutters." },
    { "id": "landing--page--home--desktop-dark", "status": "ok", "note": "Black ground with dark raised cards and paper outlines. The pink CTA stays the only pink action in the hero, the stickers keep their pink, yellow and teal fills, the yellow band keeps ink text over dark step cards, and the stat block flips to paper, all following the dark mapping." },
    { "id": "landing--page--home--mobile-dark", "status": "ok", "note": "Same stacked structure as mobile light on a black ground. The 'Create your link' button on the yellow band turns paper-filled with ink text, the step cards stay readable, and the static sticker row and pink CTA are fully visible at phone width." },
    { "id": "landing--page--pricing--desktop-light", "status": "ok", "note": "A periwinkle band with ink title and a Monthly/Yearly pill toggle (selected pill raised) sits over three outlined plan cards with pink price tags. Only the middle plan's button is pink and the others are ghost. Below come a bordered compare table with a header rule, FAQ disclosures with a small sticker by the heading, and a CTA row." },
    { "id": "landing--page--pricing--mobile-light", "status": "finding", "note": "The band, the stacked plan cards with pink price tags and the single pink 'Start with Team' all hold. The compare table, however, keeps its desktop columns at 390px: the third column header is cut off mid-word and the last plan column is off-screen, with no stacked reflow." },
    { "id": "landing--page--pricing--desktop-dark", "status": "ok", "note": "Periwinkle band with ink text, and the selected Monthly pill becomes a dark raised pill. Plan cards are dark raised boxes with paper borders and pink price tags, there is one pink plan button, and the compare table stays inside its bordered box." },
    { "id": "landing--page--pricing--mobile-dark", "status": "finding", "note": "Stacked dark plan cards and the band read well. The compare table has the same clipping as in light: the third column header is cut off and the fourth column is out of view at phone width." },
    { "id": "landing--page--customers--desktop-light", "status": "finding", "note": "A teal band with ink title, a featured quote card with a small speech-bubble sticker, a pill filter row (All selected as a raised pill) and a 4-column grid of outlined story cards with outline tag pills. The featured quote card fills only the left half of the container, leaving the right half empty beneath a full-width band." },
    { "id": "landing--page--customers--mobile-light", "status": "ok", "note": "The teal band collapses to title and lead. The quote card fills the width, the filter pills become a strip that scrolls off the right edge, and the eight story cards stack with even gaps above the pink final CTA and the ghost button." },
    { "id": "landing--page--customers--desktop-dark", "status": "ok", "note": "Teal band keeps ink text, the Customers header pill turns paper as the current page, and the story cards are dark raised boxes with paper outlines and readable tag pills. The final CTA is the only pink action." },
    { "id": "landing--page--customers--mobile-dark", "status": "ok", "note": "Stacked dark story cards with paper outlines below the teal band. The pill strip and quote card are readable, and the single pink CTA sits at the end of the page in the flow." },
    { "id": "landing--page--signup--desktop-light", "status": "ok", "note": "A yellow band with ink title and a 'Free for 14 days' pill, then a two-column layout: a trial checklist on the left and an outlined form card on the right. The form has ink-bordered inputs, a select, a Show password button, a checkbox and one pink 'Create account' submit, with a quiet link below it." },
    { "id": "landing--page--signup--mobile-light", "status": "ok", "note": "The band collapses to title and lead, the checklist sits above a full-width form card, and the fields stack in one column with even label-to-input spacing. The pink submit stays in the flow, and nothing is cramped or clipped." },
    { "id": "landing--page--signup--desktop-dark", "status": "ok", "note": "Yellow band with ink text and a dark pill. The form card is dark raised with paper-outlined inputs, and the pink submit is the only colored action. The paper Sign up button in the header follows the dark ink-to-paper mapping." },
    { "id": "landing--page--signup--mobile-dark", "status": "ok", "note": "Single-column dark form under the yellow band. Inputs, select, checkbox and the Show button keep paper outlines, and the pink 'Create account' is fully visible with the secondary link underneath." }
  ],
  "findings": [
    {
      "severity": "major",
      "area": "componentStates",
      "summary": "At phone width the plan-comparison table keeps its four desktop columns instead of reflowing. The third column header is cut off mid-word and the last column is entirely out of view, so a person cannot see what the top plan includes without discovering a hidden sideways scroll. The spec's layout rule says tables reflow to stacked row blocks under breakpoint.md.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/landing--page--pricing--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/landing--page--pricing--mobile-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.6/landing/20261019-222324-s1/screenshots/pricing-mobile-light.png"
      ],
      "items": ["landing--page--pricing--mobile-light", "landing--page--pricing--mobile-dark"],
      "promptFix": "Every table, including comparison or matrix tables on marketing pages, follows the phone-width table rule: under breakpoint.md each row becomes a stacked block that shows its label and then every column as a label-value pair. If a matrix must stay a grid, it fits all its columns at 390px without clipping any header. Check at 390px that every column header and every cell is fully visible without scrolling sideways."
    },
    {
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "On desktop the single featured quote card takes only the left half of the container under a full-width band and above a full-width grid, so the section looks stranded with a large empty area on the right.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/review-3-holdout/sheets/landing--page--customers--desktop-light.png"
      ],
      "items": ["landing--page--customers--desktop-light"],
      "promptFix": ""
    }
  ]
}
```