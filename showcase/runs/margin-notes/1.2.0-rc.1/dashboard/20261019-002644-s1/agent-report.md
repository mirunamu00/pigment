I've applied Margin Notes to every screen. The build passes, all 10 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scrolling. Every route, label, form field, `data-testid` and ARIA attribute is unchanged.

**What changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. `src/styles/base.css` is rewritten to use only tokens, and the old variable names are aliased at its top.
- **Fonts:** Geist, Geist Mono, Instrument Serif italic and Caveat, in the weights the spec lists. I added the four `@fontsource/*` packages to `package.json` so the fonts are served with the app instead of from a font CDN. That avoids a failed font request showing up as a console error in the smoke tests.
- **Signature elements:** bloom, tape, pencil note and serif word with its swash are built to their recipes in `src/components/Studio.tsx`. The shared filter SVG renders once at the app root.
  - **Overview, Projects, Team:** a bloom behind the page header and a pencil note on the lead.
  - **Not-found and project-not-found:** the page-level empty state, with its own bloom, one tape strip, the pinned card style and a note on the button.
  - **Project detail and Settings:** none, as the spec requires.
  - I checked the swash, a two-strip taped card and the note up close on a temporary page, then removed its route.
- **Motion:** the menu fade-and-rise, the loading spinner and colour transitions all drop to 0ms under `prefers-reduced-motion: reduce`. The studio elements themselves are static, as the spec says.
- **Navigation:** the sidebar became a header nav, since the spec only allows a sidebar from 6 sections. On mobile it's a 44px menu button that opens a sheet with search first.
- **Components:**
  - Status pills became status badges with a dot and the word.
  - The chart has 28px bars with rounded tops, the current month in full ink and at most 3 gridlines. It now draws at real pixel width so its labels stay readable on phones.
  - The projects table stacks into blocks on mobile, with sort chips since the column headers are hidden there.
  - The team and files tables scroll sideways inside their card, with a "Scroll sideways" hint.
  - Refresh shows a spinner and keeps its width while loading.
- **Docs:** `design-system/VERSION` and `components.md` (conventions and where each studio element goes on each screen), plus the pointer line in new `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **Serif word and swash:** not used on any screen. They need a page title of two or more words on a home or list screen, and Overview, Projects and Team are one word each. The piece is built and was checked on the temporary page.
- **Toast, success badge, mobile action bar and dialog:** the app has no saves, primary actions or dialogs to use them on.
- **Commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted.
- **`src/pages/StudioPreview.tsx`:** left behind as an empty, unused file because I couldn't delete files. Please remove it.
- **`tokens.json`:** not copied into `design-system/`; it stays in the package.

**Decisions I made**
- **Status filter:** kept as toggle buttons rather than the radio group the spec describes, because the tests check `aria-pressed`.
- **Projects page table title:** "All projects" is hidden visually but still read by screen readers, so it doesn't repeat the page title. The result count serves as the visible title.
- **Badge tones:** Active is green (success), Paused is amber (warning), Done is neutral grey.
- **Note gap:** the pencil-note offset is 6px instead of the recipe's 12px, so the arrow tip lands 9px from its target, within the spec's 6–12px.
- **Filter input height:** 40px rather than the 32px toolbar size, to line up with the 40px status filter beside it.
- **Spacing:** dashboard blocks sit 32px apart (the spec's "dense data" spacing). The empty-state heading is styled at the smaller empty-state title size even though it's the page's h1.
- **Note wording** (two to four words restating the lead):
  - Overview: "every team's health"
  - Projects: "all of it, tracked"
  - Team: "the whole team"
  - Not-found page button: "back to the start"
  - Project-not-found button: "back to the list"