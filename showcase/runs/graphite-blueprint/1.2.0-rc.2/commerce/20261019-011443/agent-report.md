Every screen of the store now uses Graphite Blueprint 1.2.0-rc.2, in both light and dark (it follows the device setting). The build passes, all 10 smoke tests pass, and the final screenshot run reports no page scrolling sideways. I checked every page at 1440px and 390px in both appearances. I also checked the filled cart, the checkout errors, the order confirmation, the 404 pages and the signature pieces on their own through temporary routes, which I've since removed.

**What changed**
- **Setup:** I copied the spec's tokens into the app and mapped the store's old CSS variables onto them. Inter and Geist Mono are self-hosted from two font packages added to `package.json`, not loaded from a CDN. I added the root styles, focus ring and reduced-motion block the spec calls for.
- **Signature pieces:** each one is a reusable piece built to its recipe, in `src/signature/` and `src/styles/signature.css`: the stage, dot glyph and dot meter, blueprints, spec plates, shimmer and live edges, and the screen head, section head and banner.
- **Header:** sticky and translucent, with pill nav links and the cart as an icon button with a count badge. On a product page the Shop link shows as current, and its `aria-current` is unchanged.
- **Product grid:** a screen head with "CATALOG", the h1 and a two-tone line. Pill filter chips, the spec's checkbox, a native select with a chevron, and a mono result count. The cards sit in a hairline grid, each with a spec plate captioned like `FIG 01 · 18 OZ`. No filter matches shows the empty dot glyph.
- **Product detail:** the plate sits on a quiet stage, with a mono meta line above the name and size/colour options as segmented pills. "Added to cart" shows as a success banner.
- **Cart:** "01 / 02 Items" and "02 / 02 Checkout" section heads. A failed submit now shows a "3 fields need attention" banner (`role="alert"`) above Place order, and focus still goes to the first invalid field. The empty cart and the confirmation each get a small blueprint; the confirmation's connector animates.
- **Not found pages:** a broken-connector blueprint on a quiet stage, "ERR 404", and two buttons.
- **Docs:** a `design-system/` folder (VERSION, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md` pointing to it.

Fixed during review: at 390px the cart was wider than the screen because the 12-column grid's gaps alone were wider than the phone, and the page's clipping hid this from the overflow check. I also fixed the size picker stretching to full width on mobile.

**Not applied**
- **No commits.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted on `main`.
- **Loading glyphs, shimmer, live edges:** built but not shown anywhere. The store does no real background work, and the spec forbids faking a working state.
- **Page close, mobile menu sheet, header button:** no page ends in one final action for a page close, there are only two nav items (both fit at 390px), and the header has no main action for the dark pill button.
- **Plate accessibility:** the plate keeps the store's `role="img"` and its `aria-label` so the existing accessibility attributes are preserved. The spec would hide it from screen readers instead.

**My own decisions**
- The product grid h1 uses the larger content size; the cart uses the smaller app size.
- Card plate captions use one real product detail the card doesn't show. On the detail page every detail is listed, so the caption names the item's kind instead (`FIG 01 · TOTE`).
- I wrote three short new lines of copy: "Change quantities or remove items.", "Where should we send your order?", and the "N fields need attention" banner.
- I added a "View cart" link next to "Back to the shop" on the 404 pages, because the spec's error state calls for two buttons.
- The empty states keep their existing headings (shown as a semibold line over secondary text) rather than becoming a single two-tone sentence.
- The VERSION file uses today's date, since the spec gives no release date.