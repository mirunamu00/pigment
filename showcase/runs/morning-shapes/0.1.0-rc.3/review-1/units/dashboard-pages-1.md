```json
{
  "items": [
    { "id": "dashboard--page--home--desktop-light", "status": "finding", "fidelity": 4, "note": "White header with a greeting, a breathing crescent glyph and an ink pill, then four saturated stat tiles with cream pictogram plates, a cream chart panel with yolk bars and a cream activity list. Clearly the reference's language and tidy. But the tile figures are only about 32px, the round plates compete with them, and the deltas wrap with the arrow hanging loose. The reference's color tiles let one huge bold number dominate under a small eyebrow." },
    { "id": "dashboard--page--home--mobile-light", "status": "ok", "fidelity": 4, "note": "Compact cream top bar with a menu circle and a one-row search with an ink pill, then the greeting with its crescent glyph and full-width stacked stat tiles in four hues. Each tile has a pictogram plate (pill, sun over a hill, bell, clock). The flat crescent-shaded plates and saturated tiles read as the reference's (08, 07). Hierarchy is clear, and the deltas no longer wrap at this width." },
    { "id": "dashboard--page--home--desktop-dark", "status": "finding", "fidelity": 4, "note": "Night version: navy page, indigo sidebar and panels, white pills with ink labels, and stat tiles that keep their full-strength hues. A convincing derivation of the reference's night palette (03). It shares the light screen's undersized tile figures and the awkward wrap of the delta lines." },
    { "id": "dashboard--page--home--mobile-dark", "status": "ok", "fidelity": 4, "note": "Navy page with an indigo top bar, white pills, and the same stacked saturated tiles with cream plates. Type is bold and tight and spacing is even. It reads as the reference's night palette carried into a data screen." },
    { "id": "dashboard--page--projects--desktop-light", "status": "finding", "fidelity": 4, "note": "Blue header band with a sag arc, a bold title and an on-field lead. The cluster is now a large crescent-shaded yellow hexagon overlapped by a pink pill, plus a large and a small sparkle: a real composition, no longer rc.2's corner stamp. Below it, a cream panel holds ink/cream filter pills with the dot, a pill search field and a clean ruled table with cream circle row actions. Still sparser than the reference's band art: two shapes in a tall band whose lower-left half is empty colour." },
    { "id": "dashboard--page--projects--mobile-light", "status": "finding", "fidelity": 4, "note": "The rc.2 gap is closed: the band's cluster now sits small in the top-right corner and no longer takes a row of its own. The title is bold and the arc sags. The band still has roughly 90px of empty blue below the lead, more than the spec's text plus space.8, so it is taller than the reference's compact phone hero (04). Filter pills wrap to two rows, and the table scrolls in its frame." },
    { "id": "dashboard--page--projects--desktop-dark", "status": "ok", "fidelity": 4, "note": "The blue band keeps its hue on a navy page, the indigo panel holds white and indigo filter pills, and the table sits on navy with lilac rules. The hexagon and pill cluster reads well against the night ground. It matches the reference's night language." },
    { "id": "dashboard--page--projects--mobile-dark", "status": "ok", "fidelity": 4, "note": "A compact blue band with the corner cluster, indigo panels, a white selected pill with an ink dot and indigo unselected pills. Same structure as light and just as considered, apart from the slightly tall band." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-light", "status": "ok", "fidelity": 4, "note": "Blue header band with an on-field breadcrumb, an h2 title, meta and a white status tag, and the area's hexagon cluster. The ink-dot tab pills sit on white below it, and a cream panel holds the summary and white fact cards. Only one saturated field is in view, so rc.2's stacked-field gap is closed. The fact cards are plain label-and-value boxes, a little more generic than the reference's toned tiles." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-light", "status": "ok", "fidelity": 4, "note": "The band stacks breadcrumb, title, meta and tag, with the cluster tucked in the corner and the text kept clear of it. Then the ink/cream tab pills and a cream panel with white fact cards in two columns. Hierarchy is clear and the rhythm is generous, like the reference's phone layout." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-dark", "status": "ok", "fidelity": 4, "note": "Night detail: the blue band over navy, white and indigo tab pills, an indigo panel with lighter indigo fact cards, and the footer starting with a rising arc. It reads as the reference's derived night palette, with depth by tone and no borders." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-dark", "status": "ok", "fidelity": 4, "note": "Same structure as the light phone screen on navy with indigo cards. The white status tag and the white selected tab carry contrast well, and the cluster stays in the band's corner." },
    { "id": "dashboard--page--team--desktop-light", "status": "ok", "fidelity": 4, "note": "Green band with a sag arc. Its cluster, a large crescent-shaded orange disc with a flat-bottomed cloud and two sparkles, is a different lead shape from the projects area, as the spec asks. Below, a cream panel holds a ruled table with crescent-shaded colour avatars. The band art is a little thin next to the reference's dense scene (02), but it is clearly the same family." },
    { "id": "dashboard--page--team--mobile-light", "status": "ok", "fidelity": 4, "note": "Compact green band with the disc-and-cloud cluster in the corner and a bold title, then the table in a cream panel. The table scrolls sideways with crescent-shaded avatar discs. The band carries some extra empty green under the lead, but the screen is clean and recognisably the reference's." },
    { "id": "dashboard--page--team--desktop-dark", "status": "ok", "fidelity": 4, "note": "The green band over navy, an indigo panel with a navy table body and lilac rules, and the same avatar discs. The night palette is applied consistently with the other areas, and hierarchy is clear." },
    { "id": "dashboard--page--team--mobile-dark", "status": "ok", "fidelity": 4, "note": "The night phone team screen: compact green band with the corner cluster, an indigo panel with a navy table body, bright avatar discs and blue link text. Consistent with the other dark screens and well spaced." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "hierarchy",
      "summary": "Stat-tile figures are still about 32px, and a white pictogram plate the same visual weight sits beside each one. On desktop the delta line wraps, leaving the arrow hanging. The reference's colour tiles let one huge bold number dominate under a small eyebrow, with nothing competing. This was named in rc.2 and is still open.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/dashboard--page--home--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/dashboard--page--home--desktop-dark--s1.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": [
        "dashboard--page--home--desktop-light",
        "dashboard--page--home--desktop-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "Header-band clusters are now real compositions with a different lead shape per area, so rc.2's small repeated stamp is fixed. They are still thin: one lead shape, one overlapping shape and two sparkles in a tall band whose lower-left half is empty colour. The reference's bands carry a denser overlapping scene that balances the text block.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/dashboard--page--projects--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/dashboard--page--team--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/02-desktop.png"
      ],
      "items": [
        "dashboard--page--projects--desktop-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "On phones the compact header band now keeps its cluster in the corner, so rc.2's stacked art row is fixed. It still leaves about 90px of empty field below the lead before the arc, more than the spec's text plus space.8. The band takes about a third of the first screen, where the reference's phone hero is tighter.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/dashboard--page--projects--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/dashboard--page--team--mobile-light--s1.png",
        "pipeline/headspace-study/reference/set/04-mobile.png"
      ],
      "items": [
        "dashboard--page--projects--mobile-light"
      ],
      "promptFix": ""
    }
  ]
}
```