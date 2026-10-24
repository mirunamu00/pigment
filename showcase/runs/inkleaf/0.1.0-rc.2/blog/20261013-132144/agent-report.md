Inkleaf is applied to every screen: Home, both article routes, About, the not-found pages and the newsletter footer. The final `node pigment-snap.mjs` run built cleanly (typecheck included) and reported no sideways scroll at 1440px or 390px, light or dark. I could not run the Playwright smoke tests, because `npm run test:e2e` isn't one of the commands I was allowed to use. Every `data-testid`, route, heading id, label, ARIA attribute and test string is preserved, and test-relevant markup was checked against `tests/smoke.spec.ts`, but please run the tests before merging.

**What changed**
- **Tokens:** `design-system/tokens.css` is a verbatim copy of the package's token file, imported by `src/styles/base.css`. The old variables are gone. Dark mode follows the system setting, and `[data-theme]` can override it.
- **Fonts:** Source Serif 4, Instrument Sans and JetBrains Mono at the weights the spec names, self-hosted through `@fontsource` packages and loaded with `font-display: swap`.
- **Signature pieces (`src/design/`):**
  - Brush filters at the app root.
  - The pictogram as one stepped animation strip. It plays once, holds its last frame, and has a boil mode for loading.
  - The pastel stage with wandering lines, plus plates.
  - Headings that write themselves in word by word.
  - The working glyph, breathing dot and check-circle.
  - The ring-style button and chip classes, and the block-rise entrance.
  - All motion stops under `prefers-reduced-motion: reduce`.
- **Thirteen original drawings**, one subject per use: an open notebook as the home masthead (the page's one accent fill), and one drawing per post on a sage stage at the top of each article. There are also drawings for the About section openers, the newsletter card, the empty search result and the not-found page (on an apricot stage). I checked all of them in a temporary gallery: each reads clearly as its subject.
- **Screens:**
  - **Home:** featured card and post cards use plates colored by their first tag.
  - **Search:** an Inkleaf-styled search field with its own clear button.
  - **Filters:** chips that turn ink when selected.
  - **Tags:** outline badges.
  - **Articles:** serif pull quotes, mono code blocks, and the image placeholder became a plate. The table of contents is a sticky side column on wide screens and a collapsed "On this page" disclosure below 992px.
  - **About:** author cards with avatar tiles.
  - **Header and footer:** a sticky header with the name in serif, and a hairline-plus-caption footer.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **Commits:** the spec wants one commit per screen, but `git` wasn't an allowed command, so everything is uncommitted.
- **Working glyph:** it is built but never shown, because the app makes no network requests and the spec forbids adding fake delays to show it.
- **Sentence-case headings:** post titles are title case in the data, and the tests check them word for word, so I left them.
- **No VERSION date:** the spec gives none, so the file records today's date instead.

**Decisions I made**
- **Entrance timing:** this is the main departure from the spec. As written, the spec keeps elements hidden until 15–30% of them is on screen. The first full-page capture showed this leaves everything below the fold blank. Now everything stays in its finished state until it enters the viewport, then animates in from the first pixel. Visitors see the same motion, and nothing waits hidden off-screen. The behavior is the same for every browser; nothing checks for automation.
- **One large drawing per page:** on the blog home and articles, the masthead and article drawing are the only big ones. Home's "More posts" and the article's "Related posts" get headings that write in, but no drawing.
- **Smaller layout choices:**
  - The featured post is a wide card with a plate beside it.
  - Post cards in a row share a height.
  - The newsletter is a card with a medium drawing.
  - Not-found pages gained a second action, "About Field Notes".
  - A failed newsletter submit now moves focus to the email field.
- **Brand mark:** removed from the header, since the spec wants the product name in serif text only.

**Leftovers to delete:** I couldn't remove files with the allowed commands. `src/pages/GalleryTmp.tsx` is now an empty, unused module and is safe to delete. I added and then removed the temporary routes in `pigment.app.json`, so that file is back to its original routes.