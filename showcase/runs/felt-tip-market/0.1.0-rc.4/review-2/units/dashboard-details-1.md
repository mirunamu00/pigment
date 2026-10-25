I reviewed all 21 checklist items across the 3 samples. One major gap is still open from rc.3 and rc.4: on desktop, the header band is stretched to fit its sticker. That leaves about 100px of empty lemon band, while the screen's filter field and pill tabs sit on paper below it. Focus, empty and loading states are close to the reference. The other findings are minor: a pink flag on every table row, a row hover nobody can see, and three layout slips by the agents that the spec didn't cause.

```json
{
  "items": [
    { "id": "dashboard--state--search-focus--desktop-light", "status": "finding", "fidelity": 4, "note": "The focused filter field has the spec's focus recipe: the ink border stays, with a pink halo and an ink ring outside it. It sits in a hairline-framed dashboard with a lemon header band and a thick sticker cropped at the trailing edge. The focus is as carefully drawn as the reference's. But the header band is stretched to the sticker's height and holds only a title, a lead and one outline button, about 100px of empty lemon. The field and pill tabs sit loose on paper below it, where the reference (06) packs search, pills and breadcrumb into a compact band." },
    { "id": "dashboard--state--search-focus--desktop-dark", "status": "finding", "fidelity": 4, "note": "The dark inversion follows 11. The ground is black with one-step-lighter boxes and 35% white hairlines, the current nav pill is white, and the lemon band, white outline button and sticker are unchanged. The focus halo and ring read clearly on the dark field. In one sample a pink notched flag marks a percentage change. The spec keeps the flag for money, counts or 'new', so it becomes a second hot accent with no reason." },
    { "id": "dashboard--state--search-focus--mobile-light", "status": "ok", "fidelity": 4, "note": "On the phone the band is compact, with title, lead and outline button. Its sticker is cropped by the right edge, the stat tiles stack as hairline boxes, and the focused filter field shows the halo and ring at full width. It is close to the stacked, tight rhythm of 10. The pill nav row running off the edge is covered under keyboard focus." },
    { "id": "dashboard--state--row-hover--desktop-light", "status": "finding", "fidelity": 3, "note": "The table is ink-framed, with a paper header row, ink rules and outline status pills with dots. That is in the system's language, but the hovered row looks no different from the rest, so the state can't be seen. Every row also carries a pink notched flag on its budget. A column of eight flags is the loudest thing on the screen, where the reference spends pink on one accent." },
    { "id": "dashboard--state--row-hover--desktop-dark", "status": "finding", "fidelity": 3, "note": "The dark table keeps its hairline frame and rules, and the flags and pills are unchanged. As in light, no row responds to hover: no paper fill, no edge, nothing. A person can't tell which row the pointer is on, while the reference makes every hovered thing visibly react." },
    { "id": "dashboard--state--row-hover--mobile-light", "status": "ok", "fidelity": 3, "note": "On the phone the table keeps its ink frame and rules, but there is no visible row response. The table cuts its third column and the owner names mid-word at the frame edge, with no sticky column or scroll cue. The surrounding chrome (compact band, stacked tiles, black footer with a pink arrow) stays close to 10." },
    { "id": "dashboard--state--keyboard-focus--desktop-light", "status": "ok", "fidelity": 4, "note": "The focused nav item gets a thick ink pill outline next to the filled black current pill. It reads clearly and fits the system's pill markers. The rest of the screen matches the hairline and band language of the reference." },
    { "id": "dashboard--state--keyboard-focus--desktop-dark", "status": "ok", "fidelity": 4, "note": "In dark, the focus ring is a white pill outline under the white current pill, as 11 swaps the current pill. Focus is unmistakable, and the band, sticker and white outline button stay as in light." },
    { "id": "dashboard--state--keyboard-focus--mobile-light", "status": "finding", "fidelity": 3, "note": "The focus outline on the nav pill is clear. But the horizontal pill row runs past the right edge in every sample, cutting the last item, and the top-bar search placeholder is clipped mid-word. The reference's phone header (10) stays within the frame." },
    { "id": "dashboard--state--user-menu-open--desktop-light", "status": "finding", "fidelity": 3, "note": "The menu is a white ink panel with the static hard black shadow and a ruled header, as the reference's lifted pieces are. In two samples, though, the last item is flush against the panel's left edge with no padding. In one it is underlined as a bare link. So the panel looks unfinished next to the reference's evenly inset rows." },
    { "id": "dashboard--state--user-menu-open--desktop-dark", "status": "ok", "fidelity": 4, "note": "The dark menu is a one-step-lighter panel with a 35% white hairline, a ruled header and a pale hard shadow, and its rows are evenly inset in the cleanest sample. It reads as lifted, though the white-35% shadow is fainter than the reference's crisp offsets." },
    { "id": "dashboard--state--user-menu-open--mobile-light", "status": "ok", "fidelity": 3, "note": "On the phone the menu drops over the band as an ink panel with a hard shadow. It covers the title, which is acceptable for a menu, but again in two samples the last item hugs the left edge. Structure and shadow are on-system; the finish is cruder than the reference." },
    { "id": "dashboard--state--empty-filter--desktop-light", "status": "ok", "fidelity": 4, "note": "A dashed white box replaces the table. It holds one thick ink-outlined sticker of an empty container or clipboard, one sentence, a helper line and an outline 'clear' action. That is the reference's dashed empty state (06), raised with a sticker as the spec asks, and it reads clearly." },
    { "id": "dashboard--state--empty-filter--desktop-dark", "status": "ok", "fidelity": 4, "note": "In dark the empty box is a raised dark field with a dashed light border, and the sticker keeps its band fill and ink outline, sitting on a raised field as rule 10 asks. The message and action are clear." },
    { "id": "dashboard--state--empty-filter--mobile-light", "status": "ok", "fidelity": 4, "note": "On the phone there is a full-width dashed box with a centred sticker, sentence and outline action under the focused filter field. This is very close to the stacked dashed empty state in 10." },
    { "id": "dashboard--state--loading--desktop-light", "status": "ok", "fidelity": 4, "note": "Stat tiles become dashed raised placeholder boxes with visible 'Loading' text, and the band button shows a small glyph with 'Refreshing…'. There is no spinner or shimmer, which is exactly the spec's drawn loading language. It is quiet but clearly a pending state." },
    { "id": "dashboard--state--loading--desktop-dark", "status": "finding", "fidelity": 3, "note": "The dashed placeholders read well in dark. But in one sample the band's refresh button turns into a dark grey filled block on the lemon band. Controls on a band are meant to keep their white fill and ink text in both modes, so the band's poster look breaks." },
    { "id": "dashboard--state--loading--mobile-light", "status": "ok", "fidelity": 4, "note": "On the phone, four dashed placeholder tiles stack with 'Loading' labels under a compact band with the refreshing button. It is consistent with the desktop state and with the stacked rhythm of 10." },
    { "id": "dashboard--drawings--home", "status": "ok", "fidelity": 4, "note": "The header-band stickers (a periwinkle ledger slab, a periwinkle rocket, a marigold ledger slab) are flat fills with an even ink outline, a solid strip along the lower edge and 1–3 inner strokes, tilted and cropped. They are the reference's die-cut construction, though the strips are slightly shallower than the chunky coin depth in 01. Each sample's first capture is a chart crop, not a drawing." },
    { "id": "dashboard--drawings--projects", "status": "ok", "fidelity": 4, "note": "A marigold folder and a lemon clipboard sit centred on a periwinkle ground. Both are thick slabs with a visible lower strip and a few inner strokes, and each reads clearly as its object. They are close to the reference's flat chunky stickers." },
    { "id": "dashboard--drawings--team", "status": "finding", "fidelity": 3, "note": "A lemon ID badge reads well as thick board with a clip slot. The marigold mug, though, has its depth swept sideways rather than straight down and no rim. It reads as a lopsided block next to the reference's clean, straight-swept objects." }
  ],
  "findings": [
    {
      "kind": "gap", "severity": "major", "area": "spacingRhythm",
      "summary": "On the dashboard overview, the header band is stretched to its sticker's height and holds only a title, a lead and one outline button. That leaves about 100px of empty band colour. The screen's filter field and pill tabs sit loose on paper below it. The reference's header band (06) is compact and full, with search, pills and breadcrumb inside the colour field. This gap from rc.3 and rc.4 is still open.",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/dashboard--state--search-focus--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/dashboard--state--search-focus--desktop-light--s2.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/dashboard/20261025-042715-s2/screenshots/state-search-focus-desktop-light.png",
        "pipeline/gumroad-study/reference/set/06-desktop.png"
      ],
      "items": ["dashboard--state--search-focus--desktop-light"],
      "promptFix": "The header band is as tall as its content plus its own padding, never as tall as its sticker. It holds the screen's own controls: breadcrumb when there is a parent, the title, the lead, then one row with the screen's search or filter field and its pill tabs. Size the sticker to that content, between size.stickerSm and size.stickerBand, cropped at the trailing edge. Below the last line of content, never leave more empty band colour than the band's padding."
    },
    {
      "kind": "gap", "severity": "minor", "area": "polish",
      "summary": "The data table puts a pink notched flag on the amount in every row. A column of flags outshouts the page title and the chart, where the reference spends pink on one or two accents and lets ink and paper carry the table.",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "one key amount cell per table row",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/dashboard/20261025-042715-s2/screenshots/state-row-hover-desktop-light.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/dashboard/20261025-035935/screenshots/state-row-hover-desktop-light.png",
        "pipeline/gumroad-study/reference/set/06-desktop.png"
      ],
      "items": ["dashboard--state--row-hover--desktop-light"],
      "promptFix": ""
    },
    {
      "kind": "gap", "severity": "minor", "area": "componentStates",
      "summary": "A hovered table row looks exactly like the others in light and dark, so the hover state can't be seen. The reference makes every interactive thing react visibly.",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/sheets/dashboard--state--row-hover--desktop-dark.png",
        "pipeline/gumroad-study/reference/set/05-desktop.png"
      ],
      "items": ["dashboard--state--row-hover--desktop-dark"],
      "promptFix": ""
    },
    {
      "kind": "gap", "severity": "minor", "area": "polish",
      "summary": "A pink notched flag marks a percentage change on a stat tile. The flag is meant for money, counts or 'new', so it adds a stray hot accent.",
      "samples": 1, "of": 3, "specCaused": false, "specRule": "",
      "evidence": ["showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/dashboard--state--search-focus--desktop-dark--s2.png"],
      "items": ["dashboard--state--search-focus--desktop-dark"],
      "promptFix": ""
    },
    {
      "kind": "gap", "severity": "minor", "area": "signature",
      "summary": "The mug sticker's depth runs sideways instead of straight down, and it has no rim. It reads as a lopsided block below the reference's clean die-cut objects. This gap from rc.4 is still open.",
      "samples": 1, "of": 2, "specCaused": false, "specRule": "",
      "evidence": ["showcase/runs/felt-tip-market/0.1.0-rc.4/dashboard/20261025-035935/drawings/team-d1.png", "pipeline/gumroad-study/reference/set/01-desktop.png"],
      "items": ["dashboard--drawings--team"],
      "promptFix": ""
    },
    {
      "kind": "defect", "severity": "minor", "area": "polish",
      "summary": "In the account menu, the last item is flush against the panel's left edge with no padding, and in one sample it is underlined as a bare link.",
      "samples": 2, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/dashboard--state--user-menu-open--desktop-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/dashboard--state--user-menu-open--desktop-light--s2.png"
      ],
      "items": ["dashboard--state--user-menu-open--desktop-light"],
      "promptFix": ""
    },
    {
      "kind": "defect", "severity": "minor", "area": "polish",
      "summary": "On phones the primary nav pill row runs past the right edge and cuts its last item. The data table also cuts a column mid-word with no sticky column or scroll cue. The spec asks for a menu button below the large breakpoint and a sticky first column or a ruled list, so these errors are the agents' own.",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/dashboard--state--keyboard-focus--mobile-light--s1.png",
        "showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/sheets/dashboard--state--row-hover--mobile-light.png"
      ],
      "items": ["dashboard--state--keyboard-focus--mobile-light"],
      "promptFix": ""
    },
    {
      "kind": "defect", "severity": "minor", "area": "crossAppConsistency",
      "summary": "In dark loading, the band's refresh button becomes a dark grey filled block on the lemon band. The spec says controls on a band keep their white fill and ink text in both modes, so the agent broke the rule rather than following it.",
      "samples": 1, "of": 3, "specCaused": false, "specRule": "",
      "evidence": ["showcase/runs/felt-tip-market/0.1.0-rc.4/review-2/crops/dashboard--state--loading--desktop-dark--s2.png"],
      "items": ["dashboard--state--loading--desktop-dark"],
      "promptFix": ""
    }
  ]
}
```