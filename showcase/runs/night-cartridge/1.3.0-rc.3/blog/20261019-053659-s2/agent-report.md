I couldn't commit: git isn't in the commands I'm allowed to run here, so the changes are uncommitted in the working tree.The whole app is restyled in Night Cartridge, but nothing is committed: git isn't one of the commands I'm allowed to run, so all changes are sitting uncommitted in the working tree. The build passes, all 9 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I looked at every screenshot and compared it with the spec, mobile included. The spec is dark-only, so the "light" and "dark" screenshots are the same, and I removed the old light theme.

**What changed**
- **Tokens and type:** the token file is copied to `design-system/tokens.css`. The four font links the spec allows are in `index.html`. The root block, pixel type and the Animation and Pixel body header switches (saved per viewer in `src/prefs.ts`) are in place.
- **Signature pieces:** the spec's art helpers are ported to `src/art/pixel.ts`, with a small sprite builder that adds the light top-left edge, shaded bottom-right edge and 1-unit outline. The art is in `src/art/sprites.ts` and `src/art/scenes.ts`, and the reusable React pieces are in `src/components/pixel.tsx`. All the scene motion (twinkle, blink, cloud drift, smoke frames, a rare shooting star, the beacon, the nudge on a form error, the meter fill) uses stepped animation and stops under reduced motion or when the Animation switch is off.
- **The scenes:** the app's world is "Press Row", a newspaper printing street at night, written up in `design-system/components.md`.
  - Home has the hero, led by a print house with a sawtooth roof, a rotary press behind its window and an INK sign.
  - Every article shares one banner, led by a newsstand with a NEWS sign.
  - About has its own banner, led by a post office with a clock and a POST sign.
  - The empty search result and the not-found screen each have a small framed scene (the not-found one has its lamps out and one beacon).
  - The three article images are drawn as inline scenes that match their captions.
  - Every screen has the grass ground strip at the top of the footer.
- **Screens:** every screen has the header with its dithered rule and the ▶ marker, plus a mobile menu.
  - **Home:** hue-coded cards and filter chips, and a search field with a magnifier and a "/" shortcut.
  - **Article:** headings over dithered rules, a framed code window with a Copy button, the quote as a callout, the contents list (current-section marker and progress meter), and ◀ ▶ previous/next links.
  - **About:** author cards with pixel avatars.
  - **Newsletter:** a 2px-framed panel with the gold Subscribe button.
- `design-system/` (VERSION, tokens, components.md) and the pointer line in `AGENTS.md` and `CLAUDE.md` are added. Every route, label, `data-testid` and accessibility attribute is kept.

**Spec report**
1. **Sprite table:** no item sprites. No item uses a picture window.
2. **Variants:** the tall poplar (x 216 on home, 140 on articles) and the short one (334 on articles, 259 on about) differ by 5 units in height and in crown width. No sprite appears twice in one scene.
3. **Scene numbers** (computed by the scene code and read off a temporary review page, which I've removed):

| Scene | Details | Lights | Lead (height) | Gaps left to right | Verticals, units above far ridge |
|---|---|---|---|---|---|
| Home hero | 121 | 8 | print house, x 304–369, 47 units (188px), base y 96 | 28, 142, 2, 4, 16, −10, 2, −3, 24, 4 | poplar 216–225: 11; mast 372–380: 23 |
| Article banner | 82 | 6 | newsstand, x 252–303, 57 units (114px), base 114 | 3, 3, 72, 2, 2, 10, 136, 2, 4 | poplar 140–149: 19; short poplar 334–343: 6 |
| About banner | 76 | 6 | post office, x 412–473, 57 units (114px), base 114 | 3, 109, 3, 6, 107, 2, −4, 32 | short poplar 259–268: 8; mast 538–546: 7 |

   - The hero's path ends at 309 + 2×(128−96) + 2 = 375, inside the required 366–416.
   - Each small framed scene has 16 details, each article image 35.
   - Fixes from review: two trees and a mast didn't clear the far ridge by the 4 units the spec asks, so I moved them; the hero was one detail short; and the mobile-only header buttons were showing on desktop.

**What I couldn't apply**
- The spec's accessibility scan (axe) wasn't run, because it isn't one of the permitted commands.
- Dates stay as "September 28, 2026" instead of `YYYY.MM.DD`, because the smoke tests check that exact text.
- Code blocks have no syntax colouring.
- The snapshot tool didn't produce screenshots for the newsletter-error, newsletter-success, search-empty and keyboard-focus states listed in `pigment.app.json`. Those states are covered only by the smoke tests passing.

**Decisions I made**
- Subscribe is the one gold button on every screen, since it's the only real commit. The hero's "Browse all posts" and the not-found link are framed buttons, and not-found has no gold "Retry" because there's nothing to retry.
- The header search is a framed button (with "/") that focuses the home page's search, since the blog has no other search.
- On desktop the hero scene is pinned to the content's left edge instead of centred. At 1440px it looks the same, but on narrower desktops no prop ends up under the title window.
- The contents list's "On this page" title is 16px, not the 32px the spec gives section headings, because it's navigation in a 200px column.
- Each article image picks its scene from keywords in its alt text.