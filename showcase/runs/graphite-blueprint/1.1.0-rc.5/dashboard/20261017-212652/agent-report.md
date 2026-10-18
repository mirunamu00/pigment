Graphite Blueprint 1.1.0-rc.5 is applied to every screen, in light and dark. The build passes, all 9 smoke tests pass, and the final snapshot run reports no sideways scroll at 1440px or 390px. I compared the screenshots of every screen, plus Settings and the 404 page, with the spec and fixed what was off.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied as-is into `design-system/tokens.css` and loaded first. Light and dark follow the device setting, since the app has no theme switch. The old variable names now point at the new tokens. Inter (variable, so the 510 and 590 weights are exact) and Geist Mono are self-hosted from npm; I added `@fontsource-variable/inter` and `@fontsource/geist-mono` to `package.json` and ran `npm install`. There is no font CDN and no UI library.
- **Signature pieces** are in `src/components/signature/`, built to the spec's recipes: stage, dot glyph and dot meter, blueprint (stack, linked pair, and a broken pair for errors), spec plate, the live pieces (shimmer, live edge, pulse, caret), and the screen and section heads. Their CSS is in `src/styles/signature.css`, along with a global block that stops all motion under reduced-motion.
- **Screens:**
  - **App frame:** a sidebar with mono group label and icon rows, which turns into wrapping text pills under 1024px. The top bar is sticky and blurred, with a pill search box and a popover user menu.
  - **Overview:** KPI cards with a status dot. The bar chart is redrawn as dot columns on a quiet stage, at true pixel size, with October highlighted. It sits level with the activity list.
  - **Tables (projects, team, files):** hairline style with mono headings and status icons. On phones only the first column and one pinned column show. The Team page shows a dot meter beside each person's project count.
  - **Project detail:** the project's spec figure sits on a quiet stage, with numbered detail rows, text tabs with a sliding indicator, and accent checkboxes.
  - **Settings, 404 and missing project:** Settings shows an empty state with a stacked blueprint. The two error pages show a blueprint whose connector breaks off at a red point.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and one-line `AGENTS.md` and `CLAUDE.md` pointing to `design-system/`.

Every route, `data-testid`, ARIA attribute, form field and label text is preserved. The temporary review code I added to Settings to look at the pieces on their own has been removed.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but only the five listed commands were allowed, so all changes are uncommitted.
- **Live pieces are built but not placed:** the app has no running jobs, streaming data or system status. The spec allows these only while work really runs, so I checked them on the temporary review page only.
- **No landing-page elements:** there is no landing page, so the lit stage, content openers, the three-blueprint row and the closing statement have nowhere to go.
- **Blueprint widths were not measured:** the spec asks for `getBoundingClientRect` measurements. I could only check by eye that each drawing fills its svg.
- **Interactive states weren't screenshotted:** the snapshot tool can't click, so the Tasks and Files tabs, the user menu and the empty filter are covered by the tests but not by screenshots.

**Decisions I made**
- **Data:** I added a `sentiment` field to the KPI data so the dot is green for good news; a falling incident count is good, not red.
- **Loading glyph:** pages now load on demand, which gives the loading glyph an honest use. It appears only if loading takes over 300ms.
- **Column order:** Status moved to the last column of the projects table, and Size to the last column of the files table, so they can be the pinned column on phones.
- **Status icons:** Active shows the "in progress" icon (half ring, yellow); Paused shows a grey ring with two bars.
- **Smaller choices:**
  - The avatar in the user-menu button is 20px; the spec only gives 16px and 32px sizes.
  - Major sections are 24px apart.
  - The Team heading shows "Active projects", and the short "PROJECTS" on phones.
  - The 404 page got a second pill, "View projects".
  - Each screen got a mono label of my choosing: DASHBOARD, PORTFOLIO, PEOPLE, WORKSPACE, PROJECT 01.
- **Name clash:** the old `--space-1…8` variables clashed with the new token names, so I retired them.