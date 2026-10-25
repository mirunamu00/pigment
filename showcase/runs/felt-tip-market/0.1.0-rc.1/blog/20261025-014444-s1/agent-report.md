Felt-tip Market is now applied to every screen of the blog: Home, both article pages, About, the 404 page and the missing-post page. The build and typecheck pass, all 9 smoke tests pass, and the final snapshot run shows no sideways scrolling at 1440px or 390px. I looked through the screenshots in light and dark, and they match the specification. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What I changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of the package's file, so light and dark follow the system setting (or `data-theme` on `<html>`). The blog's old CSS variable names still work as aliases. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Signature pieces:** these are reusable, in `src/styles/felt-tip.css` plus a few components:
  - The lift-and-slam hover, and the plate stack as `PlateLink`.
  - Poster bands, the split band and the black footer.
  - Ink frames, ruled groups, pill nav and the dashed empty box.
  - The price flag as `PriceFlag`, tag chips and the inline error with its "!" disc.
  - A sticker kit in `src/components/stickers/`: a mug, pencil, envelope, notebook and curled paper slip, plus a word badge and a loading sticker. The stickers drift as you scroll, and everything that moves stops under reduced motion.
- **Area colours:** Home and the articles are lemon, About is periwinkle, the error pages are marigold. The featured post uses a teal split band.
- **Screens:**
  - **Header:** pill navigation with a white "Subscribe" block on the right. Below 1024px a menu button opens a full-screen panel.
  - **Home:** a lemon band with five stickers around the headline and a plate-stack "Start reading" button. The featured post sits in a black-and-teal split band with a drawn page mockup and a "New" flag. Below it come a search box with an icon, tag filters as pills, a grid of cards that lift on hover, and an empty state with a sticker.
  - **Article:** a lemon header band with breadcrumb, title and tags. The table of contents is a framed list that becomes a collapsible section on phones. The page ends with related posts and a pink closing band.
  - **About:** a periwinkle header band with one sticker, and the authors in one framed, ruled list.
  - **404 and missing post:** a full-height marigold band with two stickers and a plate-stack link home.
  - **Footer:** black, with the newsletter as a joined input and pink button. Success shows a confirmation panel and a "thanks" badge.
- **Docs:** `design-system/` holds `VERSION`, the tokens and `components.md` (colour map, sticker subjects, where each piece is used and how to reuse it). `AGENTS.md` and `CLAUDE.md` each have the pointer line.

**What I couldn't apply**
- **No commits:** git isn't among the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **Mobile menu focus trap:** the menu closes on Escape and on navigation, but it doesn't trap focus inside the panel.
- **Not used:** the scrolling tag marquee, the circle vignettes and the highlighter mark. Nothing on this blog called for them.
- **Loading sticker:** it's built, but no screen shows it because nothing in the app loads.
- **Hero input:** the hero has the plate-stack button but no text box next to it, because search already sits in the post list.
- **Raw pixel values:** a few sticker sizes and positions, and the 80px header height, are written as pixel values the spec states rather than as tokens.

**Decisions I made myself**
- **Article titles** use the 48px medium heading style inside the header band, not the 30px bold "doc title" style.
- **Newsletter button** keeps its "Subscribe" label and adds an arrow, instead of the arrow-only square button. That keeps the existing copy.
- **Header right edge** has only the white block. A black block would turn pink in dark mode, putting three pink buttons on Home.
- **Text on bands** stays black and buttons there stay white in dark mode, because the spec says bands don't change.
- **Footer hover shadow** uses the 35%-white shadow colour on the black footer, since a black shadow would be invisible there.
- **"Home" nav item** isn't highlighted on article pages: the existing link only matches `/` exactly, and I didn't change that behaviour.

To check the stickers up close I added a temporary preview route, snapped it, and removed it again.