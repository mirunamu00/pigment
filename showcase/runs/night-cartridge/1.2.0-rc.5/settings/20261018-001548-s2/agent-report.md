The restyle is finished. The build passes, all 8 smoke tests pass, and the final screenshot run shows no page scrolling sideways at 1440px or 390px. I checked the screenshots of every page against the spec.

**Light vs dark:** the spec is dark only and forbids a light theme or theme switch. So the app is dark in both appearances, and `color-scheme: dark` is set.

## What I changed
- **Tokens and base:** `tokens.css` is copied unchanged into `design-system/` and imported once. I replaced the old `base.css` with the spec's root rules: the pixel font with smoothing off, the 4px gold focus ring, no rounded corners, no transitions, and reduced motion or the Animation switch freezing everything on frame 1. The spec's font links are in `index.html`.
- **Scene engine (`src/art/`):** the spec's recipe helpers, typed, plus a small drawing helper and 15 workshop-yard sprites.
- **One scene per screen:** each settings page gets its own strip with a different lead building. The not-found page gets a small dark-shed scene with one red beacon. Every screen has the ground strip at the bottom. Stars twinkle, lights blink out of step, a cloud drifts, one sprite swaps frames or bobs, and a bird or shooting light crosses every 14s.
- **Shared pieces:** the ▶ marker, framed windows, dithered rules, block meters, callout, avatars with initials on a colour picked from the name, pixel icons, and the "!" error line with the error nudge. The header has the dither rule and the Animation / Pixel body switches, saved between visits. Under 1024px those switches move into a menu that keeps focus until closed. The sidebar is a marker menu with a colour per section; under 1024px it becomes a top menu.
- **Screens:**
  - **Profile:** form in a titled window, with the photo block as a side panel.
  - **Notifications:** pixel switches with an On/Off word, and a 6-block meter under the "n of 6" count.
  - **Security:** password strength meter, a tips callout, and the sessions table showing only key columns on mobile.
  - **Billing:** plan cards with a colour bar and the current plan framed in gold, and dates as YYYY.MM.DD.
  - **Not found:** a window with the small scene and a link button.

  The page's main save button is the one gold button. On Billing the gold moves into the dialog. Every route, `data-testid`, label and aria attribute is unchanged.
- **Docs:** `design-system/` (`VERSION`, `tokens.css`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

## Report tables
- **Sprite table:** no item sprites. The app has no product images.
- **Variant table:** no variant repeats within a scene.

| variant | x positions | what differs |
|---|---|---|
| reel 14×14 | Profile 295 · Security 463 · Billing 228 · ground 150 | — |
| bench 20×14 | Profile 226 · Billing 446 | — |
| crates 12×14 | Profile 132 · Security 308 | — |
| panel 10×16 | Profile 147 · Security 482 | — |
| drill 8×18 | Profile 410 · Security 452 | — |
| generator 16×12 | Profile 424 · Security 254 | — |
| cylinders 9×15 | Notifications 411 · Billing 260 | — |
| drum 8×12 | Notifications 461 · Billing 245 | — |
| cart 12×14 | Notifications 255 · Billing 391 · ground 470 | — |
| screen 14×16 | Notifications 236 | — |
| booth 18×20 | ground 300 | — |

- **Per scene:**

| Scene | Lead and height | Gaps, left to right | Lights | Hand-placed details | Moving parts |
|---|---|---|---|---|---|
| Profile | saw-tooth hall, 24 | 3, 69, 6, 3, 101, 6 | 7 | about 60 | fan blades, bird |
| Notifications | switch house, 22 | 5, 145, 3, 4 | 4 | about 54 | vent fan, bird |
| Security | hoist loft, 26 | 5, 3, 133, 3, 5 | 5 | about 56 | cat, shooting light |
| Billing | parts crib, 22 | 3, 7, 122, 4, 3 | 5 | about 53 | stack smoke, bird |

  The not-found scene is 48×48 with its lights off and one beacon. Detail and gap counts are my tallies of the code, not computed output.
- **Review fixes:** I reviewed the scenes at 4× in two rounds. The gas cylinders read as the letter "H", the bench as an animal, and the round cable reel as a coin, which the spec forbids. I redrew all three, and the crates.

## Not applied
- **One commit per screen:** git wasn't among the commands I was allowed to run, so nothing is committed.
- **`src/pages/SceneReview.tsx`:** the temporary review route is removed, but I had no command to delete files. The page file is left as an empty stub; you can delete it.
- **Accessibility checker (axe):** not run, since it wasn't an allowed command.
- **Header search and header nav items:** the app has no search, and the sidebar already holds the four sections.
- **Revoke confirmation dialog:** the spec wants destructive actions confirmed in a dialog, but the tests expect the row to disappear on click, so Revoke stays immediate.
- **Dialog focus:** the dialog still focuses Cancel, because a test requires it. The spec says the first field or the confirm button.
- **One status region per screen:** Security keeps its two `role="status"` regions, which the tests rely on.
- **Pinned web font versions:** the font links use `@latest`, exactly as the spec gives them.

## Decisions I made
- Billing has at most 3 thick-framed windows: Payment method and Invoices are thin panels under ruled headings.
- Meters: bio length uses 16 blocks (20 would overflow at 390px), and password strength uses 12 blocks over 3 levels.
- Colours: sections are Profile cyan, Notifications violet, Security blue, Billing amber. Plans are Free cyan, Pro violet, Business blue.
- The ground strip's gap sits in the content's bottom padding, so the sidebar runs down to the grass.
- I added "Public profile" as the profile window's title and a short password-tips callout.