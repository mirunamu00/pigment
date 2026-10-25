## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values. Dark mode follows `prefers-color-scheme`; `data-theme="dark"` or `"light"` on the root forces a mode.
3. Load Space Grotesk (400, 500, 600, 700) and JetBrains Mono (400) with their fallbacks, including the CJK fallback. Set `font.family.sans` on the body and the paper ground `color.surface.default` on the page.
4. Build the signature elements first, as reusable pieces: the lift class and the plate-stack wrapper; the band, split band, header band and black footer; the ink box, ruled group, pill and dashed empty box; the price flag; the hero action row; and a sticker kit of 4–6 original objects of this product's own nouns made with the sticker builder, the header-band placement, the media vignette and glyph box, one word badge and the loading sticker. Then the interaction states from Interaction.
5. Build the base components in the order of the component list, each with every specified state. Assign each top-level area its band color (rule 4) and place the signature elements as Applying the concept says.
6. Create `design-system/` with `VERSION` (the system id and update date the spec states, e.g. `felt-tip-market, updated 2026-01-31`), the tokens, and a short `components.md` of your conventions: the area-to-band map, the sticker subjects, where each signature element is used and how to reuse it.
7. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan, including the area-to-band map and the sticker subjects, and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Build the signature elements as reusable pieces, then restyle one representative screen as a sample (header band, ink frames, lift, the flag on money, a sticker where Applying the concept places one) and wait for review.
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
- Every hero ends on a pair at one shared 60px height: the plate-stack CTA beside a bordered input that fits the product (or an outline button), stacked full width on phones; never a lone default-size button.
- Hovering a button or linked card lifts it with the hard shadow and pressing slams it flat; inputs, tabs, pills and rows never lift.
- Stickers are original drawings of the product's own subjects, never over text, controls or data; no object repeats on a screen.
- Measure every sticker as it renders (1440px and 390px). Hero: 4–6 stickers, on desktop at least half 180–256px and none under 120px, on phones the largest at least 120px. Header band: one sticker as tall as the title block plus lead, cropped by the trailing side only, at least 60% visible; nothing cropped at a corner.
- Every sticker and drawing is one solid swept straight down on screen with one outer outline; its strip is at least 10% of the object's larger rendered side (30px on a 300px object) along the whole lower edge; thin things are thick board. The largest drawing on a screen shows no less strip than the smallest vignette.
- A media-box drawing spans 55–70% of the box width, is never cut by the frame, and has a 3px outer outline in boxes wider than 320px.
- No item without an image shows a picture glyph or a grey fill: it has its own drawn vignette or a dashed glyph box.
- Dark mode: black ground, boxes one step lighter, black top bar and footer, bands, stickers, plates and flag unchanged, white fills on bands kept, black buttons pink, current nav pill white, hard shadows visible.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- With reduced motion, drift, rocking and marquees are still, lifts swap instantly, and every screen stays readable.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
- The sticker kit lives in its own folder and commit; removing it leaves screens working (stickers are decorative and `aria-hidden`).
