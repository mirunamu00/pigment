# Base app: landing (Hourglade)

A marketing site for Hourglade, a fictional team scheduling tool, used as a **holdout** app for the
Pigment template harness. It is structurally different from the other four base apps (a long
sectioned home page, full-width bands, pricing cards, a comparison table, an accordion, a signup
form), so it shows whether a design system carries to page types it was not tuned on. It is
intentionally plain: a coding agent restyles it with a design system and the smoke tests prove
nothing broke.

## What it contains

- Header with the brand, navigation (Features and How it works section links, Pricing, Customers)
  and a "Sign up" button. Below 720px the navigation collapses into a "Menu" button
  (`aria-expanded`) that opens and closes a panel; Escape and navigating close it.
- Home: a hero (h1, subcopy, primary and secondary call to action, an image placeholder), a strip
  of customer names as text, a grid of six features (icon placeholder, title, text), a two-column
  "How it works" with three numbered steps, a band of three big stats, three testimonials, an FAQ
  accordion (five items, `aria-expanded` buttons) and a closing call-to-action band.
- Pricing: a Monthly / Yearly toggle (`aria-pressed` buttons; yearly is 20% cheaper), three plan
  cards (Team is marked "Most popular") with feature lists and calls to action, a feature
  comparison table (✓ / — per plan, with screen-reader text) and three billing questions.
- Customers: a featured quote and eight customer stories with an industry filter (All / Healthcare
  / Education / Logistics / Technology / Hospitality, `aria-pressed` buttons) and a result count.
- Sign up: name, work email, company size (select), password with a Show / Hide toggle and a
  terms checkbox; per-field validation messages, focus moves to the first invalid field, and a
  success panel after a valid submit.
- Footer on every page: link columns and a product-updates email field (empty and invalid emails
  show an error, a valid one shows a thank-you message).
- A 404 page for unknown routes.
- All data is mock data in `src/data/*.ts`. No backend, no network calls.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (sections `#features`, `#how-it-works`, `#testimonials`, `#faq`) |
| `/pricing` | Pricing |
| `/customers` | Customer stories |
| `/signup` | Sign up |

`pigment.app.json` lists the routes the harness screenshots and the interaction states it captures.
`"holdout": true` marks the app as one the design prompts are not tuned on.

## Scripts

`npm run dev` · `npm run build` · `npm run preview` (port 4305) · `npm run test:e2e` · `npm run typecheck`

## What the smoke tests guarantee (`tests/smoke.spec.ts`)

Home renders the hero, six customer names, six features, three steps, the three stats, three
testimonials, five FAQ items, the call-to-action band and three footer columns; the hero and header
calls to action reach sign up and the how-it-works section; header links reach Pricing, Customers
and the features section; on a narrow screen the nav is replaced by a menu button whose panel opens,
closes (button, Escape, navigation) and keeps `aria-expanded` in sync; FAQ items expand and collapse
independently; the billing toggle switches every plan price between monthly and yearly and toggles
`aria-pressed`; exactly one plan is "Most popular"; the comparison table has its header row and
eight feature rows; the industry filter narrows the stories and updates the count; sign up shows a
message for every invalid field, reveals and hides the password, and shows the success panel only
after a valid submit; the footer newsletter shows errors and then a thank-you; footer links lead to
existing pages; unknown routes show the 404 page; every captured route renders without console
errors; every state in `pigment.app.json` runs at desktop and mobile size and leaves the expected
result on screen.

## Styling seam

All colors, fonts, radii and spacing are CSS custom properties at the top of
`src/styles/base.css`. Components use class names only (no inline styles).

## Rule for restyling

Restyle freely, but keep every `data-testid`, route, section id, label text used in tests, and behavior
(including the narrow-screen menu below 720px).
