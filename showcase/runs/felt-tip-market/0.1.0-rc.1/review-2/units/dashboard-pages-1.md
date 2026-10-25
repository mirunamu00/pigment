```json
{
  "items": [
    {
      "id": "dashboard--page--home--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "This reads as the reference's product chrome. There is a lemon header band with a 1px black seam, a black current pill, ink-framed stat tiles with 48px numbers and dot legends, a pink line over grey bars with ink caps, ruled activity rows and a black footer. The weak point is the header sticker. It is a roughly 70px parcel pushed off the band's right edge so that only a fragment shows. The reference's objects are chunky and plainly die-cut."
    },
    {
      "id": "dashboard--page--home--mobile-light",
      "status": "finding",
      "fidelity": 3,
      "note": "The band, tiles and chart stack cleanly at phone width with the reference's hairline character, close to 10-mobile. The header sticker shrinks to a sliver at the band's corner, though, so the screen loses its one drawn object. In two samples the pill nav runs off the screen instead of collapsing into the menu button, unlike the reference's tidy phone header."
    },
    {
      "id": "dashboard--page--home--desktop-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The lemon band, pink flag and chart colours stay unchanged, and the current nav pill turns white, as in 11-desktop. The ground is dark grey and the tiles and panels are pure black, which is the reverse of the reference's black ground with lighter boxes. Panels and the black footer and top bar blur together, and the corner sticker is still a fragment."
    },
    {
      "id": "dashboard--page--home--mobile-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "This is the same stacked layout as light mode, with bands and the sticker kept. The grey ground under black tiles reverses the reference's dark depth, so tiles read as holes rather than raised boxes, and the sticker is a corner sliver."
    },
    {
      "id": "dashboard--page--projects--desktop-light",
      "status": "ok",
      "fidelity": 4,
      "note": "A periwinkle area band with a seam sits over a paper body, with an outline current pill for the filter, a bordered search field and an ink-framed table. The header row is on paper, rows are ruled at 56px, status pills have ink-outlined dots, and pink notched flags mark the budget cells. This is very close to how 06 and 07 keep dense UI flat and drawn."
    },
    {
      "id": "dashboard--page--projects--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The band and filter pills hold up, and the table scrolls inside its frame as the reference's boxes do. In one sample the sticky first column is so narrow that project names break one word per line and the status pills are cut off at the frame edge. That is a layout fault, not a fault in the language."
    },
    {
      "id": "dashboard--page--projects--desktop-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "The periwinkle band and pink flags carry over unchanged, and the table keeps its ink rules. As on the other dark screens, the grey page ground sits behind a black table, which inverts the reference's black-ground, lighter-box depth."
    },
    {
      "id": "dashboard--page--projects--mobile-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "The dark phone table matches the light one: band, filters and a ruled table in a frame. One sample again shows the narrow first column with one word per line and clipped status pills."
    },
    {
      "id": "dashboard--page--projects-apollo-migration--desktop-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The detail header band carries the underlined breadcrumb, a section-size title, a status pill and outline-pill tabs. The paper body has one white panel split by ink rules into fact cells, with a pink flag on the budget. This is the reference's quiet header band and bordered panel from 07, and the body is sparse but considered."
    },
    {
      "id": "dashboard--page--projects-apollo-migration--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The band content and the ruled fact grid stack well, with the breadcrumb, pill tabs and flag intact. In two samples the primary nav row overflows and clips its last item instead of collapsing into the menu button."
    },
    {
      "id": "dashboard--page--projects-apollo-migration--desktop-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "The band, tabs and flag are kept. In two samples the status pill on the periwinkle band turns black with white text, so a piece of the band switches to dark chrome while the reference keeps everything on a band exactly as in light."
    },
    {
      "id": "dashboard--page--projects-apollo-migration--mobile-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "The phone layout matches the light one. The status chip on the band turns black in two samples, which breaks the rule that band content looks the same in both modes."
    },
    {
      "id": "dashboard--page--team--desktop-light",
      "status": "ok",
      "fidelity": 4,
      "note": "A teal area band sits over an ink-framed member table, with a paper header row, ruled rows, initials in ink-outlined boxes or circles and underlined email links. One sample puts a pink count flag in every row. The table is flat and drawn like the reference's dense screens, though plainer than its signature moments."
    },
    {
      "id": "dashboard--page--team--mobile-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The band stays and the four-column table scrolls inside its frame, which matches the reference's boxed density. Two samples let the primary pill nav run off the right edge and squeeze the search field, where the reference has one clean phone header row."
    },
    {
      "id": "dashboard--page--team--desktop-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "The teal band and the ruled table carry over. The grey ground with a black table again reverses the reference's dark depth, so the table and the black footer read as the same field."
    },
    {
      "id": "dashboard--page--team--mobile-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "The dark phone table is clean and consistent with light mode. In two samples the primary nav row still overflows the screen instead of collapsing."
    }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "major",
      "area": "signature",
      "summary": "The overview header sticker, the only drawn object on product screens, is still a small fragment, so the gap from the earlier review is not closed. On desktop it is about 70px and pushed so far past the band's right edge that half or more of it is cut off. On phones only a sliver shows. The parcel has a thin extrusion and few inner strokes. The reference's objects are big, chunky die-cut forms with a deep rim, and they read as a deliberate part of the composition, not a clipped corner.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--home--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--home--desktop-light--s3.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--home--mobile-light--s3.png",
        "pipeline/gumroad-study/reference/set/01-desktop.png"
      ],
      "items": [
        "dashboard--page--home--desktop-light",
        "dashboard--page--home--mobile-light"
      ],
      "promptFix": "A header-band sticker is at least as tall as the band's title block (never under 64px). It sits vertically centred near the band's trailing edge and shows at least 60% of itself on every viewport. If the band is too short, shrink the sticker or move it inward rather than cropping it to a sliver. It keeps its full construction at that size: a visible extruded side at least 8% of its height, and 1–3 inner strokes."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "referenceFidelity",
      "summary": "In dark mode the page ground is dark grey and every tile, panel and table is pure black, the reverse of the reference's black ground with lighter boxes. Boxes read as recessed, and the black top bar and footer merge with the panels. The spec's dark tokens set it up this way, as the earlier review noted.",
      "samples": 3,
      "of": 3,
      "specCaused": true,
      "specRule": "Dark tokens: `color.surface.default` | `#242423`; `color.surface.raised` | `#000000`",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--home--desktop-dark--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--projects--desktop-dark--s2.png",
        "pipeline/gumroad-study/reference/set/11-desktop.png"
      ],
      "items": [
        "dashboard--page--home--desktop-dark",
        "dashboard--page--home--mobile-dark",
        "dashboard--page--projects--desktop-dark",
        "dashboard--page--team--desktop-dark"
      ],
      "promptFix": "Dark mode: the page ground (`color.surface.default`) is black (#000000), and raised boxes (`color.surface.raised`) are one step lighter (#242423) with the 35% white hairline. Depth then reads the same way as white boxes on paper in light mode."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "referenceFidelity",
      "summary": "In dark mode the status pill on the area band turns black with white text, because the status pill is defined as a `color.surface.raised` fill and that token goes black in dark. The reference keeps everything on a band exactly as in light.",
      "samples": 2,
      "of": 3,
      "specCaused": true,
      "specRule": "Status pill: `color.surface.raised`, `border.width.hair` `color.border.default`",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/sheets/dashboard--page--projects-apollo-migration--desktop-dark.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/sheets/dashboard--page--projects-apollo-migration--mobile-dark.png"
      ],
      "items": [
        "dashboard--page--projects-apollo-migration--desktop-dark",
        "dashboard--page--projects-apollo-migration--mobile-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "On phones the primary pill nav does not collapse into the menu button. It runs off the right edge, clips its last item, and squeezes the search field below it. The spec asks for a menu button below the large breakpoint.",
      "samples": 2,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--projects--mobile-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--projects--mobile-light--s3.png"
      ],
      "items": [
        "dashboard--page--projects-apollo-migration--mobile-light",
        "dashboard--page--team--mobile-light",
        "dashboard--page--team--mobile-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "In the scrolling table on phones, the sticky first column is so narrow that names break one word per line, and status pills are cut off at the frame edge.",
      "samples": 1,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.1/review-2/crops/dashboard--page--projects--mobile-light--s3.png"
      ],
      "items": [
        "dashboard--page--projects--mobile-light",
        "dashboard--page--projects--mobile-dark"
      ],
      "promptFix": ""
    }
  ]
}
```