```json
{
  "findings": [
    {
      "severity": "minor",
      "area": "signature",
      "summary": "In dark mode, any sticker shape filled with white in light mode (the tag, speech bubble, document sheets and card or button shapes) switches to the dark raised surface. On the yellow band and panels these shapes become dark-gray silhouettes, and the ink glyphs and text lines inside them almost disappear. The pink coin and star stay bright, so the hero still reads as the sticker hero, but the reference's dark hero keeps all of its sticker art bright. This is caused by the spec: the recipe asks for fills from semantic tokens but doesn't say that sticker fills must stay the same in both themes.",
      "samples": 1,
      "of": 1,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/blog/20261019-220051/screenshots/home-desktop-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.6/blog/20261019-220051/screenshots/posts-shipping-a-design-system-desktop-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-1/sheets/blog--page--posts-release-notes-people-read--desktop-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-1/sheets/blog--page--home--mobile-dark.png"
      ],
      "items": [
        "blog--page--home--desktop-dark",
        "blog--page--home--mobile-dark",
        "blog--page--posts-shipping-a-design-system--desktop-dark",
        "blog--page--posts-release-notes-people-read--desktop-dark"
      ]
    },
    {
      "severity": "minor",
      "area": "componentStates",
      "summary": "While it is busy, the ghost Refresh button in the page-header band changes from its ink outline to a solid pink fill, in light, dark and mobile. The spec says a busy control keeps its variant's fill. The ghost hover rule that turns the fill pink doesn't exclude busy or disabled buttons, so this comes from the spec. The label and the turning coin stay readable, and no other pink action is in view. The rc.5 problem (a gray, unreadable busy button) is fixed.",
      "samples": 1,
      "of": 1,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/dashboard/20261019-220051/screenshots/state-loading-desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-1/sheets/dashboard--state--loading--desktop-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-1/sheets/dashboard--state--loading--mobile-light.png"
      ],
      "items": [
        "dashboard--state--loading--desktop-light",
        "dashboard--state--loading--desktop-dark",
        "dashboard--state--loading--mobile-light"
      ]
    },
    {
      "severity": "minor",
      "area": "polish",
      "summary": "When a table reflows into stacked blocks at phone width, each block's title (the device name or invoice number) is bold. The spec keeps all type at regular weight and allows bold only for totals and inline emphasis.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/settings/20261019-220051/screenshots/settings-security-mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-1/sheets/settings--page--settings-billing--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-1/sheets/settings--page--settings-security--mobile-dark.png"
      ],
      "items": [
        "settings--page--settings-security--mobile-light",
        "settings--page--settings-security--mobile-dark",
        "settings--page--settings-billing--mobile-light"
      ]
    },
    {
      "severity": "minor",
      "area": "componentStates",
      "summary": "In light mode, the keyboard focus ring on a header nav pill sits almost flush with the pill and touches the ink current-page pill next to it, so the two read as one shape instead of a ring with a 2px offset. The dark pink ring is clear.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/commerce/20261019-220051/screenshots/state-keyboard-focus-desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.6/review-1/sheets/commerce--state--keyboard-focus--mobile-light.png"
      ],
      "items": [
        "commerce--state--keyboard-focus--desktop-light"
      ]
    },
    {
      "severity": "minor",
      "area": "componentStates",
      "summary": "In the newsletter error state, the recovery action (Subscribe) is an ink button, even though at that scroll position no pink action is in view. The colour rule reserves pink for the one action the current view is about.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.6/blog/20261019-220051/screenshots/state-newsletter-error-desktop-light.png"
      ],
      "items": [
        "blog--state--newsletter-error--desktop-light"
      ]
    }
  ],
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 4,
  "signature": 4,
  "notes": [
    "Review: 130/130 checklist items by 8 reviewers and the lead reviewer (showcase/runs/hardlift/0.1.0-rc.6/review-1). I opened the reference sheet and the blog home desktop-dark sheet myself to grade the dark-sticker finding.",
    "Regressions against rc.5 critic-2: none. All three rc.5 blockers are fixed. The save confirmation is now an inline 'Saved' check that covers nothing. At phone width the hero stickers render static below the CTA. The reflowed Revoke buttons keep their full size. Both rc.5 majors are fixed too: the busy button no longer goes gray, and settings keeps one teal band across all its tabs.",
    "Graded: the dark-sticker finding stays minor. The coin and star keep their pink, the outlines and shapes still read as stickers, and nothing a person needs is unreadable. It is spec-caused: the recipe should say that sticker fills (white or paper included) don't change between themes. The busy pink-fill finding stays minor and spec-caused (the ghost hover rule doesn't exclude busy buttons). It hurts neither readability nor the one-pink rule in that view.",
    "Family: the four apps read as one system. They share the paper-and-ink ground, regular-weight grotesk display type, one full-width band per section with an ink rule (the colour stays the same within a section, including detail pages), ink current-page pills that turn paper in dark, outlined raised cards, the hard offset lift, pink price tags and a single pink action, and the same dark mapping.",
    "Recognition: someone who knows the reference would recognize it. The yellow hero has tilted, edge-cropped pink coin stickers and a pill tag wall. The shop is a dense wall of distinct flat sticker products on band-colour squares with pink price tags. Pink pills are the loud accent, as in the reference.",
    "Signature elements hold across apps: section bands, outline pills, flat heavy-outlined sticker art (a different object per product, one sticker in empty states), the turning-coin loader, the hard lift on whole cards and buttons, and the pink halo on focused inputs. The only weakening is the dark-mode white sticker fills on the blog.",
    "Not re-raised (earlier minors): Shop isn't marked current on product pages; the switch pink vs ink contradiction; the empty-filter sticker size; the leftover column-label strip on mobile tables; the dashboard chart and activity card heights (now equal); mobile spacing under the band; sticker outline weight.",
    "Verdict: passes. No blockers or majors. Five minors, two of them caused by the spec (sticker fills in dark, ghost hover applied to busy buttons)."
  ]
}
```