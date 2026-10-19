I've restyled Field Notes to Graphite Blueprint 1.2.0-rc.2 on every screen: Home, both article pages, About, not found and post not found. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. Nothing is committed, because git isn't one of the commands I'm allowed to run, so the per-screen commits the spec's process calls for weren't made. You need to delete one file I left behind: `src/pages/ReviewPage.tsx` (explained under "Could not apply").

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a byte-for-byte copy of the package's `tokens.css`. Light and dark follow the device setting. Inter and Geist Mono are self-hosted from npm packages, the only dependencies I added. The old CSS variable names in `base.css` now point at the tokens. The root setup, focus outline, hover-only rules and the reduced-motion block follow the spec.
- **Signature pieces:** each recipe is now a reusable piece in `src/components/signature/`: the stage, the dot glyph (plus the dot meter and dot field), the blueprint helpers, the spec plates, the shimmer and live indicators, and the opener and masthead. I checked them alone on a temporary page: glyph frames, stage light and fade, all eight plate figures, and blueprint faces, dots and the marching connector all match.
- **Home:** masthead with a two-tone lead, the featured post as a wide plate under a FEATURED label, an opener over "More posts", a search pill, filter chips, the result count as a mono label, and a hairline grid of plate cards. The no-results state uses the 48px empty glyph.
- **Articles:** breadcrumb, then the title, mono meta and a wide lead plate. The contents list is a right-hand rail from 1024px and a closed disclosure below that, and it highlights the current section. Body images are plates with "FIG 0.n" captions, and related posts get an opener and plate cards.
- **About:** masthead, openers, the prose, a row of three blueprints (a stack, a connected pair, a box) and a hairline grid of the authors.
- **Not found and post not found:** a broken-connector blueprint on a quiet stage, "ERR 404", a heading and a pill back home.
- **Every page** ends with the newsletter as its closing block: a mono label, the closing statement over the dot field, then the form. A failed submit now shows a danger banner above the button and moves focus to the email field. Success shows a small blueprint with a two-tone sentence.
- **Docs:** I added `design-system/` with `VERSION` and `components.md` (conventions, where each piece is used, blueprint subjects, decisions), and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**Measured:** blueprint figures are 273px wide at 1440px and 318px of the 350px column at 390px. The closing statement is one line on desktop and two on mobile. The three blueprint captions sit level.

**Could not apply**
- **Leftover file:** I built the review page as a new file, which the spec says not to do, and I can't delete files with the allowed commands. Its route is gone, but `src/pages/ReviewPage.tsx` is still there.
- **File-name clash:** `blueprint.ts` and `Blueprint.tsx` differ only by capital letter, which collides on Windows. Since I couldn't rename either, I turned on `allowImportingTsExtensions` in `tsconfig.json` and import the component as `Blueprint.tsx`.
- **Shimmer and live indicators** are built but not used anywhere: nothing in the blog is ever "running", and the spec allows them only while work really runs. There are no tables, dialogs or toasts, so those components don't appear either.
- **Body image placeholders** keep `role="img"` and their alt text instead of being hidden from screen readers. The smoke test needs them, and they stand in for real images.
- **One pill on error pages:** the spec's error state has two, but the pages only have one action, so I didn't add a second.

**Decisions I made**
- **New copy:**
  - The closing statement "Follow along. By email." is new; it's short enough to stay within two lines at 390px. The newsletter heading text is unchanged and now sits above it as the mono label.
  - The descriptions next to each section heading are new, each with a small link.
  - "No results" over the empty state is new; the "No posts match these filters" heading itself is unchanged.
- **Plate captions** read "FIG nn · k PARTS": the post's number and its count of sections, which nothing else on the card shows.
- **Brand mark removed:** the header shows the name as text only, and on post pages the Home pill shows as current.
- **Newsletter layout:** one column with a full-width Subscribe pill. I moved the footer line into a hairline strip below it.
- **Smaller calls:** masthead padding is 96/48px (48/32px on mobile). On About the prose comes before the blueprint row. The success state's small blueprint makes four blueprints on About after subscribing, one over the spec's limit of three.