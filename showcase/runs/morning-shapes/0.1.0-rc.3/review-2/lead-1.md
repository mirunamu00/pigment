```json
{ "mode": "quality",
  "referenceFidelity": 4, "signature": 4, "crossAppConsistency": 4, "hierarchy": 4, "spacingRhythm": 4, "componentStates": 3, "polish": 4,
  "findings": [
    { "kind": "gap", "severity": "major", "area": "signature",
      "summary": "This was named in rc.3 review-1 and is still open. On every desktop header band in all four apps, the art is a compact 3–4 piece stamp about 230–300px wide, roughly a fifth of the band, with a wide stretch of empty colour between the text and the art. Agents also copy the spec's one sample: a lead shape upper left, a pill overlapping lower right, a large star and a small sparkle, often the exact hexagon and pill. Many clusters picture nothing about their area or article. The front-page hero is the same disc, cloud and pill in all three samples, and two articles in one sample share one cluster. The reference's hero art (02) is a layered scene about as wide as the text block, and it balances the headline. The spec's CSS sizes the SVG by height inside a 240×200 viewBox, so on a band about 250px tall the art can never fill the trailing 40–50% the text asks for, and the only sample shown becomes the template agents copy.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": ".ms-field__art > svg { height: 100%; min-height: var(--size-art); max-width: 100%; } … <!-- Header-band cluster, one of many: lead hexagon, overlapping pill, large star + small sparkle --> <svg viewBox=\"0 0 240 200\">",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/commerce--page--home--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--projects--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--page--settings-profile--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/blog--page--home--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/dashboard--drawings--projects.png",
        "pipeline/headspace-study/reference/set/02-desktop.png"
      ],
      "items": ["commerce--page--home--desktop-light","commerce--page--cart--desktop-light","commerce--state--card-hover--desktop-light","dashboard--page--projects--desktop-light","dashboard--page--team--desktop-light","dashboard--drawings--projects","dashboard--drawings--projects-apollo-migration","settings--page--settings-profile--desktop-light","settings--page--settings-security--desktop-light","settings--drawings--settings-profile","settings--drawings--settings-security","blog--page--home--desktop-light","blog--drawings--home","blog--drawings--posts-shipping-a-design-system","blog--drawings--posts-release-notes-people-read"],
      "promptFix": "Size the desktop header-band cluster by width, not height. The art box is `width: 45%`, and the SVG is `width: 100%; height: auto` in a wide viewBox of about 400×240. Spread 4–5 pieces across the whole width: a lead shape 60–80% of the height that pictures the screen's subject in one noun, a second-hue shape cutting into it, a 48–64px four-point star, a small sparkle and optionally a cloud at the outer edge. Let the band's min-height grow to fit the art, and keep the text vertically centred against it. Give at least three sample clusters with different silhouettes and layouts, and label them as structure only: reusing a sample's shapes or arrangement counts as a repeat. Two screens of different subjects never share a cluster. A cluster narrower than a third of the band, or one made of a disc and pill that picture nothing, is a sticker, not a scene." },
    { "kind": "gap", "severity": "major", "area": "signature",
      "summary": "On product detail pages, sizes and colours are 2px-bordered option tiles. Each tile carries a breathing glyph unrelated to its label: a zigzag, a spiral, a ring, a dot pair, or one glyph repeated on every tile. The colour options never show the colour, and four full-width size tiles crowd the space above the primary action on phones. The reference picks each row's glyph to mean its topic (05), and it picks one value from a pill row with the ink selected pill and its dot (09). The spec's glyph list puts a glyph on every form option tile.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "Where. Choice lists, navigation cards and category rows (one per row, in the row's area hue, its form chosen for the row's label); … option tiles in forms (still until hovered, focused or selected)",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/commerce--page--products-merino-crew-sweater--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/commerce--page--products-canvas-field-tote--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/commerce--drawings--products-merino-crew-sweater.png",
        "pipeline/headspace-study/reference/set/05-desktop.png",
        "pipeline/headspace-study/reference/set/09-desktop.png"
      ],
      "items": ["commerce--page--products-canvas-field-tote--desktop-light","commerce--page--products-canvas-field-tote--mobile-light","commerce--page--products-merino-crew-sweater--desktop-light","commerce--page--products-merino-crew-sweater--mobile-light","commerce--drawings--products-canvas-field-tote","commerce--drawings--products-merino-crew-sweater"],
      "promptFix": "Put a glyph on an option only when the option names a subject the glyph can picture. Short values such as sizes, quantities, amounts and plain variants are a segmented row of cream pills, and the selected one is the ink pill with the white dot. Colour or finish options show the actual colour as a flat disc swatch beside the name. Never give each value its own decorative glyph, and never repeat one glyph on every option." },
    { "kind": "gap", "severity": "major", "area": "hierarchy",
      "summary": "This has been open since rc.2 and is unchanged. Stat-tile figures are about 32px and sit level with a white plate of equal weight, so no figure dominates. On desktop the delta caption wraps and leaves its arrow on its own line. The key figures on the detail screen are body-size bold values. The reference's colour tiles (08) let one bold number of about 64px under a small eyebrow carry the whole tile. The spec still sets the stat number at `font.size.h3`.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "Stat tile: a small field in a category hue (`radius.sm`, padding `space.6`): label `font.size.label` bold, number `font.size.h3` bold, caption `font.size.body` … optional `size.plateSm` plate. | Sub-section, dashboard stat number | `font.size.h3`",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--home--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--home--desktop-dark--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/dashboard--page--projects-apollo-migration--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": ["dashboard--page--home--desktop-light","dashboard--page--home--mobile-light","dashboard--page--home--desktop-dark","dashboard--page--home--mobile-dark","dashboard--state--search-focus--desktop-light","dashboard--page--projects-apollo-migration--desktop-light"],
      "promptFix": "Stat tile: the eyebrow is `font.size.label`, bold, uppercase and tracked. The number is `font.size.display` (`displayMobile` on phones), bold and tight, and it is the tile's one dominant element. The caption is `font.size.body` beneath it, with the delta arrow inline and `white-space: nowrap` on the delta. A plate, if any, is `size.plateSm` tucked in the top corner and never level with the number. On phones the tiles form a 2×2 grid (or a horizontal scroll row) without plates, never four stacked full-width fields. Key figures on a detail screen use the same eyebrow-plus-big-number pattern at `font.size.h2`. The product-screen h2 ceiling does not apply to stat figures. Change the typography table's stat-number row to match." },
    { "kind": "gap", "severity": "major", "area": "referenceFidelity",
      "summary": "This has been open since rc.1. The unselected billing plans are white boxes with 2px grey borders (lilac at night) and 32px prices beside a violet selected plan, both on the page and behind the plan dialog. The screen reads as a stock SaaS pricing grid. The reference never borders a card; it carries figures on borderless toned surfaces with one big bold number. The spec writes the border in, which contradicts its own rule that cards have no border.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "Plan card: white, `radius.md`, 2px `color.border.default`; selected: `color.field.violet`, white text and check disc.",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--page--settings-billing--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--plan-dialog--desktop-light--s3.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--page--settings-billing--mobile-light--s1.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": ["settings--page--settings-billing--desktop-light","settings--page--settings-billing--mobile-light","settings--page--settings-billing--desktop-dark","settings--page--settings-billing--mobile-dark","settings--state--plan-dialog--desktop-light","settings--state--plan-dialog--desktop-dark","settings--state--plan-dialog--mobile-light"],
      "promptFix": "Plan card: borderless and `radius.lg`, white on a cream panel (cream on white, indigo at night). The plan name is an eyebrow, and the price is `font.size.h2`, bold and tight, as the card's dominant element. The selected plan is `color.field.violet` with white text and the check disc. Depth comes from tone only; no plan card has a border." },
    { "kind": "defect", "severity": "minor", "area": "polish",
      "summary": "In dark mode, every page in every app ends in a bright white bottom bar under the navy page and indigo footer. It is the one element that breaks the night palette, and the reference's night band (03) stays dark to the edge. The spec causes it: the footer's bottom bar is `surface.inverse`, and that token is #ffffff in the dark table.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "Footer | Cream band with rise arc, link columns, a signup field + ink pill; `surface.inverse` bottom bar with round icon buttons … (dark) `color.surface.inverse` | `#ffffff`",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/blog--page--home--desktop-dark.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/commerce--page--cart--mobile-dark.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/dashboard--page--projects--mobile-dark.png",
        "pipeline/headspace-study/reference/set/03-desktop.png"
      ],
      "items": ["blog--page--home--desktop-dark","blog--state--newsletter-error--desktop-dark","commerce--page--home--mobile-dark","commerce--page--cart--mobile-dark","dashboard--page--home--desktop-dark","dashboard--page--projects--mobile-dark","dashboard--state--loading--desktop-dark"],
      "promptFix": "The footer bottom bar is the darkest surface in both appearances: ink by day, and at night a step darker than the navy page, set through a dedicated role token (e.g. `color.footer.bar`), with on-dark text and icon buttons. `surface.inverse` is for small floating pieces such as toasts, where flipping to white at night is intended. Never use it for a full-width band or bar." },
    { "kind": "gap", "severity": "minor", "area": "spacingRhythm",
      "summary": "On phones, two of three samples hold the article header band's whole text column narrow beside the corner cluster. A long title breaks into six short lines, and the band fills the first screen. The front-page hero stacks its cluster as its own row under the pills, so no content shows on the first screen. When the title is short, the lead runs under the corner cluster and a sparkle touches the text. The reference phone (04) runs its headline across the full width and keeps the hero compact.",
      "samples": 2, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/blog--page--posts-shipping-a-design-system--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/blog--page--home--mobile-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--page--settings-notifications--mobile-dark--s2.png",
        "pipeline/headspace-study/reference/set/04-mobile.png"
      ],
      "items": ["blog--page--posts-shipping-a-design-system--mobile-light","blog--page--posts-shipping-a-design-system--mobile-dark","blog--page--home--mobile-light","settings--page--settings-notifications--mobile-light","settings--page--settings-notifications--mobile-dark"],
      "promptFix": "" },
    { "kind": "gap", "severity": "minor", "area": "componentStates",
      "summary": "These states have been open since rc.2. Outcome states are timid. A save or a newsletter signup shows a small tick and a line at the foot of the form, below the first screen. The add-to-cart confirmation sits inline below the fold. The spec's floating ink-pill toast with a sparkle is never used. Top-bar text links get a flush square focus box that clips the area dot (or no focus at all), and clickable table rows show no hover tone. The reference states outcomes confidently and gives every interactive element a designed state (11).",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--profile-saved--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/commerce--state--added-to-cart--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/blog--state--keyboard-focus--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/dashboard/20261026-154535-s1/screenshots/state-row-hover-desktop-light.png",
        "pipeline/headspace-study/reference/set/11-desktop.png"
      ],
      "items": ["settings--state--profile-saved--desktop-light","blog--state--newsletter-success--desktop-light","commerce--state--added-to-cart--desktop-light","blog--state--keyboard-focus--desktop-light","commerce--state--keyboard-focus--desktop-light","dashboard--state--row-hover--desktop-light"],
      "promptFix": "" },
    { "kind": "gap", "severity": "minor", "area": "signature",
      "summary": "In two of three samples, the no-results empty state's only art is a lone dot pair, a ring glyph, or a blank art column on a saturated panel. Only one sample per app draws the crescent-shaded magnifier composition that matches the reference's spot pictograms (07). The spec offers a `glyphLg` glyph as an equal alternative and lists dot-in-ring among the glyphs, so agents can satisfy it with a ring.",
      "samples": 2, "of": 3, "specCaused": true,
      "specRule": "Empty state | Panel in the area hue …, one `size.art` shape-kit composition of the area's subject or a `size.glyphLg` glyph",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/dashboard/20261026-154535-s2/screenshots/state-empty-filter-desktop-light.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/blog--state--search-empty--desktop-dark.png",
        "pipeline/headspace-study/reference/set/07-desktop.png"
      ],
      "items": ["dashboard--state--empty-filter--desktop-light","dashboard--state--empty-filter--mobile-light","blog--state--search-empty--desktop-light","blog--state--search-empty--mobile-light"],
      "promptFix": "Every empty state draws one `size.art` shape-kit composition of what is missing, built from 2–3 crescent-shaded primitives plus a sparkle, in hues different from its panel. A glyph is never an empty state's only art. Never leave the art area blank." },
    { "kind": "gap", "severity": "minor", "area": "hierarchy",
      "summary": "On the about page, a vignette on a saturated pink or yellow panel sits right under the saturated blue header band, so two fields compete in the first view, and the cards step down loosely instead of overlapping. The reference (01) floats its vignette on a cream panel as one tight scene. The settings profile group also lacks the spot plate that its sibling groups carry.",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/blog--page--about--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/01-desktop.png"
      ],
      "items": ["blog--page--about--desktop-light","blog--page--about--desktop-dark","settings--page--settings-profile--mobile-light"],
      "promptFix": "" },
    { "kind": "defect", "severity": "minor", "area": "polish",
      "summary": "These are agent layout slips with no spec rule behind them. On phones the footer email field collapses to a sliver. The settings section strip opens scrolled, so a pill or its focus ring is cut at the screen edge. The wrapped option tiles' radio circle sits on the tile border.",
      "samples": 2, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/blog--state--search-empty--mobile-light.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/settings--page--settings-security--mobile-light.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--keyboard-focus--mobile-light--s1.png"
      ],
      "items": ["blog--page--about--mobile-light","blog--state--search-empty--mobile-light","settings--page--settings-security--mobile-light","settings--state--keyboard-focus--mobile-light","commerce--state--added-to-cart--mobile-light"],
      "promptFix": "" }
  ],
  "notes": [
    "All four apps clearly read as one family in the reference's language: sunny flat fields with sagging arcs, ink and cream pills on their ledge with the white dot, crescent-shaded pictogram covers in category hues, cream tone-on-tone panels, and a convincing navy and indigo night palette. The product covers and plate pictograms are close to the reference's craft.",
    "What still separates it from the reference's own work is scale and meaning at the signature moments, and none of it closed between rc.3 review-1 and review-2. Header-band art is a small, copied sticker rather than a scene that balances the headline. Stat figures and plan prices sit at 32px, and plan cards are bordered. Option tiles carry glyphs that mean nothing. Each of these traces to a spec line (the height-sized 240×200 SVG and its single sample, the `font.size.h3` stat number, the 2px plan-card border, glyphs on every option tile), so they need prompt fixes, not another run. The white night-mode footer bar is also spec-caused, through `surface.inverse`.",
    "Fidelity and signature hold at the pass bar, but only just. Component states stay at 3 because outcome toasts, link focus and row hover remain below the reference."
  ] }
```