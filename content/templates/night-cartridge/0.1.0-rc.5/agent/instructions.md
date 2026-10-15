## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values. Night follows `prefers-color-scheme` unless `[data-theme]` overrides it; design night first.
3. Load the fonts (Pixel type links) and set up the root: the motion and shape block from Signature elements, the type base, global `:focus-visible`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene` (the helpers, art classes, placements and per-scene detail lists), `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world; draw 3+ prop variants, focal and ground sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date, e.g. `night-cartridge, updated 2026-01-31`), the tokens, and `components.md`: the app's world, scenes by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action colour becomes `color.action.primary`; remove radius, soft shadows and transition utilities as you restyle.
3. Build the signature elements, then restyle one screen as a sample (header with dither and marker, scene window, ground strip, a marker list) and wait for review.
4. Continue screen by screen, one commit each. No fake loading states or extra `role="status"` regions.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Keep native inputs (visually replaced).
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen follows Applying the concept; new scenes stay in the app's world with a new crop, prop and skyline seed.
- Uncovered needs: compose from tokens and note it in `components.md`; for conflicting requests (rounding, gradients, bold, smooth motion) present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files. An axe scan of every screen: no violations, no `definition-list`, `list` or `listitem` errors (meters sit inside `dd`, `li` or `td`).
- Reduced motion: scenes, meters and labels complete on frame 1, nothing runs; with motion, lights blink out of sync and travel jumps 4px per step. Never change app code or config to pass a check.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; focal group visible at 390px; crisp edges; 16px and 48px type with solid 2px stems. Tab through: the gold ring always visible; one marker per list.
- Scenes passed two Pixel stage step 8 rounds or more. Report per scene: detail entries (hero 120, banner 60, strip 30, vignette 15, every kind); props (≤12; strip 5–9); the focal group's lead over the tallest supporting prop (≥4 units); each variant used twice and how its copies differ (≥4 units); strip props' width ÷ height (≤2); the tallest run of one flat tone (≤25% of the height); the fixes made.
- Still frames at 1440px: three graded layers, no gap under the sky, ridges new to this scene, detailed walls, a round moon if any; nothing under the hero Window; in dark theme toned walls, only lights, signs, stars and moon bright; vignettes and figures are full small scenes; the tallest ground-strip sprite 20–24 units (40–48px), poles and lamps not counted.
- Per screen: at most one gold button, in the page content; at most 3 four-sided 4px frames; card titles flush with their icon; a chip has marker or bullet, not both; every "n of m" has a block meter, none an invented maximum; the contents list shows a marker on load; panels in a row end level; the sidebar reaches the ground strip; an h2 at least `space.40` below a window; no placeholder clipped at 390px.
- Dashboard: each panel group has its own 32/40 h2 on the dither rule outside it. Each dropdown and custom select opens with the current or first option showing the marker and `color.surface.hover`, before any key.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
