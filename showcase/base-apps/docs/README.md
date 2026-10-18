# Base app: docs (Ferrule docs)

The documentation site of a fictional command-line task runner, used as a **holdout** "existing
project" for the Pigment template harness (`"holdout": true` in `pigment.app.json`). Its page types
(a three-column docs layout, long reference pages, code blocks, callouts, a changelog) are deliberately
different from the four main apps, so it shows whether a design system carries to pages it was not
tuned on. It is intentionally plain: a coding agent restyles it with a design system and the smoke
tests prove nothing broke.

## What it contains

- Header with the tool name, a plain-text version label, a live search box (filters pages by title,
  shows a result count, a results list and a "No results" empty state; Escape clears it), a Changelog
  link and a plain "Repository" text link.
- Left sidebar navigation in four collapsible groups (Getting started, Guides, API reference,
  Resources): each group toggle is a button with `aria-expanded`; the current page link carries
  `aria-current="page"`. Below 900px the sidebar becomes a drawer opened by a "Menu" button
  (`aria-expanded`), closed by its Close button, the backdrop, Escape or following a link.
- Docs home: intro heading, four section cards linking to each group, a quick-start code block.
- Article pages: breadcrumb, h1 and description, paragraphs, h2/h3 headings with ids, inline code,
  code blocks with a language label and a Copy button ("Copied" for 2 s, clipboard API in try/catch),
  callouts (note / warning / danger, icon placeholder and title), parameters tables (name, type,
  default, description), ordered steps, `<kbd>` keys, package-manager tabs (npm / pnpm / yarn,
  `role="tablist"`, `aria-selected`, arrow keys), "Was this page helpful?" yes/no feedback with a
  thank-you message, and previous/next page links.
- An "On this page" table of contents linking to the heading ids: a right-hand column on wide screens,
  above the article body below 1100px.
- Changelog: releases newest first with version heading, date and changes tagged Added / Fixed / Changed.
- A 404 page for unknown routes and a not-found state for unknown doc pages.
- All data is mock data in `src/data/*.ts`. No backend, no network calls.

## Routes

| Path | Page |
| --- | --- |
| `/` | Docs home |
| `/docs/:group/:slug` | Doc page, e.g. `/docs/getting-started/installation`, `/docs/guides/configuration` (long reference) |
| `/changelog` | Changelog |
| anything else | 404 |

`pigment.app.json` lists the routes the harness screenshots and the interaction states it captures
(search results, search empty, a collapsed sidebar group, copy feedback, keyboard focus, the mobile
drawer open).

## Scripts

`npm run dev` · `npm run build` · `npm run preview` (port 4306) · `npm run test:e2e` · `npm run typecheck`

## What the smoke tests guarantee (`tests/smoke.spec.ts`)

The home shows the intro, four section cards and the quick start, and a card opens its section;
sidebar groups collapse and expand with `aria-expanded`; exactly one sidebar link carries
`aria-current="page"` and it follows navigation; table-of-contents links match the heading ids and
scroll to them; the reference page renders callouts of every variant, parameters tables, steps, `<kbd>`
keys, inline code and labeled code blocks; search filters by title, opens a result and shows the
"No results" empty state; the Copy button copies the code and shows "Copied" for two seconds, also
when the clipboard is unavailable; package-manager tabs switch the command (click and arrow keys);
feedback buttons show a thank-you; previous/next links navigate; the changelog lists releases newest
first with Added / Fixed / Changed badges; unknown routes show the not-found page; at 390px the menu
button opens and closes the drawer (button, Escape, link) and no captured route scrolls sideways;
every captured route renders without console errors.

## Styling seam

All colors, fonts, radii and spacing are CSS custom properties at the top of
`src/styles/base.css`. Components use class names only (no inline styles).

## Rule for restyling

Restyle freely, but keep every `data-testid`, route, heading id, ARIA attribute (`aria-expanded`,
`aria-current`, `aria-selected`, `role="tablist"`), label text used in tests, and behavior.
