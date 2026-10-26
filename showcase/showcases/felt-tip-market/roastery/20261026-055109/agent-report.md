Kiln Street is now redesigned in Felt-tip Market across every page. The build and typecheck pass, and `pigment-snap` reports no sideways scrolling. I checked the screenshots at 1440px and 390px in light and dark, and fixed the problems they showed: a hero button that collapsed, a hero text column that ignored its width, product photos at different heights, the dark-roast swatch turning light in dark mode, and crowding on mobile.

**What changed**
- **Tokens and fonts:** the package's `tokens.css` is copied unchanged to `design-system/tokens.css` and imported by `src/styles.css`, which I rewrote from scratch. The old variable names still work. Space Grotesk and JetBrains Mono replace Fraunces and Inter. Dark mode follows the system setting.
- **Shared pieces:** the button lift-and-slam, the plate stack, the price flag, bands and split bands, ink-framed boxes, pills, dashed empty boxes and pink-bordered selected options. They live in `src/components/ft.tsx` and `src/styles.css`. Stickers are in `src/components/Sticker.tsx`.
- **Stickers:** seven original drawings: coffee bag, mug, bean, pour-over cone, mailer, empty scoop and coffee sack, plus a "traced" word badge. Each is the thick die-cut solid the spec describes.
- **Area colours:** Shop is lemon, Subscriptions periwinkle, Our story teal, Visit the roastery marigold.
- **Header and footer:** a white top bar with pill links, plus Bag and "Start a subscription" blocks at the right edge; a menu button and full-screen panel on phones. The footer is a black band with a pink joined Sign up button.
- **Home:** a lemon hero with five stickers that drift on scroll. Its action row is the plate-stack CTA beside an outline "Shop all coffee" at 60px. Below it come a white intro with three steps, the coffee cards, a black-and-periwinkle split band for the farm story, framed reviews, the photo strip, the FAQ and a pink closing band.
- **Shop:** lemon header band with the bag sticker, filters in a framed panel, cards with price flags, and an empty state with the scoop sticker and a plate-stack "Clear filters".
- **Product:** lemon header band with title, tasting notes and roast meter. The buy panel has a flagged price, size options with a pink selected border, the grind select, quantity stepper and a pink "Add to bag". Below are the origin table, pill tabs for the brew guide and related coffees.
- **Subscribe:** periwinkle band with the mailer sticker, pill billing toggle, plan cards with flagged prices, a framed builder, and a summary with a flagged total and a pink "Continue to checkout".
- **About:** teal band with the sack sticker, a black-and-marigold split band for the roastery, ruled grids for principles and team, and a framed visit card.
- **Other pages:** the legal pages get a lemon band and a framed text panel. The 404 is a full marigold band with two stickers and a plate-stack "Shop coffee".
- **Bag drawer:** a white panel with a hard shadow, ruled header and footer, a flagged subtotal, and a dashed box with a small bag glyph when empty.
- **Kept intact:** every route, `data-testid`, ARIA attribute and piece of behaviour. All photos stay with their coffee or section. The hero photo was removed from the hero, but that photo already appears in the roastery photo strip.
- **Docs:** `design-system/` now has `VERSION`, the tokens and `components.md` (area colours, sticker subjects, where each piece is used). `AGENTS.md` and `CLAUDE.md` point to it.

**What I couldn't apply**
- **Pink limits:** Home and Product show pink in up to four roles counting the keyboard focus halo, and the footer's pink button is on every page. In dark mode the spec turns black buttons pink. I limited the damage by making some secondary buttons outline.
- **Loading sticker:** the app has no loading states, so it isn't used.
- **`tokens.json`:** I didn't copy it into `design-system/`; it stays in the package.
- **One leftover file:** `src/pages/Review.tsx` is an empty stub from a temporary review page. The allowed commands can't delete files, so please delete it.

**Decisions I made**
- **Home and About:** treated as marketing pages, so each uses more than one band colour.
- **Legal and 404 colours:** legal pages take lemon, the fifth slot in the colour cycle; the 404 band is marigold.
- **Subscribe button:** "Sign up" keeps its text with an arrow, rather than the spec's arrow-only square, so the copy stays visible.
- **FAQ on phones:** questions drop to 24px.
- **Filter chips:** pressed chips show an ink outline plus a check mark.
- **Selected plan:** shown by a pink border and check disc; its button stays outline.
- **Header between 1024px and 1279px:** spacing is tighter and the word "Bag" is hidden. I didn't screenshot this range.