I built the Parcel & Pour roastery site on Felt-tip Market. The final run of `node pigment-snap.mjs` built cleanly and found no sideways scrolling. I looked at the screenshots for both pages at 1440 and 390, light and dark, and fixed what was off. Two things are not verified: the real fonts were never loaded (see below), and I didn't separately test the motion with reduced motion turned on.

**Pages** (both listed in `pigment.app.json`)
- **`/` Home:**
  - **Hero:** a lemon hero band with a 96px headline. Beneath it, the plate-stack "Pick a plan" button sits next to an email field for a free sample, both 60px tall. Five stickers drift as you scroll: a bag, a mug, a parcel, a bean and a roast-date tag. Phones show four of them.
  - **How it works:** a strip of scrolling tasting-note chips, then a white intro with a ruled three-step box. Two checkerboard bands follow: teal with a drawn "next delivery" mockup, and marigold with a "fresh" word badge.
  - **The rest:** this month's three coffees, each with its own drawing (peach, apple, chocolate). Then three speech-bubble testimonials with one highlighted phrase each, a white FAQ list with plus signs, a pink closing band and the black footer.
- **`/plans`:**
  - **Picking a plan:** a periwinkle header band with breadcrumb, title and one sticker (a pour-over dripper). Three selectable plan cards follow, each with a price flag; the selected one gets the pink border and check. A "Your box" panel sets delivery frequency and grind and shows the total per delivery in a flag.
  - **The rest:** a comparison table that scrolls sideways on phones with the first column fixed, a marigold band about what every plan includes with a calendar sticker, and the footer.
- **Setup:** the tokens are copied unchanged into `design-system/tokens.css`. The sticker kit is in `src/kit/Sticker.tsx` and is built with the spec's recipe. `design-system/` also has `VERSION` and `components.md`, and I added `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **Fonts:** I added the Google Fonts link for Space Grotesk and JetBrains Mono, but with no network access they don't load. All screenshots therefore show the fallback system font.
- **Pink in three roles:** the footer's pink arrow button and the pink focus ring on inputs appear on every page. To stay within three pink uses, I left price flags off the home page and left the pink closing band off Plans. On Plans, the selected-card border, the flags and the footer arrow still add up to three, plus the focus ring when an input is focused.
- **Pink buttons in dark mode:** the spec turns black buttons pink in dark. On Plans that means three pink buttons (Subscribe, Continue and the footer arrow) against a limit of two. I followed the dark-mode rule.

**Decisions I made myself**
- **Brand and content:** the brand name, the copy, the prices (£14, £26 and £48 per delivery) and the delivery dates are invented.
- **Plans "Continue" button:** it is black, not the pink the spec gives to form submits, to save pink.
- **Small details:** the bubble shape of the testimonials, using a mockup instead of a sticker cluster on the teal band, and checkmark discs that follow the text colour so they don't turn pink in dark mode.
- **VERSION date:** the spec gives no update date, so `VERSION` uses 2026-10-24, the capture date in the package manifest.
- **Unknown paths:** any unknown address shows the home page; I didn't build a separate 404 page.
- **Unused kit pieces:** the loading sticker and the image-placeholder box are built but not used on either page.