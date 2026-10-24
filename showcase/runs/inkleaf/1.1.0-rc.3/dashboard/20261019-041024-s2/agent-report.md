Inkleaf 1.1.0-rc.3 is applied to every screen: Overview, Projects, Project detail, Team, Settings and Not found. The build, typecheck and all 10 smoke tests pass. Final screenshots at 1440px and 390px, light and dark, look right and nothing scrolls sideways. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

## What changed
- **Tokens, fonts, dark mode:** `design-system/tokens.css` imports the package's `tokens.css` unedited, so no values were retyped. Light and dark follow the system setting, and `data-theme` overrides it. The three fonts the spec names load from Google Fonts. The old plain styles in `src/styles/base.css` are fully replaced.
- **Signature elements, built as reusable pieces in `src/design/`:**
  - **Pictograms:** the brush filters sit once at the app root. Each drawing steps in once and holds; reduced motion shows the final frame.
  - **Drawings:** eight original ones, half with hands, each hand pose used once. Header drawings are the telescope, flag, scroll, walkie-talkie and key. The Settings "coming soon" state has an hourglass, the empty project filter has a net, and Not found has a signpost.
  - **Pastel stage:** used once, behind the Overview chart.
  - **Headings:** every h1 and empty-state title fades in word by word.
  - **Working state:** the hand-drawn loop glyph shows inside the Refresh button only while it is pending, and Active status badges have a breathing dot.
  - **Controls and motion:** buttons and chips use the ring style. The header and lede rise on load, and blocks below the fold rise on a route's first visit only.
  - Every motion stops under reduced-motion settings.
- **Shell and components:** a 240px sidebar from 992px wide. Below that, a menu button opens a sheet of nav rows. The account menu, status badges, styled checkboxes and progress bar, underline tabs and avatar tiles all follow the spec. The chart uses ink for the current bar.
- **Tables:** on phones the projects table stacks into labelled rows and gets a "Sort by" dropdown. The Team and Files tables scroll inside their own labelled region instead.
- **Docs:** `design-system/` now has `VERSION` and `components.md` (where each piece is used, each drawing's subject and its one word). `AGENTS.md` and `CLAUDE.md` each point to that folder.

## What I couldn't apply
- **One commit per screen:** git isn't among the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **Temporary file left behind:** I used a temporary route to inspect the drawings and removed the route. I couldn't run `rm`, so `src/pages/TempPictoPage.tsx` is still on disk. Nothing imports it, but please delete it.
- **Main image on the detail page:** the spec puts an item's main image on a stage, but projects have no image, so the detail page has no stage.
- **Screenshot timing:** the screenshot tool captures right after load and never scrolls. Drawings and headings appear mid-animation, and blocks below the fold stay hidden in the PNGs. That is the intended behaviour, and I didn't change any code to make the screenshots look final.

## Decisions I made
- **Additions the spec requires:** the mobile menu button, the phone "Sort by" dropdown, clear buttons on both search fields (the spec hides the browser's own), and a second action on the Not found pages ("Browse projects" / "Go to overview").
- **Two visible labels removed:** to match the spec, the "Filter projects" label is now visually hidden but still read by screen readers. On phones, the user's name in the header is hidden the same way.
- **Status colors:** Active is blue with a breathing dot, Paused is amber, Done is green.
- **Metric changes are colored by meaning:** a drop in open incidents or lead time shows as good.
- **Small departures for fit and alignment:**
  - Metric values shrink to 25px under 834px so "2.4 days" fits two per row at 390px.
  - Stacked table rows use 24px side padding instead of 16px so they line up with the card title.
  - The header is sticky only from 834px up; on phones it wraps to two rows and scrolls away.
  - The Refresh button is a secondary button with a held width.
  - Sidebar items have no icons, because the app had none and I didn't invent any.