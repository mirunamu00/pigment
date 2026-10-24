The Margin Notes restyle is applied to every screen: Home, both article pages, About and the two not-found screens. The build passes, all 9 smoke tests pass, and the final screenshots at 1440px and 390px, light and dark, show no page scrolling sideways. I looked through them after fixing two layout bugs (below). Every route, label, form field, `data-testid` and accessibility attribute is unchanged, and nothing under `design-packages/` or `tests/` was edited.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the spec's `tokens.css`, loaded before the app's styles. The fonts load from Google Fonts in `index.html`. Dark mode follows the system setting, handled by the token file.
- **Styles:** `src/styles/base.css` is rewritten to use only tokens. The old variable names at its top now point to the new tokens.
- **Shared pieces:** all of these are in `src/components/`:
  - the watercolor filters, rendered once at the app root
  - the bloom
  - the tape
  - the pencil note
  - the serif word with its brush stroke underneath (the "swash")
  - a toast
  - outline icons
  - a small hook for the mobile filter-chip strip
- **Home:** watercolor bloom behind the header, "Field *Notes*" with the swash, and a pencil note beside the lead. The featured post is a lifted card with one strip of tape. The other posts are linked cards in a 12/8/4-column grid. The tag filters are chips that scroll in their own strip on mobile, and the search field is 40px tall. The "no posts match" message is a plain inline empty state.
- **Article:** the article-style title with a serif last word, and the blockquote as the one serif pull-quote. Code blocks are dark. The figure placeholder is now a hatched tray with an image icon instead of the drawn landscape. The table of contents is a right-hand rail from 1200px; below that it is a closed "On this page" panel after the author/date line.
- **About:** serif word in the title, and the authors as cards.
- **Not-found screens:** a lifted panel with tape, the small bloom, and a pencil note on the button.
- **Newsletter form:**
  - Errors show an icon message, a "1 field needs attention" box at the top of the form, and focus moves back to the field.
  - Success shows a green confirmation badge plus a toast.
- **Docs:** `design-system/` now holds `VERSION`, the tokens and `components.md`, and I added `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Fixed after the first screenshots**
- The search field was rendering about 240px tall.
- On mobile, the search field, the chip strip and the article text were wider than the screen and got cut off. Measuring the boxes confirmed it; the snapshot tool's overflow check missed it because the page clips sideways overflow. The widths now measure 358px and 390px.

**What I could not apply**
- **No commits.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run.
- **Error and success states not screenshotted.** The snapshot run didn't produce images for them, so I checked them through the smoke tests and the code only.
- **No mobile action bar or dialog.** The app has neither a page-level primary action nor a dialog, so those parts of the spec don't apply.

**Decisions I made**
- **Fonts may log console errors offline.** They come from Google Fonts. If a test machine has no network, the font requests would fail, and the "no console errors" test could fail with them.
- **About counts as editorial.** It gets the serif word, but no bloom or pencil note.
- **Not-found titles are panel-sized.** The page's only heading sits inside the panel at the panel-title size (22px), because the not-found screens have no separate page header.
- **The confirmation badge wraps.** The success text is a full sentence, so it wraps and gets less rounded corners on mobile.
- **The toast has a dismiss button.** I added it so keyboard and mouse users can close it; the spec only mentions an optional action.
- **Article text is held to about 75 characters per line**, narrower than the spec's 720px maximum, to meet its 60–75 character rule.
- **On mobile the contents panel moves by CSS.** To place it after the author/date line, the article element stops acting as a layout box below 1200px, instead of my moving it in the page markup.