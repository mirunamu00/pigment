The blog is restyled to Graphite Blueprint on all five screens: home, article, about, not found and post not found. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 390px. I reviewed the screenshots at 1440 and 390, light and dark. Appearance follows the device setting; there's no theme switch.

**What changed**
- **Base setup:** `tokens.css` is copied in unchanged. Inter and Geist Mono are self-hosted from two font packages I added to `package.json` (no UI libraries). The old style variables now point at the tokens. I also added the global focus outline, the reduced-motion block and hover rules that only apply with a mouse.
- **Signature elements:** each one is a reusable piece in `src/design/`, built from its recipe. The temporary review route used to check them on their own has been removed.
- **Home:** h1 left with a two-tone line right, then the featured post with a FEATURED label and a wide spec plate. "More posts" opens with a split opener, then pill search, filter chips, an uppercase result count and a hairline grid of plate cards. The no-results state uses the dot glyph.
- **Article:** breadcrumb, h1, meta and a wide lead plate. The contents list is a side rail from 1024px and a closed disclosure after the plate on narrower screens. The body text is 17px and 65 characters wide, and starts at the same x as the header name. Related posts get an opener and a plate grid.
- **About:** the same header style, two openers, the prose, a row of three captioned blueprints and a hairline grid of author cards. The three-layer stack lifts once on scroll and the two-box drawing's connector animates.
- **Newsletter (every page):** styled as the page close: a centered large heading over the dot field, with the form under it. A failed submit shows a red banner above the button and moves focus to the email field. The success message shows a small blueprint.
- **Not found pages:** the error empty state, with a broken-connector blueprint on a quiet stage and "ERR 404".
- Every route, label, `data-testid` and accessibility attribute is still there. I also added `design-system/` (version, tokens, `components.md`) and one-line `AGENTS.md` and `CLAUDE.md`.

**Measured** (box sizes from `--measure`):
- Blueprints are 273px wide at 1440 and fill 91% of the column at 390.
- The newsletter heading is one line at 1440 and two lines at 390.
- The article body is 697px wide and starts at x 48, the same as the header name.

**What I couldn't apply**
- **Shimmer, live edge, pulse and caret** are built but not used on any page, because nothing in the blog actually runs and the spec allows them only while work is running. For the same reason the dot glyph appears only as the still "empty" frame.
- **Lit stage:** no page is a landing page, so the only stage is the quiet one on the not-found pages.
- **Contents disclosure** opens and closes without the row-height animation.
- **No commits:** the spec asks for one commit per screen, but I didn't commit anything because you didn't ask me to. Everything is uncommitted in the working tree.

**Decisions I made**
- **Logo removed:** I removed the decorative header logo (it was hidden from screen readers), since the spec puts the product name in as plain text.
- **New copy:**
  - opener descriptions and links for More posts, Related posts, Why we write and The authors
  - the three blueprint titles and captions on About
  - the "Newsletter" and "No results" labels
- **Two-tone splits:** I split the existing one-sentence intro lines on Home and About into a bright lead phrase and a muted remainder.
- **Plate captions** read like "FIG 03 · 2 PARTS": the post's number plus its count of main sections, which nothing else on the card shows.
- **Error message:** "Enter your email address." is now shown as the red banner rather than repeated under the field, so it stays the single `role="alert"`.
- **Figure caption test id:** in article figures, `figure-caption` moved from the caption element to an inner span so the FIG number can sit beside it. The text the test checks is unchanged.
- **Behaviour additions:**
  - focus moves to the email field on a failed submit
  - the current heading in the contents list is highlighted as you scroll
  - the Home nav link shows as current on article pages