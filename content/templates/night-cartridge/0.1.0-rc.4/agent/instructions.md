## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); never retype values. Night follows `prefers-color-scheme` unless `[data-theme]` overrides it; design night first.
3. Load the fonts (the links in Pixel type) and set up the root: the three-line motion and shape block from Signature elements, the type base, global `:focus-visible`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene` (`sky`, `tops`, `ridge`, `edge`, `sprite`, `row`, `moon`, `dot`, art classes, the placements; per-scene detail lists), `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world; draw 3+ prop variants, focal and ground sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date, e.g. `night-cartridge, updated 2026-01-31`), the tokens, and `components.md`: the app's world, scenes by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays) and wait for approval.
2. Map the tokens onto existing variables; a brand action colour becomes `color.action.primary`; remove radius, soft shadows and transition utilities as you restyle.
3. Build the signature elements, then restyle one screen as a sample (header with dither and marker, scene window, ground strip, a marker list) and wait for review.
4. Continue screen by screen, one commit each. Never add delays, fake loading states or `role="status"` regions.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes. Keep native inputs (visually replaced).
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen follows Applying the concept; new scenes stay in the app's world with a new crop, prop and skyline seed.
- Uncovered needs: compose from tokens and note it in `components.md`; for conflicting requests (rounding, gradients, bold, smooth motion) present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files. An axe scan of every screen shows no violations, and no `definition-list`, `list` or `listitem` errors: every meter sits inside its `dd`, `li` or `td`.
- Reduced motion: every scene, meter and label complete on frame 1, nothing runs; with motion, lights blink out of sync, travel jumps 4px per step. Never change app code or config to pass a check.
- Each screen at 1440px and 390px, light and dark: no sideways scroll; focal sprite visible at 390px; crisp edges. Tab through: the gold ring always visible; one marker per list.
- Type at 1440px: 16px and 48px show solid 2px stems.
- Scenes: each passed two Pixel stage step 7 rounds or more and meets the step 6 counts (hero 120, banner 60, strip 30 hand-placed entries, every kind); report each scene's count and the differences fixed. Each still frame at 1440px: steps 3 and 4 (no gap between sky and ridge, a ridge generated for this scene, detailed walls, a round moon if any) and the ground-strip rule (one sprite 40 to 48px); inline figures fill their frame.
- Per screen: at most one gold button, in the page content (never header or search); one scene plus the ground strip; at most 3 four-sided 4px frames; no rounding, no bold. Card titles flush with their icon; a chip shows marker or bullet, not both; every "n of m" count has a block meter, no meter an invented maximum; the contents list shows a marker on load; panels in a row end level; the sidebar reaches the ground strip; an h2 at least `space.40` below a window; no placeholder clipped at 390px.
- Dashboard: each panel group (KPIs, chart, activity, table) has its own 32/40 h2 on the dither rule outside it, never only a 12px caption.
- Open each dropdown and custom select: the current or first option shows the marker and `color.surface.hover` at once, before any pointer or arrow key.
- Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
