I restyled the Field Notes blog with margin-notes@1.2.0-rc.1, following the spec's "Existing project" section. The build and typecheck pass, all 9 smoke tests pass, and the final screenshots of every route at 1440px and 390px, light and dark, show nothing scrolling sideways. Nothing is committed: git isn't among the commands I was allowed to run, so the spec's one-commit-per-screen step is left to you. All changes are in the working tree on `main`.

**What I changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. `base.css` is rewritten to use only the design tokens, with the old variable names pointed at the new ones. Fonts are served from the app itself through four `@fontsource` packages, so they never depend on a network request (which could break the no-console-errors test). Dark mode follows the system setting.
- **Reusable studio pieces**, each built to its recipe: the shared filters (rendered once in `Layout`), `Bloom` (page-header and empty-state versions), `Tape`, `PencilNote` and `SerifWord` (with the swash), plus `PageEmptyState`, outline icons and two small hooks.
- **Home:** the bloom sits behind the header. "Field *Notes*" carries the serif word and swash, and a pencil note sits beside the lead ("build, write, collaborate"). The featured post is the pinned card with two tape strips. Search is a 40px field; the tag filters are chips that invert to ink when selected and, on mobile, scroll in their own strip with faded edges. Posts are linked cards in a 12/8/4-column grid. The empty search result is a plain card with no decoration.
- **Article:** the title sits at the article size with its last word in serif, and the blockquote is the one serif pull-quote. The table of contents is a sticky right rail from 1200px; below that it's a closed "On this page" disclosure. The image placeholder is a hatched tray with a centred 20px icon, and code blocks are on the dark code background.
- **About:** serif word in the title, prose at reading width, author cards in a grid.
- **Not found** (both the unknown route and a missing post): a pinned panel with tape, the empty-state bloom, and a note on the button.
- **Newsletter:** a danger border, alert icon and message on error, with focus moving to the field. Success shows a success badge with a check.
- **Docs:** `design-system/` (version, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**What I couldn't apply**
- **Commits:** see above; nothing is committed.
- **Studio-mark motion:** the spec says studio marks are "static", so the bloom, tape, notes and swash don't animate. The motion the spec does define (colour changes on hover and focus) works and drops to 0ms under `prefers-reduced-motion: reduce`.
- **Update date:** the spec gives none, so `design-system/VERSION` records the version and today's date as the date applied.
- **Danger callout at the form top:** I left this out because the newsletter form has a single field, and the callout would repeat its own error alert.

**Decisions I made**
- I treated the article and About titles as editorial titles, so each gets a serif word. Only the home title gets the swash.
- The featured card spans 8 of 12 columns, and its title uses the h2 size (26px) because no card-title size suited a featured post.
- The success message is a badge with no toast, since the spec accepts either.
- The table of contents is rendered in one place at a time, chosen by screen width, so the tests' single `toc` element still holds.
- The nested icon inside the image placeholder is marked `aria-hidden`; without that the test found two images in the figure.
- On mobile, the header links keep their 32px boxes but reach the 44px touch target through an invisible hit area.
- The not-found link is styled as a secondary button.