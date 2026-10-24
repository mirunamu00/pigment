Inkleaf 1.1.0-rc.1 is applied to every screen: Home, Article, About, both not-found screens, and the footer newsletter. The build passes, all 9 smoke tests pass, and the final snapshot run found no sideways scroll at 1440px or 390px, light or dark. I couldn't make commits because git isn't one of the commands I'm allowed to run, so all changes are uncommitted in the working tree.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of `dist/tokens.css` and is imported in `src/main.tsx`. `src/styles/base.css` was rewritten to use only token variables, and dark mode follows the system setting. The three fonts load from Google Fonts in the weights the spec lists.
- **Signature pieces,** each reusable, in `src/design/`:
  - **Drawings:** the hand-drawn ink drawings step in once when they come into view and then hold. The brush filters are added once at the app root.
  - **Stages and plates:** pastel panels with faint lines, plus 4:3 plates whose color follows the post.
  - **Headings** that fade in word by word.
  - **Buttons and chips** with rings instead of borders.
  - **Waiting glyph and breathing dot.**
  - **Motion:** all of it stops under reduced motion.
- **15 original drawings,** each listed in `design-system/components.md` with its screen, pose and one-word test. Eight show a hand, two of each pose. Every post has its own drawing, and it is the same one on its card, the featured panel and its article.
- **Screens:**
  - **Home:** a drawing above the title, the featured post beside its drawing panel, and post cards in 3 columns (2 on mobile). It also has filter chips, a search field with an icon and a clear button, and an empty state with its own drawing.
  - **Article:** the post's drawing above the text. The contents list sits beside the text on wide screens and becomes a collapsed section under 992px. The three in-article figures are now drawings of their own subjects.
  - **About:** a drawing above the title and author cards with colored initial tiles.
  - **Newsletter:** the form, with a larger drawing and a check mark on success.
  - **Not-found screens:** a large drawing and two actions.
- `design-system/` now holds the tokens, `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.

Every route, label, form field, `data-testid` and accessibility attribute is kept. I checked the spec's numbers with `--measure`: header 72px, controls 40px, and on mobile the stage padding is 24px with a 16px corner radius. I used a temporary review route to look at drawings and lower sections up close, and removed it along with its file.

**Spec items not applied**
- The waiting glyph is built but not shown anywhere: the app makes no asynchronous requests, and the spec says a synchronous action goes straight to its result.
- One commit per screen wasn't possible without git.
- The snapshot tool doesn't turn on reduced motion. Its full-page images therefore show sections below the fold as blank (they only appear on scroll) and some drawings mid-animation. That is the real first-load behavior, so I reviewed those parts on the temporary route instead.
- Post titles stay in their original title case rather than the spec's sentence case, because they are content and the tests match them.

**Decisions I made**
- I treated Home as a long-form front page: a medium-large drawing above the title and the featured post on a drawing panel, with no large accent hero drawing.
- On About, the top drawing also opens "Why we write", so the screen doesn't get two openers.
- "Featured" and "On this page" are serif headings rather than uppercase labels, since the spec bans all-caps headings.
- The newsletter email field and button sit side by side from 834px and stack below that. I didn't add a "fields need attention" summary, because a one-field form already shows its own error alert.
- I added a second, secondary action ("About Field Notes") to both not-found screens. On wide screens the search field sits to the right of the chips, which means the tab order runs opposite to the visual order there.
- Plates wider than 520px get the faint lines, as the spec says. That only affects the in-article figures.