Hardlift 0.1.0-rc.6 is now applied to every screen of the Ferrule docs in light and dark. The build passes, all 16 smoke tests pass, and nothing scrolls sideways at 390px or 1440px. Every route, label, form field, `data-testid` and aria attribute is kept. I didn't change anything under `design-packages/` or `tests/`.

## What I changed
- **Tokens:** `design-system/tokens.css` is a copy of the package's token file, imported first by `src/styles/base.css`. The old variable names still work; they now point at Hardlift tokens. DM Sans and JetBrains Mono load from Google Fonts in `index.html`, and the spec's fallback fonts (including the Korean ones) come with the tokens.
- **Signature elements**, built once in `src/styles/signature.css` and reused:
  - **Lift buttons:** pink, ink, ghost and small (2px lift) buttons; whole linked cards that lift (home section cards, previous/next links); and the hero button that lifts 8px off a plate.
  - **Pills:** used for the header nav, sidebar links, package-manager tabs, table of contents and the band's page strip.
  - **Color bands** (`Band.tsx`): each docs section owns one color (Getting started teal, Guides yellow, API reference periwinkle, Resources lime). Error screens are red.
  - **Stickers** (`Sticker.tsx`, drawn originals: coin, star, tag, arrow, speech bubble). The home hero has 4 large shapes in the side margins that drift as you scroll. When the hero is narrow they become a small static row under the text, so they never cover anything. Error screens get one 160px sticker, the feedback heading and the empty search each get a 32px one. A turning-coin loading indicator is built but no screen uses it yet.
  - All motion stops under reduced motion.
- **Screens:**
  - **Home:** sticker hero with big display type and the pink "Get started" button, then lifting cards and the quick start.
  - **Doc pages:** band with breadcrumb, title, description and pills for the section's pages. Callouts are outlined cards with an icon plus the word (Note, Warning, Danger). Tables reflow into stacked blocks on phones. Code blocks have a ghost copy button that shows a check beside "Copied".
  - **Changelog:** lime band, and badges with an icon plus the word.
  - **Not-found (both kinds):** red band, sticker, one sentence, one pink button.
  - **Shell:** 80px header, search field with the pink focus ring, sidebar groups that open and close with a rotating chevron, and on phones a drawer with the hard shadow.
- **Docs for future work:** `design-system/VERSION`, `design-system/components.md` (conventions and where each element is used), plus the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **Commits:** the spec asks for one commit per screen, but `git` wasn't in the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Red band contrast:** black text on the red band is only about 3.5:1. That passes for large text but not small, so error bands hold only the 48px title.
- **Search icon button:** the spec adds a square button at the end of the search field. This search has no submit action, so I used a decorative icon inside the field instead. The placeholder stays "Search docs" rather than "Search...", to keep the existing label.
- **Header height:** it measures 81px, the 80px spec plus the 1px bottom border.
- **Things the app doesn't have:** toasts, dialogs and loading states don't exist here, so only their reusable pieces were built.
- **Hover:** screenshots can't show hover, so I checked the lift and focus rules by reading the CSS, not by watching them in a browser.

## Decisions I made myself
- **Changelog color:** it shares lime with Resources, because the spec allows at most 5 band colors and red is reserved for errors.
- **Additions not in the spec:** the page-pill strip in each doc band, the visible Note/Warning/Danger word in callouts, status-colored icons on changelog badges, and numbered circles for steps lists.
- **Table of contents:** below 1100px wide it becomes a horizontally scrolling pill strip above the article.
- **Sidebar:** the current page is ink-filled, like the header's current-page pill. Group toggles are styled as plain disclosures rather than outlined buttons, and their reveal animation only plays after a click, never on page load.
- **Google Fonts:** the fonts load over the network. Tests passed here, but a fully offline run could log a font-loading error in the console, which the "no console errors" test would catch.