I've restyled all four settings screens, the not-found page and the change-plan dialog with graphite-blueprint@0.1.0-rc.1, in light and dark. The final `node pigment-snap.mjs` run built cleanly and reported no sideways scroll. I checked the 1440px and 390px screenshots against the spec in both themes. I could not run the smoke tests (`npm run test:e2e`) because it isn't one of the commands I was allowed. Every `data-testid`, route, label, the `role="status"` regions, ARIA attributes and the native inputs and `<dialog>` are kept, so I expect them to pass, but that is not verified.

**What changed**
- **Tokens and fonts:** `src/main.tsx` imports `tokens.css` straight from the design package, so no values were retyped. Light and dark follow the device setting. Inter and Geist Mono load from Google Fonts in `index.html`. `src/styles/base.css` is rewritten to use only the tokens and includes the spec's reduced-motion block.
- **Signature pieces:** all six are built as reusable parts in `src/design/`, with their CSS in `src/styles/signature.css`. I checked each one alone on a temporary page in both themes before doing the screens.
- **Layout and screens:**
  - Shared: sticky blurred header and a 240px sidebar that becomes a scrolling pill row on small screens. Every screen opens with the same header block: mono label, h1 and a two-tone summary. Settings groups are split rows with a hairline above each.
  - **Profile:** one-column form with a mono bio counter. A failed save shows "N fields need attention", and a check icon appears beside "Saved".
  - **Notifications:** an inbox preview on a quiet stage that follows the push switches as you change them. Per-group counts in mono.
  - **Security:** a 5-dot strength meter, a live dot beside the current session's "Active now", and an empty state with the dot glyph. The table's actions column stays visible when the table scrolls.
  - **Billing:** plan cards in a hairline grid, each with 1, 2 or 3 stacked slabs by tier that lift on hover. Invoices use status icons.
  - **Not found and dialog:** a broken-connector drawing with "ERR 404" and two pills. The dialog gets a mono label and becomes a bottom sheet on phones.
- `design-system/` (`VERSION`, `components.md`), `AGENTS.md` and `CLAUDE.md` are added.

**What I couldn't apply**
- The app does no real async work, so the running dot animations, shimmer, caret and live edge are built but not placed anywhere. The spec forbids showing them for work that isn't running.
- The app has no missing images or content sections, so the spec plate, split opener and dot field are built but unused.
- Reduced motion: I couldn't emulate it with the snap tool, and the spec says not to change code to test it. The reduced-motion CSS is in place but untested.
- I didn't make one commit per screen as the spec's migration steps suggest, because you didn't ask for commits. Everything is uncommitted.
- I couldn't delete `src/pages/ReviewPage.tsx` with the allowed commands. It's now an empty stub and not routed; please delete it.

**Decisions I made myself**
- The page header summaries split the existing sentences into the two-tone style rather than adding new copy. I did add short new descriptions to some groups ("Details", the inbox preview, payment and invoices).
- Avatars are 24px in the header and 48px on the profile page. The spec only gives 16px and 32px sizes.
- "Revoke" is a quiet ghost pill rather than a red one. Unpaid invoices show the half-filled "in progress" icon. Plan switch buttons use the bordered style.
- I added a "Go back" button on the not-found page, which the spec's error state calls for, and a "N fields need attention" alert on both forms.
- I didn't keep aliases for the old CSS variable names. Several of them (`--space-2`, `--font-size-h1`) clash with the new token names, and the stylesheet was rewritten in one go.