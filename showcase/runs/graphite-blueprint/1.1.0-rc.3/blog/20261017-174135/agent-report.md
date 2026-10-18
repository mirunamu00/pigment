I've restyled every screen of the Field Notes blog to Graphite Blueprint 1.1.0-rc.3, in light and dark. The build passes, all 9 smoke tests pass, and the final screenshots (all pages, 1440px and 390px, light and dark) show no sideways scroll.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's tokens, imported by `src/styles/base.css`. Inter (variable) and Geist Mono are self-hosted from npm font packages, with no font CDN. Light and dark follow the device setting; there was no theme switch to keep.
- **Signature elements, built as reusable pieces:** the recipes are typed in `src/design/recipes.ts`, the React parts are in `src/components/design/`, and the recipe CSS is in `src/styles/signatures.css`. I checked each piece on its own, larger, on a temporary route, then removed the route.
- **Every screen:**
  - **Header and footer:** sticky blurred header with pill nav and one inverse "Subscribe" pill. The newsletter is now the closing section on every page: a large two-tone statement over the dot field, a one-column form with an error banner, and the cursor moves to the field on a failed submit.
  - **Home:** split masthead; the featured post as a wide spec plate beside its text, with no card around it; then a "More posts" section with a split opener, a pill search, filter chips, a mono count and a grid of post cards with spec plates. The no-results state uses the 48px empty dot glyph.
  - **Article:** breadcrumb, large title, mono dates, the article's image placeholders as numbered spec plates, a contents list that marks the current section, and an opener before "Related posts".
  - **About:** masthead; three captioned blueprints (a stack, a connected pair and a box); a grid of author cards.
  - **Not found (any bad URL or post):** a broken-connector blueprint on a quiet stage, "ERR 404", a heading and two pills.
- **Kept:** every route, behavior, label text, form field, `data-testid` and accessibility attribute. Nothing under `design-packages/` or `tests/` changed. I also added `design-system/VERSION`, `components.md`, `AGENTS.md` and `CLAUDE.md`.
- **Blueprint sizes:** the three About drawings render at about 273px wide at 1440px and about 318px at 390px. I worked these out from the CSS rather than measuring them in the browser.

**What I couldn't apply**
- **No commits:** the spec wants one commit per screen, but git wasn't among the commands I was allowed to run. All changes are uncommitted in the working tree.
- **Not used:** the shimmer, live-edge and pulse pieces, and the running glyph loops. The blog never runs any real work, and the spec only allows them while something is running. They're built and ready.
- **No lit stage:** no screen gets one, because the blog row of the spec doesn't call for it; the only stage is the quiet one on the 404 screen.
- **Two alerts on a failed submit:** the spec requires a banner with `role="alert"`, and the existing field error already had `role="alert"`, which I had to keep. Screen readers will announce both.
- **Old CSS variables dropped, not aliased:** their names (`--space-2`, `--font-size-h1`, …) clash with the new tokens' meanings, and I rewrote all the CSS at once, so nothing still uses them.
- **Closing statement on mobile:** at 390px it runs past the spec's two-line limit, because the spec also sets its minimum size at 48px.
- **No update date:** the spec doesn't give one, so `VERSION` records the version number only.

**Decisions I made myself**
- **Mobile nav:** Home and About stay as inline pills at 390px instead of a menu sheet, since two items fit.
- **Header link:** the "Subscribe" pill jumps to the newsletter at the bottom of the page.
- **Newsletter copy:** the original sentence pair is split. "One email when a new post goes up." continues the heading in grey, and "Never more than twice a month." became the hint under the email field.
- **Post plates:** captions follow the `NO. 01 · DESIGN` pattern, numbered by each post's position in the list. Article figures get their "FIG 01" label from CSS, so the tested caption text is unchanged.
- **New copy:** I wrote the short opener descriptions and the three blueprint captions on About.
- **"One animated drawing per screen":** I read this as one *looping* drawing. On About, the stack also lifts once when it scrolls into view, as the spec's landing-page motion suggests.