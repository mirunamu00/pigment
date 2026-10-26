I've applied morning-shapes@0.1.0-rc.5 to every page: Home, both captured articles, About, and the two not-found pages. The build passes, all 9 smoke tests pass, and the last full screenshot run (1440px and 390px, light and dark) shows no page scrolling sideways. I checked every page, plus the search-empty and error states. The temporary test changes are reverted.

**What changed**
- **Tokens:** `tokens.css` is imported straight from the package, not retyped. The old variables in `src/styles/base.css` now point at the new tokens, so nothing that used them breaks. Dark mode follows the system setting. Figtree and DM Mono load from Google Fonts.
- **Signature pieces:** each one is a reusable piece.
  - Styles are in `src/styles/signature.css`; components are in `src/design/`.
  - That covers the color bands with curved edges, the flat shapes, the breathing icons, the pill buttons and the animated hero preview card ("vignette").
  - All motion stops under reduced motion, and the breathing icons pause when off screen.
- **Area colors:** Home is yellow and About is blue. Topics are Engineering green, Design orange, Writing violet, Process pink and Remote work blue. A post takes the color of its first tag.
- **Home:** yellow hero band with a curved bottom edge, the animated preview card, scattered shapes, one blue "Subscribe" pill and a white "Read featured" pill. The featured card and post cards are cream with no borders. Each post gets a cover picture in its topic color, all different (blocks, flag, parcel, bell…). Tag filters are pills, and the selected one is dark with a white dot. The no-results state shows a magnifier and a "Clear filters" pill.
- **Articles:** a header band in the post's color, holding the title, details, tags and a small picture of the post's subject. The text column is 780px, and the "On this page" list sits on a cream panel. Quotes, code and figures are restyled, and related posts use the same cards.
- **About:** blue header band with a notebook picture, a pencil icon beside "Why we write", and author cards with initials on colored discs.
- **Footer:** cream band with a curved top holding the newsletter form, then a dark bottom bar.
- **Not-found pages:** cream band with the spec's error picture and a dark pill back home.
- I also added `design-system/` (version, tokens, `components.md`) and `AGENTS.md` / `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What I couldn't apply**
- **One commit per screen:** I made no commits, because the rules for this run say to commit only when asked. Everything is in the working tree.
- **Fade-ins further down the page:** they are added by script when you scroll to them. The full-page screenshots never scroll, and the hero preview card is caught mid-animation in them. I confirmed it renders fully with the animation briefly turned off.
- **Four colors per screen:** Home shows all five topic colors at once, one more than the spec allows.
- **Footer bottom bar:** it has no round icon buttons, because the site has no social links.
- **Fonts:** the Korean fallback font isn't loaded as a web font; it's only listed in the font list.

**Decisions I made**
- I treated Home as the front page (hero and preview card) and About as an area of its own, rather than a cream "utility" page.
- Remote work uses blue instead of yellow, so no topic matches the yellow home hero.
- Authors take the color of their main topic.
- Article figures have no real image, so I drew a flat shape picture instead of the grey box.
- With only two nav links, phones keep them in the top bar instead of a menu.
- I removed the outlined logo icon; the name "Field Notes" is now the logo.
- I added a "Read on" footer link list (Home, About) and an on-band "Read posts" pill on About.
- In dark mode, the color dots on the violet article band and in its "On this page" list are low-contrast. They're decoration only and every label is still readable, so I left them.