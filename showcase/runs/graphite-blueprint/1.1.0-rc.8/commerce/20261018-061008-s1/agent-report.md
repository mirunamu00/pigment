I've applied graphite-blueprint 1.1.0-rc.8 to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px, light or dark. I opened every screenshot and fixed what was off: a stray hairline under the product Details list, and uneven breadcrumb spacing.

## What changed
- **Tokens and fonts:** `tokens.css` is copied unchanged into `design-system/` and imported by `src/styles/base.css`. The project's old CSS variable names now point at the tokens. Inter (variable) and Geist Mono are self-hosted from two npm font packages I added. Light and dark follow the device setting.
- **Signature pieces:** each one is a reusable file in `src/design/`, built from its recipe, with styles in `src/styles/signature.css`:
  - spotlit stage
  - dot glyph, dot meter and dot field
  - isometric blueprint, including a broken-connector version for error pages
  - spec plate figures
  - shimmer, live edge, pulse and caret
  - split opener, screen head and numbered section head
  - empty and error states built from these

  Looping motion stops on a readable frame under reduced motion.
- **Header and footer:** sticky blurred header, grey nav pills (Shop also stays highlighted on product pages), a cart icon button with a count badge, and a hairline footer.
- **Store grid:** split opener with the h1, filter chips, a custom checkbox and native select, the result count in mono, and a hairline grid of cards with spec plates (`FIG 01 · 18 OZ CANVAS`). It ends with the statement "Over $100? Ships free." over the dot field, plus two buttons. An empty filter result shows the dot-glyph empty state.
- **Product detail:** the figure sits on a quiet stage, with `BAGS · IN STOCK` in mono above the name. Variants are pill-style options on native radios, and Details rows are numbered. After Add to cart, the existing status message shows a short "done" dot glyph that turns into a check.
- **Cart and checkout:**
  - a page head, then "01 / 02 Items" and "02 / 02 Checkout" sections
  - each line has Remove as an outlined button
  - a failed order shows a "3 fields need attention" banner (`role="alert"`) above the button
  - the confirmation shows the joined-pair blueprint with a two-tone sentence
  - the empty cart shows a stacked-slab drawing
- **Not found and product not found:** the broken-connector drawing on a quiet stage, "ERR 404", a heading and two buttons.
- **Docs:** `design-system/` has `VERSION`, `tokens.css` and `components.md`, which says where each piece is used. `AGENTS.md` and `CLAUDE.md` point to it.

I checked each piece on its own, plus the cart, error and confirmation states, through a temporary route. That route and its code have been removed.

## What I couldn't apply
- **Shimmer, live edges, the moving dot glyphs and the dot meter are built but not used anywhere.** Nothing in this app actually runs in the background and no data has a 1-to-5 level, and the spec allows them only while something really runs.
- **No lit landing stage, no row of three blueprints, no article or settings patterns:** the store has none of those screens.
- **Plates and the detail figure keep their original `role="img"` and label** instead of being hidden from screen readers, because I had to keep accessibility attributes. The drawings inside them are hidden.
- **The header has no dark main button**, because there's no suitable action for one. There's also no mobile menu sheet, since both nav links fit at 390px.
- **The address field has no character counter**, since adding a limit would change validation.
- **I made no git commits.** I could only run the commands you listed, so the spec's one-commit-per-screen rollback isn't available.
- **`tokens.json` wasn't copied into `design-system/`**, only `tokens.css`.

## What I decided myself
- **Captions:** each card plate gets one short product fact I wrote (in `ProductImage.tsx`). On the detail page the caption names the figure type instead (`FIG 04 · LATTICE`), because that page already lists every fact.
- **Kept text:** the empty-state headings keep their original text and level and are styled as the bold first sentence of a two-tone line. The footer sentence is split into a title and a note.
- **New copy:** I wrote a few short lines, such as "Where should we send it?", "Cart to packing bench" and "Shop bags".
- **Two styling choices:** "Sold out" is a neutral badge with a grey dot, and the variant picker's track has a faint outline so it shows on the light background.
- **Version date:** the spec gives no update date, so `VERSION` uses today's date and says so.