I've restyled the Field Notes blog with Felt-tip Market 0.1.0-rc.4 across every screen. The build and typecheck pass, all 9 smoke tests pass, and the final snapshot run shows no page scrolling sideways at 1440px or 390px, light or dark. I opened the screenshots and fixed what was off: bottom hero stickers cropped past 40%, the About sticker overlapping text on phones, article band text not lining up with the body, and the breadcrumb wrapping on phones.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged from the package. The old variable names in `base.css` still work as aliases. Space Grotesk and JetBrains Mono come from npm font packages, so nothing loads from the network. Light and dark follow the system setting and can be forced with `data-theme`.
- **Signature pieces, as reusable parts:** lift-and-slam, the plate-stack CTA, the hero action row, bands, ink boxes and ruled groups, pills, the dashed empty box, the price flag, tag pills, a word badge and a loading sticker. The sticker builder is a port of the spec's recipe, with 19 original drawings of the blog's own things (pad, pencil, mug, mailer, a different object per post, and more).
- **Shell:**
  - **Top bar:** the current page is a filled pill and there's a "Subscribe" block at the right. Below 1024px a menu button opens a full-screen panel that keeps keyboard focus and closes on Escape.
  - **Footer:** black, with the newsletter form and link columns.
- **Home:** a lemon hero with "Field Notes" at 96px, five drifting stickers (three on phones), and the "Start reading" plate-stack button beside the post search. Below it are the featured card, filter pills, and a 3-column card grid where each post has its own drawing. The newest post gets a "New" flag. The empty search shows a folder drawing.
- **Article:** a lemon header band with breadcrumb, title, details and tags. Body text sits on paper, with the table of contents in a ruled box (a scrolling pill row on phones). The image placeholders are now drawings of each figure. Related posts follow, then a pink closing band.
- **About:** a periwinkle header band with a speech-bubble sticker, the text, and the authors in a ruled list.
- **404 and post-not-found:** a full-screen marigold band, two tumbling stickers, and a plate-stack button back home.
- **Docs:** `design-system/` (version file, tokens, `components.md` covering which section gets which band color, the sticker subjects and how much pink each screen uses), plus `AGENTS.md` and `CLAUDE.md` pointers.

Routes, behavior, form validation, every `data-testid`, label text and ARIA attribute are preserved. Under reduced motion the lift, drift and rocking all stop.

**What I couldn't apply**
- **Commits:** nothing is committed. Git wasn't among the commands you allowed, so all changes are in the working tree, and the spec's "one commit per screen" isn't done.
- **Sticker strip depth:** checked by eye in the screenshots, not measured numerically.
- **Glyph box for items without an image:** not built; every item has a drawing instead.
- **Footer button:** the spec wants a square arrow button, but I kept the "Subscribe" text and added an arrow to preserve the label.

**Decisions I made**
- **Hero search:** the existing post search moved into the hero as its input, with its label visually hidden. Pressing Enter jumps to the list.
- **Band colors:** articles use Home's lemon band, the error pages use marigold, and the pink closing band appears only on articles.
- **Pink limit:** I kept each screen to three pink uses. That's why the "New" flag appears only on Home, and why the top bar has only a plain "Subscribe" block (ink buttons turn pink in dark mode, so a black one would have broken the limit).
- **Tags:** shown as outline pills with a colored dot per topic.
- **Article headings:** sub-headings are 30px regular and minor headings 20px semibold.
- **Lazy loading:** only the 404 page loads on demand, which gives the loading sticker a real use. Loading the article page lazily broke the table-of-contents smoke test.
- **Footer divider:** uses the 35% white line from the token file, because a black rule doesn't show on the black footer.
- **Fonts:** added `@fontsource/space-grotesk` and `@fontsource/jetbrains-mono` to `package.json`.

The temporary preview route and the URL-seeded states I used for close-up screenshots have been removed.