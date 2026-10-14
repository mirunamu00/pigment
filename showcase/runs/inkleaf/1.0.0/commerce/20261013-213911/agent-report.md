Inkleaf is now applied to every screen of the store. The build passes, no page scrolls sideways at 1440px or 390px in light or dark, and both appearances follow the system setting. I couldn't run the smoke tests (`npm run test:e2e` isn't one of the commands I'm allowed to use). Every `data-testid`, label, route, form field and accessibility attribute the tests rely on is still in place, but that is unconfirmed until you run them.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` imports the shipped `tokens.css` directly, so no values were retyped. `src/styles/base.css` is rewritten on those tokens. `index.html` loads Source Serif 4, Instrument Sans and JetBrains Mono from Google Fonts.
- **Signature pieces, built as reusable parts:**
  - The brush filters, added once at the app root.
  - The hand-drawn pictogram (`Picto.tsx`, drawings in `drawings.ts`) with 17 original drawings, 9 of them with a hand.
  - The pastel stage, the 4:3 drawing stage and the plate (`Stage.tsx`), with each product keeping one color everywhere.
  - Headings that fade in word by word (`WriteIn`), the header (`PageHeader`), the empty and error state (`EmptyState`), and the scroll-in effect for blocks (`useBlockRise`).
  - The written-loop working glyph and the breathing dot (`Working.tsx`).
  - The button, chip, checkbox, radio, select, card and badge styles.
  - All of the animation stops under reduced motion.
- **Shop:** small basket drawing beside the h1. Products have no photos, so each grid card shows that product's own drawing on a colored plate. There are stone filter chips (ink when selected), a restyled checkbox and select, outline "Sold out" badges, and an empty state with a hanger drawing.
- **Product detail:** the product's drawing on a drawing stage, plus restyled radios, quantity stepper and "Added …" message with a check-circle.
- **Cart:** price-tag drawing in the header. Items, checkout and a sticky "Order summary" card sit in a side column on wide screens and stack on mobile. There is an empty-cart drawing (open box) and an order confirmation drawing (tied parcel).
- **Not found** (page and product): a spool drawing on a small apricot stage, a serif h1 and two actions.
- **Docs:** `design-system/` (`VERSION`, `tokens.css`, `components.md` with each drawing's subject and its one-word name at small size), plus pointer lines in `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **One commit per screen:** git isn't one of the allowed commands, so nothing is committed.
- **Working glyph and breathing dot:** both are built but not placed. Every action in this store finishes instantly, and the spec says not to show a waiting state for that.
- **Accent fill:** there's no landing hero, so it isn't used anywhere.
- **Reduced-motion review:** the screenshot script can't emulate reduced motion. In the full-page shots, product cards below the first screen and the "Details" heading on mobile appear blank. That is the intended reveal-on-scroll, not a bug, but I couldn't see them in their final state.
- **Unchecked drawings:** the screenshots caught the screen drawings mid-animation, so I haven't seen their finished frames. That covers the hanger, box, parcel and spool, and the spool's not-found screen isn't captured at all. The 11 product drawings are verified, since the plates show the finished frame.

**Decisions I made myself**
- The product detail page has no small header drawing; the large product drawing is that screen's drawing.
- The not-found stage is sized so its drawing is exactly the spec's 128px size.
- The cart summary got a visible "Order summary" title.
- A failed checkout now shows "N fields need attention" (`role="alert"`) above the submit button, as the spec describes.
- Not-found screens gained a second action, "View cart".
- The image placeholders keep their existing `aria-label` text ("… product photo placeholder").
- Short drawings get extra repeated end frames to reach the spec's 12-frame minimum.
- The three garments (sweater, tee, coat) share a similar overall outline. I kept them different by sleeve length, collar and pockets, but you may want to review that against the "no two drawings alike" rule.
- Media queries use the literal breakpoint values, because CSS variables can't be used there.