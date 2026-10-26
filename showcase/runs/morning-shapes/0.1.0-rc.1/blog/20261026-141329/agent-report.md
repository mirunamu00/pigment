Morning Shapes is now applied to every screen. The build passes, all 9 smoke tests pass, and nothing scrolls sideways. I checked the screenshots of every page at 1440px and 390px in light and dark, plus both not-found pages and a temporary kit page, which I've since removed.

**What changed**
- **Tokens:** `tokens.css` is copied unedited into `src/styles/`. Dark mode follows the system setting, and a `data-theme` attribute can force light or dark. The old CSS variables in `base.css` still work; they now point at the new tokens.
- **Signature pieces:** shared styles are in `src/styles/morning-shapes.css`, and the reusable React parts are in `src/components/ms/`:
  - Color bands with curved edges: a full curve under the home hero, a smaller one on page header bands, and a rising curve on the footer and error bands. Plus contained color panels.
  - The flat shape kit: crescent-shaded discs, two-color discs, sparkles, clouds, 7 pictogram plates, item covers, confetti, the hero art and the error art.
  - Six breathing glyphs plus the pop-dots loader. They pause when off-screen and stop under reduced motion.
  - Every pill style, filter tabs with the dot, and circle buttons.
  - The product vignette, and a fade-in on first view that works without script.
- **Screens:**
  - **Home:** yellow hero with a blue "Subscribe" and a white "Browse posts" pill. The featured card shows a vignette of its own post on a pink panel. "More posts" opens with confetti, and the search field is a pill with an icon. Post cards are cream, with a cover in the post's category color. The empty state is a yellow panel with a glyph and an ink pill.
  - **Article:** yellow header band holding the breadcrumb, title, meta, tags and shapes. Article body type at 20px, cream table of contents, quote and code blocks. The figure became a flat illustration in the post's category color.
  - **About:** blue header band, picture plates beside each section, and author avatars as initials on crescent discs.
  - **Not found (page and post):** cream band with the cloud-and-disc error art and an ink pill home.
  - **Every page:** sticky white top bar that gets its shadow after 8px of scroll, a colored dot on the current nav link, and a cream footer with the newsletter form and links over a dark bottom bar.
- Every route, label, form field, `data-testid` and accessibility attribute is kept. I added `design-system/` (VERSION, tokens, `components.md`) and the one-line pointer in new `AGENTS.md` and `CLAUDE.md` files.

**What I couldn't apply**
- **One commit per screen:** git isn't one of the commands I'm allowed to run, so all changes are uncommitted on `main`.
- **Pop-dots loader, skeletons, toast and dialog:** the app has no loading, toasts or dialogs. The loader is built and was checked on the kit page, but nothing uses it.
- **Fade-ins in the screenshots:** the snapshot tool takes full-page shots without scrolling. Confetti and anything else below the first screen hasn't faded in yet, and the vignette was caught mid-build. In a real browser they appear as you scroll. The same pieces show correctly where they start on screen.
- **Hue limits:** Home can show up to five category colors at once (the spec says at most four), because the blog has five tags. On phones, the bottom of the hero and the featured vignette panel can be on screen together.

**Decisions I made**
- **Area colors:** Home and articles are yellow, About is blue, error pages are cream. Tags have their own colors: engineering blue, writing green, process orange, remote work violet, design pink. A post's first tag colors its cover, figure and vignette.
- **Additions:** I added two hero links ("Subscribe" jumps to the newsletter, "Browse posts" to the list), a "Read" link column in the footer, and a "Back to top" circle. The outline document icon by the brand name was removed, since the spec doesn't allow outline icons.
- **Fonts:** Figtree and DM Mono are bundled with the app through two new `@fontsource` packages in `package.json`, rather than loaded from Google Fonts. Fonts loaded over the network can fail to load and log a console error, which would break the smoke test that checks for console errors.
- **VERSION date:** the spec states no update date, so `VERSION` records the date it was applied, 2026-10-26.