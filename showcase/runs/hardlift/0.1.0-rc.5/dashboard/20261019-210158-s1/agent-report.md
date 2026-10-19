Hardlift is now applied to every screen, in light and dark. The build passes, all 10 smoke tests pass, and the final screenshots (1440px and 390px, both themes) show no sideways scrolling. Routes, behaviour, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What I changed**
- **Tokens:** `design-system/tokens.css` is a copy of the package's `tokens.css` and is loaded first. Dark mode follows the system setting, and `data-theme` on the page can force either theme. The old variables in `base.css` still work because they point at the new tokens; `base.css` was rewritten against the semantic tokens.
- **Fonts:** DM Sans and JetBrains Mono load from Google Fonts in `index.html`, with the fallbacks the spec lists.
- **Signature pieces** (reusable, in `src/styles/signature.css` plus `Band.tsx`, `Sticker.tsx` and `Icon.tsx`), built to the spec's recipes:
  - **Lift buttons:** Refresh is ink, the search button and user menu are ghost, and only state-recovery actions are pink.
  - **Color bands:** one per screen. Overview is teal, Projects and project detail periwinkle, Team yellow, Settings lime, and not-found pages red. Breadcrumb, title, status badge and tabs sit in the band.
  - **Pills:** sidebar navigation, status filters and project tabs.
  - **Stickers:** one 32px coin on the throughput card, a 32px magnifier in the table's empty state, and a different 160px sticker on each of Settings, page not found and project not found.
  - **Motion:** the loading coin turns in place of skeletons; lift, coin and chevron motion all stop under reduced motion.
- **Components:** 48px inputs with the pink focus halo; ink-fill checkboxes; status badges with an icon plus the word; a bordered table with 16px sort arrows. Under 768px the tables become stacked label/value blocks, and the Projects table keeps sorting as a pill strip.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and `AGENTS.md` / `CLAUDE.md` point to it.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Leftover file:** `src/pages/PreviewPage.tsx` is left over from the temporary review route. The route is removed and nothing imports the file, but I couldn't delete it, so please remove it.
- **`tokens.json`:** not copied into `design-system/`; `components.md` points to the package's copy.
- **Time-range pills:** the spec puts these on dashboards, but the app has no time-range feature. I didn't add controls that do nothing.
- **Hover lift:** I couldn't capture hover in a screenshot. The lift follows the recipe, but I haven't seen it on screen.

**Decisions I made myself**
- **Sidebar:** I kept the existing sidebar instead of switching to the spec's top header. It uses vertical pills and becomes a top block with a scrolling pill strip under 1024px.
- **KPI trends:** shown as an arrow icon plus text, not green/red, because "down" is good news for incidents and lead time.
- **Chart:** bars are ink, with the current month as a small pink accent.
- **No cards around the tables:** the tables on Overview, Projects and Team no longer sit inside a card, so one raised box isn't nested in another.
- **Links:** I followed the spec's gray underlined links, including project names in the table.
- **Refresh while loading:** it stays ink with the turning coin rather than looking disabled. Disabled gray text on the band would fail the contrast rule.
- **Badge size:** padding is 0/8px instead of 4/8px, so the 16px icon fits the 24px height.