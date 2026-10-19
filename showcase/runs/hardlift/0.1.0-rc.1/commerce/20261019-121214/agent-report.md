Hardlift is applied to every screen of the store. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. After the last fixes I checked the screenshots of every page against the spec; the header now measures exactly 80px and buttons 48px.

**What I changed**
- **Tokens and font:** copied `tokens.css` unchanged into `src/styles/` and import it first. The old variable names in `base.css` still work as aliases, except two (below). DM Sans is loaded from Google Fonts at weights 400 and 700. Light and dark follow the system setting, and `data-theme` on `<html>` can force either one.
- **Reusable signature pieces:**
  - **Lifting buttons and cards:** a set of `.lift` button classes (pink, ink, ghost, icon, small, and the hero plate). Product cards lift as a whole.
  - **Color band:** a `PageBand` page header component.
  - **Pills:** used for navigation, category filters and the size/color options, where a selected radio shows a pink dot.
  - **Stickers:** a `Coin` sticker plus small tag and star stickers, with the drift, tag-wall, turning-coin and draw-on animations.
  - All motion stops under reduced motion, and there are high-contrast (forced-colors) fallbacks.
- **Screens:**
  - **Shop:** yellow band containing the category pills; a toolbar with a small tag sticker, a styled checkbox and select; a 4/3/2/1-column grid of lifting cards with pink price tags and a "Sold out" badge with an icon; an empty state with a sticker.
  - **Product detail:** yellow band with the breadcrumb and title; framed image; size/color pills; quantity buttons with a 2px lift; one pink "Add to cart"; the "Added…" message is now a raised card with a hard shadow; a star sticker beside "Details".
  - **Cart:** teal band; outlined cards; a grey summary box with a bold total; pink focus halo and error borders with icons; one pink "Place order".
  - **Empty cart, order confirmation and not-found** (red band) each get a large coin sticker and a pink button.
- Added `design-system/` (`VERSION`, both token files, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the one-line pointer.

**What I could not apply**
- **One commit per screen:** git wasn't among the commands I was allowed to run, so all changes are uncommitted.
- **Not used because the app has no place for them:** the landing hero (drifting stickers, hero button on its plate), the turning-coin loading state, the tag wall, dialogs and toasts. They are built and documented, but nothing in the app uses them yet.
- **Update date:** the spec gives no date for `VERSION`, so I used today (2026-10-19).

**Decisions I made myself**
- **Section colors:** Shop and product detail are yellow, Cart and checkout are teal, error pages are red. Product image placeholders use the page's band color with an ink drawing per category, because the spec's colored placeholders would otherwise break its "one band color per screen" rule.
- **Text on bands** is always black (the spec's "text on action" color), so it stays readable in dark mode.
- **Mobile header:** with only two links, the nav stays visible as pills instead of a menu dialog.
- **"Added to cart" message:** kept in place in the page flow rather than as a fixed bottom-left toast, because the app has no way to dismiss it.
- **New line in checkout:** I added one sentence the app didn't have — "Fix the highlighted fields to place your order." — announced to screen readers, as the spec asks for.
- **Spacing names:** `--space-4` and `--space-8` now mean 4px and 8px as in the tokens; they used to be 16px and 32px.
- **Option pills** reach the 44px touch target by height, not an invisible overlay. The overlay sat on top of the radio and broke two smoke tests.
- **Remove button:** the cart's "Remove" is now a small outline button with a 2px lift, not a text link.

`npm install` created `package-lock.json`, which I left in place. The temporary preview routes I added for screenshots have been removed.