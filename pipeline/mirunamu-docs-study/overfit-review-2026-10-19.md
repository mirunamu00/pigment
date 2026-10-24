# Overfit review — night-cartridge 1.2.0 (2026-10-19)

A read-through for rules fitted to the harness's demo apps. Verdict: **structurally fitted** — the scene-world
rewrite worked, but the item-sprite block and the "n of m" meter rule still come from the demo apps and change what
an agent builds for other products. Each item: where, the package's own words, what it must become.

1. **Item sprites** (`principles/visual-language.md` ~344–356; `agent/instructions.md` ~32, 35). A parts catalogue
   ("a pan's handle 30–40%", "two handles are two separate loops", "a ring or loop never reads as a magnifier",
   "a sleeve flares from the shoulder", "two fronts, a lid on its pot"), a name-test list of past misreads, grid
   arithmetic "(1248−4×16)÷5", "192px inner", "minmax(236px,1fr), at most 5 columns", and a mandatory per-sprite
   report table. → Missing images: a framed sprite with one outer outline and 2–3 defining parts, nameable at 1x;
   set-mates differ in outline; ink fills about half the window. No object catalogue, no grid arithmetic (size grids
   by content), no per-sprite report table.
2. **"Every n of m count is a block meter"** (~15 rule 9, ~221; instructions ~34). Quotes "(Showing n of m)", "n of
   m on", "2 of 6". → Progress against a real, fixed maximum (a quota, steps done, capacity, items enabled out of a
   set) is a block meter. Search and filter result counts stay caption text. Drop the quoted strings and the "m ≤
   20" patch.
3. **A unique banner for every detail page** (~53, ~331, ~26). "Each detail page in a set … gets its own Banner
   lead … no sibling's page uses". A product with hundreds of records cannot draw a scene per record. → Each kind of
   screen gets its own scene; detail pages of one kind share a scene or vary it by category (sign word or lead per
   category).
4. **Panel balancing** (~307, 316). "grow the shorter (plot up to `size.chart`, more list rows) or trim the longer
   (5–8 activity items + 'View all')"; `.panels{grid-template-columns:2fr 1fr}`. → Side-by-side panels end level:
   balance by adding or trimming content in the longer one (with a "View all" link); column widths follow content.
5. **Catalogue grid and cart row** (~331). "the picture window sticky or as tall as the purchase column …". →
   Two-column detail layouts: the shorter column sticks or grows so neither ends far above the other; totals in a
   Window, steppers as generic cart guidance.
6. **Footer sign-up form** (~227, 271). → A small standalone form outside the main content is a light panel with a
   section heading, not a full window. Don't name the footer.
7. **KPI tiles 4/2/1 columns** (~306). → KPI tiles share one row and wrap evenly, whatever their count.
8. Minor: card clamp lengths (`components/card.md` 3), "(avatar, cover)", "(plan, option)" examples.
