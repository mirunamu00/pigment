The Felt-tip Market design system is now applied to every screen. The build passes, all 10 smoke tests pass, and the final screenshot run (all pages plus Settings, 404 and missing project, at 1440 and 390, light and dark) reports no sideways scroll.

**What changed**
- **Tokens:** `design-system/tokens.css` is a verbatim copy of the package file and loads first. The old variable names in `src/styles/base.css` still work; they now point at the new tokens. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`. Light and dark follow the system setting, and `data-theme` on the page root can force either.
- **Signature elements**, built as reusable pieces:
  - `src/styles/felt-tip.css` has the classes for every signature element: lift-and-slam, plate stack, bands, ink frames and pills, dashed empty box, price flag, and sticker drift and rocking. All motion stops under reduced motion.
  - `src/components/ft/` has the `HeaderBand`, `Plates`, `PriceFlag` and `ErrorBand` components.
  - The sticker kit has six original drawings: parcel, calendar page, paper slip, folder, key and disc token. It also has a "done" word badge and a 16px rocking loading glyph.
- **Screens:**
  - **Layout:** pill sidebar (a scrolling pill row on phones), white top bar with the user menu as a full-height block that lifts, and a black footer on every page.
  - **Overview:** lemon band with one parcel sticker; stat tiles with 48px numbers, dot legends and a flag on the deployments figure; grey bars with ink caps under a pink line; ruled activity list; ink-framed table with a flag in each budget cell.
  - **Projects:** periwinkle band.
  - **Project detail:** periwinkle band with breadcrumb and pill tabs, a flag on the budget, and a ruled task list with pink checkboxes. Reaching all tasks done shows the "done" badge.
  - **Team:** teal band and a framed table.
  - **Settings:** marigold band and a dashed empty state with a key sticker and the plate-stack button.
  - **404 and missing project:** full-height band, two stickers, plate-stack recovery link.
- **Docs:** `design-system/` holds `VERSION`, the tokens and `components.md` (area-to-band map, sticker subjects, where each element is used). `AGENTS.md` and `CLAUDE.md` have the one-line pointer.

All routes, labels, `data-testid`s and accessibility attributes are kept. Additions: the footer "Jump to a project" search, the Refresh button's `aria-busy` while loading, and scrollable table frames that are focusable and labelled.

**What I could not apply**
- **No commits:** git isn't in the commands I was allowed to run, so all changes are uncommitted rather than one commit per screen.
- **Stray file to delete:** I accidentally created `scratch-overview-tail.txt` in the project root. I couldn't delete it with the allowed commands, so please remove it.
- **Settings:** the page is a "coming soon" placeholder, so I gave it the empty-state treatment instead of inventing settings links, option cards and switches.
- **Unused components:** switch, select menu, dialog, toast and split band aren't built, because nothing in the app uses them yet.

**Decisions I made myself**
- **Area colours:** Overview lemon, Projects periwinkle, Team teal, Settings marigold. The 404 page also uses marigold.
- **Footer arrow button is white, not pink:** with the focus halo, the flag and the chart line, a pink one would make four pink roles on Overview, over the limit of three.
- **Dark mode on bands:** inside bands, lines, focus ring and lift shadow are pinned to ink, so bands look the same as in light mode.
- **Chart line:** the pink line is a 3-month running average of the deployment counts, since the data has only one series.
- **Flags:** the Overview flag sits on "+12% vs last month" (the stat tile number stays 48px). Team gets a flag on "Active projects" so its table also has one.
- **Kept layout:** the sidebar stays, which the spec allows as a variant. Table sort headers stay flat with no lift. Status dots are teal for active, marigold for paused and periwinkle for done.