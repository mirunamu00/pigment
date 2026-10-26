Morning Shapes 0.1.0-rc.4 is applied to all four settings screens and the not-found page. Typecheck and build pass, all 8 smoke tests pass, and the final snapshot run shows nothing scrolling sideways. I checked every screenshot at 1440 and 390px, light and dark. The dialog, field errors, the "Saved" tick and the empty-sessions glyph only appear after you interact, so I checked those on a temporary route and then removed it.

**What changed**
- **Tokens:** a verbatim copy of `dist/tokens.css` is in `design-system/tokens.css`, loaded first. Dark mode follows the system setting, and `data-theme` on the page root can force either mode. The old CSS variable names in `src/styles/base.css` still work; they now point at the tokens.
- **Fonts:** Figtree (400/500/700) and DM Mono load from Google Fonts in `index.html`, with the spec's fallbacks.
- **Signature pieces** (reusable, in `src/design/` and `src/styles/morning-shapes.css`):
  - Color bands with curved edges: a header band that sags below the title, and a band that rises at the page end.
  - The flat shape kit: shaded discs, sparkles, clouds and seven small picture plates.
  - A drawing for each area's header band.
  - Slowly breathing glyphs that pause off-screen, plus a three-dot loader.
  - Every pill and circle button variant, sitting on its 2px ledge.
  - A one-time fade-in for the plates.
  - All motion stops under reduced motion.
- **Area colors:** Profile is yellow, Notifications blue, Security green, Billing orange, in nav order. Each colors its header band and sidebar dot.
- **Shell:** white top bar that gains a shadow after scrolling, a crescent-shaded initials avatar, and a cream sidebar where the current page is a dark pill with a white dot. A cream footer with a rising curve was added, as the spec requires one on every page.
- **Screens:**
  - **Profile:** header band, a large initials avatar, inputs and select restyled to spec, dark Save and cream Reset.
  - **Notifications:** cream group panels with picture plates and on/off switches on the ledge.
  - **Security:** password form with a colored strength dot, a framed sessions table, cream Revoke pills with red labels, and a breathing glyph when no other devices remain.
  - **Billing:** plan cards with the price as the largest type; the current plan is a violet card with a check. Also a cream payment panel and a framed invoices table with status dots.
  - **Not found:** cream band with the spec's error drawing and a dark "Go to profile settings" pill.
  - **Dialog:** white with a cream footer and a close circle; it becomes a bottom sheet on phones.
- **Docs:** `design-system/VERSION`, `components.md`, and `AGENTS.md` / `CLAUDE.md` pointers.

All routes, labels, form fields, `data-testid`s and accessibility attributes are kept. I added a "Close" button to the dialog and gave the table frames a focusable labelled region.

**What I couldn't apply**
- **No commits:** the spec wants one commit per screen, but I didn't commit; everything is uncommitted in the working tree.
- **No blue pill:** this product has no sign-up or purchase action, so nothing qualifies for the blue "conversion" pill.
- **No toasts:** the existing status messages stay inline (green tick and text) so their behaviour doesn't change.
- **Footer trimmed:** no signup field and no round icon buttons, because the app has nothing for them to do.
- **No ink pill in the empty-sessions state:** there is no action to offer there.
- **Three icons drawn as CSS masks:** the tick, alert and chevron icons are small inline SVG masks. They hold no visible colors, but they are values outside the token file.

**Decisions I made**
- **Area colors instead of cream:** the spec says settings areas take cream. Since this whole product *is* settings, I gave the four sections the category colors so each is recognisable at a glance.
- **Selected plan in violet:** violet isn't used by any area and stands apart from Billing's orange band.
- **Profile and Security forms sit on white:** the spec's form rule, so cream buttons stay visible. Notifications groups and the payment method use cream panels.
- **Narrow screens:** below 1024px the sidebar becomes a row of pills that scrolls sideways inside itself. Wide tables scroll inside their frame with a sticky first column.
- **Header band height:** it is sized from the content column's width instead of the screen's, because of the sidebar.

One risk: if Google Fonts can't be reached, the browser may log a console error, which would fail the "no console errors" smoke test. It passed here with network access.