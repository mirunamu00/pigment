I've applied Graphite Blueprint 1.1.0-rc.6 to every screen of the blog. The build and typecheck pass, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark. I looked at the screenshots of every page, plus the 404 and post-not-found pages and each signature piece shown on its own, in both themes. Nothing is committed yet.

## What changed
- **Tokens and fonts:** `tokens.css` is copied verbatim into `src/styles/`. The old variable names are kept as aliases to the new tokens at the top of `base.css`. Inter and Geist Mono are self-hosted from npm packages I added to `package.json` (no font CDN). Light and dark follow the device setting.
- **Signature pieces** (reusable, in `src/components/signature/` and `src/styles/signature.css`): the spotlit stage, the dot glyph and dot meter, the isometric blueprints (including a broken-connector version for errors), the spec plates, the shimmer/live-edge/pulse/caret styles, and the opener, masthead and two-tone text. Looping motion stops on its resting frame under reduced motion.
- **Header:** sticky and translucent, with the name as text, ghost nav pills and one inverse "Subscribe" pill.
- **Footer:** on every page, the newsletter is now the closing section — "New post? One email." over the dot field, with the form and two pills. A failed submit moves focus to the field and shows a danger banner above the buttons.
- **Home:** masthead, featured post (mono "FEATURED" label, wide plate, text), a split opener, a search pill with filter chips, a mono result count, a hairline grid of plate cards, and the empty state with the 48px empty glyph.
- **Article:** breadcrumb, then a title that spans the row, meta with a mono date, and a wide lead plate. The contents list is a right rail from 1024px, with the current section marked; below that it is a closed disclosure after the plate. Body text is at reading width, figures have FIG captions, and related posts get an opener and plate cards.
- **About:** masthead, then "Why we write" (opener, the existing paragraphs, and a row of three blueprints), then "The authors" (opener and a hairline grid).
- **404 and post not found:** the error state with the broken-connector blueprint on a quiet stage, "ERR 404", a heading and two pills.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

## What I couldn't apply
- **No running loops anywhere:** the blog has no real background work, so the scan/rise/core glyph loops, shimmer and live edges are built but not used. The spec forbids faking a working state.
- **Lit stage:** there's no landing hero or product UI to put on it, so the only stage is the quiet one on the error pages.
- **Long titles at 390px** wrap to more than the two lines the spec allows, even at the smallest heading size.
- **Commits:** the spec asks for one commit per screen, but I didn't commit since you didn't ask me to. Everything is in the working tree.
- **Signature measurements:** the spec asks for measured numbers (blueprint widths, left edges and so on). I only checked by eye in the screenshots.

## Decisions I made
- **Kept accessibility attributes:**
  - The article image placeholder stays `role="img"` with its alt text, which the tests check, instead of being hidden like other plates.
  - The newsletter error message keeps `role="alert"`, so the new danger banner has no role and the error is announced once.
- **Kept the visible "Featured" heading** as an h2 styled as a mono label, because the section is labelled by it.
- **Breadcrumb:** it stays outside the `<article>` element, in its original place.
- **Nav at 390px:** with only two items, the pills stay visible instead of collapsing into a menu sheet.
- **Touch targets:** 32px pills reach 44px through an invisible hit area, so they don't look bigger.
- **Copy I added:** the closing statement, the opener descriptions, the blueprint captions, a second lead sentence in each masthead, and a second pill per form. The second pill is "Meet the authors" ("Read the latest" on About).
- **Logo:** I removed the brand-mark icon, because the spec wants the product name as text.
- **Newsletter form:** it now moves focus to the email field on a failed submit, as the spec asks.
- **Review method:** the spec wanted the pieces reviewed inside an existing page, so I added them to the not-found page temporarily and then removed them. In Git Bash, `node pigment-snap.mjs /path` needs `//path`, because Git Bash rewrites a single leading slash.