Night Cartridge is now applied to all four settings screens and the not-found page. The build passes, all 8 smoke tests pass, and the final screenshot run (1440 and 390, light and dark) shows no page scrolling sideways. I didn't commit: the `git` commands need approval this unattended session couldn't give, so everything is uncommitted in the working tree.

**What I changed**
- **Base:** `tokens.css` is copied as-is from the package and imported by `base.css`, which I rewrote completely. I added the four font links the spec names, plus the spec's root rules: square corners, no transitions, and motion off under `prefers-reduced-motion` or when the Animation switch is off.
- **Header and shell:** sticky header with a pixel mark, the dithered rule under it, and two persisted switches (Animation and Pixel body). Below it, a full-height sidebar menu with the gold ▶ marker on the current section and a colour bullet per section. Under 1024px it becomes a menu at the top of the page.
- **Art (`src/art/`):** built with the spec's helper code. The world is a workshop yard, and each screen has its own scene in a framed window above the page title:
  - **Profile:** a workshop with a saw-tooth roof, gear plate and open bay.
  - **Notifications:** a signal hut with a bell, mast and horn speaker.
  - **Security:** a tool vault with a wheel door and barred window.
  - **Billing:** a supply depot with a "DOCK" sign, hoist and loading dock.
  - **Not found:** a small framed scene with a stalled generator, a dead lamp post and one red beacon.

  Every screen has the grass-and-dirt ground strip at the bottom. Scenes have twinkling stars, blinking lights, drifting clouds, a two-frame swap or bob, and a rare bird or shooting light. All of it stops under reduced motion and when the Animation switch is off.
- **Reusable pieces (`src/components/pixel.tsx`):** scene, ground strip, small framed scene, marker, window, dithered rule, block meter, callout, pixel icons and avatar. They replace the old stroke icons.
- **Screens:**
  - Forms sit in windows with gold submit buttons. Fields get danger frames and a nudge on error, and a pixel "!" icon on error messages.
  - Switches are square pixel toggles with an On/Off word, and the whole row is clickable.
  - Tables have the marker gutter. On phones only the key columns show.
  - The current plan has a gold frame and marker. The change-plan dialog is a window with a hard shadow, a gold confirm and a close button.
  - Block meters added for "3 of 6 notifications on", bio length (20 blocks out of 160 characters) and password strength (12 blocks).
  - Invoice dates now read as `2026.10.01`.
- **Docs:** `design-system/` (`VERSION`, `tokens.css`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

Every route, label, form field, `data-testid` and accessibility attribute is kept.

**What I couldn't apply**
- **Light mode:** the spec is dark only and forbids a light theme, so the "light" screenshots are dark too.
- **Search and danger zone:** the app has no search feature and no destructive account action, so neither was added.
- **One status region per screen:** Security keeps two `role="status"` regions because the tests rely on both.
- **Frame limit:** the spec allows at most three thick 4px frames per screen. Billing would need five, so Payment method and Invoices use thin 2px frames.
- **Fonts from a CDN:** the font links use `@latest` as the spec gives them; I couldn't host the fonts locally.
- **Final report tables:** I didn't produce the sprite, variant and per-scene number tables the spec's Verification section asks for. Scene coordinates were checked by hand against the composition rules, not printed out by code, because I could only run the five commands you listed.

**Decisions I made**
- Section titles are 16px headings in each window's title bar ("titled Windows" for settings) rather than 32px headings with a dithered rule.
- The sidebar marker is steady. The spec allows a blink, but it caught every screenshot in its off phase.
- The not-found link is styled as the gold button and keeps its text "Go to profile settings", instead of the spec's "Retry".
- Section colours: Profile cyan, Notifications violet, Security blue, Billing amber.
- The temporary 4× art-review route is removed.
- `npm install` created a `package-lock.json`, which I left untracked.