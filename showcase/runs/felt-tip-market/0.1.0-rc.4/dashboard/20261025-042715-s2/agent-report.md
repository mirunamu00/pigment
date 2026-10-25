Felt-tip Market is now applied to every screen. The build passes, all 10 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I checked the screenshots in light and dark against the spec and fixed what was off.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a word-for-word copy of the package tokens, so light and dark follow the system setting or `data-theme`. The old variable names in `base.css` still work and now point at the new tokens. Space Grotesk and JetBrains Mono are bundled with the app through `@fontsource` packages, so nothing is loaded from Google at runtime and the tests can't fail on a network error.
- **Signature elements, built as reusable pieces:**
  - **Lift and slam** and the **plate stack**.
  - **Bands:** header band, error band, and the split band and hero action row. The last two are built but not used, since this app has no front page.
  - **Ink frames:** ink boxes, ruled lists, pills and the dashed empty box.
  - **Notched price flag.**
  - **Stickers:** a sticker builder that follows the five-step recipe, and a kit of five drawings from the ops domain: a parcel, an empty clipboard, a key, a traffic cone and a page.
  - **Footer:** a black footer with a "Find a project" lookup and a pink arrow button.
  - All motion stops under reduced motion.
- **Area colors:** Overview is lemon, Projects (including project detail) is periwinkle, Team is teal and Settings is marigold.
- **Screens:**
  - **Overview:** header band with the parcel sticker, stat tiles with dot legends, a framed chart (grey bars with an ink top edge and a pink trend line), and the recent-activity list.
  - **Tables:** paper header row, ink rules and a price flag in each budget cell.
  - **Loading and empty states:** dashed placeholder boxes with visible "Loading" text, and a rocking glyph on the Refresh button. When filters match nothing, the empty state shows the clipboard sticker.
  - **Project detail:** breadcrumb, status pill and pill tabs inside the band. On phones the Files table becomes label–value rows.
  - **Team:** the active-project count gets the flag.
  - **Settings:** the placeholder gets the key sticker and a plate-stack button.
  - **Not found:** both the 404 page and a missing project get a full-height band with the cone and page stickers and a plate-stack button.
- **Checks:** the Overview sticker measures 200px on desktop and 120px on phones, with 75% showing. I checked the sticker construction close up on a temporary page and then removed its route.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` each have the one-line pointer to it.
- Every route, label, `data-testid` and ARIA attribute is unchanged. I only added a few attributes: `aria-busy` on Refresh, and labelled, keyboard-focusable scroll areas around the tables.

**What I couldn't apply**
- **One commit per screen:** committing wasn't among the commands I was allowed to run, so everything is uncommitted in the working tree.
- **Leftover temporary file:** for the same reason I couldn't delete `src/pages/StickerSheet.tsx`. It is now an empty stub that nothing imports; please delete it.
- **Copy of the tokens in `design-system/`:** I didn't add one. `components.md` points to `src/styles/tokens.css` and the package files instead.
- **Pink on Overview:** the spec allows pink in at most three roles per screen. Overview uses it four times when an input is focused: chart line, price flags, footer arrow button and the focus halo. The spec calls for every one of these.

**Decisions I made myself**
- **Navigation:** I kept the existing left sidebar, which is the spec's sidebar variant. Below 1024px it becomes a scrolling row of pills rather than a menu button that opens a full-screen panel. That keeps the current behaviour and markup.
- **Chart:** there is only one data series, so the pink line traces the same values as the bars and is labelled "Trend". The chart's accessible label is unchanged.
- **Status dots:** Active is teal, Paused is marigold, Done is periwinkle.
- **No flags in some places:** none on the KPI tiles (none of them is money) or on file sizes (not money or a count).
- **Footer:** it fills the "footer on every page" rule with a project lookup that behaves like the top search. On the black footer the lift shadow uses the 35% white token, because a black shadow wouldn't show.
- **Disabled buttons on a band:** they keep their white fill with muted grey text instead of the grey disabled fill.
- **Settings:** it stays a placeholder with an empty state. I didn't invent settings content to show the spec's settings layout.