The margin-notes 1.2.0-rc.1 restyle is applied to every screen. The build and typecheck pass, all 15 smoke tests pass, and the final snapshot run reports no sideways scroll at 1440px or 390px, light or dark.

**What changed**
- **Tokens and setup:** `design-system/tokens.css` is an unchanged copy of `dist/tokens.css`, loaded before `src/styles/base.css`. I rewrote `base.css` to use only the tokens, and the old variable names (`--color-text`, `--color-primary`, …) now point at token values. `index.html` loads the four specified fonts from Google Fonts and declares light and dark, so dark mode follows the system setting.
- **Signature elements:** `src/components/Studio.tsx` holds the shared filters (rendered once in `Layout`), the bloom, tape, pencil note and serif word with swash, each built to its recipe. `Icon.tsx` has the 1.5px outline icons, and `useScrollEdges.ts` handles the edge fade on the chip strip and the table.
- **Home:** bloom behind the header; "themselves" is the serif word, with the product's only swash; a pencil note on the lead. The hero image is now an empty media frame (tray, hatch, centred icon).
- **Pricing:** bloom; "team" is the serif word; the Team plan is pinned with two tape strips; the billing toggle is a segmented control; the comparison table sits in a frame with fixed column widths.
- **Customers:** bloom; "Teams" is the serif word; the featured quote is pinned with tape; filters are chips that scroll in their own strip on mobile; industry tags are neutral badges.
- **Sign up (form screen, so no studio marks):** two field columns from 860px, styled select and checkbox, error messages with an alert icon, and a "N fields need attention" danger message at the top of the form. The Create account button becomes a fixed bar at the bottom on mobile, and the success state shows a "Link sent" badge.
- **404:** an empty-state panel with tape, the small bloom behind it and a note on the button.
- **Throughout:** warm paper, ink buttons, coloured section backgrounds and 700 weight removed. The mobile menu is a sheet below the header. Motion is colour transitions plus the menu's fade-in, and it all stops under reduced motion.
- **Handover files:** `design-system/` (VERSION, tokens, `components.md` listing where each studio mark sits per screen), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

Every route, label, form field, `data-testid` and accessibility attribute is kept. I only added wrappers, classes and hidden icons.

**Not applied**
- **No commits.** The spec wants one commit per screen, but git wasn't among the commands I was allowed to run, so everything is uncommitted in the working tree.
- **No toast.** Each success is confirmed with a success badge instead, which the spec also allows.
- **No error summary on the footer newsletter form.** Its single field already shows its own error, so a summary felt redundant.
- **Old element types kept where tests depend on them.** The billing toggle and filters still use `aria-pressed` buttons rather than the spec's radio group, because the tests check `aria-pressed`. The ✓ and — characters stay in the comparison table because the tests read them.

**Decisions I made**
- I treated Pricing as an overview page, so it gets the bloom and a serif word, and Sign up as a form screen, so it gets no studio marks.
- **Pricing note moved.** On the lead it collided with the h1, so it sits on the billing caption instead ("yearly saves more").
- **Home hero stacked.** The text sits in the bloom band and the image goes below it at full width (16:10), so the bloom isn't hidden behind the image. The result is a very large hatched placeholder; you may want it smaller.
- **New visible text:** the newsletter success message now starts with a "Subscribed" badge and the sign-up success with a "Link sent" badge.
- **Small layout calls:**
  - FAQ sections use a split layout (heading left, list right).
  - The closing call-to-action is set off by a thin line rather than a card.
  - Space before the footer is 64px on mobile, which the spec doesn't state.
  - Step numbers and stat labels use the monospace font.