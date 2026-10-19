Margin Notes is now applied to every screen: the product grid, both product detail pages, the cart, checkout and its confirmation, and the not-found pages. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I checked each screen in light and dark, plus three states the default routes don't capture: a filled cart, checkout errors, and the add-to-cart toast. That last check used a temporary route, now removed.

The snap tool's sideways-scroll check can't see overflow anymore, because the spec's `overflow-x: clip` hides it. It missed a real bug: the mobile filter toolbar was 12px wider than the screen. I found that from the screenshot width and confirmed it with `--measure`. It's fixed, and the later screenshots fit.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's tokens file, imported first. Old variable names point to the new tokens. The fonts load from Google Fonts.
- **Styles:** `src/styles/base.css` is rewritten using only tokens:
  - one 1360px container with 40px edges (16px on mobile);
  - 12/8/4-column grids;
  - buttons, inputs and the sort select with its own chevron;
  - checkbox, filter chips and a segmented control for variants;
  - cards, the image placeholder, badges, error messages, and focus, hover and disabled states.
- **Signature elements:** each is a reusable piece in `src/components/Studio.tsx` (the shared filters, bloom, tape, pencil note, serif word with swash, and the empty-state wrapper). They are hidden from screen readers and never take clicks.
  - Product grid: the bloom behind the header, "goods" in serif with the swash, and a note on the lead ("made for daily use").
  - Empty cart and not-found pages: the empty-state bloom, one tape strip and a note on the button.
  - Product detail, cart and checkout get none, as the spec requires.
- **New behavior:**
  - A toast component confirms "Added to cart" and "Order placed".
  - The add-to-cart message is now a green success badge with a check.
  - Checkout shows a "3 fields need attention" box at the top, and each field error has an alert icon.
  - On mobile, "Add to cart" and "Place order" sit in a fixed bar at the bottom of the screen.
  - The filter chips scroll in their own strip on mobile.
  - On mobile, the product h1 now comes before the image, so nothing sits between the breadcrumb and the title.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` have the pointer line.

All test ids, labels, routes, form fields and accessibility attributes are unchanged. The markup changes are added class names and a few wrappers. The confirmation page now uses a plain card instead of a green background, because the spec bans colored section backgrounds.

**Couldn't apply**
- **One commit per screen:** git wasn't in the commands I was allowed to run, so all changes are uncommitted.
- **Leftover file:** I also couldn't delete files. `src/pages/PreviewPage.tsx` (from the temporary route) is now just an empty export; please delete it.
- **Not used:** this app has no dialogs, switches, tabs, tables, a featured item or a theme toggle, so those components aren't built. There's no tape on the product grid for the same reason.

**Decisions I made**
- **Heading sizes:** the cart and checkout use the smaller record-detail title size. The not-found titles use the empty-state title size, even though they are h1s.
- **Number fonts:** prices on cards and the detail page are in the regular font. Cart line totals and the order summary use the monospaced font, as "totals". Product details are a plain list with dividers.
- **Card grid:** 4 cards per row on desktop and at medium widths, 2 on mobile.
- **Product images:** each image now uses the plain grey placeholder in a 4:3 frame; the per-product tinted colors are gone. The icons are outlines only.
- **Success badge:** it wraps a full sentence and link, which is more than the spec's one or two words.
- **Mobile tap targets:** I made the header links and cart button 44px tall to meet the spec's minimum.
- **Toast wording:** the toast messages are new text I wrote. The toast has a dismiss button, and the sort select uses the 32px toolbar height.