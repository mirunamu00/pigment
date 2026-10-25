Felt-tip Market 0.1.0-rc.1 is now applied to every screen: Overview, Projects, Project detail, Team, Settings, the 404 page and the "project not found" page. The build passes, all 10 smoke tests pass, and the final screenshot run reports no sideways scrolling at 1440px or 390px, in light or dark. I looked at every screenshot. I also checked the empty filter, loading tiles, open user menu, task list and mobile file list on a temporary route, and measured headings, flags and buttons against the spec's numbers.

**What changed**
- **Tokens:** `design-system/tokens.css` is a verbatim copy of the package's `tokens.css` and loads first. The old variable names in `src/styles/base.css` still work; they now point at the new tokens. No raw colors, sizes or radii were added.
- **Fonts:** Space Grotesk (400–700) and JetBrains Mono (400) load from Google Fonts in `index.html`, with the spec's fallbacks.
- **Signature elements, built as reusable pieces:**
  - **Lift and slam:** every button and the user-menu block rises on a hard shadow on hover and drops flat on press.
  - **Plate stack:** one per screen, on Settings and the two error pages.
  - **Header bands:** each area has its own color: Overview lemon, Projects periwinkle, Team teal, Settings marigold. A black footer is on every page.
  - **Ink frames and pills:** white boxes with 1px ink borders and dashed empty boxes. The current nav item is a filled pill; tabs and status filters are outline pills.
  - **Price flag:** on every budget cell and on the project's budget figure.
  - **Stickers:** six original drawings (parcel, task token, runbook slip, key, folder, calendar page), plus a "done" word badge and a small rocking glyph for loading.
- **Screen by screen:**
  - **Overview:** stat tiles with 48px numbers and dot legends, a parcel sticker in the header band, and grey bars with a pink line in the chart. Refresh shows dashed placeholders with visible "Loading" text.
  - **Tables:** ink frame and paper header row. On mobile they scroll inside their frame with the first column pinned, and the 3-column files table becomes a ruled list of label–value rows.
  - **Settings:** a dashed empty state with the key sticker.
  - **Error pages:** a full-height color band with two tilted stickers.
- **Dark mode and reduced motion:** dark mode follows the system setting and changes only the chrome; bands, stickers and flags stay the same. Sticker drift, the rocking glyph and the menu drop-in all stop under reduced motion, and hover lifts swap in instantly.
- **Preserved:** all routes, labels, form fields, `data-testid`s and ARIA attributes. I only added attributes: `aria-busy` on Refresh, `data-label` on file cells, and labelled scroll regions on the tables.
- **Docs:** `design-system/` (`VERSION`, `tokens.css`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so all changes are uncommitted.
- **Leftover file to delete:** `src/pages/PreviewPage.tsx`. It held the temporary preview route. The route is gone, but I couldn't run `rm`, so the file is now an empty stub that nothing imports.
- **Settings has nothing to restyle:** the page is only a "coming soon" placeholder, so there are no option cards, switches or section links.
- **No `tokens.json` copy:** `design-system/` has `tokens.css` only; the JSON is still in the package folder.
- **Overview has no money figure:** its flag sits on the budget column of the projects table instead.

**Decisions I made myself** (also recorded in `design-system/components.md`)
- **Sidebar kept:** I kept the existing sidebar rather than switching to a top bar. Below 1024px it becomes a brand row plus a scrolling row of nav pills, instead of a menu-button panel.
- **Footer without input:** it has a headline and link columns but no email input with a pink arrow. That would have been a form with nothing behind it, and it would push Overview past the limit of three pink roles.
- **Chart line:** the data has only one series, so the pink line is a computed 3-month average of deployments.
- **The "done" badge** appears in the Tasks tab once every task is checked.
- **Colors and shapes:** the 404 page uses lemon. The dot colors for stat tiles and statuses are my choice, and initials avatars are square with 4px corners.