Felt-tip Market 0.1.0-rc.4 is applied to every screen of the blog. The build passes, all 9 smoke tests pass and no page scrolls sideways. I checked the final screenshots of Home, both article pages, About and the 404 at 1440px and 390px, in light and dark.

**What changed**
- **Tokens:** `design-system/tokens.css` is a copy of the package's `tokens.css`, loaded first in `src/main.tsx`. The project's old variable names in `base.css` now point at the new tokens, so nothing that used them broke. Space Grotesk and JetBrains Mono load from Google Fonts. Light and dark both work, following the system setting or a `data-theme` attribute.
- **Reusable signature pieces** (`src/styles/felt-tip.css`, `src/components/`, `src/stickers/`):
  - Buttons and cards lift on a hard shadow when hovered and slam flat when pressed.
  - The plate stack (lemon and red plates behind the main button) fans out on hover.
  - The hero pairs the main button with an input at the same height.
  - Poster bands come in hero and header versions, with dark-mode overrides so everything on a band keeps its light look.
  - White ink-framed boxes, ruled lists and pills are shared pieces.
  - The notched pink price flag is used only to mark the featured post as "New".
  - A sticker builder draws each object as one thick solid. The kit has 17 original drawings of blog objects, plus a "thanks" word badge.
  - Posts without images get a drawn picture on a band-colour ground.
  - Scroll drift and the rocking loading animation stop under reduced motion, and lifts switch instantly.
- **Areas and colours:** Home and its articles are lemon, About is periwinkle, and the error pages are marigold.
- **Screens:**
  - **Home:** a lemon hero with "Field Notes" at 96px, five stickers, and the "Start reading" button beside the post search. Below it are the featured card and the post grid with pill filters. When a search finds nothing, a dashed box shows a blank-page drawing.
  - **Articles:** a lemon header band with breadcrumb, title, meta and tags. Article figures are drawings, the table of contents is an ink box, and related posts show as cards.
  - **About:** a periwinkle band with one sticker, and the authors in one ruled box.
  - **404 and missing post:** a full-height marigold band with two stickers and the main recovery button.
  - **Every page:** a black footer with the newsletter form. Its pink button joins the input, errors show a red "!" disc, and success shows a white panel with the badge.
  - **Header:** pill navigation with the current page filled, a menu button below 1024px, and a "Subscribe" link at the right edge that jumps to the footer form.
- **Docs:** `design-system/VERSION` and `design-system/components.md` list which colour goes with which area, the sticker subjects and where each piece is used. `AGENTS.md` and `CLAUDE.md` point to it.

**What I couldn't apply**
- **No commits:** git wasn't on the list of commands I could run, so all changes are uncommitted rather than one commit per screen.
- **Temporary preview page:** for the same reason I couldn't delete the file I used to screenshot the empty and success states on their own. Its route is removed, but `src/pages/PreviewPage.tsx` is still there as an empty file. Please delete it.
- **Unused pieces:** the app has nothing that needs a loading state, a table, a dialog, a toast, split bands or the pink closing band. The styles exist where they apply, but no screen uses them yet.
- **Font loading:** the fonts come from Google Fonts. The tests passed online, but an offline run could log a failed font request as a console error.

**What I decided myself**
- **Search moved into the hero:** the post search now sits beside "Start reading", because the hero needs a button-and-input pair. Its "Search posts" label is visually hidden, and the search still filters the grid below. "Start reading" is a new link to the featured post.
- **Labels kept with small additions:** the newsletter button still reads "Subscribe", with a hidden "→" added. The header "Subscribe" link and the footer link list are new.
- **Article layout:** the header band had to sit inside the `<article>` element, because a test looks for the title there.
- **Picture size:** I made the drawn pictures on cards 66% of the box width instead of the recipe's 58%. At 58% the object only covers about 50% of the box, short of the spec's 55–70%.
- **Unspecified styles I chose:**
  - Article headings use the 30px and 20px sizes in the medium weight.
  - Quotes are white ink boxes.
  - Tag chips each get their own band colour.
  - Avatars are ink-outlined circles.
  - The "Home" pill isn't highlighted on article pages; the router only marks it on `/`.