Field Notes now uses margin-notes@0.1.0-rc.2 on every screen, in light and dark. The build and typecheck pass, and the last snap run found no page that scrolls sideways. I checked the 1440px and 390px screenshots of Home, both articles and About, light and dark, against the spec. I could not run the Playwright smoke tests, because they weren't on the list of commands I was allowed to use. I kept every `data-testid`, route, heading id, label and ARIA attribute, and checked the tests' text matches by reading the code.

**What changed**
- **Tokens and setup:** `design-system/tokens.css` is a verbatim copy of the package file, imported by `src/styles/base.css`. The fonts the spec names load from Google Fonts with `display=swap`. The shared SVG filters sit once in `Layout`. Dark mode follows the system setting or `data-theme`. Reduced motion turns durations to 0.
- **Rewritten `base.css`:** buttons, text fields with the error message and icon, a success callout, chips, badges, cards (resting, pinned, whole-card link), the "no asset" image frame, a dark code block, empty states, mono eyebrows, header and footer, plus the layout rules for 860px and 1200px. Hover, focus-visible and disabled styles are on every control.
- **Home:** a full-width masthead with the watercolor bloom. "Field *Notes*" has the serif word and the swash under it. A "start here" pencil note points at the featured post, which is the pinned card with one strip of tape. Posts sit in a 3/2/1-column grid. The tag filters are chips that scroll in their own strip on mobile.
- **Article:** the last word of the title is in serif, and the quote is styled as the one serif pull-quote the spec allows per article. List numbers are mono. The image placeholder is now the spec's "no asset" frame and keeps `role="img"` and its label. The table of contents is sticky on desktop and a tinted box on mobile.
- **About:** the prose is limited to article width and the author cards sit in a grid.
- **Not-found pages:** a new `PageEmptyState` gives the page-level empty state with tape, a bloom and a pencil note.
- **Docs:** `design-system/VERSION`, `design-system/components.md` (class names and where each studio detail appears) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**Bug the snap script missed:** on mobile, Home was laid out 538px wide even though the script reported no overflow. `overflow-x: clip` hides the overflow from the script's check, so I only caught it in the screenshot. The cause was the filter bar's mobile layout; switching it to a single grid column fixed it.

**What I couldn't apply**
- No commits. The spec wants one commit per screen, but git wasn't an allowed command, so everything is uncommitted in the working tree.
- I copied only `tokens.css` into `design-system/`; `tokens.json` stays in the package.
- The old spacing and size variable names (`--space-2`, `--font-size-h1` and so on) have the same names as spec tokens but different values, so they couldn't be aliased. I removed them. The old colour and font names are aliased to the new tokens.

**Decisions I made**
- The serif word in article titles is always the last word.
- About has no studio details and stays sans, because the spec's blog list only names the masthead and article titles.
- The featured post title uses the 22px size (`font.size.h3`) instead of a card-title size, so it reads as the lead item.
- The header has no action button, because the spec makes it optional, and I removed the brand icon because the spec wants the name as text only. With only two nav links, mobile needs no menu button.
- There's no sticky bottom action bar, because no page has a primary action outside the footer form.
- On mobile the table of contents stays above the article, as it was before.