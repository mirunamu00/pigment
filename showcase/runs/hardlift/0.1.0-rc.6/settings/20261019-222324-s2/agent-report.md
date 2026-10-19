I've applied hardlift@0.1.0-rc.6 to every screen: Profile, Notifications, Security, Billing, the not-found page and the plan-change dialog, in light and dark. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px.

**One leftover to clean up:** `src/pages/PreviewPage.tsx` is a temporary page I used to screenshot the dialog, an error field and the empty state. I've removed its route, but the file is still there because `rm` isn't one of the commands I'm allowed to run. Please delete it.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package file. The old variable names in `base.css` still work as aliases, and DM Sans loads from Google Fonts. Light and dark follow the system setting.
- **Signature elements** (`src/styles/hardlift.css`, all switched off under `prefers-reduced-motion`):
  - **Lift buttons:** buttons lift on hover. Row actions (Revoke) and the dialog's close button lift 2px. Each screen has at most one pink button: Save changes, Update password, Confirm change in the dialog, or the "Go to profile settings" link. Everything else is outlined.
  - **Header band:** every page title now sits in a full-width colored band, built as a reusable `PageBand` component. Settings pages use periwinkle, and the not-found page uses the red reserved for error screens.
  - **Pill navigation:** the section links are pills inside the band. They scroll sideways on phones instead of wrapping.
  - **Stickers:** a reusable `Sticker` component with three drawings. A small phone appears when no other devices are signed in, and a large tag appears on the not-found page. A turning-coin loading sticker is built and its animation works on a test page, but the app has no loading states yet, so it isn't shown anywhere.
- **Components:**
  - **Forms:** 48px inputs with the pink focus ring, a native select with its own arrow, and errors shown with an icon plus text. The profile form also shows one summary line at the top when saving fails.
  - **Switches** now show an "On"/"Off" word beside them.
  - **Tables** sit in a bordered box. On phones each row becomes a stacked block with its Revoke button fully visible.
  - **Badges and the dialog:** status badges pair an icon with a word, and prices are pink tags. The dialog has the hard shadow and a slide-in.
  - **Confirmations:** "Saved", "Password updated" and similar now show a check mark beside the button. The text and test hooks are unchanged.
- **Docs:** a `design-system/` folder (`VERSION`, token copies, `components.md`), plus one-line `AGENTS.md` and `CLAUDE.md` files pointing to it.

**What I couldn't apply or check**
- **Separate commits:** the spec asks for one git commit per screen, but git isn't in my allowed commands, so all changes are uncommitted.
- **Hover:** the screenshot tool can't hover, so I haven't seen a button lift in a screenshot. I did confirm the rules against the spec and that the coin and dialog animations run.
- **Parts with no place in this app:** toasts, the landing hero, linked cards, drifting shapes and the scrolling tag wall.

**Decisions I made myself**
- **Navigation moved into the band.** It used to be a sidebar. All routes, labels, test ids and `aria-current` still work.
- **Two old spacing variables dropped.** The old `--space-4` and `--space-8` had the same names as the new tokens and were silently overriding them, so the new 4px and 8px values win.
- **Sections are no longer all boxed.** Only forms and the payment method stay in boxes, with 24px padding (the spec's 16px is for small item cards). Plans, invoices and sessions are separated by a thin line, so a box never sits inside another box.
- **Small layout choices:** no sticker in the page band, three plan columns only from 1024px wide, and no button in the empty sessions state, since there's nothing to act on.