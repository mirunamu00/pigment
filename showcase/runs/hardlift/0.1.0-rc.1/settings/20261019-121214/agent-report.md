All four settings screens and the not-found page are restyled in Hardlift, in light and dark. The build passes, all 8 smoke tests pass, and the last screenshot run reported no page scrolling sideways at 390px. I opened the screenshots at 1440 and 390px in both themes and fixed what didn't match.

**What changed**
- **Tokens and fonts:** the tokens are copied into `design-system/` and loaded before the app's stylesheet. Old variable names in `src/styles/base.css` still work as aliases. DM Sans is self-hosted through `@fontsource/dm-sans`, so tests never depend on a Google Fonts request.
- **Signature pieces, all reusable:**
  - **Hard-lift buttons:** the `.lift` classes, used for Save/Reset, Update password, Revoke (small 2px row action), Switch plan (ink), and the dialog's buttons including a new close button.
  - **Color band:** a new `PageBand` component heads every page with breadcrumb and title. The settings area is yellow; the not-found page is red.
  - **Pills:** the side navigation. On mobile it becomes a strip that scrolls inside itself under the band.
  - **Coin sticker:** a `Coin` component with turning and draw-on animations. A 160px coin is on the not-found page and a 32px one is beside "No other devices are signed in."
  - All their motion stops under reduced motion.
- **Components:** cards, inputs with the pink focus ring, a custom select chevron, field errors with an icon, switches with a visible "On/Off", status badges with icon and word, bordered tables, and a dialog that slides 8px up. The status messages now show as toasts at the bottom-left.
- **Docs:** `design-system/VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md` with the one-line pointer.
- All routes, labels, form fields, `data-testid`s and accessibility attributes are kept.

**What I couldn't apply**
- **No commits:** git wasn't in the allowed commands, so the "one commit per screen" step didn't happen. Everything is uncommitted on `main`.
- **Temporary file left behind:** I added a temporary pieces route to inspect the dialog, toast, errors and coin, then removed it. `src/pages/PiecesPage.tsx` is still on disk because deleting files wasn't an allowed command. Nothing imports it; please delete it.
- **No sticker motion on the real screens:** the spec only animates stickers for loading, landing heroes and tag walls, and none exist here. I checked the turning and draw-on animations on the temporary route.
- **No toast close button:** a button inside the status region would become part of the announced text and break the tests. Toasts hide after 5 seconds (paused on hover) or on Escape. Only the look is hidden; the status text stays as before.

**What I decided myself**
- **One band color:** the whole settings area is one section, so it gets one color (yellow). On the error page the avatar placeholder turns red too, keeping one band color per screen.
- **Page layout:** the band spans the full width while the sub-navigation stays beside the content. Each page now wraps its content in a `page-body` element.
- **Sections with tables or plan cards** sit directly on the page with a 1px ink rule above, not inside a card, so cards never nest.
- **Additions:**
  - a breadcrumb in each band
  - a one-line error summary at the top of a form after a failed submit
  - aria labels on both tables
- **Sizes with no token** (80px header, 240px sidebar, 48×28 switch, 420px toast, 480px dialog) are worked out from tokens once, at the top of `base.css`.