# Overfit review — margin-notes 1.1.0 (2026-10-19)

A read-through for rules fitted to the harness's demo apps. Verdict: **structurally fitted** — the per-app
studio-details list maps the identity features to four demo screens with their copy, and rule 6 and the details
table depend on it. Each item: where, the package's own words, what it must become.

1. **"Per app, one note each"** (`principles/visual-language.md` ~103–107). Four bullets — Dashboard, Store, Blog,
   Settings — each describing one screen: a note on a lead's period words, a featured card that "spans columns 1 to
   8, taped", a note sized for "the 220px sidebar". → Say where details go by screen moment, for any product: bloom
   and serif word on the page header of a home, index or collection screen; tape on a pinned or featured item; the
   note beside the lead or a featured item's eyebrow, restating it; settings and form screens get only a note on the
   navigation. No product kinds, no column spans, no sidebar widths.
2. **Rule 6 depends on that list** (~17, ~101 "Titles on the per-app list"). → One serif word per screen, in a page
   h1 of 2+ words on a home, index or collection screen, or in an editorial title; never on settings, form, checkout
   or record-detail screens.
3. **Example copy taken from a demo lead** (~105 "a lead about bags and kitchen goods → 'made for every day'"; ~104
   and recipe ~196 "October 2026 … this month so far"). → Placeholder text in examples and recipes; the note
   restates whatever its target says (2–4 words).
4. **Featured card span** (~106). → A featured item may be pinned (tape plus `elevation.pinned`) and spans the
   columns its content needs.
5. Minor examples from demo copy: Never-list pair ("Projects" / "All projects", ~34), "8 projects" (~58), "Showing 0
   of 6 posts" (~18), "Current plan" and "This device" (~13, `components/badge.md` 7), "Saved" (~92). → Neutral
   placeholders ("Orders" / "All orders", "{n} items", "a result count in a sentence"); a state marker tags the
   current or selected item next to its name.
6. Charts (~42): "past periods … current one full". → The emphasized mark (current or selected) is full ink, the
   others rest at `opacity.chartRest` — for any chart.
7. "blogs add 1 pull-quote per article" (~101) → long-form articles may set one pull-quote in serif.
8. "same in every app" (`components/media-frame.md` 7), media ratios tied to content kinds (5) → "every product";
   ratios as defaults by image kind.
9. Stale: `agent/instructions.md` ~12 writes `VERSION (margin-notes@1.0.0)` — use the current version placeholder.
