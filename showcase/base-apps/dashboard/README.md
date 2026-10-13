# Base app: dashboard (Northwind Ops)

An operations dashboard used as the "existing project" for the Pigment template harness.
It is intentionally plain: a coding agent restyles it with a design system and the smoke
tests prove nothing broke.

## What it contains

- Left sidebar navigation (Overview, Projects, Team, Settings) and a top bar with a
  project search and a user menu.
- Overview: four KPI cards, an SVG bar chart drawn from data, a recent-activity list, and a
  projects table with status filter (All / Active / Paused / Done), text filter, sortable
  columns and an empty state.
- Project detail with Overview / Tasks / Files tabs; checking tasks updates the progress count.
- All data is mock data in `src/data/*.ts`. No backend, no network calls.

## Routes

| Path | Page |
| --- | --- |
| `/` | Overview |
| `/projects` | Projects list (accepts `?q=` from the global search) |
| `/projects/:id` | Project detail, e.g. `/projects/apollo-migration` |
| `/team` | Team directory |
| `/settings` | Placeholder |

`pigment.app.json` lists the routes the harness screenshots.

## Scripts

`npm run dev` · `npm run build` · `npm run preview` (port 4301) · `npm run test:e2e` · `npm run typecheck`

## What the smoke tests guarantee (`tests/smoke.spec.ts`)

KPIs/chart/activity/table render; status filter and text search narrow the table; a search with
no matches shows the empty state and "Clear filters" restores it; column sorting toggles
`aria-sort` and row order; project detail opens and tabs switch; task checkboxes update the
progress count; sidebar navigation and global search route correctly; the user menu opens and
closes with Escape; every captured route renders without console errors.

## Styling seam

All colors, fonts, radii and spacing are CSS custom properties at the top of
`src/styles/base.css`. Components use class names only (no inline styles).

## Rule for restyling

Restyle freely, but keep every `data-testid`, route, label text used in tests, and behavior.
