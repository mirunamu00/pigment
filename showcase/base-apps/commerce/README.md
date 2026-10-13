# Base app: commerce (Fieldhouse Supply)

A small online store used as the "existing project" for the Pigment template harness.
It is intentionally plain: a coding agent restyles it with a design system and the smoke
tests prove nothing broke.

## What it contains

- Header with the store name, a primary nav (Shop, Cart) and a cart button with an item-count
  badge.
- Product grid: category filter chips (All / Bags / Apparel / Kitchen / Accessories), an
  "In stock only" checkbox, a sort select (Featured, price low→high, price high→low, name) and
  an empty state with "Clear filters". Filters are kept in the URL (`?category=`, `?sort=`,
  `?stock=in`).
- Product detail: image placeholder (a tinted CSS box with an inline SVG icon), a variant
  selector (color or size radios), a quantity stepper and Add to cart. Sold-out products have a
  disabled button.
- Cart: line items with quantity stepper and Remove, subtotal / shipping / total (flat $8
  shipping, free over $100), and a checkout form (name, email, address) with client-side
  validation messages and a confirmation state after a successful order.
- All data is mock data in `src/data/products.ts`; the cart lives in React state
  (`src/cart/CartContext.tsx`) and resets on reload. No backend, no network calls.

## Routes

| Path | Page |
| --- | --- |
| `/` | Product grid |
| `/products/:slug` | Product detail, e.g. `/products/canvas-field-tote` |
| `/cart` | Cart and checkout |

`pigment.app.json` lists the routes the harness screenshots.

## Scripts

`npm run dev` · `npm run build` · `npm run preview` (port 4302) · `npm run test:e2e` · `npm run typecheck`

## What the smoke tests guarantee (`tests/smoke.spec.ts`)

The grid renders all 11 products and the badge starts at 0; category chips filter the grid and
toggle `aria-pressed`; the sort select reorders by price and name; a filter combination with no
matches shows the empty state and "Clear filters" restores it; a product card opens its detail
page where variants and the quantity stepper work and sold-out items cannot be added; Add to
cart increments the header badge by the chosen quantity; changing a line quantity updates the
line total, subtotal, shipping and total; removing the last item shows the empty cart; checkout
shows per-field validation errors and then a confirmation; every captured route renders without
console errors.

## Styling seam

All colors, fonts, radii and spacing are CSS custom properties at the top of
`src/styles/base.css`. Components use class names only (no inline styles).

## Rule for restyling

Restyle freely, but keep every `data-testid`, route, label text used in tests, and behavior.
