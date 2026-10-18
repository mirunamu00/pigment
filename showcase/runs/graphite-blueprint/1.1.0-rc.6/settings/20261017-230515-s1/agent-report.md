Graphite Blueprint 1.1.0-rc.6 is now applied to every screen: Profile, Notifications, Security, Billing, the not-found page and the plan-change dialog. The build passes, all 8 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scroll. I didn't commit anything; the spec asks for one commit per screen, so say if you want that.

## What changed
- **Tokens and fonts:** `src/styles/tokens.css` is an exact copy of the package's file. Light and dark follow the device setting; there's no theme switch because the app never had one. Inter and Geist Mono are bundled from two `@fontsource` packages I added to `package.json`, not loaded from a font CDN. The old CSS variables at the top of `base.css` now point at the new tokens.
- **Signature pieces,** reusable, in `src/components/signature/` and `src/styles/signature.css`:
  - spotlit stage with its caption
  - dot glyph with all six frames, plus the dot meter and a "done" mark
  - isometric blueprint (stack, linked pair, broken pair)
  - spec plate
  - shimmer, live dot and caret
  - screen head, numbered group heads and two-tone text
  - Animations stop under reduced motion.
- **Shell:** sticky translucent header; 240px sidebar with icons and the current page highlighted. Under 1024px the sidebar becomes text-only pills that wrap, so all four show at 390px.
- **Every screen** opens with a mono label, the h1 and a two-tone summary, then settings groups as split rows (number, title and description left, controls right).
  - **Profile:** a live preview of your member card on a quiet stage above the fields, with a FIG caption; a banner after a failed save ("2 fields need attention"); a mono character counter; the dot-glyph-then-check mark beside "Saved".
  - **Notifications:** switch rows to the spec; the "3 of 6" count is a mono label.
  - **Security:** password strength shown as the dot meter; a failed-submit banner; the sessions table with Revoke pinned at the right (on mobile only device and action show); an empty-glyph state when no other sessions remain.
  - **Billing:** plan cards with 1/2/3 tier slabs in a hairline grid; invoices table with 14px status icons; the dialog has a mono label, a bordered Cancel and becomes a bottom sheet on phones.
  - **Not found:** broken-connector blueprint on a quiet stage, "ERR 404", and two buttons (profile link, Go back).
- Added `design-system/` (`VERSION`, `components.md`), `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged. One early test failure taught me that empty status regions must stay rendered, and they do. I checked the signature pieces large, in both themes, on a temporary page, then removed it; `App.tsx` is back to its original.

## Not applied
- **Spec plate, shimmer, live dot and running glyph loops** are built but not placed: there are no products or posts, and nothing in the app does real background work, which the spec forbids faking.
- **Exact measurements** (blueprint widths, rule distances): I checked them by eye in the screenshots, not with `getBoundingClientRect`. I didn't do the manual keyboard tab-through either.
- **Snapping paths from Git Bash:** it rewrites `/settings/...` arguments, so I passed paths with a leading `//`. That works for the not-found page; for the review page I put the content behind the top-level catch-all instead.

## Decisions I made
- The profile photo avatar is 48px; the spec only lists 16px and 32px.
- Phone nav pills are 32px tall rather than 44px touch targets.
- The invoice "Due" status uses the in-progress icon.
- Strength meter: weak is 1 dot (red), fair 3 (amber), strong 5 (green).
- Groups switch to side-by-side when the content area is at least 880px wide, rather than at a viewport breakpoint.
- I wrote short group descriptions and a second sentence on the not-found page. Existing copy wasn't changed.
- `VERSION` uses today's date because the spec doesn't give an update date.