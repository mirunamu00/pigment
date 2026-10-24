The margin-notes 1.2.0-rc.1 restyle is applied to every screen. The build, typecheck and all 10 smoke tests pass, and the final `node pigment-snap.mjs` run reports no sideways scrolling. I checked the 1440px and 390px screenshots in light and dark, plus temporary preview pages for states the snap tool can't click into (filled cart with errors, toast, the "added" badge, sold out, not found). I fixed what they turned up: a mobile toolbar wider than the screen, the toast covering the mobile "Place order" bar, breadcrumb spacing, and too much space above the empty cart panel.

**What changed**
- **Tokens, fonts, filter SVG:** `src/styles/tokens.css` is a copy of the package's `tokens.css`, so dark mode follows the system setting or `data-theme`. Geist, Geist Mono, Instrument Serif and Caveat load from Google Fonts in `index.html`. `src/styles/base.css` is rewritten using only tokens, and the old variable names point to the new tokens.
- **Shared pieces:** the bloom, tape, pencil note, serif word with swash, and the filter SVG are reusable components in `src/components/Studio.tsx`. There is also a toast (`Toast.tsx`), a chip strip that scrolls with an edge fade on mobile (`useScrollStrip.ts`), and outline-only icons.
- **Shop (`/`):** full-width header band with the bloom, "Shop all *goods*" with the serif word and swash, and a pencil note beside the lead. The filter chips, in-stock checkbox and sort select are restyled. Product cards are whole-card links with a hover ring and focus ring, a mono category label, and a hatched image placeholder with an icon. Sold-out items get a neutral badge.
- **Product detail:** record-detail type with no studio marks. Variants are radio tiles. On mobile the title and price sit directly under the breadcrumb, and "Add to cart" moves into the fixed bottom bar. Adding to cart shows a toast, and the existing confirmation text becomes a success badge.
- **Cart:** item and checkout cards, totals in mono. Field errors get an icon, and a form submitted with errors gets a "N fields need attention" callout at the top. "Place order" sits in the fixed mobile bar, and placing an order shows a toast plus an "Order placed" badge.
- **Empty and not-found pages:** the empty cart, page not found and product not found each get a raised panel with one strip of tape, the small bloom and a pencil note on the button. The "no products match" message inside the grid gets no decoration.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and the pointer line in new `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged. The studio marks are static. The only motion is colour changes and the toast's fade and rise, and both drop to 0ms under `prefers-reduced-motion`.

**What I couldn't apply**
- **No commits, one per screen as the spec asks:** git wasn't in the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Temporary preview files still exist:** I removed the preview routes, but I couldn't delete `src/pages/TempPreview.tsx` and `TempPreview2.tsx`. They're now empty and marked as safe to delete — please remove them.
- **No taped "featured" item:** the product data has no featured flag, so I didn't invent one. `components.md` explains how to add it.
- **Pencil-note arrow gap:** with the spec's own recipe, the arrow lands about 15px from the empty-state buttons, slightly more than the 6–12px it asks for.

**Decisions I made**
- The cart and confirmation use the smaller record/settings heading size, since checkout isn't a home or collection page.
- The "Added … to your cart" badge holds a whole sentence, so it wraps with softer corners rather than staying a pill.
- From 1000–1199px the product grid shows 3 columns instead of fitting the 8-column grid; mobile shows 2 cards per row and hides the summary line.
- The space before the footer is 120px on desktop and 64px on mobile; the spec doesn't give a mobile value.
- On empty pages the heading inside the panel uses the empty-state title size.
- Fonts come from Google Fonts, which the spec allows. The smoke tests showed no console errors from loading them.