I've restyled the Field Notes blog with Morning Shapes on every screen (Home, both articles, About, 404, post-not-found), in light and dark. The build passes, all 9 smoke tests pass, and the final screenshot run at 1440px and 390px, light and dark, reports no sideways scrolling. I looked at the screenshots page by page against the spec and fixed what was wrong: a squashed email field on phones, and the Home nav dot not lit on article pages.

**What changed**
- **Tokens:** `src/styles/tokens.css` is an exact copy of the package's `tokens.css` (checked with `diff`). `base.css` imports it, and the old variable names still work as aliases. Dark mode follows the system setting, and `data-theme` on the root forces either mode.
- **Fonts:** Figtree and DM Mono load from Google Fonts in `index.html`, with the spec's fallbacks behind them.
- **Reusable pieces in `src/components/ms/`:**
  - Color bands with curved edges, in all three forms the spec defines.
  - The flat shape kit with crescent shading, and 9 original pictograms of this blog's subjects (e.g. a flag for feature flags, a bell for notifications).
  - Breathing glyphs and a loading indicator.
  - Every button variant on its 2px ledge, plus the filter pill with its dot.
  - The front-page preview cards, and a helper that fades decoration in once and pauses glyphs off-screen.
  - Under reduced motion the glyphs stand still and the reveals and preview cards appear complete.
- **Screens:**
  - **Home:** yellow hero band with display headline, a blue "Subscribe" and a white "Meet the authors" pill, preview cards and confetti. Below it, the featured cream card with a cover, a confetti section opener, a search pill and filter pills with tag-colored dots, cream post cards with covers, and a yellow no-results panel with a magnifier.
  - **Articles:** cream header band with the post's cover, 20px reading text, cream table of contents, quote and code cards, illustrated figures, related posts.
  - **About:** blue header band with a notebook-and-pencil scene, a spot plate by "Why we write", and author cards with initials on colored discs.
  - **404 and post-not-found:** cream band with the error picture and a dark "home" pill.
  - **Footer:** cream band with a curved top, the newsletter with one breathing glyph, a links column, and a dark bottom bar with a "Back to top" circle.
- **Docs:** `design-system/` (`VERSION`, `components.md` with the color map and picture subjects), plus one-line `AGENTS.md` and `CLAUDE.md` pointers.

Every route, label, form field, `data-testid` and accessibility attribute is kept. Nothing under `design-packages/` or `tests/` was touched.

**What I could not apply**
- **Commits:** the spec asks for one commit per screen, but you didn't ask me to commit, so everything is uncommitted on `main`.
- **Phone menu:** the spec's phone top bar (main pill plus a menu button) doesn't fit. There are only two nav links, so they stay in the top row. There is no top-bar pill either.
- **Fonts may fail offline:** the tests passed with the Google Fonts link in place, but in an environment without network access the failed font request could show up as a console error and fail the "no console errors" test.
- **Screenshot timing:** fade-ins and preview cards animate on first view, so screenshots can catch them half-built. The real page finishes them.

**Decisions I made**
- **Colors by area:** Home and its articles are yellow, About is blue, and the footer and error pages are cream. Tags each get a color: engineering green, writing orange, process violet, design pink, remote work blue. Remote work shares blue with About.
- **Home is treated as the front page:** full hero band rather than a compact header band. The Subscribe pill jumps to the footer newsletter (I added `id="newsletter"` there).
- **Article header band is cream, not yellow:** the post's cover is wider than a third of the page, and the spec says the cover is then the one colored area. I moved the title band inside the `<article>` element so the article test still finds the title.
- **Body figures:** they have no real image, so each now shows a flat illustration picked from its alt text: a board, two notes side by side, or a timeline.
- **Additions:** the footer "Read" links column and the "Back to top" button.
- **Nav dot on articles:** the Home dot stays lit on article pages, because posts belong to the Home area.