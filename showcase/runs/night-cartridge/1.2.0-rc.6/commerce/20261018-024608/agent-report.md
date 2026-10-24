Night Cartridge is applied to every screen. The build passes, all 10 smoke tests pass, and the last screenshot run found no page scrolling sideways at 1440px or 390px. I compared every screenshot with the spec, including mobile. The app is now dark only, so the "light" and "dark" screenshots are the same.

**Two things you need to know first**
- **No commits.** The spec says one commit per screen, but `git` wasn't in your list of allowed commands. Everything is uncommitted in the working tree.
- **One file to delete.** I used a temporary review route to look at the art up close and measure it. The route is removed, but I can't delete files with the allowed commands, so `src/pages/ReviewPage.tsx` is now an empty, unused module. Please delete it.

**What changed**
- **Tokens, fonts and root setup:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. The pixel font loads from the spec's CDN link. The root rules are in place (no transitions or rounding, motion stops under reduced motion), plus the 4px gold focus outline and the bevelled ▶ marker.
- **Reusable pieces** (`src/components/Pixel.tsx`): marker, pixel icons, dither rule, window, block meter, callout, scene window with title block, vignette and footer ground strip. The Animation on/off switch is in the header; it is saved between visits and set before the page draws.
- **Art** (`src/art/`): a market-street world built from the spec's helpers, sprite builders for every prop, and all scenes:
  - a strip on the shop grid with the shop as lead
  - a different strip on the cart, led by a parcel depot
  - its own banner for each of the 11 products
  - four small scenes for the empty and not-found states
  - the ground strip in the footer
- **Product images:** each of the 11 products is drawn as a sprite 20–21 units wide, filling 42–48% of its picture frame at 1440px and at 390px.
- **Screens:**
  - **Header:** a dithered rule underneath, the ▶ marker on the current nav item, and a menu button with a focus-trapped menu below 1024px.
  - **Shop grid:** filter chips with category colours, a custom checkbox, a sort select with a ▼ marker, and a block meter next to the result count. Cards have a colour bar on top and a marker beside the title on hover.
  - **Product detail:** the product's banner with its title block, a picture panel as tall as the purchase column, a 48px price, square radios, ◀ ▶ quantity steppers, the gold Add to cart, a success callout after adding, and a ruled Details heading.
  - **Cart:** totals in a window with a free-shipping meter, the checkout form in a window with the gold Place order, and a nudge plus "!" icon on fields with errors.
  - **Not found:** a scene with its lights off and one red beacon, the message in a window, and a gold "Back to the shop".
- All routes, label text, form fields, `data-testid`s and accessibility attributes are unchanged. `design-system/VERSION`, `components.md`, `AGENTS.md` and `CLAUDE.md` are added.

**What I couldn't apply**
- **Every product scene having its own lead:** each category shares one kind of building, and products within a category differ by roof shape, sign word, layout, colours, mirroring and sky. They are not 11 separate subjects.
- **Hand-typed details:** some texture comes from the drawing code rather than hand-typed dots. The hand-typed counts still exceed the minimums: about 98–99 per banner and 68–70 per strip.
- **Ridge heights:** I adjusted the generated ridge heights so no single flat colour band exceeds the spec's height limit; the raw ranges otherwise conflict.
- **Lead heights:** the two leads with the twin roof are 50 units tall (100px). That meets the minimum (48 units, 96px) but is below the 52–60 the spec aims for.

**Decisions I made myself**
- The header has no search button (the app has no search) and no Pixel body switch (no long text or dense tables).
- Category colours: Bags cyan, Apparel violet, Kitchen blue, Accessories amber. Each product sprite uses its category's colour.
- The order confirmation sits inside the cart's scene window. The 48px cart total drops to 32px on mobile.
- The cart link stays visible on mobile next to the menu button. The address box now shows 4 rows (the spec's minimum).

The full number tables the spec asks for are not written out here. Ask for them and I'll reconstruct them; I can recreate the review route if you want them re-measured. What I have: sprites 20–21 visible units; strips with lead 23 units (46px) and crop-edge gaps 78/160 and 160/78; banners with leads of 50–57 units (100–114px) and every tall tree or lamp clearing the far ridge by 4 units.