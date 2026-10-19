Hardlift is now applied to every screen of the blog. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I checked every screenshot against the spec and fixed what was wrong (details below).

**What I changed**
- **Tokens:** `design-system/tokens.css` is a copy of the spec's `tokens.css`, imported by `src/styles/base.css`. Dark mode follows the system setting and also works with `[data-theme]`. The project's old CSS variables now point at Hardlift tokens, so existing rules keep working.
- **Fonts:** DM Sans and JetBrains Mono are bundled with the app through two `@fontsource` packages added to `package.json`. Nothing is loaded from a font server at runtime, which keeps the "no console errors" test safe offline. No UI libraries were added.
- **Signature pieces, built once and reused:**
  - `src/styles/hardlift.css` holds the button lift, hero button on an ink plate, lifting cards, pills, badges, color bands, sticker motion and the reduced-motion and forced-colors rules.
  - `Band.tsx` is the color band header.
  - `Sticker.tsx` draws the stickers: coin with rim, note, star, pencil, tag, magnifier and arrow.
  - `StatusIcons.tsx` holds the alert and success icons.
- **Screens:**
  - **Header:** 80px tall, with pill navigation. The current page is ink-filled.
  - **Home:** a periwinkle band as the hero, with display type, one pink button on an ink plate and four stickers that drift as you scroll. Below that, the featured post and post grid are whole cards that lift on hover, with pill tag filters, an outlined search field with the pink focus ring, and an empty state with a 160px sticker.
  - **Article:** a periwinkle band (same section as Home) holding the breadcrumb, title, meta and tags. The table of contents is a vertical pill list. Blockquote, code, lists and related cards are restyled. The old mountain-and-sun placeholder is replaced by three original sticker scenes, one per article figure.
  - **About:** a yellow band and outlined author cards.
  - **404 and "post not found":** a red band, one sticker, one sentence and a return button.
  - **Newsletter:** a red border plus an alert icon on error, and a pink-circle check on success, shown inline.
- **Docs:** `design-system/` contains `VERSION`, `tokens.css` and `components.md` (where each piece is used and how to reuse it). `AGENTS.md` and `CLAUDE.md` each have the one-line pointer.

**What I couldn't apply**
- **One commit per screen:** git is not among the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **`tokens.json`:** not copied into `design-system/`; `components.md` refers to the original in `design-packages/`.
- **Leftover file:** I couldn't delete files, so the temporary review page is still there as an empty stub, `src/pages/PreviewPage.tsx`. Its route is removed and you can delete the file.
- **Figure art:** the spec says illustrations should be hidden from screen readers. The article figures keep `role="img"` and their description because a smoke test requires it.

**Decisions I made**
- **One pink button per page, counting the full page:**
  - On Home the hero button is pink, so the newsletter Subscribe and "Clear filters" are ink. The spec would normally make empty-state recovery pink.
  - On every other page, Subscribe is the pink button and the 404 return links are ink.
- **Band colors:** periwinkle for Home and articles (one section), yellow for About, red for the error pages.
- **Hero drift:** tied to page scroll rather than the spec's in-view trigger, so the shapes start in their designed positions. It only runs in browsers that support it. Below 768px the shapes sit still in a row under the text, and everything stops under reduced motion.
- **Mobile header:** keeps the two pills instead of a menu button and dialog, since there are only two links.
- **Spacing variables:** the old `--space-4/8/12` share names with Hardlift tokens but have different values. The Hardlift values win, because the old 32px `--space-8` was making the pills 88px tall.
- **Things the spec doesn't cover, built from its tokens:** the table-of-contents box, code block, blockquote and square author avatars.