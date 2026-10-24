I've restyled the whole blog with graphite-blueprint 1.2.0-rc.1, in light and dark (it follows the device setting). The build and typecheck pass, all 9 smoke tests pass, and the final full screenshot run shows no page scrolling sideways at 1440px or 390px. The changes are **not committed**: the spec asks for one commit per screen, but the commit command needs approval this run doesn't allow. Everything is in the working tree, ready to commit.

## What changed
- **Foundation:** the spec's `tokens.css` is imported unchanged, and the old CSS variable names now point at the new tokens. Inter and Geist Mono are self-hosted from two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), with no font CDN. Global focus outline and the reduced-motion block are in place.
- **Signature pieces**, each built to its recipe as a reusable part in `src/components/signature/` (CSS in `src/styles/signature.css`): the spotlit stage, the dot glyph and dot meter, the isometric blueprints, the spec plates, the working shimmer and live edges (CSS only), and the split opener, masthead and two-tone text.
- **Header and footer:** sticky see-through header with pill nav. Home shows as current on article pages. A new "Subscribe" pill jumps to the footer newsletter. The newsletter form gets the error banner, moves focus to the field on a failed submit, and shows a small blueprint with the success message.
- **Home:** masthead, then the featured post with a "FEATURED" label and a wide plate. "More posts" opens with a split opener, then a pill search, filter chips, the post count as a mono label, and a hairline grid of cards with plates. The "no results" state uses the empty dot glyph.
- **Article:** breadcrumb, title, meta, then a wide lead plate. The contents list is a side rail that tracks your position from 1024px up; below that it sits after the plate in a closed disclosure. The image placeholder is a plate with a "FIG 1" caption. Related posts get an opener and the hairline grid.
- **About:** masthead, then "Why we write" with its text and a row of three captioned blueprints (stack, moving connected pair, box). The authors are in a hairline grid.
- **Not found and post not found:** a broken-connector blueprint on a quiet stage, "ERR 404", a heading and two buttons.
- **Docs:** `design-system/` (VERSION and `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

## Checks
- **Blueprint sizes:** each figure measures 273px wide at 1440px (the spec wants at least 240px, about 270px) and 318 of 350px at 390px (91%, the spec wants at least 85%).
- **Signature pieces on their own:** reviewed on a temporary review page in both themes; that route has been removed.

## What I couldn't apply
- **Running motion:** nothing in this app actually runs or streams, so no looping dot glyph or shimmer is shown; the spec only allows them while real work happens. Their motion and reduced-motion stop were checked only on the temporary review page. The only motion on real pages is the connector on the About page, which stops under reduced motion.
- **Lit stage:** there's no landing hero, so the stage only appears in its quiet form, in the error states.
- **Title case and length:** post titles are title case and the tests check them exactly, so they stay. Long titles take more than the two lines the spec allows at 390px.
- **Lift on the About blueprints:** I didn't add it. The spec allows one animated drawing per screen, and the moving connector already is.
- **Two-step review:** the spec asks to stop for review after one sample screen; this run was pre-approved, so I did all screens in one pass.

## Decisions I made
- **Tokens location:** they're imported from `design-packages/` rather than copied, so no value is retyped.
- **Newsletter heading:** a "NEWSLETTER" label instead of a "01 / 01" counter, since the form has only one step.
- **Error banner:** the existing error message keeps `role="alert"`, so the banner has no role, to avoid a second announcement.
- **Plate captions:** the post number plus its shortest tag, or the reading time when that would pass 18 characters ("NO. 07 · 1 MIN").
- **Two-tone leads:** the one-sentence leads are split at a comma, since there's no second sentence.
- **Image caption number:** the "FIG 1" label is drawn by CSS so the caption text the tests check stays exact.
- **Contents list:** it lives inside the article and is opened by script on wide screens, because it can only exist once on the page for the tests.
- **New copy:** opener descriptions, About blueprint captions, "About Field Notes" as the second button on error pages, and the header "Subscribe".