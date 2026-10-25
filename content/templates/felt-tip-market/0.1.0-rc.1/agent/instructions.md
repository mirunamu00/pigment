## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values. Dark mode follows `prefers-color-scheme`; `data-theme="dark"` or `"light"` on the root forces a mode.
3. Load Space Grotesk (400, 500, 600, 700) and JetBrains Mono (400) with their fallbacks, including the CJK fallback. Set `font.family.sans` on the body and the paper ground `color.surface.default` on the page.
4. Build the signature elements first, as reusable pieces: the lift class and the plate-stack wrapper; the band, split band, header band and black footer; the ink box, ruled group, pill and dashed empty box; the price flag; and a sticker kit of 4–6 original SVG objects drawn for this product's own nouns, plus one word badge and the loading sticker, following the recipes. Then the interaction states from Interaction.
5. Build the base components in the order of the component list, each with every specified state. Assign each top-level area its band color (rule 4) and place the signature elements as Applying the concept says.
6. Create `design-system/` in the repository with `VERSION` (the system id and update date the spec states, e.g. `felt-tip-market, updated 2026-01-31`), the tokens, and a short `components.md` describing the conventions you established — including the area-to-band map, the sticker subjects, where each signature element is used and how to reuse it.
7. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan, including the area-to-band map and the sticker subjects, and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Build the signature elements as reusable pieces, then restyle one representative screen as a sample — with its header band, ink frames, lift on its actions, the flag on its money figure if it has one, and a sticker where Applying the concept places one — and wait for review.
5. Continue screen by screen, one commit per screen. Adapt to the existing information structure; never force a layout from a reference image.
6. Preserve: routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with the `design-system/` folder and the `AGENTS.md` / `CLAUDE.md` pointer described under New project.

## Ongoing development

- Before building UI, read `design-system/`. Use semantic tokens and existing components; do not hard-code colors, sizes, radii or shadows.
- Every new screen gets the signature elements its context calls for in Applying the concept — a new screen without them is unfinished. A new area gets the next band color in the map.
- New stickers are drawn with the same recipe and stroke; reuse the kit before drawing more.
- If a need is not covered by the system, compose from existing tokens, then note it in `design-system/components.md`.
- If a request conflicts with the system, present the options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen was checked at 1440px and 390px wide, in light and dark.
- Every border on a product surface is 1px ink (2px only for selected or error); no soft shadow, blur or gradient exists anywhere; nothing at rest has a shadow except dialogs, menus, toasts and art slabs.
- Pink fills at most three roles and two buttons per screen; at most one plate stack per screen; one band color per product screen; no two same-color bands touch.
- Hovering a button or linked card lifts it with the hard shadow and pressing slams it flat; inputs, tabs, pills and rows never lift.
- Stickers have even ink outlines and flat fills, never overlap text, controls or data, and are original drawings of the product's own subjects.
- In dark mode the bands, stickers, plates and flag are unchanged, black buttons are pink and the current nav pill is white.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- With reduced motion, drift, rocking and marquees are still, lifts swap instantly, and every screen stays readable.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
- The sticker kit lives in its own folder and commit; removing it leaves screens working (stickers are decorative and `aria-hidden`).
