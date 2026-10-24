All four settings screens and the not-found page now use graphite-blueprint 1.2.0-rc.5, in both light and dark. The build and typecheck pass, all 8 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scroll. I compared every screenshot with the spec and fixed what didn't match. I didn't screenshot the error, dialog or keyboard-focus states, because they need clicks or typing first. The smoke tests do exercise those flows.

**What I changed**
- **Tokens and fonts:** `tokens.css` is copied unedited to `design-system/tokens.css`, and the app's old CSS variable names now point at the new tokens. Inter and Geist Mono are self-hosted from two font packages I added to `package.json`. Light and dark follow the device setting.
- **Reusable pieces:** the spec's recipes are in `src/design/recipes.ts` and `src/design/Signature.tsx` (stage, dot glyph, dot meter, blueprint, spec plate, live dot, screen and section headings, status icons), with their CSS in `src/styles/signature.css`. Reduced motion stops every loop on a still frame.
- **Shell:** a 64px sticky header, and a 240px sidebar with icons. Below 1024px the sidebar becomes text-only pill tabs that wrap, so all four show at 390px.
- **Every screen:** a heading block with the h1 and a one-line summary, then sections laid out as rows with a "01 / 02" counter, title and description on the left and controls on the right. Form fields stop at 560px; cards, the plan grid and tables run to the column's right edge.
- **Profile:** a live preview of the member card on a lit panel above the fields. A failed save shows a "2 fields need attention" banner above the buttons, and the bio has a character counter.
- **Notifications:** the switches follow the spec. The legend is still the first child of each fieldset, so the groups keep their names for screen readers.
- **Security:** password strength shows as a 3-dot meter in the status colour, and the "Active now" session has a live dot. The sessions table shows only device and Revoke on phones. An empty-state glyph appears when no other sessions remain.
- **Billing:** the plans are cards in a hairline grid, each with a small isometric stack of 1, 2 or 3 slabs that lifts on hover. There is a payment card, and the invoices table uses mono IDs and dates with status icons. The dialog is a bottom sheet on phones.
- **Not found:** a broken-connector drawing on a lit panel, an "ERR 404" label and one inverse button.
- **Docs:** `design-system/VERSION` and `components.md`, plus the pointer line in new `AGENTS.md` and `CLAUDE.md` files.

**Measured (at 1440px):** the cards, plan grid and tables all end at x=1408. The number columns' heading and cells both end at x=1348. Each plan drawing fills 87px of its 96px box (91%). The gap from each section's last block to the next rule is 48px on desktop and mobile.

**What I couldn't apply**
- **No commits.** The spec wants one commit per screen, but git wasn't on the list of commands I was allowed to run, so everything is uncommitted.
- **The spec plate isn't used.** It's built, but nothing on these screens lacks an image.
- **Some spec elements have no place here.** Shimmer, loading glyphs and live borders only belong where real work is running, and nothing here does. The page-close statement and section openers are for content pages, not settings.

**What I decided myself**
- I added a short second sentence to some page summaries ("Save to apply.", "Check them often.", "Invoices are issued on the first of each month.") so they have the spec's two-tone form and fit on one line.
- The section descriptions are new copy. All label text used by the tests is unchanged.
- The current plan is marked with a stronger outline, a card fill and a "Current plan" badge inside the grid.
- Password strength maps to the meter as Weak or Too short = 1, Fair = 2, Strong = 3.
- Avatars are 32px everywhere. The spec says 16px for rows, but initials don't fit at that size in the header.
- The not-found page keeps its single action rather than the spec's two buttons.
- The spec gives no update date, so `VERSION` uses today's date.
- I checked the reusable pieces on a temporary page (route `/__review`) and fixed one difference: the error glyph was tinting its unlit dots red. The route has since been removed.