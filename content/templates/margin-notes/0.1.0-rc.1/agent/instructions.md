## Setup notes for this system

- **Fonts** (all OFL): Geist 400/500/600, Geist Mono 400/500, Instrument Serif 400 italic only, Caveat 400. Use the `font.family.*` stacks (they include the CJK fallbacks), `font-display: swap`, no synthesized bold or italic.
- **Theme:** `tokens.css` handles light, dark via `prefers-color-scheme`, and `[data-theme]` on the root. A toggle only sets `data-theme`.
- **Filters:** render the shared filter SVG once in the root layout.
- **Studio details:** small `aria-hidden` components built from the recipes; enforce rule 10 and the placement table.
- **Base styles:** body `color.surface.default`, `color.text.body`, `font.size.body`, `font.lineHeight.ui`, `font.family.sans`; headings `color.text.primary`; global `:focus-visible` per Shared component states.

## New project

1. Inspect the framework, styling and component structure; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json` into the existing theme system). Do not retype values.
3. Load the fonts, base styles and filter SVG per the setup notes.
4. Build the components in list order with every specified state, then the studio-detail components.
5. Create `design-system/` with `VERSION` (`margin-notes@0.1.0-rc.1`), the tokens and a short `components.md` of your conventions, including where this product allows studio details.
6. Add one line to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, global styles, shared components, routes and tests; list what changes and what must be preserved.
2. Propose a migration plan, including which screens get studio details, and wait for approval.
3. Map the tokens onto existing variables, aliasing old names so nothing breaks mid-migration. Any brand color used for actions becomes `color.action.primary`.
4. Restyle one representative screen as a sample and wait for review.
5. Continue screen by screen, one commit each, adapting to the existing information structure.
6. Preserve routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` before building UI. Use semantic tokens and existing components; never hard-code colors, sizes, radii or shadows.
- Before adding a studio detail, count the ones already on the screen against rule 10.
- Uncovered needs: compose from existing tokens and note it in `design-system/components.md`.
- If a request conflicts with the system (a brand hue, weight 700, shadows on every card), present options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen checked at 1440px and 390px, light and dark.
- Focus visible everywhere; contrast rules met; no raw color, size or radius values outside the token files.
- Per screen: detail limits from rule 10, at most 2 pinned shadows, 1 primary button per region, no detail inside data, forms or overlays.
- Interface color is only ink, paper and status; ink-blue only for info and decoration.
- Report files changed, anything you could not apply, and decisions you made yourself.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts and the filter SVG are one separate commit; reverting it after the screen commits restores the previous look.
