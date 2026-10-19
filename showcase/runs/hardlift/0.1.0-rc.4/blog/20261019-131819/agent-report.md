Hardlift 0.1.0-rc.4 is applied to every screen, in light and dark, at 1440px and 390px. The build passes, all 9 smoke tests pass, and no page scrolls sideways. I checked the screenshots of Home, both articles, About, the 404 page and the "post not found" page.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css` and loads first. The old variable names in `src/styles/base.css` still work and now point at the new tokens. DM Sans and JetBrains Mono load from Google Fonts in `index.html`.
- **Signature elements, built as reusable pieces:**
  - `src/styles/hardlift.css` holds the lifting buttons and cards, the hero button on its plate, the color bands, the pills, the tag badges and all the sticker motion. Motion stops under reduced motion, and high-contrast mode is handled.
  - `Band.tsx` is the color band header.
  - `Sticker.tsx` has 12 original sticker drawings.
  - `ImagePlaceholder.tsx` now draws a different sticker scene for each article figure, replacing the mountain-and-sun image that the spec forbids.
- **Screens:**
  - **Header:** white, 80px tall, with pill links; the current page is the filled black pill.
  - **Home:** a full-width yellow hero with five large drifting stickers, the 96px title and a pink "Get new posts by email" button on its plate. The featured post is a whole-card link with a sticker panel, the tag filters are pills, and the posts are a 3/2/1-column grid of cards that lift on hover. The no-results state has a band strip, a 160px sticker and a pink "Clear filters" button.
  - **Article:** breadcrumb, then a yellow band with the title, meta and tags. The body is narrower, code blocks are outlined, the contents list is styled, and related posts are lifting cards.
  - **About:** a periwinkle band and outlined author cards. Each author has a different sticker in place of a photo.
  - **404 and "post not found":** a red band, one sticker and a pink return link.
  - **Newsletter:** outlined input with the pink focus ring, a 16px danger icon on errors, and a check on a pink circle on success.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md`, and the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

Routes, behavior, labels, form fields, `data-testid`s and accessibility attributes are unchanged. Only ids and class names were added.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted on `main`.
- **Article figures stay announced:** the spec says figures should be `aria-hidden`, but the smoke test needs a visible `role="img"` inside each figure. They keep their alt text as the accessible label.
- **No mobile menu:** the spec's mobile header uses a menu button that opens a dialog. With only two links, the pills fit at 390px, so I kept them visible.
- **Hover not checked:** the snap tool can't hover, so I checked the lift, focus and reduced-motion rules by reading the CSS, not by screenshot.
- **Form states not checked:** the newsletter error/success and no-results states are covered by passing tests. I didn't screenshot them.
- **Smaller gaps:**
  - The spec's search field has an icon button; I left it out because the search filters as you type, so the button would do nothing.
  - Under the spec, a form submitted with errors should move focus to the first bad field; I left that out to keep existing behavior.
  - Nothing in the app loads, so there is no loading state.

**Decisions I made**
- **Section colors:** home and articles are yellow, About is periwinkle, error pages are red. Each screen uses only one.
- **One pink action:** the footer "Subscribe" button is always black. That leaves the single pink action per screen to the hero button, "Clear filters" or the return link.
- **Content width:** the narrower 1152px width, since the spec assigns it to articles and marketing pages.
- **Card titles:** black text instead of grey underlined link style; the whole card is the link.
- **Body text:** article text uses the spec's 1.375 line height, which is tighter than before.
- **Fonts may affect the test:** they come from Google Fonts, so if that request ever fails, the "no console errors" test could fail.
- **Old spacing names:** the old `--space-4/8/12` names clashed with token names, so they now mean 4/8/12px. Every old use was restyled at the same time.