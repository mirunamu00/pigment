I've applied Graphite Blueprint 0.1.0-rc.3 to every screen: the product grid, both product detail pages, the cart (empty, filled, checkout errors, confirmation) and both not-found pages. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px, in light or dark.

I checked screenshots of every screen at both widths and in both modes. The cart states and the "no results" filter state were captured through temporary routes and a URL, all since removed. Every route, behavior, test-relied text, form field, `data-testid` and accessibility attribute is unchanged. `src/App.tsx` ends up identical to the original.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a verbatim copy of the package tokens, imported first by `src/styles/base.css`. The old variable names are kept as aliases. Light and dark both follow the device setting; there is no theme switch. Inter (variable) and Geist Mono are self-hosted from two font packages I added to `package.json`. I avoided a font CDN because a failed font download would show up as a console error and break the console-error smoke test.
- **Signature pieces:** all six are built from their recipes as reusable parts in `src/design/figures.ts` and `src/design/Signature.tsx`. Before any screen work I rendered them on their own at 2x in both modes and they matched the recipes.
- **Screens:**
  - **Header:** sticky and translucent, with ghost nav pills and a cart icon button carrying the count badge.
  - **Product grid:** split heading at the top, filter chips, a hairline grid of cards with a generated figure per product, mono category labels, a dot-glyph empty state, and the shipping/returns promise as the closing statement over the dot field.
  - **Product detail:** the product's figure on a quiet stage with a FIG caption, a 32px name, and segmented pills for colour or size.
  - **Cart:** new screen header, "01 / 02" and "02 / 02" section headers, an empty state with a stacked-slab drawing, a "3 fields need attention" banner on a failed checkout, and a confirmation with a joined-parts drawing and a two-tone sentence.
  - **Not found (both):** a broken-connector drawing on a quiet stage, "ERR 404", and two pills.
- **Docs:** `design-system/VERSION` and `design-system/components.md`, plus `AGENTS.md` and `CLAUDE.md` with the pointer line. I also updated one paragraph of `README.md`.

**What I couldn't apply**
- **One commit per screen:** git isn't in the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **Working-state effects** (shimmer, live edge, pulse, caret, running glyphs): the store has no real async work, and the spec forbids fake loading. The classes exist but nothing uses them.
- **Mobile menu sheet:** with only two nav links, I left the nav visible at 390px instead of adding a sheet.
- **Inverse pill in the header:** there's no header call to action to give it to.
- **Closing statement size:** I used 48px (24px on mobile), not the spec's 72px. At 72px the text would run over the dot field, and on mobile it would break the two-line limit.
- **Dot field on mobile:** hidden, because there the statement spans the full width and the dots would sit under text.

**What I decided myself**
- **Grid heading spacing:** the top of the grid uses 48px padding (32px on mobile) instead of the 160px meant for long content sections.
- **Spec-figure captions:** each card's caption is the figure number plus the product's first detail (e.g. "FIG 01 · 18 OZ COTTON CANVAS"), so it names the item.
- **Variant pills:** the native radio is stretched transparently over each pill, so a click lands on the real input and the tests' `.check()` still works.
- **New copy and links:** I added a "Browse kitchen goods →" link at the top of the grid, a "View cart" / "Back to top" pair under the closing statement, short section descriptions in the cart, and figure captions.