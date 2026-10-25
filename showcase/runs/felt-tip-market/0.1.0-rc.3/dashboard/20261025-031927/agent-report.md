Felt-tip Market is now applied to every screen. The build passes, all 10 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no page scrolling sideways. Every route, label, form field, `data-testid` and accessibility attribute is unchanged. Nothing under `design-packages/` or `tests/` was touched.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css` (checked with `diff`). `base.css` keeps the app's old variable names working by pointing them at the new tokens. Dark mode follows the system setting, and `data-theme` on `<html>` can force light or dark. The two fonts (Space Grotesk and JetBrains Mono) are bundled with the app through `@fontsource` packages rather than loaded from the internet, so the "no console errors" test can't fail offline. These are font files only, not UI libraries.
- **Reusable pieces:**
  - `src/components/Felt.tsx`: the header band, the stacked-plates main button, the notched price flag, and the full-screen error band, plus the map of areas to band colors.
  - `src/components/stickers/Sticker.tsx`: seven thick stickers (parcel, ticket, folder, ID badge, cog, magnifier lens, disc), plus the "done" word badge, the rocking loading sticker and the small rocking button glyph.
  - CSS for the lift-and-slam hover, pills, status pills, dashed empty boxes, split bands, image placeholders and the black footer.
- **Area colors:** Overview is lemon (parcel sticker), Projects is periwinkle (ticket on the list, folder on a project), Team is teal (ID badge), Settings is marigold with a quiet band and no sticker.
- **Screens:**
  - **Overview:** stat tiles with 48px numbers and dot legends; the chart has grey bars with black top edges and a pink line; recent activity is a ruled list; the projects table is framed in ink with a pink price flag on each budget.
  - **Project detail:** breadcrumb, title and pill tabs sit in the band; the budget gets a flag; checkboxes are pink with a black check; a "done" badge appears when every task is complete.
  - **Team:** a flag on each person's active-project count.
  - **Settings and the no-results state:** a dashed empty box with a sticker and a stacked-plates button.
  - **404 and unknown project:** a full-screen band with two stickers.
  - **Everywhere:** a black footer on every page.
- All movement stops under reduced motion.
- I added `design-system/` (`VERSION`, `components.md`) and `AGENTS.md` / `CLAUDE.md` with the one-line pointer. I added a temporary page to check the stickers on their own, then deleted it.

**Not applied**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Footer input:** the footer has no input with the pink arrow button. The app has no feature for it, and on Overview it would be a fourth pink element (the spec allows three).
- **Overview headline flag:** the spec wants a flag on the dashboard's headline money figure, but none of the stat tiles is money. The flags are on the table budgets instead.
- **Settings page:** it stays a "coming soon" placeholder rather than getting invented option cards and switches.
- **Unused pieces:** the full-screen loading sticker and the image placeholder styles are built but not used, because no screen needs them. Refreshing the stat tiles uses dashed placeholder boxes and a visible "Loading" label instead.
- **Stray pixel values:** a few small sizes such as the 720px error-text width and 240px progress bar aren't tokens.

**Decisions I made**
- I kept the existing left sidebar. Below 1024px it turns into a scrolling row of pills rather than the spec's menu button and full-screen panel, so navigation behaves the same as before.
- The chart's pink line is a 3-month running average of the same deployment numbers, because the spec wants a line over the bars and the data has only one series.
- To stay within the pink limit, the stacked-plates button is white on the Overview and Projects empty states and pink only on Settings and the error pages.
- The user menu is a full-height block at the right of the top bar. Its name is hidden on phones but still read by screen readers.
- On phones, tables scroll inside their frame with the first column fixed in place.
- I added `tabIndex` and a label to each table's scroll container so keyboard users can scroll it.