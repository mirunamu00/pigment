I restyled the blog with Hardlift 0.1.0-rc.5 across every screen, in light and dark. The build passes, all 9 smoke tests pass, and the final snapshot run reports nothing scrolling sideways at 1440px or 390px. I looked at every screenshot. I also checked the empty search result and both "not found" pages through temporary snapshots, then removed the temporary route.

I couldn't follow the spec's "one commit per screen" step. Git isn't among the commands you allowed, so every change is uncommitted in the working tree.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package file. The old variable names in `base.css` (`--color-bg`, `--color-link` and so on) still work and now point at the new tokens. DM Sans, JetBrains Mono and Noto Sans KR load from Google Fonts in `index.html`.
- **Signature elements**, built to the spec's recipes in `src/styles/signature.css` and a few small components:
  - Lifting buttons in pink, ink and outline versions, an icon size, and the hero button that lifts off a dark plate.
  - Whole post cards that lift on hover.
  - Pill navigation and filters.
  - Full-width colour header bands (`Band.tsx`).
  - Flat sticker drawings (`Sticker.tsx`).
  - Hero shapes that drift as you scroll, a scrolling strip of topic tags, and the loading coin and draw-on animations.
  - All motion stops under reduced-motion settings.
- **Screens:**
  - **Header:** 80px tall with pill links; the current page shows as a filled pill.
  - **Home:** a hero with four large drifting stickers and the main pink button, then the tag strip and the featured post as a lifting card. "More posts" sits under a yellow band holding the search box and tag filters, followed by a 3/2/1-column card grid. The empty search result shows a 160px sticker and a "Clear filters" button.
  - **Article:** the breadcrumb sits above a yellow band with the title, details and tags. The table of contents is a sticky list of pills, which becomes a sideways-scrolling strip on phones. The three article figures are now three different sticker scenes. Related posts are lifting cards.
  - **About:** a periwinkle band, a small sticker by "Why we write", and outlined author cards.
  - **Not-found pages:** a red band, a 160px sticker and a pink return button.
  - **Newsletter:** outlined input with the pink focus halo, an error line with an icon, and a success confirmation card with the hard shadow.
- **New files:** `design-system/VERSION`, `design-system/components.md` (where each signature element is used and how to reuse it), and `AGENTS.md` / `CLAUDE.md` with the pointer line.

**Not applied as written**
- **Figures can't be hidden from screen readers.** The spec says to mark illustrations `aria-hidden`, but the tests look up the article figure as an image with its alt text. Figures keep `role="img"` and their label.
- **No mobile menu dialog.** With only two links, the pills fit at 390px, so the header keeps them inline.
- **No pink price tags on cards.** Blog posts have no price or count to show.
- **Unused pieces.** The app has no tables, dialogs, toasts, switches or loading states. The loading coin and draw-on animations exist but nothing uses them yet.
- **JSON tokens not copied.** `design-system/` points to the package's `tokens.json` rather than holding its own copy.

**Decisions I made**
- **One pink button per page.** The spec counts pink per viewport, but full-page screenshots could show two, so I kept it to one per page. On Home and the not-found pages, the page's own button is pink and the newsletter "Subscribe" is black. On articles and About, "Subscribe" is the pink one. When the empty search result shows, "Clear filters" turns pink and the hero button becomes an outline button.
- **Section colours.** Posts (Home list and articles) are yellow, About is periwinkle, and error pages are red.
- **Featured image placeholder.** The featured post gets a yellow square with a page sticker, since posts have no photos.
- **Data change.** Figure entries in `src/data/posts.ts` gained a `scene` field that picks each figure's drawing.
- **Search icon.** It sits inside the search field rather than as a separate square button, since a button would do nothing (search filters as you type).
- **Smaller pieces:** quotes have a thick left rule, code blocks are outlined boxes in the mono font, table of contents pills use the small text size, and on phones the newsletter button sits under the input.
- **Changed variable meaning.** The old `--space-4/8/12` names now mean 4, 8 and 12px (Hardlift's naming) instead of the old 16, 32 and 48px. All current styles use the new tokens, so nothing breaks today.