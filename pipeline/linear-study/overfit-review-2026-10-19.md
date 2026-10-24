# Overfit review — graphite-blueprint 1.1.0 (2026-10-19)

A read-through for rules fitted to the harness's demo apps. Verdict: **structurally fitted** — the Applying the
concept table is mostly one row per demo screen, and `agent/instructions.md` makes each row mandatory, so demo
layouts become requirements for every product. Each item: where, the package's own words, what it must become.

1. **Closing statement** (`principles/visual-language.md` ~457, 364–366). "Closing: newsletter, store and blog
   lists … (a store: its shipping or returns promise)"; "two sentences of at most 12 characters" with a shipping
   example; "longer copy goes in the form's helper line". → A page may end with one short two-tone closing
   statement and its action(s); each sentence one line at `breakpoint.lg`. No per-kind mapping, no product promise
   example, no form assumption, no character count tied to one example.
2. **Dashboard row** (~458, 95–97). "KPI cards; dot-column chart on a quiet stage …, level with the activity list
   beside it …"; "the list is capped at the stage's height with 'View all →'". → Dashboard: the main chart sits on a
   quiet stage; panels in a row end level (stretch, or cap the longer content). No fixed set of parts.
3. **Spec plate captions** (~229). "one fact … (a material, capacity or weight), `FIG 03 · 18 OZ CANVAS`". → The
   item's number and one short distinguishing attribute it actually has; neutral placeholder examples; never invent
   physical facts for items that have none (a plan, a course, a person).
4. **Store grid / product detail rows** (~460–461). "mono `CATEGORY · IN STOCK` over the name; segmented pills;
   Details rows numbered in mono". → Detail page: one quiet stage for the item's image, its caption the only FIG;
   the item's meta as a mono label over the name; option pickers as segmented pills.
5. **Dot meter** (~142, 459). "password strength, a person's load"; "a 1-to-5 load as the dot meter". → A small
   ordinal level (1–5) may show as the dot meter with its value; no examples that turn ordinary numbers into meters.
6. **Table small screens** (`components/table.md` 9, 18–22; `agent/instructions.md` ~31). Badge example ("This
   device"), pin precedence "(row actions, else status, else the key number)", head examples ("PROJECTS",
   "STATUS"), unit example ("4 projects"), "(email, ID)"; "KPI values level" in the table check. → Keep the pin
   mechanism; the pin is the one column a user needs to act on or judge the row; neutral examples; drop the KPI
   check from the table step.
7. **"Content home"** (~344–347, 463; instructions ~33). A "FEATURED" label block with "the plate's top above 900px
   at 1440px"; "featured post as in Signature 6". → A featured item, if the page has one, takes a mono label, not a
   second large headline; one large headline per first viewport. No pixel position tuned to one page.
8. **Settings** (~446–447, 386–392, 209, 465; `components/card.md` 6–7, 10; instructions ~32). "(payment method,
   plans, invoices)", "the only place for 1-2-3 tier stacks", "Plan card … 16px checks", a "Current" badge,
   `.settings-group … :last-child` with "status regions empty (48)". → Wide blocks inside a settings section span
   the controls column; tier stacks one slab per tier level (any count); keep the spacing mechanism without naming
   one page's blocks.
9. **Cart / checkout row** (~462, 340). → Success or confirmation states: a small blueprint plus a two-tone sentence.
10. **Text field examples** (`components/text-field.md` 7, 11–14). "120 / 160", "one-field forms too", the second
    banner rule for long forms. → Keep the rules, neutral numbers.
11. **Test-setup leaks** (~367–368; instructions ~32–33). `("SHOWING 6 OF 6 POSTS")`, "in every app", "across
    apps", "for brand, breadcrumb, h1, Related and footer". → "everywhere in the product"; "the article's main
    blocks share one left x". A user's agent builds one product.
12. Minor: KPI label ellipsis note (card.md 6), "a settings preview" in the quiet-stage list (~90–91).
