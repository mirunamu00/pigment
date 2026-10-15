I've applied Night Cartridge 1.1.0-rc.1 to every screen. The last `node pigment-snap.mjs` run built cleanly and reported no sideways scrolling. I opened the screenshots for home, the featured article (desktop and mobile), About and the not-found page; they match the spec. I also checked each scene against the recipe's numbers on a temporary review page, then removed its route. I could not run the Playwright smoke tests, because `npm run test:e2e` isn't on the list of commands I was allowed to run. I kept every route, label text, form field, `data-testid`, heading id and accessibility attribute, but please run the tests to confirm.

**What changed**
- **Tokens and fonts:** `tokens.css` is imported straight from `design-packages/` rather than copied, so values can't drift. The four font links from the spec are in `index.html`. The old light theme is gone and the app is dark only.
- **Reusable pieces** (in `src/pixel/` and `src/components/pixel/`):
  - The spec's scene helpers, plus prop sprites for a "post-office street" world: post office, townhouses, kiosk, tree, radio mast, mailbox, mail cart, notice board, phone box, bench.
  - Hand-placed scenes: a hero on home, a banner on each article (lit windows and moon vary by post), a different banner on About, a small vignette for the empty-search and not-found screens (the not-found one has its lamp off and a red beacon), a figure scene for article images, and the ground strip above the footer.
  - The ▶ marker, game windows, dithered rules, block meter, callout, pixel icons, avatars generated from author names, and the Animation and Pixel body header switches (both saved between visits).
- **All animation is stepped:** stars twinkle, lights blink out of sync, a cloud drifts, one sprite bobs, and a shooting star appears now and then. It all stops under reduced motion or when Animation is switched off.
- **Header:** sticky, with the dithered rule below and a blinking marker on the current nav item. Under 1024px the nav becomes a Menu button opening a menu window with focus trapping.
- **Home:** hero window with the 48px "Field Notes" title, featured card, filter chips with a colour bullet or the marker, search with a "/" keyboard hint, a block meter under "Showing n of 6 posts", and a card grid with a colour bar per tag.
- **Article:** title window over the banner; contents list marking the current heading as you scroll (a disclosure under 1024px); code in a window with a working Copy button; the quote as a callout; image placeholders as figure scenes; new previous/next post links.
- **About:** banner window, ruled headings, author cards with avatars.
- **Footer:** ground strip, then the newsletter panel. Subscribe is the only gold button on every screen; a failed submit nudges the field and moves focus to it.
- **Docs:** added `design-system/` (version file and `components.md`), and `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **Light appearance:** the spec defines dark only, so the "light" screenshots are dark too.
- **One commit per screen:** git isn't among the allowed commands, so nothing is committed.
- **Leftover file:** I couldn't delete files either. `src/pages/ReviewPage.tsx` is now an empty, unused stub you can delete.
- **Date format:** dates stay as "September 28, 2026" instead of `YYYY.MM.DD`, because the smoke tests check that exact text.
- **Header search:** the blog has no site-wide search, so the header has no search button.
- **Syntax colouring:** code blocks are not syntax-coloured.
- **"Retry" on not-found:** the spec puts a gold "Retry" there, but nothing can be retried. It has a framed "Go to the home page" link instead.

**What I decided myself**
- **Colour bands:** with the spec's ridge heights, the bands between ridges came out more than a quarter of the scene tall in one flat colour, which the spec forbids. I added a checkered "mist" ridge inside each band, which brought every column within the limit.
- **Pattern ids:** pattern ids in the scene helpers are prefixed per scene, so several scenes on one page don't clash.
- **Mobile crop:** on narrow screens the scene crop centres on the main group of buildings, so it stays in view at 390px.
- **Card grid:** cards use a 320px minimum width (3 columns at 1440px) instead of the spec's 200px, which gave 5 cramped columns. Card descriptions are cut at two lines, not one.
- **Gold button:** Subscribe is the one gold button on every screen; the hero's "Read the featured post" button is framed.
- **Colours per tag:** engineering cyan, design violet, writing blue, process amber, remote work green, and authors pink.
- **New text:** I added a few lines: the hero eyebrow and meta line, a "Required…" hint under the email field, About's meta line, and the previous/next labels.