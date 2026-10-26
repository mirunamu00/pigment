Morning Shapes is applied to every screen: Home, both articles, About, page not found and post not found, in light and dark at 1440px and 390px. The build passes, all 9 smoke tests pass, and the last snapshot run reported no sideways scrolling. I removed the temporary inspection route before finishing. No routes, labels, form fields, `data-testid`s or accessibility attributes were changed, and `design-packages/` and `tests/` are untouched.

**What changed**
- **Tokens and fonts:** the spec's `tokens.css` is copied into `design-system/tokens.css` and imported first. Dark mode follows the system setting, and `data-theme` on the root forces either mode. The old CSS variable names still work as aliases. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Signature pieces** (`src/components/art/`, styles in `src/styles/morning.css`):
  - colour bands with curved edges: hanging, rising, and a soft wave for the night band;
  - the shape kit with shaded discs, sparkles and clouds, plus 12 original pictograms of this blog's own subjects;
  - post covers, the header-band art, confetti, crescent-disc avatars and the error drawing;
  - three slowly animating icons, each on its own timing, paused off-screen;
  - every pill and circle button style, and the filter pills (selected = dark pill with a white dot);
  - the hero preview card with its staged build-in, and a fade-in on first view.

  All of the motion stops under reduced-motion.
- **Top bar and footer:** a sticky white top bar that gets a shadow after scrolling, with a coloured dot on the current link. The footer is a cream band with a curved top edge holding the signup form, a link column, and a dark bottom bar with a back-to-top button.
- **Home:** a yellow hero with the headline, a blue "Read featured" and a white "Meet the authors" button, and the preview card. Below it: a split featured card, confetti around "More posts", a rounded search box, filter pills, a grid of cards with covers, and a yellow no-results panel with a magnifier drawing. The page ends with a dark navy closing band and a very large "Subscribe" button.
- **Article:** a yellow header band holding the breadcrumb, title, meta and tags, with art based on the post's subject. The table of contents is a cream panel, the reading text is 20px, quotes are cream cards, ordered lists have numbered circles, and figures are coloured covers instead of grey boxes.
- **About:** a blue header band with an open-book drawing, an animated icon by "Why we write", and author cards with initials on coloured discs.
- **Error pages:** a cream band with a curved top edge, the stone-and-lavender disc with a rain cloud, and a dark "home" button.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md` pointers.

**What I couldn't apply or verify**
- **Hero preview card in screenshots:** it builds in over about 2.75s (the spec's timings), so the home screenshots catch it before it appears. I checked its finished state on a temporary route and it renders correctly.
- **Category colours:** two areas plus five tags need seven colours but the spec has six, so the Process tag shares blue with the About area. On the home page more than four category colours show at once, which is over the spec's limit for product screens. I treated Home as the front page.
- **Cream next to cream:** the error band and the footer are both cream. White space separates them.
- **Article header band:** it is 272px tall, slightly over the 200–260px guide, because the breadcrumb, two-line title, meta and tags set its height.
- **Commits:** I made none. The spec asks for one commit per screen, but nothing was committed without your go-ahead.

**Decisions I made**
- **Colour map:** Posts/Home is yellow and About is blue. Tags: engineering green, design violet, writing orange, process blue, remote work pink. A post's cover takes its first tag's colour.
- **Phone top bar:** the two nav links fit on a phone, so they stay inline rather than moving into a menu.
- **Top-bar button:** I left out the optional button so the home page doesn't repeat "Subscribe" a third time.
- **Footer subscribe button:** it is dark, as the footer section of the spec says, even though signup counts as the kind of conversion the spec otherwise marks with blue.
- **Additions:** the closing band, the footer link column, the back-to-top button and the hero buttons are new. They link to existing pages or to the signup form (`#newsletter`).
- **Fonts:** they load from Google's servers. If a test machine has no network, the font requests could fail and break the "no console errors" smoke test; it passes here.