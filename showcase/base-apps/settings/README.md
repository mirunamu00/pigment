# Base app: settings (Account Settings)

An account settings area used as the "existing project" for the Pigment template harness.
It is intentionally plain: a coding agent restyles it with a design system and the smoke
tests prove nothing broke.

## What it contains

- Top bar with the signed-in user and a left sidebar with the four settings sections
  (Profile, Notifications, Security, Billing).
- Profile: avatar placeholder with initials, text inputs, a time zone select and a bio textarea
  with a character count. Save validates (inline errors, `aria-invalid`, focus moves to the first
  invalid field) and announces "Saved" in a `role="status"` region.
- Notifications: two fieldsets (Email, Push notifications) of switches built from
  `<input type="checkbox" role="switch">`, each with a description, plus an "N of 6 on" count.
- Security: change-password form with a live strength hint and validation errors (including
  "Passwords do not match."); an active sessions table whose "Revoke" buttons remove rows.
- Billing: three plan cards with a "Current plan" state, a change-plan confirmation built on the
  native `<dialog>` (focus moves into it, Escape and Cancel close it, Confirm switches the plan),
  a payment method summary and an invoices table.
- All data is mock data in `src/data/*.ts`. No backend, no network calls. State is per page and
  resets on reload.

## Routes

| Path | Page |
| --- | --- |
| `/` | Redirects to `/settings/profile` |
| `/settings` | Redirects to `/settings/profile` |
| `/settings/profile` | Profile |
| `/settings/notifications` | Notification preferences |
| `/settings/security` | Password and sessions |
| `/settings/billing` | Plans, payment method and invoices |

`pigment.app.json` lists the routes the harness screenshots.

## Scripts

`npm run dev` · `npm run build` · `npm run preview` (port 4304) · `npm run test:e2e` · `npm run typecheck`

## What the smoke tests guarantee (`tests/smoke.spec.ts`)

`/` redirects to the profile section and the side nav switches sections (URL, `h1`,
`aria-current`); profile validation shows errors and blocks saving, then a valid save shows
"Saved" in the status region; notification switches toggle their checked state by click and
keyboard and update the count; the password form shows the strength hint and a mismatch error,
then succeeds; revoking sessions removes rows down to the empty message; the change-plan dialog
opens with focus inside, closes on Cancel and Escape without changes, and Confirm moves the
"Current plan" state; unknown sections show the not-found page; every captured route renders
without console errors.

## Styling seam

All colors, fonts, radii and spacing are CSS custom properties at the top of
`src/styles/base.css`. Components use class names only (no inline styles).

## Rule for restyling

Restyle freely, but keep every `data-testid`, route, label text used in tests, and behavior.
