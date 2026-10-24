Night Cartridge 1.2.0-rc.9 is now applied to every screen: the product grid, all 11 product detail pages, the cart, checkout errors, the order confirmation, the empty states and both not-found pages. The build and typecheck pass and all 10 smoke tests pass. A final `node pigment-snap.mjs` run reports no sideways scrolling at 1440px or 390px, and the screenshots I opened match the spec. I did not make any commits, because you didn't ask for them.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. The four font links come straight from the spec. The base stylesheet `src/styles/base.css` is rewritten and the old light look (rounded corners, soft shadows, transitions) is gone.
- **The world:** the scenes show a supply town's market lane at night. There are 13 buildings, each with its own 4-letter sign: the general store (SHOP) for the product grid, the post depot (POST) for the cart, and one trade shop per product (TOTE, PACK, TRIP, KNIT, TEES, COAT, MUGS, IRON, LOOM, KEYS, HATS). Around them are about 20 yard props.
- **Scenes by screen:**
  - Product grid: a strip scene.
  - Cart (including confirmation): a strip scene.
  - Each product page: its own banner scene.
  - Empty and error states: four separate small framed scenes.
  - Footer: the ground strip on every screen.
- **Motion:** stars twinkle, lights blink, a cloud drifts, smoke or wings swap between two frames, and a shooting light appears now and then. Meters fill block by block and invalid fields nudge on error. All of it stops under reduced motion and with the header Animation switch.
- **Reusable pieces:** `PixelStage`, `Vignette`, `GroundStrip`, `Marker`, `DitherRule`, `BlockMeter`, `Callout`, `Bullet`, the Animation and Pixel body header switches, and a pixel icon set.
- **Screens:**
  - Header and nav: sticky header with the dither rule and the blinking ▶ marker. Under 1024px the nav moves into a menu that keeps keyboard focus inside it.
  - Product grid: category chips with a colour bullet per category, a pixel checkbox and select, a block meter beside "Showing n products", and cards with a colour top bar and a pixel drawing of each product. All 11 drawings are 19–23 units wide and fill 44–49% of their frame at both widths.
  - Product detail: the picture stays in view while scrolling, there's one gold "Add to cart", and Previous/Next product links at the bottom.
  - Cart and checkout: the totals sit in a framed window with a free-shipping meter, and the checkout form has a gold "Place order" and error messages with a "!" icon.
- `design-system/` now has `VERSION` and `components.md` (the world, scenes per screen, category colours, decisions). `AGENTS.md` and `CLAUDE.md` point to it.

All routes, test ids, label text, form fields and accessibility attributes are kept. I added `role="alert"` to the three checkout error messages. The temporary review routes I used to check the art are removed.

**What I couldn't apply**
- **Light mode:** the spec is dark only, so the light screenshots look the same as the dark ones.
- **One commit per screen:** not done, since you hadn't asked for commits.
- **Full scene report:** I only checked the numbers (counts, gaps, heights) for the two strips, one banner (KNIT) and the product drawings. The other 10 banners were laid out with the same rules and approximate widths, but I didn't measure each one. Their props' x positions and the 60+ hand-placed details per banner are in `src/art/scenes.ts`.
- **Hard rules not met:**
  - The key ring's ring is only 6 units across, as the spec requires, so it can't also have the required 4×3 opening inside.
  - The tea towels have no hanging loop, because a loop would break the same 6-unit limit.
- **Scene rules I didn't fully follow:**
  - The far-ridge sizes depend on random seeds and weren't checked one by one.
  - The wool mill's skylight strips are 1 unit wide, so they don't count as lights.
- **Axe:** not run, because it isn't one of the commands I was allowed to use.

**Decisions I made**
- **No search button:** the store has no search feature, so I didn't add a fake one.
- **Error screens:** the gold button keeps its existing label, "Back to the shop", instead of "Retry".
- **Quantity steppers:** they now show ◀ ▶ instead of − / +; their accessible names are unchanged.
- **Cart "Remove":** it's a normal framed button, because removing isn't confirmed in a dialog.
- **Meters:**
  - Products shown out of 11.
  - The cart total toward the $100 free-shipping threshold.
- **Touch screens:** controls grow to 44px so rows stay level.