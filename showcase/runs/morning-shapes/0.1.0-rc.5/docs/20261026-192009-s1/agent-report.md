Morning Shapes is applied to every screen of the Ferrule docs, in light and dark. The build passes, all 16 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked the screenshots of every page against the spec at both widths and in both modes.

**What changed**
- **Colour per area:** the four sidebar groups and the changelog each own one colour, in nav order: Getting started yellow, Guides blue, API reference green, Resources orange, Changelog violet. That colour shows up in each area's header band, sidebar dots, list bullets and search-result dots.
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the spec's tokens. The old CSS variable names in `base.css` still work and point at the new tokens. Dark mode follows the system setting, and `data-theme` on `<html>` can force light or dark. The fonts (Figtree and DM Mono) are bundled with the app through `@fontsource` packages rather than loaded from Google. A failed font download would log a console error, and the smoke tests fail on console errors.
- **Reusable pieces** in `src/components/ms/`:
  - Coloured bands with curved edges: hanging, rising and the wavy night version.
  - The flat shape kit, with a different drawing for each area: rocket, signpost, open book, lifebuoy and calendar page.
  - Card covers, and the error drawing (grey disc, cloud, rain drops).
  - Confetti, two looping glyphs, the hero illustration, and the pill buttons and tabs.
  - All motion stops under `prefers-reduced-motion`. The glyphs also pause when off-screen.
- **Screens:**
  - **Home:** yellow hero band with an illustrated Ferrule run, then confetti around "Browse the docs", then cream cards with colour covers. A navy closing band holds the quick start and one large "Install Ferrule" button.
  - **Doc pages:** a header band in the area's colour with its drawing. Below it: cream code blocks, notes and warnings, framed tables with a sticky first column, numbered steps, pill tabs, the feedback panel and the previous/next cards.
  - **Changelog:** a violet header band, with status badges for Added, Fixed and Changed.
  - **404 and unknown doc pages:** a cream band with the error drawing and a button back home.
  - **On every page:** a sticky top bar that gains a shadow when you scroll, a cream sidebar, and a cream footer with a dark bottom strip.
- `design-system/` now has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.
- All routes, labels, `data-testid`s and ARIA attributes are kept. Additions:
  - "Browse the docs" and "Install Ferrule" buttons on the home page.
  - A "Clear search" button when search finds nothing.
  - Footer links, plus Changelog and Repository links inside the phone menu.
  - Focusable, labelled frames around the tables.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted.
- **No footer signup field:** the site has no backend, so a subscription form would be fake.
- **Two-row phone top bar:** the spec wants one row, but search must stay usable on phones. The rows are the name with the menu button, then search.
- **Hero animation not seen in screenshots:** the screenshot tool captures right after load, so the illustration appears half-built. I turned the animation off temporarily to check the finished state, then put it back.

**Decisions I made**
- **Search box:** 48px tall instead of 56px, to fit the 80px top bar.
- **Card padding:** the home cards use 24px padding instead of 32px, because four sit in a row.
- **Header bands:** they span the content column beside the sidebar, not the whole window.
- **Hero colour:** yellow, matching its "Get started" button. The quick start sits on the navy band.
- **Notes and warnings:** cream panels with a coloured round mark instead of tinted backgrounds, since the spec forbids tints.
- **Sidebar on short pages:** it scrolls inside its own column rather than stretching the page.