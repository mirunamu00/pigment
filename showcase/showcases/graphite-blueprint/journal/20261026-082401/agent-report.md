I've redesigned the whole Halfpenny site in Graphite Blueprint, but my very last build failed. The error isn't in the code: esbuild couldn't read the `Temp` folder five levels above the project ("being used by another process"). It failed the same way three times, and I couldn't clear the lock myself.

**Verification so far:**
- Two earlier `node pigment-snap.mjs` runs built and passed. The first covered every captured route; the second covered `/`, `/events`, `/about`, `/section/food`, the long read, the 404 page and `/search`. Neither reported sideways scrolling.
- I made no source changes after the second run, only docs (`design-system/`, `CLAUDE.md`, `AGENTS.md`).
- `npm run typecheck` passes now.
- I looked at desktop light and dark, and mobile light and dark, for the front page, long read, section, listings, about and 404.
- Measured at 390px: the closing statement is 2 lines. In the About blueprint row, the one figure I measured renders at 273px (spec: about 270).
- Not done: the menu-open, filter, newsletter success/error and reduced-motion states weren't screenshotted, because the snap tool can't click or emulate reduced motion. No tests exist to run.

Run `npm run build` once the folder is free.

**What changed:**
- **Foundation:** the spec's tokens are copied into `src/tokens.css`, and light/dark follows the device. Inter and Geist Mono are self-hosted from two npm font packages I added to `package.json` (the spec forbids a font CDN), replacing the Google Fonts links. `src/styles.css` is rewritten using the spec's tokens only, with the old variable names kept as aliases.
- **Header:** sticky and translucent, with the name as text, the section links as pills, a search pill and the Subscribe pill. Under 1024px it collapses into the menu sheet. On a story, its section's link shows as current.
- **Shared pieces:** story cards sit in hairline grids with mono labels for section/kind and dates. Every content section opens with the split heading. Photos keep rounded corners with credit captions, and each photo stays with its story.
- **Front page:** a heading block (dateline, "The city, closely read", two-tone lead). The lead story is marked FEATURED. "This weekend" is now a real table. The newsletter is the page close, over the dot field.
- **Long read:** breadcrumb, title, byline and share pills, the lead photo, and a contents rail that tracks your position (a collapsed `<details>` on small screens). Review ratings show as a 5-dot meter.
- **Section page:** heading block, featured story, filter chips, a mono "SHOWING 6 OF 9 STORIES" count and a 2-column grid with the sidebar.
- **Listings:** switch-styled "picks only" toggle and an empty state with the dot glyph. "Submit an event" is the page close.
- **About:** three blueprint drawings for "How we work", metric cells, a team grid, plan cards with 1/2/3-slab stacks and a "Selected" badge, and segmented billing pills.
- **Search:** screen heading, search pill and empty-state glyph.
- **404:** the broken-connector drawing on a quiet stage, with two pills.
- **Other pages:** the footer-linked pages (newsletters, contact, terms, etc.) use numbered split sections.

**What I couldn't apply:**
- **Spec plates:** not used, because every story has its own photo.
- **Shimmer, live edges and running dot glyphs:** nothing in a magazine actually runs, and the spec forbids faking it.
- **Lit stage:** the spec ties it to product UI on landing pages. Here the main images are photos, so only the 404 page has a stage.

**Decisions I made:**
- **Moved header copy:** the topbar dateline ("Monday 26 October 2026 · Issue No. 48") and the tagline moved into the front-page heading, so other pages no longer show them. The coin logo became text, because the spec forbids a circular mark.
- **Front-page headings:** the h1 is now "The city, closely read". The lead story's title is an h2.
- **Rewritten closings:** "Four days of Calder, in your inbox every Thursday" became "Four days of Calder. In your inbox." I shortened it so it stays within 2 lines on a phone. "Running something?" became "Running something? Listings are free."
- **Added text:** I wrote one-line descriptions for section headings that had none, plus the labels "Listings desk", "No results" and "Selected".
- **Newsletter errors:** they show a "1 field needs attention" banner and move focus to the field. The banner has no `role="alert"`, because the existing message line already has one.
- **Kept behaviour:** all routes, `data-testid`s and ARIA attributes are kept. I added `role="switch"` to the picks toggle and `aria-pressed` to the search suggestion chips.
- **No closing on footer pages:** the newsletters page's main content is its form, so it gets no page close.