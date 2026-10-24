I've applied graphite-blueprint 1.1.0-rc.8 to every screen (Profile, Notifications, Security, Billing and the not-found page), in light and dark. The build passes, all 8 smoke tests pass, and the final screenshot run found no page that scrolls sideways. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens, fonts and root setup:** the package's `tokens.css` is copied in unchanged; light and dark follow the device setting. The app's old CSS variable names now point at the tokens. Inter and Geist Mono are self-hosted from the `@fontsource` npm packages — the only new dependencies. The global reduced-motion rule is in.
- **Signature elements**, each a reusable piece in `src/design/` built from its recipe:
  - **Spotlit stage:** on Profile it shows a live preview of the workspace member card; on the not-found page it holds the error drawing.
  - **Dot glyph and dot meter:** the meter shows password strength; the 48px "empty" glyph appears when no other sessions remain.
  - **Isometric blueprints:** plan cards show tier stacks of 1, 2 and 3 slabs that lift on hover. The not-found page shows two slabs with a broken connector ending in one red point.
  - **Spec plate:** built but not used; no screen here needs one.
  - **Live dot:** a pulsing dot beside "Active now" on the current session.
  - **Headings:** every screen opens with a heading block (small mono label, title, two-tone summary). Every settings group opens with a numbered "01 / 02" head and a one-line description.
- **Components:** pill buttons, fields and a native select with a chevron, an error banner above the form buttons on failed submits, switches, tables that collapse at 390px to the first column plus status or the Revoke button, badges, status icons, plan cards, the dialog (bottom sheet on phones), and empty and error states.
- **Layout:** sticky blurred header, a 240px sidebar that becomes wrapping pill tabs on narrower screens.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Checking:** I viewed every screenshot and fixed what was wrong: the sidebar fill stopped at 900px, the mobile nav hairline was cut short, Pro's feature rows stretched, two summaries wrapped, and the Notifications section heads broke on mobile. I also looked at each signature piece on its own at 2x through a temporary route, then removed it; `App.tsx` is back to its original.

**Not applied**
- **No commits.** The spec asks for one commit per screen, but `git commit` wasn't among the commands I was allowed to run. Everything is uncommitted in the working tree.
- **No running animations.** Glyph loops, shimmer, live edges and marching connectors are reserved for work that is really running, and nothing in this app runs. The connector on the not-found page is broken, so the spec says it stays still. Live motion is the pulse dot, the plan-card lift, and the dialog and switch transitions.
- **Spec plate unused**, as above.
- **No measurement pass.** The spec's verification asks for pasted `getBoundingClientRect()` numbers, a tab-through of every screen and an emulated reduced-motion check. Those need browser scripting I couldn't run with the allowed commands, so I checked from the screenshots only.
- **No closing animation on the dialog.** The native dialog closes instantly.

**Decisions I made**
- **Profile preview** repeats the live field values. The spec says a demo window's sample text should appear nowhere else; I read that as covering made-up demo content, not a real preview.
- **Plan cards** are separate cards in one column on phones. The spec's general rule is a hairline grid with 2 columns on mid-size screens, which would orphan the third plan.
- **Invoice status icons:** "Due" uses the half-filled warning ring and "Paid" the filled check.
- **Notifications group headings** use the real `<legend>`, floated into place, so the legend still names each group.
- **Not-found buttons:** I added "Go back" as the second button the error state calls for.
- **Copy:** I added short secondary lines to the screen and section heads, and the placeholder text "Member" and "No time zone" in the profile preview when those fields are empty.
- **Left edge:** a fixed 20px so the header name lines up with the sidebar items.
- **Header avatar** is 28px.