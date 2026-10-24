I've applied graphite-blueprint 1.2.0-rc.4 to every screen. The build passes, all 9 smoke tests pass, and the final screenshots show no page scrolling sideways at 1440px or 390px, in light or dark. I didn't commit anything: everything is uncommitted on `main` so you can review it first. The spec asks for one commit per screen, and I can split it that way if you want.

## What changed
- **Setup:** I copied `tokens.css` unchanged into `src/styles/` and pointed the old CSS variable names at the new tokens. Inter and Geist Mono are now served from the project itself, via two npm font packages added to `package.json`. Light and dark both follow the device setting. `base.css` sets up the root styles, focus outline, sticky blurred header and the reduced-motion rules.
- **Signature elements** (`src/signature/`, `src/styles/signature.css`): all six are built to their recipes as reusable pieces: the lit stage, the dot glyph (plus the dot meter and dot field), blueprints (including `pair`), spec plates, the shimmer and live indicators, and the section headers (opener, masthead, screen head). Loops stop under reduced motion, and the stage and blueprint entry motion are skipped there.
- **Home:** a masthead with a two-tone lead, then the featured post marked "FEATURED" over a wide spec plate. Below that, a split opener and the search and tag filters. Posts sit in a grid of cards with spec plates. The result count is a mono label, and the empty state uses the empty dot glyph.
- **Article:** breadcrumb, title, mono meta line and a wide lead plate. The contents list is a right-hand rail from 1024px up, and a closed disclosure below the plate on smaller screens; it highlights the section you're reading. The inline image is now a spec plate with a "FIG 1" caption. Related posts get an opener and the same card grid.
- **About:** a masthead, then the "Why we write" opener and text, followed by a row of three captioned blueprints (a stack, a connected pair, a box). The authors are in a card grid.
- **Not found** (unknown pages and unknown posts): a broken-connector drawing on a quiet stage, "ERR 404", a heading and two buttons.
- **Newsletter (bottom of every page):** a two-sentence closing statement over a dot pattern. A failed submit shows a "1 field needs attention" banner and moves focus to the email field. Success shows a small drawing and a two-tone sentence.
- **Docs:** I added `design-system/` (`VERSION`, the tokens, `components.md`) and created `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Measured at 1440px and 390px:**
- The blueprint drawings are 273px wide at 1440 (spec: about 270, at least 240) and 318px of a 350px column at 390 (91%, spec: at least 85%).
- At 1440 each closing sentence fits on one line; at 390 the statement takes two lines.

## What I couldn't apply
- **Unused pieces:** the shimmer, live dot, caret, live edge, dot meter and the three looping glyphs are built but not used anywhere. The blog has nothing running, no live data and no 1-to-5 levels, and the spec says not to invent any.
- **Long titles:** article titles at 32px on a phone take more than the spec's two display lines.
- **Touch targets:** the tag filter buttons are 32px tall, not 44px.
- **Image accessibility:** the inline article image keeps `role="img"` and its alt text instead of being hidden from screen readers as the spec says for plates. A test requires it, and it stands in for real content.

## Decisions I made
- **Closing copy:** the newsletter heading "Subscribe to the newsletter" became the small label above a new statement, "Read along. By email.". I kept it that short so each sentence fits one line at 48px on a 390px phone.
- **New copy:**
  - the second sentence of each masthead lead
  - the opener descriptions
  - the blueprint titles on About
  - a second "About Field Notes" button on the not-found pages
  - the "1 field needs attention" banner text
- **Plate captions** show the post number and word count (for example `01 · 585 WORDS`), since nothing else on the page shows word count.
- **Field error alert:** the field error keeps its original `role="alert"`, so the form now has two alerts: the banner and the message.
- **Test ids moved:** the figure caption's test id moved to an inner span next to the "FIG 1" label. The text is unchanged and the tests pass.
- **Brand logo removed:** I took out the small logo icon in the header, because the spec wants the product name as text.
- **Spacing:** the masthead padding (96px above, 32px below) isn't in the spec, so I picked it.
- **Data change:** I added a `wordCount()` helper to `src/data/posts.ts`; `readingTime()` now uses it.
- **Date:** `VERSION` uses today's date, because the spec gives no update date.

The temporary review route I used to check the pieces on their own has been removed.