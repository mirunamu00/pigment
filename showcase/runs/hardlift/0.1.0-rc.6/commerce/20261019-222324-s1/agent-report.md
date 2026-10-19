I've applied Hardlift to all four routes plus the empty, error and confirmation states, in light and dark. The build passes, all 10 smoke tests pass, and the final screenshot pass shows nothing scrolling sideways at 1440px or 390px. I also checked the empty-filter, empty cart, filled cart, checkout errors, order confirmation and both not-found screens through extra paths and a temporary route, which I've removed.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package file, loaded first in `src/main.tsx`. Dark mode follows the system setting or `data-theme`. DM Sans and Noto Sans KR load from Google Fonts in `index.html`. The old variable names in `base.css` now point at the new tokens.
- **Shared pieces** in `src/styles/signature.css`:
  - Lift buttons: pink, ink, ghost, 2px icon and small variants, plus lifting cards.
  - Color bands, pills and badges.
  - The motion classes from the spec (drift, tag wall, turning coin, draw-on), all switched off under reduced motion.
- **Sticker art:** `src/components/Stickers.tsx` gives each of the 11 products its own drawing (tote, backpack, duffel, sweater, mug, etc.) on a band-color square. This replaces the old generic image icon. The empty, error and confirmation states each get their own 160px sticker.
- **Header:** 80px tall on white, with pill links (the current page is ink-filled) and an ink cart button with a pink count tag.
- **Shop grid:** teal band holding the title and the category filter pills, which become one scrolling strip on phones. The whole product card lifts on hover and shows a pink price tag. The "In stock only" checkbox and the sort menu are restyled. The empty state has a sticker and a pink "Clear filters" button.
- **Product detail:** the same teal band, with the breadcrumb and title. Variants are choice pills. "Add to cart" is the one pink button, and its confirmation appears inline next to it.
- **Cart:** yellow band. On phones each cart line stacks, with "Remove" as a small ghost button at its full width. "Place order" is the one pink button. Field errors show an alert icon and a red border, plus one summary line at the top of the form. The confirmation card has the hard shadow and a coin sticker.
- **Not-found screens:** red band, sticker and a "Back to the shop" button.
- **Docs:** I added `design-system/VERSION`, `design-system/components.md`, and the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

All routes, labels, `data-testid`s and accessibility attributes are unchanged.

**What I couldn't apply**
- **No commits:** git isn't among the commands I was allowed to run, so all changes are uncommitted. The spec wants one commit per screen.
- **Leftover file:** I couldn't delete `src/pages/PreviewCart.tsx`, from the temporary route. It's now an empty module that nothing imports, so please delete it.
- **Hover not visually checked:** the screenshot tool can't hover, so I haven't seen the card or button lift in a screenshot. Each one is built exactly to the spec's recipe.
- **Motion with no place to go:** drifting hero shapes, the tag wall and the turning coin are built but unused, because the app has no landing hero, tag list or loading state.
- **Draw-on removed:** I first used the outline draw-on for the 160px state stickers. It runs for 8 seconds, so screenshots caught the stickers half-drawn, and the spec only assigns it to loading states. Those stickers are now static.
- **Band colors on one screen:** product placeholders use several band colors on the teal page. The spec asks for varied placeholder colors but also bans mixing band colors on one screen, so I treated placeholders as imagery.

**Decisions I made myself**
- **Section colors:** Shop and product detail are teal, Cart and confirmation are yellow, errors are red.
- **Phone header:** it wraps into two rows instead of a menu dialog, since there are only two links.
- **Input focus:** the outer focus outline sits 4px out rather than 2px, so it doesn't cover the pink focus ring.
- **Reduced motion:** the ink cart button keeps its ink color on hover instead of turning pink, so the header never shows a pink action.
- **Checkout summary line:** the spec asks for it, but it is new text that wasn't in the app before.
- **No theme switch:** there's no light/dark toggle in the UI; the theme follows the system setting.
- **CSS split:** I split the styles into one file per screen.