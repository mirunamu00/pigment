I've applied margin-notes@1.0.0 to all four settings screens and the not-found page. The build and typecheck pass, the last screenshot run reported no horizontal overflow, and both light and dark work (they follow the system setting).

**Not verified:** I didn't run the Playwright smoke tests, because `npm run test:e2e` isn't one of the commands you allowed. The screenshot script also only captures each page at rest, so I haven't seen these screens: the profile error state, the saved state, the plan dialog, the password-mismatch state, the keyboard-focus state, the not-found page and the mobile menu sheet. I didn't make any git commits either, because git isn't on the allowed list. The spec asks for one commit per screen, so that's still to do.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a copy of the package's `tokens.css`. In `base.css`, the app's old variable names now point at the new tokens. The spec's fonts are bundled locally through three `@fontsource` packages (Geist, Geist Mono, Caveat) rather than loaded from a CDN. A blocked CDN would log console errors, which the smoke test forbids.
- **Shell:** the header and page share one container, so content starts at 40px at 1440px. The 220px sidebar has a mono "SETTINGS" eyebrow and the pencil note "all your settings" below it. Under 860px the sidebar becomes a menu sheet opened by a 44px button in the header; Escape and navigating close it. I added `StudioFilters.tsx`, which holds the watercolor filters once at the app root.
- **Profile:** 2-column form in a card, 40px inputs, a drawn select arrow, error lines with an icon, and a danger callout at the top ("2 fields need attention", `role="alert"`). "Saved" shows as a green badge with a check. On mobile, Save and Reset become a fixed bar at the bottom.
- **Notifications:** the spec's 36×20 switches, still driven by the native `input[role=switch]`. Each group is a card with its heading inside.
- **Security:** the password card shrinks to fit the form, with the same error callout. The sessions table has fixed column widths and turns into one block per row on mobile, with `data-label`s and full-width Revoke buttons.
- **Billing:** the plan cards share a height. The current plan is the one raised card, with a grey "Current plan" badge next to its title. The payment card fits its content. Invoices use mono figures and status badges with a dot, and also stack on mobile. The dialog is centred, has a close button, focuses Cancel with its focus ring showing, and stacks its buttons full width on mobile.
- **Not found:** a raised empty-state card with the watercolor bloom behind it and a pencil note beside the button.
- **New files:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

Every route, label, form field, `data-testid` and accessibility attribute is kept. I only added classes, wrappers, the menu button and the dialog close button.

**Spec items I could not apply**
- **Toasts:** the profile test requires exactly one `role="status"` element, so a toast would break it. Confirmations use the spec's other option, an in-place success badge. The longer messages ("Your plan is now Business.") are therefore longer than the badge's usual 1–2 words.
- **Tape on the not-found card:** the spec says empty states get a tape strip but settings apps get no tape. I followed the settings rule.
- **Serif word and its underline flourish:** not used, because the spec forbids them on settings pages. For the same reason I didn't load Instrument Serif.
- **No bloom on the settings pages themselves:** the settings entry in the spec lists only the note, so the bloom appears only on the not-found page.
- **`tokens.json`:** I didn't copy it into `design-system/`; `components.md` points to the package copy instead.

**Decisions I made myself**
- Revoke is a small secondary button, not a red one, since the spec reserves the red fill for confirming a destructive action.
- Space between cards is 32px (the spec's "dense data" spacing) rather than 56–64px.
- The content column is capped at 8 of 12 grid columns (about 843px).
- The mobile action bar is on Profile only, since that page exists for its form.
- Between 860px and 1199px the sidebar narrows to 180px. Pencil notes are hidden there anyway.
- The "N of 6 notifications on" count is plain small text, not a badge.
- On the raised plan card, the grey badge gets a thin border. In dark mode its background is otherwise the same colour as the card.
- The dialog uses `focus({ focusVisible: true })`, which needed a type cast.