I've applied margin-notes 1.2.0-rc.1 to the whole app: the four settings screens, the not-found page, the header and side navigation, plus the dialog, toasts and form states. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px, light or dark. I opened the screenshots after the main restyle, fixed what was wrong, and re-ran everything.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a verbatim copy of the package's token file and is loaded before `src/styles/base.css`, which I rewrote using only the spec's tokens. The old variable names point at the new tokens. Where an old name now means something different (for example `--space-4` or `--font-size-h1`), the new token wins. Geist, Geist Mono and Caveat load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - `studio.tsx`: the watercolor filters (rendered once in `Layout`), the bloom, tape and pencil note, built to the spec's recipes.
  - `Toast.tsx`: auto-dismisses after 5s, hover pauses it, Escape closes it, at most 3, and it sits above the mobile action bar.
  - `Callout.tsx` and `icons.tsx`: callouts and 1.5px outline icons.
- **Layout:** 220px sidebar with a mono "Settings" eyebrow. Content starts at 40px at 1440 and is capped at 8 of 12 columns. Under 860px the section list becomes a menu sheet opened from a header button (closes on Escape and on navigation).
- **Per screen:**
  - **Profile:** two-column form card, custom select chevron, and on mobile Save/Reset sit in a fixed action bar.
  - **Notifications:** switches built to the spec (36×20, ink when on, thumb slides).
  - **Security:** narrower password card with a strength dot. Sessions table with fixed column widths that stacks into one block per row on mobile.
  - **Billing:** three equal-height plan cards with the current plan lifted, a fit-to-content payment card, invoices in mono with Paid/Due badges, and the dialog centered with the Cancel focus ring showing.
  - **Not-found:** empty-state panel with one tape strip, the empty-state bloom and a pencil note on the button.
- **Form states:** errors show an alert icon under the field, and a submit with errors adds a "2 fields need attention" callout at the top of the form. Success messages render as green badges with a check, and every save also shows a toast.
- **Studio details for settings screens:** as the spec requires, there is no bloom, serif word or tape. The only detail is one pencil note under the section nav ("all your settings"), shown from 1200px up.
- **Motion:** all transitions and animations become instant under `prefers-reduced-motion: reduce`.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and new `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits:** the spec asks for one git commit per screen, but git wasn't in the commands I was allowed to run, so all changes are uncommitted.
- **Leftover file:** I couldn't delete `src/ReviewHarness.tsx`, the temporary helper I used to screenshot error, saved, dialog and menu states. It's no longer imported anywhere, so it has no effect, but you can delete it.
- **No update date:** the spec gives none, so `VERSION` uses today's date and says so.

**Decisions I made**
- **Toasts are visual only.** The Profile test expects exactly one `role="status"` element on the page. So the existing in-place status text stays as the announced message, and toasts are `aria-hidden` so screen readers don't hear it twice.
- **Mobile section nav:** since nothing may sit between the header and the h1 on mobile, the sidebar becomes a header menu sheet.
- **Billing:** the "Current plan" badge moved next to the plan name, as the spec says for state markers, and the current plan card gets the pinned shadow.
- **Revoke buttons** are small secondary buttons, because the spec keeps filled danger buttons for confirming destructive actions.
- **Not-found:** the h1 now sits above the panel, which holds the sentence and the button styled as a secondary button.
- **Dialog close:** I added a close button in the top-right corner and click-outside-to-close.
- **Instrument Serif isn't loaded,** because settings screens never use the serif word.