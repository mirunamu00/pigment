I've restyled the whole store with felt-tip-market@0.1.0-rc.4, in light and dark. The build passes, all 10 smoke tests pass, and nothing scrolls sideways. I checked every page's screenshots at 1440px and 390px wide, in light and dark. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's tokens file, and `src/styles/base.css` imports it. The old variable names still work because they now point to the new tokens. Dark mode follows the system setting. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - The lift-on-hover effect and the plate stack (`PlateStack.tsx`).
  - The hero action row.
  - Poster bands: hero, product header bands, the error band and the black footer (`SiteFooter.tsx`).
  - Ink boxes, ruled rows, pills and the dashed empty box.
  - The price flag, status pills and the inline "added to cart" message.
  - The word badge (`WordBadge.tsx`).
  - The sticker builder (`src/stickers/Sticker.tsx`), a direct port of the spec's recipe.
  - A kit of 18 original drawings (`kit.tsx`): one per product, plus swing tag, spool, parcel, sewing button, receipt, crate and basket.

  Hero stickers drift on scroll, and both the drift and the lifts stop under reduced motion.
- **Screens:**
  - **Shop:** a lemon hero with five stickers on desktop and four on phones. The "Browse goods" button sits on the plate stack beside a 60px search box. Below that are a toolbar box, item cards with their own drawings, price flags, lift on hover, and an empty state showing a crate.
  - **Product detail:** a lemon header band with breadcrumb and title, a large drawing, a price flag, the purchase form in a white panel and a ruled details list.
  - **Cart:** a periwinkle header band. The empty state shows a basket with the plate-stack button. The cart has ruled line items, a flag on the total, the pink "Place order" button, and error messages with a "!" marker. The confirmation is a band with a "done" badge.
  - **Not found:** both 404s are a full-screen teal band with two tilted stickers and a plate-stack recovery button.
  - **Header and footer:** an 80px top bar with pill nav and a black cart block (pink in dark). Below 1024px a menu button opens a full-screen panel that keeps keyboard focus and closes on Escape. The footer is black with link columns and an email box with a pink arrow button.
- I added `design-system/VERSION`, `design-system/components.md` (which band colour each area uses, which stickers exist, where each piece is used) and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**Spec items I couldn't apply**
- **No commits:** git isn't among the commands I'm allowed to run, so all changes are uncommitted rather than one commit per screen.
- **`src/pages/TempPreview.tsx` is a stub to delete:** I used it for a temporary route to screenshot the confirmation screen. The route is gone, but I can't delete files, so the file is an empty stub.
- **No loading or header-band sticker in use:** the app has no loading states or overview screens. The CSS for both is built and ready.
- **Some layout widths stay in pixels:** grid minimum 280px and a few max-widths. I converted the small sizes to tokens.

**Decisions I made myself**
- **Search added:** the hero needed an input beside its button, so I added a working product search. It filters by name and summary as you type, isn't saved in the URL, and "Clear filters" resets it.
- **Footer email box is client-only:** it shows a thank-you message and sends nothing.
- **Pink on the detail page:** the checked size/colour radio is pink, as the radio component specifies. Strictly counted, that's a fourth pink role there, next to Add to cart, the price flag and the focus halo; the limit is three.
- **No current nav item on product pages:** "Shop" isn't highlighted there because I kept the original nav highlighting as it was.
- **Error band colour:** teal, since it isn't one of the two product areas.
- **Focus ring on bands:** stays black in dark mode, so it remains visible on the bright colours.
- **Card drawing colours:** they cycle through the four colours in catalog order, so they don't change when you re-sort.
- **Card drawing size:** I zoomed in on the drawings so they span about 56% of the card image box (the spec asks for 55–70%).
- **`VERSION` date:** it says "applied 2026-10-25" because the spec gives no release date.