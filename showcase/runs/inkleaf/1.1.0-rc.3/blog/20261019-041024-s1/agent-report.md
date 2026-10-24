Inkleaf 1.1.0-rc.3 is applied to every screen: home, article, About, both not-found pages and the newsletter, in light and dark. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. Routes, behaviour, label text, form fields, `data-testid`s and accessibility attributes are unchanged. One cleanup is left for you: delete `src/pages/TempInk.tsx` (see below).

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` unchanged. Fonts are served locally from `@fontsource` packages I added to `package.json`, so nothing is fetched from the web at runtime. `src/styles/base.css` was rewritten on the tokens.
- **Signature elements**, as reusable pieces in `src/ink/`:
  - **Pictograms:** brush filters loaded once, a frame-by-frame strip that plays once when it scrolls into view and holds.
  - **Stages and plates:** pastel stages with wandering lines, drawing stages, and plates whose colour comes from the post's slug.
  - **Headings:** h1s and section h2s fade in word by word.
  - **Other pieces:** the working glyph, breathing dot and check-circle; the ring-style buttons; and blocks that rise into view.
  - All motion stops under `prefers-reduced-motion: reduce`.
- **13 original drawings** in `src/ink/drawings.ts`, 7 of them with hands, no pose used more than twice.
  - Notebook on the home masthead and pen on the About masthead.
  - Book opening the "Why we write" section, and a lantern on the not-found pages.
  - Index card on the empty search, and a stamp on the newsletter success.
  - One drawing per post, the same one on its card's plate and its article's stage.
- **Home:** masthead with drawing, title and lede. The featured post sits on a drawing stage beside its text. Filter chips are on the left, search on the right. Post cards each have a plate, three columns on desktop and two on mobile.
- **Article:** the lead drawing stage spans the text column. Figures became ghosted previews shaped to their captions: grouped tiles, two panels side by side, and boxes joined by lines. The contents list sits beside the text from 992px and becomes a collapsed disclosure below that.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (each drawing's subject, its one-word name and its hand pose), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git isn't among the commands I was allowed to run, so everything is uncommitted.
- **`src/pages/TempInk.tsx` still exists:** it's the temporary page I used to inspect the drawings. Its route is removed, but deleting the file needs a command I wasn't allowed to run, so please delete it.
- **Working glyph unused:** the app has no requests that take time (the newsletter submit is instant), so the spec's rule against showing it idle means it never appears.
- **Screenshot timing:** `pigment-snap` captures before animations finish, so its full-page shots show headings, drawings and lower blocks half-drawn or faded. I reviewed those parts with extra snaps of pages opened at a heading anchor, plus the temporary page. I didn't change any motion to make the shots look complete.
- **Hand counts on article pages:** an article's related posts can show 2 of 3 plates with hands, above the spec's "at most half" per page. Which posts appear depends on shared tags, so I left it.

**Decisions I made myself**
- "Featured" on the home page is a small uppercase label rather than a serif heading, since the post title right below it carries the serif.
- Headings inside article text don't animate in; only page and section headings do.
- On mobile, card grids use a 12px gap so two cards fit at 390px, and an odd last card spans the full row.
- The search label is visually hidden, as the spec's toolbar rule says; the search field also gained a clear button.
- The not-found pages gained a second action, "About this blog", because the spec asks for two.
- Failed newsletter submits now move focus to the email field.
- The brand's small logo icon was removed; the spec says to show the product name as text with no invented logo.
- Post titles keep their title case because they're content and the tests check them exactly.