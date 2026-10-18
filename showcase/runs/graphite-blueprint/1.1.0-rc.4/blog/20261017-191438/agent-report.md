Graphite Blueprint is now applied to every screen of the blog, in both light and dark (they follow the device setting). The build passes, all 9 smoke tests pass, and the final screenshot run reports no sideways scroll at 1440px or 390px.

## What I changed
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. `src/styles/base.css` is rewritten on top of it, with the old variable names (`--color-bg`, `--color-link`, …) pointing at the new tokens. I added two self-hosted font packages, `@fontsource-variable/inter` and `@fontsource/geist-mono`; there is no font CDN.
- **Signature elements**, each a reusable piece in `src/design/` built from the spec's recipes:
  - spotlit stage (`Stage.tsx`)
  - dot glyph, dot meter and dot field (`DotGlyph.tsx`)
  - isometric blueprints, plus a broken-connector version for errors (`Blueprint.tsx`, `recipes.ts`)
  - spec plates (`SpecPlate.tsx`)
  - shimmer, live edge, pulse and caret (`Live.tsx`)
  - section openers, two-tone text and screen heads (`Opener.tsx`)
- **Screens:**
  - **Header:** sticky and blurred, with nav pills and a dark "Subscribe" pill that jumps to the newsletter.
  - **Footer (every page):** the closing statement "New posts. One email." over the dot field, with the newsletter form.
  - **Home:** split masthead, then a split heading for each section. The featured post is a wide plate beside its text. Search is a pill, tag filters are chips, posts sit in a hairline grid of plate cards, and the empty state uses the dot glyph.
  - **Article:** breadcrumb, title, mono date and a wide lead plate. The contents list is a side rail on wide screens and a closed disclosure after the plate on narrow ones. Below the post: the body figure as a plate with a FIG caption, and related posts.
  - **About:** a row of three captioned blueprints, of which only the connected pair animates. Authors sit in a hairline grid.
  - **Not found / post not found:** the broken-connector blueprint on a quiet stage, "ERR 404", and two pills.
- All loops stop on a readable frame under `prefers-reduced-motion`.
- Added `design-system/VERSION`, `design-system/components.md`, and the pointer line in `AGENTS.md` and `CLAUDE.md`.
- I checked each piece alone on a temporary `/__review` route and removed it afterwards. The screenshot review caught one bug: the author grid kept the browser's default list indent. That is fixed.

## What I could not apply
- **Commits:** the spec wants one commit per screen, but git wasn't in your list of allowed commands, so everything is uncommitted.
- **Blueprint widths:** the spec asks for widths measured in the browser, and I could only run your listed commands. Computed from the CSS, each drawing is about 273px at 1440px and about 318px at 390px, within the limits.
- **Running and live effects** (shimmer, live edge, pulse, running glyphs): nothing in the blog actually runs, so they are built but not used.
- **Title-case titles:** post titles in the mock data are title case and become 3–5 lines on mobile. I left the data unchanged.
- **Error banner wording:** a failed newsletter submit shows the specific message ("Enter your email address.") rather than "1 field needs attention", because the tests read that exact text. It is styled as the spec's banner, and focus now moves to the field.

## Decisions I made
- **Newsletter heading:** the h2 keeps its text "Subscribe to the newsletter" as a small line above the closing statement. The spec caps the statement at 24 characters and the heading is 27. Its paragraph became the field's helper line.
- **Header:** I removed the decorative brand icon (the spec asks for the name as text) and added the "Subscribe" pill.
- **Contents list position:** it moved inside the `<article>` so it can sit after the lead plate on narrow screens. It also highlights the section you're reading.
- **Dot field:** hidden under 768px so it never sits under text.
- **Error pages:** the second pill links to About.
- **Spacing:** 96px above each section's hairline, and 96px between the search/filter row and the section heading above it.
- **Plates:** numbered by each post's position in the full list, labelled with its first tag; body figures use their alt text as the id.