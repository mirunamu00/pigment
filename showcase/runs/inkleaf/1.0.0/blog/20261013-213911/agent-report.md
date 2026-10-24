Inkleaf is applied to every screen: Home, Article, About and both not-found states. The build and typecheck pass, and `pigment-snap` shows no sideways scroll at 1440px or 390px, light or dark. I didn't run the smoke tests because Playwright isn't one of the commands I was allowed. I traced each test by hand against the new markup and expect them to pass.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package tokens, imported first. Dark mode follows the system setting. The three fonts load from Google Fonts in `index.html`. I rewrote `src/styles/base.css` because its old variables had the same names as tokens with different values (`--space-4`, `--font-size-h1`).
- **Signature pieces, all reusable, in `src/design/`:** the brush filters, the cel-drawn pictogram (plays once when it comes into view, shows the final frame under reduced motion), the pastel stage, drawing stage and plate, the word-by-word headline, the button styles, and the block rise. All of their CSS is in `src/styles/signature.css`.
- **Drawings:** 16 original drawings, 8 of them with a hand. Each post keeps the same drawing and plate colour on its card and its article page.
- **Screens:**
  - **Home:** drawing above the title; the featured post on a drawing stage beside its text; search field with an icon and its own clear button; tag chips that turn ink when selected; post cards with plates; an empty state with a drawing.
  - **Article:** the post's drawing on a stage; contents beside the text on wide screens and an "On this page" disclosure on narrow ones; serif pull quotes; styled code blocks.
  - **About:** drawing above the title, a smaller drawing opening "Why we write", and author cards with coloured initial tiles.
  - **Not found:** an apricot stage with a signpost and two actions.
  - **Newsletter form:** a mailbox drawing that replays larger on success, with a check-circle.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md` listing each drawing's subject and one-word name), plus the pointer line in new `AGENTS.md` and `CLAUDE.md`.

All routes, labels, test ids, form fields, validation and accessibility attributes are kept.

**What I couldn't apply**
- **Sentence-case headings:** the post titles are title case in the data and the tests check them exactly, so they stay as written.
- **Leaving out figures that have no image:** the tests require each figure to be there as an image. Each one is now a plate with its own drawing, labelled with its alt text.
- **One commit per screen:** git wasn't among the allowed commands, so all changes are uncommitted in the working tree.
- **Reviewing with reduced motion on:** the snapshot tool can't switch it on. Its full-page captures never scroll, so the "rise when it comes into view" blocks show up blank: post cards, figures, related posts, author cards, and the section headings. They work when a person scrolls, but I couldn't check them visually and judged them from the CSS. Everything above the fold, and both dark and mobile, matched the spec.

**What I decided myself**
- **The not-found drawing** sits on its apricot stage, sized by the stage rules rather than the fixed extra-large size, because the spec asks for both.
- **On the newsletter form,** the submit is instant, so there's no "working" animation. A failed submit now moves focus to the email field, as the spec asks.
- **I added a second action, "About Field Notes",** to both not-found states, because the spec calls for two.
- **"Featured" stays a heading** but is styled as a small uppercase label.
- **Headings inside article text don't animate in;** only page and section headings do.
- **I removed the header's document-icon logo,** because the spec says the product name is text only.
- **The figure drawings** are tied to their captions: a button, a rubber stamp and an hourglass.
- **On Home, post cards are one column under 834px;** the 2-column rule is written for store grids.
- **Fonts load from Google at runtime.** If the test machine is offline, the font request would log a console error and fail the "no console errors" test.