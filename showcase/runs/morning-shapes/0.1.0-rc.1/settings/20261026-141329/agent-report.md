I've applied Morning Shapes to all five screens (Profile, Notifications, Security, Billing, Page not found), in light and dark. The build and typecheck pass and all 8 smoke tests pass. The last screenshot run at 1440px and 390px shows no sideways scrolling. Routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged. I made no commits.

**What changed**
- **Tokens:** `design-system/tokens.css` is a verbatim copy of the package's `tokens.css` and loads first. The app's old variable names still work as aliases. Figtree and DM Mono load from Google Fonts. Dark mode follows the system setting, and `data-theme` forces a mode.
- **Signature pieces (reusable):** the CSS is in `src/styles/morning-shapes.css` and the React pieces in `src/components/ms/`:
  - color bands with sag, rise and night-wave edges, the header band and the contained panel
  - the shape kit: crescent and two-color discs, sparkle, cloud, eight spot-plate pictograms of this app's own subjects, avatars and the error composition
  - breathing glyphs that pause off-screen, the pop-dots loader and the choice row
  - every pill variant, tab pill and circle, plus the vignette and the fade-in on first view
  - all looping and entry motion stops under reduced motion
- **Shell:** white top bar with the shadow after 8px of scroll; cream sidebar with a dot in each area's hue and the current page as an ink pill. On phones the sidebar becomes a pill row that scrolls sideways and keeps the current pill in view.
- **Every settings screen** opens with a header band in its area's hue, a small sag arc, the title, one line of text, and 2–3 shapes on the right, one of which drifts slowly.
  - Profile: crescent-disc avatar and the form on white.
  - Notifications: cream panels with plates beside each group title, and switches built to the spec.
  - Security: password form plus a sessions table in a frame with a cream header row, and a breathing glyph when no other devices are signed in.
  - Billing: plan cards with the current plan in violet, payment method in a cream panel, invoices table with status badges.
- **Dialog:** white with a cream footer and a close circle; on phones it becomes a bottom sheet.
- **Not found:** cream band with the stone-disc and rain-cloud art and an ink pill back to Profile.
- **Docs:** `design-system/` (`VERSION`, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` pointers.

**Decisions I made**
- **Area colors:** rule 2 says settings areas take cream, but this whole app *is* settings. I treated its four sections as the product's areas and gave them category hues in nav order: Profile yellow, Notifications blue, Security green, Billing orange.
- **Phone header bands:** the spec's mobile CSS lets the title run under the art, so I keep one shape in a narrow column on the right instead.
- **Header-band shapes appear instantly** rather than fading in, following the spec's "product header bands appear instantly". A staggered fade also left two of the three shapes missing in every screenshot.
- **Plan buttons:** blue only for the next plan up; other upgrades are ink and downgrades cream. Plan cards use the page background so cream pills stay visible in dark mode.
- **"Revoke"** stays a small cream pill with a red label instead of an icon circle, so its visible text doesn't change.
- **"Saved" and similar messages** stay inline with a sparkle that turns once, rather than becoming toasts, to keep their current behavior.

**Not applied or left open**
- No vignette, loading state, confetti, footer or onboarding exists on these screens. Those pieces are built but not placed.
- The spec gives no update date, so `VERSION` records the date applied (2026-10-26).
- I only copied `tokens.css`, not `tokens.json`.
- Plates below the first screenful fade in when scrolled into view. A full-page screenshot never scrolls, so the Invoices plate looks missing there; it shows in a real browser.
- The dialog wasn't in the standard snapshots, so I checked it through a temporary route, now removed.
- **Delete these two files:** `src/pages/KitPage.tsx` and `src/pages/DialogCheck.tsx` are leftover visual-check pages. They're no longer routed, but I couldn't delete them because file deletion wasn't among the allowed commands.