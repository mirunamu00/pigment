I've applied graphite-blueprint@1.2.0-rc.4 to every screen: Home, Pricing, Customers, Sign up (including the error and success states), the 404 page, and the shared header and footer. The build and typecheck pass, all 15 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scroll on any page.

## What I changed
- **Foundation:** the spec's `tokens.css` is copied into `src/styles/`, so light and dark follow the device setting. The old CSS variable names now point at the new tokens. Inter and Geist Mono are self-hosted from two npm font packages I added to `package.json`; there is no font CDN.
- **Signature elements**, each built to its recipe as a reusable piece in `src/components/signature/`, with motion that stops under reduced motion:
  - **Product stage:** the home hero shows a mock of Hourglade's own week view on a stage lit from below. The view settles into place when it scrolls into view.
  - **Dot glyph and shimmer:** a working glyph and a shimmering "Syncing 3 calendars" line inside that week view. Every page close has the dot pattern behind it.
  - **Blueprints:** three captioned drawings for the "How it works" steps (a connected pair that animates, a stack, a box). Each plan card on Pricing has a small stack of 1, 2 or 3 layers by tier. Sign-up success and the 404 page also get one.
  - **Spec plates:** the featured story and all eight story cards on Customers, no two alike in a row or column.
  - **Section openers:** every content section opens with a hairline and a split headline. Pricing and Customers get a header row with the title left and the lead right.
- **Screens:** pill buttons with a single dark primary button, hairline card grids, filter chips, a segmented Monthly/Yearly toggle, the spec's table style, FAQ rows with a rotating chevron and open animation, and new form controls (field, select, checkbox).
- **Sign up:** a failed submit now also shows a "N fields need attention" banner above the button. The validation messages and focus behaviour are unchanged.
- **Docs:** `design-system/` (the spec's `VERSION` file, a copy of the tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointing to it.
- **Removed:** the two old placeholder components, which nothing uses any more. The temporary review page I used to inspect the signature pieces up close is gone too.

Every route, test id, label text and accessibility attribute is unchanged.

Measured values:
- **Blueprint widths:** 273px at 1440px, and 318px (91% of the column) at 390px. Their bottoms line up within 2px.
- **Closing statement:** one line at 1440px, two lines at 390px.
- **Comparison table:** each header ends at the same x as its cells at both widths.

## What I couldn't apply
- **Commits:** the spec asks for one commit per screen, but I didn't commit anything because you didn't ask me to. The changes are in the working tree; `package-lock.json` is new.
- **Mobile menu breakpoint:** the menu still collapses below 720px, not the spec's 768px, because the README and tests depend on 720px.
- **Comparison table on phones:** the spec shows only the first and one pinned column below 640px. A feature-by-plan grid has no single key column, so all plan columns stay visible; it fits at 390px.
- **Update date:** the spec gives none, so `VERSION` says so.
- **Arrow glyph:** "→" falls outside the Latin subset of the self-hosted Inter, so it renders in the system font.

## Decisions I made myself
- **Copy and links I changed or added:**
  - The closing heading "Give your team its time back" became the small label above a two-sentence statement: "Stop chasing. Start meeting."
  - Added a "See what each plan includes →" link to the Features opener.
  - Added a second button, "See pricing", on the 404 page, because the error layout calls for two.
  - The sign-up error banner text is new.
- **Layout:**
  - The FAQ lists sit in the right half of their opener, since there was no description to put there.
  - The "Compare plans" and "Customer stories" openers have no right-hand text, because there was none to use.
  - I removed the hourglass icon from the header, leaving the product name as text.
- **Motion:** the step blueprints have one looping animation (the connected pair). The stack also lifts once when it scrolls into view, which I didn't count against the "one animated" limit.
- **Plate captions:** every story's facts already show in its card, so captions read like "FIG 03 · STORY". The featured quote uses the Brightmoor story's plate.
- **Footer newsletter:** the error message is shown inside the banner itself, so the one-field form doesn't get two messages.
- **Sign-up form:** no step counters, because the form isn't multi-part.