Morning Shapes 0.1.0-rc.5 is now applied to every page of the Hourglade site: Home, Pricing, Customers, Sign up and the 404 page, plus the shared header and footer. The build passes and all 15 smoke tests pass. The screenshots at 1440px and 390px, in light and dark, match the spec, and no page scrolls sideways.

**What I changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `design-system/tokens.css` and loaded first. The old CSS variable names in `src/styles/base.css` still work, now pointing at the new tokens. Dark mode follows the system setting. Figtree and DM Mono load from Google Fonts.
- **Reusable pieces** (`src/components/ms/`, styled in `src/styles/morning-shapes.css`):
  - colour bands with curved edges, including the short title band that opens each inner page
  - the flat shape kit: shaded discs, sparkles, clouds, confetti and initials avatars
  - 6 feature pictograms, 8 different customer-card covers, 3 title-band illustrations, and pictures for the error page and sign-up success
  - slowly breathing icons (glyphs) and a loading indicator
  - every pill-button style, plus tab and filter pills
  - the hero illustration of a calendar week, which builds in once when it scrolls into view
  - a small hook that fades things in once and pauses glyph motion off screen
- **Motion:** all of it stops under `prefers-reduced-motion: reduce`.
- **Colour per area:** Features yellow, How it works blue, Pricing green, Customers orange, Sign up and the 404 page cream. The current page's nav link shows a dot in its colour.
- **Pages:**
  - Home: yellow hero with the calendar illustration, confetti above sections, pictogram cards, step glyphs, three coloured stat tiles, and a pink closing band with the one extra-large button.
  - Pricing: option cards with green ticks, and the comparison table restyled.
  - Customers: covers in each industry's colour, and the filter pills.
  - Sign up: new form controls with error icons, and an envelope picture on success.
  - 404: the spec's error picture.
  - Every page: a cream footer with a dark bottom bar.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md`, and a one-line pointer in `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **Mobile menu:** it has no buttons at the bottom, because a smoke test expects exactly four links in it.
- **Footer bottom bar:** it has no round icon buttons, because the site has nothing for them to link to.
- **FAQ:** answers open instantly rather than sliding open, because the tests depend on how the panel is hidden. The plus sign still turns into ×.
- **404 page:** both its band and the footer are cream, which the spec asks for but which breaks its "no two bands share a colour" rule. I kept them 64px apart.
- **Screenshots:** the hero illustration's chips, star and cloud build in over about 2.75 seconds. The screenshots catch them mid-build, so they appear missing there; I measured them and they are in place.
- **Commits:** I made none, so there is no one-commit-per-screen history. Committing wasn't among the commands I was allowed to run.

**Decisions I made**
- **Sign up colour:** cream, treating it as an account page. Its form submit is the blue button because it converts.
- **Industry colours:** I gave industries their own colours. With all eight stories showing, five colours can be on screen at once, one more than the spec's limit of four.
- **Sign up layout:** I put name and email side by side on desktop so the submit button lands inside the first 900px of the screen. It now ends at 854px.
- **Menu button:** it is now a round icon button. The "Menu"/"Close" text is still there for screen readers.
- **Comparison table:** it keeps the ✓ and — characters, because the tests check that text.

**Cleanup for you:** I couldn't delete files with the commands I was allowed to run. `src/pages/TempPreview.tsx` (an empty leftover from my preview page, whose route is already removed), `src/components/ImagePlaceholder.tsx` and `src/components/IconPlaceholder.tsx` are no longer used and can be deleted.