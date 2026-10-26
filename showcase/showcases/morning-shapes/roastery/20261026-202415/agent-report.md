Kiln Street is now redesigned in Morning Shapes on every page and route, in light and dark. The final run passed typecheck and build, and no page scrolls sideways at 1440px or 390px. I opened the screenshots of every page, and of the bag drawer, empty shop results and mobile menu, and fixed what didn't match. The project has no tests, so the build and screenshots are the only checks.

**What changed**
- **Tokens and fonts:** `src/tokens.css` is an exact copy of the package tokens. The old variable names (`--ink`, `--paper`, …) still work and point at the new tokens. Figtree and DM Mono replace Fraunces and Inter.
- **Shared pieces** (`src/components/ms/`):
  - colour bands with curved edges, and a compact header band with a shape cluster for each area;
  - the flat shape kit, with plate pictograms drawn from the shop's own subjects (bean, grinder, flame, envelope, cherries, coins, scoop, cup, magnifier) and the 404 composition;
  - breathing glyphs that pause off-screen;
  - pill buttons on a ledge, tab pills and segmented controls;
  - the front-page vignette, and a fade-in that only starts when the page loads.
- **Colour per area:** Home yellow, Shop blue, Subscriptions green, Our story orange, Visit the roastery violet, legal pages and 404 cream. The product page uses a cream band because its photo is the large cover.
- **Pages:**
  - Home: yellow hero with the roaster photo as the vignette, confetti around section headings, white and cream sections alternating, and a green closing band with the one extra-large button.
  - Shop: header band, filter pills that turn ink with a white dot when selected, cards with no borders, a green "Roaster's Choice" panel, and a cream empty state with a picture.
  - Product: segmented size picker, round quantity and thumbnail buttons, blue "Add to bag" that fits in the first screen, and the brew guide as tabs.
  - Subscribe: plan cards where the selected one turns yellow with a check, coffee choices as rows with breathing glyphs, and a summary card.
  - About: photos framed in coloured discs, initials on shaded discs for the team, and a picture plate for each sourcing principle.
  - Legal pages: header bands, each with its own picture (padlock, document, cookie, parcel).
  - 404: the error composition from the spec.
  - Footer: cream band curving up into the page, with a dark bottom bar.
- **Kept:** every `data-testid`, ARIA attribute, piece of copy, photo and behaviour. Each coffee keeps its photo. I added `Escape` to close the mobile menu and a focus trap while it's open, which the spec asks for.
- `design-system/` (`VERSION`, `components.md`), `AGENTS.md` and `CLAUDE.md` are added.

**What I couldn't apply**
- **One commit per screen:** the folder isn't a git repository.
- **Round icon buttons in the footer's bottom bar:** the site has no social links, and I didn't invent any.
- **Toast confirmation:** "Added to bag" is still the inline status message rather than a toast.
- **Loading states:** the site has none, so there was nowhere to use them.
- **Tokens in `design-system/`:** I didn't make a second copy there; `components.md` points to `src/tokens.css`.
- **Vignette build timing:** the spec's delays mean the last pieces arrive about 2 seconds after load. In the screenshots the two chips, star and cloud aren't showing yet. If you'd like them to show, the fix is to shorten the delays.

**Decisions I made myself**
- **Colours:**
  - Home counts as the first area, so it's yellow and Shop moves to blue.
  - "Visit the roastery" gets its own colour even though it's a section of the About page.
  - The selected plan card is yellow so it doesn't match the green Subscriptions band.
  - The "Roaster's Choice" glyph is yellow on the green panel; on the Subscribe page it's green.
  - Team avatars cycle through four colours.
- **Layout:**
  - The section just above the footer is always white so the footer's curve is visible.
  - The menu button and desktop navigation swap at 1240px wide, because the full top bar doesn't fit below that.
  - Plates on cream cards are white, so they don't vanish into the card.
- **Smaller details:**
  - Tasting notes use 14px tags rather than the spec's 12px.
  - The favicon was redrawn in the system's yellow and ink.
  - The cart drawer is styled as a dialog sheet, since the spec doesn't cover drawers.