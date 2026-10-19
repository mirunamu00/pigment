I applied graphite-blueprint 1.2.0-rc.4 to every screen: Profile, Notifications, Security, Billing, the change-plan dialog and the not-found page. The build passes, all 8 smoke tests pass and nothing scrolls sideways at 1440px or 390px. I checked the screenshots of every route in light and dark, and of the dialog and 404 page in light, dark and mobile.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a copy of the package's `tokens.css`; I recreated it by hand, so diff it against the original once. The old style variables now point at the new tokens. Inter and Geist Mono are self-hosted from two npm font packages (`@fontsource-variable/inter`, `@fontsource/geist-mono`), so no font CDN. Root setup, focus outline and the reduced-motion block follow the spec.
- **Light and dark:** both are supported and follow the device setting. There is no theme switch because the app doesn't have one.
- **Signature elements:** each one is a reusable piece in `src/design/`, with its CSS taken from the recipe in `src/styles/signature.css`. I rendered each piece on its own at 2x on a temporary route, compared it with the recipe and then removed the route. Looping motion stops under reduced motion.
- **Shell:** a sticky, translucent 64px header; a 240px sidebar with icons and the current page tinted; below 1024px the nav becomes text-only pills that wrap, and all four show at 390px.
- **Every screen:** a screen head with a mono label, the h1 and a two-tone summary. Sections are split rows: a mono "01 / 02" counter, title and description on the left, controls on the right, with 48px hairline gaps.
- **Profile:** a live preview of the profile card on a quiet stage, above the fields. Fields are one column, 560px wide.
- **Security:** the password strength hint has a 3-dot level meter.
- **Billing:** the plans are a hairline grid of ranked choice cards with a 1-, 2- and 3-slab blueprint stack. Invoices show 14px status icons with the word.
- **Not found:** a broken-connector blueprint on a quiet stage, "ERR 404", and two pill buttons.
- **Forms:** both forms now show a "2 fields need attention" banner above the actions when a submit fails, and the first invalid field gets focus and scrolls into view.
- **Tables:** below 640px they show only the first column and the actions or status column. The hidden values move into a second line of the first cell.
- **Dialog:** mono caption, Cancel then the confirm pill, blurred backdrop, open and close transitions. Below 640px it sits at the bottom of the screen with the buttons stacked.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

**Measured at 1440px:** on Billing, the plan grid, payment card and invoices table all end at the same right edge (x 1408), wider than 560px. The sections are padded 48px. The blueprint drawing fills about 90% of its 96px box (87px). The Amount header and its cells line up on the same right edge.

**What I could not apply**
- **No commits:** the spec asks for one commit per screen, but `git` wasn't among the commands I was allowed to run. All changes are uncommitted.
- **One leftover file:** for the same reason I couldn't delete `src/pages/ReviewPage.tsx`. It now holds only `export {}` and is safe to delete.
- **Two elements built but not shown:** the spec plate and the shimmer/live-edge set are ready to use, but nothing on these screens lacks an image or actually runs (there are no network calls).
- **Smaller tap targets in places:** buttons are 40px (44px only on mobile), the Revoke buttons are 28px and the switches are 28×16. The labels next to the switches are still clickable.
- **Not checked in screenshots:** the error, saved and keyboard-focus states. The screenshot tool only captures pages, not those states. The smoke tests cover their behaviour.

**What I decided myself**
- **Profile preview:** the spec allows "a live preview beside the controls that change it", so I added one. It holds the existing avatar (which keeps `data-testid="profile-avatar"`) and is hidden from screen readers.
- **New copy:** short section descriptions; second sentences for two summaries ("Save to apply changes.", "Plan changes take effect on your next invoice."); an empty-state line under "No other devices are signed in."; and a "Go back" button on the 404 page. On Security the summary is split mid-sentence instead.
- **Layout:** the split rows start at 1280px; below that the title stacks above the controls. Both avatars are 32px.
- **Status mapping:** an invoice that is "Due" uses the in-progress icon, and "This device" gets a green dot.
- **Notifications:** each group's legend is floated so it can sit in the left column while still naming the group for screen readers.
- **Version date:** the spec gives no update date, so `VERSION` uses today's date.