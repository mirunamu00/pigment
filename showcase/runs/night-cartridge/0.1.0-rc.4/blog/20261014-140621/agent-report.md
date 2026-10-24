I've restyled all four screens (Home, Article, About and both not-found states) to night-cartridge. The build and typecheck pass, and the last screenshot run (1440px and 390px, light and dark) shows no page scrolling sideways. I couldn't run the Playwright smoke tests because they aren't among the commands I was allowed. I kept every test id, the label text, routes and ARIA attributes, so I expect them to pass, but that is unconfirmed.

**What changed**
- **Tokens and fonts:** `src/main.tsx` imports `tokens.css` directly from the design package, so no values are retyped. `index.html` loads the four font links the spec gives, plus a small script that restores the two header switches before first paint.
- **Root setup:** `src/styles/base.css` is rewritten using only token variables. It has the spec's motion-and-shape block, the pixel type base, the 4px gold focus ring, and the stepped keyframes. All animation stops under `prefers-reduced-motion` or when the Animation switch is off.
- **Signature pieces:**
  - `src/design/pixel.ts` holds the spec's scene helpers plus a building generator.
  - `src/design/scenes.ts` holds every scene, all in one world: a post-office street.
  - `src/components/Pixel.tsx` holds the marker, block meter, hero, banner, figure, vignette, ground strip and pixel avatars.
  - `src/design/icons.tsx` holds the pixel icons.
- **Detail counts per scene:** hero about 127 hand-placed details, article banner about 107, figure 32, vignette 16, all at or above the spec's minimums.
- **Header:** the dither rule, Home/About with the blinking marker on the current page, and the "Animation on/off" switch. "Pixel body on/off" appears on the article and About pages only.
- **Every screen:** the ground strip at the top of the footer, and the newsletter in a framed panel with the gold Subscribe button. A failed submit now nudges the field and moves focus to it.
- **Home:** hero with the title Window over its left third, featured card and post cards with a coloured bar per category, a search field with an icon, filter chips with coloured bullets (the marker replaces the bullet when selected), a block meter under "Showing n of 6 posts", and a vignette for the no-results state.
- **Article:** a banner Window with category, title, lede and meta; dithered h2s; code in a titled window with a Copy button; quotes as callouts; figures as framed pixel scenes; a contents list that marks the current heading as you scroll and becomes a disclosure below 1024px; previous/next links.
- **About:** a banner (different crop and lights), dithered h2s, and pixel avatars with dotted separators.
- **Not found:** a window with an error vignette (lights off, one blinking beacon).
- **Docs:** added `design-system/` (VERSION, components.md) and the pointer line in new `AGENTS.md` and `CLAUDE.md`.

**What I could not apply**
- **Commits:** the spec asks for one commit per screen, but git isn't among the allowed commands, so nothing is committed.
- **Dates:** the spec wants `YYYY.MM.DD`, but a test asserts "September 28, 2026", so article dates keep their old format. Only the new hero meta line uses `2026.09.28`.
- **Gold "Retry" on error screens:** not-found has nothing to retry, so it gets a framed "Go to the home page" button with the marker instead.
- **Header search:** the app has none, and I didn't add one; search stays on Home.
- **Scene review:** the spec asks for a 2× render of each scene on its own. I could only review them inside the page screenshots.

**Decisions I made myself**
- Subscribe is the single gold button on every screen. It's the only real commit, even though it sits in the footer.
- Category colours follow the spec's fixed order: engineering cyan, design violet, writing blue, process amber, remote work green. A card takes its first tag's colour.
- The card grid is capped at 3 columns and uses `auto-fill` rather than the spec's `auto-fit`, so a single search result doesn't stretch to full width. Excerpts are shown in full rather than cut to one line.
- Below 1024px the hero is drawn at 2px per unit instead of 4px, so the sky still shows at the shorter mobile height.
- On phones the brand name and switch labels are visually hidden but still read by screen readers, so the header fits at 390px.
- Nav keeps Home and About inline on mobile rather than adding a menu button, since there are only two items.
- The About banner has no category bullet, because About isn't a category.
- Code colouring only marks comment lines, so Markdown `##` headings aren't mistaken for comments.

Small leftovers: the About banner's right fifth has no buildings (still under the spec's quarter-width limit), and the hero buildings are on the short side of the allowed height range.