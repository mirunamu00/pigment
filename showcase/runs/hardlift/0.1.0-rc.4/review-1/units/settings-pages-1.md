```json
{
  "items": [
    { "id": "settings--page--settings-profile--desktop-light", "status": "finding", "note": "A full-width teal band holds the breadcrumb, a 'Profile' h1 in regular weight and the sub-nav pills, with a paper-filled selected pill and an ink rule underneath. Below it, one outlined card has a two-column form, a pink 'Save changes' button and a ghost 'Reset' button. The card is only about 60% of the container wide and sits on the left, which leaves a large empty paper area under the right half of the band." },
    { "id": "settings--page--settings-profile--mobile-light", "status": "ok", "note": "The band collapses correctly to a title, a lead and a pill strip that scrolls sideways ('Billing' runs off the edge on purpose). The form below is one column in an outlined card, ending with the pink save button and a ghost reset. Spacing is even and nothing is cut off." },
    { "id": "settings--page--settings-profile--desktop-dark", "status": "finding", "note": "The dark version keeps the teal band with ink text, and the selected pill turns into a dark raised fill. Under the band, a charcoal raised card sits on black, with light-bordered inputs and the single pink save action. It has the same left-hugging narrow column as the light version." },
    { "id": "settings--page--settings-profile--mobile-dark", "status": "ok", "note": "This matches the light mobile version in dark: teal band, dark selected pill, a charcoal card with the initials tile, form fields in one column, and pink save next to ghost reset. Everything is readable and on rhythm." },
    { "id": "settings--page--settings-notifications--desktop-light", "status": "finding", "note": "The band carries a status pill reading '3 of 6 notifications on' above the sub-nav. Below are two outlined cards (Email, Push) with rows separated by hairlines, each with an On/Off label and an ink-filled switch. The ink switches follow the spec's never-pink rule. The cards fill only the left part of the container, the same stranded column as on the other settings screens." },
    { "id": "settings--page--settings-notifications--mobile-light", "status": "ok", "note": "Two stacked outlined cards with hairline-ruled rows. Descriptions wrap cleanly to the left of the On/Off switches, and the band's status pill and pill strip fit. Nothing is cramped." },
    { "id": "settings--page--settings-notifications--desktop-dark", "status": "finding", "note": "In dark mode the switches turn paper-filled with a dark knob when on and outlined when off. The cards are charcoal with light borders under the teal band. The hierarchy reads clearly, but the narrow left column leaves a wide black area to the right." },
    { "id": "settings--page--settings-notifications--mobile-dark", "status": "ok", "note": "Same structure as light mobile, with dark selected pill, charcoal cards and paper switches. Text contrast holds and the row rhythm is even." },
    { "id": "settings--page--settings-security--desktop-light", "status": "finding", "note": "An outlined 'Change password' card holds three inputs and one pink 'Update password' button. Below it, an 'Active sessions' h2 sits over a bordered table with a gray header and ghost 'Revoke' row actions, plus an outlined 'This device' pill. All of it sits in the narrow left column under a full-width band." },
    { "id": "settings--page--settings-security--mobile-light", "status": "finding", "note": "The password card is fine. The sessions table, though, shows only the Device and Location columns: 'Last active' and every 'Revoke' action are off-screen to the right with no scroll cue, and 'New York, US' runs into the table's right border. The page's only destructive task is hidden." },
    { "id": "settings--page--settings-security--desktop-dark", "status": "finding", "note": "The dark charcoal password card has a pink submit button, and the sessions table has light hairline rules and outlined Revoke buttons with a red icon. It is readable and consistent with the light version, in the same left-hugging narrow column." },
    { "id": "settings--page--settings-security--mobile-dark", "status": "finding", "note": "The dark mobile version has the same problem as light: the sessions table is cut at Location, with no visible Last active or Revoke column and no sign that the box scrolls sideways." },
    { "id": "settings--page--settings-billing--desktop-light", "status": "finding", "note": "Three outlined plan cards each carry a pink price tag. The current plan has a heavier ink border and an outlined 'Current plan' status pill, and the other two have ghost switch buttons. Below come a payment-method card and an invoice table with outlined Paid/Due status pills. There is no pink action, which fits a page without a primary save. Everything sits in the narrow left column." },
    { "id": "settings--page--settings-billing--mobile-light", "status": "ok", "note": "The plan cards stack in one column with pink price tags and ghost switch buttons, the current plan is marked by its border and status pill, and the payment card follows. The invoice table fits all four columns at 390px with no clipping." },
    { "id": "settings--page--settings-billing--desktop-dark", "status": "finding", "note": "Charcoal plan cards on black, with pink price tags and a light-bordered current plan, followed by the invoice table with outlined status pills and a yellow 'Due' clock icon. It matches the light version, including the stranded narrow column." },
    { "id": "settings--page--settings-billing--mobile-dark", "status": "ok", "note": "The dark mobile version stacks the plans, payment card and full invoice table cleanly. Pink appears only on the price tags, and contrast and spacing hold throughout." }
  ],
  "findings": [
    {
      "severity": "major",
      "area": "polish",
      "summary": "At phone width the sessions table keeps its desktop columns and scrolls inside its box with no cue. Only Device and Location are visible: the Last active column and every Revoke row action sit off-screen, and the Location text runs into the box's right border. The screen's main task can't be seen.",
      "samples": 1,
      "of": 1,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.4/settings/20261019-131819/screenshots/settings-security-mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.4/review-1/sheets/settings--page--settings-security--mobile-dark.png"
      ],
      "items": [
        "settings--page--settings-security--mobile-light",
        "settings--page--settings-security--mobile-dark"
      ],
      "promptFix": "Under breakpoint.md, a table whose rows carry actions never hides those actions behind sideways scroll. Reflow each row into a stacked block inside the same bordered box: the primary cell as the title, the other cells as label/value lines, and the row action visible at the end. Keep internal scroll only for read-only tables that have more columns than fit, and give those a visible cue (a cut-off last column plus space.12 of padding before the border). Verify at 390px that every row action is on screen without scrolling the table."
    },
    {
      "severity": "minor",
      "area": "spacingRhythm",
      "summary": "On desktop, every settings screen puts its content in a narrow column of about 60% of the container, pinned left under a full-width band. That leaves a large empty strip on the right. The reference fills its container edge to edge, with dense content under the band.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.4/review-1/sheets/settings--page--settings-billing--desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.4/review-1/sheets/settings--page--settings-profile--desktop-light.png"
      ],
      "items": [
        "settings--page--settings-profile--desktop-light",
        "settings--page--settings-profile--desktop-dark",
        "settings--page--settings-notifications--desktop-light",
        "settings--page--settings-notifications--desktop-dark",
        "settings--page--settings-security--desktop-light",
        "settings--page--settings-security--desktop-dark",
        "settings--page--settings-billing--desktop-light",
        "settings--page--settings-billing--desktop-dark"
      ]
    }
  ]
}
```