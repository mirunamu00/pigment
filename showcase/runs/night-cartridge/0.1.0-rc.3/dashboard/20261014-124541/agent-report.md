The Night Cartridge restyle is applied to every screen. The build and typecheck pass, and the final `node pigment-snap.mjs` run reports no sideways scrolling at 1440px or 390px, light or dark. I couldn't run the smoke tests because Playwright isn't one of the commands I was allowed. I checked the tests against the code instead: every `data-testid`, label text, route, ARIA attribute and the "n of 6 tasks complete" / "Showing n of 8 projects" strings are unchanged. Nothing is committed, since git wasn't on the allowed list either.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` unchanged, so no values were retyped. Dark mode follows the system setting. The four font links from the spec are in `index.html`.
- **Global styles:** `src/styles/base.css` is rewritten. It has the spec's root block (motion stops under reduced motion and when Animation is off; no rounding), pixel type, the focus ring, stepped animations, the marker, windows, meters, tables, tabs, chips, inputs and the responsive rules.
- **Pixel art:** `src/pixel/scene.ts` draws one world, a server yard at night. It has six prop types, a centre group (rack with a two-frame fan, a terminal, a dish), stars, a drifting cloud, a rare shooting light, and at most 8 lights per scene. It produces the strip, banner, small vignettes and the ground strip.
- **Reusable pieces:** in `src/components/pixel.tsx`, `StageWindow.tsx` and `HeaderSwitches.tsx`. The header has the Animation and Pixel body switches, saved in `localStorage`.
- **Screens:**
  - **Overview:** strip scene, KPI tiles with coloured bars, 48px numbers and block meters, a flat bar chart that fills its panel, activity with pixel avatars, and the projects table.
  - **Projects:** strip scene and the table with filter chips and sort markers.
  - **Project detail:** banner scene, tabs with the marker, a block meter for task progress, and pixel checkboxes that keep the native input.
  - **Team:** strip scene and the table with avatars.
  - **Settings:** strip scene and a window with a workshop vignette.
  - **Not found:** an error vignette with lights off and a red beacon.
  - **Empty filter:** a vignette and a framed "Clear filters" button.
  - **Every screen:** the dotted header rule, the sidebar marker menu (it becomes a top menu under 1024px), and the ground strip.
- Added `design-system/VERSION`, `design-system/components.md`, and `AGENTS.md` / `CLAUDE.md` pointing to them.

**What I couldn't apply**
- One commit per screen (no git access).
- The header nav and the under-1024px "menu button opening a menu window": I kept the existing sidebar nav, which becomes a two-column top menu on small screens.
- Real settings groups and a danger zone: the Settings page has no settings content, so I didn't invent any.

**Decisions I made**
- **Gold button:** the header Search button is the one gold button on every screen, since it's the app's only form submit. Page actions, including "Go to overview" on the error page, are framed buttons with the marker instead of a gold "Retry".
- **KPI meters:** the data has no targets, so each meter is worked out from the value and its stated change. For example, incidents show "3 of 5 open on Monday" and lead time shows "2.4 of 3.0 days last month". All four changes are marked as improvements, shown in the success colour.
- **Added to the data and UI:**
  - Dates now read YYYY.MM.DD.
  - Nav items show counts.
  - A meter sits next to "Showing n of 8 projects".
  - Pressing "/" focuses search, to back the keyboard hint.
- **Table rows:** the marker appears in the left gutter on hover or focus, because rows can't be selected.
- **Header layout:** the gold Search button is 40px tall to line up with the input; the spec says 48px. Under 600px the header wraps to two rows and stops being sticky.
- **Two-frame fan:** I used my own frame-B keyframe, so the still frame shows one fan frame instead of both on top of each other.
- **Error page heading:** the 32px h1 on the error and project-not-found screens sits inside a window. That bends the "no 32px title inside a panel" rule, but each screen still has its one h1.
- **Mobile tables:** they keep a 560px minimum width and scroll inside their own wrapper.