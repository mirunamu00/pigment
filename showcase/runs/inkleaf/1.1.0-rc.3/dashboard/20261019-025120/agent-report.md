Inkleaf 1.1.0-rc.3 is applied to every screen, in light and dark. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked the screenshots of every screen at both widths in both themes. Routes, labels, form fields, `data-testid`s and ARIA attributes are unchanged.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` directly, so no values are retyped. Fonts load from Google Fonts as the spec allows. Dark mode follows the system setting, and `[data-theme]` can override it.
- **Signature pieces (`src/ink/`):**
  - **Pictograms:** the brush filters, the one-strip stepped animation that plays once, boil, and once-per-session playback for the screen headers.
  - **Other pieces:** pastel stages with wandering lines, headings that fade in word by word, the working glyph and breathing dot, the ring-style controls, and block rise.
  - **Reduced motion:** all of this motion stops under `prefers-reduced-motion`.
- **16 original drawings.** 9 of them show a hand, and no hand pose is used more than 3 times:
  - five small header drawings: telescope, map, pencil, mug, wrench;
  - three empty or error states: a plan scroll for the filtered-empty table, an hourglass for Settings, a lantern for not-found;
  - one drawing per project on its detail page, on a drawing stage.
- **Shell:** sidebar at 992px and wider, a 72px sticky header, a menu button with a sheet of nav links below 992px, a search field with an icon and clear button, and the account menu.
- **Screens:**
  - **Overview:** each screen now has the same header (drawing, heading, actions, lede), and this one has stat cards. Change colors follow meaning, so falling incidents show as good news. The chart sits on the page's one stage, and the Refresh button shows the glyph while loading.
  - **Tables:** filter chips, column sorting with arrows and status badges. Tables with a status column stack into rows under 834px, with a native "Sort by" select. The others scroll inside a labelled region.
  - **Project detail:** underline tabs and styled checkboxes.
  - **Team:** avatar tiles.
  - **Settings and not-found:** empty and error states.
- **Docs:** `design-system/` (VERSION, tokens, components.md with each drawing's one-word name), plus `AGENTS.md` and `CLAUDE.md` pointers.

**What I couldn't apply or verify**
- **No per-screen commits.** git wasn't on the list of allowed commands. For the same reason I couldn't delete the temporary preview file: `src/pages/InkPreview.tsx` is now an empty stub with no route, so please delete it.
- **Blocks below the fold look blank in the full-page screenshots.** Block rise hides them until they scroll into view, and the screenshot never scrolls. That is the specified behavior, and the spec forbids changing code to review. I checked the same pieces at the top of a temporary route instead, then removed the route.
- **Not tested:** reduced-motion emulation (the snapshot tool has no option for it), closing animations for the menus (they are removed from the page immediately), and the nav sheet in its open state (snapshots can't click).

**Decisions I made**
- **Colors and sizes:**
  - Status colors: active is info with a breathing dot, paused is warning, done is success.
  - Stat values shrink to `clamp(h4, 7vw, h3)` on phones so two cards fit per row.
  - All project detail stages use sage, following the stage colour rotation.
- **Added content:**
  - The not-found pages got a second action, because the spec calls for two.
  - The mobile chart card has tighter padding.
- **Left out or rebuilt:**
  - I added no product footer, because the app didn't have one.
  - The chart is rebuilt in HTML so its labels stay readable at small widths. Its test IDs and accessible label are unchanged.
- **Small drawings:** the small header drawings have no hands, because the stroke limit at 48px leaves no room for one.
- **Stamp drawing:** I gave it a flat cap. My first version, a round knob held from above, read as a head, which the spec bans.