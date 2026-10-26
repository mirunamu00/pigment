I've applied Morning Shapes 0.1.0-rc.3 to all four screens (Home, Article, About, Not found) plus the shared header and footer. The build and type check pass, all 9 smoke tests pass, and the final screenshot run shows no page scrolling sideways at 1440px or 390px, light or dark. I opened the screenshots, fixed what was wrong, and re-ran everything. Nothing is committed.

**What changed**
- **Tokens:** `design-system/tokens.css` is a byte-identical copy of the package's `tokens.css`. The project's old variable names in `src/styles/base.css` now point at the tokens. Dark mode follows the system setting, and `data-theme` on the root can force light or dark.
- **Fonts:** Figtree (400/500/700) and DM Mono (400) are served from the app's own files via the `@fontsource` packages, not from an external server. Those are the only new dependencies.
- **Reusable pieces** in `src/components/ms/` and `src/styles/morning.css`:
  - color bands with curved edges, compact header bands with a shape cluster, and rounded color panels;
  - the flat shape kit, scattered decorative shapes, round picture plates, and item covers with 8 original pictures (one per post subject, plus the newsletter envelope);
  - small looping shapes that pause off-screen;
  - every pill-button style, including the filter pills;
  - the interface-fragment illustration on a color panel, and a fade-in helper.

  All motion stops under `prefers-reduced-motion: reduce`.
- **Screens:**
  - **Home:** yellow top band with a sun picture and a blue Subscribe pill, featured card with a cover, scattered shapes around "More posts", search pill and filter pills, cream post cards with covers, and a yellow empty-state panel with a looping shape.
  - **Article:** yellow header band holding the post's cover picture, readable text column, contents panel, and covered related-post cards.
  - **About:** blue header band, the interface-fragment illustration beside "Why we write", and author cards with initials on colored discs.
  - **Not found:** cream band with the spec's error picture and a pill back home.
  - **Footer:** cream band with a newsletter picture, signup field and black pill, plus a dark bar with a back-to-top button. The top bar is sticky and gets a shadow once you scroll.
- Every route, label, `data-testid` and accessibility attribute is unchanged. I also added `design-system/VERSION`, `design-system/components.md`, `AGENTS.md` and `CLAUDE.md`.

**What I couldn't fully apply**
- **One commit per screen:** the spec asks for this, but you didn't ask me to commit, so everything is left as uncommitted changes.
- **Number of tag colors:** there are five tag colors, so the filter row shows more than the spec's limit of four category colors in one view.
- **Shared blue:** Engineering and About both use blue, because the spec only has six category colors.
- **Article titles on one line:** long post titles wrap to two or three lines in the header band.
- **Colors per picture:** the article header picture puts a three-color pictogram inside a colored disc, so it can exceed three colors in one picture.
- **Screenshots mid-animation:** the About illustration and the looping shapes were captured partway through their motion. That is the intended first-view behavior, not a layout bug.

**Decisions I made myself**
- **Colors:** Home is yellow and About is blue. Article pages count as part of Home, so they use yellow and keep the Home nav dot. Tags are Engineering blue, Design green, Writing orange, Process violet and Remote work pink, and a post's cover takes its first tag's color.
- **Body figures:** the grey placeholder figures are now flat colored drawings matched to each caption (a board of buttons, two notes, a flag timeline).
- **Mobile nav:** with only two links, the top bar keeps them inline instead of using a menu button.
- **Additions not in the spec:**
  - the hero's "Subscribe" (jumps to the newsletter) and "Start reading" pills;
  - the "Browse by tag…" line under "More posts";
  - a footer "Explore" link list;
  - the back-to-top button.
- **Removed:** the outline icon next to the "Field Notes" name, because the spec forbids outline icons.
- **Fade-in:** content fades in only once script has run, so nothing is ever hidden without it.
- **Temporary preview:** I briefly added a preview route to check the empty-state and form states, then removed it. It is not in the final diff.