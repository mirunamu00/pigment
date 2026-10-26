I've applied Morning Shapes 0.1.0-rc.2 to all four routes: home, article, about and not-found. The build passes, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark. I checked the screenshots of every page in all four combinations. The changes are not committed, so the "one commit per screen" step from the spec is still open for you.

## What changed
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` unchanged. Light and dark follow the system setting, and `data-theme` can force either. The old variable names in `base.css` still work as aliases. Figtree and DM Mono load from Google Fonts.
- **Signature pieces, built as reusable components** in `src/components/ms/` and `src/styles/morning-shapes.css`:
  - **Color bands:** full-width bands whose edges curve down below the top bar or curve up into the page above, a wave edge for night bands, compact header bands, and rounded panels.
  - **Flat shapes:** discs with a darker crescent shade, sparkles, clouds, hexagons, spot plates, confetti, initials avatars, the error drawing, and 14 pictograms drawn from the blog's own subjects.
  - **Breathing glyphs:** six glyphs plus a three-dot loader. They pause off-screen and stop under reduced motion.
  - **Pills:** every pill variant, plus filter pills and circle buttons.
  - **Vignette and fade-in:** the home vignette builds card by card, and decoration fades in on first view. Both are triggered by `src/lib/motion.ts`.
- **Screens:**
  - **Top bar:** sticky, gets its shadow after 8px of scroll, and the current page shows a colored dot.
  - **Home:** a yellow hero band with a blue and a white pill and the vignette. Then the featured post on a cream section, a confetti heading for "More posts", a pill-shaped search box and filter pills, cream cards with covers, and a yellow panel for "no results".
  - **Article:** a yellow header band containing the title, meta and tags, with a shape group on the right. Wider prose, a cream table of contents, and figures drawn as covers.
  - **About:** a blue header band, a spot plate next to "Why we write", and author cards with initials avatars.
  - **Not found and post-not-found:** a cream band with the error drawing and a dark pill back home.
  - **Footer:** a cream band with links and the newsletter form, and a dark bottom bar with a back-to-top circle.
- I added `design-system/` (VERSION, tokens, `components.md` with the hue map and pictogram list) and the pointer line in `AGENTS.md` and `CLAUDE.md`. The temporary `/__kit` page I used for close-up snapshots has been removed. (The ~650px sideways scroll it reported on mobile came from the kit page's own fixed-width test layout.)

All routes, labels, form fields, `data-testid`s and ARIA attributes are kept. The DOM changes are:
- The article header band now sits inside the `<article>` element.
- The error and success messages get a small icon before their text.
- New links: Subscribe and Read featured in the hero, two footer links, and back to top.

## What I couldn't apply fully
- **At most four category colors per view:** the blog has five topics, so the home page can show five.
- **Choice rows:** the CSS exists, but the blog has no choice lists to use them on.
- **Closing call-to-action band with an extra-large pill:** not added. The footer's subscribe form fills that role.
- **Footer bottom bar:** the spec calls for round icon buttons. The only one here is back to top.
- **Screenshots catch the vignette mid-build:** it takes about 2s to finish, so its later cards look faded in the PNGs. On screen it completes; with reduced motion it shows complete at once.

## Decisions I made
- **Colors by area:** Home and every article are yellow, About is blue, and utility pieces (footer, error pages) are cream. The topics continue the colour order: engineering green, design orange, writing violet, process pink. Remote work wraps around to yellow, so it shares Home's colour.
- **Article bands:** all are Home yellow. The shape group's layout changes with the post's first topic, so bands don't all look the same.
- **Home counts as a front page:** it gets a full hero band with a large headline rather than a compact header band.
- **Tags:** they're filled in their topic color. Inside a color band they turn white with a colored dot.
- **Covers:** every post card gets a cover in its first topic's color. The old grey image placeholder is now a cover with a pictogram, and its alt text is kept.
- **Fade-ins:** content already on screen fades in immediately. Content further down is only hidden after the first scroll, so it is never invisible without script or in full-page screenshots.
- **Tokens:** I import the tokens from `design-packages/` instead of copying them. Removing that folder would break the styles.
- **Phones:** a header band's shape group moves below the text and shrinks to 140px.