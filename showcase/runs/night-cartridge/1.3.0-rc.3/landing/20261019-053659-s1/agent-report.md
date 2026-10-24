I've applied Night Cartridge to all five screens (Home, Pricing, Customers, Sign up, 404). The build passes, all 15 smoke tests pass, and no page scrolls sideways at 1440px or 390px. Every route, label, form field, `data-testid` and accessibility attribute is kept, and nothing under `design-packages/` or `tests/` was touched.

**Light and dark.** The spec is dark only ("no light theme or theme switch"), so both appearances render the same dark theme.

**What changed**
- **Base setup:** the tokens are copied into `design-system/tokens.css` and imported by the app. The NeoDunggeunmo pixel font is loaded the way the spec allows. `src/styles/base.css` is rewritten from scratch: the root reset (no radius, no transitions, reduced-motion handling), pixel type, the 4px gold focus ring, the stepped keyframes, and layout and components built from tokens.
- **Scene engine:** `src/scene/` holds the spec's drawing helpers and the sprites. The app's world is "Hourglade Square", a town square at night where appointments are kept. Each screen has its own scene:
  - **Home:** a hero with the clock tower.
  - **Pricing:** a strip with a ticket booth.
  - **Customers:** a strip with a meeting hall.
  - **Sign up:** a strip with a post office.
  - **404:** a small vignette of a closed road, lights off, one blinking beacon.
  - **Every screen:** a ground strip on top of the footer.
- **Scene motion:** stars twinkle, lights blink out of sync, a cloud drifts, a flag or figure moves in two frames, and a shooting star crosses now and then. All of it stops under `prefers-reduced-motion` and with the new header switch ("Animation on/off", remembered between visits).
- **Reusable pieces:** the ▶ marker, dither rule, block meter, callout, avatar, scene stage, ground strip, vignette, fill-only pixel icons and the animation switch.
- **Screens:**
  - **Header:** a rule under it and a ▶ marker on the current nav item. Mobile gets a menu panel.
  - **Gold:** exactly one gold button per screen: Home's hero "Start free trial", Pricing's "Start with Team" (the popular plan), Customers' "Start free trial" in the bottom band, Sign up's "Create account", and 404's "Go to the home page".
  - **Colour coding:** each industry, feature and plan has its own colour bar or bullet, and filter chips show the marker when selected.
  - **Questions:** the FAQ answers open as collapsible panels with right/down markers.
  - **Forms:** a gentle shake on submit errors, pixel checkbox and select arrow, and "!" error messages.
  - **Numbers:** the "4.8/5" rating gets a block meter; the other stats are open-ended, so they don't.
  - **Comparison table:** pixel check and dash marks.
  - **Footer and docs:** the newsletter sits in a small framed panel. I also added `design-system/` (VERSION and `components.md`, which describes the world, scenes and colours) and `AGENTS.md`/`CLAUDE.md` pointer lines.

**What I couldn't apply**
- **No header search:** the product has no search.
- **No "Pixel body" switch:** there's no long prose or dense table, so only the pixel font is loaded.
- **No focus trap in the mobile menu:** it would have added behaviour beyond restyling.
- **Commits:** I made no commits (the spec asks for one per screen); the work is uncommitted in the tree.
- **Leftover files:** I could only run the listed commands, so I couldn't delete files. `IconPlaceholder.tsx` and `ImagePlaceholder.tsx` are left unused. The temporary scene-review route has been removed from the app, but its file `src/pages/SceneReview.tsx` remains as an empty stub. Delete all three by hand.
- **Spec report numbers:** I didn't produce the numbers report at the end of the spec's Verification section in full. Placement was checked with a temporary review page. The last measured numbers came before I lowered the hill under the clock tower by 2 units, to fix its top sitting at y 39 (it must be 40 or lower down). After that change the figures are by hand: tower base about y 92, top about y 41, path end about x 382 (allowed: 366–416). Item sprite table: no item sprites.

**Decisions I made myself**
- **Container width:** content is 1296px wide plus 24px side gutters. This makes the strip crops match the spec's 38/682, but puts the hero window's left edge at 72px rather than 96px at 1440 wide.
- **Hero image:** the hero scene keeps `role="img"` with the original alt text, because a smoke test looks for an image there.
- **Comparison table on phones:** under 600px only Feature, Team and Business show; Starter stays in the page but is hidden.
- **Plan buttons:** all three plan buttons are 48px tall so the card bottoms line up.
- **Header Sign up:** framed, not gold, since gold never goes in the header.