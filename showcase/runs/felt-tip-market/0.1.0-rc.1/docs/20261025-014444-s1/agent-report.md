I've applied felt-tip-market@0.1.0-rc.1 to every screen (home, both doc pages, changelog and the 404 pages), in light and dark at 1440px and 390px. The build passes, all 16 smoke tests pass, and no page scrolls sideways. I looked at every screenshot and fixed one problem: the 404 stickers were cropped too hard on mobile. Nothing is committed yet, because the spec's "one commit per screen" needs your go-ahead.

**What changed**
- **Tokens:** `design-system/tokens.css` is an unedited copy of the package's `tokens.css`. The old variable names in `base.css` now point at the new tokens, so existing rules keep working. Dark mode follows the system setting.
- **Fonts:** Space Grotesk and JetBrains Mono are bundled with the app through two font packages (`@fontsource/space-grotesk` and `@fontsource/jetbrains-mono`) instead of loaded from Google's servers. If an outside font server can't be reached, the browser logs a console error, and one smoke test fails on any console error.
- **Signature elements:** each is a reusable piece in `src/styles/felt-tip.css` and `src/components/ft/`:
  - **Lift and plate stack:** every button and linked card lifts on a hard shadow when hovered and slams flat when pressed. The plate stack sits behind "Get started" on home and behind the recovery link on 404 pages.
  - **Bands:** each doc and changelog page opens on its area's color band (`AREA_BANDS`). Home has a sticker hero and a checkerboard split band for Quick start, and every page ends on the black footer.
  - **Ink frames and pills:** outline boxes and pills throughout; the current page is a filled black pill (white in dark mode).
  - **Price flag:** page counts on the home cards, and "New" on the latest release.
  - **Sticker kit:** six original drawings (pencil and ferrule, parcel, stopwatch, curled config slip, run token, key), plus a "fast" word badge and a rocking loading sticker. They drift as you scroll and stop under reduced motion; lifts then switch instantly.
- **Components:** the search menu, callouts, the parameters table (its first column stays put when it scrolls sideways on mobile), code blocks, the package-manager tabs, the feedback confirmation, the pager and the changelog status pills all follow the spec.
- **Mobile:** below 1024px a two-line menu button opens the sidebar as a full-screen white panel of ruled rows.
- **Docs:** `design-system/` now holds `VERSION`, the tokens and `components.md`, which records the band map, the sticker subjects and where each piece is used. `AGENTS.md` and `CLAUDE.md` point to it.
- All routes, behavior, labels, `data-testid`s and accessibility attributes are preserved.

**Not applied**
- **Footer input with pink arrow button:** the docs site has nothing to subscribe to, so a working-looking input would be fake.
- **Pink closing band:** product screens are limited to one band color.
- **Charts and the loading sticker:** the app has no charts and no loading states. The loading sticker is in the kit but not used anywhere.
- **Search inside the header band:** search stays in the top bar on every page.

**Decisions I made**
- **Band colors:** Getting started is lemon, Guides periwinkle, API reference teal, Resources marigold, and Changelog lemon, as the cycle repeats. Home's hero is periwinkle (lemon would hide the lemon plate behind "Get started"), and 404 pages use marigold.
- **Menu button:** it now shows only the two-line icon; the "Menu" label is still there for screen readers.
- **Changelog badges:** these use outline pills with status dots instead of colored chips, so the page keeps one band color.
- **Repository link:** it is the full-height black block at the right of the top bar.
- **Breakpoint:** the sidebar now turns into a panel below 1024px instead of 900px.
- **Small additions:**
  - **Parameters tables:** each table's scroll area can now be focused and has a label.
  - **New copy I wrote:** the "Four ways in" heading on home, the footer headline "Run only what changed." and its link columns.
  - **Sticker placement:** stickers on mobile are smaller and placed in the corners so they never cover text.