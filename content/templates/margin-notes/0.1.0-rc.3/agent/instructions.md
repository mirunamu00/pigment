## Setup notes for this system

- **Fonts** (OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic, Caveat 400; `font-display: swap`.
- **Theme:** `tokens.css` handles `prefers-color-scheme` and `[data-theme]`; a toggle only sets `data-theme`.
- **Root:** the filter SVG once; `html, body { overflow-x: clip }`; global `:focus-visible`.
- **Base styles:** body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`; headings `color.text.primary`.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values.
3. Set up the root; build components with every state, then the studio details.
4. Create `design-system/` with `VERSION` (`margin-notes@0.1.0-rc.3`), the tokens and `components.md` (serif titles, details, note targets).
5. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, shared components, routes and tests.
2. Propose a migration plan, including which screens get studio details, and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; any brand action color becomes `color.action.primary`.
4. Restyle one representative screen as a sample and wait for review; then go screen by screen, one commit each.
5. Preserve routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes. Stacked tables restyle the same markup.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first. Use semantic tokens and existing components; never hard-code colors, sizes, radii or shadows.
- Before adding a studio detail, count the ones on the screen against rule 10.
- Uncovered needs: compose from tokens, note it in `components.md`; conflicting requests (a brand hue, weight 700): present options.

## Verification

Check 1440px and 390px, light and dark, plus focus (Tab), hover, a submitted empty form, an open dialog and a toast. If you cannot render, check the code:
- Build and tests pass; no raw colors, sizes or radii outside the token files.
- 1440px: content starts at 40px in every app; lead to first content at most `space.64`.
- 390px: `scrollWidth` equals the viewport; global search not above the h1; every status and row action visible without sideways scrolling; scrolling tables show fade and hint; stat values share a baseline.
- Fields have explicit 32, 36 or 40px heights, hover, focus ring, disabled and the error message.
- Light: hatch visible on no-asset frames. Dark: off switch thumb visible; pinned objects on `color.surface.lifted`; bloom on `mn-wash-night`.
- Each note's arrow tip is within 12px of its named target; past chart bars at `opacity.chartRest`.
- Per screen: rule 10 limits, 1 primary per region, serif per the app list, mono per rule 7.
- Report files changed, what you could not apply, and decisions you made.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one commit; reverting it last restores the previous look.
