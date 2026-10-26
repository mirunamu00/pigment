I built Corner Paper, an independent city-life magazine, on the Felt-tip Market design system. The build and typecheck pass and no page scrolls sideways. I reviewed the screenshots of all three pages at 1440px and 390px, light and dark, and they match the spec. Two things were checked by measuring rather than by eye: the 390px screenshots were too small to inspect closely, and I only measured the 390px hero, where all four stickers are clear of the text. I didn't measure the strip depth of each sticker on screen. I designed every sticker to the spec's ratio of about 13% of its size, and they look thick in the screenshots.

**Pages, all listed in `pigment.app.json`:**
- **`/` Front page:** a lemon hero band with a 96px headline and five original stickers (mug, record, ticket, key, lamp) that drift as you scroll, partly off the edges. I measured their positions at 1440px: none sits over the headline, lead or buttons, and each is at least 60% visible. Under the headline is the "Start reading" button on its yellow and red plates, next to a search field of the same height. Below that:
  - the lead story card;
  - "the latest, section by section": four columns, each with one card and two headline rows;
  - a weekend-listings band, split between black and periwinkle, with a die-cut "out" badge;
  - a pink closing band and the black footer with the email signup.
- **`/stories/the-last-bakers-of-canal-street` Long read:** a lemon (Food) header band with breadcrumb, title, summary and byline. Then a drawn figure, about 1,000 words of text with a highlighted pull quote, a side panel listing the four bakeries, and Copy link and Save buttons. It ends with the author panel, three related Food stories, a pink "Pitch us" band and the footer.
- **`/sections/neighbourhoods` Section page:** a marigold header band with the post box sticker cropped at the right edge, a search field and working filter tabs (arrow keys work). A wide featured card and a grid of six follow, with pink "New" labels. The "Maps" tab has no stories, so it shows the empty state: a dashed box with a folded-map sticker and one button.

**Also built:**
- **Other routes:** all four section pages and every story work (stories other than the long read show their summary and a short note). Unknown addresses get a full-screen 404 band.
- **Shared pieces:**
  - A loading state (one rocking sticker in a dashed box), used while the article and section pages load.
  - A full-screen mobile menu that closes with Escape and keeps keyboard focus inside it.
  - A skip link.
  - Footer email validation with an inline error.
- **Motion:** all of it stops under `prefers-reduced-motion: reduce`.
- **Design-system setup:**
  - `design-system/` holds `VERSION`, a copy of the tokens file and `components.md` (which section gets which band colour, the sticker list, and where each signature element is used).
  - `AGENTS.md` and `CLAUDE.md` point to that folder.

**What I couldn't fully apply:**
- **Fonts:** Space Grotesk and JetBrains Mono load from Google Fonts. The screenshots render in Space Grotesk, so the request worked here. Offline, the page falls back to the spec's system fonts.
- **Pink in dark mode:** the spec turns black buttons pink in dark. On the front page that makes three pink buttons (hero button, "Subscribe" in the top bar, footer arrow), one more than the limit of two.
- **Mobile header-band sticker:** at 390px it stays at the 120px minimum. That is shorter than the title plus summary, but making it bigger would squeeze the title column too much.
- **`VERSION` date:** the spec gives no update date, so I used 2026-10-24 from the package's `manifest.json`.

**Decisions I made myself:**
- **Section colours:** Food lemon, Design periwinkle, Music teal, Neighbourhoods marigold. The front page uses lemon, periwinkle and pink, the most a front page may have.
- **Pink kept to three uses per screen:** on the front page and article that's the focus ring, the footer's sign-up button and the closing band. The section page swaps the closing band for the "New" labels, so there are no labels on the front page.
- **Article title size:** set at 48px in the header band instead of the 30px bold "article title" style, because the spec also says a page title in a header band is 48px.
- **Top-bar buttons:** "Sunday letter" and "Subscribe" both jump to the footer signup, because there are no account pages.
- **Author avatar:** a dashed box with a pen icon, since there are no images.
- **Hero search:** it opens the first story that matches, or shows an inline "nothing matches" note.
- **Empty filter tabs:** I removed the ones from Food, Design and Music, so the only empty state is the map one, which shows the thing that's missing.
- **New sticker:** a guitar pick for the Music header, so no object repeats on the same page.