# inkleaf@0.1.0-rc.3 — evaluation 1

Verdict: **fail** · 2026-10-13T14:53:06.044Z

## blog (20261013-140943)

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

## commerce (20261013-140943)

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

## dashboard (20261013-140943)

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

## settings (20261013-140943)

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
| type-consistency | pass | 0.867 | 0.7 |
| reference-palette-distance | pass | 0 | reported |

## Critic

```json
{
  "referenceFidelity": 4,
  "crossAppConsistency": 4,
  "hierarchy": 4,
  "spacingRhythm": 4,
  "componentStates": 4,
  "polish": 3,
  "signature": 4,
  "notes": [
    "Average 3.86 (4/4/4/4/4/3/4), the same as rc.2. Polish is at 3, so the bar (avg >= 4.0, nothing below 3 that lacks a fix) is not met. This was the last allowed iteration, so under the rubric the loop stops here and goes to the user with this analysis. The rc.2 polish problem (empty pastel swatches) is fixed. Polish stays at 3 because of new and remaining defects, mostly in what the drawings say and how big they look: the wrong product on store cards, drawings that look adrift on stages, hands that read as little creatures, and a mobile plan strip that hides the current plan.",
    "rc.2 issues, one by one. FIXED: (1) Empty swatches. Every plate holds a category drawing. Blog post plates are 4:3, the store grid is 4:3 on desktop and mobile, and the article inline figure is now a lilac stage holding a ghosted board diagram, not a placeholder plate. (2) Blog featured. A 4:3 sage drawing stage sits beside the text from lg, with the stage first on mobile. (3) Article figure. Omitted or shown as a diagram on a stage. (5) Rule 4 conflict. 'More posts', 'Related posts' and 'Featured' open with the h2 alone. The About 'Why we write' section and the newsletter get openers. (7) Full-width buttons. 'Place order', 'Add to cart' and 'Save changes' labels are vertically centred at 390px. (8) Menu. Dashboard account menu: email caption header, items at the same size and inset, 'Sign out' after a hairline. (9) Table toolbar. 'Projects' title and count on one row, chips and search both 40px and centre-aligned, search label hidden. (10) Mobile sort. Dashboard stacked rows hide the header and offer a 'Sort by due date, ascending' select. Settings invoices stack without a header row. (11) Avatars. Blog authors spread apricot, lilac and sage. Dashboard team is 4 sage, 1 apricot, 1 lilac, which is the hash's output and acceptable. PARTIAL: (4) Stage proportions. The article stage is now 4:3, not 6:1. But the drawing ink still covers only about 25 to 30% of the stage width: blog featured set square ~30%, commerce detail backpack ~22% of a 684px stage. The recipe puts the picto box at 50%, and the drawing fills only ~60% of its box. (6) Legibility and hands. Hands now appear in at least half of each app's drawings. But see the polish and signature notes: the hands read as legged creatures, and subjects converge across apps. (12) Block rise. Clarified, but it produced a new side effect, see below. NOT APPLICABLE: (13) The working glyph is still never visible, because no base app has a pending request. This is a harness gap.",
    "Polish 3, issue 1: the store grid tells the wrong story about products. Category drawings follow the spec, but the subject is one product of the category, not the category. 'Ribbed Wool Beanie' shows a hand holding a key. 'Cast Iron Skillet' and 'Linen Tea Towels' show a steaming mug. 'Canvas Field Tote' and 'Weekender Duffel' show a backpack. The product detail page repeats the error: the 'Canvas Field Tote' drawing stage holds the backpack, so the one large image on the page contradicts its h1. A shopper reads plates as product images.",
    "Polish 3, issue 2: optical balance on stages. Commerce detail (desktop): a ~150px backpack floats in a 684x513 apricot stage, with a tall empty left column under it. Blog featured and article stages show a ~115px set square in a ~420px stage. Settings billing (desktop): the 16:9 minimum makes the lilac stage 603px tall around 370px plan cards, which leaves ~115px of dead lilac above and below. Settings billing (390px): the agent turned the plans into a horizontal snap strip inside the stage because stacked cards would exceed the 1:1 limit. The current plan (Pro) is cut off at the right edge with no affordance, which looks like an overflow bug. The dashboard agent hit the same limit and dropped its settings stage on mobile. Two agents responded to one spec conflict in two different ways.",
    "Polish 3, issue 3: hands look like creatures. Every hand is built from the spec's demo: a rounded palm closed into a ball, plus two short wrist strokes that diverge and stop in mid-air (demo strokes 8 and 9 end at y 113-114). At 48 to 96px these read as legs. Examples: the blog masthead pen sits on a round body with two legs, the newsletter envelope reads as a pot on legs, the wrench and mug plates look like little walking figures, and the search-empty magnifier looks like a lollipop-headed stick figure. The commerce kitchen hand reads as a ball of yarn beside the mug. This defect comes from the spec, not the agents: the demo they were told to learn from has the defect.",
    "Silhouette test failures that the agents' own 48px checks missed. Commerce shop header (hang tag in hand): an unreadable blob. Settings Profile header (ID badge on a clip) and Security header (padlock): near-identical silhouettes in the same sidebar. Dashboard project detail header: reads as a feather or a rocket, not a pencil in hand. The blog set square has three straight edges well over 15 units, which breaks the 'no straight run over 15 units' rule. Its identity depends on straight edges, so it should not have been picked.",
    "Subjects converge across apps, the same failure as rc.2's 'vehicles' with new objects. Steaming mug in a hand: blog (remote work), commerce (kitchen), dashboard (Team header). Receipt in a hand: commerce cart header and settings Billing header. Magnifier: blog, commerce and dashboard empty states. Lost mitten or sock: dashboard and settings not-found. The step-1 method (task verb, three held objects) converges on the same generic office objects.",
    "Signature 4. All five elements are present in all four apps and placed where Applying the concept puts them. Blog: masthead accent drawing, 4:3 featured drawing stage, plates, prose openers. Commerce: header drawing, plates, detail drawing stage, empty-cart drawing. Dashboard: header drawings, the main chart in a raised card on a sage stage (card ~85% of width, shares edges with the activity card). Settings: header drawings and plan cards with pictoMd drawings on a lilac stage. The motion frames confirm the strip in every app: blog m1 set square 12 steps / 996ms, m2 pen 17 steps / 1411ms, m3 envelope 14 steps; commerce tag 12 steps; dashboard clipboard 12 steps; settings badge 15 steps. Each steps stroke by stroke from frame 0, never blank, and holds. Header-in runs in blog and settings. Write-in h1s are present. Dots breathe on 'Active' and 'Active now' (dashboard loop count 1, still under reduced motion per the gate). Signature held at 4, not 5, because of the drawing craft and the sizing above.",
    "Cross-app 4. One family: the same paper and ink, serif h1 beside a 48px drawing in an identical header grid, 40px ring controls, stone chips with an ink selected chip, outline status badges with dots, 16px cards, a clay focus outline, warm dark mode, and dark pastel stages. Drift: mobile plan stage handling (settings strip vs dashboard drop), and drawing weight. Commerce detail and blog featured drawings are drawn heavier (the agent's bold variant) than the dashboard and settings headers.",
    "States 4. Focus: the clay outline in every app (commerce nav pill, search fields, settings sidebar). Hover: linked cards get shadow.hover plus a title underline, and table row hover is visible. Errors: danger ring, inline message replacing the hint, and an 'N fields need attention' alert above the actions (commerce checkout, settings profile and password). The password strength hint is a dot plus text. The dialog has a serif title and secondary plus primary actions. Empty states: blog, commerce and dashboard filtered-empty, each with a drawing, a serif title and one action. The blog empty-state title does not name the filter (test-pinned text). Newsletter success: a check-circle line with the drawing swapping to a mailbox. Settings 'Saved': a check-circle line.",
    "Block-rise side effect. Three agents (blog, commerce, settings) report that full-page captures with motion allowed show blank areas below the fold, because blocks start hidden and the capture never scrolls. Each one built and then removed a temporary override to review its work. The dashboard agent switched to first-render rise. The page captures here run with reduced motion, so the gallery is unaffected. But the rule as written hides content whenever the observer does not fire (no JS, print, reader modes, full-page capture), and the agents spent effort working around it. Agents also left temporary drawing-preview files (TempGallery.tsx, PictoGallery.tsx, DrawingsPreview.tsx) that they could not delete.",
    "Reference fidelity 4. Cream paper, warm ink, a serif display voice over a quiet sans, ink primary buttons, ringed secondary buttons, and calm card plans. Anyone who knows the reference recognizes the character. Nothing is copied: no starburst, no reference copy, and the plan icons are replaced by original cel drawings.",
    "Not counted: the sticky header painted mid-page in full-page state captures, and the dialog scrim ending at 900px (harness artifacts). Title-case post titles (test-pinned)."
  ],
  "promptFixes": [
    "Polish, store imagery (spec gap; Imagery 'Missing images' and Pastel stage 'plate'). Replace 'its category's drawing' with: 'A missing product image is drawn as that product's own subject (the tote is a tote, the beanie a beanie), shown at its final frame. A category drawing is used only when one object is true of every item in the category. Never show one product's object on another product's card. The product detail drawing stage always shows the product's own subject.' Add to Verification: 'Read each grid card: the drawing names that card's product.'",
    "Polish, drawing size (spec gap; Pastel stage recipe and Limits). '50% of the width' is being read as the box, so the visible ink is only ~25 to 30%. Change the CSS to `.stage--drawing .picto, .plate .picto { width: 80%; }` and state: 'The drawing's ink (not its box) spans 45 to 60% of the stage or plate inner width; a drawing fills about 60% of its box, so the box is 80%.' Add the same wording to the Never item 'a drawing under 45%'.",
    "Signature and polish, hands (spec gap: the demo causes it). In the hand demo, replace the two diverging wrist strokes (\"M48 95 ... 41 114\", \"M76 93 ... 83 113\") with two near-parallel strokes that leave the box through the bottom edge (end at y 120 or beyond, 18 to 26 units apart). Add to step 1: 'The wrist always runs off an edge of the box (bottom or side); never end wrist strokes in the air, never draw the palm as a closed circle. A hand with a visible wrist end reads as legs.' Add to the 48px silhouette test: 'if the drawing reads as a creature or figure, the wrist is wrong'.",
    "Polish, stage sizing (spec gap; Pastel stage CSS and Limits). Move `aspect-ratio: 16 / 9` from `.stage` to stages holding a drawing or media (`.stage--drawing`, `.stage--media`). Stages holding cards or charts take their height from their content with padding `space.48` (`space.24` under `breakpoint.md`). Add: 'Under `breakpoint.md` plan cards stack in one column on the stage, current plan first; the 1:1 limit does not apply to stacked cards. Never a horizontal strip that hides a plan, least of all the current one.' Add the Verification line: 'At 390px every plan card is fully visible without horizontal swiping.'",
    "Signature, subject convergence (spec gap; step 1 and the Avoid list). Add to Limits/Avoid: 'Overused defaults, avoid unless the screen is literally about them: a steaming mug, a magnifier, a receipt, an envelope, a lost glove or sock.' Rewrite step 1's last clause: 'take the clearest silhouette the app has not drawn yet, and that names this app's domain, not generic office work (a store's empty search is about goods, a dashboard's team page about people working).' Require `components.md` to list each drawing's subject, and require 'no two drawings in one app share a silhouette; compare all header drawings side by side at 48px (a badge on a clip and a padlock are the same silhouette)'.",
    "Signature, straight edges (strengthen step 2). Add: 'Subjects defined by straight edges (set squares, rulers, frames, books seen flat) are hard to draw without long straight runs; choose another subject or tilt and bow every edge. A triangle drawn as three straight strokes fails the recipe.'",
    "Motion, block rise (spec gap; Motion paragraph). Replace the hidden-start rule with: 'The hidden start state is applied only by script: add `is-rise-ready` to a block on mount, then remove the class when 15% enters view (or at once if already in view). Without script, in print and under reduced motion, every block is in its final state. Full-page captures that do not scroll are expected to show unrisen blocks with motion allowed; never add temporary overrides to review them, review under reduced motion instead.' Keep 'never special-case screenshots'.",
    "Agent hygiene (spec gap; Verification). Add: 'Check drawings on the real screens (or under reduced motion in the real routes); never create preview pages, galleries or temporary files in the project.' This stops the TempGallery, PictoGallery and DrawingsPreview leftovers that agents could not delete.",
    "Harness notes (not prompt fixes). (a) Add one capture state per base app that triggers an async action with a mocked 1s network response (route interception in the snapshot script), so the working glyph can be verified. (b) Take full-page captures with motion allowed by scrolling through the page first, or capture only the viewport, so block rise is judged fairly. (c) Give agents a delete-file command, or have the harness clean untracked preview files, since three agents left one behind."
  ]
}
```

## Reasons

- critic: average 3.86 (needs 4.0), lowest 3 (needs 3)
