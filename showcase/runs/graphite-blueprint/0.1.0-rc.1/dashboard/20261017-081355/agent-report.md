I've restyled the Northwind Ops dashboard with Graphite Blueprint across every screen, in both light and dark. The build and typecheck pass and nothing scrolls sideways at 1440px or 390px. I couldn't run the smoke tests themselves, because `npm run test:e2e` isn't one of the commands I was allowed. Every `data-testid`, route, label text, form field and accessibility attribute is unchanged.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an unedited copy of the package's tokens and is loaded first. The old variable names now point at the new tokens so nothing breaks. Inter and Geist Mono load from Google Fonts. Light or dark follows the device setting.
- **Signature pieces** (`src/components/signature/`): all six are built as reusable components and CSS classes, from the spec's recipes:
  - spotlit stage, in lit and quiet versions
  - dot glyph with all six patterns, plus the dot meter and dot field
  - isometric blueprint drawings
  - spec plate
  - shimmer, live edge, pulse and caret
  - screen header, split opener, two-tone text and mono labels
- **Shell:** a 240px sidebar with icons; under 1024px it becomes a row of pills that scrolls inside itself. The header is sticky and translucent with a pill-shaped search.
- **Overview:** new screen header, KPI cards with mono labels and a status dot, and the chart redrawn as dot columns on a quiet stage with a FIG caption. Recent activity has avatars and mono timestamps. The projects table has mono headers, status icons with words, and a pill filter. Its empty state shows the 48px empty glyph.
- **Projects and Team:** screen headers and tables restyled; Team shows a five-dot meter for active projects.
- **Project detail:** tabs with a sliding indicator, spec figure on a quiet stage, styled checkboxes and progress bar.
- **Settings:** a dimmed blueprint stack that lifts on hover.
- **Not found and project not found:** a broken-connector drawing on a quiet stage, "ERR 404", and two buttons.
- **Motion:** every animation stops under reduced motion.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

I looked at each signature piece on a temporary page in light and dark, then at every screen at both widths. I fixed the clipped filter field on mobile, the sidebar background height, spacing on the 404 page, and the mobile sidebar stretching on short pages.

**Still to do or not applied**
- **Delete `src/pages/PiecesPreview.tsx`.** It was the temporary review page. Its route is removed and nothing imports it, but deleting files wasn't among my allowed commands.
- **No commits.** The spec asks for one commit per screen, but git wasn't among my allowed commands.
- **Shimmer, live edge, pulse, caret and the running glyph loops aren't used on any screen.** Nothing in this app runs in the background, and the spec forbids showing them for work that isn't running. They're built and documented for later.
- **Light/dark switch:** the app has none, so I didn't add one.

**Decisions I made myself**
- **Avatars are 20px instead of 16px:** two initials wouldn't fit legibly at the spec size.
- **KPI dot colour shows whether the change is good:** green when it's good news, even when the number falls (fewer incidents, shorter lead time). Previously the colour simply followed whether the number went up or down.
- **Panels are outlined, not filled:** large panels sit on the page background so it covers at least 80% of the screen, as the spec requires. Only the KPI cards use the card fill.
- **Added copy:** Settings has no description in the original, so I added one ("Workspace configuration for every team"). The 404 page gets a second button, "All projects", because the spec calls for two.
- **Settings blueprint lifts on CSS hover** rather than via a script-added class.
- **Due dates on mobile:** the projects table scrolls inside its own frame at 390px; status stays visible, but the due date is off to the right.