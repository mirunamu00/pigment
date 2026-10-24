Graphite Blueprint is now applied to all four screens: home, article, about and not-found. Each works in light and dark (following the device setting) at desktop and mobile. The build passes, all 9 smoke tests pass, and the final snapshot run reports no sideways scroll. I compared the screenshots with the spec; the only problem they showed was missing spaces around "·" in the post meta line, which is fixed.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css` (checked with a diff). The old CSS variable names now point to the new tokens. Inter and Geist Mono load from two npm font packages I added (`@fontsource-variable/inter`, `@fontsource/geist-mono`), not from a CDN.
- **Signature pieces:** each is a reusable piece in `src/design/`, built from the spec's recipes, with its CSS in `src/styles/signature.css`. Every looping animation stops under reduced motion.
- **Header, closing and footer:** the header is sticky with blur, has pill nav and a "Subscribe" pill, and becomes a menu sheet under 768px. The newsletter is now the page's closing: "New posts. One email." centred over the dot field, with two pills. A failed submit shows an error banner and moves focus to the email field. Success shows the "done" dot frame, then a check.
- **Home:** the title sits left with its description right. Then a "FEATURED" label over a wide spec plate, an opener for "More posts", a pill search box, filter chips, an uppercase mono result count, and a grid of cards with plates. The empty search result shows the empty dot glyph.
- **Article:** breadcrumb, title, meta and a wide lead plate. The contents list is a side rail that highlights the current section, and becomes a closed "On this page" panel under 1024px. Article images are spec plates numbered "FIG 0.1". Related posts get an opener and the card grid.
- **About:** the same split header, three sections with openers, and a row of three blueprints (a stack, a marching connected pair, a box). Author cards sit in the hairline grid.
- **Not found** (both the page and a missing post): a broken-connector drawing on a quiet stage, "ERR 404", a heading and two pills.
- **Docs:** `design-system/` has `VERSION`, the tokens and `components.md`, plus the pointer line in new `AGENTS.md` and `CLAUDE.md` files.

**What I couldn't apply**
- **One commit per screen:** git wasn't on your list of allowed commands, so nothing is committed. Everything is in the working tree.
- **Title case:** post titles stay in Title Case because the tests check the exact text.
- **Shimmer, live edges, pulse and caret:** these are built but not used anywhere, because nothing in the blog actually runs in the background. The same goes for the lit stage, which the blog layout doesn't call for.
- **Error banner announcement:** the spec gives the banner `role="alert"`. The existing error message already has that role and I had to keep it, so the banner has none, to avoid announcing the error twice.
- **Contents panel:** the "On this page" panel opens and closes instantly; only its chevron animates.
- **Spec review steps:** I didn't render each signature piece alone at 2x, and didn't measure the blueprint widths in a browser. I checked them in the full-page screenshots instead.

**Decisions I made**
- **New text:**
  - descriptions for every section opener;
  - the "How a post gets made" section on About, with its three captions;
  - the closing statement and its second pill ("Meet the authors", or "Read the latest" on the About page);
  - a "Subscribe" pill in the header;
  - a footer link column;
  - a second pill on the 404 pages.
- **Removed:** the small logo icon next to "Field Notes", since the spec bans logos.
- **Featured post:** the "Featured" heading became a mono label, as the spec requires.
- **Plate captions** read `NO. 0n · FIRST TAG`.
- **Tap targets:** buttons and chips are enlarged to 44px only on touch screens.
- **404 snapshots:** I snapped a non-existent path rather than adding a temporary route. That path was only passed to the snapshot command, so nothing in the code needs removing.