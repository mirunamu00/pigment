```json
{
  "items": [
    { "id": "blog--page--home--desktop-light", "status": "finding", "fidelity": 4, "note": "This is a lemon hero band with a huge medium headline and a ring of five chunky stickers (pencil, eraser, bulb, envelope, book) cropped at the side edges and the bottom seam. Under the headline sits the reference's pair: a black block CTA beside a bordered search input of the same height. Below it come a featured split card and drawn-vignette cards in a 3-up grid, closed by the black footer. It reads as the reference's language. One weak spot is the header's trailing action: a white cell with a hairline, where the reference uses a solid black full-height block." },
    { "id": "blog--page--home--mobile-light", "status": "ok", "fidelity": 4, "note": "The phone hero keeps four stickers cropped by the side edges and the seam. The headline is large, and the CTA and input stack full width at one height. The bands, seams and white boxes stack the way reference 09/10 do. The stickers are thick, with a visible solid strip, and the cards below carry their own drawn vignettes." },
    { "id": "blog--page--home--desktop-dark", "status": "finding", "fidelity": 4, "note": "The dark inversion matches reference 11. The top bar and ground turn black, the current nav pill turns white, and the hero CTA turns pink. The lemon band and stickers stay unchanged, and the cards are raised charcoal with light hairlines. The header's trailing action is a charcoal cell, where the reference turns that block solid pink." },
    { "id": "blog--page--home--mobile-dark", "status": "ok", "fidelity": 4, "note": "On the phone in dark, the lemon hero keeps its stickers. The CTA is pink and full width over a white on-band input, and the black ground below holds raised cards. This is a faithful dark version of the reference's phone stack." },
    { "id": "blog--page--posts-shipping-a-design-system--desktop-light", "status": "finding", "fidelity": 4, "note": "The article opens on a lemon header band with a breadcrumb, a large title and outline tag chips, closed by an ink seam. The body is a prose column with a white ruled on-this-page box beside it, like reference 07's bordered panels, plus a thick drawn figure on teal and a related-posts grid. The code block is a grey box with a grey border. It is the one off-system surface in an otherwise ink-and-paper page." },
    { "id": "blog--page--posts-shipping-a-design-system--mobile-light", "status": "finding", "fidelity": 3, "note": "On the phone, the breadcrumb wraps and repeats the full title right above the large four-line title. The band fills the whole first screen before any reading starts. Reference 10 keeps its band compact, with a one-line breadcrumb. The ruled contents box below is well drawn." },
    { "id": "blog--page--posts-shipping-a-design-system--desktop-dark", "status": "finding", "fidelity": 4, "note": "In dark, the lemon header band is unchanged over a black body, and the contents box, quote and cards are raised charcoal with light hairlines. All of this is right for the system. The code block is still a flat grey slab with no ink frame." },
    { "id": "blog--page--posts-shipping-a-design-system--mobile-dark", "status": "finding", "fidelity": 3, "note": "Same phone header as in light: the wrapped breadcrumb repeats the title, so the lemon band fills the first screen. The dark contents box below is correct." },
    { "id": "blog--page--posts-release-notes-people-read--desktop-light", "status": "finding", "fidelity": 4, "note": "This article has a compact lemon header band with a one-line title, a ruled contents box, and a framed white pull quote. A thick white megaphone drawing sits on marigold, and related cards follow. The template code block is a grey-filled, grey-bordered box. The reference would draw it as a white box with an ink hairline." },
    { "id": "blog--page--posts-release-notes-people-read--mobile-light", "status": "finding", "fidelity": 4, "note": "The phone header band is reasonably compact, with a two-line title and outline chips over a white ruled contents box. The breadcrumb still wraps onto a second line and repeats the full title above the heading." },
    { "id": "blog--page--posts-release-notes-people-read--desktop-dark", "status": "finding", "fidelity": 4, "note": "Dark is faithful: the lemon band is unchanged, the boxes are raised charcoal and the drawing sits on its marigold ground. The code block is a mid-grey slab, a little brighter than the other raised boxes and without their ink-hairline framing." },
    { "id": "blog--page--posts-release-notes-people-read--mobile-dark", "status": "finding", "fidelity": 4, "note": "The phone dark header band repeats the title in the wrapped breadcrumb. Otherwise the dark contents box and the prose follow the system." },
    { "id": "blog--page--about--desktop-light", "status": "finding", "fidelity": 4, "note": "A periwinkle header band holds the title and lead, with one sticker cropped at the trailing edge. The body has prose and an ink-framed ruled author list with circle initials, then the black footer. It is clean and close to reference 07/10. The band's notepad sticker is a pale white pad whose depth is only a stack of thin page lines. Next to the hero's solid objects and the reference's chunky coins, it reads as a light line drawing." },
    { "id": "blog--page--about--mobile-light", "status": "finding", "fidelity": 4, "note": "On the phone, the periwinkle band keeps its sticker cropped by the right edge beside the title and lead, as the spec asks. The pad is again thin in weight: line-stack depth, with no solid strip." },
    { "id": "blog--page--about--desktop-dark", "status": "finding", "fidelity": 4, "note": "In dark, the periwinkle band and its sticker are unchanged over a black body, and the author list is raised charcoal. The inversion is correct, and the band sticker is still the light line-stack pad." },
    { "id": "blog--page--about--mobile-dark", "status": "finding", "fidelity": 4, "note": "This is a faithful dark phone version of the About band and prose. The same thin white pad sticker sits at the band's edge." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "The header-band sticker on the overview page is a white notepad whose depth is only two or three thin page lines (about 7–8% of its height). It reads as a light line drawing next to the hero's solid objects and the reference's chunky die-cut coins. The hero stickers have closed most of the rc.3 depth gap; this flat-paper object has not.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/blog--page--about--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/blog--page--about--mobile-light--s1.png",
        "pipeline/gumroad-study/reference/set/01-desktop.png"
      ],
      "items": [
        "blog--page--about--desktop-light",
        "blog--page--about--mobile-light",
        "blog--page--about--desktop-dark",
        "blog--page--about--mobile-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "hierarchy",
      "summary": "On phones the article header band's breadcrumb wraps and repeats the full title right above the large title. The band says the title twice and, on long titles, fills the first screen. Reference 10 keeps the breadcrumb to one short line in a compact band. This is the same gap as in rc.3.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/blog--page--posts-shipping-a-design-system--mobile-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/blog--page--posts-release-notes-people-read--mobile-light--s1.png",
        "pipeline/gumroad-study/reference/set/10-mobile.png"
      ],
      "items": [
        "blog--page--posts-shipping-a-design-system--mobile-light",
        "blog--page--posts-shipping-a-design-system--mobile-dark",
        "blog--page--posts-release-notes-people-read--mobile-light",
        "blog--page--posts-release-notes-people-read--mobile-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "referenceFidelity",
      "summary": "Article code blocks are grey-filled boxes with grey borders in light, and a mid-grey slab in dark. They are the one surface on the page outside the paper–white–ink triad. The reference draws every box as white, or raised in dark, with a 1px ink hairline. This is the same gap as in rc.3.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/blog/20261025-035935/screenshots/posts-release-notes-people-read-desktop-light.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/blog/20261025-035935/screenshots/posts-shipping-a-design-system-desktop-dark.png",
        "pipeline/gumroad-study/reference/set/07-desktop.png"
      ],
      "items": [
        "blog--page--posts-release-notes-people-read--desktop-light",
        "blog--page--posts-release-notes-people-read--desktop-dark",
        "blog--page--posts-shipping-a-design-system--desktop-light",
        "blog--page--posts-shipping-a-design-system--desktop-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "referenceFidelity",
      "summary": "The top bar's trailing action is a hairline-divided cell with plain text: white in light, charcoal in dark. The reference closes its header with a solid full-height block, black in light and pink in dark, which anchors the bar's right end.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/blog--page--home--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/blog--page--home--desktop-dark--s1.png",
        "pipeline/gumroad-study/reference/set/01-desktop.png",
        "pipeline/gumroad-study/reference/set/11-desktop.png"
      ],
      "items": [
        "blog--page--home--desktop-light",
        "blog--page--home--desktop-dark"
      ],
      "promptFix": ""
    }
  ]
}
```