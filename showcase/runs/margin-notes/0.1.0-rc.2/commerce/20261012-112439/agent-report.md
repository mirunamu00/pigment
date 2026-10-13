The store now uses Margin Notes 0.1.0-rc.2 on every screen, in light and dark. The build and typecheck pass, and the final `node pigment-snap.mjs` run reports no horizontal overflow on any page. I couldn't run the Playwright smoke tests because they aren't among the allowed commands. I kept every route, label, form field, `data-testid` and accessibility attribute, and validation and focus behaviour are unchanged. The checkout error messages now include an icon with no text, so their text still matches what the tests expect.

## What I changed
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package file (all 312 values match). The fonts are bundled with the app through four `@fontsource` packages added to `package.json`, so nothing loads from the network at runtime. The old CSS variable names now point to the new tokens.
- **Shared styles (`src/styles/base.css`):** rewritten for the new look: page widths and 12/8/4-column grids, buttons, inputs, select, checkbox and radio, chips, badges, cards, empty states, callout, focus outlines, and reduced motion. Icons are now outline-only.
- **Root layout:** the shared watercolor filters are added once in `Layout.tsx`. The header is text-only with the brand name, Shop/Cart links and the cart button.
- **New component file:** `src/components/Studio.tsx` holds the decorative pieces: the watercolor bloom, tape and pencil note.
- **Product grid:** a full-width header band with the bloom, "Shop all *goods*" with one serif word, and a pencil note. Products show as image-then-text items without a card box. On mobile the filter chips scroll in their own strip.
- **Product detail:** larger product title, the image placeholder in its "no image" state at 4:3, bordered size/colour options, a success message box after adding to cart, and hairline-separated details.
- **Cart and checkout:** cards for items and checkout, numbers in mono in the summary rows, field errors styled per the spec, and a "Confirmed" badge on the order confirmation.
- **Not-found pages:** a raised empty-state panel with tape, a bloom and a pencil note.
- **Docs:** `design-system/` now has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` contain the pointer line.

The screenshots showed one real bug: on the home page at 390px the toolbar was 10px wider than the screen. The page clip hid it from the overflow check, but it showed in the screenshot width. I fixed it and the screenshots now match the specification.

## What I couldn't apply
- **One commit per screen:** git isn't among the allowed commands, so all changes are uncommitted in the working tree.
- **Tape and a pinned card on the grid:** the store spec puts these on a "featured" product, but the data has none and tape isn't allowed over photos. I left them out rather than invent one.
- **Checkbox tick in Firefox:** the tick is drawn with a CSS pseudo-element. Firefox may show a filled box without the tick, which is still clearly distinguishable.

## Decisions I made
- **Pencil note:** it says "made for every day" and points at the intro line, since there's no featured product to point at.
- **Cart page title:** sized like a product title rather than a large page title, because cart is a working page.
- **Sort select:** 36px tall so it matches the chips in the same row.
- **Sticky mobile bar:** "Add to cart" and "Place order" move into it under 860px. In the full-page mobile screenshots the bar appears mid-page; that's how the capture draws fixed elements, not a layout fault.
- **Not-found pages get decoration:** I counted the "Product not found" state as a page-level empty state rather than a product page.
- **Grid between 860 and 1199px:** two products per row, because the spec's 8-column grid doesn't divide into three.
- **Summary keys:** labels like "Subtotal" are in mono to follow the spec's key/value row rule.