The blog is restyled to graphite-blueprint 1.2.0-rc.4 across Home, both articles, About and the 404 page. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in either light or dark. I checked the screenshots of every page against the spec, plus a temporary page showing the signature pieces on their own, which I've since removed. The changes are not committed, so the one-commit-per-screen rollback the spec describes isn't there yet.

**What changed**
- **Foundation:** the package's `tokens.css` is copied into `src/styles/` unchanged, and the old CSS variable names now point at those tokens. Light and dark follow the device setting. Inter and Geist Mono are self-hosted from two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), with no font CDN. The global focus outline, reduced-motion rules and `overflow-x: clip` are in place.
- **Signature elements**, each a reusable piece in `src/design/` with its CSS in `src/styles/signature.css`: spotlit stage, dot glyph (all six patterns, plus dot field and dot meter), isometric blueprint, spec plate, and the opener/masthead/two-tone pieces. The shimmer and live-edge styles are built but unused.
- **Header and footer:** a sticky translucent header with pill nav, and the Home pill is also marked current on article pages. The newsletter is now the page close on every page: a mono label, a two-sentence statement over the dot field, then the form. Its error is a danger banner above the button, and focus moves to the email field.
- **Home:** a masthead, then the featured post with a "FEATURED" label and a wide plate. "More posts" has an opener, a pill search, filter chips and a mono "SHOWING n OF n POSTS" count. The posts sit in a hairline grid of cards with plates (3, 2 or 1 columns by width). The no-results state uses the empty glyph.
- **Article:** breadcrumb, title, meta, then a wide lead plate. The contents list is a sticky rail from 1024px and a closed disclosure after the plate below that, and it highlights the section you're reading. In-text images became plates with a "FIG 0.n" caption. Related posts get an opener and the card grid.
- **About:** masthead, then a row of three captioned blueprints (stack, a connected pair with marching arrows, and a box). The prose follows, then the authors in a hairline grid.
- **404 and unknown post:** a broken-connector drawing on a quiet stage, "ERR 404", a heading and two pills.
- **Docs:** added `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**Measured:** the blueprint figures are 273px wide at 1440px and 318px (91% of the column) at 390px, both within spec. At 390px the closing statement takes exactly two lines, and each sentence fits on its line (328px and 200px in a 350px column).

**Spec items I couldn't apply**
- **Running glyphs, shimmer, live edge, pulse, lit stage:** nothing in the blog actually loads or runs, and it has no landing hero, so these stay unused rather than faked.
- **Article image placeholders aren't hidden from screen readers:** the spec hides plates, but I kept `role="img"` and the alt text because the tests and accessibility attributes depend on them.
- **The disclosure has no open/close animation:** a closed `<details>` element doesn't render its content, so only the chevron rotates.
- **No version date:** the package doesn't give an update date, so `design-system/VERSION` records the apply date instead.

**Decisions I made**
- **Closing statement:** I wrote "Get new posts. By email." as the two sentences. The old heading "Subscribe to the newsletter" became the mono label above it, and the original description line stays as the secondary line.
- **Copy I added:** a one-line description with a "→" or "↓" link for each opener, the three blueprint captions, "NO RESULTS", and a second "About Field Notes" pill on the error pages.
- **Header:** I added a "Subscribe" pill linking to the newsletter, hidden under 768px, and dropped the small logo icon because the spec asks for the name as plain text.
- **Plate captions** read like `FIG 2 · 3 SECTIONS`: the post's number and its section count, which nothing nearby shows. I dropped the leading zero to stay within 18 characters.
- **One alert, not two:** the newsletter error banner is the existing error message itself, so the `newsletter-error` test id and `role="alert"` stay on one element.
- **Moved elements:** the figure-caption test id moved to an inner span, and on cards the meta line now sits above the title.
- **Authors** show initials avatars, not plates, because the spec says plates mustn't invent facts about people.
- **Blueprint count:** after subscribing on About, the page briefly shows four blueprints, one over the limit of three.
- **Windows file names:** the geometry files are named `blueprintGeometry.ts` and `plateFigures.ts`, because Windows treats `blueprint.ts` and `Blueprint.tsx` as the same name.