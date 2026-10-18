I've applied Graphite Blueprint 1.1.0-rc.6 to all four routes and the not-found states, in light and dark. The build passes, all 9 smoke tests pass, and the final snapshot run reports no sideways scroll at 1440px or 390px. I compared every screenshot, mobile and dark included, with the spec.

**Two things to finish by hand:**
- **Delete `src/pages/ReviewPage.tsx`.** It was the temporary page for reviewing the signature pieces. Its route is already removed, but deleting a file needs a command outside the five I was allowed to run, so the unused file is still there.
- **Nothing is committed.** Git wasn't on the allowed list either, so the spec's one-commit-per-screen rollback plan wasn't followed.

**What changed**
- **Tokens and fonts:** an exact copy of `tokens.css` is in `design-system/`. The old variable names in `src/styles/base.css` now point at the new tokens. Inter and Geist Mono are served from npm packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), with no font CDN.
- **Signature pieces:** built as reusable parts in `src/design/`, using the spec's recipes unchanged. Their CSS is in `src/styles/signature.css`. All motion stops under reduced motion.
- **Home:** title block with a two-tone lead. The featured post is a wide figure with text beside it, not a card. "More posts" opens with a split heading, then a pill search, filter chips, an uppercase mono result count, and a grid of post cards with figures.
- **Article:** breadcrumb, title, meta, then a wide lead figure. The contents list is a sticky right rail from 1024px. Narrower, it's a closed fold-out after the figure that marks the current section. The inline image has a "FIG 1" label, and the caption text is unchanged. Related posts get the same heading and grid.
- **About:** the "Why we write" text, then a new "How a post ships" section with three captioned blueprint drawings (stack, moving connected pair, box), then an authors grid.
- **Not found:** a broken-connector drawing on a quiet stage, "ERR 404", a heading and two buttons.
- **Newsletter:** "New post? Your inbox." on a dot background, with an error banner and the done-to-check mark on success. A failed submit now moves focus to the email field.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and the pointer line is in `AGENTS.md` and `CLAUDE.md`.

Every route, test id, label, heading id and accessibility attribute is unchanged.

**Parts of the spec I couldn't apply**
- **Working shimmer and live edges:** built but not placed. Nothing in the blog runs in the background, and the spec forbids faking it.
- **Lit product stage:** not used. There's no landing hero and no product interface to show. Only the quiet stage on error pages is used.
- **Post titles stay in title case**, against the sentence-case rule, because the tests check the exact text.
- **The spec gives no update date**, so `VERSION` says so.
- **Some spec measurements weren't taken:** I didn't measure positions with `getBoundingClientRect()`, test with emulated reduced motion, or tab through screens. The screenshots only cover the light/dark and desktop/mobile settings.

**Decisions I made**
- **Header:** I added a "Subscribe" button that links to the newsletter. Both nav items stay visible at 390px, so there's no menu sheet.
- **Newsletter buttons:** the closing calls for two buttons, so I used Subscribe and "Read the latest". The long newsletter copy moved into the field's helper line.
- **Error banner:** it has no `role="alert"`, because the existing field error already has one and two would announce the failure twice.
- **About page:** I added the "How a post ships" section and wrote its copy, plus the descriptions beside each section heading.
- **Small screens:** the dot background behind the newsletter is hidden there, because it would sit under text.
- **Touch targets:** buttons and nav items grow to 44px on touch devices.