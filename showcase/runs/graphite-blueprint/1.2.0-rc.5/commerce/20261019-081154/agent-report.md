I'm not allowed to run git in this session (only the five listed commands), so I left the work uncommitted.

## Report

I applied Graphite Blueprint 1.2.0-rc.5 to every screen: the product grid, both product detail pages, the cart (empty, filled, checkout errors, order confirmation) and the not-found pages. All 10 smoke tests pass and the build passes. `pigment-snap` finds no sideways scroll on any page at 1440px or 390px, light or dark. I opened the screenshots of every capture route and every extra state, and they match the spec.

**What I changed**
- **Foundation:** `tokens.css` is copied unchanged, so light and dark follow the device setting. The old CSS variable names in `base.css` now point at the new tokens. Inter (variable) and Geist Mono 400 are self-hosted from two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`); no font CDN. The root setup, the focus outline and the reduced-motion block follow the spec.
- **Reusable signature pieces** in `src/signature/` and `signature.css`, built to their recipes: the stage, the dot glyph and dot meter, the blueprints (plus a broken-connector version for errors), the spec plate, the working shimmer and live edges, and the screen and section heads.
- **Header:** sticky and translucent with a hairline edge, nav pills, and the cart as an icon button with its count badge. On a product page the Shop link is styled as the current section.
- **Product grid:** split heading block, filter chips, a native select with a chevron, a custom checkbox and an uppercase mono result count. Products sit in a hairline grid of spec-plate cards; each plate caption names a fact the card doesn't show (e.g. `FIG 03 · 45 LITRE`). The no-results state uses the 48px empty glyph.
- **Product detail:** the plate sits on a quiet stage, with a mono meta line above the name. Size and colour options are segmented pills built on the native radios, and the "added" message has a green status dot.
- **Cart:** a screen head and "01 / 02" section heads. Line items are separated by hairlines and the remove action is a small bordered pill. Checkout follows the form rules and now shows a "3 fields need attention" banner (`role="alert"`) above Place order when fields are invalid. The empty cart shows a stack blueprint and the confirmation shows a box blueprint with a two-tone sentence.
- **Not found** (any unknown page or product): a broken-connector blueprint on a quiet stage, "ERR 404", and a heading.
- I added `design-system/` (`VERSION`, tokens, `components.md`) plus one-line pointers in `AGENTS.md` and `CLAUDE.md`. The temporary review route I used for close-up shots has been removed.

**What I couldn't apply**
- **Commits:** the spec asks for one commit per screen, but git isn't among the commands I'm allowed to run, so everything is uncommitted.
- **Shimmer, live edge, pulse, caret and the loading glyph:** the store has no real background work, live data or loading, and the spec forbids faking them. They're built and documented but not used anywhere.
- **Plate accessibility:** the spec says plates are hidden from screen readers. I kept the existing `role="img"` and label on them instead, because you asked me to preserve accessibility attributes.
- **Not-found buttons:** the error layout calls for two buttons, but the page only ever had one action, so I didn't invent a second.

**Decisions I made myself**
- **No page close:** no page ends in a single final action, so none of them gets the closing statement.
- **Products page heading:**
  - The heading block skips its own top hairline because it sits directly under the header's.
  - It uses less top space than the spec: 96/48px above, 48/32px below (desktop/mobile).
  - The spec's small link beside the description is left out, because there was nothing natural to link to.
- **Grid columns:** 4 columns from 1280px wide and 3 from 1024px.
- **Plate caption text:** I added a small `plateCaptions` map in `products.ts`. Detail pages caption with the item kind (`FIG 01 · TOTE`) because every attribute is already listed beside the plate.
- **New copy:** a few short lines that weren't there before: "N items in your cart", the section descriptions, "Order placed" and "Cart empty". The empty cart keeps its original heading and puts the second sentence in a lighter tone on the next line, rather than one inline two-tone sentence.
- **Confirmation text:** the two existing paragraphs are merged into one two-tone sentence, and Continue shopping is now a dark button.
- **Mobile nav:** with only two links there's no menu sheet; both links fit at 390px.
- **Version date:** the spec gives no update date, so `VERSION` uses 2026-10-19, the latest date in its changelog.