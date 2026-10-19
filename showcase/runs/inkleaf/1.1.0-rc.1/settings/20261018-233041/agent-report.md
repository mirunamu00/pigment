Inkleaf 1.1.0-rc.1 is now applied to all five screens: Profile, Notifications, Security, Billing and Not found. The build and typecheck pass, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px in light or dark.

**One thing to know before you look at the screenshots:** on Billing, the Invoices table is missing from the full-page shots. On mobile, Payment method is missing too. The spec makes blocks below the fold fade in the first time you scroll a route into view. The screenshot tool captures the whole page without scrolling, so those blocks are still invisible when it shoots. In a browser they appear as you scroll. Under reduced motion they show straight away. I couldn't check those two blocks by eye. The Security sessions table uses the same table styles and looks right at both widths.

**What changed**
- **Foundation:** the token file is copied into `design-system/tokens.css`. Dark mode follows the system setting. The three web fonts come from Google Fonts. `src/styles/base.css` is rewritten to use tokens only, and includes the global reduced-motion rule.
- **Signature pieces** (in `src/components/inkleaf/`):
  - Hand-drawn pictograms that draw themselves in once, in frame steps. The ink-texture filters are added once at the app root.
  - The pastel stage with wandering lines.
  - Headings that fade in word by word.
  - The "working" glyph and breathing dot.
  - The ring-style buttons.
  - The product screen header is shared by every screen, in `src/components/PageHeader.tsx`.
- **Drawings:** eight original ones.
  - Screen headers: badge (Profile), megaphone (Notifications), pinched key (Security), coin purse (Billing).
  - Plan cards: teacup on a hand (Free), teapot (Pro), carried basket (Business).
  - Not found: map with a pointing hand.
  - Four of the eight show a hand, each in a different pose. Header drawings play once per session.
- **Shell:** a sticky header with the product name in serif and a square initials tile. The sidebar has icons and a highlighted current item. Below 992px it collapses into a menu button that opens a sheet. The `data-testid` values and `aria-current` stay as they were.
- **Screens:**
  - Profile and Security: restyled forms (inputs, select chevron, hints, errors), with a check-circle beside "Saved".
  - Notifications: spec switches, and the two groups as cards with serif titles.
  - Billing: the plan cards sit on a sage stage, with the current plan outlined in ink and marked with a badge.
  - Both tables restyled. Under 834px each row becomes a stack of labelled values.
  - Invoice status badges now use a colored dot.
  - The dialog is restyled, with its own dark-mode shadow and ring.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but git isn't in the commands I was allowed to run. Everything is uncommitted on `main`.
- **Working glyph and breathing dot are built but not placed anywhere.** Every action in the app happens instantly, and the spec forbids adding fake delays.
- **Drawing quality:** the Security key's pinching fingers read a bit like a keyring at full size, though the key itself is clear.
- **Temporary review page:** I used one to view the drawings larger, then took its route out. I couldn't delete the file, so `src/pages/TempDrawings.tsx` remains as an empty stub. You can delete it.

**What I added or decided myself**
- **New text and behavior:**
  - A failed submit on Profile or Security now shows "N fields need attention" (`role="alert"`).
  - Not found gets a second action, "Go back", because the spec calls for two.
  - The mobile menu button has the label "Menu".
- **Animation:** only the h1s fade in word by word; panel titles stay static.
- **Billing stage:** the three plan cards each take about a third of the stage, though the spec asks cards on a stage to span 60% of it. I read that rule as meant for a single card.
- **Smaller calls:**
  - The large profile avatar is 80px.
  - Password strength is shown as secondary text with a colored dot.
  - Revoke is a small secondary button.
  - Form cards are capped at form width; tables are full width.
- **Spec docs:** written in `design-system/` (`VERSION`, `components.md`), plus one pointer line each in new `AGENTS.md` and `CLAUDE.md`.