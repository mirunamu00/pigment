The Felt-tip Market restyle is applied to all five screens: Profile, Notifications, Security, Billing and the 404 page. The build passes, all 8 smoke tests pass, and the final snapshot run reports no sideways scrolling. I checked each screen at 1440px and 390px in light and dark and fixed what was wrong. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What I changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of the package file. The app's old variable names in `src/styles/base.css` now point to the new tokens, so nothing that used them breaks. Light and dark both work, following the system setting or a `data-theme` attribute.
- **Fonts:** Space Grotesk (400–700) and JetBrains Mono (400) load from Google Fonts in `index.html`, as the spec allows.
- **Reusable pieces:**
  - `src/styles/signature.css` holds the lift-on-hover and slam-on-press for buttons, the plate stack, bands, ink frames and ruled groups, pills, the dashed empty box, the price flag, the glyph box and the sticker styles.
  - `PageHeader.tsx` is the area header band (breadcrumb, title, lead).
  - `stickers/Sticker.tsx` builds stickers with the spec's five-step thick construction, plus a word badge. The kit in `stickers/kit.tsx` has three objects: a key, a padded mailer and a phone.
- **Area colours:** Profile is lemon, Notifications periwinkle, Security teal, Billing marigold, in nav order.
- **Shell:** an 80px top bar (64px on smaller screens) with the user as a block on the right. A 240px sidebar of underlined section links, where the current one is the filled pill. Below 768px the sidebar becomes a wrapping pill row. A black footer with a big headline and a column of links.
- **Each screen:**
  - **Profile:** inputs with a pink focus band and black ring, a 2px danger border plus a "!" disc for errors, and a dashed placeholder box for the profile photo.
  - **Notifications:** ruled switch rows with pink-when-on switches, and the "N of 6 on" count as a price flag in the band.
  - **Security:** the password-strength hint is a coloured dot, not coloured text. Tables scroll inside their frame on phones with the first column fixed. When no other sessions remain, an empty box with the phone sticker appears.
  - **Billing:** plan cards with price flags, and the current plan has a thick pink border and pink check disc. Invoices have a flag on each amount and status pills. The payment card shows as a glyph box.
  - **Dialog:** a ruled header with a Close button, a static hard shadow, and an 8px drop-in. On phones it sits at the bottom of the screen.
  - **404:** a full-height band with the key and mailer stickers and the plate-stack recovery button.
- **Motion:** lift, slam, plate jump, the switch knob slide and the dialog drop all stop under reduced motion.
- **Docs:** `design-system/VERSION` and `components.md` (colour map, sticker subjects, where each piece is used), plus the one-line pointer in new `AGENTS.md` and `CLAUDE.md` files.

**What I couldn't apply**
- **One commit per screen:** git isn't among the commands I'm allowed to run, so all changes are uncommitted in the working tree.
- **Footer input:** I left out the footer's input with the pink arrow button. There's no feature behind it, and it would push Billing past the three-pink-roles limit.
- **Unused pieces:** heroes, split bands and the loading sticker don't apply to these screens. The word badge and the loading-sticker style exist but no screen uses them yet.
- **Leftover file:** I couldn't delete the temporary sticker review page, so `src/pages/KitPreview.tsx` is now an empty stub that nothing uses. Please delete it.

**Decisions I made myself**
- Settings headers count as "quiet", so they have no sticker. Stickers appear only on the 404 page and in the sessions empty state.
- In the sidebar, other sections are underlined links and only the current section is a filled pill. The spec asks for underlined links in settings and a filled pill for the current item, so I used both.
- The 404 page uses the periwinkle band, because the lemon plate behind its button would disappear on a lemon band.
- Avatars are 4px-corner squares with an ink outline.
- The VERSION file says "applied 2026-10-25" because the spec doesn't give an update date.
- The table scroll areas are now keyboard-focusable regions with labels, as the spec's table section asks.
- Revoke is a compact button with the red danger border.
- The plan dialog has a new Close button with `aria-label="Close"`.