I restyled all four settings screens and the not-found page with margin-notes. **But I couldn't run `npm run build` or the smoke tests**, and nothing is committed. In this run, `npm install`, `npm run build` and `git commit` all needed approval that wasn't available, and there was no `node_modules` to build from. The code is written but not compiled or tested.

To check it, run `npm install && npm run build && npm run test:e2e`, then commit. The spec asks for one commit for tokens/fonts/filters and one per screen; the changes are grouped so they split that way.

## What I changed
- **Tokens:** `src/styles/tokens.css` is a straight copy of the package file. The old variables at the top of `base.css` now point at the new tokens. Light and dark both work, through the system setting or `data-theme`.
- **Fonts:** Geist, Geist Mono and Instrument Serif italic load from Google Fonts in `index.html`.
- **New shared files:** `src/styles/components.css` holds the shared components. `Icons.tsx` has thin-line icons, and `Studio.tsx` has the watercolour filter (rendered once in `Layout`) and the bloom. Motion drops to zero when reduced motion is on.
- **Shell:** new header and sidebar styling, with a small "Settings" label above the nav. On narrow screens the nav becomes a horizontal scrolling row.
- **Profile:** serif title, styled fields and select, error messages with an alert icon, and "Saved" with a check icon.
- **Notifications:** each group is a card, switches follow the spec, and the "N of 6 on" count is a neutral badge.
- **Security:** section headings sit on the page background, the password form is a card, and sessions are a framed table.
- **Billing:** plan cards, with the current plan marked by a 2px ink ring and an ink "Current plan" badge. Also a payment card, invoice badges with a dot and a word, mono invoice IDs and amounts, and the dialog with fade-in and a 4px rise.
- **Not found:** the empty-state panel with the bloom, a "404" label and a button-styled link.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md`.

All routes, `data-testid`s, labels, ARIA attributes and logic are unchanged. The icons I added have no text, so exact-text assertions still match.

## What I couldn't apply
- **Checks:** no build, no tests, and no visual check at 1440/390 px in light and dark.
- **Fonts:** I couldn't install font packages to self-host them, so they come from Google Fonts. If the test machine is offline, the failed font request could trigger the "no console errors" test.
- **Not used:** tape, pencil notes and the swash are ruled out or don't apply on settings screens. No toast, tabs, chips, segmented control or code block were needed.

## Decisions I made
- **Serif titles:** every page title is one word, so that whole word is the serif word. The only exception is "Page not *found*". Adding a word would have changed label text.
- **Sidebar:** I kept the sidebar even though the spec suggests one only from 6 sections, to keep the existing layout.
- **Section layout:** headings sit on the page background with one object below, so there are no cards inside cards.
- **"Revoke" button:** it's a small secondary button, because the spec only allows a red filled button to confirm a deletion.
- **Password strength:** uses status colours, always next to a word.
- **Invoice IDs:** mono but left-aligned as the row key; amounts are right-aligned.
- **"Current plan" badge:** moved into the card header.
- **Sizes not in the tokens:** I kept the 880px content column and 220px sidebar as project values, and gave the large avatar a 72px spacing token. Both are documented in `components.md`.