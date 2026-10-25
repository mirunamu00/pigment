```json
{
  "items": [
    { "id": "dashboard--page--home--desktop-light", "status": "finding", "fidelity": 4, "note": "Clearly the reference language: white top bar with a black current pill, a lemon header band closed by an ink seam with a chunky die-cut folder cropped at the right edge, four ink-framed stat tiles with section-size numbers and dot legends, a pink line over grey bars in a framed panel, a ruled activity list and the black footer with a pink arrow button. Below the reference's craft in two places. The band is sized to its sticker: the title and lead sit over about 120px of empty lemon, and search lives outside the band, where 06 packs search, pills and breadcrumb into a compact full band. The table's budget column puts a pink flag in every row." },
    { "id": "dashboard--page--home--mobile-light", "status": "finding", "fidelity": 4, "note": "Lemon band with the folder sticker cropped at the right edge and a white outline action, stat tiles stacked as ink boxes, the chart and the black footer; it stacks much like 10-mobile. The nav pill row runs past the right edge ('Settings' touches the frame) and the table clips its second column mid-word with no scroll cue. Both are the agent's own overflow slips, not the spec's." },
    { "id": "dashboard--page--home--desktop-dark", "status": "finding", "fidelity": 4, "note": "Faithful inversion as in 11: black ground, the current nav pill turns white, the lemon band and sticker are unchanged, and tiles and panels sit on near-black with grey hairlines. The lemon band meets the black body with no visible ink seam. The black footer melts into the black ground with only a faint rule, so the closing field the reference keeps distinct is lost." },
    { "id": "dashboard--page--home--mobile-dark", "status": "ok", "fidelity": 4, "note": "Dark phone layout keeps the white current pill, the unchanged lemon band with a thick folder sticker and the white on-band button, as the reference keeps band content in its light look. The near-black tiles with grey hairlines read as the same family as 11." },
    { "id": "dashboard--page--projects--desktop-light", "status": "finding", "fidelity": 4, "note": "A periwinkle header band with a thick lemon notepad sticker cropped at the trailing edge, then a paper body with an outline-pill filter row, a bordered filter input and an ink-framed table with a paper header row, ruled rows, status pills and flags. This is close to 06's product chrome. As on the overview, though, the band holds only title and lead over a tall empty field, while the filter pills and search sit below it on paper. Every row also carries a pink flag." },
    { "id": "dashboard--page--projects--mobile-light", "status": "ok", "fidelity": 4, "note": "Band and notepad sticker hold at phone size, cropped by one side. Below them come an outline 'All' pill, a full-width bordered filter field and an ink-framed table, close to the stacked filter box in 10-mobile. The table shows two columns and cuts the rest at the frame, the same agent overflow slip noted on the overview." },
    { "id": "dashboard--page--projects--desktop-dark", "status": "ok", "fidelity": 4, "note": "The periwinkle band and sticker are unchanged on black, the current nav pill is white, and the table has a black header row with near-black ruled rows and pink flags. It matches how 11 inverts while keeping the bands. The band-to-body seam is soft here too, but the structure reads clearly." },
    { "id": "dashboard--page--projects--mobile-dark", "status": "ok", "fidelity": 4, "note": "The dark phone list keeps the periwinkle band with its thick notepad sticker, the white current pill, an outline filter pill and a dark bordered field. The framed table is consistent with the desktop dark screen and the reference's dark treatment." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-light", "status": "finding", "fidelity": 4, "note": "This is the best band on the app: periwinkle with an underlined breadcrumb, a large title, a meta line, a white status pill and outline-pill sub-tabs, compact and full like 06. The body is weaker than the reference. It is one white panel nested around a second ruled box, a doubled frame. The panel stops short of the content width, and most of the screen below is empty paper." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-light", "status": "ok", "fidelity": 4, "note": "Breadcrumb, title, status pill and pill tabs stack neatly in the periwinkle band. Below it, a ruled label–value list carries the flag on the money row, which is how the spec turns a short table into rows and matches the ink-hairline stack in 10-mobile." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-dark", "status": "ok", "fidelity": 4, "note": "The periwinkle band keeps its light-mode content on black, and the nested ruled panel turns near-black with grey hairlines and a pink flag. It is consistent with 11's inversion. It has the same doubled frame and sparse body as the light version." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-dark", "status": "ok", "fidelity": 4, "note": "The dark phone detail keeps the band, the white status pill and the outline tab pill, with a near-black ruled value list and a pink flag below. It is coherent with the rest of the dark family and the reference's dark treatment." },
    { "id": "dashboard--page--team--desktop-light", "status": "finding", "fidelity": 4, "note": "A teal header band with a thick marigold mug sticker cropped at the trailing edge, then an ink-framed table with a paper header and ruled rows with initial avatars. The construction is close to the reference's hairline chrome. A pink notched flag marks every row of a small count column, so six flags become the loudest thing on the screen. The reference spends pink on a few accents. The band again holds only title and lead over a tall empty strip." },
    { "id": "dashboard--page--team--mobile-light", "status": "finding", "fidelity": 4, "note": "Teal band and mug sticker hold at phone size, and the framed table keeps its ink rules. The table cuts the second column mid-word at the frame with no sticky column or scroll cue, and the nav pills run to the edge. These are agent overflow slips, since the spec asks for a sticky first column or a ruled list." },
    { "id": "dashboard--page--team--desktop-dark", "status": "finding", "fidelity": 4, "note": "Teal band unchanged on black, a white current nav pill, a black table header and near-black ruled rows with pink flags, as in 11's inversion. The black footer is set off from the black body only by a faint grey rule, so the closing field the reference reads as its own block disappears." },
    { "id": "dashboard--page--team--mobile-dark", "status": "ok", "fidelity": 4, "note": "The dark phone team screen keeps the teal band, the mug sticker cropped at the edge, the white current pill and a dark framed table with dark avatar discs. It is consistent with the dark family, and it shares the light version's clipped second column, which is the agent's slip." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "major",
      "area": "spacingRhythm",
      "summary": "Product header bands on overview and list screens hold only a title and a one-line lead, stretched to the sticker's height. That leaves 100–140px of empty band colour, while the screen's search and filter pills sit outside the band, in the top bar or on paper below. The reference's header band is compact and full: search, pill tabs and breadcrumb all live inside it, so the colour field carries the page's controls rather than empty space. The detail screen, which puts breadcrumb and pill tabs in its band, shows how much better this reads. The gap from the earlier verdict is still open.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--home--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--projects--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--team--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--projects-apollo-migration--desktop-light--s1.png",
        "pipeline/gumroad-study/reference/set/06-desktop.png"
      ],
      "items": [
        "dashboard--page--home--desktop-light",
        "dashboard--page--projects--desktop-light",
        "dashboard--page--team--desktop-light"
      ],
      "promptFix": "A product header band is filled with the screen's own controls, not padded to its sticker. Inside the band, in this order: breadcrumb (when the screen has a parent), title, lead, then one row with the screen's search or filter field and its pill tabs or view filters. Move any screen-level search, filter field or tab row that would otherwise sit just under the band into it. When the screen has no such controls, size the sticker to the title block (down to size.stickerSm) instead of growing the band. Never leave more than space.8 of empty band colour below the last line of content."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "polish",
      "summary": "Tables put a pink notched flag in every row, including a small count column on the people table. Six to eight flags become the loudest element on the screen, while the reference spends pink on a few accents and lets the ink-and-paper table carry the page.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--team--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--projects--desktop-light--s1.png",
        "pipeline/gumroad-study/reference/set/06-desktop.png"
      ],
      "items": [
        "dashboard--page--team--desktop-light",
        "dashboard--page--home--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "polish",
      "summary": "In dark mode the colour band meets the black body with no visible ink seam, and the black footer melts into the black ground behind only a faint grey rule. The reference keeps every field closed by a visible edge.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/sheets/dashboard--page--home--desktop-dark.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/sheets/dashboard--page--team--desktop-dark.png",
        "pipeline/gumroad-study/reference/set/11-desktop.png"
      ],
      "items": [
        "dashboard--page--home--desktop-dark",
        "dashboard--page--team--desktop-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "The item detail body is one white panel wrapped around a second ruled box, a doubled frame, and it stops short of the content width with most of the screen empty below it. The reference uses a single ink-framed group divided by rules, set to its content width.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--projects-apollo-migration--desktop-light--s1.png",
        "pipeline/gumroad-study/reference/set/07-desktop.png"
      ],
      "items": [
        "dashboard--page--projects-apollo-migration--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "On phones the data tables cut their second column mid-word at the frame with no sticky column or scroll cue, and the primary nav pill row runs to the screen edge. The spec asks for a sticky first column or a ruled list, so these are the agent's own errors.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/crops/dashboard--page--team--mobile-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-1/sheets/dashboard--page--home--mobile-light.png"
      ],
      "items": [
        "dashboard--page--team--mobile-light",
        "dashboard--page--home--mobile-light"
      ],
      "promptFix": ""
    }
  ]
}
```