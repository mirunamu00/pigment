Inkleaf 1.1.0-rc.1 is applied to every screen: Overview, Projects, Project detail, Team, Settings, Not found and Project not found. The build passes and all 10 smoke tests pass. The last screenshot run found no sideways scroll at 1440px or 390px, in light or dark. Every route, `data-testid`, label text, form field and accessibility attribute is unchanged.

Under the snap tool the drawings and headings are often caught mid-animation. The tool doesn't emulate reduced motion and I couldn't change it, so it never showed a settled page. Screenshots also show the blocks below the fold as empty space (the Overview projects table, for example). That's the spec's block rise: it hides those blocks until they scroll into view, on a route's first visit. To review the projects table I used `/projects`, where it sits above the fold.

**What changed**
- **Tokens and root setup:** `tokens.css` is copied unchanged into `design-system/tokens.css` and loaded first. Light and dark follow the system setting, or `[data-theme]` if set. Fonts come from Google Fonts with `display=swap`: Source Serif 4, Instrument Sans and JetBrains Mono. I also added the brush filters at the app root, the warm focus outline, the reduced-motion block and `overflow-x: clip`. `base.css` was rewritten to use only tokens.
- **Signature elements**, as reusable pieces in `src/inkleaf/`:
  - **Pictogram:** a strip of frames that steps through once (one frame per stroke, plus three boil frames) and holds the last frame. It starts when 30% is in view and shows the last frame under reduced motion.
  - **Stage:** a pastel panel with faint wandering lines.
  - **Write-in heading:** the words fade in one by one; the accessible name stays the same.
  - **Working glyph and breathing dot.**
  - **Ring controls and block rise.**
- **Screens:**
  - A shared page header on all five product screens: a small drawing that plays once per session, a written-in h1 and the lede.
  - **Overview:** the throughput chart is the screen's one stage (sage); Refresh shows the glyph while it's pending.
  - **Tables:** eyebrow header rows and status badges whose Active dot breathes. Under 834px the projects table stacks and adds a native "Sort by" select; the team and files tables scroll inside a labelled region.
  - **Project detail:** underline tabs with the content-swap motion and custom checkboxes.
  - **Empty and error states:** each has its own drawing.
  - **Shell:** sticky header with the product name in serif, a sidebar that turns into a menu-button sheet below 992px, and a menu-styled user panel.
- **Eight original drawings**, four with hands (each hand pose used once). I checked them on a temporary enlarged route and removed it afterwards.
- **Docs:** `design-system/` (`VERSION`, `tokens.css`, `components.md` listing each drawing and its one-word name), plus `CLAUDE.md` and `AGENTS.md` pointer lines.

**What I couldn't apply**
- **Drawing on the project detail page:** the spec puts the item's main image on a stage, but projects have no images. Drawing one per project would mean eight new drawings, so I left it out.
- **Small notches in the strokes:** these appear when drawings are enlarged a lot, and they come from the spec's own brush filter settings. At the real sizes (48–128px) they're below a pixel.
- **The 48px hands are crude.** That's partly the spec's own finger shape, which is built for larger sizes.
- **No git commits.** The spec asks for one commit per screen, but you didn't ask me to commit, so all changes are uncommitted.

**Decisions I made**
- **Chart:** it sits on a white card on the stage, so the small grey labels stay readable (4.5:1) against the pastel.
- **Mobile header:** the global search drops to a second row under 834px, and the user's name is visually hidden there (screen readers still get it).
- **Status colors:** Active is blue (info), Paused is ochre (warning), Done is green (success).
- **Stat changes:** all four Overview stat changes are colored by meaning, so falling incidents and lead time show as good news.
- **Empty and error states:**
  - The not-found pages each gained a second action ("See all projects" / "Go to overview"), as the spec asks for two.
  - The Settings placeholder is treated as an empty state inside a card.
- **Search fields:** both got their own clear button.
- **Refresh button:** it keeps its "Refreshing…" wording.
- **File names** in the files table use the mono font.