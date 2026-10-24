I've applied margin-notes@0.1.0-rc.2 to every screen. The final `node pigment-snap.mjs` run passes the build (which includes the typecheck), and nothing scrolls sideways. I looked through the screenshots at 1440px and 390px in light and dark and fixed what was wrong. I couldn't run the Playwright smoke tests because they aren't on your list of allowed commands. I kept every `data-testid`, route, label text, form field and ARIA attribute the tests rely on, but the tests haven't actually been run.

**What changed**
- **Tokens:** `design-system/tokens.css` is a copy of `dist/tokens.css`, imported by `src/styles/base.css`. The old variable names now point at the new tokens. Light and dark both work, following the system setting or a `data-theme` attribute, and animations are turned off when reduced motion is requested.
- **Fonts:** Geist, Geist Mono and Caveat, loaded from Google Fonts in `index.html`.
- **App shell:** the sidebar is now a header bar, because the spec puts fewer than 6 sections in a header. On mobile it shows the product name, an avatar-only user menu and a menu button that opens the nav as a sheet; Escape closes it. The header search moves into the page on mobile. The nav keeps `data-testid="sidebar-nav"`.
- **Overview:** watercolor bloom behind the header and a pencil note ("this month so far"). The KPI cards have mono uppercase labels and large sans numbers. The chart uses ink bars with mono labels, and the chart sits beside the activity list.
- **Projects table:** paper segmented control for the status filter, mono right-aligned numbers, and status badges with a dot and a word. On mobile, with 5 columns, each project becomes a stacked block (name, status, budget) with the sort keys as a strip of chips.
- **Team table and Files table:** they scroll inside their own frame on mobile.
- **Project detail:** object-size h1 with the status badge in the line below it, ink-underline tabs, key/value rows, and a custom checkbox.
- **Settings, Page not found, Project not found:** each is a page-level empty state with one tape strip, a bloom and a pencil note.
- **Docs:** `design-system/` holds `VERSION`, the tokens and `components.md`. `AGENTS.md` and `CLAUDE.md` contain the pointer line.

**What I couldn't apply**
- **Commits:** the spec asks for one commit per screen, but git isn't on your allowed list, so everything is uncommitted.
- **Status filter semantics:** the spec wants a radio group, but the tests check `aria-pressed`. I kept the toggle buttons and only changed their look.
- **Overview tape:** the spec puts tape on user-pinned cards, and the app has no pin feature, so there is none.
- **Serif word:** no title qualifies ("Overview" is one word), so I didn't load Instrument Serif.
- **Old spacing and heading-size variables:** `--space-1…8` and `--font-size-h1/h2` couldn't be kept as aliases. The new tokens use the same names with different values (`--space-4` was 16px and is now 4px), so I removed the old ones.
- **Not checked visually:** the Tasks and Files tabs, Settings and the not-found pages aren't in the screenshot set. I styled them but haven't seen them rendered.

**Decisions I made myself**
- **"All projects" heading:** on the Projects page it would repeat the h1, which the spec forbids. I kept the text but made it visible to screen readers only.
- **Filter field height:** the filter input is 40px rather than the toolbar's 32px, so it matches the segmented control in the same row.
- **Table frame edge:** it's a 1px hairline border rather than the inset shadow, so the row hover colour can't paint over the edge.
- **Mobile projects records:** owner and due date are dropped from the blocks, and you can't sort by owner on mobile.
- **Table padding:** the outer cells have 20px side padding instead of 12px.
- **Empty-state pencil note:** hidden below 1200px wide, where it would overlap the panel.
- **Header band height:** I kept the recipe's 320px minimum, which leaves generous space above the KPI cards on desktop.