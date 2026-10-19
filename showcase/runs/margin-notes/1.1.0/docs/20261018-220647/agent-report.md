The docs site is now restyled with Margin Notes 1.1.0. The build and typecheck pass, all 16 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) reports no page scrolling sideways. I checked every PNG against the spec and fixed what was off: table columns that wrapped mid-word, uneven spacing between changelog releases, too much space under the home header, and a clipped focus ring in the mobile menu.

**What changed**
- **Tokens and setup:** `design-system/tokens.css` is an unedited copy of the package file, and `src/styles/base.css` is rebuilt on top of it. Old variable names point at the new tokens, except the old `--space-*` names, which clashed with the new spacing scale and were dropped. Fonts load from Google Fonts in `index.html`. Light and dark follow the system setting through the tokens. Motion stops under `prefers-reduced-motion`.
- **Reusable pieces** in `src/components/studio/`: `StudioFilters` (the shared SVG filters, mounted once), `Bloom` (header band and empty-state versions), `Tape`, `PencilNote` (beside and below) and `SerifWord` (with the painted underline). Also a 1.5px outline icon set (`Icon.tsx`) and an `EmptyPanel` component.
- **Shell:** a 1360px container with 40px / 16px gutters, so content starts at 40px. Header links are padded boxes and the search field is 32px tall. The sidebar is 220px with mono group labels and a chevron. Under 860px the sidebar becomes a menu sheet below the header that rises and fades in. It also carries copies of the Changelog and Repository links (without test ids), since the header hides them.
- **Home:** watercolor bloom behind the header, one serif word with its underline ("documentation"), linked section cards that ring on hover and show focus on the card, and the quick-start card pinned with tape and a pencil note ("start here").
- **Article and reference pages:** article-size h1, prose spacing per the spec, dark code blocks, callouts with a 3px bar and icon, underline tabs, and parameter tables that scroll inside a labeled region with an edge fade and a "Scroll sideways" hint. The table of contents is a right rail from 1200px and a closed "On this page" disclosure below that. The pager uses linked cards, and the feedback thank-you is a success badge with a check.
- **Changelog:** a pencil note on the lead ("latest at the top"), the latest release as a pinned card with tape, and Added / Fixed / Changed badges with a dot (green, blue and neutral).
- **404 and missing doc page:** an empty-state panel with tape, the small bloom, and a pencil note on the button.
- **Docs:** `design-system/` now has `VERSION`, the tokens and `components.md`, and `AGENTS.md` and `CLAUDE.md` contain the pointer line.

**Could not apply**
- **One commit per screen:** git wasn't in the commands I was allowed to run, so everything is uncommitted in the working tree.
- **Search inside the mobile menu sheet:** the search box stays in the mobile header row, so nothing sits between the header and the h1, and the harness can still fill it on mobile.
- **`tokens.json` copy:** it isn't in `design-system/` because I couldn't run a copy command and the app doesn't use it. `components.md` points to the package's copy.
- **`VERSION`:** it says `margin-notes@1.1.0`; the spec's example says 1.0.0, which looks like a typo.

**Decisions I made**
- **Treated the docs site like the spec's Blog app:** it isn't one of the four app types the spec lists. The home header gets the bloom, the serif word and the underline. Article titles get no serif word.
- **Sidebar note:** like the spec's Settings app, there is a note below the section nav reading "all the docs", shown from 1200px.
- **Changelog bloom:** none, because it would have sat behind the contents rail.
- **No panel title in the empty state:** it would have repeated the h1 "Page not found".
- **No toast for the feedback buttons:** the in-place success badge is the confirmation, which the spec's checklist accepts.
- **Small additions where the spec is silent:** the styling for keyboard keys, numbered steps and the pager, plus 8px vertical padding in table cells so wrapped descriptions don't touch the row lines.
- **Fonts and offline runs:** the fonts come from fonts.googleapis.com. If the tests ever run without internet, the "no console errors" test may fail on the font request.

The temporary `?menu` hook I added to screenshot the open menu sheet has been removed.