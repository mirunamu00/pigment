I've applied Graphite Blueprint to every screen in light and dark. The build and typecheck pass, all 10 smoke tests pass, and the final screenshots show nothing scrolling sideways at 1440px or 390px. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a byte-for-byte copy of the package file, and it follows the device's light or dark setting. The old CSS variable names now point at the new tokens. Inter and Geist Mono are self-hosted through two font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`); nothing loads from a CDN.
- **Signature pieces:** each is a reusable module in `src/signature/`, built to its recipe. They are the stage, the dot glyph and dot meter, the blueprint helpers, the spec plate and the screen head. The recipe CSS is in `src/styles/signature.css`, along with the reduced-motion block.
- **App shell:** a 240px sidebar with icon nav rows and a sticky blurred header with a pill search. The user menu opens with the scale-in motion. Below 1024px the sidebar becomes text-only nav pills that wrap.
- **Overview:** each screen opens with the mono-label, title and two-tone head. The metric cards have mono labels and a 6px status dot. The deployments chart sits on a quiet stage and is now drawn as dot columns, with the latest month highlighted and a staggered entry. While Refresh runs, a 12px scan glyph shows on the button and the metric cards show static bars.
- **Tables (projects and team):** hairline rows, mono headers, mono dates and right-aligned numbers. The sort chevron appears only on the sorted column, and status is a 14px icon plus a word. At 390px each table shows the first column and the pinned status (or count) column.
- **Project detail:** the client and owner sit as a mono label over the 32px name, with a status badge. The quiet stage holds the project's spec plate, captioned "FIG 01 · PROJECT". The tabs have a sliding underline, the tasks use the indigo checkbox, and the files table follows the same table pattern.
- **Empty and error states:** the empty filter result shows the dot glyph. Settings shows a blueprint stack. Both not-found pages show a broken-connector blueprint on a quiet stage with "ERR 404".
- **Docs:** I added `design-system/VERSION` and `components.md` (where each piece is used and my own decisions), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **One commit per screen:** you limited me to the npm and snap commands, so I made no commits and everything is left uncommitted.
- **Shimmer, live edge and pulse:** nothing in this app is streaming or running as a background job, so these are built but unused.
- **Two pills on the error page:** each not-found page has only one link, and I didn't invent a second action.
- **Update date:** the spec has none, so `VERSION` gives only the version.
- **Refresh delay:** the spec forbids artificial delays to show a working state. The 1.5s mock delay on Refresh is existing behaviour the tests depend on, so I kept it.
- **Detail page heights:** on the Overview tab, the bottom of the stage sits about 55px below the bottom of the tab content, slightly over the spec's 48px limit, because the stage has to be at least 240px tall. On the Tasks tab the two columns line up.
- **Interaction states I didn't screenshot:** the snap tool only takes plain pages, so I didn't capture the loading, open-menu or hover states. The smoke tests do exercise loading, the menu and the empty filter.

**What I decided myself**
- **Column order:** I moved Status to the last column of the projects table and Size to the last column of the files table, so the pinned column sits on the right edge as the table recipe expects.
- **Team table on phones:** the "Active projects" heading is hidden from sight but kept for screen readers, and the cells read "2 projects" instead.
- **Metric trend dots:** green for up, blue for down. The data gives a direction but not whether the change is good, so I avoided red.
- **Sizes:** avatars are 20px in table rows (16px can't fit two initials) and 24px in the header. Task rows are 40px with hairlines, like table rows.
- **Plate caption:** it reads "FIG 01 · PROJECT" because every attribute of a project already shows on that screen.
- **Settings page:** it is only a "coming soon" placeholder, so I gave it the full-screen empty state instead of the settings layout.

I added a temporary `/__review` route to check each signature piece on its own in both themes. That's where I found and fixed the error glyph tinting its unlit dots red. I then removed the route and its screenshots.