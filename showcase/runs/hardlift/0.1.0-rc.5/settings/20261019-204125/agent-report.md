Hardlift 0.1.0-rc.5 is now applied to all four settings screens and the not-found page, in light and dark. The build passes, all 8 smoke tests pass, and nothing scrolls sideways at 390px. I looked at the screenshots at 1440px and 390px in both themes. I also used a temporary review route to check the open dialog, form errors, the empty sessions table, the loading coin and the error page; I've removed that route.

**What changed**
- **Tokens:** `tokens.css` is copied as-is into `src/styles/` and `design-system/`. The old variable names in `base.css` now point at the new tokens. DM Sans 400/700 loads from Google Fonts with the spec's fallback fonts.
- **Signature pieces** (`src/styles/signature.css`), built to the spec's recipes:
  - Hard-lift buttons: pink, ink, ghost, small, icon, linked-card and hero variants.
  - Pills that show their outline only on hover.
  - The coloured header band.
  - Sticker motion: coin turn, draw-on, drift and scrolling tag strip.
  - All motion stops under reduced motion.
- **New components:**
  - `PageBand`: breadcrumb, page title, a short line of text and the section pills.
  - `Sticker`: three drawings (coin, lock, signpost) plus a loading coin with "Loading...".
  - `Icon`: line icons.
- **Screens:**
  - **Every page:** an 80px top bar, then a periwinkle band holding the section pills. On phones the pills scroll sideways.
  - **Profile and Security:** form cards with a pink focus ring, error borders with an alert icon, a summary line at the top of the form, and a save row where the submit is the one pink button.
  - **Notifications:** 48×28 switches with "On"/"Off" text beside them.
  - **Sessions and invoices:** bordered tables. Below 768px each row becomes a stacked block with the Revoke button visible and 44px tall.
  - **Billing:** pink price tags, a thick border on the current plan, and status badges that pair an icon with a word.
  - **Dialog:** hard shadow, slides up 8px, close button.
  - **Not-found:** red band, a 160px signpost sticker, one sentence and a pink return button.
- `design-system/` (VERSION, tokens, `components.md`) is written, and `AGENTS.md` and `CLAUDE.md` each have the one-line pointer.

All routes, labels, form fields, `data-testid`s and ARIA attributes are kept. The extras are additive: a breadcrumb, a Close button in the dialog, and an error summary with `role="alert"`.

**What I couldn't apply**
- **One commit per screen:** git isn't in the commands I'm allowed to run, so all changes are uncommitted in the working tree.
- **Empty sessions table:** it has the 32px sticker and one sentence but no button, because there's no sensible action to offer there.
- **Loading:** no screen has a loading state, so the loading coin is built but not used anywhere.

**Decisions I made myself**
- **Section nav:** the old sidebar became pills inside each page's band, so the h1 and nav sit in the band. The settings area as a whole owns periwinkle, and red is used only on the not-found page.
- **Billing has no pink button.** The Switch buttons are ghost and the only pink is on the price tags, because none of those actions is the page's main one.
- **No nested cards:** sections holding the plan grid or a table are now plain sections with a heading instead of cards.
- **Desktop columns:** Security and Billing put two sections side by side at 1280px and wider; Notifications does the same from 1024px.
- **"Saved" stays inline:** it's shown next to the button (check mark on a pink circle) rather than as a toast, to keep the existing status region and how it's announced.
- **Placeholder photo:** the large profile avatar is a periwinkle square with ink initials, since the tests expect the initials text.
- **Sizes the spec gives without tokens:** the switch, the top bar height, avatar sizes and the 480px dialog width are composed from tokens where possible and listed in `components.md`.