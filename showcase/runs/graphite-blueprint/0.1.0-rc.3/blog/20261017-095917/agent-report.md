I've restyled the Field Notes blog in graphite-blueprint 0.1.0-rc.3 across Home, both article pages, About and the 404 / post-not-found states, in light and dark. The build passes, all 9 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scroll.

**What changed**
- **Tokens and fonts.** `design-system/tokens.css` imports the package's `tokens.css` unchanged, so no value is retyped. The old variable names in `src/styles/base.css` now point at the new tokens. Inter and Geist Mono are bundled with the app through two font packages, `@fontsource-variable/inter` and `@fontsource/geist-mono`. That is the only dependency change. Light and dark follow the device setting.
- **Signature pieces** live in `src/design/` with their styles in `src/styles/signature.css`: the stage, the dot glyph (with dot field and dot meter), the blueprint drawings, the spec plate, the shimmer / live edge / pulse / caret classes, and the opener and screen-head pieces. I checked each one alone on a temporary page in both themes, then removed that page.
- **Header:** sticky and translucent, with pill nav links, the current page highlighted, and one dark "Subscribe" pill that jumps to the newsletter.
- **Home:** a split masthead; the featured post as a wide plate beside its text with no card around it; a "More posts" opener; pill tag filters and a pill search; post cards in a hairline grid, each with its own plate; dates as mono labels. The empty state uses the 48px empty glyph and a "No results" label.
- **Article:** title header, a wide lead plate, prose type, a code block, and the image placeholder as a plate with its caption. The contents list highlights the section you're reading. Related posts get an opener and the same card grid.
- **About:** two split sections. The first has three captioned blueprints ("Collected", "Edited", "Published"); only the middle connector animates. The authors are in a hairline grid with round initials.
- **404 and post-not-found:** a broken-connector blueprint on a quiet stage, "ERR 404", a heading and two pills.
- **Footer:** the newsletter as a centered two-tone statement over the dot field. A failed submit now shows the error as a banner above the field and moves focus to the email field.
- **Docs:** `design-system/` (VERSION and `components.md`), plus `CLAUDE.md` and `AGENTS.md` with the pointer line.

Every route, label, `data-testid` and accessibility attribute is kept. Two testids moved without changing text: the newsletter error now sits above the field, and the article image's `role="img"` is now on the plate.

**What I couldn't apply**
- **Lit stage, shimmer, live edge, pulse and running glyphs** are built but not used on any page. The blog has no landing hero and nothing that really runs, and the spec forbids fake working states.
- **Two-line limit for big headings:** the long article title wraps to 4 lines at the smallest heading size on a 390px screen.
- **Dot field on mobile:** hidden under 768px, because the text there spans the full width and the dots would sit under it.
- **Error banner wording:** it shows the actual validation message rather than "1 field needs attention", because the tests check the exact text.

**Decisions I made**
- On mobile the two nav links stay as visible pills instead of a menu sheet, since they fit.
- I added three short opener descriptions, the "All posts →" link, and the second pill on the error pages.
- Plate captions read "No. NN · first tag".
- I added the "Subscribe" header pill.
- I made the gaps between sections 96px before each opener, on top of the spec's 160px opener padding. Stacking another 160px looked like an empty band.
- The geometry file is `drawings.ts` rather than `blueprint.ts`. On Windows the two would clash with `Blueprint.tsx`.
- I made no commits, since you didn't ask for them. The spec suggests one commit per screen.

I didn't screenshot the newsletter error/success and search-empty states; the tests confirm they work but I haven't checked how they look. I also didn't emulate reduced motion in a browser: the global reduced-motion rules are in place, with explicit still frames for glyphs, dashes and chevrons, but untested.