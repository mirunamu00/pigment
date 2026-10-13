## Setup notes for this system

- **Fonts** (OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic, Caveat 400; `font-display: swap`.
- **Theme:** `tokens.css` handles light, dark via `prefers-color-scheme`, and `[data-theme]` on the root; a toggle only sets `data-theme`.
- **Root:** the shared filter SVG once in the root layout; `html, body { overflow-x: clip }`; global `:focus-visible` per Shared component states.
- **Base styles:** body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`; headings `color.text.primary`.

## New project

1. Inspect the framework and styling; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the theme system). Do not retype values.
3. Set up the root per the setup notes; build the components with every specified state, then the studio-detail components from the recipes.
4. Create `design-system/` with `VERSION` (`margin-notes@0.1.0-rc.2`), the tokens and a `components.md` of your conventions, including which titles get the serif word and where details appear.
5. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, shared components, routes and tests.
2. Propose a migration plan, including which screens get studio details, and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; any brand action color becomes `color.action.primary`.
4. Restyle one representative screen as a sample and wait for review; then go screen by screen, one commit each.
5. Preserve routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first. Use semantic tokens and existing components; never hard-code colors, sizes, radii or shadows.
- Before adding a studio detail, count the ones on the screen against rule 10.
- Uncovered needs: compose from tokens and note it in `design-system/components.md`; conflicting requests (a brand hue, weight 700): present options.

## Verification

Check at 1440px and 390px, light and dark. If you cannot render, check the code for each line:
- Build and tests pass; no raw colors, sizes or radii outside the token files.
- 390px: document `scrollWidth` equals the viewport; navs with more than 3 links use the menu button; tables wrap in `overflow-x: auto` or stack; flex and grid children holding text or inputs have `min-width: 0`; sticky bar pages have the bottom padding.
- Every input, select and search field has an explicit height of 32, 36 or 40px.
- Every interactive element has hover, `:focus-visible` and disabled styles; fields have the error style.
- Bloom: no `overflow: hidden` ancestor, mask set, dark filter switch present; at 390px nothing but the h1 overlaps it.
- Per screen: rule 10 limits, 2 pinned shadows, 1 primary per region, serif per the app list, mono per rule 7.
- Report files changed, anything you could not apply, and decisions you made yourself.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one commit; reverting it last restores the previous look.
