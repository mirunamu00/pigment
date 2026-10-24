I've applied Graphite Blueprint 1.1.0-rc.8 to every screen: Home, both articles, About, the not-found page and the post-not-found state. The build passes, all 9 smoke tests pass, and the last full screenshot run (1440px and 390px, light and dark) shows no page scrolling sideways. I couldn't commit anything, because git commands weren't on the allowed list. So the per-screen commits the spec's "Existing project" section asks for don't exist, and all changes are uncommitted in the working tree.

**What I changed**
- **Tokens and fonts:** the spec's `tokens.css` is copied to `design-system/tokens.css`, and light and dark follow the device setting. Inter and Geist Mono are self-hosted from npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), with no font CDN. The old CSS variable names are kept as aliases of the new tokens.
- **Signature elements:** each one is built from its recipe as a reusable piece (`src/design/recipes.ts`, `src/design/signature.tsx`, `src/styles/signature.css`). I also checked them on their own, enlarged, in light and dark, using a temporary route that I then removed.
- **Header and footer:** a sticky see-through header with the name as text, pill nav and one dark "Subscribe" pill. On articles, the Home pill shows as current. Every page ends with the newsletter as a closing block: "Fresh notes. By email." over a faint dot pattern, with two pills.
- **Newsletter form:** a failed submit now shows a "1 field needs attention" banner and moves focus to the email field. Success shows the all-lit dot glyph briefly, then a check.
- **Home:** a heading block with the featured post on a wide drawn placeholder, then a "More posts" section with search, filter chips, a mono result count and a grid of post cards, each with a drawn placeholder. The empty search shows the empty dot glyph.
- **Article:** breadcrumb, title, meta, a wide lead placeholder and in-body figures with no repeated drawings. Contents is a side rail that tracks your scroll position, or a closed "Contents" disclosure below 1024px. Related posts appear as a card grid.
- **About:** a heading block, two sections, and a row of three drawings (a stack that lifts once in view, a connected pair with a moving dashed line, and a single box). The authors are in a card grid.
- **Errors:** a broken-connector drawing on a quiet stage, "ERR 404", a heading and two pills.

Every route, label, form field, `data-testid` and accessibility attribute is preserved. Looping animation stops under reduced motion, and hover effects only apply with a mouse.

**What I couldn't apply**
- **Two-line titles:** the article titles are long and the tests check their exact text, so at 48px they run to three lines on desktop and more on phones, against the spec's two-line limit.
- **Shimmer, live edge and pulse dot:** they're built but not used, because nothing in this blog actually runs in the background and the spec forbids faking it.
- **Lit stage:** not used, since the spec's Blog row calls for drawn placeholders and section openers, not product screenshots.
- **Contents disclosure:** it doesn't animate open; it's a native `<details>`.
- **Update date:** the spec gives no update date, so `design-system/VERSION` says so.
- **Measurements:** I didn't paste the getBoundingClientRect measurements the spec's Verification section asks for. I can't run a browser script beyond the screenshot tool, so I checked widths and alignment by eye.
- **Error and empty states:** the screenshot tool can't capture the newsletter error, success or empty-search states. Those are covered by the smoke tests, not by screenshots.

**Decisions I made**
- **Placeholder captions:** they read "NO. 03 · 1,120 WORDS". The tag chips the tests rely on already show the category, so a word count avoids repeating it. I added a `wordCount` helper to `posts.ts`.
- **Mobile nav:** Home and About stay inline as pills at 390px instead of going into a menu sheet, since there are only two items.
- **Header pill:** "Subscribe" jumps to the newsletter.
- **Footer:** I added a small "Pages" link column.
- **Brand icon:** I removed the decorative icon next to the name, because the spec asks for the name as text.
- **Error banner:** it has no `role="alert"`. The field's error message keeps its existing alert, so screen readers don't hear the error twice.
- **New copy:** I wrote the second sentences of the Home and About intro text, the section descriptions, the closing statement and the second pill labels.
- **Figure numbers:** in-body figure numbers ("FIG 01") are drawn by CSS, so the tested caption text stays exact.
- **Contents rail:** to avoid rendering the list twice, it's switched between the side rail and the disclosure with a media query in script.

Also new are `design-system/components.md`, which records where each element is used, and `AGENTS.md` and `CLAUDE.md` with the pointer line the spec asks for.