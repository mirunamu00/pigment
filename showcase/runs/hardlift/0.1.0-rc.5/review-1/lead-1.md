```json
{
  "findings": [
    {
      "severity": "minor",
      "area": "polish",
      "summary": "At phone width, the project tables reflow into stacked blocks, but they still open with a gray strip of desktop column names (Project, Owner, Status, Budget). The strip wraps, which leaves the active sort ('Due date ↑') as a lone outlined pill on a second line. Every block already labels its fields, so the strip repeats them and reads as a broken, half-styled header row instead of one clear sort control. This shows in light, dark and the row-hover state.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/dashboard--page--home--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/dashboard--page--projects--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/dashboard--page--projects--mobile-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/dashboard--state--row-hover--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/dashboard/20261019-204125/screenshots/state-row-hover-mobile-light.png"
      ],
      "items": [
        "dashboard--page--home--mobile-light",
        "dashboard--page--home--mobile-dark",
        "dashboard--page--projects--mobile-light",
        "dashboard--page--projects--mobile-dark",
        "dashboard--state--row-hover--mobile-light"
      ]
    },
    {
      "severity": "minor",
      "area": "polish",
      "summary": "When phone-width tables reflow into stacked blocks, each block's title (the session's device name, the invoice ID) is set semibold or bold. The type rule is regular weight only, with bold allowed just for totals and inline emphasis.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/settings/20261019-204125/screenshots/settings-security-mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/settings--page--settings-billing--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/settings--page--settings-security--mobile-dark.png"
      ],
      "items": [
        "settings--page--settings-security--mobile-light",
        "settings--page--settings-security--mobile-dark",
        "settings--page--settings-billing--mobile-light"
      ]
    },
    {
      "severity": "minor",
      "area": "signature",
      "summary": "At phone width, the 'On this page' pill strip on article pages draws an ink outline on every pill at rest. The pill recipe calls for a transparent border at rest, with the outline only on hover or when selected, which is how the home page's filter pills behave.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/blog/20261019-204125/screenshots/posts-shipping-a-design-system-mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/blog--page--posts-release-notes-people-read--mobile-dark.png"
      ],
      "items": [
        "blog--page--posts-shipping-a-design-system--mobile-light",
        "blog--page--posts-shipping-a-design-system--mobile-dark",
        "blog--page--posts-release-notes-people-read--mobile-light",
        "blog--page--posts-release-notes-people-read--mobile-dark"
      ]
    },
    {
      "severity": "minor",
      "area": "signature",
      "summary": "The figure in the design-system article is a generic composition: two rounded rectangles on a yellow ellipse inside a frame. It doesn't show its subject, many buttons grouped into a few jobs, though the spec asks for a figure that shows what it stands for. The other article's figure does this well.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/blog/20261019-204125/drawings/posts-shipping-a-design-system-d1.png"
      ],
      "items": [
        "blog--drawings--posts-shipping-a-design-system"
      ]
    },
    {
      "severity": "minor",
      "area": "componentStates",
      "summary": "The keyboard focus ring on the header's 'Cart' link sits flush against the current-page 'Shop' pill next to it, with no gap. This crowds the two pills and weakens the 2px-offset ring the spec asks for. It shows in light desktop only.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/commerce/20261019-204125/screenshots/state-keyboard-focus-desktop-light.png"
      ],
      "items": [
        "commerce--state--keyboard-focus--desktop-light"
      ]
    }
  ],
  "referenceFidelity": 4,
  "crossAppConsistency": 5,
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 4,
  "signature": 4,
  "notes": [
    "Review: 130/130 checklist items, covered by 8 reviewers and the lead reviewer (showcase/runs/hardlift/0.1.0-rc.5/review-1). I opened the reference sheet and the dashboard home mobile-light sheet myself.",
    "Both majors from rc.4 are fixed. (1) Phone-width tables now reflow into stacked label/value blocks inside the bordered box. Every column and every Revoke action is visible on the security, billing, overview, projects and team screens, in both themes. (2) The band's Refresh is ink in light and paper in dark, so the empty-filter state shows exactly one pink action. The rc.4 minor about the save confirmation is also fixed: it's an inline check with 'Saved' and no button chrome.",
    "Merged: the dashboard-details and dashboard-pages findings about the leftover column-label strip above the reflowed blocks are the same problem, so they are one minor. The bold block titles in settings are a separate rule (type weight), so that finding stays on its own. Both are leftovers of the new reflow and don't affect any task, so they stay minor.",
    "Regressions: none. The new reflow brought two small polish issues (the header strip and the bold titles). Neither is worse than rc.4's hidden columns.",
    "The four apps look like one family. They share paper and ink, regular-weight display type, one full-width color band per section with an ink rule under it, ink current-page pills (paper-filled in dark), outlined cards, the hard offset lift, pink price tags, the same dark mapping and the same focus treatment.",
    "Someone who knows the reference would recognize it. The yellow hero has tilted, edge-cropped coin stickers. The shop is a flooded yellow band over a dense wall of distinct flat sticker products on band-color squares. The pink pill CTA is the one loud action.",
    "Signature elements hold across apps: section bands, outline pills, sticker art (eleven distinct product stickers, coin empty states, the turning-coin loading state), the hard lift on buttons and cards, and one pink action per viewport. The only signature slips are minor: outlined contents pills at rest, and one abstract article figure.",
    "Verdict: passing. No blockers or majors. All five findings are minor."
  ]
}
```