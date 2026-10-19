All four screens are restyled to Hardlift 0.1.0-rc.2, in both light and dark. The build passes and all 10 smoke tests pass. The final screenshot run shows nothing scrolling sideways at 1440px or 390px. I also checked screenshots of the filled cart, checkout errors, order confirmation, empty filter results, the 404 page and an unknown product, using a temporary route that is no longer registered. The measured sizes match the spec: buttons and inputs are 48px, the header is 80px, the card gap is 24px and the mobile page title is 30px.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package's `tokens.css` and loads first. The old variable names in `src/styles/base.css` now point at Hardlift tokens. DM Sans and JetBrains Mono load from Google Fonts in `index.html`.
- **Lifting buttons and cards:** every action button lifts with a hard shadow on hover. Add to cart, Place order, Clear filters, Continue shopping and Back to the shop are pink. The header cart button, the quantity buttons and the cart's Remove buttons are outline buttons. Product cards lift as a whole and the whole card is clickable.
- **Color bands:** a new `PageBand` component floods each page header with its section's color. Shop pages are teal (the detail page has a breadcrumb in the band), cart pages are yellow, and the 404 and unknown-product pages are red.
- **Pills:** the header nav (current page is a filled pill), the category filters (a scrolling strip on mobile) and the size/color options.
- **Stickers:** a new `Sticker.tsx` has a coin and a tag. The empty grid and empty cart use a 160px coin, the error pages a 160px tag and the order confirmation a 32px coin.
- **Motion:** every lift turns into a color change only under reduced motion. The keyframes for the spec's other sticker animations are in `base.css` but unused, because the store has no hero, loading state or tag list.
- **Controls:** the inputs, select and checkbox follow the spec. Field errors now have an alert icon, and a one-line summary appears at the top of checkout after a failed submit. The "added to cart" message is a card with the hard shadow that slides up.
- **Docs:** `design-system/` has `VERSION` and `components.md`. `AGENTS.md` and `CLAUDE.md` contain the one-line pointer.
- Every route, label, `data-testid` and accessibility attribute is kept. The only test-related fix was removing an invisible hit-area overlay from the option pills, because it sat on top of the radio button and blocked clicks.

**What I couldn't apply**
- **One commit per screen:** I was only allowed the five listed commands, so nothing is committed and all changes are in the working tree.
- **Copying `tokens.json`:** for the same reason I couldn't copy it into `design-system/`; `components.md` points to the package copy instead.
- **Deleting the preview file:** I couldn't delete the temporary preview page. `src/pages/PreviewPage.tsx` is now just `export {};` and nothing imports it, so you can delete it.
- **Hero and loading animations:** the scrolling hero shapes, the scrolling tag list and the loading coin don't appear anywhere, because the store has no landing hero, loading state or tag list.

**Decisions I made**
- **Image placeholders** use the band colors and pink with an ink glyph, as the imagery section asks. This does put several band colors on the grid page, which the one-band-color-per-screen rule would otherwise forbid.
- **Sticker accent color:** each sticker's second color follows the page's band color, to keep that rule elsewhere.
- **Glyphs:** the marks on the pink sticker faces stay black in dark mode so they remain readable.
- **Mobile header:** it shows the wordmark and cart on the first row and the two nav pills on the second, instead of a menu dialog, since there are only two links.
- **"Added to cart" message:** it stays in place under the form instead of becoming a bottom-left toast, because the app has no dismiss logic.
- **Price on the detail page:** it is plain large text, not a pink tag, so Add to cart is the only pink there.
- **Band text in dark mode:** the selected filter pill on the band uses the normal text color on its dark fill, so it stays readable.
- **Old spacing variables:** the old `--space-1` to `--space-8` names aren't kept, because they clash with Hardlift's pixel-named spacing (for example, the old `--space-4` was 16px and Hardlift's is 4px).