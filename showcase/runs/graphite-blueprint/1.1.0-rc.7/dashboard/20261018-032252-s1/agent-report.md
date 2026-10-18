I've applied Graphite Blueprint 1.1.0-rc.7 to every screen. The build passes, all 9 smoke tests pass, and the final screenshot run shows no page scrolling sideways at 1440px or 390px, light or dark. Light and dark follow the device setting; the app had no theme switch, so I didn't add one.

I looked at the screenshots of all four captured pages (mostly in both themes and both widths), plus Settings and the not-found page. I also checked each signature element on its own on a temporary review route, which I've since removed.

One gap in that review: I didn't screenshot the Tasks tab, the empty filter result, the open user menu, or the "Project not found" page. The tests exercise the first three, and "Project not found" uses the same layout as the not-found page.

**What changed**
- **Tokens and fonts:** `tokens.css` is copied verbatim into `src/styles/`. The old variable names now point at the new tokens. Inter (variable) and Geist Mono are self-hosted through two npm font packages added to `package.json`, not a font CDN.
- **Signature elements:** each one is a reusable piece in `src/design/recipes.ts`, `src/components/signature.tsx` and `src/styles/signature.css`. That covers the stage, dot glyphs, dot meter, blueprints, spec plate, shimmer and live indicators, and the screen header with its two-tone summary. All looping motion stops on a readable frame under reduced motion.
- **Shell:** graphite sidebar with icons, which becomes wrapping pill links below 1024px. Sticky blurred top bar with pill search; the user menu is a raised popover.
- **Overview:** KPI grid, deployments chart drawn as dot columns on a quiet stage, sized to match the activity list beside it.
- **Tables:** new table styling with mono headers, a 12px sort chevron, status icon plus word, and only the first and pinned columns shown on phones. Team shows a 1–5 dot meter beside each project count.
- **Project detail:** breadcrumb, status badge, tabs with a sliding underline, details grid, indigo checkboxes, slim progress bar.
- **Settings:** a split row with an isometric stack drawing as its empty state.
- **Not found / project not found:** a drawing with a broken connector ending in a red point, "ERR 404", and two pill buttons.
- **Docs:** added `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

Every route, `data-testid`, ARIA attribute and test-visible text is unchanged.

**What I couldn't apply**
- **No commits:** git wasn't among the allowed commands, so nothing is committed. The spec's one-commit-per-screen rollback isn't in place.
- **No 2x review:** the snap tool only captures at 1x, so the spec's 2x close-up check and its pixel measurements weren't done.
- **Elements with nowhere to go:** this app has nothing that actually runs or streams, and no products, posts or landing page. So the lit stage, running glyphs, shimmer, live indicators, spec plates and section openers are built but not placed anywhere.

**Decisions I made myself**
- **Column order:** the pinned column has to be last, so Status moved to the end of the projects table and Size to the end of the files table.
- **Pinned column scope:** its sticky edge and divider apply only between 640px and 768px, where the table scrolls sideways.
- **KPI layout:** the KPI cards are a grid whose top edge is the header's rule. The spec forbids two hairlines with nothing between them.
- **Avatar sizes:** 24px in the header and 20px in activity rows, instead of the spec's 16px, so two initials fit.
- **Status icons:** active uses the in-progress icon (amber), paused the paused ring (grey), done the filled check (green).
- **Chart:** October is the highlighted month. The KPI change dots are green when the change is an improvement; all four currently are.
- **Copy:**
  - I added short secondary sentences, computed from the data, to the page summaries.
  - The error pages each got a second button ("All projects" or "Go to overview").
  - Settings got a short header summary and empty-state text.
  - The "Active projects" header shortens to "Projects" on phones.