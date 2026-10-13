# Base app: blog (Field Notes)

A small publication used as the "existing project" for the Pigment template harness.
It is intentionally plain: a coding agent restyles it with a design system and the smoke
tests prove nothing broke.

## What it contains

- Header with the brand and primary navigation (Home, About); a footer with a newsletter
  subscribe form (email validation, error message, success message).
- Home: a featured post, then the remaining posts with a text search, a tag filter
  (All / Engineering / Design / Writing / Process / Remote work, `aria-pressed` buttons),
  a result count and an empty state with "Clear filters".
- Article: title, author, date, reading time and tags; a long-form body with headings,
  paragraphs, a blockquote, a code block, an ordered list and an image placeholder with a
  caption; a table of contents linking to the heading ids; related posts (shared tags).
- About page with the publication story and author cards.
- All data is mock data in `src/data/*.ts`. No backend, no network calls.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (featured post + post list) |
| `/posts/:slug` | Article, e.g. `/posts/shipping-a-design-system` |
| `/about` | About |

`pigment.app.json` lists the routes the harness screenshots.

## Scripts

`npm run dev` · `npm run build` · `npm run preview` (port 4303) · `npm run test:e2e` · `npm run typecheck`

## What the smoke tests guarantee (`tests/smoke.spec.ts`)

Home shows the featured post and all six list posts; the tag filter narrows the list and
toggles `aria-pressed`; a search with no matches shows the empty state and "Clear filters"
restores it; the featured post link opens its article; the article renders author, date,
reading time and every body element type; table-of-contents links match the heading ids and
scroll to them; related posts link to other articles; the newsletter form shows validation
errors and then a success message; the About page opens from the header; every captured
route renders without console errors.

## Styling seam

All colors, fonts, radii and spacing are CSS custom properties at the top of
`src/styles/base.css`. Components use class names only (no inline styles).

## Rule for restyling

Restyle freely, but keep every `data-testid`, route, heading id, label text used in tests, and behavior.
