I've applied felt-tip-market@0.1.0-rc.4 to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark. I checked the screenshots of every page plus the 404 and a filled cart, and measured the hero numbers: the hero button pair is 60px tall and equal width on desktop and stacks full width at 48px on phones. Hero stickers are 256/158px on desktop and 120px on phones, each cropped by one side or the bottom by about 25–30%. I couldn't screenshot the order confirmation or the "no products match" empty state, because both only appear after clicking through, so I haven't seen those two visually.

**What changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of `dist/tokens.css`, loaded first by `src/styles/base.css`. The old variable names still work, mapped onto the new tokens. Light and dark both follow the system setting.
- **Fonts:** Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - The lift-on-hover effect, the plate stack behind the main button, and the hero button row.
  - Poster bands (hero, header and error), white ink-framed boxes, ruled rows, pills and dashed empty boxes.
  - The pink price flag and the drawn product images.
  - A sticker builder in `src/stickers/` with 17 original drawings: 6 store objects and one per product. There is also one word badge, a rocking loading sticker and the header-band sticker placement.
- **Top bar and footer:** an 80px bar with pill links and a black full-height cart block. Below 1024px a menu button opens a full-screen panel, which traps keyboard focus and closes with Escape. The footer is black with a big headline, link columns and an email field with a pink arrow button.
- **Shop (`/`):** a lemon hero with the 96px headline, a "Start shopping" button on the plates beside a "Your cart" button of the same size, and 4 stickers that drift as you scroll. Below it are the filter bar, white product cards that lift on hover, a different drawing per product, and price flags. "No products match" shows a dashed box with an empty-basket drawing.
- **Product detail:** a lemon header band with the breadcrumb and title, a large drawn image, the price flag, and the purchase form in a white panel with option cards for colour or size. Details are a ruled list.
- **Cart:** a periwinkle header band, a ruled item list, a summary with the flag on the total, and the checkout form. Errors show a 2px red border and a "!" disc. The empty cart shows the basket drawing with "Continue shopping" on the plates. The confirmation shows a "done" word badge, the flag on the total and the plate-stack button.
- **404 and "product not found":** a full-height teal band, a 72px sentence, two stickers and "Back to the shop" on the plates.
- **Docs:** `design-system/` (version, tokens, `components.md` with the area-to-band map and sticker list), plus the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

All routes, behaviour, labels, `data-testid`s and accessibility attributes are kept. Animation stops under reduced motion. The temporary preview route and its file have been removed.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but you didn't ask me to commit, so everything is uncommitted on `main`.
- **No search box:** the store has no search, so the hero pairs its main button with an outline button rather than an input, as the spec allows. The header bands also have no search or tabs.
- **No header-band sticker or loading sticker in use:** no screen is an overview or loads anything. Both are built and ready.
- **No error summary at the top of checkout:** that would add new content, and the per-field errors and focus behaviour are unchanged.

**Decisions I made**
- **Band colours:** Shop is lemon, Cart is periwinkle, and error pages are teal.
- **Pink budget:**
  - I left out the pink closing band. With the footer's pink arrow, the focus outline and the price flag already pink, it would have been a fourth pink role.
  - A selected size or colour gets a thick dark border instead of a pink one, for the same reason. The radio button itself still fills pink, as the radio component spec says.
- **Hero stickers:** I used 4, not 5. A fifth one couldn't fit without overlapping the headline.
- **Hero subjects:** the hero uses store objects (parcel, spool, price tag, receipt), so no object appears twice on the front page next to the product drawings.
- **Lift class:** it carries only the motion. Each component sets its own border, so cards keep the lighter dark-mode border instead of black.
- **Footer email field:** it is new. Submitting only shows a thank-you line and isn't wired to anything.
- **Small sizes:** a few sizes the spec doesn't give as tokens are built by adding or multiplying tokens: the card grid minimum, the hero lead width and the checkbox tick.