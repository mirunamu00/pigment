I've applied Felt-tip Market to every screen: the shop grid, both product detail variants, the cart and checkout, the order confirmation, the empty states, and the 404 / product-not-found pages. The build, typecheck and all 10 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I checked every screenshot in light and dark, plus the states that need a click: cart with items, checkout errors, confirmation, the open mobile menu, the empty shop and the sold-out product.

**One file you need to delete:** `src/pages/PreviewPage.tsx`. I added it as a temporary route to screenshot those states and have removed the route. Nothing uses the file now, but I couldn't delete it because file deletion isn't among the commands I was allowed to run.

**What changed**
- **Tokens and fonts:** `src/styles/base.css` loads the package's `tokens.css` directly, so the values aren't retyped. Your old variable names still work as aliases. Space Grotesk and JetBrains Mono are now bundled with the app through two `@fontsource` packages in `package.json`, so no font requests go out at runtime.
- **Reusable pieces:** the hover-lift and press effect on every button and product card; one lifted main button per screen with two colored layers behind it; the colored header strip on each screen; a full-screen error version; the black footer; the outlined white panels, ruled lists, pill tabs and dashed empty boxes; the pink price tag; and five drawings of the store's own goods (tote, mug, key, tee, parcel) plus a "packed" word badge and a loading version.
- **Section colors:** Shop is lemon and Cart is periwinkle. Error pages use teal, which isn't one of your sections; it's just the next color in the spec's cycle.
- **Header and footer:** the header is white, with the current page shown as a filled pill and the cart as a black block on the right. Below 1024px it switches to a menu button that opens a full-screen list; Escape closes it and keyboard focus stays inside while it's open. Every page now has the black footer with a big headline, link columns and an email box with a pink arrow button.
- **Pages:** each screen has its colored header strip, outlined panels, buttons that lift, the price tag on every money figure, and drawings where the spec places them. Checkout errors get a 2px red border and a "!" marker, with the message text kept black.
- **Motion:** the drawings drift as you scroll and buttons lift on hover. All of it stops when the system asks for reduced motion.
- **Docs:** `design-system/` (`VERSION` and `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

Every route, label, form field, `data-testid` and accessibility attribute is preserved.

**What I couldn't apply**
- **No commits:** the spec wants one commit per screen, but git wasn't among the commands I was allowed to run, so all changes are uncommitted in the working tree.
- **Hover not checked visually:** the screenshot tool can't hover, so I checked the lift effects by reading the CSS, not by looking at them.
- **A few small hard-coded sizes:** some values in `base.css` aren't tokens, such as the check-mark drawing, the drawing sizes and the 44px tap-target minimum. The spec asks for none.

**Decisions I made myself**
- **Product images:** the placeholders are now a plain light ground with a line icon instead of the old tinted boxes. Those tints would have put a different color on every card, which breaks the one-color-per-screen rule.
- **Size and color choices:** these are outlined pills with a radio button; the chosen one gets a thicker black border.
- **"Added to cart" message:** it stays inline in the same place the tests read it, styled like a pop-up notice.
- **Checkmarks on the details list:** they're black rather than pink, so each screen stays within the spec's limit of three uses of pink.
- **Footer email box:** it's new and only shows a local "Thanks" message, because there's no backend to send it to.
- **Dark mode on colored strips:** text, borders and focus rings inside the strips stay black in dark mode, so the strips look the same in both modes as the spec requires.