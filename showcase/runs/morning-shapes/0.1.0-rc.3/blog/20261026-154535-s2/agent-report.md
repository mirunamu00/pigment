I've restyled the Field Notes blog with Morning Shapes on every screen, in light and dark. The build passes, all 9 smoke tests pass, and the final snapshot run lists no page that scrolls sideways. I looked at the screenshots at 1440px and 390px, light and dark, and fixed what was wrong. I also checked the empty-search state and the 404 page through a temporary route, which I've since removed.

## What changed
- **Tokens:** `design-system/tokens.css` imports the package's `tokens.css` unchanged, so nothing was retyped. Dark mode follows the system setting, and `data-theme` on the root forces either mode. The old variable names in `base.css` still work as aliases. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Reusable pieces**, in `src/components/shapes/`, `src/motion.ts` and `src/styles/morning-shapes.css`:
  - colour bands with curved edges, plus panels;
  - the shape kit: shaded discs, sparkles, clouds, two-colour discs, confetti, a header cluster per area, an error picture and an empty-state picture;
  - post covers with seven different pictures, one per post subject;
  - breathing glyphs (they pause off-screen) and every pill variant, including filter pills;
  - the vignette, and the fade-in helper.
  - All motion stops under reduced motion.
- **Area colours:** Home and its articles are yellow; About is blue (navigation order). Tags have their own colours: Engineering blue, Design pink, Writing green, Process orange, Remote work violet.
- **Screens:**
  - **Top bar:** white and sticky; it gets a shadow after you scroll, and the current area shows a coloured dot.
  - **Home:** yellow hero band with a sun picture and two pills, then the featured card with its cover, a confetti heading, a pill-shaped search box, filter pills, a three-column card grid, and a cream empty-state panel.
  - **Article:** yellow header band holding the breadcrumb, meta and tags, then a 20px reading column, a cream contents panel with a glyph, illustrated figures and related cards.
  - **About:** blue header band, a pink vignette panel, and author cards with initials on a shaded disc.
  - **404 and "post not found":** a cream band with a rain-cloud picture and an ink pill home.
  - **Footer:** cream band with the newsletter form and links, then a dark bottom bar with a back-to-top circle.
- I added `design-system/` (`VERSION`, `components.md`) and the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

Every route, label, `data-testid`, form field and accessibility attribute is kept. Two small data and markup changes: figure blocks in `posts.ts` got an optional `art` field to pick their drawing, and the newsletter section got `id="newsletter"`.

## Not applied, or with a caveat
- **No commits.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so all changes are uncommitted.
- **Leftover file:** `src/pages/TempEmpty.tsx` is an empty placeholder from the temporary review route, because I couldn't run `rm`. Please delete it.
- **Hue count:** the five tags need five colours, so Home shows more than the spec's limit of four category hues per screen. About's blue is also the Engineering tag's blue.
- **Vignette in screenshots:** the About vignette builds over about two seconds, as the spec times it. The snapshots catch it partway, so a card or two looks faded or missing; in the browser it finishes.
- **Fonts:** they come from Google Fonts. Offline, the page uses the spec's fallback fonts instead.

## Decisions I made
- I treated Home as a front page (full hero band) and articles as part of the Home area (yellow band; the Home dot stays lit on articles).
- I added a few pieces of text:
  - hero pills "Start reading" (blue) and "Get the newsletter";
  - a line under "More posts": "Search the archive or pick a topic.";
  - an "Explore" link list in the footer;
  - the vignette's example messages.
- The empty state uses a cream panel rather than yellow, since the spec says cream when another colour band may be on screen.
- Tag badges are white with a coloured dot, because cream badges disappear on cream cards. On a colour band they stay white with dark text in both modes.
- Navigation links stay visible on phones instead of moving into a menu, since there are only two.
- The contents-panel glyph is orange rather than the area's yellow, so it shows up on cream.
- Figures with no real image are drawn on a cream frame instead of a coloured field, so an article never shows two large colour fields at once.