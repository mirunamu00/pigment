Hardlift is applied to every screen. The build passes, all 9 smoke tests pass, and nothing scrolls sideways. I checked the screenshots of every page at 1440px and 390px in light and dark, plus the 404 page. I also looked at the search-empty, newsletter-error and newsletter-success states on a temporary preview route, which I removed afterwards. That route re-rendered copies of their markup, so those states were not captured from the real interaction.

## What changed
- **Tokens:** `src/styles/tokens.css` is a verbatim copy of the package file. The old variable names in `base.css` now point at the tokens, so existing rules keep working. DM Sans, JetBrains Mono and Noto Sans KR (the Korean fallback) load from Google Fonts in `index.html`.
- **Signature elements**, as reusable pieces:
  - `src/styles/signature.css` holds the hard-lift buttons, lifting cards, the hero button on its ink plate, pills, color bands, badges, the sticker styles and the scroll drift.
  - Under reduced motion, the lift, drift and slide-up animations all switch off.
  - New components: `Sticker`, `StickerHero`, `PageBand`, `Icon`.
- **Screens:**
  - **Header:** 80px tall, with pill navigation; the current page is the ink-filled pill.
  - **Home:** yellow band, then a hero for the featured post with large display type, four drifting stickers cropped at the edge, and a pink "Read the featured post" button on its plate. Search field, pill tag filters, post cards that lift as a whole, and an empty state with a 160px magnifier sticker.
  - **Articles:** yellow band with breadcrumb, title, meta and tags. The table of contents is a list of pills. Each of the three figures is now its own sticker scene matching its caption, replacing the generic mountains-and-sun placeholder. Code blocks are outlined and related posts are lifting cards.
  - **About:** periwinkle band, a 32px pencil sticker by the first heading, and outlined author cards.
  - **Not-found pages:** red band, a 160px sticker, one sentence and a return button.
  - **Newsletter:** outlined input with the pink focus ring, an error line with an icon, and the success message as a toast-style card with the hard shadow.
- **Docs:** `design-system/` (`VERSION`, `tokens.json`, `components.md`), plus one-line `AGENTS.md` and `CLAUDE.md`.

## Not applied
- **No commits.** The spec asks for one commit per screen, but git wasn't in your allowed command list, so all changes are uncommitted.
- **No mobile menu dialog.** There are only two nav links, so they stay visible as pills on phones.
- **Figures keep `role="img"` and their alt text** instead of `aria-hidden`, because the tests and accessibility attributes depend on them.
- **The search field has no icon button.** It has no submit action, so I used a decorative icon inside the field instead.
- **`VERSION` says "applied 2026-10-20"** because the spec gives no update date.

## Decisions I made
- **One pink button per page.** On Home the hero button is the pink one, so the footer Subscribe is ink there; on every other page Subscribe is the pink one. "Clear filters" and the not-found return buttons are ink because Subscribe can be on screen at the same time.
- **Band colors:** yellow for Home and articles (one section), periwinkle for About, red only for the not-found pages. Sticker fills follow the page's band color, so no screen shows two band colors.
- **Old variables with clashing names:** `--space-4`, `--space-8` and `--space-12` now mean 4, 8 and 12px (the token values), not the old 16, 32 and 48px. Every rule that used them was rewritten.
- **Article layout:** the breadcrumb sits inside the article band so the title stays inside `<article>`, as a test requires. Below 900px the table of contents becomes a horizontally scrolling pill strip.
- **Grid widths:** pages use the narrow 1152px container with 3 card columns, rather than the 4-column marketplace grid.
- **Mobile form:** the input and button stack, so the error line appears below the button rather than right under the input.
- **Font loading:** fonts come from Google Fonts, so the "no console errors" test assumes network access when it runs.