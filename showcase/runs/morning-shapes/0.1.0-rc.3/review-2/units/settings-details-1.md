I reviewed all 20 items, each across its 3 samples. Settings reads clearly as the reference's design language, but two gaps from the earlier rounds are still open, and both come from the spec's own words:

- **Header-band art (major):** in every area and every sample it is still a small 3–4 piece stamp built on the spec sample's single layout. The spec's own CSS and sample cause this.
- **Plan cards (major):** the cards behind the plan dialog still have grey borders, because the spec's plan-card rule still says to add one.

Two minor gaps: the save confirmation can't be seen on the first screen, and on phones the header band takes up too much of the first screen. One minor defect is the agents' own: on phones the focus ring is cut off at the right edge of the screen.

```json
{
  "items": [
    { "id": "settings--state--profile-errors--desktop-light", "status": "finding", "fidelity": 4, "note": "Inline errors are done to the spec in all three samples: a 2px red border, a red alert glyph and short text that says what to fix. They sit on white or cream 24px panels with ink save and cream reset pills on their ledge. Above them, the header band carries a 230px disc-and-pill stamp with a wide empty field to its left. The reference (02) fills that space with a layered scene that balances the headline." },
    { "id": "settings--state--profile-errors--desktop-dark", "status": "finding", "fidelity": 4, "note": "The night palette holds up well, in the spirit of reference 03: navy page, indigo panels and header band, salmon error borders and text, a white save pill. Errors stay clear on dark. The band art is the same small corner stamp as in light mode." },
    { "id": "settings--state--profile-errors--mobile-light", "status": "finding", "fidelity": 4, "note": "Errors are full-width and readable, and the section strip is ink and cream pills with dots. The compact band keeps its corner cluster clear of the title. Still, the band and strip leave about 80px of empty field under the lead, so it is looser than the tight phone hero in reference 04." },
    { "id": "settings--state--profile-saved--desktop-light", "status": "finding", "fidelity": 3, "note": "The only sign of a successful save is a small green tick and the word 'Saved' beside the buttons at the foot of the form, below the first screen in all three samples. The page above looks unchanged, and the spec's ink-pill toast with a sparkle is not used. The reference states its outcomes far more confidently." },
    { "id": "settings--state--profile-saved--desktop-dark", "status": "finding", "fidelity": 3, "note": "Same as light: the green 'Saved' tick beside the white save pill is the only feedback. It is legible on indigo but sits below the fold and is easy to miss. No toast." },
    { "id": "settings--state--profile-saved--mobile-light", "status": "finding", "fidelity": 3, "note": "On phones the tick and 'Saved' line sits under the full-width reset pill, roughly two screens down. A person who just tapped save sees no confirmation where they are looking." },
    { "id": "settings--state--plan-dialog--desktop-light", "status": "finding", "fidelity": 4, "note": "The dialog follows the spec: white 24px panel, cream footer, cream cancel and ink confirm pills, a cream close circle, a bold title and one plain sentence of consequence. Behind it, the unselected plan cards are white with 2px grey borders beside the violet selected plan, which reads like a stock pricing grid rather than the reference's borderless toned surfaces." },
    { "id": "settings--state--plan-dialog--desktop-dark", "status": "finding", "fidelity": 4, "note": "Night dialog: a navy body with an indigo footer, an indigo cancel pill and a white confirm pill, which is a faithful night translation. The bordered plan cards behind it still outline in lilac." },
    { "id": "settings--state--plan-dialog--mobile-light", "status": "finding", "fidelity": 4, "note": "It becomes a bottom sheet with full-width confirm and cancel pills, the title and the consequence line, which is clear and on-system. The plan list above stacks into bordered white cards with one violet selected card." },
    { "id": "settings--state--password-mismatch--desktop-light", "status": "finding", "fidelity": 4, "note": "Inside a cream panel with a padlock spot plate: a green strength dot and text under the new password, a red border and 'do not match' message on the confirm field, then the ink update pill. It is clear and in the system's status language. The band art is a hexagon-plus-pill stamp, the spec sample's own composition." },
    { "id": "settings--state--password-mismatch--desktop-dark", "status": "finding", "fidelity": 4, "note": "Night rendering is consistent: indigo panel and inputs, a bright green strength dot, salmon error border and text, a white update pill. The hexagon-and-pill band stamp sits in a mostly empty indigo band." },
    { "id": "settings--state--password-mismatch--mobile-light", "status": "finding", "fidelity": 4, "note": "Stacked fields are full width and the error reads clearly. But the section strip and a compact band with about 100px of empty field push the mismatch message below the first screen, where the reference phone hero (04) stays compact." },
    { "id": "settings--state--keyboard-focus--desktop-light", "status": "ok", "fidelity": 4, "note": "The focused section pill gets a 2px blue ring that follows its full pill shape, next to the ink selected pill with its white dot. It reads clearly and matches the reference's rounded ring (11)." },
    { "id": "settings--state--keyboard-focus--desktop-dark", "status": "ok", "fidelity": 4, "note": "At night the focused pill gets a yellow ring around a dark pill, next to the white selected pill. It is clearly visible on navy and keeps the pill's shape." },
    { "id": "settings--state--keyboard-focus--mobile-light", "status": "finding", "fidelity": 4, "note": "In the horizontal section strip the focused pill shows a blue ring. In two samples that pill is cut off at the right edge of the screen, so half the ring is outside the viewport." },
    { "id": "settings--drawings--settings-profile", "status": "finding", "fidelity": 3, "note": "Crescent shading is clean and flat. But the band cluster is a disc with an overlapping disc or pill plus two sparkles, nothing that pictures a person or profile, and two samples draw the same yellow disc and blue pill. Next to the reference's layered hero art (02) it reads as a generic stamp." },
    { "id": "settings--drawings--settings-notifications", "status": "ok", "fidelity": 4, "note": "This page has the best drawings: a sun with a cloud, a speech bubble with a disc, and a bubble with three dots, each crescent-shaded. The spot plates hold a readable envelope and bell on white circles, close to reference 07's plate pictograms, though they fill only about 50% of the plate and are simpler than the reference's sun or heart pictograms." },
    { "id": "settings--drawings--settings-security", "status": "finding", "fidelity": 3, "note": "In two of three samples the band art is literally the spec sample: a hexagon with a pill overlapping lower right, a large star and a small sparkle. Only one adds a keyhole that says security. The padlock and laptop plates read well and are distinct." },
    { "id": "settings--drawings--settings-billing", "status": "finding", "fidelity": 4, "note": "The bar-chart, card and document plates are readable and varied, and one cluster is a good credit card with a coin. Another is a plain orange pill and yellow disc that pictures nothing, and all three repeat the lead-plus-overlapping-pill layout." },
    { "id": "settings--motion", "status": "ok", "fidelity": 4, "note": "Spot plates fade in once (500ms, ease-out). One small sparkle in the band cluster drifts slowly on an 8s infinite loop. Section icons stay still, as the spec asks for settings. This is calm and sparing, in keeping with the reference's slow breathing motion; nothing bounces, and forms and data appear at once." }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "major",
      "area": "signature",
      "summary": "Header-band clusters are still a compact 3–4 piece stamp, about 230px wide, in the band's top corner, with a wide stretch of empty field between the text and the art. Every area in every sample also repeats one layout: a lead shape upper left, a pill overlapping lower right, a large star and a small sparkle. That is the spec sample's composition, often with its exact hexagon-plus-pill. Profile and two of the three security clusters picture nothing about their area. The reference's hero art (02) is a layered scene about as wide as the text block that balances the headline, and its pictograms (07) each picture their subject. The spec causes both problems. Its CSS sizes the SVG by height in a short band, and it gives one sample whose layout agents copy.",
      "samples": 3,
      "of": 3,
      "specCaused": true,
      "specRule": ".ms-field__art > svg { height: 100%; min-height: var(--size-art); max-width: 100%; } … <!-- Header-band cluster, one of many: lead hexagon, overlapping pill, large star + small sparkle --> <svg viewBox=\"0 0 240 200\">",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--profile-errors--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--password-mismatch--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/settings--drawings--settings-security.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/settings--drawings--settings-profile.png",
        "pipeline/headspace-study/reference/set/02-desktop.png"
      ],
      "items": [
        "settings--drawings--settings-profile",
        "settings--drawings--settings-security",
        "settings--drawings--settings-billing",
        "settings--state--profile-errors--desktop-light",
        "settings--state--profile-errors--desktop-dark",
        "settings--state--password-mismatch--desktop-light",
        "settings--state--password-mismatch--desktop-dark"
      ],
      "promptFix": "Size the desktop header-band cluster by width: art box `width: 45%`, SVG `width: 100%; height: auto`, drawn in a wide viewBox (about 400×240), and let the band grow to fit the art. Lay out 4–5 pieces across the full width. The lead shape pictures the area's subject in one noun (a padlock, a card, a person's head and shoulders, a bell), and the other pieces sit around it in a different arrangement for each area. Give at least three sample clusters with different silhouettes and layouts, and say that copying a sample's layout counts as a repeat. A cluster narrower than a third of the band, or one made of an unrelated disc and pill, is a sticker, not a scene."
    },
    {
      "kind": "gap",
      "severity": "major",
      "area": "referenceFidelity",
      "summary": "Behind the plan dialog the unselected plan cards are white boxes with 2px grey borders (lilac at night) beside a violet selected card, so the page reads like a stock pricing grid. The reference never borders a card and carries figures on borderless toned surfaces. This has been open since rc.1. The spec writes the border in, which contradicts its own rule 9.",
      "samples": 3,
      "of": 3,
      "specCaused": true,
      "specRule": "Plan card: white, `radius.md`, 2px `color.border.default`; selected: `color.field.violet`, white text and check disc.",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--plan-dialog--desktop-light--s3.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--plan-dialog--desktop-dark--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--plan-dialog--mobile-light--s1.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": [
        "settings--state--plan-dialog--desktop-light",
        "settings--state--plan-dialog--desktop-dark",
        "settings--state--plan-dialog--mobile-light"
      ],
      "promptFix": "Plan card: borderless; white on a cream panel (cream on white, indigo at night), `radius.lg`. Plan name as an eyebrow, price at `font.size.h2` bold tight. Selected: `color.field.violet` with white text and the check disc. Depth by tone only; no plan card has a border."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "componentStates",
      "summary": "A successful save shows only as a small green tick and the word 'Saved' beside the buttons at the foot of the form. In all three samples and on every viewport it sits below the first screen, so a person gets no visible confirmation. The spec's ink-pill toast with a sparkle is never used. This has been open since rc.2.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--profile-saved--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/settings/20261026-151918/screenshots/state-profile-saved-desktop-dark.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/settings--state--profile-saved--mobile-light.png"
      ],
      "items": [
        "settings--state--profile-saved--desktop-light",
        "settings--state--profile-saved--desktop-dark",
        "settings--state--profile-saved--mobile-light"
      ],
      "promptFix": "When a form saves in place, confirm it with the success toast (ink pill, sparkle, one line) at the bottom center of the viewport. An inline tick beside the submit button may echo it but is never the only confirmation."
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "On phones the section strip and a compact header band with about 80–100px of empty field under the lead take nearly half the first screen. The password mismatch message falls below the first screen. The reference phone hero (04) is tighter.",
      "samples": 3,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--password-mismatch--mobile-light--s3.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--profile-errors--mobile-light--s2.png",
        "pipeline/headspace-study/reference/set/04-mobile.png"
      ],
      "items": [
        "settings--state--password-mismatch--mobile-light",
        "settings--state--profile-errors--mobile-light"
      ],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "In the horizontally scrolling section strip on phones, the focused pill is cut off at the right edge of the screen, so its focus ring shows only partly. This is an agent layout slip with no spec rule behind it.",
      "samples": 2,
      "of": 3,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/crops/settings--state--keyboard-focus--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-2/sheets/settings--state--keyboard-focus--mobile-light.png"
      ],
      "items": [
        "settings--state--keyboard-focus--mobile-light"
      ],
      "promptFix": ""
    }
  ]
}
```