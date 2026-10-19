Hardlift is applied to every screen: Overview, Projects, Project detail, Team, Settings, Not found and Project not found, in light and dark. The build passes, all 10 smoke tests pass, and the snap tool reports no page that scrolls sideways at 390px. I checked the screenshots of every page (plus the empty-search state) at 1440px and 390px in both themes, then fixed what was wrong: the controls were twice the intended size, and the chart labels crowded the axis on phones.

**What changed**
- **Tokens**: copied into `design-system/tokens.css` and `tokens.json` and loaded first. They follow the system's light/dark setting and also support `data-theme`. The old variable names in `base.css` still work as aliases.
- **Font**: DM Sans loads from Google Fonts, with the specified fallbacks.
- **Reusable signature pieces**:
  - Lift buttons and linked cards (`src/styles/hardlift.css`).
  - The color band (`Band.tsx`): one color per section. Overview is teal, Projects and project detail yellow, Team periwinkle, Settings lime, and the error pages red.
  - Pills for navigation, filters and tabs.
  - Six original stickers, each used in one place only, plus a turning-coin loader (`Sticker.tsx`).
  - Outline icons, and a status badge with icon plus word.
- **Screens**:
  - The sidebar navigation is pills; on phones it becomes a scrolling strip.
  - The header is 80px, with the search field and an ink Search button joined.
  - Stat cards are outlined, and the chart is in ink.
  - Tables sit in one bordered box with a sticky header; on phones each row becomes a stacked block.
  - The task checkboxes are custom, filled with ink when ticked.
  - Empty and error states have a sticker and a single pink button.
  - The refresh skeletons are replaced by the coin plus "Loading...".
- **Motion**: all of it stops under reduced motion.
- **Kept intact**: every route, label, `data-testid` and `aria-*` attribute.
- **Docs**: `design-system/VERSION`, `components.md`, and the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **No commits.** Committing wasn't in the commands I was allowed to run, so there is no "one commit per screen" and the changes are uncommitted.
- **Copies written by hand.** Copying wasn't allowed either, so I wrote the token files out by hand from the originals. They are meant to be identical, but I couldn't diff them.
- **Nothing to apply some elements to.** The dashboard has no time-range control or icon buttons, Settings has no sub-sections or save row, and there are no toasts or dialogs, so those elements are absent. I didn't invent features.
- **No date in VERSION.** The spec gives no update date, so `VERSION` records only the version.
- **States not captured.** The snap tool doesn't capture states such as hover, the open user menu or loading. Those were checked by the smoke tests and by reading the CSS, not by screenshot.

**Decisions I made**
- The old variable names `--space-4` and `--space-8` collided with the token names. They now mean 4px and 8px; nothing in the app still uses the old meaning.
- I kept the existing sidebar layout instead of a top header, and used a scrolling pill strip rather than a menu dialog on phones.
- Inside a band, outlines, shadows and focus rings are black in both themes, so they stay visible on the light flood colors in dark mode.
- While refreshing, each stat card shows its own coin, and the Refresh button keeps its "Refreshing…" text rather than switching to a coin.
- The stat trend arrows are ink, not green or red, because "down" is good for incidents and lead time.
- Avatars are square with an ink outline, and the files table also reflows to stacked blocks on phones.
- A few layout widths, like the search field, menu and filter field, are written as multiples of token values.