Margin Notes 0.1.0-rc.3 is now applied to all four captured pages (Home, both articles, About). I also restyled the 404 and unknown-post pages, which aren't captured. In both light and dark, at 1440px and 390px:

- **Checks:** the build and typecheck pass, and `pigment-snap` reports no sideways scrolling. I looked at every screenshot from the final run.
- **Not run:** the Playwright smoke tests (`npm run test:e2e`) aren't on the list of commands I was allowed to run. I kept every `data-testid`, label, ARIA attribute and route, and every element the tests read keeps the same text (I checked this by reading the tests, not by running them).

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the package's `tokens.css` as-is, so no values were retyped. Light and dark come from it and follow the system setting or `data-theme`. Fonts are bundled locally (I added four `@fontsource/*` packages), so pages make no requests to outside font servers.
- **`src/styles/base.css`:** rewritten on the tokens. Old variable names point at the new tokens. A few old names (`--space-4`, `--font-size-small` and similar) clash with token names that mean something different, so I removed them.
- **Layout:** one 1360px container with 40px gutters (16px under 860px), so content starts at 40px at 1440 wide. Grid is 4, 8 or 12 columns depending on width. The header is text-only.
- **Home:**
  - The header band has the watercolor bloom, "Field *Notes*" with the swash under the serif word, and a lead line.
  - The featured post is a raised card with tape, spanning columns 1–8, with the "start here" note beside it.
  - Tag filters became chips (a scrolling strip on mobile), and the search field is 40px tall.
  - Posts are cards of equal height, and the empty search result has its own panel.
- **Article:** title with one serif word, mono "On this page" heading for the contents list, serif pull-quote, dark code block, and the image placeholder is now a hatched frame with an outline icon.
- **Newsletter:** the error message has an alert icon and the invalid field gets focus. The success message is a green callout.
- **New files:** `design-system/` (VERSION, tokens, `components.md`), `AGENTS.md`, `CLAUDE.md`, and `src/components/Studio.tsx` for the decorative pieces.

**Not applied**
- **One commit per screen:** git isn't one of the allowed commands, so nothing is committed. Everything is uncommitted in the working tree.
- **Error summary at the top of the form:** skipped, because the form has a single field and the message under it already says the same thing.
- **Mobile menu, sticky action bar, tables, dialogs, toasts, switches:** the app has none of these.

**Decisions I made**
- **Serif word on article titles:** the spec contradicts itself here. The blog section says to put one in article titles, but the general rule bans serif words on object pages. I followed the blog-specific rule. Each post has a new `accent` field in `posts.ts` naming the word; the title text itself is unchanged.
- **Brand icon:** the spec wants the product name as text only, so I hid the icon with CSS instead of deleting it from the markup.
- **Old image placeholder:** it was an illustrated `<svg>`, which the spec bans. It's now a `<div>` that keeps `role="img"` and the `aria-label`.
- **Page layout:** the main area is now full-width so the bloom can run off the right edge, and each page sets its own container.
- **Spacing:** the breadcrumb sits 40px below the header. Article paragraphs are capped at 68 characters wide to hit the 60–75 character guideline; the article column is 720px.
- **Empty states:** the search empty state counts as inside the list, so it has no decoration. The 404 and unknown-post panels count as full-page, so they get tape, bloom and a note.
- **Dark badges:** badges on the featured card get a thin outline, because in dark mode the badge fill and the card are the same color.
- **TOC on mobile:** it still sits above the article, as it did before.