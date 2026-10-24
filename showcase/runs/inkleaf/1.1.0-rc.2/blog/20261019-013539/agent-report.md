I've applied Inkleaf to all the screens: Home, both kinds of article, About, the newsletter form in the footer, and the two not-found pages, in light and dark. The build and typecheck pass, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px.

The full-page screenshots never show the finished state. They are taken right after the page loads, so the large drawings are still partway through drawing in, and anything below the fold is still hidden (blocks below the fold appear as you scroll, as the spec requires). To check those parts I put the finished drawings, the three diagram placeholders and the post cards on a temporary page, in both themes and both widths. I also used `--measure` to check control sizes, padding, radii and that the right fonts load.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an unchanged copy of the package's tokens, imported once. The old CSS variables are gone, because names like `--space-4` meant something different. The three fonts load from Google Fonts. I added the root setup: brush filters, warm focus outline, the global reduced-motion rule, and no sideways overflow.
- **Signature pieces, all reusable, in `src/inkleaf/`:**
  - the frame-by-frame ink drawing, which steps in once and holds;
  - pastel stages with faint lines, including the 4:3 drawing stage;
  - headings that fade in word by word;
  - the working glyph, breathing dot and check-circle;
  - the button and chip styles;
  - placeholders built from the system's own surfaces for missing diagrams;
  - blocks that rise into view. All motion stops under `prefers-reduced-motion`.
- **Eight original drawings:** notebook (home hero, accent fill), swatch fan (featured post, on its stage on Home and in its article), glasses (article header), lantern (About), mailbox (newsletter), postcard (newsletter success), newspaper (search with no results), signpost (not found). Half show a hand, and each hand pose is used once.
- **Screens:**
  - **Home:** a large hero, the featured post beside its drawing stage, chip filters and a search field, and post cards with a hover lift.
  - **Articles:** the contents list sits beside the text on wide screens and becomes a collapsible section on phones; the three diagrams are placeholders shaped like their captions.
  - **About:** a centered column with the lantern opening "Why we write", and author avatars colored by name.
  - **Not-found pages:** the large signpost drawing, a serif heading and two actions.
- **Docs:** `design-system/VERSION` and `components.md` (where each piece is used, and each drawing's one-word name), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't in the commands I was allowed to run, so everything is uncommitted.
- **An empty file to delete:** `src/pages/ReviewTemp.tsx` held the temporary review page. I emptied it and removed its route, but couldn't delete it with the allowed commands, so please delete it.
- **Title case:** post titles stay in title case (the spec wants sentence case) because the tests match them exactly.
- **The working glyph is never shown:** the newsletter submit is synchronous, and the spec says to go straight to the result in that case.
- **Temporary review page:** the spec says not to create preview pages, but the screenshots can't show the finished drawings, so I used one (as you allowed) and removed it.

**Decisions I made**
- Post cards stay text-only. The data has no images, so there was nothing missing to replace with a drawing; only the featured post gets one.
- I added a `preview` field to each figure in `posts.ts` to choose the placeholder's shape (grid, side by side, or steps), and a `drawing` field for the featured post.
- The newsletter's mailbox drawing is swapped for the postcard on success, so the section keeps one drawing.
- I removed the generic logo icon from the header, since the spec asks for the name as text with no invented logo.
- Small additions: the search field has its own clear button, the email field gets focus after a failed submit, and each not-found page has a second action, "About Field Notes".