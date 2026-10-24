I've restyled every screen to margin-notes@0.1.0-rc.1, but **none of it has been built, tested or committed**. This session wasn't allowed to run `npm install`, `npm run build` or `git commit`. I checked the TypeScript by reading it, not by compiling. Before you rely on this, run `npm install && npm run build && npm run test:e2e`.

## What I changed
- **Foundation:** copied `tokens.css` unchanged into `src/styles/tokens.css` and load it before `base.css`. Fonts (Geist, Geist Mono, Instrument Serif italic) load from Google Fonts in `index.html`. The shared watercolor filter is drawn once in `Layout`, and a new `src/components/StudioDetails.tsx` holds the bloom and tape pieces.
- **`base.css`:** rewritten to use only semantic tokens. Light and dark both work: dark follows the OS, and setting `data-theme` on the root forces either one. Reduced motion turns off the menu animation. Old variable names still work where they could point at a token.
- **Shell:** the sidebar is styled as the spec's sidebar. The top bar is 72px with a hairline. The user button is a ghost button, and the user menu is a raised sheet that fades in. Under 860px the user's name is visually hidden but still read by screen readers.
- **Overview:** the title "Overview" is the one serif italic word, with the watercolor wash behind the header. KPI cards sit on a hairline, the chart uses ink bars with mono labels, and the activity list uses hairline rows.
- **Projects table (Overview and Projects):** filters are a segmented control and the table has a hairline frame. Money and dates are mono and right-aligned, and the sort arrows are now outline chevrons. When nothing matches, the empty state has no decoration.
- **Project detail:** tabs use a 2px ink underline, the overview shows key/value rows, the checkboxes and progress bar are restyled, and the files table is framed.
- **Team:** framed table, mono right-aligned numbers.
- **Settings / not-found pages:** centred lifted empty-state panels with the wash behind them. The not-found pages also get one tape strip; Settings gets none, as the spec says.
- I added `design-system/` (`VERSION`, tokens, `components.md` listing conventions and where decorations are allowed), plus the one-line pointer in new `AGENTS.md` and `CLAUDE.md` files.
- Every route, label, `data-testid` and accessibility attribute is unchanged. I only changed classes and added `aria-hidden` decoration. The Overview heading's accessible name is still "Overview".

## What I couldn't apply
- **One commit per screen:** not done, since commits were blocked. Everything is in the working tree, uncommitted.
- **Build, tests, and checks at 1440/390px in light and dark:** not run.
- **Font-loading risk:** loading fonts from Google needs network at runtime. If the smoke-test machine is offline, the failed font request may log a console error. That would fail the "no console errors" test. The fix would be to self-host the font files, which needs a package install.
- **Mobile bottom action bar and nav menu sheet:** the mobile action bar isn't needed because the app has no primary action, and I didn't build the mobile menu sheet.
- **Tape on pinned cards:** the app has no pinning, so there are none.
- **Pencil notes:** not used, so the Caveat font isn't loaded.

## Decisions I made myself
These are also recorded in `components.md`.
- I kept the existing sidebar instead of switching to header navigation. The spec suggests a sidebar only from 6 sections and the app has 4. Under 860px it becomes a horizontally scrolling row.
- There is no ink primary button anywhere: every existing action is search, navigation or a reset, so they are all secondary buttons.
- KPI trend lines are neutral text with ↑/↓ arrows, not green or red. The spec keeps status colours for badges and callouts.
- Status badges: Active is success, Paused is warning, Done is neutral.
- The table's search input is 40px tall rather than the toolbar's 32px, so it lines up with the filter control.
- Empty-state titles keep their heading level but use the smaller empty-state title size.
- File names are set in mono.
- Two old spacing and heading-size variables had the same names as tokens with different values, so I renamed their uses instead of aliasing them.
- There is no theme toggle in the UI.