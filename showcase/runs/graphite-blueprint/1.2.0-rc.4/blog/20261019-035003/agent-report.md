I restyled the whole blog with Graphite Blueprint: Home, both articles, About, the not-found pages and the newsletter footer, in light and dark. The build passes, all 9 smoke tests pass, and the last full screenshot run found no page that scrolls sideways at 1440px or 390px.

## What changed
- **Setup:** the tokens are copied into `design-system/tokens.css`, and the old variable names in `base.css` now point to them. Inter and Geist Mono are self-hosted from npm (I added two font packages to `package.json`). Light or dark follows the device setting; there's no theme switch, because the blog never had one.
- **Signature pieces:** built from the spec's recipes as reusable parts in `src/design/`, `src/components/ds/` and `src/styles/signature.css`: stage, dot glyph, blueprint, spec plate, shimmer/live-edge styles, and the openers.
- **Home:** h1 with a two-tone line beside it, then the featured post (labelled FEATURED, image placeholder plus text, no card). "More posts" opens with a hairline and a headline-plus-description row. Then a pill-shaped search, filter chips, the post count in mono caps, and a 3-column grid of cards with image placeholders. The no-results state shows the dot glyph and a "Clear filters" pill.
- **Article:** breadcrumb, h1, author/date line, tags and a wide image placeholder. The contents list is a side rail from 1024px wide and highlights the section you're reading; below that width it's a closed drop-down after the image. Body figures get a "FIG 01.1" caption. Related posts use the same card grid.
- **About:** the "Why we write" text, a row of three captioned blueprint drawings ("How a post ships"; only the middle one moves), and a grid of author cards.
- **Every page:** the newsletter is the page close: "**Get new notes.** Nothing else." over a dot field, with the original wording as the small label above it. A failed submit shows a red-dot banner above the button and puts focus back in the email field; success shows a small blueprint and a two-tone sentence.
- **Not found / unknown post:** a drawing of a broken connection on a quiet stage, "ERR 404", a heading and two pills.
- **Docs:** `design-system/VERSION` and `components.md` (conventions, where each piece is used, decisions), plus the pointer line in new `AGENTS.md` and `CLAUDE.md`.

Every route, test id, label text and accessibility attribute is kept. The figure-caption test id moved from the `<figcaption>` to a span inside it so the caption text stays exact. Animations stop on their resting frame under reduced motion.

**Checked by measurement:** the About drawings render 273px wide at 1440px (the spec asks for about 270, at least 240). At 390px each fills 318px of a 350px column (spec minimum 85%), and the three line up along their bottom edge.

## What I couldn't apply
- **Commits:** none were made. The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run.
- **Shimmer, live edge and pulse:** the styles exist but nothing uses them, because nothing in the blog does long-running work and the spec allows them only then.
- **Lit stage and blueprint lift:** the blog has no landing hero or product screen, so the only stage is the quiet one on the error pages, and no drawing lifts.
- **Error and success states not screenshotted:** the screenshot tool can't fill in the form, so I checked those states only through the tests.

## Decisions I made
- **Header:** with only two nav items and no main action, I kept inline nav pills at every width instead of a menu sheet. Both fit at 390px.
- **Small avatars:** 20px instead of 16px, because two initials at the spec's smallest font size don't fit in 16px.
- **Error banner wording:** the form has one field, so the banner shows that field's own message (which the tests expect) instead of "N fields need attention".
- **Placeholder captions:** they read "FIG 01 · 4 PARTS" (post number and its count of top-level sections), since nothing else on the page shows that count.
- **Extra pill on error pages:** I added an "About Field Notes" pill so they have the two pills the spec's error state calls for.
- **Copy:**
  - I wrote the closing statement and the short descriptions under each section headline.
  - The masthead lines keep their original wording, with the first clause highlighted.
  - The no-results heading became a two-tone sentence.
  - I dropped the logo icon next to "Field Notes" in the header, since the spec asks for the name as text.
- **Review page:** I checked each signature piece on its own by temporarily editing the not-found page, then reverted it. No review code remains.
- **Version date:** the spec gives no update date, so `design-system/VERSION` uses today's date.