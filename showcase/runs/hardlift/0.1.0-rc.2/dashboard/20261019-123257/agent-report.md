Hardlift 0.1.0-rc.2 is applied to every screen in light and dark. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 390px. I checked the screenshots of all four captured routes at both widths and in both themes. I also snapped `/settings`, a 404 and a missing project separately, since they aren't in the default set.

**What changed**
- **Tokens:** `src/styles/tokens.css` is an exact copy of the package file (light, dark, and dark by system setting). `src/styles/base.css` imports it and keeps the old variable names working as aliases. DM Sans 400/700 loads from Google Fonts in `index.html`.
- **Reusable signature pieces:**
  - **Lift buttons** (`.lift` with pink, ink, ghost, small and icon variants, plus the hero plate): they never lift when disabled or busy.
  - **Color bands** (`PageBand.tsx`): every page header. Each section owns one color: Overview teal, Projects and the project page yellow, Team periwinkle, Settings lime, error screens red.
  - **Pills:** sidebar nav (current page filled ink), the status filters, and the project tabs inside the band.
  - **Stickers** (`Sticker.tsx`): a 32px coin, a 160px coin, and a turning loading coin.
- **Motion:** lifts, pill borders and the coin animation all work. Under reduced motion the lifts become a colour change only and the coin stops.
- **Per screen:**
  - **Overview:** band with a pink Refresh button (it shows the turning coin while loading), outlined stat cards with arrow icons, a 32px sticker on the chart card, and loading cards that show a coin and "Loading..." instead of skeleton bars.
  - **Tables:** each sits in a bordered box with a 2px ink rule under the header and 2px-lift "open project" buttons on each row. On mobile the table scrolls inside its box with the first column fixed. The empty state has a sticker and a pink "Clear filters" button.
  - **Project detail:** breadcrumb, title, status badge and tabs all sit in the band. Budget shows as a pink price tag. Tasks use styled checkboxes.
  - **Settings, 404 and missing project:** a band, a 160px sticker, one sentence and a pink return button.
- **Docs:** `design-system/` (VERSION, tokens.json, components.md describing where each piece is used and how to reuse it), plus the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are kept. I added a few things: icons, an `aria-busy` on Refresh, the row "Open {project}" links, and a visually-hidden "Actions" table header.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but `git` wasn't in the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Project table rows are 57px, not 44px,** because the first column holds two lines (name and client).
- **Missing app features:** there is no time-range control, settings sub-nav or save row, toast or dialog in the app, so those pieces weren't built. The hero drift, tag wall and draw-on animations are in the CSS for reuse but not used, as this is a dense app.
- **The spec states no release date,** so `VERSION` says "applied 2026-10-19".
- **The Korean fallback fonts** in the font stack (Pretendard, Noto Sans KR) are listed but not loaded.

**Decisions I made myself**
- **Layout:** I kept the existing sidebar and top bar rather than the spec's 80px top header. Under 1024px the nav becomes a sideways-scrolling pill strip, not the spec's menu dialog.
- **Search:** the search button keeps its visible "Search" text, which is hidden visually on phones only.
- **One CSS change worth knowing:** the old `--space-4` (16px) and `--space-8` (32px) clash with Hardlift's own names, so they now mean 4px and 8px. Nothing in the app still uses the old values.
- **Colours not covered by the spec:**
  - Chart bars are ink in light and paper in dark.
  - Avatars are outlined squares rather than filled circles.
  - The coin glyph stays black on its pink face in dark mode.
  - Selected tabs on a band keep their normal text colour so they stay readable in dark mode.
  - Stickers take their section's band colour so no screen shows two band colours.
- **Status icons:** clock for active, pause for paused, check for done. The KPI trend colours keep the app's existing up = green, down = red meaning, even though "−2 incidents" is good news.