I've restyled all four settings screens, the change-plan dialog and the not-found page with felt-tip-market 0.1.0-rc.1. The build passes and all 8 smoke tests pass. On the final screenshot run (1440px and 390px, light and dark) nothing scrolls sideways. One mobile overflow on Security turned up along the way and is fixed.

**What changed**
- **Tokens:** `src/styles/base.css` imports the package's `tokens.css` unchanged, so no values were retyped. The old variable names still work as aliases. Dark mode follows the system setting, and `data-theme` forces a mode.
- **Fonts:** Space Grotesk (400–700) and JetBrains Mono (400) load from Google Fonts in `index.html`, with the fallbacks from the spec.
- **Reusable pieces** in `src/components/ft/`:
  - header band with breadcrumb
  - plate stack
  - price flag
  - pink check disc
  - six drawn stickers: ID card, bell, key, receipt, phone, disc token
  - a word badge and a rocking loading sticker

  The lift-and-slam hover, ink frames, pills, dashed empty box and switches are in the CSS. All motion stops under reduced motion.
- **Shell:** white top bar with a ruled edge block, a sidebar of nav pills with the current one filled (a pill row on mobile), and a black footer.
- **Band colours by area:** Profile lemon, Notifications periwinkle, Security teal, Billing marigold.
- **Per screen:**
  - **Profile:** ID-card sticker in the header, fields in one white panel, pink Save, pink focus outline on inputs, error messages with a "!" disc.
  - **Notifications:** ruled rows of switches, and the "N of 6 on" count as a pill with a status dot.
  - **Security:** password strength shown as a coloured dot, a framed sessions table, compact red-bordered Revoke buttons, and a dashed empty box with a phone sticker.
  - **Billing:** plan cards with price flags; the current plan gets a pink border and check disc. Every invoice amount gets a flag.
  - **Dialog:** white panel with a hard shadow, ruled header and footer, an 8px drop-in, and an added × close button.
  - **Not found:** lemon band, large headline, receipt and key stickers, and the recovery link on a plate stack.
- **Docs:** `design-system/` (VERSION and `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

All routes, labels, form fields, `data-testid`s and accessibility attributes are kept. I added a breadcrumb link, the dialog's close button, and made the table scroll areas keyboard-focusable regions.

**Not applied**
- **No commits.** The spec asks for one commit per screen, but git wasn't in the commands I'm allowed to run, so everything is uncommitted.
- **Leftover file:** `src/pages/FtPreview.tsx` held a temporary preview page. I couldn't delete it, so it's now an empty module and is safe to remove.
- **Footer has no input.** The spec's footer has an email field with a pink arrow button. Here it would be a field with nothing behind it, and it would add a fourth pink role on Billing, which the spec caps at three.
- **Pieces built but not used:** the word badge and the loading sticker have nowhere to go, because the app has no success screen or loading state. I only checked them on the temporary preview page.
- **Two parts of the spec weren't checked:** the sessions empty state appears only after revoking sessions, and the plate stack's hover fan-out needs a hover. Screenshots can't show either one.

**Decisions I made**
- The sidebar uses stacked pills rather than the underlined section links the settings recipe describes, because these sections are the app's main navigation.
- Only Profile, as the landing page, gets a header sticker, since the spec limits header stickers to overview screens.
- Header bands line up on the left with the page content instead of being centred.
- Tables and plan cards sit directly on the page background rather than inside a second frame.
- A few sizes the token set doesn't define (240px sidebar, 80/64px top bar, 72px avatar, 36×20 switch) are worked out from tokens.