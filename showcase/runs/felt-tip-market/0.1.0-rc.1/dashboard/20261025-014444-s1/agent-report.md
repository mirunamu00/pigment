Every screen now uses felt-tip-market@0.1.0-rc.1. The build and typecheck pass, all 10 smoke tests pass, and no page scrolls sideways. I looked at the screenshots for every page at 1440px and 390px, in light and dark. That includes the 404 and "project not found" pages, which aren't in the snap list. All routes, labels, `data-testid`s, ARIA attributes and behaviour are unchanged. Nothing under `design-packages/` or `tests/` was touched.

**Nothing is committed.** The spec asks for one commit per screen, but `git` isn't one of the commands I was allowed to run. All changes are in the working tree, and `package-lock.json` (created by `npm install`) is new and untracked.

## What changed
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. The old variable names in `base.css` (`--color-bg`, `--color-text`, …) now point at the new tokens, so nothing that used them broke. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Reusable pieces** (`signature.css`, `ui.tsx`, `Footer.tsx`, `stickers/Sticker.tsx`): every signature element from the spec is built once and reused:
  - the hover lift and press, and the stacked-plates main button;
  - the colour bands: each screen's header band, the split band, the full-screen error band, and a black footer;
  - the ink-framed boxes, ruled lists, pills and dashed empty box;
  - the notched price flag, status pills with dots, inputs (with the pink focus band), checkboxes and the menu;
  - six original stickers (parcel, incident ticket, calendar page, curled task slip, key, disc token), a "shipped" word badge and a rocking loading glyph.

  All motion stops under reduced motion.
- **Layout:** the grey sidebar became the spec's 80px top bar with pill links. Below 1024px it collapses to a menu button that opens a full-screen panel, with focus kept inside it and Escape to close.
- **Band colour per area:** Overview lemon, Projects (list and detail) periwinkle, Team teal, Settings marigold.
- **Screens:**
  - **Overview:** header band with one parcel sticker, stat tiles with 48px numbers and legend dots, a pink-line-over-grey-bars chart, a ruled activity list, and the projects table with a price flag on each budget. Refresh shows dashed placeholder boxes with visible "Loading" text and a rocking glyph on the button.
  - **Projects:** same table on its own band.
  - **Project detail:** breadcrumb and pill tabs inside the band, a ruled facts grid with the budget flagged, pink checkboxes, and the files table becomes label–value rows on phones.
  - **Team:** ink-framed table; on phones it scrolls inside its frame with the first column fixed.
  - **Settings:** dashed empty box with a key sticker and the stacked-plates button.
  - **404 and "project not found":** full-height band, two stickers, stacked-plates recovery button.
- **Docs:** a `design-system/` folder (`VERSION`, the tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

## What I couldn't apply
- **Switches, option cards, dialogs, toasts, the FAQ and the word badge on screen:** the app has no screens that need them. The badge is in the sticker kit but not placed anywhere.
- **Flag on a dashboard headline money figure:** none of the four stat tiles is money, so the dashboard's flags are on the budget column instead.
- **Update date in `VERSION`:** the spec gives no update date, so it records the date the system was applied.

## Decisions I made myself
- **Footer:** the spec puts one on every page, so I added a working "Jump to a project" box (it goes to `/projects?q=`). On Overview its arrow button is white, not pink. Overview already uses pink three times (focus band, price flag, chart line), which is the limit.
- **Chart line:** the data has only one series, so the pink line is a three-month average of the deployments, with a legend entry for it.
- **Bands in dark mode:** content inside a band keeps its light-mode look (white fills, black lines and text), so bands look the same in both modes as the spec requires. The footer's input does the same.
- **Avatars and progress bar:** avatars are 4px-rounded, ink-framed squares rather than circles. The task progress bar is filled with ink rather than a band colour.

I used a temporary page to review the stickers up close and removed it afterwards; `App.tsx` is back to its original content.