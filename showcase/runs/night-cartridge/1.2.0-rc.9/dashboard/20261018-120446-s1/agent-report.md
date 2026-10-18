Night Cartridge 1.2.0-rc.9 is now applied to every screen. The build passes, all 10 smoke tests pass, and the snapshot script reports no sideways scroll on any page at 1440px or 390px. I looked at every screenshot afterwards and fixed what was wrong.

**What changed**
- **Foundation:** the token file is copied in, the pixel fonts load from the links the spec gives, and the spec's root block is in place. That covers reduced motion, the Animation-off switch, no rounded corners, the 4px gold focus ring and stepped animations. All old colours, radii and soft styling are gone.
- **Reusable pieces** (`src/components/pixel.tsx`, art in `src/art/`):
  - scenes (wide strips, project banners, small square scenes for empty and error states)
  - the ground strip at the bottom of every page
  - the ▶ marker
  - framed windows, dotted rules and block meters
  - a tinted message box (built but not yet used on any screen)
  - pixel icons, and avatars coloured from the person's name
- **The scene world:** I built it as a night freight harbour, since deployments are shipments. It has 12 different lead buildings, one per screen, and each project's detail page gets its own (for example a container crane "MOVE" for Apollo, a counting house "BILL" for Billing). The world and which scene goes on which screen are written up in `design-system/components.md`.
- **Motion:** stars twinkle, lights blink, a cloud drifts, a shooting star appears now and then, and at most two sprites move per scene. All of it stops under reduced motion and when the Animation switch is off.
- **Header:** the dotted rule, marker navigation, a framed search with a "/" shortcut hint, the Animation and Pixel body switches (both remembered between visits), and the user menu as a window of marker items. Under 1024px a Menu button opens all of this in a window that keeps focus inside until closed.
- **Screens:**
  - **Overview:** a scene strip, KPI tiles with hue bars and meters, the chart and activity under dotted headings, filter chips, and a 'Showing n of m' meter.
  - **Projects and Team:** each gets its own scene strip above a marker table; on phones only the pinned columns show.
  - **Project detail:** breadcrumbs, the project's banner, tabs, a task meter, and pixel checkboxes.
  - **Settings:** a scene strip, a marker sidebar running from the header down to the ground, and a titled window.
  - **Page not found and unknown project:** a small scene with one red beacon, a message window, and a gold button.
- `design-system/` (`VERSION`, tokens, `components.md`) is added, plus the pointer line in `AGENTS.md` and `CLAUDE.md`.
- Every route, `data-testid`, label text and accessibility attribute is kept. "Refreshing…" keeps its exact text, and the old progress bar's "Task completion" label moved to the new meter.

**What I couldn't apply**
- **Light appearance:** the spec is dark only, so the light and dark screenshots are the same.
- **Commits:** the spec asks for one commit per screen, but git isn't in the commands you allowed, so all changes are uncommitted. `package-lock.json`, created by `npm install`, is also left untracked.
- **Hand-placed details:** star and grass positions are typed by hand as shared lists, and project banners reuse those lists, sometimes mirrored, rather than each getting its own. Some building textures are drawn by loops.
- **Spec report tables:** I didn't produce the item-sprite, prop-variant and per-scene number tables the spec's report asks for. There are no item sprites. Scene positions and lead heights are in the code and noted in `components.md`.
- **Chart height:** the plot grows past the spec's 240px limit so the chart panel lines up with the activity panel. Trimming the activity list wasn't an option, because the tests need all 5 items.

**What I decided myself**
- **Navigation:** the nav sits in the header. The user's name in the avatar button is hidden visually, still read by screen readers, so the header fits at 1280px.
- **No gold on most screens:** Overview, Projects, Team and Settings have no main "commit" action, so they have no gold button. Gold appears only on the error pages' "Go to overview" / "Back to all projects".
- **KPI meters:** only uptime (out of 100%) and deployments (against the six-month peak) have a real maximum, so only they get meters. Incidents and lead time show their change and "Lower is better".
- **Dates** now read YYYY.MM.DD.
- **Settings menu:** Notifications, Integrations and Access control appear as disabled "Soon" items, matching the placeholder text.
- **Two-frame flags:** I adjusted the spec's swap animation so that with motion off only the first frame shows, not both frames on top of each other.