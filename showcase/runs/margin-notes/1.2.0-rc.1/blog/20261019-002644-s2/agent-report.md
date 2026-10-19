The blog is now restyled to margin-notes@1.2.0-rc.1. The build and typecheck pass, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I checked the final screenshots of every page in light and dark at both widths; two things are still open (see the end).

**What I changed**
- **Tokens:** `src/styles/tokens.css` is an exact copy of the package's tokens file. `base.css` was rewritten to use only those tokens, with the old variable names mapped onto them. Old spacing names like `--space-4` meant different sizes and collided with the new ones, so I dropped them.
- **Fonts:** loaded from Google Fonts in `index.html`.
- **Root:** the shared filter SVG renders once in `Layout`. Sideways overflow is clipped on `html` and `body`, there is one global focus ring, and all motion stops under `prefers-reduced-motion: reduce`.
- **Reusable pieces:**
  - `src/components/studio.tsx`: bloom, tape, pencil note and serif word with its swash.
  - `Toast.tsx`: ink toast, gone after 5s, hover pauses it, Escape closes it.
  - `EmptyPage.tsx`, `icons.tsx` and a hook for the scrolling chip strip.
- **Home:** watercolor bloom in the header, "Field *Notes*" with the swash, a pencil note beside the lead, and the featured post as a pinned card with two tape strips. Below that: a 40px search field, ink chips (on mobile they scroll in their own strip with faded edges), a 3/2/1-column grid of clickable cards, and a plain empty state.
- **Article:** smaller object h1 with one serif word (the last word of the title) and one serif pull-quote. The table of contents is a right rail from 1200px and a closed "On this page" disclosure below that. Also restyled: code block, image placeholder frame and related-post cards.
- **About:** plain page with author cards and no studio details.
- **404 and unknown post:** pinned panel with tape, a small bloom and a pencil note on the button.
- **Newsletter:** error message with an icon below the field, which also gets focus. Success shows as a green badge plus a toast.
- **Docs:** `design-system/` with `VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Geist Mono doesn't load:** code and eyebrows fall back to Courier even after splitting the font request. Geist, Instrument Serif and Caveat do load. I couldn't find the cause with the commands I'm allowed to run.
- **No commits:** the spec asks for one commit per screen, but git wasn't among the allowed commands, so everything is uncommitted.
- **Leftover temporary file:** I couldn't delete files either. `src/pages/TempStates.tsx` was a temporary review page; its route is removed and it's now an empty stub, so please delete it.
- **Not used:** there's no mobile action bar (no screen has a page-level primary action) and no theme toggle (dark follows the system setting). Also no "fields need attention" callout, since the form has a single field.

**Decisions I made myself**
- I treated About as a detail page, so it gets no studio details.
- I treated not-found as a page-level empty state. Its h1 sits above the panel and the panel has no second title, so it doesn't repeat the h1.
- The article's serif word is always the last word of the title.
- Article text is capped at 70 characters per line (within the 720px column).
- In dark mode the pinned card's surface is the same color as the tag badges, so badges on that card get a thin outline.
- The success message is long for a badge, so that badge wraps and has slightly rounder corners.
- The toast text "Subscribed to the newsletter" is new copy; no existing text was changed.
- `design-system/` points to `src/styles/tokens.css` rather than keeping a second copy. `VERSION` uses 2026-10-12, the package's capture date, because the spec states no update date.