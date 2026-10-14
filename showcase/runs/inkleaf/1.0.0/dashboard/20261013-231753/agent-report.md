I restyled every screen to inkleaf@1.0.0. The build passes and `pigment-snap` reports no sideways scroll at 1440px or 390px, light or dark. I couldn't run the smoke tests (`npm run test:e2e` isn't one of the commands I'm allowed). I kept every `data-testid`, label, route, ARIA attribute and the native inputs.

**One thing that will look wrong in the screenshots:** on Overview, the Recent activity panel (mobile) and the projects table (both widths) are blank in the full-page captures. This is the spec's "block rise": panels below the fold stay hidden until they're scrolled into view. The capture never scrolls, so they never appear. The spec forbids working around this or detecting automation, so I left it. The same table shows normally on /projects, which I checked in all four variants.

**What changed**
- **Foundation:** `design-system/tokens.css` is a copy of the spec's `tokens.css`. Fonts are self-hosted through Fontsource packages added to `package.json`, not Google Fonts, because a blocked font request would log a console error and fail a smoke test. The root setup has the brush filters, the warm focus outline, the reduced-motion block and `overflow-x: clip`. Dark mode follows the system setting, and a `data-theme` attribute can override it.
- **Signature pieces, in `src/ink/`:** the hand-drawn pictogram (plays once when it comes into view, header ones once per session), the pastel stage with wandering lines, the heading that fades in word by word, the working glyph and breathing dot, the block rise, and the button styles. All motion stops under reduced motion.
- **Shell:** product name in serif, sticky header, sidebar from 992px. Below that a menu button opens a sheet; on phones the global search lives in that sheet.
- **Screens:**
  - Every screen has a small drawing beside its h1, and the h1 writes in.
  - **Overview:** stat cards are colored by meaning (fewer incidents counts as good), and the chart sits on a sage stage.
  - **Projects table:** filter chips, a search field with its own clear button, outline status badges (active ones breathe), and stacked rows plus a "Sort by" select on phones.
  - **Project detail:** underline tabs, restyled checkboxes and progress bar.
  - **Team:** colored avatar tiles; the table scrolls inside its own region on phones.
  - **Settings:** a lilac "first-run" stage with a plug drawing over faded placeholder cards.
  - **Not found:** a signpost drawing on an apricot stage with two actions.
- **Docs:** `design-system/VERSION` and `components.md` (where each piece is used, each drawing and its one word), plus `CLAUDE.md` and `AGENTS.md` pointer lines.

**What I couldn't apply**
- **Working glyph:** built but never shown. The app has no real network requests and the spec forbids fake delays.
- **One commit per screen:** nothing is committed, because git wasn't in the allowed commands. Everything is uncommitted in the working tree.
- **Unchecked screens:** Settings, Not found and the filtered-empty table aren't in the screenshot routes, so I haven't seen their drawings rendered. At 48px the header drawings are small and their hands are hard to judge; the blueprint on project detail could pass for a telescope.
- **`tokens.json`:** not copied into `design-system/`. The docs point to the spec's own file.

**Decisions I made myself**
- **Eight drawings**, half with hands, each hand pose used once. Subjects: flag, hourglass, blueprint, bell, key, plug, binoculars, signpost.
- **Chart labels** use the primary text color, because the spec's tertiary fails 4.5:1 contrast on the sage stage.
- **Stat values** drop to the smaller h4 size on phones so they fit two to a row.
- **Wide layout:** four stats in a row, and the chart beside activity, only from 1200px.
- **Not-found drawing** at full ink weight, because the stage weight would be thinner than the spec's line targets at that size.
- **Status colors:** active is info (blue), paused is warning, done is success.
- **Added links:** each not-found screen has a second link ("View projects" / "Go to overview") because the spec asks for two actions.