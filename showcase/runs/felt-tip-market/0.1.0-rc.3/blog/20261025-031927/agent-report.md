I've restyled every screen of Field Notes to felt-tip-market 0.1.0-rc.3. The build passes, all 9 smoke tests pass, and the screenshots at 1440px and 390px show no page scrolling sideways in light or dark. I checked each screenshot against the spec. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**Nothing is committed.** The spec asks for one commit per screen, but git isn't among the commands you allowed, so all changes are in the working tree.

## What changed
- **Tokens:** I copied `tokens.css` and `tokens.json` (not retyped) into `src/styles/` and `design-system/`. The old variables in `base.css` (`--color-bg`, `--color-text`, `--radius`, …) still work as aliases. Dark mode follows the OS setting, or `data-theme` on `<html>` forces it. Space Grotesk and JetBrains Mono load from Google Fonts.
- **Reusable pieces** (`src/styles/signature.css`, `src/components/kit/`):
  - The lift-and-slam hover and the plate stack.
  - Bands: hero, header band with sticker, split band, black footer.
  - Ink boxes, ruled groups, pills, the dashed empty box, chips, the notched flag and the "done" word badge.
  - A `Sticker` component that draws every sticker thick: a back 12% of its size below the face, a solid side strip, the face and inner strokes.
  - 18 original drawings and two vignette components.
  - Under reduced motion, sticker drift stops and lifts happen instantly.
- **Shell:** an 80px top bar with pill nav (current page is a filled pill) and a "Get the newsletter" block on the right. Below 1024px the nav sits behind a menu button that opens a full-screen panel; focus stays inside it and Escape closes it. The footer is black with a large headline, link columns, and the email field joined to a pink Subscribe button. The newsletter error shows a "!" disc and success shows the "done" badge.
- **Home:** a lemon hero with a 96px headline, a plate-stack link to the featured post, and five drifting stickers (notebook, cup, pencil, envelope, speech bubble). Every post card is a white framed card with its own drawing (parcel, paper slip, pennant, brick, clock, jar, bell), and the newest post gets one "New" flag. The search box has an icon, tag filters are pills, and the empty state shows a magnifier with an empty lens.
- **Article:** a lemon header band holding the breadcrumb, title, meta and white chips. Figures are drawn clusters that keep `role="img"` and the alt text. Quotes are speech bubbles, the contents list is a framed box, and related posts are cards.
- **About:** a periwinkle header band with a press-pass sticker, prose on paper, and the authors in one ruled box.
- **404 and missing post:** a full-height marigold band with a 72px sentence, two tumbling stickers and a plate-stack recovery link.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus the one-line `AGENTS.md` and `CLAUDE.md`.

## What I couldn't apply
- **About band sticker on phones:** the title and lead are 144px tall, taller than the 120px minimum sticker. A bigger sticker would squeeze the text narrower and taller, so I kept 120px, cropped by the side edge only.
- **Hero input:** the spec pairs the hero CTA with a bordered input. I left search in the posts toolbar, where it filters the list.
- **Not used because the blog has no such content:** the loading sticker, dialogs, toasts, tables, charts and switches. The rocking animation is still in the CSS (`.ft-sticker--loading`) for later.

## Decisions I made myself
- **Area colors:** Home and articles are lemon, About is periwinkle, error screens are marigold.
- **Tag chip colors:** engineering periwinkle, design lemon, writing teal, process marigold. Remote work is white because there are five tags and four colors.
- **Pink on each screen** stays within three roles: Subscribe/CTA buttons, the focus halo, and the "New" flag. In dark mode the header block also turns pink, as the spec says black buttons should.
- **Footer contrast:** on the black footer the focus ring is white and the hover shadow is the 35% white shadow, so both stay visible in light mode.
- **New text:** "Read the featured post", "Get the newsletter", and the footer links "Read / All posts / About Field Notes / This page / Back to top". The Subscribe button shows a decorative arrow that screen readers don't hear.
- **Article figures:** each drawing is picked by its alt text (`FIGURE_OBJECTS`). A new post or figure needs its own drawing added, otherwise it reuses the parcel or keycaps.

I added a temporary route to check the error, success, empty and hover states up close, then removed it.