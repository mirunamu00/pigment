Hardlift is now applied to the store: Shop, Product detail, Cart/checkout and the error pages, in light and dark. The build and typecheck pass, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in either theme. I looked at every screenshot. Besides the four main routes, I checked the empty filter result, the empty cart, the cart with items and stacked rows on mobile, checkout validation errors, and both not-found pages. I used a temporary preview route for the cart states and removed it afterwards.

**What changed**
- **Tokens:** `design-system/tokens.css` and `tokens.json` are exact copies of the package files, and `base.css` imports the CSS. Old variable names like `--color-bg` and `--radius` still work as aliases. DM Sans is loaded from Google Fonts in `index.html`.
- **Signature pieces (`src/styles/signature.css`):**
  - Lift buttons in all the spec's variants (pink, ink, ghost, icon/row-action, small, hero).
  - Linked product cards that lift on hover.
  - Pills for the header nav, category filters and the variant choices.
  - Header bands through a reusable `PageBand` component.
  - The sticker animation keyframes.

  Hover motion only runs on devices with a mouse, and every animation stops under reduced motion.
- **Stickers (`Stickers.tsx`):** each of the 11 products has its own drawing on a band-color square, replacing the generic image icon. Each state has a different large sticker: a tag (no filter results), a coin (empty cart), a parcel (order placed), an arrow (page not found) and a question bubble (product not found).
- **Screens:**
  - **Shop:** yellow band with the filter pills, toolbar with a custom checkbox and select, and a 4/3/2/1-column grid of lifting cards with pink price tags.
  - **Product detail:** shares the yellow band, with breadcrumb and title in it. Add to cart is the one pink button, Sold out uses the gray disabled style, and the "Added" message appears inline with a pink check.
  - **Cart:** periwinkle band. On mobile each item becomes a stacked block. Form errors show a red border, a warning icon and the message.
  - **Error pages:** red band.
- `design-system/VERSION` and `components.md` are added (`components.md` says where each piece is used and how to reuse it), and `AGENTS.md` and `CLAUDE.md` each get the one-line pointer.

Every route, `data-testid`, label and ARIA attribute is unchanged.

**What I couldn't apply**
- **One commit per screen:** git wasn't among the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **Unused motion:** hero drift, the hero CTA plate, the tag marquee, the draw-on and the loading coin are built to their recipes, but nothing in this app needs them yet. It has no landing hero, tag lists or loading states.
- **Unchecked screens:** the order confirmation card and the inline "Added" message weren't screenshotted. The smoke tests reach them, but the screenshot tool can't fill in a form. The card-hover lift is built to the recipe but wasn't checked visually.
- **CJK font:** only DM Sans is loaded. The Korean fallback fonts stay in the font list but aren't downloaded, because the app is English-only.

**Decisions I made**
- **Section colors:** Shop and product pages yellow, Cart periwinkle, errors red.
- **Two band colors on one screen:** product placeholders use varied band colors on screens that already have a header band. The imagery rule requires this, though it bends "one band color per screen".
- **Mobile header:** it wraps to two rows (store name and cart button, then the nav pills) instead of a menu dialog, since there are only two links.
- **Added UI:** the checkout form now shows one summary line on submit ("Fix 3 fields below…"), as the spec asks. Sold-out tags got an icon next to the word.
- **Variant choices:** each one is a pill with the real radio button laid invisibly over it, so clicking, keyboard use and the tests all keep working.
- **Spacing aliases:** I didn't alias the old `--space-1..8` scale, because `--space-4` and `--space-8` clash with Hardlift's own token names. That clash is what blew up the sizes in my first screenshot.