Hardlift is applied to every screen of the Northwind Ops dashboard, in light and dark. The build passes and all 10 smoke tests pass. The final screenshot run shows no sideways scrolling at 1440px or 390px. I looked at the screenshots for every route in both widths and both appearances, plus the not-found page.

**What I changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of `dist/tokens.css`, and `src/styles/base.css` imports it. The old variable names (`--color-bg`, `--radius`, etc.) still work: they now point at the Hardlift tokens. DM Sans 400/700 loads from Google Fonts in `index.html`, with the spec's fallback fonts.
- **Signature elements, built as reusable pieces:**
  - **Hard-lift buttons** (`.lift`, plus ink, ghost and icon variants), built to the recipe.
  - **Color bands** (`<PageBand>`): one band color per section. Overview is teal, Projects and project detail are yellow, Team is periwinkle, Settings is lime, error pages are red.
  - **Pills** (`.pill`): used for the sidebar navigation, the status filters, and the project-detail tabs, which now sit inside the band.
  - **Coin sticker** (`<Coin>`) and **turning-coin loader** (`<CoinLoader>`). A coin's rim always takes that screen's band color.
  - The lift and the coin animation both stop under reduced motion; buttons then only change color.
- **Every screen got the elements its context calls for:**
  - **Overview:** band, outlined stat cards with arrow icons next to the change text, a 32px sticker on the chart card, and the turning coin with "Loading..." replacing the skeleton placeholders during refresh.
  - **Tables:** each sits in its own bordered box with a 2px ink rule under the header and 44px rows. A 32px sticker and a pink button show when filters match nothing. On phones the table scrolls inside its box and the first column stays put.
  - **Status labels:** each is a neutral badge with an icon and the word, not a colored fill.
  - **Project detail:** tasks use the spec's checkbox and a styled progress bar.
  - **Settings, not-found and project-not-found:** a 160px sticker, one sentence and a return button.
  - **Header:** the global search has a joined icon button, and the user menu opens a panel with the hard shadow.
- **Docs:** `design-system/` holds `VERSION`, the tokens and `components.md`, which says where each element is used and how to reuse it. `AGENTS.md` and `CLAUDE.md` each have the one-line pointer.
- All routes, behavior, label text, form fields, `data-testid`s and accessibility attributes are unchanged. The "Search" button text is now visually hidden but still its accessible name.

**What I couldn't apply**
- **No commits.** The spec wants one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted in the working tree. `npm install` also created a new `package-lock.json`.
- **No time-range pills** on the dashboard: the app has no time-range feature, and I didn't add controls that do nothing.
- **No row-action buttons, toasts, dialogs, selects or switches:** the app doesn't have any of these yet.

**Decisions I made myself**
- **Kept the sidebar** rather than switching to the spec's top header, following "adapt to the existing structure". The top bar is 80px high on the raised surface. Below 1024px the sidebar turns into the wordmark plus a scrolling row of pills, instead of a menu button that opens a dialog.
- **Text on bands is always black** (`color.text.onAction`), and so is the focus outline inside a band. In dark mode the normal text color is near-white, which wouldn't be readable on yellow or lime.
- **The plus, cross or arrow on each coin's pink face is always black**, for the same contrast reason. The spec's recipe would have drawn it in the text color.
- **Button colors:** Refresh and the error-page return links are black, not pink. Pink is kept for empty-state actions, so there's at most one pink action on screen.
- **Bar chart:** pale bars with black outlines, with only the current month in pink.
- **Avatars** are small squares with an outline, not circles.
- **Empty-filter sticker:** I used 32px, following the table rule, rather than the 160px empty-state size.
- **Phone label sizes:** on phones the chart labels are enlarged and the user's name in the header is hidden visually; the name is still read by screen readers.
- **Version date:** the spec gives no update date, so `VERSION` uses today's date, 2026-10-19.

I reviewed the stickers, the loader, the button variants and the input focus ring on a temporary page. That page and its route are removed.