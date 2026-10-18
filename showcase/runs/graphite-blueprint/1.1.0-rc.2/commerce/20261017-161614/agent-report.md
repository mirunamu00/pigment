I've applied Graphite Blueprint 1.1.0-rc.2 to every screen. Typecheck and build pass, all 10 smoke tests pass, and the last full snapshot run shows nothing scrolling sideways. I checked the screenshots at 1440px and 390px in light and dark, including the filled cart, checkout errors, order confirmation and 404, using temporary routes. Those routes are deleted. Nothing is committed, because `git` wasn't in the commands I was allowed to run.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's `tokens.css`. The old variable names now point at the new tokens. Inter and Geist Mono are served from the app's own files, not a font CDN. Light and dark follow the device setting.
- **Base styles:** the root setup in `src/styles/base.css` now follows the spec. That covers the focus ring, the reduced-motion rule and no sideways overflow, plus pill buttons, chips, fields, the checkbox, the select, badges, the cart count and a see-through sticky header.
- **Signature elements:** all six are built to the spec's recipes as reusable pieces in `src/design/`, with their styles in `src/styles/signature.css`.
- **Store grid:** a split heading at the top, filter chips and a mono result count. Products sit in a hairline grid of cards, each with a generated line drawing (spec plate) in place of the missing photo. The page closes with the shipping and returns promise over the dot field, with two pill links.
- **Product detail:** the product's drawing sits on a quiet stage with a FIG caption. The name is at 32px and the variants are a segmented pill picker built on the native radios.
- **Cart:** a screen header with a two-tone summary and numbered section heads ("01 / 02 Items", "02 / 02 Checkout"). A failed order now shows an "N fields need attention" banner (`role="alert"`). The empty cart shows a dimmed stack drawing. The confirmation shows a drawing of two joined parts whose connector animates.
- **Not found pages:** both not-found pages now show a broken-connector drawing on a quiet stage, "ERR 404" and two pill links.
- **Project docs:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

All routes, `data-testid`s, label text and form behaviour are unchanged.

**What I couldn't apply**
- **Pieces with no use here:** running dot glyphs, the shimmer, the live edge, the pulse, the caret, the lit stage and the dot meter are built but unused. The app has no real async work, live data, 1-to-5 levels or landing page, and the spec forbids faking a working state.
- **One commit per screen:** not done, because `git` wasn't among the allowed commands.
- **Column heights on the cart page:** at 1440px the checkout column can end slightly more than the spec's 48px below the items column, most visibly when the error messages are showing.
- **Accessibility on the product image:** the spec wants drawings marked `aria-hidden`. I kept the original `role="img"` and label on the product image instead, because those attributes had to be preserved.

**Decisions I made myself**
- **Font packages:** I added `@fontsource-variable/inter` and `@fontsource/geist-mono` so the fonts work without network access and can't cause console errors in the smoke test.
- **Store heading:** it has no top hairline and 96px of space above it, since the header's own hairline sits just above.
- **Mobile header:** with only two nav items, they stay visible inline instead of moving into a menu sheet.
- **Cart button:** it's now an icon button with the count in its top-right corner. The hidden "Cart" label is still in the page.
- **Plate captions:** each one is the catalog number plus the product's first detail, e.g. "FIG 01 · 18 OZ COTTON CANVAS".
- **Closing statement on mobile:** I set it to 24px there so it stays within the spec's two-line limit.
- **Copy I wrote:**
  - the "View your cart →" link
  - the closing's "Shop bags" pill
  - the "Not found" pages' second "View cart" pill
  - the cart section descriptions
  - the confirmation drawing's caption, "Order joined to dispatch / Packed and on its way within two days"
- **Drawing widths** (the drawn figure, not the whole image): confirmation about 273px at 1440px and about 318px at 390px; empty-cart stack about 146px; 404 drawing about 273px on desktop and about 190px inside the mobile stage. The spec's "row of three" size limits don't apply here because no screen has a row of three drawings.