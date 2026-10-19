All 19 checklist items are reviewed, with one major and one minor finding.

- **Major (not new):** In the empty-filter state on desktop, light and dark, two pink buttons are visible at once: the band's "Refresh" and the empty state's "Clear filters". The last review already reported this.
- **Minor:** The empty state uses a small magnifier icon instead of the 160px sticker the spec calls for.
- **Already reported, not raised again:** In dark mode, the hovered table row looks almost the same as the other rows.

The other states (search focus, row hover, keyboard focus, menu, loading) and the drawing follow the system.

```json
{
  "items": [
    { "id": "dashboard--state--search-focus--desktop-light", "status": "ok", "note": "The focused 'Filter projects' field holds 'Apollo' with an ink border and a pink halo ring plus outline, and has a clear button. The table below narrows to the one matching row and the count reads 'Showing 1 of 8 projects'." },
    { "id": "dashboard--state--search-focus--desktop-dark", "status": "ok", "note": "Same as light on the black ground: the filter field has a pink halo around its paper-colored border, white text, and the single filtered row in the bordered table. Contrast holds and no layers overlap." },
    { "id": "dashboard--state--search-focus--mobile-light", "status": "ok", "note": "The full-width filter field below the pill strip shows the pink halo, ink outline and clear 'x'. The table under it is cut to the one matching row, and the count above updates to 1 of 8." },
    { "id": "dashboard--state--row-hover--desktop-light", "status": "ok", "note": "The hovered first row of the bordered projects table gets the subtle paper-gray fill with no lift, as the spec asks. Status pills, the underlined project links and tabular figures stay readable." },
    { "id": "dashboard--state--row-hover--desktop-dark", "status": "ok", "note": "Dark table on the raised gray box with ink rules between rows. The hover fill on the first row is barely different from the other rows. That issue was reported last review, so it is not raised again." },
    { "id": "dashboard--state--row-hover--mobile-light", "status": "ok", "note": "At phone width the second row carries the subtle hover fill across all three visible columns, the box keeps its ink border, and nothing lifts." },
    { "id": "dashboard--state--keyboard-focus--desktop-light", "status": "ok", "note": "Keyboard focus sits on the 'Projects' item in the sidebar: a pill-shaped 2px ink outline under the ink-filled current 'Overview' pill. It is clearly visible and not a browser default." },
    { "id": "dashboard--state--keyboard-focus--desktop-dark", "status": "ok", "note": "In dark mode the focused 'Projects' sidebar pill shows a pink focus ring under the paper-filled current pill. It is easy to see on the black sidebar." },
    { "id": "dashboard--state--keyboard-focus--mobile-light", "status": "ok", "note": "In the top pill strip, 'Projects' carries a full ink focus outline next to the ink-filled 'Overview'. The whole ring shows, with nothing clipped." },
    { "id": "dashboard--state--user-menu-open--desktop-light", "status": "ok", "note": "The open account trigger stays raised white with an ink border and an up-chevron, not pink. Under it is a raised panel with an ink border and hard offset shadow listing the email, 'Account settings', 'My team' and 'Sign out'. It overlaps the band cleanly." },
    { "id": "dashboard--state--user-menu-open--desktop-dark", "status": "ok", "note": "The dark menu panel is raised gray with a light border and hard offset shadow over the teal band. The trigger is not pink, and every item is readable." },
    { "id": "dashboard--state--user-menu-open--mobile-light", "status": "ok", "note": "On mobile the menu opens as a near-full-width raised panel with an ink border and hard shadow under the account trigger. It covers the band on purpose and its four lines are legible." },
    { "id": "dashboard--state--empty-filter--desktop-light", "status": "finding", "note": "The filter field shows 'zzzz no match' with a pink halo. The bordered empty box shows a small magnifier, the heading 'No projects match your filters', a hint line and a pink 'Clear filters' button, while the band's pink 'Refresh' stays visible in the same viewport." },
    { "id": "dashboard--state--empty-filter--desktop-dark", "status": "finding", "note": "Same layout in dark mode: the empty box is raised gray with a small pink-and-ink magnifier and a pink 'Clear filters', and the pink 'Refresh' still sits in the teal band above. Two pink actions are on screen." },
    { "id": "dashboard--state--empty-filter--mobile-light", "status": "ok", "note": "At phone width the band's Refresh has scrolled out of view, so the empty box under the halo-focused field has the only pink button, 'Clear filters', under 'No projects match your filters' and a hint. The message is clear." },
    { "id": "dashboard--state--loading--desktop-light", "status": "ok", "note": "The four stat cards each show a small pink coin and 'Loading...' in place of their numbers, and the band button reads 'Refreshing...' with a coin. There is no spinner or shimmer, and the rest of the page stays put." },
    { "id": "dashboard--state--loading--desktop-dark", "status": "ok", "note": "In dark mode each stat card shows a pink coin and 'Loading...'. The band button reads 'Refreshing...' in ink on pink, and its text is legible." },
    { "id": "dashboard--state--loading--mobile-light", "status": "ok", "note": "The stacked stat cards each show the coin with 'Loading...' and the pink 'Refreshing...' button sits in the band. It is the same turning-coin language as on desktop." },
    { "id": "dashboard--drawings--home", "status": "ok", "note": "The drawing is the throughput bar chart: flat solid ink bars with no gradient on a single ink baseline, value labels above and month labels below in the regular grotesk. It reads clearly as monthly counts and matches the reference's flat, outlined look." }
  ],
  "findings": [
    {
      "severity": "major",
      "area": "signature",
      "summary": "Still present from the last review: in the desktop empty-filter state, the band's always-visible pink 'Refresh' and the empty state's pink 'Clear filters' show together, in light and dark. That is two pink actions in one viewport.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.4/dashboard/20261019-131819/screenshots/state-empty-filter-desktop-light.png",
        "showcase/runs/hardlift/0.1.0-rc.4/dashboard/20261019-131819/screenshots/state-empty-filter-desktop-dark.png"
      ],
      "items": [
        "dashboard--state--empty-filter--desktop-light",
        "dashboard--state--empty-filter--desktop-dark"
      ],
      "promptFix": "An action that stays on screen in a page header, band or toolbar (refresh, export, share) is lift--ink or lift--ghost, never pink. Pink goes to the one action the current state is about, such as an empty-state or error recovery, a form submit or a dialog confirm. In the final check, render every state at the desktop viewport and count the pink-filled buttons: there must be exactly one."
    },
    {
      "severity": "minor",
      "area": "signature",
      "summary": "The empty-filter state uses a small icon-sized magnifier instead of the one size.stickerLg sticker the spec's empty-state row asks for. This makes the state read as a plain icon message rather than the system's sticker moment.",
      "samples": 1,
      "of": 1,
      "specCaused": false,
      "evidence": [
        "showcase/runs/hardlift/0.1.0-rc.4/dashboard/20261019-131819/screenshots/state-empty-filter-desktop-light.png"
      ],
      "items": [
        "dashboard--state--empty-filter--desktop-light"
      ]
    }
  ]
}
```