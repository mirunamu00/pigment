Morning Shapes 0.1.0-rc.3 is applied to every screen: home, pricing, customers, sign up, 404 and the shared header and footer. The build and typecheck pass, all 15 smoke tests pass, and no page scrolls sideways. I checked the screenshots at 1440px and 390px, light and dark, plus the 404 page on its own. Dark mode follows the system setting, as the spec defines.

**What changed**
- **Tokens:** `design-system/tokens.css` is a verbatim copy of the package's `tokens.css`, and `src/styles/base.css` now imports it. The old variable names are aliased onto the new tokens, and the stylesheet is rewritten on top of them. Figtree and DM Mono load from Google Fonts in `index.html`.
- **Reusable pieces in `src/components/ms/`:**
  - Color bands with the three edge shapes (arc down, arc up, wave), including the compact header band with its shape cluster.
  - The crescent-shaded shape kit: discs, two-color discs, sparkles, moon, cloud, pill, spot plates, item covers, four clusters and initials avatars.
  - Sixteen pictograms, each drawn for a subject in this product.
  - Breathing glyphs and the pop-dots loader.
  - Confetti openers.
  - The pill, tab and segmented-control styles, the vignette, and a motion hook. The hook fades content in once, builds the vignette, and pauses glyphs off screen. All motion stops under reduced motion.
- **Area colors:** Features yellow, How it works blue, Pricing green, Customers orange. Sign up, the 404 page and the footer are utility areas, so they are cream.
- **Home:** yellow hero with an arc, a booking-week vignette, one blue and one white pill, and five shapes, one of them drifting. Also confetti openers, cream feature cards with pictogram plates, a breathing glyph, three stat tiles, avatar testimonials, a ruled FAQ whose plus turns into ×, and a pink closing band with the one oversized ("mega") pill.
- **Pricing:** dark night band with a wave edge and a cluster, segmented billing toggle, white plan cards with the popular plan on violet, and a framed comparison table with a sticky first column on phones.
- **Customers:** orange header band, cream quote card, filter pills with the selected dot, and case cards with category-colored covers and tags.
- **Sign up:** cream header band, restyled inputs, select, custom checkbox and error lines with an alert glyph, and a blue "Create account" button. The success state shows an envelope and an orbiting sparkle.
- **404:** cream band with the spec's error composition and a dark pill home.
- **Footer:** cream band with an arc, the newsletter field with a dark pill, and a dark bottom bar.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and one-line `AGENTS.md` and `CLAUDE.md` pointers.

**What I could not apply**
- **One commit per screen:** not done, because git wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **Old placeholder files:** `IconPlaceholder.tsx` and `ImagePlaceholder.tsx` are no longer used, but I couldn't delete them for the same reason.
- **Mobile menu:** it doesn't trap focus, and it has no pills at the bottom. The smoke test requires exactly four links inside the menu.
- **Footer icon buttons:** the site has no social links, so the dark bottom bar has a single "Back to top" circle.
- **FAQ open animation:** the answer fades in rather than growing from zero height, because the panel uses the `hidden` attribute.
- **Industry colors:** Customers uses five industry colors, one more than the spec's limit of four per view.
- **Vignette in snapshots:** the screenshots catch the hero cards mid-animation. With JavaScript off, or after about 1.7 seconds, they are complete.

**Decisions I made myself**
- **Pricing:** it gets the spec's night band, so its green shows only in the nav dot, the eyebrow dot and the green coin shape.
- **Closing band:** pink, so the blue mega pill can sit on it.
- **Covers and plates:** each case study has its own cover drawing, so neighboring cards never share one. Feature and stat plates are white so they show up on the cream cards.
- **Menu button:** it is now an icon circle. "Menu" and "Close" are kept as hidden text, so its accessible name is unchanged.
- **Mega pill on phones:** below 640px it wraps onto two lines, because it would otherwise be wider than the screen.
- **Hero lead width:** 24em, which is about the spec's 480px at that size; there is no token for it.
- **Small markup additions:** a few wrappers (select chevron, checkbox tick, a section around the featured quote) and an `aria-label` and `tabIndex` on the table's scroll frame. All test IDs, labels and fields are unchanged.