```json
{
  "items": [
    { "id": "dashboard--page--home--desktop-light", "status": "finding", "fidelity": 4, "note": "A white greeting header with a crescent glyph, then four full-strength yellow, blue, green and orange stat tiles with spot plates, then cream chart and activity panels with flat yellow bars. It is clearly the reference's language and warmth. But the tile numbers are about 32px and sit level with an equal-weight white plate, so no figure dominates the way the 64px numbers do in 08. In sample 3 the delta captions wrap and leave their arrows hanging." },
    { "id": "dashboard--page--home--mobile-light", "status": "finding", "fidelity": 4, "note": "On phones the tiles stack into four full-width colour fields, each with a crescent-shaded plate, under an ink refresh pill and a cream-ledged menu circle. The palette and pills match 04. The figures stay modest, and the glyph keeps its own left column, which squeezes the greeting and title into about 70% of the width, where the reference centres a compact hero." },
    { "id": "dashboard--page--home--desktop-dark", "status": "finding", "fidelity": 4, "note": "The night palette works: a navy page, indigo panels, the white Refresh pill with ink label, and the saturated tiles keep their hues. It reads like 03's night band carried into a product. As in light mode, the stat numbers are too small to carry the tile, and the footer's bottom strip turns bright white (samples 1 and 3)." },
    { "id": "dashboard--page--home--mobile-dark", "status": "finding", "fidelity": 4, "note": "Navy phone screen with white pills, indigo search field and stacked colour tiles; consistent with the light build and the reference's night mood. Same modest stat figures, and the footer ends in a white bar beneath the navy band in samples 1 and 3." },
    { "id": "dashboard--page--projects--desktop-light", "status": "finding", "fidelity": 4, "note": "A blue compact header band with a sagging arc, a white title and lead, then a cream panel with ink and cream filter pills (dot on the selected one), a pill search and a ruled table with status tags and cream circle row actions. These are faithful to 09 and 10. The band's art is a yellow hexagon plus a pill about 230px wide on a 1176px band, the spec's sample cluster copied almost verbatim in all three samples, with about 150px of empty blue under a one-line lead. Next to 02's layered hero scene it reads as a sticker." },
    { "id": "dashboard--page--projects--mobile-light", "status": "ok", "fidelity": 4, "note": "Compact blue band with arcSm, an 88px hexagon cluster tucked in the corner and the title clear of it, then wrapped filter pills, a full-width pill search and a horizontally scrolling table. It is close to 04's stacked band and pill rhythm, and the band is now compact (rc.2's empty band space is gone)." },
    { "id": "dashboard--page--projects--desktop-dark", "status": "finding", "fidelity": 4, "note": "The blue band holds against the navy page. Inactive filter pills are indigo and the active one is white with an ink dot, and the table sits on an indigo frame. It is a convincing night version. It shares the light build's small stamp-like hexagon cluster, and the footer bottom bar renders white." },
    { "id": "dashboard--page--projects--mobile-dark", "status": "finding", "fidelity": 4, "note": "Navy phone screen: compact blue band with corner cluster, indigo panel, white active pill and indigo inactive pills, table scrolling in its frame. On-system and legible, but the footer closes in a stark white strip (samples 1 and 3)." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-light", "status": "finding", "fidelity": 4, "note": "A blue header band with breadcrumb, title, status tag and meta line, then ink and cream tab pills, then a cream overview panel with four key figures. Sample 2 adds a plate holding a server-stack pictogram, and sample 3 puts the figures on white cards. It is well within the language, but it repeats the list page's hexagon cluster at the same small stamp scale, and the figures are body-bold rather than the bold numbers the reference uses to carry data (08)." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-light", "status": "ok", "fidelity": 4, "note": "Compact blue band with breadcrumb, a full-width title, a white status tag and a corner cluster, tab pills below the arc, and a cream panel with a 2×2 figure grid. Tight and well ordered, close to 04's mobile hero density. Sample 3's white figure cards wrap the date and tasks values into three lines, which is slightly clumsy." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-dark", "status": "finding", "fidelity": 4, "note": "Navy page with the blue band, white selected tab pill and indigo overview panel. Sample 3's figures sit on lighter indigo cards. It is consistent with the night palette in 03. The cluster is the same small stamp, and the footer bottom bar turns white in samples 1 and 3." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-dark", "status": "finding", "fidelity": 4, "note": "Night phone screen: blue band with an arc into navy, white and indigo tab pills, an indigo panel with figures. It is on-system and readable. The white footer strip appears again in samples 1 and 3." },
    { "id": "dashboard--page--team--desktop-light", "status": "finding", "fidelity": 4, "note": "A green header band with an arc, then a cream panel holding a ruled member table with avatar discs (each in a category hue in sample 3). The clusters now differ from the projects area: a sun behind a cloud with a pink star in sample 1, a pink blob with a yellow disc in sample 2, an orange disc with a cloud in sample 3. They are well shaded, but each is still about 230px on a wide band, with empty field below the lead, so the band feels underfilled next to 02." },
    { "id": "dashboard--page--team--mobile-light", "status": "ok", "fidelity": 4, "note": "Compact green band with a small corner cluster, then a table of avatar, name and link rows that scrolls in its frame. The band height and pill/plate details match 04's phone rhythm. The member table is plain but legible and correctly undecorated." },
    { "id": "dashboard--page--team--desktop-dark", "status": "finding", "fidelity": 4, "note": "Green band on a navy page, indigo table frame, coloured avatar discs; the night palette is handled well. As in the light build the cluster is a compact stamp and the footer bottom bar is white in samples 1 and 3." },
    { "id": "dashboard--page--team--mobile-dark", "status": "finding", "fidelity": 4, "note": "Night phone screen with the green band, indigo table and coloured avatars. It is on-system and consistent with the light build. It ends in the same white footer strip in samples 1 and 3." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "major",
      "area": "hierarchy",
      "summary": "This has been open since rc.2 and is unchanged in rc.3. Stat-tile figures are still about 32px, level with a white plate of equal visual weight, so the tile reads as label, plate and number with no single dominant figure. On desktop the delta caption wraps and leaves its arrow on its own line (sample 3). The reference's colour tiles (08) let one huge bold number, about 64px under a small eyebrow, carry the whole tile. The spec still sets the number at `font.size.h3`.",
      "samples": 3,
      "of": 3,
      "specCaused": true,
      "specRule": "Stat tile: a small field in a category hue (`radius.sm`, padding `space.6`): label `font.size.label` bold, number `font.size.h3` bold, caption `font.size.body` … optional `size.plateSm` plate.",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--home--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--home--desktop-light--s3.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--home--mobile-light--s1.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": [
        "dashboard--page--home--desktop-light",
        "dashboard--page--home--mobile-light",
        "dashboard--page--home--desktop-dark",
        "dashboard--page--home--mobile-dark"
      ],
      "promptFix": "Stat tile: the eyebrow is `font.size.label`, bold, uppercase and tracked. The number is `font.size.display` (`displayMobile` on phones), bold and tight, and it is the tile's one dominant element. The caption is `font.size.body` beneath it, with the delta arrow inline with its text and `white-space: nowrap` on the delta. A plate, if any, is `size.plateSm` tucked in the top corner, never level with the number. The product-screen h2 ceiling does not apply to stat figures. Change the typography table's 'dashboard stat number' row to match."
    },
    {
      "kind": "gap",
      "severity": "major",
      "area": "signature",
      "summary": "Header-band art is still a small stamp. All three samples put the spec's own example (a violet-recipe hexagon plus a tilted pill and two sparkles), recoloured, on the projects band almost verbatim. It is about 230px wide on a band about 1180px wide, and a one-line lead leaves about 150px of empty field below. The team area varies its lead shape but stays the same size. The reference's hero art (02) is a layered scene about as wide as the text block, and it balances the headline. The recipe sizes the SVG by height in a 240×200 viewBox, so on a compact band it can never fill the trailing 40–50% that the text asks for. Because it is the only cluster shown, agents copy it.",
      "samples": 3,
      "of": 3,
      "specCaused": true,
      "specRule": ".ms-field__art > svg { height: 100%; min-height: var(--size-art); max-width: 100%; } … <svg viewBox=\"0 0 240 200\">",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--projects--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--projects--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--projects--desktop-light--s3.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--team--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/02-desktop.png"
      ],
      "items": [
        "dashboard--page--projects--desktop-light",
        "dashboard--page--projects--desktop-dark",
        "dashboard--page--projects-apollo-migration--desktop-light",
        "dashboard--page--projects-apollo-migration--desktop-dark",
        "dashboard--page--team--desktop-light",
        "dashboard--page--team--desktop-dark"
      ],
      "promptFix": "Size the desktop header-band cluster by width. The art box is `width: 45%`, and the SVG is `width: 100%; height: auto` in a wide viewBox of about 400×240. Spread 4–5 pieces across it: a lead shape 60–80% of the height, a second-hue shape cutting into it, a 48–64px four-point star, a small sparkle and optionally a cloud at the outer edge. Let the band's min-height grow to fit the art, and keep the text vertically centred against it. Label the recipe's cluster 'one example; do not reuse its shapes', and show a second, differently built example so agents compose rather than copy. A cluster narrower than a third of the band reads as a sticker."
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "In dark mode the footer's bottom bar is a bright white strip under the navy footer band. The spec tells agents to paint that bar `surface.inverse`, and in the dark token table `color.surface.inverse` is `#ffffff`.",
      "samples": 2,
      "of": 3,
      "specCaused": true,
      "specRule": "Footer | Cream band with rise arc, link columns, a signup field + ink pill; `surface.inverse` bottom bar with round icon buttons",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/dashboard/20261026-154535-s2/screenshots/home-desktop-dark.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/dashboard/20261026-151918/screenshots/team-desktop-dark.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/dashboard--page--projects--mobile-dark.png"
      ],
      "items": [
        "dashboard--page--home--desktop-dark",
        "dashboard--page--home--mobile-dark",
        "dashboard--page--projects--desktop-dark",
        "dashboard--page--projects--mobile-dark",
        "dashboard--page--projects-apollo-migration--desktop-dark",
        "dashboard--page--projects-apollo-migration--mobile-dark",
        "dashboard--page--team--desktop-dark",
        "dashboard--page--team--mobile-dark"
      ],
      "promptFix": "The footer bottom bar is the darkest surface in both appearances: ink (`color.surface.inverse`) by day, and at night a step darker than the navy page (e.g. `color.surface.default` darkened, or a dedicated `color.footer.bar` token), with the same text and icon-button colours as the footer. `surface.inverse` turns white at night and is for toasts only; never use it for a full-width bar."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "On phones the dashboard greeting keeps the breathing glyph in its own left column, so the greeting, title and lead are squeezed into about 70% of the width and the lead wraps early. The reference phone (04) gives its heading the full width and keeps decoration out of the text column.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--home--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--home--mobile-light--s3.png",
        "pipeline/headspace-study/reference/set/04-mobile.png"
      ],
      "items": [
        "dashboard--page--home--mobile-light",
        "dashboard--page--home--mobile-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "hierarchy",
      "summary": "The detail screen's key figures (budget, due date, tasks, files) are body-size bold values in a cream panel, or on small white cards in sample 3, under a small label. The page's data has no visual peak. The reference carries figures as large bold numbers on toned surfaces (08), and the panel reads flatter than the rest of the system.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--projects-apollo-migration--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--projects-apollo-migration--desktop-light--s3.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": [
        "dashboard--page--projects-apollo-migration--desktop-light"
      ],
      "promptFix": ""
    }
  ]
}
```