## Setup notes for this system

- **Fonts** (OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic, Caveat 400; `font-display: swap`.
- **Theme:** dark follows `prefers-color-scheme` unless `[data-theme]` overrides it, both handled by `tokens.css`; a toggle only sets `data-theme`.
- **Root:** the filter SVG once; `html, body { overflow-x: clip }`; global `:focus-visible`. Body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`.

## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values.
3. Set up the root; build components with every state, then the studio details.
4. Create `design-system/` with `VERSION` (`margin-notes, updated <the spec's update date>`), the tokens and `components.md`: conventions and where each studio detail sits, by screen moment.
5. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, shared components, routes and tests.
2. Propose a migration plan and wait for approval.
3. Map the tokens onto existing variables, aliasing old names; a brand action color becomes `color.action.primary`.
4. Restyle one representative screen and wait for review; then go screen by screen, one commit each.
5. Preserve routes, business logic, API contracts, form fields and validation, test ids, text used by tests, accessibility attributes. Restyle existing markup; add classes, never replace elements.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; use semantic tokens and existing components, never hard-coded values.
- Uncovered needs: compose from tokens, note it in `components.md`; conflicting requests (a brand hue): present options.

## Verification

Check 1440px and 390px, light and dark: Tab focus, hover, empty and successful submits of each form, an open dialog. If you cannot render, check the code:
- Build and tests pass; no raw colors, sizes or radii outside the token files.
- Click every checkbox, radio and switch with the mouse: it toggles.
- 1440px: content starts at 40px; lead to first content at most `space.64`; no half-empty card; filtering moves no column.
- 390px: `scrollWidth` equals the viewport; statuses and row actions visible; the action bar fixed, full width.
- Light: hatch quieter than text. Dark: selected segment ringed and lighter than its track; off switch thumb visible; bloom on `mn-wash-night`. Both: linked-card hover visible.
- Dialog centered with the initial focus ring; every success shown by a toast or success badge.
- Walk the ten rules and the Never list on every screen; note arrows land within 12px of their target.
- Report files changed, what you could not apply, and decisions you made.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one commit; reverting it last restores the previous look.
