Halfpenny has been redesigned in margin-notes across every page. The final `node pigment-snap.mjs` run built cleanly and reported no sideways scroll on any page. I reviewed the screenshots of all five capture routes, light and dark, at 1440px and 390px. Two things are not fully checked:
- **Mobile up close:** the long mobile pages (front page, story, listings) come out scaled down so far in the PNGs that I could only check their overall layout. I did read the Section page at mobile size properly, and confirmed the mobile Listings page fits 390px by measuring it.
- **Interaction states:** I couldn't screenshot the scripted states in `pigment.app.json` (menu open, newsletter error/success, no-results, yearly billing, link copied). The tool only takes routes, so those are checked in the code only.

Every route, feature, piece of copy, `data-testid` and ARIA attribute is kept, and every photo stays with its story.

**What changed**
- **Foundation:** the old Newsreader/Inter fonts are replaced by Geist, Geist Mono, Instrument Serif italic and Caveat. Tokens are imported straight from the package through `design-system/tokens.css`, so no values were retyped. `src/styles.css` is rewritten from scratch on the system's colour tokens; old variable names are kept as aliases. The red brand accent is now ink, including the logo mark and favicon. Dark mode follows the system setting through `tokens.css`.
- **Shared pieces:** the watercolour filters sit once at the app root. The bloom, tape, pencil note and serif word (with the brush-stroke swash) live in `src/components/Studio.tsx`. A small `useScrollStrip` hook fades the edge of the filter chips when they scroll on mobile.
- **Header:** one 72px row (60px on mobile) with the name, the six section links, a search field and Subscribe. Below 1200px the links and search move into a menu sheet that closes with Escape. Icons are now 1.5px outlines at 16/20px.
- **Front page:** a bloom header where "hour" in the lead headline is set in the serif with the swash, and a pencil note reads "a month of Fridays". Below it come the hero photo with the Latest rail (64px thumbnails), the section columns, Most read and long reads, and a row of same-height listing cards. The photo essay is a pinned card with two strips of tape, and the newsletter sits in a plain card.
- **Section:** bloom header with a pencil note on the intro; the featured story is a pinned card with tape; ink filter chips; a sidebar of cards.
- **Listings:** bloom header with "Calder" in the serif; filter chips plus a real switch for "picks only"; events in framed lists with times in mono; the no-results message is an inline empty state.
- **About:** "city" in the serif; stat cards; the billing choice is a segmented control; the Member plan is pinned with tape; contact details are key/value rows.
- **Story:** smaller article-size headline with its last word in the serif, breadcrumb, a share row whose Save button turns ink when pressed, and the hero photo. A new "On this page" list sits in the right rail from 1200px and as a closed dropdown below that. The first pull-quote is set in the serif.
- **Search, info pages, 404, footer:** restyled to match.
- **Newsletter forms:** the label is now visible everywhere. Errors show an alert icon and move focus to the field. Success shows as a green badge with a check.
- **Docs:** I added `design-system/` (`VERSION` and `components.md`, including where each studio detail goes per screen), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Version date:** the package has no update date, so `VERSION` uses today's adoption date.
- **One commit per screen:** the project isn't a git repository, so that step and the spec's rollback plan don't apply.
- **Theme toggle:** none added. The spec makes it optional, and dark mode already follows the system setting.

**Decisions I made**
- **Utility strip:** the date/issue line, tagline and "This weekend / Newsletters / Sign in" links are kept as a thin strip above the header rather than dropped. The tagline shows from 1200px, the links from 860px.
- **Front-page headline:** the lead story's headline stays the page's h1 and carries the home bloom. Note text was chosen to restate what's already on the page ("a month of Fridays", "checked by our desk", and one per section such as "we pay the bill").
- **Serif word on story pages:** it's automatically the last word of the title, which I treated as an "editorial title". About gets one too.
- **Story teasers:** left unboxed (a framed photo plus text) instead of cards, which suits a magazine better.
- **Article text:** stays at the spec's 15px, capped at 68 characters wide to keep line length readable.
- **Newsletter errors:** for this single-field form I skipped the "fields need attention" banner and kept the inline message with focus moved to the field.
- **Chip scrolling:** the selected chip is brought into view by setting the strip's scroll position, not `scrollIntoView`, so the page itself doesn't jump.
- **Billing toggle:** it keeps its existing `aria-pressed` buttons rather than switching to the spec's radio-group markup, so the accessibility attributes stay unchanged.
- **Mobile action bar:** not added. Subscribe stays in the mobile header as its one action.