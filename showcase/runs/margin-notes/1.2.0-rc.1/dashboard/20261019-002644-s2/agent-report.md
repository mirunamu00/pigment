Every screen is restyled to margin-notes@1.2.0-rc.1. The build passes, all 10 smoke tests pass, and no page scrolls sideways. I checked the screenshots at 1440px and 390px, light and dark, for Overview, Projects, Project detail (all three tabs), Team, Settings and both not-found pages. I also captured the mobile menu sheet and the open user menu. One problem turned up there ("Sign out" had lost its padding); I fixed it and removed the temporary review hooks.

**What changed**
- **Tokens:** `design-system/tokens.css` is a copy of the package file, imported first. The old variable names (`--color-primary`, `--color-bg`, …) still work as aliases at the top of `src/styles/base.css`, which is rewritten on the tokens. Light and dark both come from the tokens.
- **Fonts:** Geist, Geist Mono, Instrument Serif italic and Caveat load from Google Fonts with `display=swap`. These are the families the spec lists.
- **Header:** one 72px header (60px on mobile) on the same container as the page, so content starts at 40px at 1440 wide. Under 860px the nav and global search move into a menu sheet with a 44px menu button; Escape closes it.
- **Studio pieces** (`src/components/studio.tsx`), each reusable:
  - the shared watercolor filters;
  - the bloom, behind the page header on Overview, Projects and Team, and the smaller empty-state version on not-found pages;
  - tape and pencil notes: a note beside the lead on those three pages, plus tape and a note on the button for not-found pages;
  - the serif word with its swash.

  The decorations are static, as the spec requires; only overlays and spinners animate.
- **Components:**
  - stat cards with mono eyebrows;
  - a rebuilt bar chart: bars 28px or narrower, the current month in full ink, the other months faded;
  - a segmented status filter;
  - status badges with a dot;
  - the spec's checkbox on tasks, spec rows on the project overview, and ink-underline tabs.
- **Tables:** fixed column widths, mono numbers and dates. On mobile the projects table stacks into one block per row, with sort chips because the column headers are hidden there. The team and files tables scroll sideways inside the card with a fade and a "Scroll sideways" hint.
- **Motion:** every transition and animation stops under `prefers-reduced-motion: reduce`.
- **Docs:** added `design-system/VERSION`, `design-system/components.md` (conventions and where each decoration goes), and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but `git` isn't among the commands I'm allowed to run. All changes are uncommitted on `main`.
- **No serif word on any screen:** the spec only allows it in an h1 of two or more words, and every h1 is one word ("Overview", "Projects", "Team"). Changing those headings would change label text, so the piece is built but unused.
- **Status filter keeps its accessibility attributes:** it stays a group of `aria-pressed` buttons rather than becoming the spec's `radiogroup`.
- **No tape on Overview:** nothing on the screen is pinned or featured, and the spec keeps these marks out of data.
- **No toast or mobile action bar:** the app has no saves or primary actions that would need them.
- **Leftover screenshots:** `.snaps/` still holds my temporary `review-*` and `*-tasks-*` images. Deleting files isn't among my allowed commands, so you may want to remove them.

**Decisions I made**
- **Layout structure:** the sidebar became header navigation, because the spec says sidebars start at 6 sections and this app has 4. That meant moving the nav into the header (the `<aside>` is gone). Every test id, `aria-label` and `NavLink` is kept.
- **Projects page heading:** the "All projects" table heading repeated the h1, which the spec forbids. It's now visually hidden through a new `headingHidden` prop, and stays available to screen readers.
- **Status colors:** active is the success tone, paused is the warning tone, done is neutral.
- **Settings placeholder:** a raised empty-state panel with no decorations, since the spec rules out decorations on settings screens.
- **Pencil note wording:** "all teams, October", "the full list", "everyone, every discipline", "back to the overview" and "back to the list". Each restates text already on the page.
- **Small additions:**
  - the moving project status badge sits inline after the h1;
  - the Refresh button gets a spinner and `aria-busy` while loading, with a minimum width so it doesn't jump;
  - mono number and date spans inside some cells;
  - `role` and `data-label` attributes on the projects table for the stacked layout.
- **Raw pixel values:** column widths and a few sizes the spec states in pixels (the h1 clamp minimums, the 14px spinner, the 22px badge) use raw values rather than tokens.