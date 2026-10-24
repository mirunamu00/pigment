# Overfit review — inkleaf 1.0.0 (2026-10-19)

A read-through for rules fitted to the harness's demo apps. Verdict: **structurally fitted** — the Layout
adaptation block, the Applying the concept rows and the stage-color map prescribe the demo screens, and one rule
deletes content. Each item: where, the package's own words, what it must become.

1. **Featured post / article** (`principles/visual-language.md` ~412–414). "a drawing stage … 7 of 12 columns …
   'On this page' disclosure … Figures without an image are omitted." Omitting figures deletes content and
   contradicts Imagery (missing images become drawings). → A long-form page's lead image or drawing spans the text
   column; its contents list sits beside the text on wide screens and collapses on narrow ones; an image
   placeholder becomes the item's own drawing, never removed.
2. **Cart and checkout** (~409–410). "items, then the form … summary a plain card in a side column (4 of 12)". → A
   transaction summary sits in a narrow sticky side column on wide screens and after the main content on narrow
   ones.
3. **Chart card / stat cards** (~404–406). "chart flex:1;min-height:240px … Stat cards: 2 per row under
   breakpoint.md". → A panel stretched to a taller neighbour fills its height with its main content, no empty band;
   stat rows wrap evenly whatever their count.
4. **Applying the concept rows** (~427–431): Settings ("serif group titles, glyph in save, 'Saved'; plans on a lilac
   stage"), Dashboard ("main chart on a sage stage"), Store, Article ("featured post … on a drawing stage"). → Keep
   the row kinds, describe only what any product of that kind has (e.g. "Dashboard: the screen's primary
   visualization on one stage").
5. **Stage colour map** (~208–210; rule 6 ~12; instructions ~31). "the main dashboard chart (sage); plan cards and
   first-run empty states (lilac); not-found (apricot)"; "every plan card is fully visible". → Keep the colour
   rotation rule, drop the per-screen map; "offer or choice cards".
6. **Switch rows** (`components/switch.md` 5–6, 10–11). "Applies immediately, never behind a Save button." A
   behaviour change. → Keep the anatomy; "a switch that applies immediately needs no Save; inside a form, follow the
   form".
7. **Misread examples from a product catalogue** (~72–75, 441; lint `prose.overfit`). "a key as a ball; a hat held up
   on a palm …; a key ring without a key …; folded towels as a can"; "a tote is a tote". → General failure modes: a
   small object reading as a ball, a held object reading as a head, a folded or stacked item losing its defining
   detail (show a fold, fringe or stripe); "the item's own subject".
8. **Subject bans from past runs** (~57–59). "a store's empty search is about goods"; "steaming mug, magnifier,
   receipt, envelope, lost glove, sock or mitten". → Avoid the first cliché for the task (search, mail, payment)
   unless the screen is literally about it; no run-derived list.
9. **"Every app"** (~335, 347; `components/navigation.md` 18; instructions ~30). → "every product screen".
10. Minor: "Numbered trio" (`components/card.md` 10) → "Numbered steps", any count; "(fewer incidents is success)";
    `components/badge.md` 8 "Current plan", "3 items in cart" → neutral placeholders; instructions ~31 "Each grid
    card's drawing names its product …" → "an item's drawing and plate colour are the same wherever the item
    appears".
