Graphite Blueprint is now applied to every screen of the Ferrule docs, in light and dark (following the device setting). The build passes, all 16 smoke tests pass, and no page scrolls sideways at 390px or 1440px. Nothing is committed: git commands weren't on the list of commands you allowed, so all changes are in the working tree on `main`.

**What changed**
- **Tokens and root setup:** `tokens.css` is copied unchanged to `src/design/`. The old variable names in `base.css` now point at the tokens, and the stylesheet is rewritten on top of them.
- **Fonts:** Inter (variable) and Geist Mono 400 are self-hosted. I added two font packages to `package.json` for this (`@fontsource-variable/inter` and `@fontsource/geist-mono`); there is no font CDN.
- **Signature elements:** each is a reusable piece in `src/components/signature/`: the spotlit stage, dot glyphs, isometric blueprints, spec plates, and the split opener. The shimmer and live-edge effects are in `signature.css`. Their motion stops under reduced motion.
- **Home:** h1 and "Get started" on the left, the two-tone lead on the right. Below that, a lit stage shows a mock Ferrule run screen (one running glyph, one live-edge badge). "Browse the docs" opens with a split opener over a grid of four cards with spec plates. "Quick start" has a row of three blueprints (stack, connected pair with moving dashes, box) above the code block.
- **Doc pages:** breadcrumb, h1, a meta line, a wide spec plate, and the "On this page" list as a right-hand rail from 1024px (a closed expandable section below that). Tables, tabs with a sliding underline, callouts with status icons, code blocks, feedback and pager are all restyled.
- **Changelog:** the latest release is shown as the "Featured" item with a plate, and each older release opens with a split opener. Change types are badges with a coloured dot.
- **Not found pages:** a broken-connector drawing on a quiet stage, "ERR 404", a heading, and two buttons.
- **Header, sidebar, search:** sticky blurred header, pill buttons, search results as a popover with an empty state. Under 1024px the sidebar becomes a slide-in panel opened by a full-width button named after the current page.
- **Spec files:** `design-system/` (version, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Checks I ran:** I put each signature piece alone on a temporary page, compared them with their recipes in both themes, then removed the page. Blueprint figures measure 273px at 1440px and 318 of 350px (91%) at 390px; the spec asks for about 270px and at least 85%.

**What I couldn't apply**
- The spec's process of one commit per screen, because of the git restriction above.
- The sidebar groups don't animate their height when expanding: the fade-in left the links faint in the screenshots, so I removed it. The chevron still rotates.
- I couldn't screenshot interactive states (the open mobile menu, search results); only the smoke tests exercise them.
- The spec gives no update date, so `VERSION` uses today's date.

**Decisions I made**
- **Sidebar alignment:** a full-height sidebar makes "one left edge per page" impossible. The header brand lines up with the sidebar text, and the main content and footer text share the content column's edge.
- **Parameter tables:** columns stay in their original order. Default is the pinned column, and its pinned styling only applies under 768px. Under 640px the spec's table rules hide the Description column; each name shows its type underneath. This does lose descriptions on phones.
- **Plate captions:** they show reading time (for example "FIG 1.2 · 1 MIN"), worked out from each page's text so it's a real attribute.
- **Added content:**
  - The mock run screen in the home stage.
  - A second button, "Read the introduction", on the not-found pages, since the error layout calls for two.
  - A second sentence on the changelog lead, so it has the two-tone form.
- **No page close:** no page ends in a single final action, so none got the closing statement.