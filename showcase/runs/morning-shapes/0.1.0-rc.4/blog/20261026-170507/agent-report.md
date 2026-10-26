Morning Shapes is now applied to every screen: Home, both articles, About, and the 404 / missing-post pages. The build passes, all 9 smoke tests pass, and the last screenshot run (1440px and 390px, light and dark) found no page that scrolls sideways. Every route, label, form field, `data-testid` and accessibility attribute is kept. The temporary route I added to look at the "no results" panel has been removed.

**What I changed**
- **Tokens and fonts:** `tokens.css` is imported straight from the design package, so no values were retyped. The project's old CSS variable names still work and now point at the new tokens. Dark mode follows the system setting. Figtree and DM Mono are bundled with the app through two npm font packages (`@fontsource/figtree`, `@fontsource/dm-mono`), so nothing loads from the web at runtime.
- **Reusable signature pieces** (`src/components/shapes/`, `src/styles/morning-shapes.css`):
  - color bands with curved edges, plus rounded panels;
  - the flat shape kit (shaded discs and blocks, sparkles, clouds, round plates, scattered "confetti" shapes, item covers);
  - slowly "breathing" glyphs that pause when off-screen;
  - every pill and circle button style, filter pills, tags, and the small product preview cards;
  - a fade-in helper. All looping motion stops under reduced motion.
- **Each screen:**
  - **Home:** yellow hero band with a blue "Subscribe" and a white "Read featured" button, a small preview of the reading experience, shapes around it and around the "More posts" heading. Search is a rounded field, the tag filters are pills, and posts are cream cards, each with a cover picture of its subject. "No results" is a yellow panel with a picture and a "Clear filters" button.
  - **Article:** a compact yellow band holding the breadcrumb, title, details and tags, with a picture of the post's subject. Quotes, code and the contents list sit in cream boxes, list bullets are yellow dots, and the in-article figure became a cover picture.
  - **About:** a blue band with an open-book picture, small round illustrations beside each section title, and author initials on colored discs.
  - **Error pages:** a cream band with the system's error picture and a "Go to the home page" / "Back to all posts" button.
  - **Footer (all pages):** cream band with a curved top, the newsletter signup and a short link column, then a dark bottom bar with a back-to-top button.
- I also added `design-system/` (`VERSION` and `components.md`) and one-line `AGENTS.md` / `CLAUDE.md` pointers.

**What I could not apply**
- **One commit per screen:** git isn't one of the commands I was allowed to run, so all changes are uncommitted.
- **Title case:** post titles stay in title case because the tests check them word for word.
- **Hue limits:** the Home list shows all five tag colors at once, more than the four the spec allows in one view. On phones, the pink featured cover can share the first screen with the yellow hero, so two large colored areas are visible together.
- **Hero preview in screenshots:** the second and third preview cards appear part-way through their fade-in, because the snapshot is taken while the animation is still running.

**Decisions I made myself**
- **Colors:** Home and all articles are yellow and About is blue. The five tags take blue, pink, orange, green and violet.
- **Nav dot:** Home keeps its yellow dot on article pages. This is visual only; the `aria-current` attribute is unchanged.
- **Mobile header:** I kept the two nav links in the top bar rather than building a menu button.
- **Other additions:** a "Pick a topic…" line under "More posts", the footer link column, the back-to-top button, the "Meet the authors" button, and one breathing glyph by the newsletter heading.
- **Shorter mobile breadcrumb:** on phones the current page's title in the breadcrumb is cut to one line with "…".
- **Left out:** a closing call-to-action band with a very large button, and a blue button in the top bar.