I've restyled the Account Settings app with margin-notes@0.1.0-rc.2. The build passes, nothing scrolls sideways, and I checked every screenshot at 1440px and 390px in light and dark against the spec. I couldn't run the smoke tests themselves, because `npm run test:e2e` isn't one of the commands I was allowed. Every `data-testid`, label, route, form field and accessibility attribute is unchanged, so they should pass, but that hasn't been verified.

**What I changed**
- **Tokens and fonts:** `tokens.css` is copied unchanged into `src/styles/`. In `base.css`, the app's old variable names now point to the new tokens. Fonts (Geist, Geist Mono and Caveat) are served from the app itself through three `@fontsource` packages I added to `package.json`. A Google Fonts link would fail when the tests run offline, which would break the "no console errors" test. Instrument Serif isn't loaded because settings apps get no serif word.
- **Dark mode:** follows the system setting, and `data-theme` on `<html>` can force light or dark.
- **Navigation:** the sidebar is now a header nav. The spec keeps sidebars for apps with six or more sections, and this one has four. Below 860px it becomes a menu button that opens a sheet; Escape closes it and route changes close it.
- **Profile:** the form is a card with 40px inputs and a native select with a chevron. Field errors and the "Saved" message now have icons. On mobile, Save and Reset move to a fixed bottom bar.
- **Notifications:** each group is a card. The switches are 36×20, ink when on, with a visible border when off.
- **Security:** the password form is a card with the strength hint coloured by status. Sessions sit in a table frame that scrolls sideways on mobile, with "This device" as a neutral badge.
- **Billing:** the current plan is the one lifted card and carries the "Current plan" badge. Invoice IDs, dates and amounts are monospaced, and Paid/Due badges show a dot plus the word.
- **Dialog:** restyled, and it fades in with a 4px rise.
- **Not found:** now an empty-state panel with the watercolor bloom and a pencil note.
- **Studio details:** a pencil note "everything lives here" in the Profile header points at the nav. No tape and no serif anywhere, as the settings rules require.
- **Docs:** added `design-system/` (`VERSION`, tokens, `components.md`) plus `AGENTS.md` and `CLAUDE.md` with the pointer line.
- **One bug fixed:** after the first snapshot run, Security was 16px too wide on mobile. Hidden screen-reader text inside the scrolling sessions table was spilling out of it; I fixed it.

**What I couldn't apply**
- **One commit per screen:** git isn't an allowed command, so all changes are uncommitted in the working tree.
- **Not-found screenshots:** that route isn't in the snapshot list. To check it I added it to `pigment.app.json` for a run and then removed it again.
- **Three small icons** (field error, success check, select chevron) are inline SVGs that the CSS uses only as shapes. Each contains the word `black`, but the colour shown always comes from tokens.

**What I decided myself**
- The content column is 960px wide and centred, with the header lined up to it. The spec has no settings width.
- The mobile bottom bar is used on Profile only. On Security it would cover the sessions table.
- "Revoke" is a small secondary button rather than a danger button, because it acts immediately and the spec reserves danger buttons for confirming a destructive action.
- Relative times like "2 hours ago" stay in the normal font; calendar dates are monospaced.
- Section headings sit above their cards rather than inside them. Notification group titles stay inside their cards because the fieldset needs them there.
- The Not-found page gets a bloom and the note "back to your profile", but no tape, because settings apps never use tape.