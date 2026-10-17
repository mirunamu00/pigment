I've restyled every screen of Field Notes with Graphite Blueprint, in both light and dark. The build passes, all 9 smoke tests pass, and the final screenshot run shows no sideways scroll at 1440px or 390px. I looked at every screenshot; the not-found page I snapped separately because it isn't a captured route.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `dist/tokens.css`. Inter and Geist Mono load from Google Fonts in `index.html`. Light or dark follows the device setting.
- **Signature pieces** (`src/design/Signature.tsx`, `src/design/drawing.ts`, `src/styles/signature.css`): stage (lit and quiet), dot glyph, dot field and dot meter, blueprint, spec plate, the shimmer / live-edge / pulse / caret classes, opener, screen head and mono labels. All follow the spec's recipes, and loops stop under reduced motion. I reviewed them on a temporary page in both modes. After that review I lengthened the hand-off connector and fixed an awkward line break in the newsletter text.
- **Header and footer:** sticky blurred header with ghost nav pills and a "Subscribe" pill. The newsletter is now a closing section over the dot field, with a green-tinted confirmation box.
- **Home:** split masthead; the featured post as a wide spec plate with text beside it, no card around it; search as a pill field; tag chips; posts in a hairline grid with spec plates and mono dates. The empty search shows a 48px empty glyph.
- **Article:** prose layout, a plate with a "FIG 01" caption for the image placeholder, and a contents list that highlights the section being read. Related posts open with a split opener.
- **About:** split masthead, then "Why we write" with a row of three captioned blueprints (Draft, Edit, Publish). The authors sit in a hairline grid with 32px initials avatars.
- **Not found:** both not-found screens (unknown page and unknown post) show a broken connector on a quiet stage, "ERR 404", and two pills.
- **Docs:** `design-system/VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Running animations:** nothing in the blog does real async work, so no glyph, shimmer, live edge or pulse runs anywhere. The spec forbids faking a working state. The only moving drawing is the About page's Edit connector.
- **Commits:** I couldn't make one commit per screen or remove `src/pages/ReviewPage.tsx`, since git and file deletion weren't among the allowed commands. That review page is no longer routed or imported, but the file still exists. Please delete it.
- **Article image accessibility:** the image placeholder keeps `role="img"` and its alt text instead of the spec's `aria-hidden`, because the smoke tests require an image there.
- **Fonts:** they load from Google Fonts, so if the network is blocked the system font fallbacks are used.

**Decisions I made myself**
- **No lit stage:** the spec's blog row calls for plates and one opener, so the quiet stage appears only on not-found screens.
- **Article header:** a stacked header instead of a split masthead, because long titles would run to four lines in a half-width column.
- **Added links:**
  - a "Subscribe" pill in the header that jumps to the newsletter, hidden under 640px instead of a mobile menu;
  - an "About Field Notes" second pill on not-found screens;
  - a "Browse every post →" link in the related-posts opener.
- **Field height:** the newsletter input is 40px instead of 36px so it lines up with the 40px button beside it.
- **Figure captions:** "FIG 01" is added by CSS, so the caption text the tests check stays exact.
- **Plate captions:** each post's plate reads "NO. 0n / Topic", using its position in the post list and its first tag.
- **Touch targets:** chips, buttons and nav pills reach 44px on touch screens through invisible padding, without changing their drawn size.
- **Moved test ids:** none of the `data-testid` values were renamed, but where markup was restructured (post meta, featured post, article layout) some now sit on different wrapper elements. The tests are unaffected.