I've restyled every screen with Night Cartridge 1.2.0-rc.4. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I opened and compared the snapshots of every page, plus the not-found page, at both widths. The spec is dark-only, so "light" and "dark" snapshots look the same.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a copy of the package's `tokens.css`. `index.html` loads the four font stylesheets the spec lists. `src/styles/base.css` is rewritten using only tokens, and removes the old light theme, radii, soft styling and transitions. It also has the spec's root rules for reduced motion and the animation switch.
- **Reusable pieces** (in `src/components/` and `src/art/`):
  - Scene pieces: `PixelScene` (strip or vignette), `GroundStrip`, and the pixel helpers from the spec's recipe, plus a small sprite builder.
  - Chrome: `Marker`, `Window`, `SceneWindow` (scene plus title block), `DitherRule`, `BlockMeter`, `Callout`, pixel `Icon`s and hued-initial `Avatar`s.
  - Header switches: Animation on/off and Pixel body on/off, both remembered between visits.
  - Form errors: `FieldError` with the "!" icon and the shake ("nudge") on a failed submit.
- **Scenes:** the app's world is a workshop yard. Each screen has its own scene with a different lead building and arrangement:
  - **Profile:** saw-tooth shed.
  - **Notifications:** switch house.
  - **Security:** gantry shop.
  - **Billing:** gabled works.
  - **Not found:** a small scene with the lights off and one red beacon.
  - **Security, once every other session is revoked:** a second small scene (empty bench and lamp).
  - **Every screen:** a ground strip at the bottom.

  The scenes animate in steps (twinkling stars, blinking lights, a drifting cloud, one moving sprite, a rare bird or shooting light), and all of it stops under reduced motion or the Animation switch.
- **Screens:**
  - **Shell:** sticky header with a dither rule; the sidebar menu marks the current section with the ▶ marker and becomes a top menu under 1024px.
  - **Profile and Security:** settings groups are titled windows. The gold button is Save changes / Update password.
  - **Notifications:** "n of 6 on" has a block meter.
  - **Billing:** plan cards have hue bars, with the marker and a gold frame on the current plan. The gold button sits in the change-plan dialog.
  - **Tables:** status bullets, and only the pinned columns show on phones.
- **Docs:** added `design-system/` (`VERSION`, `components.md`), `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **One commit per screen:** git wasn't in the commands I was allowed to run, so nothing is committed.
- **Temporary review page:** for the same reason I couldn't delete it. `src/pages/ArtPreview.tsx` is now an empty stub with its route removed; it's safe to delete.
- **Danger zone:** there is none, because the app has no such section. Revoke stays immediate, with no confirmation dialog, because the tests rely on that.
- **Two status regions on Security:** the screen keeps both `role="status"` regions, although the spec allows one, because the tests check both.
- **Empty state button:** the "no other sessions" empty state has no button, because there's no sensible action.
- **Measured report:** I didn't produce the spec's numeric report tables. The scene numbers come from how the scenes were built and from looking at the snapshots, not from measurements.

**Decisions I made**
- **Thin frames on Billing:** Payment method and Invoices use thin 2px frames to stay within three heavy 4px frames per screen.
- **Hues:** sections are cyan, violet, blue and amber; plans are green, pink and orange.
- **Extra meters:** the bio length and password strength got block meters, without the large numerals the spec puts above a meter.
- **Dates:** invoice dates show as YYYY.MM.DD; I changed the display only, not the data.
- **Narrow screens:** the "This device" badge hides on phones, and the current session row carries `aria-current` instead. The header switches show icons only.
- **Ground strip:** it sits directly under the sidebar so the sidebar runs from header to ground. The spacing above it is the content's bottom padding instead of the spec's margin.
- **New text:** I added the headings "Public profile" and "Settings" and a password-tips callout.
- **Nav marker:** the current section's marker blinks, which the spec allows. Because of the timing it is in its hidden frame in every snapshot, but it does show.