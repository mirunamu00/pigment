I've applied Morning Shapes 0.1.0-rc.3 to every screen: Home, both captured articles, About, and the two not-found pages. The build passes, all 9 smoke tests pass, and no page scrolls sideways. I checked every screenshot at 1440px and 390px, in light and dark.

**What changed**
- **Tokens:** `src/styles/tokens.css` is a copy of the package's `tokens.css`, with dark mode following the system setting. The old variable names in `base.css` still work but now point at the new tokens. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Reusable pieces in `src/components/ms/`:**
  - Color bands with curved edges, a compact header band with its shape cluster, and contained panels.
  - The shape kit: shaded discs, two-color discs, sparkles, clouds, plates, confetti, item covers and initials avatars. There are 10 original pictograms, one per post plus three for article figures.
  - Breathing glyphs in all six forms. They pause off-screen and stop under reduced motion.
  - The pop-dots loader, the choice row, every pill variant and the selected-filter dot.
  - The product vignette and the one-time fade-in.
  - Solid icons. All the styling for these lives in `src/styles/morning-shapes.css`.
- **Top bar and footer:** a white sticky top bar with a wordmark, an area-color dot on the current link, and a blue Subscribe pill. On phones the links move into a menu behind a round button; it traps focus and closes on Escape. The footer is a cream band with a rising curve, the signup form with an ink pill, link columns, and a dark bottom bar with a back-to-top circle.
- **Home:** a yellow front-page band with a shape composition, a cream featured card with a cover, confetti around "More posts", a search pill, filter pills with category dots, a grid of covered cards, and a cream empty-state panel with a glyph.
- **Article:** a cream header band (the cover below is the one color field), a cover in the post's tag color, a contents card with a breathing glyph, styled quote, code and lists, and figure covers in place of the grey placeholder.
- **About:** a blue header band, the "Why we write" text beside a newsletter vignette, and author cards with initials avatars.
- **Not-found pages:** a cream band with the error composition and an ink pill home.
- **Docs:** `design-system/VERSION` and `design-system/components.md` (color map, pictogram subjects, where each piece is used), plus the one-line pointer in `AGENTS.md` and `CLAUDE.md`.

Every route, label, form field, `data-testid` and accessibility attribute is kept. I added a few things: footer links, "Back to top", hero and header pills, and `id="newsletter"`. On article pages the contents sidebar is now inside the `<article>` element.

**What I couldn't apply**
- **No commits.** Commits per screen weren't possible because git isn't in the allowed command list. All changes are uncommitted in the working tree.
- **Temporary file left behind.** I removed the preview route, but `src/pages/PreviewPage.tsx` is still on disk because I couldn't run `rm`. Nothing imports it, so it's safe to delete.
- **Five tag colors.** The spec allows at most four category colors in one view, but this blog has five topics, so Home can show all five.
- **Same color twice on error pages.** The error band and the footer are both cream, which the spec says two fields shouldn't share. Both are required there, so I kept them apart with white space.
- **Unused pieces.** The pop-dots loader and the choice row are built but not used, because the app has no loading states or choice inputs.
- **Font link and the console-error test.** It passed here, but fails on a machine with no network, because the blocked font request logs an error.
- **Fade-ins below the fold.** Full-page screenshots don't scroll, so content that fades in below the fold appears empty in them. I checked confetti, glyphs and plates on a temporary preview route instead.
- **No tokens copy in `design-system/`.** `components.md` points to `src/styles/tokens.css` instead.

**Decisions I made**
- **Color map:** Home and its articles are yellow, About is blue. Topic tags are engineering green, design pink, writing orange, process violet and remote work blue, so blue repeats once. A post's cover takes its first tag's color.
- **Articles count as items without an image,** so each gets a cover, and their header band is cream as the spec requires.
- **Legacy names:** `--font-size-h2` and `--font-size-h3` now carry the token values, because those names collide with the spec's tokens.
- **Text sizes on phones:** article body text drops to 18px.
- **Footer links** use the spec's 12px size with 44px-tall tap areas.
- **Dot-only color classes:** I added classes for the nav dots and filter pills so a blue area color doesn't turn their focus ring white.
- **Filter pill height:** the filters use the standard 48px pill height rather than the smaller toolbar size, to keep touch targets at 44px or more.