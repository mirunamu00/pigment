# inkleaf@0.1.0-rc.1 — evaluation 1

Verdict: **fail** · 2026-10-13T13:05:33.943Z

## blog (20261013-123326)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## commerce (20261013-123326)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 10 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## dashboard (20261013-123326)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 9 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## settings (20261013-123326)

| Gate | Result | Value | Threshold |
| --- | --- | --- | --- |
| agent-finished | pass | 0 | 0 |
| build | pass | true |  |
| functional-preservation | pass | 8 passed, 0 failed | all pass |
| no-console-errors | pass | 0 | 0 |
| no-horizontal-scroll | pass | 0 | 0 |
| accessibility | pass | 0 | 0 |
| reduced-motion | pass | 0 | 0 |
| color-adherence | pass | 1 | 0.9 |
| font-adherence | pass | 1 | 0.98 |
| radius-adherence | pass | 1 | 0.85 |

## Cross-app and reference

| Check | Result | Value | Threshold |
| --- | --- | --- | --- |
| palette-consistency | pass | 0.833 | 0.75 |
| type-consistency | pass | 0.828 | 0.7 |
| reference-palette-distance | pass | 0 | reported |

## Critic

```json
{
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 3,
  "spacingRhythm": 3,
  "componentStates": 4,
  "polish": 3,
  "signature": 3,
  "notes": [
    "Reference character comes through in all four apps: cream paper, ink text, a Source Serif heading voice with a quiet sans, ink and paper ring buttons, clay focus outline, pastel stages with wandering lines, and small ink pictograms. Nothing is copied. There are no sprouts, stacked blocks, globes or star marks. Derived, not cloned.",
    "Average 3.43 with three dimensions at 3 (hierarchy, spacingRhythm, polish), plus signature at 3. Below the bar (avg >= 4.0).",
    "Signature presence: header pictograms beside the h1 on every product screen (commerce, dashboard, settings), section openers on blog content pages, drawn empty states (blog search, dashboard filter, commerce cart), and plan-card drawings on a lilac stage (settings billing). Stages appear in all four apps: blog featured post (sage, with tray), blog article (lilac and apricot), commerce detail and cart summary (sage), dashboard chart (sage) and project detail (apricot), settings plans (lilac). The glyph shows in blog (Subscribing, inside the button) and settings (Saving, beside the button). Dashboard built it but never shows it.",
    "Motion is the weakest part of the signature evidence. Blog: the agent disables every entrance animation when navigator.webdriver is set, so shots.json reports 0 animations and no frames. The 12 fps redraw, write-in and rise can't be checked at all. Commerce, dashboard and settings: every pictogram sequence (motion-m1) shows 7 blank frames, then the finished drawing pops in at about 870-1025 ms. Only `cel-hold` is recorded and no `cel-flash` appears in the keyframe lists, so the stroke-by-stroke stepped build is never visible. The per-frame recipe (one animation per <g>) can't be verified by the harness and may not play as intended.",
    "Pictogram craft: the blog hero (notebook and pen, accent fill) is a rectangle of long straight, uniformly heavy strokes. It reads as a crude marker icon, not the reference's wobbly brush line, and it breaks the recipe's 'no long straight runs'. The 48px header drawings (bag, tag, basket, watering can, mirror, purse) read as slightly wobbly icons, not drawings. At that size the uneven weight and off-register fill disappear.",
    "Commerce product detail (desktop): a 566px sage stage holds a 185px white card with a 40px outline bag icon. It looks like a missing-image placeholder, not staged product UI. Shop grid: three identical bag icons, three identical tees, three identical mugs centered on plates. The grid looks like a wireframe.",
    "Commerce cart with items (state-checkout-errors): Items card in the left column, summary stage and the whole checkout form stacked in the narrow right column. A large empty area sits under the items. The primary task (checkout) is squeezed into a third of the width.",
    "Dashboard overview: the 'Deployment throughput' title sits outside its stage while 'Recent activity' sits inside its card, so the two panels have different tops and bottoms (stage ends about 870px, activity card about 905px). Project detail puts a plain description and key-value summary on an apricot stage. That is decoration, not a highlight panel.",
    "Product screen headers differ across apps. Commerce uses the 23px lede and starts it at the container edge. Dashboard uses about 17px and indents it under the h1 text (past the drawing). Settings uses 17px and starts it at the drawing edge. Settings also puts the header product name at x=58 while the sidebar items start at x=28.",
    "Blog: the inverse footer is a 280px black band holding one 12px sentence. Avatar tiles on About are about 28px instead of 40px. On mobile the article puts the 'On this page' card above the h1, so the table of contents comes before the title. Article h2 sizes vary ('Office hours beat documentation' is visibly smaller than its siblings). Post titles stay in title case because the tests pin the text. Acceptable, noted.",
    "States: the clay focus outline is consistent (nav item, sidebar item, search, inputs, segmented control). Errors use a danger ring, an inline message and an 'N fields need attention' line in blog, commerce and settings. Hovered cards get shadow.hover plus a title underline. The dashboard row hover is barely visible on a white card. Dialog: serif title, stage radius, close button, ring buttons, good. The settings 'profile-saved' capture shows 'Saving' with the glyph, not the saved confirmation, because the agent added a 600ms fake delay. Settings has no toast (the agent cites the smoke test's single role=status).",
    "All three agents that show the glyph invented artificial waits to do it (blog 0.9s, commerce 600ms, settings 600ms). That is a behaviour change the spec's 'glyph on submit' invites.",
    "Dark mode holds up in all four apps: stages switch to the dark pastel tokens, the primary inverts to paper, status text stays legible. No cool grays or pure black slipped in. The sticky header showing mid-page in several state captures (blog search-empty, commerce checkout-errors, dashboard row-hover) is a full-page capture artifact, not counted against the apps."
  ],
  "promptFixes": [
    "Signature/motion (spec gap, recipe): replace the per-frame animation recipe for the cel pictogram with one animation per drawing. Lay the frames out as a horizontal sprite inside a clipped <svg> (frame k at x = k*120 in a viewBox 120 wide) and animate a single `transform: translateX()` with `steps(N, jump-none)` over N x `motion.duration.frame`, `forwards`. This mirrors the reference glyph technique, runs as one animation the harness can capture, and can't leave the frames invisible. Keep reduced motion = final frame via `animation: none; transform: translateX(-(N-1)*120)`.",
    "Signature/motion (agent mistake, add to Never): 'Detecting automation (navigator.webdriver, user agent) to skip or shorten animations.' Pair it with a spec rule for the real problem behind it: 'Entrances wait for the viewport, but anything above the fold on load plays immediately, and an element never stays hidden for more than one frame after it scrolls into view. Do not special-case screenshots.' Lead/harness note: full-page captures should scroll the page once before capture so in-view entrances resolve.",
    "Pictogram craft (strengthen the recipe): add 'No straight segment longer than 15 units; boxy subjects (notebook, box, card, tag) get bowed edges and a corner that overshoots. At `size.pictoSm` use 5 to 7 strokes, widths 4.0 to 5.0 units, so the brush weight survives at 48px; the off-register fill must show at least 2px.' Add a second, hand-based construction demo (a palm and three noodle fingers holding a simple object) so agents see the organic line, not only a cup.",
    "Store (spec gap): 'When a product has no image, the detail stage holds a `size.pictoXl` drawing of the product (a new subject) directly on the stage, never a small raised card with an outline icon. Grid plates without images show the category outline icon at `size.iconLg` in the plate's bottom-left at `space.16`, not centered and not enlarged.' Add 'Store grid under `breakpoint.md`: 2 columns, 1:1 plates, card body padding `space.12`.'",
    "Stage use (tighten Limits): 'A stage holds a chart, media, a pictogram, plan cards or a ghosted preview, never a text-only description, a key-value summary or a form-adjacent order summary.' This prevents the dashboard project-detail and commerce cart-summary stages.",
    "Cart layout (spec gap, add to Layout adaptation): 'Cart and checkout: items, then the checkout form, in the main column (max `size.form` for the form); the order summary in a side column from `breakpoint.lg`, sticky at `size.header` + `space.24`; under `breakpoint.lg` the summary follows the items.'",
    "Product screen header (spec gap, Typography plus Spacing): 'Product screen lede: sans 400 `font.size.body`, `color.text.secondary`, `space.8` under the h1. The drawing, h1 and lede share one left edge: the drawing sits left of the h1 at `space.16`, and the lede starts at the drawing's left edge, never indented under the h1 text.' Also: 'The header product name aligns with the sidebar's item text inset (`space.16` + `space.12`).'",
    "Panel rows (spec gap): 'In a two-column panel row on a product screen, every panel's title sits inside its own card (a staged panel's title goes inside the raised card on the stage), and the row uses `align-items: stretch` so both panels share top and bottom edges. The card-grid `align-items: start` rule applies to content card grids only.'",
    "Working glyph (agent mistake the spec invites, move into the ten rules and the Never list): change Form to 'glyph while a real request is pending'. Add to Never: 'Artificial delays added to show a loading state.' Add to Button states: 'The glyph and gerund replace the label inside the submitting button; never a glyph beside the button.' With no async work, the success state shows immediately.",
    "Toast versus test constraints (spec gap): 'If the screen already has an inline status region (`role=\"status\"`), the success message (16px check-circle plus \"Saved\") goes in that region and no toast is added; never create a second `role=\"status\"`.'",
    "Content-site footer (spec gap): 'Use the inverse closing band only when the footer has at least two link groups; otherwise use the product footer (hairline plus one caption line). The inverse band never holds a single sentence.'",
    "Article on mobile (spec gap): 'Table of contents under `breakpoint.lg`: a collapsed \"On this page\" disclosure placed after the lede and featured stage, never above the h1.' Also: 'Article h2 `font.size.h4`, h3 `font.size.h5`; every h2 in one article the same size.'",
    "Stat changes (spec gap): 'A stat's change line takes its status color from meaning (fewer incidents = success), not from the sign; if the meaning is unknown, use `color.text.secondary`.'",
    "Table row hover on a raised card (spec gap): 'On `color.surface.raised`, row hover uses `color.surface.subtle` (not `surface.hover`) so the hover is visible.'",
    "Avatars (agent mistake, already specified): restate under Components: Avatar as its own entry, '40px, `radius.tile`, never smaller in cards or lists; 32px only in the header'."
  ]
}
```

## Reasons

- critic: average 3.43 (needs 4.0), lowest 3 (needs 3)
