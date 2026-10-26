```json
{
  "items": [
    {
      "id": "settings--page--settings-profile--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "A cream header band with a sag arc, an h2 title and a cluster of a crescent-shaded yolk disc, a tilted blue pill and two sparkles sits above a cream 24px panel with warm-grey 2px fields and an ink save pill, much like the reference's cream form panel (09). The sidebar uses an ink pill with a white dot and area-hue dots. The cluster takes only about a fifth of the band and leaves a wide empty cream stretch, where the reference fills its bands with layered art (02)."
    },
    {
      "id": "settings--page--settings-profile--mobile-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The phone now has a compact header band with the cluster tucked about 90px into the top corner and the text kept clear, as in the reference's phone band (04). rc.2's stacked art row is gone. Below it come the cream panel, the crescent initials disc and the cream 'change photo' pill on its ledge, all in the reference's calm warm rhythm."
    },
    {
      "id": "settings--page--settings-profile--desktop-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "The night version has a navy page, an indigo band and panel, a white active sidebar pill and lilac-bordered indigo fields. This is a faithful version of the reference's night palette (03), and the yolk disc and blue pill pop on indigo. The cluster has the same small scale and empty band as the light version."
    },
    {
      "id": "settings--page--settings-profile--mobile-dark",
      "status": "ok",
      "fidelity": 4,
      "note": "The phone night screen has a compact indigo band with its arc and the cluster in the corner, white and indigo nav pills with category dots, and an indigo panel with white type. It is legible and reads as the reference's night palette (03) used on the phone layout (04)."
    },
    {
      "id": "settings--page--settings-notifications--desktop-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The cream band holds a blue speech bubble with three dots, a pink disc overlapping it and orange and yellow sparkles. The cluster is chosen for the subject and differs from the other areas. The group panels have an envelope spot plate, white inner rows with warm rules and ink switches. It is close to the reference's plates-beside-titles (07) and cream panels (09). The white status chip above the band's fold looks a little like a button."
    },
    {
      "id": "settings--page--settings-notifications--mobile-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The compact band has the bubble cluster in the corner and the text wrapping clear of it. The active ink tab pill is visible in the strip, and the cream panel has an envelope plate and roomy switch rows. The header and band are as tidy as the reference phone (04)."
    },
    {
      "id": "settings--page--settings-notifications--desktop-dark",
      "status": "ok",
      "fidelity": 4,
      "note": "The night version has an indigo band and panels, a white plate holding the envelope, white-track switches with ink knobs, and lilac secondary text. It follows the reference's night palette (03) closely, and the blue bubble and pink disc keep their saturation."
    },
    {
      "id": "settings--page--settings-notifications--mobile-dark",
      "status": "ok",
      "fidelity": 4,
      "note": "The phone night screen has a compact indigo band with the corner cluster, a white active tab pill, and an indigo panel with a white envelope plate and switch rows. It is coherent with the reference's night language and spaced generously."
    },
    {
      "id": "settings--page--settings-security--desktop-light",
      "status": "finding",
      "fidelity": 4,
      "note": "The cream band holds a crescent-shaded green hexagon with a keyhole, a yolk pill and sparkles. The subject reads well, and the green padlock plate by the group title is a good small-scale pictogram, in the spirit of 07. The cluster repeats profile's layout, with the lead shape upper left, a tilted pill overlapping at lower right and a big and a small sparkle. It also fills only about a fifth of the band."
    },
    {
      "id": "settings--page--settings-security--mobile-light",
      "status": "ok",
      "fidelity": 4,
      "note": "The compact band has the hexagon cluster in its top corner, the active ink pill is in view, and the cream panel holds the padlock plate and warm-grey fields at a comfortable rhythm. This matches the reference's phone header and stacked band (04)."
    },
    {
      "id": "settings--page--settings-security--desktop-dark",
      "status": "finding",
      "fidelity": 4,
      "note": "This is the night version of the security page: an indigo band with the green hexagon and yolk pill, an indigo panel and lilac-bordered fields. The palette translation is faithful to 03, but the cluster has the same shared layout and small scale as the light version."
    },
    {
      "id": "settings--page--settings-security--mobile-dark",
      "status": "ok",
      "fidelity": 4,
      "note": "The phone night screen has a compact indigo band with the corner cluster, a white active pill, and an indigo panel with a white padlock plate and indigo fields. It is clean and clearly the reference's night language."
    },
    {
      "id": "settings--page--settings-billing--desktop-light",
      "status": "finding",
      "fidelity": 3,
      "note": "The cream band has a good orange card cluster with a violet disc and sparkles, and the selected plan is a violet field with a check disc. The two unselected plans are grey-outlined white boxes with about 32px prices and ink pills, which reads as a generic SaaS pricing grid. The reference uses borderless toned tiles with big bold figures (08)."
    },
    {
      "id": "settings--page--settings-billing--mobile-light",
      "status": "finding",
      "fidelity": 3,
      "note": "The compact band and its corner card cluster are right. The scrolling section strip shows Profile, Notifications and Security but leaves the active Billing pill out of view, so nothing marks the current page. Below, the plans stack as grey-bordered white cards."
    },
    {
      "id": "settings--page--settings-billing--desktop-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The night version has an indigo band and the orange card cluster, and the selected plan is a violet field. The other plans are lilac-outlined indigo boxes with small prices and white pills: still the bordered generic grid, not the reference's toned, number-led tiles (08)."
    },
    {
      "id": "settings--page--settings-billing--mobile-dark",
      "status": "finding",
      "fidelity": 3,
      "note": "The phone night screen has the compact band with the cluster in the corner. As in light mode, the section strip scrolls the active Billing pill out of view, and the plans stack as lilac-outlined indigo cards."
    }
  ],
  "findings": [
    {
      "kind": "gap",
      "severity": "minor",
      "area": "referenceFidelity",
      "summary": "Unselected billing plans are still outlined boxes, grey on white (lilac on indigo at night), with prices of about 32px. This makes a generic pricing grid next to the violet selected plan. The reference carries figures on borderless toned tiles with a big bold number under a small eyebrow, and the spec says cards never have borders. This has been open since rc.1.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/settings--page--settings-billing--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/settings--page--settings-billing--desktop-dark--s1.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": [
        "settings--page--settings-billing--desktop-light",
        "settings--page--settings-billing--desktop-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "gap",
      "severity": "minor",
      "area": "signature",
      "summary": "Header-band clusters are better than rc.2. Each area now has its own subject-led shape: a disc, a speech bubble, a keyhole hexagon, a card. They still fill only about a fifth of the band's width and leave a wide empty cream stretch. Profile and security also share one layout: the lead shape upper left, a tilted pill overlapping at lower right, and one large and one small sparkle. The reference's bands carry a bigger, layered scene that fills about half the band.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/settings--page--settings-profile--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/settings--page--settings-security--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/02-desktop.png"
      ],
      "items": [
        "settings--page--settings-profile--desktop-light",
        "settings--page--settings-profile--desktop-dark",
        "settings--page--settings-security--desktop-light",
        "settings--page--settings-security--desktop-dark"
      ],
      "promptFix": ""
    },
    {
      "kind": "defect",
      "severity": "minor",
      "area": "polish",
      "summary": "On phones, the horizontally scrolling section strip opens scrolled to the start. When the current section is the last one, its active ink or white pill is off-screen and nothing on the first screen marks the current page. This was named in rc.2 and is still open.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/settings--page--settings-billing--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.3/review-1/crops/settings--page--settings-billing--mobile-dark--s1.png"
      ],
      "items": [
        "settings--page--settings-billing--mobile-light",
        "settings--page--settings-billing--mobile-dark"
      ],
      "promptFix": ""
    }
  ]
}
```