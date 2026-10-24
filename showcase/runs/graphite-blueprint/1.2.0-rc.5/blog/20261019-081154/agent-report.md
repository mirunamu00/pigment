I've restyled every screen of Field Notes with Graphite Blueprint, in light and dark (it follows the device setting). The build and typecheck pass, all 9 smoke tests pass, and the final screenshot run shows no sideways scroll on any page at 1440px or 390px. I compared every screenshot with the spec, including mobile and dark.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`, loaded first. The old variable names in `src/styles/base.css` now point at the new tokens. Inter and Geist Mono are self-hosted from two npm font packages I added to `package.json` (`@fontsource-variable/inter`, `@fontsource/geist-mono`). The root setup, focus ring and reduced-motion block follow the spec.
- **Signature elements:** all six are built to their recipes as reusable pieces in `src/components/signature/`, with their CSS in `src/styles/signature.css`. I checked them on their own on a temporary route in light and dark, then removed the route.
- **Header and footer:** sticky translucent header with the name as text and pill nav. Home stays highlighted on article pages. The newsletter block is now the page close on every page: the label "Subscribe to the newsletter" over the dot field, the statement "Get every post. Nothing else." (one line per sentence at 1440, two lines at 390), and a one-column form. A failed submit shows the error banner above the button and moves focus to the email field. Success shows a small blueprint and a two-tone sentence.
- **Home:** masthead, a "FEATURED" label over a wide plate and the text, a "More posts" opener, search pill, filter chips, a mono result count, and a grid of plate cards. The empty search result shows the 48px empty dot glyph.
- **Article:** breadcrumb, a full-width h1, meta, then a wide lead plate. The contents list is a right rail from 1024px up; below that it's a closed "On this page" disclosure after the plate. The in-text image placeholder is a plate with a numbered caption. Related posts get an opener and a card grid.
- **About:** masthead, then a row of three blueprints (Archive, Edit pass, Inbox; only the connector animates), the prose, and a grid of author cards. At 1440 each drawing measures 273px wide; at 390 it's 318px of a 350px column, both inside the spec's limits.
- **Not found and unknown post:** a broken-connector blueprint on a quiet stage, "ERR 404", a heading, a two-tone sentence and two pills.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and the pointer line in new `AGENTS.md` and `CLAUDE.md`.

All routes, behaviour, test ids, label text used by the tests, form fields and accessibility attributes are kept.

**What I couldn't apply**
- **Commits:** the spec wants one commit per screen, but git wasn't among the commands I was allowed to run, so nothing is committed.
- **Shimmer and live dots:** they're built but not used anywhere. Nothing in the blog actually runs, and the spec forbids faking a working state.
- **Lit stage:** not used, because there's no landing hero and no product UI to show. The only stage is the quiet one on the error pages.
- **Headings:** post titles stay in title case, against the spec's sentence-case rule, because they come from data the tests check.
- **Font weights:** 510 and 590 depend on Inter's variable font, so a fallback font would show the nearest weight.

**Decisions I made**
- **Error banner:** it has no `role="alert"`. The existing field message already has one, and two alerts would be read out twice.
- **Mono labels as headings:** the "Featured" and "On this page" headings stay as headings but look like mono labels, to keep the page's heading structure.
- **Copy:** the spec requires a description, and usually a link, for every opener and error state, so I wrote short new ones ("The rest of the archive, newest first…", "Who writes these →", and so on). I also added a second pill, "About Field Notes", on the error pages, and wrote the page-close statement and the blueprint captions.
- **Plate captions:** they read like `FIG 03 · 2 PARTS`, using the post's section count, which no other label on the screen shows.
- **Contents list:** there's a single list that works as both the rail and the mobile disclosure; two copies would break the contents-list test.
- **Header:** I dropped the old icon next to the name, because the spec asks for the product name as text.
- **Touch targets:** nav pills and filter chips are 32px tall, so each gets an invisible extension to reach a 44px tap area.