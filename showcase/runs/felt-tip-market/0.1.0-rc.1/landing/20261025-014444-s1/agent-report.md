Felt-tip Market is applied to every screen: home, pricing, customers, signup and the 404 page. The build passes, all 15 smoke tests pass, and the final screenshots at 1440px and 390px, light and dark, show no page scrolling sideways. I didn't commit anything because `git` isn't one of the commands I was allowed to run. So the spec's "one commit per screen" isn't done; everything is uncommitted in the working tree.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an unedited copy of the package's tokens file and loads first. The old CSS variable names in `src/styles/base.css` still work as aliases, so nothing broke. Dark mode follows the system setting. Space Grotesk and JetBrains Mono are bundled locally through two `@fontsource` packages.
- **Signature pieces, built once and reused:**
  - Lift-and-slam on every button and the header's sign-up block.
  - `PlateStack`, used once per screen: the home hero's "Start free trial" and the 404's "Go to the home page".
  - Poster bands, a checkerboard split band, a narrow title band, the pink closing band and the black footer with a white input and a pink arrow button.
  - Ink frames, ruled lists and pills, and the notched price flag on plan prices.
  - A sticker kit of six original drawings of the product's own nouns (time token, calendar page, hourglass, cup, invite slip, bell) and a "sent" word badge. Stickers drift with scrolling.
  - A logo marquee that pauses on hover.
  - Under reduced motion, all of this stops and the logo row wraps.
- **Area colors:** home hero lemon, "How it works" periwinkle, pricing teal, customers marigold, signup lemon, 404 periwinkle.
- **Screens:**
  - Home: 96px hero with six stickers and a drawn calendar mockup.
  - Pricing: teal band with token stickers, pill toggle, plan cards with flags, framed table with a sticky first column.
  - Customers: marigold band, speech-bubble quote with a marker highlight, filter pills, industry status pills.
  - Signup: lemon title band, one white form panel, styled select and checkbox, error discs, and the badge on success.
  - 404: full-height band with two stickers.
- `design-system/` now has `VERSION` and `components.md` (band map, sticker subjects, how to reuse each piece). I also added `AGENTS.md` and `CLAUDE.md` with the one-line pointer.
- All routes, labels, form fields, `data-testid`s and accessibility attributes are kept. Where I changed something visible: the menu toggle shows a two-line icon and "Subscribe" became an arrow button. In both cases "Menu"/"Close" and "Subscribe" stay as screen-reader text.

**What I couldn't fully apply**
- **Pink limit:** the spec caps pink at three roles per screen. The pink footer button plus the focus halo and closing band already use three on most pages. In dark mode the spec also turns black buttons pink, so the header "Sign up" and pricing's "Start with Team" become pink and can go one over. On pricing I made the Team button black (ink) instead of pink to stay within the limit in light mode.
- **Mobile menu:** it opens as a full panel and Escape closes it, but focus isn't trapped inside it.
- **Leftover file:** `src/pages/PreviewPage.tsx` is the temporary preview page. I removed its route, but I couldn't delete the file with the commands allowed, so please delete it.
- **Unused piece:** the loading sticker exists but isn't used, because the site has no loading states.

**Decisions I made myself**
- On pricing, the plan cards sit on paper below the teal band, not inside it.
- The "Compare plans" link in the pink closing band is a text link, because the spec allows only one button there.
- FAQ questions drop from 30px to 24px on phones.
- In the comparison table, "included" is a 20px check disc and "not included" a grey dash.
- Industry pills use band-colored dots.
- The "Popular" plan gets a lemon chip and a black (ink) button rather than a pink selected border.
- The home page shows two large headlines, the hero and the closing band, as their own recipes call for. That's one more than the spec's "one per screen" rule.