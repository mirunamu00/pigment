Hardlift is applied to every screen: home, both articles, About, and the 404 / missing-post pages. The build passes, all 9 smoke tests pass, and no page scrolls sideways at 390px or 1440px in light or dark. I checked every screenshot against the spec, and also checked the empty state, form error, confirmation card and lifted button on a temporary route, which I then removed.

**What changed**
- **Tokens:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css`. The old variable names in `base.css` now point to the new tokens, so nothing that used them breaks. Fonts are DM Sans and JetBrains Mono, loaded from Google Fonts in `index.html`.
- **Reusable pieces (`src/styles/hardlift.css`):**
  - lifting buttons, including the ink, ghost, icon and small versions and the hero button with its fixed plate
  - cards that lift as a whole when hovered
  - pills for nav, filters and the table of contents
  - colour bands across the top of each page
  - badges, inputs and the search box with the pink focus ring, and the confirmation card
  - the scroll drift, tag wall, coin loader and draw-on animations
  - All motion stops under `prefers-reduced-motion`, and borders stay visible in Windows high-contrast mode.
- **Illustrations:** `Sticker.tsx` has 8 original shapes. `ImagePlaceholder.tsx` now draws a different scene for each article figure, replacing the generic mountains-and-sun image. `Icon.tsx` holds the outline icons.
- **Screens:**
  - **Home:** a yellow band with 4 large shapes that drift as you scroll, the hero button, a featured card and post cards that lift, a search box, pill filters, and an empty state with a 160px illustration.
  - **Articles:** a yellow band holding the breadcrumb, title, author/date line and tags; the illustrated figures; the table of contents as pills; related posts as lifting cards.
  - **About:** a teal band, one small illustration beside "Why we write", and outlined author cards.
  - **404 / missing post:** a red band and a signpost illustration.
  - **Footer:** the newsletter form with a pink lifting Subscribe button, an error line with an icon, and a success card with the hard shadow.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus a one-line pointer in new `AGENTS.md` and `CLAUDE.md`.

Every route, label, test id and accessibility attribute is kept. The page header, breadcrumb and table of contents moved inside `<article>`, which the tests still accept.

**What I couldn't apply**
- **One commit per screen:** git wasn't among the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **Korean font fallbacks:** Pretendard and Noto Sans KR stay in the font list, but I didn't load them because the content is English.
- **Red band contrast:** black text on the red band reaches only about 4.3:1, below the spec's own 4.5:1 claim. The red band therefore holds only the large title, and the sentence sits below it on the page background.
- **Spec gaps:** there's no update date, so `VERSION` says "applied 2026-10-19". Nothing in the app loads, so the coin loader and draw-on animation are built but not used.

**Decisions I made**
- I used the narrower container width throughout, since this is an editorial site.
- Post grids stop at 3 columns instead of going to 4 on wide screens, so excerpts stay readable.
- The home band doubles as the hero, which is why it carries illustrations although the spec says page-header bands have none.
- Articles share the home page's yellow because they belong to the same section.
- "Clear filters" and the 404 return button are black rather than pink, because Subscribe in the footer can be on screen at the same time. The home hero button and Subscribe are never visible together.
- With only two links, the mobile header keeps both nav pills visible instead of a menu dialog.
- The search icon is decorative, not a button, because search filters as you type.
- The article figures keep `role="img"` and their description, which one test needs, instead of being hidden from screen readers like other illustrations.
- I chose the styles for quotes and code blocks myself; the spec doesn't define them.