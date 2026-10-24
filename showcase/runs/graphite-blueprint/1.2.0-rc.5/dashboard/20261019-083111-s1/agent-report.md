I've applied Graphite Blueprint 1.2.0-rc.5 to every screen. The build passes, all 10 smoke tests pass, no page scrolls sideways, and I checked the screenshots of every page at 1440px and 390px in light and dark. Light and dark follow the device setting, since the app has no theme switch.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. The app's old CSS variables now point to the new tokens. Inter and Geist Mono are self-hosted from npm font packages; I added the two packages to `package.json` and ran `npm install`.
- **Signature pieces:** each recipe is ported to `src/design/signature.ts` with React wrappers in `src/components/Signature.tsx`: the stage, the dot glyph and dot meter, the blueprints, the spec plate and the screen head. The shimmer and live-edge styles are in `base.css`. All motion stops under reduced motion.
- **Shell:** a 240px sidebar with icons and a mono "WORKSPACE" label. Below 1024px it becomes text-only nav pills that wrap. The top bar is sticky and blurred, with a search pill and a ghost user-menu button.
- **Overview:** the chart is redrawn as dot columns on a quiet stage, and its panel ends level with the activity panel. The metric cards have mono labels and a 6px status dot. While metrics refresh, a running dot glyph sits in the Refresh button and the cards show static grey bars.
- **Projects and Team tables:** mono column heads, sort chevron only on the sorted column, status shown as a 14px icon plus word, mono dates. Under 640px only the first column and the status (or "Active projects") column show. The empty state has a 48px dot glyph, a "NO RESULTS" label, a two-tone sentence and the "Clear filters" pill.
- **Project detail:** the client name as a mono label over the project name, a status badge, and text tabs with a sliding underline. The overview tab has a spec plate on a quiet stage ("FIG 01 · PROJECT"); the tasks tab uses the indigo checkboxes.
- **Settings, Not found and Project not found:** Settings shows an empty state with a blueprint stack. Both not-found pages show the error state: a broken-connector blueprint on a quiet stage, "ERR 404", a heading and two pills.
- **Docs:** `design-system/` now holds `VERSION`, the tokens and `components.md`, and I added `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I could not apply**
- **Commits:** the spec asks for one commit per screen, but git isn't among the commands you allowed, so everything is uncommitted.
- **Refresh delay:** the spec forbids artificial delays to show a working state, but the 1.5-second delay is existing behaviour that the smoke tests rely on, so I kept it.
- **Signature 5 (shimmer, live edge, pulse):** the styles exist but nothing uses them, because nothing in the app streams or runs as a job.
- **Page close and section openers:** none of these screens is a content page or ends in a final action, so they don't apply.
- **"Active projects" column head:** the spec wants a one-word head on the column kept visible on phones, but I kept "Active projects" to preserve the label text.
- **Content before JavaScript loads:** the app is a client-rendered React app, so nothing shows until its script runs.

**Decisions I made**
- **Text changes:**
  - The empty-filter message became one two-tone sentence, which adds a period after "No projects match your filters".
  - On project detail, the line under the name now reads "Owned by … Due …". The client name moved to the mono label above the name.
  - "Not found" gained a second "All projects" pill, because the error state calls for two.
  - Every `data-testid`, route and tested label is unchanged.
- **Status icons:** "Active" uses the in-progress icon, "Paused" the ring with two bars, "Done" the filled check.
- **Metric dots:** I added a short list in `OverviewPage` naming the metrics where a lower number is good, so their change dot shows green when they fall.
- **Pinned column:** its sticky position and dividing line apply only below 768px, where the table can scroll. On desktop that would have put a vertical rule in the middle of the projects table.
- **Small choices:**
  - The header avatar is 24px, between the spec's row and profile sizes.
  - Not-found pages put the text left and the stage right, to keep one left edge.
  - `VERSION` uses 2026-10-17, the package's capture date, since the spec gives no update date.
  - The Inter package registers as "Inter Variable", so I put that name first in the font stack.

**Measured:** the pinned column's head and cells end at the same x (370 at 390px). The blueprint figure fills 91% of its drawing at both 1440px and 390px; the spec asks for at least 85%. The temporary review route and test hook I used for checking are removed.