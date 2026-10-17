I restyled the Field Notes blog with graphite-blueprint@0.1.0-rc.1: all four captured pages plus both not-found pages, in light and dark. The final `node pigment-snap.mjs` run built cleanly and reported no sideways scrolling. I looked at every screenshot. **I could not run the smoke tests** because Playwright isn't one of the commands I was allowed. All test ids, labels, text and accessibility attributes are kept, but that is checked by reading the code, not by running the tests.

**What changed**
- **Tokens and fonts:** an unedited copy of the package's `tokens.css` is now `design-system/tokens.css` and loads first. The old variable names in `src/styles/base.css` point at the new tokens. Inter and Geist Mono load from Google Fonts. Light and dark follow the device setting.
- **Signature pieces**, in `src/design/` with styles in `src/styles/signature.css`: the stage (lit and quiet), the dot glyph with its patterns, dot field and dot meter, the blueprint drawings, the spec plate, the shimmer / live-edge / pulse / caret classes, and the split opener. I checked them on a temporary page in both themes, then removed the page.
- **Shell:** the header sticks to the top with blur, nav pills and a "Subscribe" pill that jumps to the newsletter. The newsletter is now a centred closing section over the dot field, and the footer has a thin line above it.
- **Home:** a split header, the featured post on a wide spec plate, a pill-shaped search box, filter chips, and the posts in a thin-lined grid with spec plates and mono dates. The "no results" state uses the 48px empty glyph and a mono "NO RESULTS" caption.
- **Article:** a narrower width, 17px body text, restyled quotes and code, image placeholders turned into spec plates, a contents list that highlights where you are, and related posts in the same grid.
- **About:** split openers, a row of three captioned drawings (one has a moving connector; the others lift on hover), and the authors in a thin-lined grid.
- **Not found and missing post:** a broken-connector drawing on a quiet stage, "ERR 404", and two pills.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md`, and the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **Commits:** the spec asks for one commit per screen, but git wasn't an allowed command, so nothing is committed.
- **`tokens.json`:** I didn't copy it into `design-system/`.
- **Running glyphs, shimmer, live edge, pulse, caret and the dot meter:** built but not used anywhere. Nothing in the blog actually runs in the background, and the spec forbids showing these otherwise.
- **Lit stage:** not used, because the blog has no landing hero.
- **Screen head:** not used, because there are no app screens.
- **Phone menu:** the spec puts the nav in a menu sheet on small screens. With only two links I kept them inline; they fit at 390px.
- **Title length:** the featured article's title wraps to three lines on phones, above the spec's two-line limit.

**Decisions I made**
- **Google Fonts:** I loaded the fonts from Google Fonts rather than adding packages. If the test machine has no internet, the failed font request may log a console error. That would break the "no console errors" smoke test.
- **New links and copy:** I added the header "Subscribe" link and an "About the blog" second pill on both not-found pages. I also added a "Who writes here →" link on Home, an "03 WRITERS" label on About, and the drawing captions on About.
- **Plate captions:** plates are captioned "FIG 01"–"FIG 07" in post order rather than by tag, so they don't repeat tag text that's already on screen.
- **Smaller layout choices:**
  - The page headers at the top of Home and About have less top space than a mid-page section.
  - The dot field is hidden below 640px, because at that width it would sit under the text.
  - On tablet and phone the contents list still sits above the article, as it did before.

To snapshot specific pages from Git Bash, write the path with two slashes (`node pigment-snap.mjs //nope`). Git Bash rewrites a single leading slash into a Windows path, and the script then quietly screenshots every page instead.