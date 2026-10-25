I restyled the Field Notes blog with Felt-tip Market 0.1.0-rc.4 on every screen, in light and dark. The build passes, all 9 smoke tests pass, and no page scrolls sideways at 1440px or 390px. On the last snapshot pass I checked that my fixes held. The hero CTA now measures 60px, the About header lines up with the page, and the phone footer input is full height.

**What changed**
- **Tokens and fonts:** `tokens.css` is imported unchanged from the design package in `src/main.tsx`. The old variable names in `src/styles/base.css` now point to the new tokens, so nothing that used them breaks. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Signature pieces, built as reusable parts:**
  - Hover lift and press, used on all buttons, post cards and the menu button.
  - The plate stack behind the main button.
  - The hero action row: the main button beside a search box at the same 60px height.
  - Bands: the hero, header bands, a full-screen error band and the black footer.
  - Ink-outlined boxes, ruled lists, pills and the dashed empty-state box.
  - The price flag and the "joined" word badge.
  - A sticker builder following the five-step recipe, with 17 original drawings in `src/components/stickerKit.tsx`.
- **Home:** a lemon hero with 5 drifting stickers (4 on phones), the "Read the latest" button and a search box. Below it, a wide featured card with a "New" flag, then pill tag filters and a grid of white post cards. Every post has its own drawing (parcel, scroll, flag, puzzle, globe, jar, bell). An empty search shows a dashed box with a folder drawing.
- **Article:** a lemon header band with breadcrumb, title, details and tags. The text sits in a reading-width column with a sticky contents list beside it. The three article figures get their own drawings (pinboard, clipboard, calendar), and related posts follow.
- **About:** a periwinkle header band with an ink-bottle sticker, and the authors in one ruled box.
- **Missing page and unknown post:** a full-screen marigold band with two stickers and the plate-stack link back.
- **Header and footer:** the current nav item is a filled pill. Below 1024px a menu button opens a full-screen panel; it keeps keyboard focus inside and closes with Escape. The footer is black, with the newsletter (its input joined to the pink button) and link columns. A newsletter error shows a 2px red border and a "!" marker; success shows a white panel with the "joined" badge.
- **Kept intact:** every route, `data-testid`, label, form field, heading id and accessibility attribute.
- **Docs:** I added `design-system/` (`VERSION` and `components.md`, which records the area colours, sticker list and where each piece is used) and the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

**Spec steps I could not apply**
- **No git commits.** The spec asks for one commit per screen, but git isn't among the commands I'm allowed to run, so all changes are uncommitted.
- **Leftover review file.** `src/pages/ReviewPage.tsx` was a temporary page for checking the stickers and form states. Its route is removed, but I can't delete files with the allowed commands, so please delete it.
- **Unused loading sticker.** It is built and stops under reduced motion, but the app has no loading states to use it.
- **Price flag barely used.** The blog has no money or counts, so it appears once, as "New" on the featured post.
- **Tokens not copied.** The spec wants `tokens.css` copied into the project. I import it from `design-packages/` instead, to avoid retyping values by hand. That makes the app depend on that folder staying in place.

**Decisions I made myself**
- **Colour per area:** Home and articles are lemon, About is periwinkle, error pages are marigold. On article pages the Home pill stays filled to show the area; it doesn't claim to be the current page.
- **Hero search:** it shares its value with the post list's search, so typing in either filters the list. Pressing Enter scrolls to the results.
- **Tags:** shown as outline pills with a coloured dot. There are 5 tags and 4 band colours, so "Remote work" gets a white dot.
- **Newsletter button:** it keeps its "Subscribe" text plus an arrow, rather than the spec's arrow-only square, because the label is existing copy.
- **Footer hover:** I changed the hover shadow in the footer to the 35% white used in dark mode, so lifting is visible on black.
- **Phone contents list:** it shows as a framed box above the article text rather than a collapsible section or a pill row.
- **No pink closing band and no top-bar button:** both would push pink past the three-roles-per-screen limit.