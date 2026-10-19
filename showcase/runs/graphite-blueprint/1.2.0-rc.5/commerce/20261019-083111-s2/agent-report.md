Graphite Blueprint is now applied to every screen. The build passes, all 10 smoke tests pass, and the final snapshot run reported no sideways scroll on any page, light or dark, at 1440px or 390px. The work is **not committed**: the commit command wasn't approved in this run, so all changes are sitting in the working tree. The spec suggests one commit for the tokens, fonts and signature pieces, then one per screen.

**What changed**
- **Foundation:** I copied the spec's tokens into the app and mapped the old variable names onto the new ones. Fonts are self-hosted from npm packages (Inter and Geist Mono), with no font CDN. Light and dark follow the device setting. The reduced-motion rule is applied site-wide.
- **Header:** sticky and translucent, with the store name, Shop and Cart as pill links, and the cart as an icon button with a count badge.
- **Product grid:** the heading sits left with the description on the right. Category chips, an "In stock only" checkbox (indigo when checked) and a restyled sort menu sit above the grid. The result count is a small uppercase mono label. Products are in a hairline grid of 4, 2 or 1 columns. Each card shows a generated line drawing in place of a photo, captioned with a figure number and one real fact, like `FIG 07 · 350 ML`. Sold-out items get a small badge. The no-results state shows a still dot glyph.
- **Product detail:** the product's drawing sits on a softly lit panel. Beside it are the category and option count, the name, the price, size or colour as segmented pills, a restyled quantity stepper, and Add to cart as the dark pill. A check icon appears with the "Added…" message.
- **Cart:** a screen header ("3 items", "Your cart", and how much more is needed for free shipping). The page is in two numbered sections, `01 / 02` Items and `02 / 02` Checkout. Each cart line has a stepper, the line total and a small Remove button. The checkout form follows the field spec. A failed submit now also shows a "2 fields need attention" banner above Place order.
  - **Empty cart:** shows a stacked-slab line drawing.
  - **Order confirmation:** shows a connected-pair drawing with a moving connector, which stops under reduced motion.
  - **Not-found pages:** show the pair with a broken connector and one red point, on a lit panel.
- **Design-system notes:** added `design-system/` (version, tokens, `components.md`) and one-line `AGENTS.md` and `CLAUDE.md` files.

I checked the filled cart, the form errors and the confirmation by temporarily pre-filling the cart. That code is removed, and nothing from it remains in `src`.

**What I couldn't apply**
- **Working-state effects:** the store has no loading or background work, so the moving dot glyphs, shimmer, live edges and pulse are built and documented but not shown anywhere. The spec forbids faking a working state.
- **Landing-page pieces:** the brightly lit hero panel, the row of three drawings and the page-closing statement have no matching screen. No page ends in a single final action; the cart ends with its main form, which the spec excludes.
- **Two buttons on error pages:** the spec's error layout has two pills, but the pages only have one action, so I didn't invent a second.

**Decisions I made**
- **Image placeholder:** I kept its existing role and label for accessibility instead of hiding it as the spec suggests, because you asked me to preserve accessibility attributes.
- **Picture captions:** each uses a fact not already shown near it. Where every fact was already visible, I used a kind name: OUTERWEAR, COOKWARE, KEYCHAIN.
- **Product grid top:** no top rule (the header's line is directly above) and less top padding than a standard section (96px desktop, 48px mobile).
- **Mobile navigation:** with only two items, they stay visible at 390px instead of moving into a menu sheet.
- **Cart button size:** 32px rather than the spec's 28px, with an invisible area extending the tap target to 44px.
- **Option picker:** I added a faint outline around the size/colour pills so they're visible on the white background.
- **Added dependencies:** two font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`) in `package.json`.
- **Version date:** the spec gives no update date, so `VERSION` uses 2026-10-19.