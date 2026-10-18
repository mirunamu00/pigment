The restyle is applied to every screen: Home, both captured articles, About, and the two not-found pages. The build passes, all 9 smoke tests pass, and the final snapshot run shows no sideways scroll at 1440px or 390px, light or dark.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is a verbatim copy of the spec's file. Light and dark follow the device setting. Inter and Geist Mono are self-hosted from two npm font packages, which I added to `package.json`. The old variable names in `base.css` now point at the new tokens.
- **Signature elements:** all six are built as reusable pieces in `src/design/`, using the spec's code as written in `src/styles/signature.css`.
- **Home:** a header block with the title on the left and a two-tone lead on the right. The featured post has a FEATURED label over a wide figure, with no card around it. "More posts" opens with the split heading, then a pill search box, filter chips, the post count in mono, and a grid of post cards each with its own figure. The no-results state uses the dot glyph.
- **Article:**
  - Breadcrumb, tags, h1, meta with the date in mono, and a wide lead figure.
  - From 1024px wide, the contents list is a rail on the right that marks the heading being read. Below that width it is a closed disclosure after the lead figure.
  - The in-body image is a figure of a kind not used anywhere else on that page.
  - Related posts open with the split heading.
- **About:** the same header block, three sections with split headings, a row of three blueprint drawings (a stack, a connected pair with a moving connector, and a single box), and a grid of author cards.
- **Not found:** a broken-connector drawing on a dim panel, "ERR 404", a heading and two pill buttons.
- **Every page:** a sticky blurred header, and a newsletter closing over a dot pattern: "New post? One email.", the form, and two pill buttons.
- **Motion:** the connector animation stops under reduced motion, and so do the other effects (the spec's global block).
- **Docs:** `design-system/` holds the tokens, `VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

Every test id, label, route and accessibility attribute is kept. Two test ids moved onto a child element:
- `figure-caption` now sits on the caption-text span, so the "FIG 01" label doesn't change the text the test checks.
- `newsletter-error` stays on the field message, next to a new "1 field needs attention" banner.

I compared each signature piece against its recipe on a temporary review route, then removed the route.

**What I couldn't apply**
- **Unused effects:** nothing in this app really runs in the background, so the shimmer, live edge, pulse, running dot glyphs and button loading state exist but aren't used. The bright product panel isn't used either, because a blog has no product screen to show.
- **Headline rules:** post titles in the data are title case and run to three lines at 390px, against the spec's sentence case and two-line maximum. I left them because the titles are content and the tests check them.
- **Data file:** I added a small `wordCount` helper to `src/data/posts.ts` for the figure captions.
- **Not done:**
  - Separate commits per screen: everything is still uncommitted.
  - The spec's measured-number checks.
  - A run with reduced motion turned on.
  - Tabbing through every screen by hand.

**Decisions I made**
- **Mobile header:** I kept both nav pills visible at 390px instead of a menu sheet. With two items they fit, and the spec also asks for every nav item to be visible.
- **Figure captions:** they read "NO. nn · <word count> WORDS", because the word count appears nowhere else on the screen.
- **Tags:** shown as mono labels joined by " · " rather than chips.
- **Article image:** it keeps `role="img"` and its alt text, which the tests need, although the spec otherwise hides figures from screen readers.
- **Newsletter alerts:** both the field error and the banner are `role="alert"`, so screen readers announce both.
- **Newsletter dot pattern:** it covers only the band behind the label and statement, so it never sits under form text.
- **Added copy:** the newsletter statement, the section descriptions, the blueprint captions, and a header Subscribe button that jumps to the newsletter.

These decisions are also recorded in `design-system/components.md`.