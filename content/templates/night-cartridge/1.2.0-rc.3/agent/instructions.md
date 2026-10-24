## New project

1. Inspect the stack; propose an installation plan and wait for approval.
2. Copy `dist/tokens.css` into global styles (or map `dist/tokens.json`); add `color-scheme: dark` on `:root` (dark only, Color use).
3. Load the fonts (Pixel type links) and set up the root: the motion and shape block from Signature elements, the type base, global `:focus-visible`, the `.dither` rule under the header.
4. Build the signature elements first, as reusable pieces: `PixelScene`, `GroundStrip`, `Marker`, `Window`, `DitherRule`, `BlockMeter`, `Callout`, the stepped keyframes and both header switches. Pick the app's world; draw 3+ prop variants, focal, ground and product sprites and icons before any screen.
5. Build the components with every state; place the signature elements per Applying the concept.
6. Create `design-system/` with `VERSION` (system id and update date), the tokens, and `components.md`: the app's world, scenes by screen, the hue of each category.
7. Add to `AGENTS.md` and `CLAUDE.md` (create if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit styling, components, routes and tests; propose a migration plan (what changes, what stays); wait for approval.
2. Map the tokens onto existing variables (a brand action colour becomes `color.action.primary`); remove radius, soft shadows, transitions, any light theme and theme switch as you restyle.
3. Build the signature elements, restyle one screen as a sample (header with dither and marker, scene window, ground strip, a marker list), wait for review.
4. Continue screen by screen, one commit each.
5. Preserve routes, logic, API contracts, form fields, validation, test ids, text used by tests and accessibility attributes.
6. Finish with `design-system/` and the pointer lines from New project.

## Ongoing development

- Read `design-system/` first; semantic tokens and existing components, no hard-coded values.
- Every new screen follows Applying the concept; new scenes stay in the app's world with a new crop, prop and skyline seed.
- Uncovered needs: compose from tokens and note it in `components.md`; for conflicting requests (rounding, gradients, bold, smooth motion) present options.

## Verification

- Build and tests pass; no raw colours, sizes or radii outside the token files; axe: no violations on any screen. Never change app code or config to pass a check.
- Reduced motion: scenes, meters and labels complete on frame 1, nothing runs; with motion, lights blink out of sync and travel jumps 4px per step.
- Each screen at 1440px and 390px: no sideways scroll; focal group visible and centred at 390px; crisp edges; 16px and 48px type with solid 2px stems; tabbing always shows the gold ring; one marker per list.
- Every reported number is measured on the render; "checked by eye" fails. Scenes passed two step 8 rounds. Report per scene each number steps 3, 4 and 7 set (detail entries by kind, lead height and margin, gaps left to right, tall verticals' x spans, ridge lift and distance to the focal group, props in each outer 10% or crossing a crop edge, the hero's rise, strip props' width ÷ height, the tallest flat-tone run), the lead's subject, features and signs, and fixes. Required: a variant table `variant | x positions | what differs (4+ units)`.
- Hero: a continuous `color.art.sky6` rim and a diagonal path at 1x; at 390px the lead whole under 64px+ of sky, the Window framed. Product pages differ; no banner or strip reuses the hero's lead or focal group. Squinting at 1x, no lead or board part reads as a letter; every tool is 4×4+ units.
- Product sprites pass Imagery steps 1–5 (each one 4-connected region). Required: a table `sprite | ink px | window px | %`, a row per grid and detail sprite at 1440px and at 390px (ink = drawn width, window = inner width), every row 40–50%.
- Per screen: at most one gold button, in the content; at most 3 four-sided 4px frames; panels in a row end level; newsletter titles 32px; at 390px every header shows mark and name, tables pinned-only, one-line, equal rows, first column 16+ characters; the error icon reads "!" at 1x; promised initials shown.
- A missing required table fails. Walk the ten rules and the Never list. Report files changed, what you could not apply, and your decisions.

## Rollback

- Each screen is its own commit and can be reverted alone.
- Tokens, fonts, root setup and signature pieces are separate commits, reverted last.
