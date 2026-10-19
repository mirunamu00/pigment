19개 항목을 모두 확인했습니다. rc.4의 두 major는 이번 대시보드에서 해결됐습니다. 폰 화면 표는 행 블록으로 다시 배치되고, Refresh 버튼은 ink 색입니다.

```json
{
  "items": [
    { "id": "dashboard--state--search-focus--desktop-light", "status": "ok", "note": "The project filter field has an ink border with the pink halo ring, and its clear × sits inside the field. The table narrows to the one matching row and the count reads 'Showing 1 of 8 projects', so the result is clear. The band's Refresh is ink now, so the only pink is the focus halo." },
    { "id": "dashboard--state--search-focus--desktop-dark", "status": "ok", "note": "In dark, the filter field shows a pink halo on the raised field and the typed text is easy to read. The count line and the single filtered row match the light version, and Refresh is paper-filled, not pink." },
    { "id": "dashboard--state--search-focus--mobile-light", "status": "ok", "note": "The full-width filter field carries the ink border and pink halo. Below it, the one matching project shows as a stacked label/value block inside the bordered table box, so no column is cut off at phone width." },
    { "id": "dashboard--state--row-hover--desktop-light", "status": "ok", "note": "The hovered first row gets a flat subtle-gray fill across the table, with no lift, as the interaction table asks. The linked project name stays underlined ink, and the ink sticky rule under the header holds." },
    { "id": "dashboard--state--row-hover--desktop-dark", "status": "ok", "note": "The dark table keeps raised cells, hairline rules, status pills with icon plus word, and tabular figures. The hover fill on the first row is faint, but it was already raised in an earlier review and it isn't a regression." },
    { "id": "dashboard--state--row-hover--mobile-light", "status": "finding", "note": "The table reflows into stacked row blocks, and the hovered second block gets the subtle fill with every field visible. The box still opens with a gray strip of column names (Project, Owner, Status, Budget) and a 'Due date ↑' sort pill. Those names repeat the labels already in each block." },
    { "id": "dashboard--state--keyboard-focus--desktop-light", "status": "ok", "note": "The 'Projects' sidebar link shows a 2px ink focus ring that follows the pill radius, right under the ink-filled current 'Overview' pill. Nothing else changes, so the focused element is clear." },
    { "id": "dashboard--state--keyboard-focus--desktop-dark", "status": "ok", "note": "In dark, the focused 'Projects' sidebar pill gets a pink focus outline, matching the dark focus ring token, and it is clearly visible against the black sidebar. The paper-filled current pill stays distinct." },
    { "id": "dashboard--state--keyboard-focus--mobile-light", "status": "ok", "note": "In the top pill strip, 'Projects' shows the ink focus ring next to the ink-filled current 'Overview' pill. The ring isn't clipped by the strip." },
    { "id": "dashboard--state--user-menu-open--desktop-light", "status": "ok", "note": "The account trigger is open, and below it a raised panel with an ink border and a hard offset shadow lists the email, Account settings, My team and Sign out. The panel overlaps the teal band cleanly, and there's no pink on the trigger." },
    { "id": "dashboard--state--user-menu-open--desktop-dark", "status": "ok", "note": "The dark menu is a raised dark panel with a light border and the light hard shadow over the band. The text is readable, and the chevron flips to show the open state." },
    { "id": "dashboard--state--user-menu-open--mobile-light", "status": "ok", "note": "On phone, the menu drops from the avatar trigger as a bordered, hard-shadowed panel over the band's title and Refresh. It covers them on purpose, and every menu item is fully readable." },
    { "id": "dashboard--state--empty-filter--desktop-light", "status": "ok", "note": "A query with no matches shows 'Showing 0 of 8 projects'. A bordered empty panel has a small tilted sticker, 'No projects match your filters', a hint line and one pink 'Clear filters' lift button. Refresh in the band is ink, so only one pink action is in view, which fixes the rc.4 major." },
    { "id": "dashboard--state--empty-filter--desktop-dark", "status": "ok", "note": "In dark, the empty panel is raised dark with the sticker, the message, the hint and the pink 'Clear filters'. The band's Refresh is paper-filled, so the two-pink problem from rc.4 is gone here too." },
    { "id": "dashboard--state--empty-filter--mobile-light", "status": "ok", "note": "On phone, the empty panel sits under the haloed filter field, with the sticker, message, hint and a pink 'Clear filters'. Refresh higher up in the band is ink, so one pink action rules the screen." },
    { "id": "dashboard--state--loading--desktop-light", "status": "ok", "note": "Each stat tile swaps its value for a small turning-coin sticker and 'Loading...' text, and the band button reads 'Refreshing...' in ink with a coin. No spinner or shimmer is used. The chart, activity and table stay in place." },
    { "id": "dashboard--state--loading--desktop-dark", "status": "ok", "note": "In dark, the four tiles show pink coin stickers with 'Loading...', and the paper-filled band button reads 'Refreshing...'. The text is readable and the rest of the dashboard stays stable." },
    { "id": "dashboard--state--loading--mobile-light", "status": "ok", "note": "On phone, the two-by-two stat tiles each show a coin and 'Loading...', and the ink band button shows the coin with 'Refreshing...'. Nothing overflows and the layout doesn't shift." },
    { "id": "dashboard--drawings--home", "status": "ok", "note": "The captured drawing is the throughput bar chart: flat ink bars with values on top, month labels and an ink baseline on the raised card. There's no gradient or blur, and it reads clearly at its size. The only sticker beside it is the one small 32px coin the dashboard row allows." }
  ],
  "findings": [
    {
      "severity": "minor",
      "area": "polish",
      "summary": "At phone width, the reflowed table still opens with a gray header strip of column names plus a separate sort pill. Each stacked block below already labels every field, so the strip is a leftover desktop header that repeats information and looks like a broken header row.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.5/review-1/sheets/dashboard--state--row-hover--mobile-light.png",
        "showcase/runs/hardlift/0.1.0-rc.5/dashboard/20261019-204125/screenshots/state-row-hover-mobile-light.png"
      ],
      "items": [
        "dashboard--state--row-hover--mobile-light"
      ]
    }
  ]
}
```