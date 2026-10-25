I've restyled the Account Settings app with felt-tip-market 0.1.0-rc.4: all four settings screens plus the 404 page, in light and dark. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px.

I checked every screenshot and fixed what was off: a sideways scroll on Security at 390px (from hidden labels in the table), the sessions table on phones, the 404 stickers cropping too much, and spacing on Notifications. I also looked at the stickers enlarged on a temporary route, which I removed afterwards. Each one is a single solid with one outline and a strip about 14% of its size along the whole lower edge.

The dialog, the error states and the saved state aren't covered by the screenshots, and I didn't check them visually. The smoke tests do exercise them.

**What changed**
- **Tokens and fonts:** `src/styles/base.css` imports the package's `tokens.css` directly, so no values were retyped. The old variable names still work, pointed at the new tokens. Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Reusable pieces:**
  - `src/styles/felt-tip.css` holds lift-and-slam, the plate stack, bands, ink boxes, pills, the dashed empty box, status pills, the price flag and the sticker styles, including drift and the loading rock, both switched off under reduced motion.
  - Components: `PageHeader` (the header band), `PriceFlag`, `PlateStack`, `SiteFooter` (the black footer), and a sticker builder `stickers/Sticker.tsx` with the drawings in `stickers/kit.tsx` (ID badge, bank card, folded map, compass, a word badge, a device glyph).
- **Screens:**
  - Each area has its own band colour: Profile lemon, Notifications periwinkle, Security teal, Billing marigold.
  - Profile and Billing get one sticker in their header band.
  - Forms sit in one white panel with pink submit buttons that lift on hover.
  - Inputs have the pink focus band and thick-border errors with a "!" disc.
  - Switches use the spec's pink-and-ink style.
  - Tables have an ink frame, a paper header row and ruled rows; on phones the first column stays put while the rest scrolls.
  - Billing shows price flags on plan prices and on invoice amounts.
  - The empty sessions state is a dashed box with a small device glyph.
  - The dialog has a hard shadow and drops in 8px.
  - The 404 is a full band with two stickers and a plate-stack recovery button.
- **Docs:** `design-system/` (VERSION and `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the one-line pointer.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted in the working tree.
- **Things this app has no place for:** a hero section, split bands, charts, a loading state, toasts, header-band search and tabs, and the dialog's close button (Cancel and Escape already close it). The word badge and loading sticker are built but nothing uses them yet.

**Decisions I made**
- **Current plan not marked in pink:** the footer's input and pink arrow button add pink roles to every page, so on Billing I marked the current plan with a thick ink border, an ink check disc and a "Current plan" pill. That keeps Billing at the spec's limit of three pink roles.
- **Which screens get stickers:** Profile is the landing screen, so I treated it as the overview, and Billing as the money screen. Notifications and Security keep plain header bands, as the spec's settings guidance asks.
- **Sidebar:** the section links are underlined, and the current one is the filled black pill. On phones it becomes a horizontally scrolling row; at 390px the last item is slightly cut off at the edge.
- **Footer input:** "Jump to a setting" really works. Typing "billing", for example, goes to that page.
- **Other choices:**
  - The 404 band is periwinkle, since it belongs to no area.
  - The "3 of 6 notifications on" count sits in a price flag, which the spec allows for counts.
  - Password strength shows as ink text with a coloured dot instead of coloured text.
  - The photo placeholder is a dashed box.
  - On bands, the focus ring stays black in dark mode so it remains visible.