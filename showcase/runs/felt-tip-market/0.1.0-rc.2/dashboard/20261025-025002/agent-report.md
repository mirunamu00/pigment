Felt-tip Market is applied to every screen. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I went through the screenshots of every page, plus 404, unknown-project, Settings and the empty search results, and fixed what was off before the final run.

**What changed**
- **Tokens:** `src/styles/tokens.css` is a copy of the package's token file, so light and dark both follow the system setting. The app's old variable names still work as aliases at the top of `src/styles/base.css`. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - `src/styles/felt-tip.css` holds the lift-and-slam hover, plate stack, buttons, bands with the header-band sticker spot, ink boxes, ruled lists, pills, dashed empty and loading boxes, price flag and status pill.
  - `src/components/ft.tsx` has `PlateStack`, `Flag` and `HeaderBand`; there are also `ErrorBand` and `Footer` components.
  - `src/components/stickers/Stickers.tsx` has eight original stickers: parcel, clipboard, ID badge, lens, key, paper slip, disc token and a "done" word badge, plus a small rocking loading glyph.
  - All motion stops under reduced motion.
- **Each area gets its own band colour:** Overview lemon, Projects periwinkle, Team teal, Settings marigold.
- **Screens:**
  - **Overview:** stat tiles with 48px numbers and dot legends; the chart is grey bars under a pink line.
  - **Tables:** framed, with a paper header row and ink rules. Budgets show in the price flag; the "no results" state has the lens sticker and a plate-stack "Clear filters" button.
  - **Project detail:** breadcrumb and pill tabs sit in the band. The task checkboxes are restyled, and a "done" badge appears when every task is complete.
  - **Team:** the active-project count shows in a flag.
  - **Settings:** the key sticker sits in its empty state.
  - **404 and unknown project:** full-height error band with two stickers.
  - **Every page:** a black footer.
- **Docs:** the `design-system/` folder (`VERSION`, `components.md`, tokens pointer), plus `AGENTS.md` and `CLAUDE.md` with the one-line pointer.

All routes, labels, form fields, test ids and accessibility attributes are unchanged.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't on the list of commands I was allowed to run, so everything is uncommitted.
- **Leftover stub file:** I couldn't delete files either. The temporary sticker review route is removed, but `src/pages/StickerSheet.tsx` remains as a harmless stub you can delete.
- **Footer:** it has no email input or pink arrow button. A dashboard has no use for them, and they would push Overview past the three-pink-roles limit.
- **No headline money flag on Overview:** the spec puts one on a dashboard's headline money figure, but none of the four stats is money. The budget flags in the table cover it.
- **Interaction states not screenshotted:** the snapshot tool can't capture states that need clicking or hovering, like the open user menu or the Refresh loading state. I checked those against the code and the passing tests instead.

**Decisions I made myself**
- Overview is styled as a dashboard with a header band, not a marketing front page with a hero.
- The Projects and Team index pages count as their areas' overviews, so they also get a header sticker. Settings has a plain band with no sticker.
- The pink line in the chart is a 3-month average calculated from the existing bars, so no data was made up.
- Missing avatars show initials in a dashed box instead of a grey circle.
- Plate-stack buttons use the outline style so they keep a visible border in dark mode.
- On phones the header sticker is 96px and about 65% visible. The sidebar becomes a row of pills, and the Files table becomes label–value rows.
- The 404 band is marigold; an unknown project uses periwinkle, the Projects colour.