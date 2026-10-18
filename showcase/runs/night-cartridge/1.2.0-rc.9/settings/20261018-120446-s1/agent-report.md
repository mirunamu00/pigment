The whole app is restyled to Night Cartridge 1.2.0-rc.9: four settings screens plus the not-found page. The build and typecheck pass, all 8 smoke tests pass, and the last full snapshot run reported no sideways scroll at 1440px or 390px.

**What changed**
- **Tokens:** `design-system/tokens.css` is a verbatim copy of `dist/tokens.css`, and the app imports it. `src/styles/base.css` is rewritten on top of it: no rounded corners, transitions, soft shadows or light theme. The web fonts are loaded with the four links the spec gives, in `index.html`.
- **Pixel art** (`src/art/`): the spec's scene helpers, sprites and scene layouts. The app's world is a civic square at night. Each screen has its own strip scene led by a different building:

  | Screen | Lead building | Sign | Height (units) |
  |---|---|---|---|
  | Profile | Town hall with clock tower | HALL | 26 |
  | Notifications | Post office with belfry | POST | 24 |
  | Security | Gatehouse with portcullis | GATE | 24 |
  | Billing | Bank with colonnade | BANK | 25 |

  Each strip has 5–6 lights, 36–37 hand-placed details, and 5–6 supporting props in clusters (computed gaps, open ground 60–160 units). There are also two small 48×48 scenes (one for not-found, one for the empty sessions list) and the grass strip at the bottom of every page.
- **Motion:** stars twinkle, lights blink, clouds drift, one small creature bobs, and a shooting star or bird crosses rarely. All of it stops under reduced motion and with the header's Animation switch.
- **Reusable pieces** (`src/components/pixel.tsx`): the ▶ marker, pixel icons, block meter, callout, dithered rule, scene window, small scene frame, grass strip, name-coloured avatar, and the Animation and Pixel-body switches (saved between visits).
- **Screens:**
  - **Header:** sticky with the dithered rule underneath.
  - **Sidebar:** a marker menu; under 1024px it becomes a top menu.
  - **Profile:** two-column form, gold "Save changes", a 16-block bio-length meter, and error messages with a "!" icon, a short nudge and `role="alert"`.
  - **Notifications:** pixel switches with an On/Off word, and a 6-block meter for "3 of 6".
  - **Security:** a 12-block strength meter, a gold submit, a sessions table with the marker on the current device, and small red Revoke buttons.
  - **Billing:** plan cards with coloured top bars and 48px prices, with the current plan framed and marked. Invoice dates show as YYYY.MM.DD, and the dialog is a framed window with its own gold Confirm.
- **Docs:** `design-system/` (VERSION, tokens, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

Every route, label text, form field, `data-testid` and accessibility attribute is unchanged. I only added things: `role="alert"` on errors, `role="meter"` on meters, and the dialog's close button.

**What I couldn't apply**
- **Light appearance:** the spec is dark only ("no light theme or theme switch"), so the light and dark screenshots are identical.
- **One commit per screen:** git wasn't among the commands I was allowed to run, so nothing is committed.
- **One status region per screen:** Security keeps its original two `role="status"` regions (password and sessions); merging them would change existing behaviour.
- **Search button in the header:** left out, because the app has no search.
- **Tight spots in the strips:** the spec's own ridge ranges allow about 13 units of a single tone between the far ridge and the ground, just over the 12-unit limit. The sky reaches 41% of the strip's height when the hazy ridge sits low, against a 40% limit.
- **Sprite table:** there are no item sprites (no product images), so it doesn't apply.

**Decisions I made**
- Settings groups have 2px frames so only the scene window and the dialog get 4px frames, which keeps within the limit of three. Group titles are 32px headings with the dithered rule, placed above each group.
- The sidebar's current-item marker doesn't blink. The spec allows it but doesn't require it, and blinking made it disappear in half the screenshots.
- The grass strip has no top margin, so the sidebar runs down to it; the content area carries the clearance as padding instead.
- Sections get colours in the spec's order: Profile cyan, Notifications violet, Security blue, Billing amber. Plans take Free cyan, Pro violet, Business blue.
- The notifications count, bio length and password strength are shown as block meters.
- On phones the header switches show only their icons; their labels stay available to screen readers.
- The temporary review page I used to inspect the scenes at 2× is removed.