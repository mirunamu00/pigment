Morning Shapes is now applied to all four pages and the 404 page. The build passes and all 16 smoke tests pass. The last snapshot run found no sideways scrolling, and I checked the screenshots at 1440px and 390px in light and dark.

**What changed**
- **Tokens and fonts:** the tokens are imported unchanged from the package's `dist/tokens.css`, so no value is retyped. The project's old style variables still work as aliases of the new tokens. Figtree and DM Mono load from Google Fonts. Dark mode follows the system setting.
- **Reusable pieces** (in `src/components/ms/`, styles in `src/styles/ms.css`):
  - Colour bands with curved edges, and a soft wave on the dark navy band.
  - A shape kit: discs shaded with a darker crescent, sparkles, clouds and hexagons.
  - Drawings for each area: rocket, folded map, plug, light bulb, calendar, stopwatch, magnifier, plus the error drawing.
  - Breathing glyphs that pause off screen, a fade-in helper and the home-page terminal vignette.
  - Every pill variant and tab pill, badges, and solid icons.
- **Colour per area:** Getting started yellow, Guides blue, API reference green, Resources orange, Changelog violet. The home hero is pink and the 404 page is cream.
- **Screens:**
  - **Top bar:** wordmark, version badge, search pill, and a Changelog link that gets the area dot when current; it gains a shadow on scroll. On phones it is one row plus the search field.
  - **Sidebar:** cream, with area dots; the current page is an ink pill.
  - **Doc pages and changelog:** a header band in the area colour with its drawing, then cream cards and callouts, pill tabs, a framed table that scrolls on phones, and a feedback card with a breathing glyph.
  - **Home:** a pink hero with confetti and the vignette, covered cards, a quick-start plate, and a navy closing band with one large pill.
  - **Footer and 404:** a cream curved footer with link columns and a dark bottom bar; the 404 is a cream band with the error drawing and an ink pill home.
- **Motion:** stops under reduced motion.
- **Docs:** `design-system/` (`VERSION`, `components.md` with the colour map and drawing subjects), plus one-line `AGENTS.md` and `CLAUDE.md` pointers.

**What I could not apply**
- **One commit per screen:** `git` isn't among the commands I was allowed to run, so nothing is committed.
- **Footer signup field:** the product has no signup, so I left it out rather than add a fake form.
- **Fade-in in screenshots:** the vignette and confetti fade in once when first seen, so a screenshot taken right after load can catch them half-built.

**Decisions I made myself**
- **Search pill size:** 48px tall instead of the 56px field height, so it sits evenly with the other top-bar pills.
- **Menu button on phones:** a cream circle. The "Menu" text stays for screen readers but is hidden visually.
- **Repository link:** now the ink pill in the top bar.
- **Changelog on phones:** the top-bar link moves into the drawer.
- **Additions** (all new links, buttons or text):
  - **Pills:** "Next page" on doc bands, "Latest release" on the changelog band, "Clear search" in the no-results state, "Quick start" in the hero.
  - **Home closing band:** the heading "Run your first cached build" and the "Install now" pill.
  - **Footer:** the link columns.
  - **Changelog:** a "Latest" badge on the newest release.
- **Type:** article text is 20px as the spec says (18px on phones). Doc headings map to 32px and 24px, below the 40px page title.
- **White pill on cream cards:** a cream pill would vanish on a cream card, so secondary buttons there are white. This variant isn't in the spec.
- **Sizing inside the sidebar layout:** the header band's height and the card grid follow the width of the main column, not the whole screen.
- **Night band edges:** it waves at both edges, and the 404 band curves at both edges, so neither ends in a straight line.
- **Callouts and changelog badges:** not covered by the spec, so I built them from tokens. Callouts are cream cards with a solid status mark. Added, Fixed and Changed are green, blue and yellow status badges.
- **404 band and footer:** both are cream, with white space between them. That bends the rule against two bands sharing a colour, but the spec requires cream for both.