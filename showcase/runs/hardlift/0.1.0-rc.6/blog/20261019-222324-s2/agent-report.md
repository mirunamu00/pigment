Hardlift is applied to every screen. The build passes, all 9 smoke tests pass, and the final snapshot pass found no sideways scrolling at 1440px or 390px, in light or dark. I looked at the screenshots for every page, the not-found page, and the empty-search and form-error states (through a temporary route, since removed).

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` pulls in the package's `dist/tokens.css` directly, so no values were retyped. Dark mode follows the system setting, as the token file defines it. DM Sans and JetBrains Mono load from Google Fonts. The old CSS variable names (`--color-text`, `--radius`, …) still work and point at the new tokens.
- **Reusable pieces:**
  - `src/styles/hardlift.css` holds the lifting buttons and cards, the pills, the colour bands, the sticker motion, cards, badges and form fields.
  - `Band.tsx` is the colour band; `Stickers.tsx` holds the sticker drawings; `Icons.tsx` holds the outline icons.
  - All motion stops under reduced motion.
- **Home:** a yellow hero band with the large title and three drifting stickers, kept in their own column so they never cover text; on phones they sit still below the text. The featured post and post cards lift as whole cards on hover, and the featured card has a sticker picture. The tag filters are pills and the search field has the pink focus ring. The empty search shows a 160px sticker, one sentence and a pink "Clear filters" button.
- **Article:** a yellow band holds the breadcrumb, title, author line and tags. The contents list is a vertical pill list. The old mountain-and-sun placeholder is replaced by a different sticker scene for each figure's subject. Related posts are lifting cards.
- **About:** a periwinkle band, and the author cards are outlined cards.
- **Not-found pages:** a red band, a signpost sticker, one sentence and a pink link back.
- **Header, footer and newsletter:** the header nav uses pills, with the current page filled ink. The newsletter sits in an outlined card, with an error border plus icon plus message, and an inline success line with a check mark.
- **Only one pink button on screen:** when a page shows its own pink recovery button (empty search or not-found), the newsletter's Subscribe button turns ink.
- `design-system/` now has `VERSION`, `tokens.css` and `components.md`, and I added `AGENTS.md` and `CLAUDE.md` with the one-line pointer.

**What I could not apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so nothing is committed.
- **One leftover file:** `src/pages/PreviewPage.tsx` from the temporary route is now an empty module. I couldn't delete it with the allowed commands, so please remove it.
- **No hero button:** the spec's hero button on a plate has no existing action to promote, and I didn't invent one. The plate style is built and ready to use.
- **Unused pieces:** the loading coin, the outline draw-on and the scrolling tag wall are built but not used, because the app has no loading states or tag wall.
- **Phone menu:** the spec's phone menu-button dialog isn't built; the two nav pills fit at 390px, so I kept them.

**Decisions I made**
- **Band colours:** posts and articles are yellow, About is periwinkle, and red is kept for errors.
- **Page widths:** articles and About use the narrower content width and Home the wide one. The footer uses the wide width, so on narrow pages its left edge is 16px out of line with the content.
- **Search field:** it has a decorative search icon at the end rather than a button, because filtering is already live as you type.
- **Figures:** they keep their image role and alt text (a smoke test relies on it), even though the spec marks sticker art as hidden from screen readers.
- **"Featured" label:** the heading is styled as a small pink badge, which counts as a small tag rather than a second pink action.
- **Smaller choices:**
  - Contents pills have slightly rounded corners rather than full pill corners, so long items that wrap still look tidy.
  - The author initials sit in outlined squares, since the spec rules out round avatars.
  - The newsletter button stretches full width on phones.