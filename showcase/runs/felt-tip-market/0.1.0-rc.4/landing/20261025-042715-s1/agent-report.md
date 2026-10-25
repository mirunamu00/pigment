I've applied felt-tip-market@0.1.0-rc.4 to every screen: Home, Pricing, Customers, Sign up and the 404 page. The build passes, all 15 smoke tests pass, and the final screenshots at 1440px and 390px, light and dark, show no sideways scrolling. Routes, behavior, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What changed**
- **Tokens:** an exact copy of `tokens.css` is in `design-system/tokens.css` and loads first. The project's old CSS variable names still work as aliases of the new tokens. Space Grotesk and JetBrains Mono load from Google Fonts. Dark mode follows the system setting, or `data-theme` forces a mode.
- **Reusable signature pieces:**
  - `src/styles/felt-tip.css` holds the spec's recipes: lift-and-slam, plate stack, the 60px hero action row, poster bands and split bands, ink boxes and pills, the price flag, the logo marquee, and the reduced-motion rules.
  - Components: a sticker builder (`Sticker.tsx`) plus a kit of 7 original drawings for the product's own nouns: calendar pad, alarm clock, hourglass, invite mailer, mug, billing token, ticket.
  - Also a word badge, `PlateStack`, `PriceFlag`, a drawn week-view mockup on an ink slab, and line icons.
- **Screens:**
  - **Home:** a lemon hero band with 5 stickers that drift on scroll, with the plate-stack CTA beside an outline button. Then a marquee of customer names, white ink-framed feature cards, a periwinkle/black split band for "How it works" with a "booked" badge, a ruled stats strip, speech-bubble testimonials, and the FAQ as a white ruled list whose plus turns 45° when opened.
  - **Pricing:** a teal header band with the token sticker, pill billing toggle, pink price flags on plan cards (the yearly view strikes through the monthly price), and an ink-framed comparison table that scrolls with a sticky first column on phones.
  - **Customers:** a marigold header band with the ticket sticker, a statement quote with a marker highlight on the first sentence, pill filters and colored industry chips.
  - **Sign up:** a lemon title band, one white form panel with a pink submit and the spec's field, error and checkbox styles; the success state gets a "sent" badge and a plate-stack button.
  - **404:** a full-viewport periwinkle band, two stickers and a plate-stack recovery link.
  - **Shared:** every long page ends on the pink closing band; the black footer has a big headline, link columns and a white input with a pink arrow button.
  - Header: pill nav with a filled current item, a full-height "Sign up" block, and below 1024px a two-line menu button that opens a full-screen ruled panel.
- **Measured:** hero stickers are 256px and 158px at 1440 and 120px at 390, each about 70% visible, with a strip of about 14% of the object.
- **Docs:** `design-system/` now has `VERSION`, `tokens.css` and `components.md` (band map, sticker subjects, conventions), and `AGENTS.md` / `CLAUDE.md` each have the one-line pointer.

**What I couldn't apply**
- **One commit per screen:** git isn't among the commands I was allowed to run, so nothing is committed.
- **Pink limit:** Pricing uses pink in four roles (flag, focus halo, closing band, footer arrow button) against the limit of three. All four are placements the spec itself prescribes. I kept the popular plan's button black rather than pink so that page doesn't exceed two pink buttons.
- **Unused old files:** `ImagePlaceholder.tsx` and `IconPlaceholder.tsx` (the grey placeholders) are no longer used, but I couldn't delete them with the allowed commands. You can remove them.
- **Not built:** loading, toast and dialog styles, because no screen has those states. The loading-sticker animation exists in CSS but nothing uses it.
- **Not screenshotted:** the sign-up success state, because the snapshot tool can't fill the form. The smoke tests confirm it renders.

**Decisions I made myself**
- **Band colors:** Home and Features lemon, How it works periwinkle, Pricing teal, Customers marigold, Sign up lemon (the cycle repeats), 404 periwinkle.
- **Hero image:** the grey placeholder became a drawn calendar mockup that keeps its `role="img"` and label, placed below the hero buttons.
- **Text kept but visually hidden:**
  - The menu button shows two lines; "Menu" and "Close" are kept as screen-reader text.
  - The newsletter button shows "→"; "Subscribe" is kept as screen-reader text.
  - In the closing band, "Compare plans" is now an underlined text link, because the spec allows one white button there.
- **Small layout and color calls:**
  - Below 1200px the hero shows 4 stickers in a reserved top row and along the bottom edge, so they never overlap the headline on tablets.
  - Industry chips use band colors, with white for Hospitality because pink is reserved for actions.
  - I added a small "Your trial includes" heading above the sign-up checklist.
  - Rules inside the black footer are white hairlines, since ink lines are invisible on black.