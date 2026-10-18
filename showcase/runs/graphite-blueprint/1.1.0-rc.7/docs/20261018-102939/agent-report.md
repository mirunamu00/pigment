I've applied graphite-blueprint 1.1.0-rc.7 to every screen: docs home, doc pages, changelog, 404 and the doc-not-found state. Light and dark both follow the device. The build passes, all 16 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in either theme. I looked at every screenshot, fixed what was wrong and snapped again.

Nothing is committed yet. The spec asks for one commit per screen, but you only cleared npm and the snap script to run, and I'm on `main`. Say if you want me to branch and commit.

**What changed**
- **Tokens and fonts:** the styles import the package's `tokens.css` directly, so no value is retyped. The old variable names in `base.css` now point at the new tokens. I added two npm font packages (`@fontsource-variable/inter` and `@fontsource/geist-mono`). They're served from the app itself, with no font CDN and no other libraries.
- **Signature pieces** (reusable, in `src/signature/`):
  - Spotlit stage.
  - Dot-matrix glyph with all six patterns.
  - Hairline blueprints, including a broken-connector version for errors.
  - Spec plate.
  - Split opener and two-tone text.
  - The shimmer and live-edge styles are in place.

  I rendered each piece large in both themes on a temporary edit of the 404 page, checked it against its recipe, then reverted the edit.
- **Docs home:** headline, lead and two pills, then a lit stage holding a `ferrule run` summary window with one running glyph and a blinking caret. Below that:
  - "Browse the docs" with a hairline grid of the four section cards.
  - "Quick start" with its code block.
  - "How a run works" with three captioned blueprints.
  - A closing line ("Cache once. Run less.") over the dot field.
- **Doc pages:**
  - Breadcrumb, headline, description and a meta line, then a wide spec plate.
  - The contents list is a right-hand rail with the current heading marked; on narrower screens it's a closed disclosure after the plate.
  - Callouts are hairline panels with a coloured 16px icon.
  - Parameter tables follow the spec's table style.
  - Steps are numbered in mono (`01`).
  - The package-manager tabs have a sliding underline.
  - Feedback buttons and the pager are restyled.
- **Changelog:** a masthead, then each release as a row with its date in mono. The Added / Fixed / Changed badges have a coloured dot.
- **404 and doc not found:** the error-state layout, with the broken-connector drawing on a quiet stage, "ERR 404", a heading and two pills.
- **Header, sidebar, search:**
  - The header is sticky and translucent, with pill links and Repository as the one dark pill.
  - Search is a pill input; its "no results" state shows the empty glyph.
  - The sidebar has mono group labels and chevrons that rotate.
  - Under 1024px the sidebar becomes a drawer.
- **Measurements:** each blueprint renders 273px wide at 1440px. At 390px it's 318px, 91% of the column. Captions and titles line up across the row. The closing is one line at 1440px and two at 390px.
- **Docs and pointers:** I added `design-system/` (VERSION, tokens, `components.md`), plus `CLAUDE.md` and `AGENTS.md` with the pointer line.

**What I couldn't apply as written**
- **Parameter tables on phones:** the spec's table shows only the first column and a pinned column at 390px, which would hide every description in reference docs. I kept the description as a second line under the name instead.
- **Contents rail width:** the spec puts the rail in from 1024px, but with the sidebar there's no room until 1280px. Below that it's the closed disclosure.
- **Sidebar group opening:** the spec's open animation can't run because the tests rely on the native `hidden` attribute. The chevron still rotates. I also dropped a fade I had added, because it left the links looking faint in screenshots.
- **Shimmer and live edge:** these are styled but unused, since nothing in the docs actually runs.

**Decisions I made myself**
- **Copy:** I added a few short lines for the new home sections, a second hero button, the closing, the error-page buttons and the changelog lead. All existing labels and test text are unchanged.
- **Header:** I removed the small terminal logo mark (the spec wants the name as text). The Menu button is now an icon, with "Menu" kept as its accessible name. On phones the Changelog link moves into the drawer.
- **Doc page details:**
  - The meta line reads "group · N sections", e.g. "Guides · 7 sections".
  - Plate captions read like "NO. 05 · 4 MIN READ".
  - The spec gives no date for the VERSION file, so I used 2026-10-17 from the package manifest.
  - I renamed the blueprint helper file to `geometry.ts`, because it clashed with `Blueprint.tsx` on Windows.