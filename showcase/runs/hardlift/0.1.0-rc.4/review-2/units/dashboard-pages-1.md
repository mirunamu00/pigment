```json
{
  "items": [
    { "id": "dashboard--page--home--desktop-light", "status": "ok", "note": "A full-width teal band with a regular-weight 'Overview' h1 and an ink rule under it, then four outlined stat cards, a chart card with ink bars and one small pink coin sticker, and a bordered table with pill filters ('All' selected). One pink action (Refresh) and the ink current-page pill in the sidebar. It reads in order: band, stats, detail, like the reference's band-then-dense-grid." },
    { "id": "dashboard--page--home--mobile-light", "status": "finding", "note": "The band collapses to the title and a pink Refresh, the stat cards stack one per row, and the header nav becomes a pill strip with an ink current pill. The projects table at the bottom shows only Project, Owner and Status: Budget and Due date are hidden behind sideways scroll inside the box, with no cut-off column to hint at them." },
    { "id": "dashboard--page--home--desktop-dark", "status": "ok", "note": "The same layout on a black ground with raised dark-gray outlined cards. Paper-colored chart bars, the paper current pill, the teal band with ink text, and a pink Refresh as the only pink action, which matches the spec's dark mapping." },
    { "id": "dashboard--page--home--mobile-dark", "status": "finding", "note": "The dark mobile stack matches the light one, and the coin sticker and green/red delta text stay readable. The projects table has the same problem: it stops at Status, with Budget and Due date off-screen and no scroll cue." },
    { "id": "dashboard--page--projects--desktop-light", "status": "ok", "note": "A periwinkle band with the 'Projects' h1 and one sentence, then 'All projects' with pill filters and a filter input on the right, and a bordered table: a gray sticky header, underlined project links, outlined status pills with icons, and right-aligned tabular budgets. Dense, with no art, as the data-table row asks." },
    { "id": "dashboard--page--projects--mobile-light", "status": "finding", "note": "The band collapses cleanly and the pills and filter input stack. The table shows Project, Owner and Status with the Status column ending exactly at the border, so it looks complete while Budget and Due date are reachable only by swiping." },
    { "id": "dashboard--page--projects--desktop-dark", "status": "ok", "note": "The dark version keeps the periwinkle band with ink text, the paper current pill in the sidebar, a raised table box with hairline row rules, and readable gray secondary lines under each project name." },
    { "id": "dashboard--page--projects--mobile-dark", "status": "finding", "note": "The dark mobile table has the same three visible columns. Nothing shows that two more columns sit off-screen. Otherwise the band, pills and filter field are on the scale." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-light", "status": "ok", "note": "The project's band reuses the section's periwinkle, with an underlined breadcrumb, a 'Apollo Migration' h1, a meta line, an outlined status pill and Overview/Tasks/Files pill tabs with the selected pill raised. Below is one outlined card: a description and four subtle-well stats." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-light", "status": "ok", "note": "On mobile the band stacks the breadcrumb, h1, meta, status pill and pill tabs. The overview card shows the description and a 2x2 grid of subtle wells. Nothing is cramped or cut." },
    { "id": "dashboard--page--projects-apollo-migration--desktop-dark", "status": "ok", "note": "The dark detail page keeps the periwinkle band with ink text. The selected tab and the status pill turn dark-filled, and the stat wells are black inside a raised card, so the hierarchy is clear." },
    { "id": "dashboard--page--projects-apollo-migration--mobile-dark", "status": "ok", "note": "The dark mobile detail page matches the light one: band, dark-filled selected 'Overview' pill, a raised card with four dark wells, and readable paper text." },
    { "id": "dashboard--page--team--desktop-light", "status": "ok", "note": "A yellow band with the 'Team' h1 and a count sentence, then a bordered table with square ink-outlined initial avatars, underlined emails, role, location and a right-aligned project count. No lift on rows and no art, which is right for a data screen." },
    { "id": "dashboard--page--team--mobile-light", "status": "finding", "note": "The yellow band collapses correctly, but the table shows only Name and Role. Role text such as 'Senior Backend Engineer' runs against the box's right border, and Location and Active projects are hidden behind sideways scroll with no cue." },
    { "id": "dashboard--page--team--desktop-dark", "status": "ok", "note": "The dark team page keeps the yellow band with ink text, a raised table with ink-outlined initial squares in paper outline, gray underlined emails, and the paper current pill in the sidebar." },
    { "id": "dashboard--page--team--mobile-dark", "status": "finding", "note": "The dark mobile team table repeats the light problem. Two columns are visible, the role text touches the right border, and the other two columns are hidden with no cue." }
  ],
  "findings": [
    {
      "severity": "major",
      "area": "polish",
      "summary": "This is still present in the same run: at phone width every table keeps its desktop columns and scrolls sideways inside its box with no cue. The overview and project lists stop at Status, so Budget and Due date are hidden. The team list stops at Role, with Location and Active projects hidden and the role text pressed against the right border. The last visible column ends flush with the border, so each table looks complete.",
      "samples": 1,
      "of": 1,
      "specCaused": true,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.4/review-2/sheets/dashboard--page--home--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.4/review-2/sheets/dashboard--page--projects--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.4/review-2/sheets/dashboard--page--projects--mobile-dark.png",
        "showcase/runs/hardlift/0.1.0-rc.4/review-2/sheets/dashboard--page--team--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.4/review-2/sheets/dashboard--page--team--mobile-dark.png"
      ],
      "items": [
        "dashboard--page--home--mobile-light",
        "dashboard--page--home--mobile-dark",
        "dashboard--page--projects--mobile-light",
        "dashboard--page--projects--mobile-dark",
        "dashboard--page--team--mobile-light",
        "dashboard--page--team--mobile-dark"
      ],
      "promptFix": "Under breakpoint.md, a table never silently hides columns. Either reflow each row into a stacked block inside the same bordered box (the primary cell as title, the other cells as label/value lines, the row action at the end), or, for a read-only table kept as a grid, make the overflow visible: size the columns so the last visible one is cut part-way, and keep space.12 of padding between cell text and the box border. Verify at 390px that every column's data is either visible or clearly cut off at the edge, and that no cell text touches the border."
    }
  ]
}
```