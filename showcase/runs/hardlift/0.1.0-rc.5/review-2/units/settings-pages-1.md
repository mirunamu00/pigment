I checked all 16 settings screens. There is one blocker and one major, and both come from sample 2 only. Samples 1 and 3 are clean apart from a switch color that the spec itself contradicts.

- **Blocker:** on phone width, the Revoke button in each active-session block shrinks to a narrow outline box. Its text spills past the border on both sides (light and dark).
- **Major:** the band color changes on every settings page in sample 2: teal, yellow, periwinkle, then lime. The spec says pages in one section share a band color.
- **Minor:** every "on" switch is ink (paper in dark), not pink. The spec says both: its color rules say selected switches are never pink, while its interaction table says they are.

```json
{
  "items": [
    { "id": "settings--page--settings-profile--desktop-light", "status": "ok", "note": "Full-width band (yellow, teal, periwinkle) with a regular-weight h1 and an ink rule under it, then one outlined form card. Its only pink action is a lifted 'Save changes' next to an outline 'Reset'. Samples 1 and 3 put the pill sub-nav in the band; sample 2 uses a side pill list with an ink current pill. The hierarchy is as clear as the reference's band-then-content order." },
    { "id": "settings--page--settings-profile--mobile-light", "status": "ok", "note": "Collapsed band with the title and a pill strip (sample 2 puts the strip on paper just under the band), then a one-column outlined form with full-width inputs. Save (pink) and Reset sit in the flow; nothing is cut off and the spacing stays on the scale." },
    { "id": "settings--page--settings-profile--desktop-dark", "status": "ok", "note": "Dark ground with the same band colors and ink text inside the band. Selected pills are dark-filled in the band and paper-filled in sample 2's side list. Outlined dark cards, and pink stays limited to the one save button, as the dark mapping says." },
    { "id": "settings--page--settings-profile--mobile-dark", "status": "ok", "note": "Band and pill strip over a dark ground, with a one-column form in an outlined card and pink Save plus an outline Reset at the bottom. The text is legible and nothing overlaps." },
    { "id": "settings--page--settings-notifications--desktop-light", "status": "finding", "note": "Band with the title and a '3 of 6 on' count (a pill in sample 2), then two outlined cards of toggle rows split by hairline rules. Every 'on' switch is ink-filled rather than pink, and sample 2's band turns yellow here after a teal profile page." },
    { "id": "settings--page--settings-notifications--mobile-light", "status": "finding", "note": "Collapsed band and pill strip, then Email and Push cards stacked, each row a label, a description and an On/Off switch at the right. The layout holds, but the 'on' switches are ink, not the pink fill the interaction table gives a selected switch." },
    { "id": "settings--page--settings-notifications--desktop-dark", "status": "finding", "note": "Dark cards of toggle rows under the band. 'On' switches are paper-filled with a dark knob (the action.inverse mapping) in all three samples. The rows are evenly spaced and readable." },
    { "id": "settings--page--settings-notifications--mobile-dark", "status": "finding", "note": "Band, pill strip with a paper or dark selected pill, then two stacked dark toggle cards. Same paper-filled 'on' switch as the other themes; nothing is cramped or cut off." },
    { "id": "settings--page--settings-security--desktop-light", "status": "finding", "note": "Band, a 'Change password' card with a pink lifted 'Update password', then an Active sessions table in a bordered box with a gray header strip, a 'This device' status pill and small outline Revoke buttons. Sample 3 puts the form and the table side by side. Sample 2's band is periwinkle here, the third color in three settings pages." },
    { "id": "settings--page--settings-security--mobile-light", "status": "finding", "note": "Password form card, then sessions reflowed into stacked label/value blocks. In samples 1 and 3 each block ends with a proper outline Revoke button. In sample 2 every Revoke collapses into a narrow outline box about as wide as two letters, and its text spills past the border on both sides." },
    { "id": "settings--page--settings-security--desktop-dark", "status": "ok", "note": "Dark version of the same form and sessions table: a pink update button, outline Revoke row actions, an ink-rule header strip, and the band in its section color. It is readable, aligned and holds the bordered-box table recipe." },
    { "id": "settings--page--settings-security--mobile-dark", "status": "finding", "note": "Stacked session blocks in a dark bordered box under the form. Sample 2 repeats the collapsed Revoke box with its text spilling past the border, while samples 1 and 3 show full-width-text outline buttons." },
    { "id": "settings--page--settings-billing--desktop-light", "status": "finding", "note": "Band, three outlined plan cards with pink price tags and a 'Current plan' pill, a payment-method row and an invoices table with outline status pills. Sample 1 makes the switch buttons ink; the others use outline. No pink button competes. Sample 2's band is a fourth color (lime) for the same settings area." },
    { "id": "settings--page--settings-billing--mobile-light", "status": "ok", "note": "Plan cards stack one per row with pink price tags, then a payment card and invoices reflowed into label/value blocks with Due/Paid pills at the right. The rhythm stays even and nothing overflows." },
    { "id": "settings--page--settings-billing--desktop-dark", "status": "ok", "note": "Dark plan cards with pink price tags and paper or outline switch buttons, then a payment row and a dark invoices table. The current plan is marked by a pill and a heavier border; the hierarchy reads plans first, then invoices." },
    { "id": "settings--page--settings-billing--mobile-dark", "status": "ok", "note": "Stacked dark plan cards, the payment card and invoice blocks under the band and pill strip. Pink is used only for price tags, the status pills are outlined, and nothing is clipped." }
  ],
  "findings": [
    {
      "severity": "blocker",
      "area": "polish",
      "summary": "At phone width, the session table reflows into stacked blocks, but each block's Revoke row action collapses into a narrow outline box about as wide as two letters. The label spills past both sides of the border, so the button is broken and hard to hit. This shows in light and dark.",
      "samples": 1,
      "of": 3,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/settings/20261019-210158-s1/screenshots/settings-security-mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-security--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-security--mobile-dark.png"
      ],
      "items": [
        "settings--page--settings-security--mobile-light",
        "settings--page--settings-security--mobile-dark"
      ],
      "promptFix": "When a table reflows into stacked row blocks, give the row action its own line, sized to its label: the button never shrinks below its content (flex: none or width: max-content, white-space: nowrap) and keeps at least size.hit height. Check at 390px that every button label sits fully inside its border."
    },
    {
      "severity": "major",
      "area": "signature",
      "summary": "The settings area's band changes color on every sub-page: teal on profile, yellow on notifications, periwinkle on security, lime on billing. The band recipe says parent and child pages of one section share one color, and colors are assigned to sections. Here the color acts as decoration per page, not as the area's identity the way the reference's category bands are.",
      "samples": 1,
      "of": 3,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-profile--desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-notifications--desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-security--desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-billing--desktop-light.png"
      ],
      "items": [
        "settings--page--settings-notifications--desktop-light",
        "settings--page--settings-security--desktop-light",
        "settings--page--settings-billing--desktop-light"
      ],
      "promptFix": "Pick the band color once per section, meaning everything reachable from one sub-nav or sharing one parent, and use that same color on every page in it. Tabs or sub-pages inside a section never get their own band color. Before finishing, open every page of a section and check that their bands match."
    },
    {
      "severity": "minor",
      "area": "componentStates",
      "summary": "Every 'on' switch is ink-filled in light and paper-filled in dark, never pink. The spec contradicts itself here: Color use says selected switches use surface.raised or action.inverse, never pink, while the Interaction table says a selected switch takes the action.primary fill with an ink knob.",
      "samples": 3,
      "of": 3,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-notifications--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/review-2/sheets/settings--page--settings-notifications--desktop-dark.png"
      ],
      "items": [
        "settings--page--settings-notifications--desktop-light",
        "settings--page--settings-notifications--mobile-light",
        "settings--page--settings-notifications--desktop-dark",
        "settings--page--settings-notifications--mobile-dark"
      ]
    }
  ]
}
```