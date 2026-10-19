I've restyled the Field Notes blog to Hardlift 0.1.0-rc.2 on every screen, in light and dark. The build and typecheck pass, all 9 smoke tests pass, and the final screenshot run shows no page scrolling sideways at 1440px or 390px. I looked at the Home, article, About and 404 screenshots plus a temporary preview of the empty state and form error/success, which I have since removed. I did not open every one of the 16 final PNGs.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package file. The old custom properties in `base.css` now point at Hardlift tokens. DM Sans and JetBrains Mono load from Google Fonts in `index.html`. Dark mode follows the system setting, or can be forced with `data-theme`.
- **Signature elements**, built as reusable pieces in `src/styles/hardlift.css` plus `Sticker.tsx`, `Band.tsx` and `Icon.tsx`:
  - **Lifting buttons and cards:** the newsletter submit, "Clear filters", the error-page return links and the home hero CTA (8px lift off a plate). The featured post, post grid and related posts are whole linked cards that lift.
  - **Color bands:** yellow for the posts section (home hero and article header), periwinkle for About, red for the two not-found pages. Text on bands is always ink.
  - **Pills:** the header nav (current page filled ink), the tag filter (scrolls inside itself on mobile) and the table of contents.
  - **Stickers:** four large shapes in the home hero that drift on scroll, a 160px sticker on the empty and error states, and one 32px sticker beside "More posts" and "The authors".
  - All motion stops under reduced motion.
- **Components:** outlined inputs with a pink focus halo, search box with an icon cell, error line with an alert icon, a pink count badge for "Showing X of Y posts", outlined badges for tags, a raised confirmation card with a hard shadow, outlined code block and quote, and a band-color image placeholder.
- **Markup:** I moved the breadcrumb and article header inside the article's band, and pages now manage their own containers. Every route, `data-testid`, label, heading id, ARIA attribute and behavior is unchanged.
- **Docs:** I added `design-system/` (VERSION, tokens, `components.md`) and the one-line `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **No commits:** git wasn't among the commands I was allowed to run, so all changes are uncommitted in the working tree. The spec wants one commit per screen.
- **Title Case:** post titles stay in Title Case because the tests check that exact text; the spec asks for sentence case.
- **Two pink actions can share a screen:** when the search finds nothing, "Clear filters" and the footer "Subscribe" are both pink and can be visible together. The spec makes each of them pink, but also allows only one pink action per screen.
- **Not changed, to keep current behavior:**
  - A form submit with errors doesn't move focus to the first invalid field.
  - Newsletter success shows inline, not as a toast fixed to the bottom-left.
  - The header keeps its two pills on mobile instead of a menu dialog.
- **Stickers in dark mode:** white-filled stickers and the placeholder's mountains turn charcoal, because the surface they take their fill from darkens.

**Decisions I made myself**
- **Home layout:** the home page's band is also the sticker hero. Its CTA, "Get new posts by email", jumps to the footer newsletter (`#newsletter`). This is a new link.
- **Grid and width:** posts use the narrow container in a 1/2/3-column grid, with no 4th column at wide sizes.
- **Search icon:** the cell at the end of the search box is a decorative icon, not a button, because the list already filters as you type.
- **Mobile table of contents:** it becomes a horizontally scrolling pill strip.
- **Spacing names:** the old `--space-4/-8/-12` variables couldn't stay as aliases because the token scale uses the same names. Before I fixed this, every pill was huge on mobile. They now mean 4, 8 and 12px; nothing else used the old values.