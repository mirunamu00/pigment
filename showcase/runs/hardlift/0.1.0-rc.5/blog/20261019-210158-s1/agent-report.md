Hardlift 0.1.0-rc.5 is applied to every screen. The build passes, all 9 smoke tests pass, and no page scrolls sideways at 390px or 1440px. I checked every page in light and dark, plus the 404 page, the "post not found" page and a temporary page showing the empty, error and success states (since removed).

**What changed**
- **Tokens:** `src/styles/tokens.css` is an exact copy of the package file. Dark mode follows the system setting, or `data-theme` on `<html>`. The old color names in `base.css` still work as aliases. DM Sans and JetBrains Mono load from Google Fonts with the fallbacks the spec lists.
- **Signature elements**, built as reusable pieces in `src/styles/hardlift.css` and a few components (`Sticker.tsx`, `StickerFigure.tsx`, `Band.tsx`, `ErrorState.tsx`, `primaryAction.ts`):
  - Buttons that lift on hover and leave a hard shadow, plus the hero button that lifts 8px off a plate.
  - Whole cards that lift on hover.
  - Full-width color bands behind page headers.
  - Pills for navigation, filters and the table of contents.
  - Sticker drawings, including hero shapes that drift as you scroll.
  
  All of this motion stops under reduced motion.
- **Home:** a yellow hero band with four sticker shapes and one pink button ("Read the featured post"). Below it: the featured post as a lifting card, a search field, pill tag filters, a 3/2/1-column grid of lifting cards, and an empty state with a band header, a magnifier sticker and an ink "Clear filters" button.
- **Article:** the yellow band holds the breadcrumb, title, meta and tags. The table of contents is a vertical pill list on desktop and a sideways-scrolling strip on mobile. Each of the three figures has its own sticker drawing; the drawing is chosen by a new `art` field in `posts.ts`. Related posts use the lifting cards.
- **About:** periwinkle band, a small speech-bubble sticker beside "Why we write", and outlined author cards.
- **404 and "post not found":** red band, a question-mark coin, one sentence and a pink return button.
- **Newsletter:** outlined input with the pink focus ring, an error line with an icon, and the success message as a confirmation card with the hard shadow.
- I also added `design-system/` (`VERSION`, `components.md`, `tokens.css`), `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but `git` isn't among the commands I was allowed to run, so everything is uncommitted.
- **Two files left to delete by hand,** since I couldn't run `rm`:
  - `src/pages/StatesPreview.tsx` is now an empty stub from the temporary review page.
  - `src/components/ImagePlaceholder.tsx` now just points to `StickerFigure`.
- **Hover lift not measured.** I didn't measure the hover lift in a browser; the snapshot tool only takes still screenshots.
- **No 4-column grid.** Post cards stop at 3 columns because they're text-heavy; the spec's 4-column grid is meant for product grids.
- **No mobile menu button.** With only two links, the header keeps its pills on mobile instead of a menu that opens a dialog.

**Decisions I made**
- **One pink action per screen.** On Home the hero button is the pink one, so the newsletter Subscribe button and "Clear filters" are ink there. A page with its own pink action tells the layout through `usePagePrimaryAction()`, and the newsletter steps down to ink. On articles and About, Subscribe is the pink action.
- **Band colors:** Home and articles share yellow, About is periwinkle, error pages are red. A page sets its color once, so it can't mix two band colors.
- **Article figures keep `role="img"` with their alt text.** The spec says to hide illustrations from screen readers, but the tests expect the figure as an image and readers need it.
- **Smaller details:**
  - The search field's end icon is decorative, because search filters as you type.
  - Content width is the narrow container (1152px).
  - h2 drops to 24px on mobile so it stays smaller than h1.
  - The newsletter success message stays inline rather than appearing as a fixed toast.