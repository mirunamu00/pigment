I restyled every screen to margin-notes@0.1.0-rc.1, but nothing has been built or tested. `npm run build`, `npm install`, `git` and `curl` all needed approval this unattended run didn't have, and there's no `node_modules`. So nothing is compiled, the smoke tests haven't run, nothing is committed, and no branch exists. I checked the TypeScript and markup by reading them only.

To finish: run `npm install && npm run build && npm run test:e2e`, then make the commits. The spec asks for one commit per screen, with tokens/fonts in their own commit first. The CSS is already split into one file per screen so that works.

**What I changed**
- **Foundation:** `tokens.css` is copied unchanged into `src/styles/` and `design-system/`, with `tokens.json` alongside. The old variable names in `base.css` now point at the new tokens. Light and dark both work: dark follows the system setting unless the page sets `data-theme`. Reduced-motion turns transitions off.
- **Fonts:** Geist (400/500/600), Geist Mono (400/500) and Instrument Serif italic load from Google Fonts in `index.html`.
- **Shared parts:** the watercolor filter SVG renders once in `Layout`. Header and footer follow the navigation spec. Buttons, fields, select, checkbox, radio, chips, cards, badges, callout, empty state, product image frame and quantity stepper all follow the spec. Icons are now 1.5px outlines, and I added check, alert and chevron icons.
- **Product grid:** watercolor bloom behind the page header, serif "goods" with an underline swash, a 12/8/4-column grid, borderless product cards with the whole card clickable, and a dashed "Sold out" badge.
- **Product detail:** radios styled as selectable tiles, a success message box after Add to cart, and the main button moves to a bar fixed at the bottom on narrow screens.
- **Cart:** white cards, prices in a monospace font, error messages with an icon, and a restyled confirmation.
- **Not found pages:** empty-state panel with serif "found".
- **Docs:** `design-system/` has `VERSION` and `components.md`. `AGENTS.md` and `CLAUDE.md` have the pointer line.

Every route, label, form field, `data-testid`, ARIA attribute and piece of behavior is unchanged. Heading names still match the tests, because the decorative SVGs are `aria-hidden`.

**What I couldn't apply**
- **Build, tests, commits:** blocked as above. The spec's "check every screen at 1440px and 390px, light and dark" step wasn't done either.
- **Font risk:** I couldn't check whether the test environment has internet access. If it doesn't, the font stylesheet fails to load and Chrome logs a console error, which fails the "no console errors" smoke test. The fix is to bundle the fonts locally (e.g. `@fontsource`), which also needs `npm install`.
- **Tape:** not used. The spec puts it only on up to 2 "featured" product cards, and the catalog has no featured flag.
- **Pencil notes:** not used, since there's no onboarding or first-run hint, so the handwriting font isn't loaded.
- **Mobile menu sheet:** not built. On mobile the header nav stays visible and the cart button shows only the icon and count.

**Decisions I made myself**
- **Product images:** the five colored placeholders (sand, olive, slate, clay, stone) all show the same neutral tray color now, because the spec forbids colors outside its tokens. The `tone-*` classes are still in the markup but do nothing.
- **Studio decorations:** none in cart or checkout, following the spec's store rule. That overrides the "one serif word per page title" rule there, so the cart and confirmation titles have no serif word.
- **Product detail title:** the product name has no serif word, because I treated it as data.
- **Other choices:**
  - The empty-state headings, including the not-found `h1`, use the spec's empty-state title size (22px) instead of the page title size.
  - The header cart count is a neutral badge in monospace.
  - The product grid's "Clear filters" empty state uses the flat resting style because it sits inside the catalog.
  - Product link focus draws a ring around the whole card.