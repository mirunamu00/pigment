I've redesigned Kiln Street Coffee in Night Cartridge across every page. The final `node pigment-snap.mjs` run built cleanly (typecheck included) and reported no sideways scroll. I checked each page at 1440px and 390px, plus the bag drawer, the filtered shop, the mobile menu and the 404, using enlarged views.

**What changed**
- **Base:** the fonts are the spec's (Fraunces and Inter removed), and the tokens are copied to `design-system/tokens.css` and imported by the app. `styles.css` is rewritten from scratch: no radius, soft shadows, transitions or light theme. The spec is dark-only, so the light and dark screenshots are identical.
- **Pixel art:** I made one invented world, Kiln Street at night (an old cutlery works yard), written up in `design-system/components.md`. Each kind of screen has its own scene:
  - **Home:** a full-width hero; the roastery works is the lead, with a sawtooth roof, smoking stack, lit roaster window and bean sign.
  - **Coffee pages:** one shared banner with a roast bay as the lead.
  - **About:** a banner with the roastery bar.
  - **Shop, Subscribe and legal pages:** smaller strip scenes with a green-coffee store ("SACK" sign), a dispatch van and a postbox.
  - **Small framed scenes:** one for "no coffees match", and one on the 404 with lights off and a red warning light.
  - **Footer:** a grass strip with props on every page.
  
  Stars, lights, smoke, a drifting cloud and a rare shooting star all move in stepped frames. They stop under reduced motion and with the new "Animation" switch in the header.
- **Components:** gold is used once per page: the hero button, Add to bag, Continue to checkout, Checkout in the bag, and Shop coffee on the 404. The ▶ marker shows the current item in nav, tabs, chips and options and appears on card hover. Major regions are framed windows, and headings sit on a dotted rule.
  - Block meters show roast level, the free-delivery threshold, 9 of 14 producers and the 4.9/5 rating.
  - Each origin owns one colour, shown as a bar on its cards and a dot on its filter chip.
  - The FAQ is restyled as disclosures, quantities use framed ◀ ▶ steppers, and reviewers and team members get coloured initial squares.
  - The header gains two persisted switches, "Animation" and "Pixel body" (the latter swaps long text to a readable font).
- **Photos:** every photo sits in a 2px framed window, and each coffee keeps its own photo and gallery. Three photos that used to sit behind text moved: the hero photo already appears in the home photo strip, the Subscribe pour-over moved beside the subscription FAQ, and the 404 dark-beans photo sits next to the error window.
- All routes, copy, data, `data-testid`s and ARIA attributes are kept. The newsletter field also gets the spec's error shake, and focus moves to the field on error.

**What I couldn't apply**
- **No search button:** the product has no search, and I didn't add a control that does nothing.
- **Dates not reformatted:** the spec wants `YYYY.MM.DD`, but that would change copy ("3 March 2026", "Monday 26 October"), so I left them.
- **Mobile menu focus trap:** not added; Escape and the toggle still close the menu.
- **Scene numbers and the spec's report tables:** I placed everything from code constants and checked it visually at 2× and in place, but there was no way to run the spec's counting scripts. Counts are by hand and approximate: about 120+ detail entries in the hero, 60+ in each banner, 30+ in each strip. Leads are 46 units tall in the hero, 56 in the banners and 22–26 in the strips; banner leads are 112px against the spec's 96px minimum. There are no drawn item icons, because every coffee has a real photo.

**Decisions I made myself**
- Origins own the colours; roast groups use a neutral dot. Meters use the default green, because the warning tone looked gold.
- The bag stays a right-side drawer, styled as a framed window.
- Between 1024px and 1359px the header hides "Start a subscription", and below 1200px the two switches show icons only, so the nav fits.
- About page stat numbers are 32px rather than 48px, to fit three across.

**Clean-up for you:** I could only run the four commands you allowed, so I couldn't delete files. `src/pages/ArtReview.tsx` (my temporary review page) is now an empty stub with nothing importing it, and `src/components/Img.tsx` is no longer used. Both are safe to delete.