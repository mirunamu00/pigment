I applied felt-tip-market@0.1.0-rc.1 to every screen, in light and dark. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I checked the final screenshots of every page in both modes against the spec.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of `dist/tokens.css` and loads first. Dark mode follows the system setting, and `data-theme` on the root forces a mode. The old variable names at the top of `src/styles/base.css` now point at the new tokens, so nothing that used them breaks. Space Grotesk and JetBrains Mono load from Google Fonts.
- **Reusable pieces** in `src/components/ft/`:
  - the lift-and-slam hover, and the plate stack;
  - the colour bands, plus the split band (built but not used yet);
  - white ink-framed boxes, ruled rows, pills, tag chips and the dashed empty box;
  - the price flag;
  - a sticker kit of the blog's own objects: pencil, envelope, cup, curled paper slip, bookmark and a disc token. It also has a word badge, a rocking loading sticker and a circle vignette.
  - Sticker drift and rocking stop under reduced motion, and lifts switch instantly.
- **Header:** pill navigation, with the current page as a filled pill. Below 1024px it becomes a two-line menu button that opens a full-screen panel. The panel keeps Tab inside it and closes on Escape.
- **Footer:** a black band with a 48px newsletter headline, a white input with a pink Subscribe button, and a link column. Subscribing shows a "done" badge.
- **Home:** a lemon hero with five drifting stickers and the plate-stack "Browse posts" button. The featured post is a card with a vignette and a "New" flag. Search, tag pills and a grid of cards that lift on hover follow. The empty state is a dashed box with a sticker and an outline "Clear filters" button.
- **Article:** a lemon header band (breadcrumb, title, author and date, tags), then the prose on paper, with the table of contents as a ruled box. Related posts are lifting cards, followed by a pink "Keep reading" band.
- **About:** a periwinkle header band with one envelope sticker, then the prose and the author cards.
- **404 and missing post:** a full-screen teal band with two stickers and a plate-stack link back home.
- **Docs:** `design-system/` has `VERSION` and `components.md`, which records the band per area, the sticker subjects and the pink budget per screen. `AGENTS.md` and `CLAUDE.md` each have the one-line pointer.
- Every route, test id, label text, form field and accessibility attribute is unchanged.

**What I could not apply**
- **One commit per screen:** you limited me to five commands, and git isn't one of them, so nothing is committed. All the changes are uncommitted in the working tree.
- **Leftover empty file:** I removed the temporary review route, but couldn't delete its file without a shell command. `src/pages/KitPage.tsx` is now empty and harmless; please delete it.
- **Table of contents on phones:** it sits above the article as a box rather than collapsing into a disclosure. A collapsed version could hide the links the tests click.
- **Unused pieces:** this blog has no tables, dialogs, toasts, loading states, money or charts. The loading sticker and split band exist but nothing uses them.
- **Unchecked states:** the screenshot tool only captures the four routes. I did not screenshot the newsletter error and success states after you submit the form, or the visible keyboard focus.

**Decisions I made**
- **Band colours:** Home and its articles are lemon, About is periwinkle, error pages are teal.
- **Hero button colour:** the "Browse posts" button is black (the ink variant), not pink. With the Subscribe button, focus halo and "New" flag, Home stays within the three pink roles the spec allows. In dark mode black buttons turn pink, which still gives two pink buttons at most.
- **New content I added:**
  - the "Browse posts" button;
  - the "New" flag (the featured post is the newest one);
  - the vignette caption "Latest essay";
  - the "Keep reading / All posts" pink band on articles;
  - the footer's Home and About links;
  - the "done" badge;
  - an arrow on Subscribe that screen readers skip, so the button's name is still "Subscribe".
- **Article page structure:** the title band is inside the `<article>` element, because a smoke test looks for the title there.
- **Search box:** it stays on paper, under "More posts", rather than in the hero. The spec says form fields don't go on a band.
- **Tag pills:** the selected tag gets an outline pill, as the spec defines for tabs.
- **Article title:** it uses the header-band size (48px, medium weight), not the 30px bold "article title" style.
- **Colours inside bands and the footer:** text, lines, focus ring and the hover shadow are set locally, so they stay visible. Bands keep ink in both modes, and the footer uses light lines on black.