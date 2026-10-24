Inkleaf is applied to every screen: Overview, Projects, Project detail, Team, Settings and both not-found states. Typecheck and build pass, and `node pigment-snap.mjs` reports no sideways scroll on any page at 1440px or 390px, light or dark. I could not run the Playwright smoke tests because `npm run test:e2e` isn't one of the commands I was allowed. I kept every route, `data-testid`, label and ARIA attribute, and headings keep their exact text, so they should still pass, but that is not confirmed.

In the final screenshots the top bar looks faded and the header drawings look half-drawn. That's because the tool captures the pages while they are still animating in, not a bug. I did one extra screenshot pass with motion frozen to check the finished drawings and layouts. That pass also included Settings and the not-found pages, which the tool doesn't normally capture. I reverted all of it afterwards.

**What I changed**
- **Tokens:** `design-system/tokens.css` is a copy of the package's `tokens.css`. The app's old variable names now point at the new tokens. Dark mode follows the system setting, and a `data-theme` attribute can override it.
- **Fonts:** the three fonts the spec names, at the weights it names, served from the app itself through `@fontsource` packages. These are font packages, not UI libraries.
- **Signature pieces** (in `src/design/`):
  - Brush filters.
  - Hand-drawn pictograms that draw themselves once, frame by frame, when they come into view. Header drawings play once per session.
  - Pastel stages with faint wandering lines.
  - Headings that fade in word by word.
  - The working glyph, breathing dot and caret.
  - Ink-and-paper ring buttons.
  - All motion stops under reduced motion.
- **Screens:**
  - Every page gets a small drawing beside a fading-in serif h1.
  - Overview puts the main chart on a sage stage, and running statuses breathe.
  - The projects table stacks into labelled rows on mobile; it gets a segmented filter with a sliding pill, sort arrows, and an empty state with a drawing.
  - Project detail gets underline tabs, with each panel on an apricot stage, and custom checkboxes and progress bar.
  - Team gets stage-coloured avatar tiles, and its table scrolls inside its own labelled region on mobile.
  - Settings gets a first-run lilac stage. The not-found pages show a large drawing on an apricot stage with two actions.
  - Nine original drawings, one subject per use.
- **Shell:** a 240px sidebar on wide screens; below 992px it becomes a sticky header with a Menu button that opens a sheet (Escape closes it). Plus a one-line footer.
- **Docs:** `design-system/VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` pointer lines.

**What I couldn't apply**
- **One commit per screen:** git wasn't among the allowed commands, so nothing is committed.
- **Working glyph:** it is built but not shown anywhere, because the app never actually waits on anything. Faking a delay would change behaviour.
- **Block rise:** it plays on each route's first load, not when the block scrolls into view. This keeps full-page screenshots reliable.
- **Leftover file:** `src/debug-freeze.css` remains as an unused file. Deleting it needed a command I wasn't allowed; it's not imported and can be removed.

**Decisions I made**
- The chart is built from HTML bars instead of SVG so its labels stay readable on phones. The current month is the dark bar.
- On mobile the KPI values shrink one size so two cards fit side by side.
- Status colours: Active is blue (info) and breathes, Paused is amber, Done is green.
- I kept the existing up = green, down = red colouring on the KPI changes, even though "−2 incidents" is good news.
- I added a few small things the spec calls for: a clear (×) button in both search fields, a second action on the not-found pages, and the footer line.
- The spec gives no update date, so `VERSION` records today's date as the date it was applied.