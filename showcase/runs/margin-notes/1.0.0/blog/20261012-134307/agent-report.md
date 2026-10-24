Margin Notes 1.0.0 is applied to all four captured pages (home, two articles, about) and the two 404 screens. The build passes, and the final `node pigment-snap.mjs` run reports no horizontal overflow. I checked every screenshot at 1440px and 390px in light and dark. I could not run the Playwright smoke tests because they aren't among the commands I was allowed to use. I kept every route, label, form field, `data-testid` and ARIA attribute, but the test suite itself has not been run.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`, imported before `src/styles/base.css`. Old variable names are aliased onto the new tokens, and every value in `base.css` is a token. `index.html` loads Geist, Geist Mono, Instrument Serif and Caveat from Google Fonts with `display=swap`. Dark mode follows the system setting and `[data-theme]`.
- **Root and shell:** the watercolor filter SVG renders once in `Layout`. Page sides no longer scroll sideways at 390px. The content container starts at 40px at 1440px (16px gutters on mobile). The header and nav links, focus rings, links, buttons, inputs and badges all follow the spec.
- **Home:**
  - The masthead has the bloom, the serif word "*Notes*" with its swash, and a lead line.
  - The featured post is a pinned card spanning columns 1–8, with two tape strips and the pencil note "our pick".
  - Tag filters are chips that turn ink-filled when selected; on mobile they scroll in their own strip with a fading edge. Posts are a 3-, 2- or 1-column card grid with a stretched title link.
- **Article:** the contents list is a right rail from 1200px and a closed "On this page" `<details>` below that. There is one serif pull-quote, an ink code block, and the image placeholder is now a hatched frame with a single outline image icon instead of the old drawing.
- **About:** page heading and lead, and author cards in a grid.
- **Newsletter:** an error shows an alert icon and moves focus to the field; success shows as a green callout with a check.
- **404 pages:** a page-level empty state with tape, the empty-state bloom and a pencil note on the button.
- **Docs:** added `design-system/` (`VERSION`, `tokens.css`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Fixed after the first screenshots:** on mobile, the filter bar wrapped and stretched to the full width of the chips (538px). The page didn't scroll, so the snap check didn't flag it, but the search field ran off the screen. I found it with a temporary on-page probe (since removed) and fixed it with `flex-wrap: nowrap`.

**Not applied**
- **No commits:** git isn't among the allowed commands, so the spec's one-commit-per-screen and rollback steps weren't followed. Everything is uncommitted in the working tree.
- **No error summary on submit:** the spec asks for a "N fields need attention" callout at the top of a form that fails, but the newsletter form has one field, so I left it out.
- **No toast:** the app's in-place success sentence became a success callout rather than a toast or a one-word badge, because the sentence is too long for a badge.
- **No serif word in post titles:** the spec allows one, but titles come from the data and the masthead or pull-quote already uses the screen's serif.

**Decisions I made myself**
- The page heading "Field Notes" became "Field <span>Notes</span>" so it could take the serif word and swash; its text is unchanged.
- The contents list `<aside>` now sits inside the `<article>` so it can appear "after the meta line" on mobile.
- The 404 heading is styled at the empty-state title size.
- The About page uses the large index-page heading size.
- The search field has a leading search icon.
- The contents rail is 240px wide with a 96px gap.
- I wrapped the image placeholder and the 404 screens in a new container element each.