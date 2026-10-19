Every screen now uses Hardlift in both light and dark. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I opened every screenshot, fixed two dark-mode problems they showed, and re-snapped. Routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What changed**
- **Tokens and fonts:** `tokens.css` and `tokens.json` are copied unedited into `design-system/`, and `base.css` imports them. The old CSS variable names still work as aliases. DM Sans and JetBrains Mono are self-hosted through two `@fontsource` packages, so the pages load no fonts from the network.
- **Reusable signature pieces:**
  - Lift buttons (pink, ink, ghost, small, icon, and the hero version on an ink plate) and whole cards that lift as one link.
  - Color bands, and pills that show their outline on hover.
  - Sticker art in `Sticker.tsx` (coin, star, notebook page, arrow), a scrolling tag wall in `TagWall.tsx`, and outline icons in `Icon.tsx`.
  - All motion stops under reduced motion, and there are high-contrast (forced-colors) fallbacks.
- **Home:** a yellow hero band with display type, the pink hero button and four tilted stickers that drift on scroll, then the tag wall. Below that, the featured post as a lifting card, a search field with a joined icon cell, pill tag filters (a scrolling strip on mobile) and a grid of lifting post cards. The empty search result has a band strip, a 160px coin, one sentence and a pink "Clear filters" button.
- **Article:** a yellow band (shared with Home) holding the breadcrumb, title, meta and tags. The body uses ink rules for the quote, a framed code block, numbered list markers and a band-colored figure placeholder. The table of contents sits in a sticky column, and related posts use the same cards.
- **About:** a periwinkle band and plain author cards with square initials badges.
- **Not found and post not found:** a red band, one sticker, one sentence and an ink return button.
- **Header and footer:** an 80px header whose current page is an ink pill, with a "Subscribe" link after a divider on desktop. The newsletter form has a pink submit, an error line with an icon, and a confirmation card with the hard shadow.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (where each piece is used and how to reuse it), plus `AGENTS.md` and `CLAUDE.md`.
- I added a temporary route to screenshot the empty state and removed it before finishing.

**Not applied**
- **No commits:** the spec asks for one commit per screen, but git needs approval in this run, so all changes are uncommitted in the working tree.
- **Unused pieces:** the app has no loading states, so the turning coin and the draw-on outline exist as CSS classes but appear nowhere.
- **Korean fallback font:** it stays in the font list but isn't downloaded; the content is English only and the font is large.
- **Not applicable:** there are no tables, dialogs, toasts, checkboxes or switches in the app, so those components weren't built.
- **Version date:** the spec gives no "updated" date, so `VERSION` records today's date as the date it was applied.

**Decisions I made**
- **Section colors:** yellow for Home and articles (parent and child share it), periwinkle for About, red for errors.
- **Stickers in dark mode:** stickers always keep an ink outline, and their white fill becomes the paper color in dark mode. Without this they nearly disappeared on the dark background, and the screenshots showed it.
- **Band text in dark mode:** text on bands is always ink, with an ink focus ring, because the light text color fails contrast on yellow.
- **Hero button:** it reads "Get new posts by email" and jumps to the newsletter form. It's a new link, but it doesn't touch any tested label.
- **Article structure:** the band moved inside the `<article>` element so the article test still finds its title.
- **Not-found buttons:** they're ink rather than pink, so only one pink button shows at a time on mobile.
- **Header:** I kept the two nav pills visible on mobile instead of building a menu dialog for two links.
- **Grid:** post grids go up to 3 columns rather than 4, because the cards are mostly text.
- **One known overlap:** on desktop, the pink "Clear filters" button and the footer's pink Subscribe button can both be on screen at once. The spec asks for a pink button in the empty state, so I left it.