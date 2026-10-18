The blog (Field Notes) is restyled with graphite-blueprint@1.1.0-rc.2 across every screen. The build and typecheck pass, all 9 smoke tests pass, and the final screenshot run (every page at 1440px and 390px, light and dark) found nothing scrolling sideways. Light and dark both ship and follow the device setting. I made no commits: `git` isn't in the commands you allowed, so the spec's "one commit per screen" wasn't possible. Everything is uncommitted on `main`.

**What changed**
- **Tokens and root setup:** `tokens.css` is copied unedited into `src/styles/` and `design-system/`. The old CSS variable names point at the new tokens so nothing breaks. Inter and Geist Mono load from Google Fonts. Focus outlines, hover and press states, and the global reduced-motion rule are in place.
- **Signature pieces, as reusable components in `src/design/`:**
  - the lit stage and its caption line;
  - the dot glyph, plus the dot meter and dot field;
  - the blueprint drawings: stack, connected pair, single box and a broken connector;
  - the spec plate, with each post's figure kind computed once over the catalog order;
  - the section opener and screen header;
  - the shimmer, live edge, pulse and caret classes.

  I reviewed them on a temporary page at 2x in light and dark, then deleted the route and file.
- **Header and footer:** a sticky blurred header with pill nav and one dark "Subscribe" pill that jumps to the newsletter. The footer newsletter is now the page's closing section: a centred two-tone statement over the dot field. A failed submit shows the error banner and puts focus back in the email field. Success briefly shows the all-lit dot glyph, then a check.
- **Home:** a split masthead, the featured post as a wide plate with text beside it (no card), a full opener for "More posts", a pill search field, filter chips, a hairline grid of plate cards with mono dates, and a blueprint empty state.
- **Article:** breadcrumb, the post's wide plate under the title, prose styling, a table of contents that highlights the current heading as you scroll, plates for image placeholders, and a "Related posts" opener with plate cards.
- **About:** openers, a row of three captioned blueprints (stack, marching pair, box) and a hairline grid of author cards.
- **404 and missing post:** the broken-connector drawing on a quiet stage, "ERR 404", a heading and two pills.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md`) and `AGENTS.md`/`CLAUDE.md` with the pointer line.

Routes, test ids, label text, form fields and accessibility attributes are unchanged.

**What I couldn't apply**
- **Shimmer, live edge, pulse, caret and the loading glyphs** exist as classes but aren't used. The blog does no async work, and the spec forbids faking a working state.
- **The spec's banner text ("2 fields need attention")** doesn't fit a one-field form. The banner carries the field's own message instead, because the tests check that exact text.
- **The stage settle and slab-lift motions** are left out. They're for landing pages, and the About page keeps the marching pair as its one animation.

**Decisions I made**
- **"Featured" heading:** it's a small mono label above the featured post rather than a full 48px section opener. I treated it as part of the masthead.
- **Closing statement:** it's 32px, not the spec's 72px display size, because the newsletter copy is three sentences.
- **New links:** I added the header "Subscribe" pill, a second pill on the error pages ("About Field Notes"), and one small link in each opener.
- **Brand icon:** the header's small document icon is removed. The spec puts the product name as plain text there.
- **Dot field on mobile:** at 390px it's limited to the side margins so the dots never sit under the form text.
- **`package-lock.json`:** `npm install` created it, and it's left in place.
- **Blueprint widths:** I checked these by eye in the screenshots, not with the measurement the spec asks for. The About figures render at roughly 280px at 1440px.