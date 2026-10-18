Field Notes now uses Graphite Blueprint 1.1.0-rc.7 on every screen: Home, both article pages, About, and the two not-found pages. The build passes and all 9 smoke tests pass. The last full screenshot run (all pages at 1440px and 390px, light and dark) showed nothing scrolling sideways. Light and dark both follow the device setting; the app has no theme switch.

**What I changed**
- **Tokens and fonts:** the package's `tokens.css` is copied unchanged to `design-system/tokens.css`, and the old CSS variable names now point at the new tokens. Inter and Geist Mono are self-hosted through two font packages added to `package.json`. Focus outlines, link underlines and the reduced-motion rule follow the spec.
- **Signature elements:** all six are built as reusable pieces from their recipes, in `src/design/` and `src/styles/signatures.css`:
  - spotlit stage
  - dot glyph, dot meter and dot field
  - isometric blueprints, plus a broken-connector version for error pages
  - spec plates, each with the same drawing for a post everywhere it appears
  - working shimmer and live edges
  - section openers, two-tone text and mono labels
- **Home:** a masthead, then the featured post with its plate. "More posts" opens with a section heading and has a pill search, filter chips, a mono post count and a hairline grid of post cards. The no-results state shows the 48px empty glyph.
- **Article:** breadcrumb, title, author, date and a wide lead plate. The contents list is a side rail on wide screens and a closed, collapsible section below 1024px. It highlights the heading you're reading. Body text, quote, code and figures are restyled, and related posts sit in a card grid.
- **About:** a masthead, then three sections. One has a lit stage that settles in once when scrolled into view. One has a row of three blueprints: a stack, a connected pair with a moving connector, and a single box. The authors appear in a card grid.
- **Not found and post not found:** the error layout from the spec: broken-connector drawing on a quiet stage, "ERR 404", heading and two buttons.
- **Header and footer:** sticky blurred header with pill navigation and a "Subscribe" button. The newsletter is the page's closing block ("New post? One email."). A failed submit now shows a banner above the button and moves focus to the email field.
- **Motion:** every animation stops on its resting frame under reduced motion.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but I was limited to the five commands you listed, so everything is uncommitted in the working tree.
- **Screenshots at normal size only.** The snapshot tool takes 1x screenshots, so I reviewed each piece in page context, not on its own at 2x. I didn't take the pixel measurements the spec's verification section asks for. I only snapped the newsletter error and success states and keyboard focus indirectly: the smoke tests check them, but I didn't look at them in screenshots.
- **Stage blurred in the About screenshots.** The stage sits below the first screen, so full-page screenshots catch it before it settles. The spec doesn't allow changing motion for review, so I left it.
- **Shimmer, live edges and pulse aren't on any screen.** They're built, but nothing in the blog actually runs, and the spec only allows them on real work.

**Decisions I made**
- **Mobile header:** the spec calls for a menu button and sheet under 768px, but the spec's own checks also want every nav item visible at 390px. With only two links, I kept them visible and skipped the sheet.
- **Newsletter:** the closing block has one button (Subscribe) instead of the spec's two. The visible heading "Subscribe to the newsletter" kept its text and became the small mono label above the statement. The new "1 field needs attention" banner has no alert role, because the existing error message already has one.
- **Text and links I wrote:** the second sentences of the mastheads, the section descriptions, the figure captions and titles, and the footer "Read" links.
- **Plate captions:** "NO. 07 · DESIGN" uses the post's first tag. Image placeholders in articles use "FIG 01 · " plus that tag.
- **Article image placeholders:** they keep their `role="img"` and alt text even though the spec marks plates as hidden from screen readers. The smoke tests depend on that, and you asked me to keep accessibility attributes.
- **Brand mark:** I removed the small logo icon next to "Field Notes". The spec wants the product name as text and rules out logos.
- **Inter font name:** the font package registers Inter as "Inter Variable", so I put that name first in the font variable in `base.css` (the tokens file is untouched).