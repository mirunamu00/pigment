I've applied graphite-blueprint 1.1.0-rc.2 to all four settings screens and the not-found page, in light and dark. The final build passes, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in either theme. I looked at every screenshot. I also looked at each signature piece, the dialog and the error banner on their own on temporary routes, and then removed those routes.

**What changed**
- **Tokens and base:** `design-system/tokens.css` is a copy of the package's `tokens.css`, loaded before `src/styles/base.css`. I rewrote `base.css` to use only token variables. Appearance follows the device's light/dark setting; I didn't add a theme switch. Inter and Geist Mono load from Google Fonts in `index.html`. The reduced-motion block is in place.
- **Signature pieces** (reusable, in `src/components/signature/`): the stage (lit and quiet) with its caption, the dot glyph with all six patterns, the dot meter and dot field, the blueprints, the spec plate, the shimmer/pulse/caret, and the screen head, group head and opener.
- **Shell:** sticky header; sidebar with 16px icons and the current page highlighted. Below 1024px the sidebar becomes text-only pills that wrap, so all four show at 390px.
- **Every screen:** a header with a mono label, the title and a two-tone summary, then settings groups numbered "01 / 03".
  - **Profile:** a quiet stage with a live preview of your member card that updates as you type.
  - **Notifications:** native switches, per-group counts like "2 / 3 ON".
  - **Security:** a dot meter for password strength; the sessions table follows the spec's small-screen rules, with a pulsing dot beside "Active now" and the empty glyph when no other devices are signed in.
  - **Billing:** plans as cards with stacks of one, two and three slabs that lift on hover; status icons in the invoices table; the dialog becomes a bottom sheet on mobile.
  - **Not found:** a blueprint whose connector stops halfway at a red point, with "ERR 404" and two buttons.
- **Forms:** a failed submit now shows a "2 fields need attention" banner. Status messages show a brief all-dots frame, then a check.
- **Kept:** every route, label, `data-testid`, ARIA attribute and behaviour, and each page still has only its original status regions.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md`), `AGENTS.md` and `CLAUDE.md` with the pointer line, and the README's styling section updated.

**What I could not apply**
- **No commits:** the spec asks for one commit per screen, but `git commit` wasn't in your allowed command list. Everything is uncommitted in the working tree.
- **No working-state motion:** the app makes no real requests, so there are no running glyphs, shimmer, live edges or loading states. The spec says these appear only when something actually runs.
- **No spec plates or openers on screens:** the app has no missing images (avatars use initials, as the spec says) and no content sections. Both pieces are built but unused.
- **Dialog close animation:** the dialog fades in when it opens but doesn't animate when it closes; the native `<dialog>` closes instantly.
- **No spec date:** the spec has no update date, so `VERSION` records today's date as the date applied.

**Decisions I made**
- **Group layouts:** forms and switches use split rows (title left, controls right). Plans and tables stack the heading above full-width content, because three plan cards are too narrow in the right column.
- **Avatar sizes:** I used the spec's 32px for the profile photo and 16px in the header, which makes the profile photo smaller than before.
- **Added copy and controls:** I wrote group descriptions where none existed (for example "A change takes effect on your next invoice."). On the not-found page I added a "Go back" button as the spec's required second action.
- **Strength meter:** dots map Too short 1, Weak 2, Fair 3, Strong 5. The strength text is now grey instead of coloured.
- **Revoke button:** a neutral outlined pill rather than red, because the spec keeps status colours off buttons.
- **Two process deviations:** in Git Bash I had to pass review paths as `//review` because the shell rewrites a single leading slash. I also used `rm` once to delete the temporary review page.

`npm install` also created a `package-lock.json`, which wasn't in the repo before.