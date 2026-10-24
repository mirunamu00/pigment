The Night Cartridge restyle is applied to all four settings screens and the not-found page. The build passes, all 8 smoke tests pass, and the final screenshot pass shows nothing scrolling sideways at 1440px or 390px. The system is dark only, so the app has no light theme or theme switch, and the light and dark screenshots look the same.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a copy of the package tokens and `src/styles/base.css` imports it. The old CSS variables are mapped onto the tokens, and all radius, soft shadows and transitions are gone. The four web fonts the spec names are loaded in `index.html`.
- **Scenes:** the app's pixel world is a town records office square at night ("the Registry Yard"). Each settings section gets its own main building in the top scene:
  - Profile: a hall with a clock tower.
  - Notifications: a post office with a bell.
  - Security: a vault house.
  - Billing: an exchange booth with a "PAY" sign.

  The yard props around them are shared. Every screen has the ground strip as its footer. The not-found page has a small framed scene with the lights off and one red beacon light.
- **Motion:** stars twinkle, lamps blink, a cloud drifts, chimney smoke alternates between two frames, a bird crosses now and then, and meters fill block by block. All of it stops under reduced motion and with the header's Animation switch.
- **Reusable pieces** (`src/components/pixel`): the ▶ marker, framed windows, dithered rules, bullets, block meters, a callout box, the scene and ground strip, avatars and pixel icons. The art code is in `src/art/`.
- **Header:** sticky with the dithered rule below it, the product mark, two switches (Animation, Pixel body) saved in the browser, and the user's avatar.
- **Sidebar:** full height, with a ▶ marker and a colour per section. Under 1024px it becomes a menu above the content.
- **Screens:**
  - Profile: the form sits in a window with a gold Save button. Invalid fields shake once on submit and get a pixel "!" error message.
  - Notifications: pixel switches with an On/Off word, and the whole row toggles the switch.
  - Security: password form and the sessions table, with the current session marked.
  - Billing: plan cards with large prices; the current plan has a gold frame and the marker.
  - The change-plan dialog has a hard shadow, a close button and a gold confirm button.
  - Invoice dates now show as `2026.10.01`.
- **Meters added:** notifications on (3 of 6), bio length (out of 160) and password strength (out of 3).
- **Docs:** `design-system/` (`VERSION`, `components.md` describing the world, scenes and section colours), plus `AGENTS.md` and `CLAUDE.md` pointing to it.

Every route, label, form field, `data-testid` and accessibility attribute is kept. Additions are `aria-current` on the current session row, `role="alert"` on field errors, a "Close" button in the dialog, and a few headings (such as "Profile details") and labels.

**What I couldn't apply**
- **One commit per screen:** git isn't among the commands I was allowed to run, so nothing is committed.
- **Leftover review page:** I removed the temporary `/__art` route, but I couldn't delete `src/pages/ArtAuditPage.tsx` without a shell delete command. It is unused and not in the build; you can delete it.
- **Header nav items and search:** the app has no other top-level pages and no search, so I didn't invent any.
- **Danger zone:** there is no destructive settings group to frame.
- **Focus in the dialog:** it moves to Cancel rather than Confirm, because the tests require that.
- **Status regions:** Security keeps two `role="status"` regions (the spec wants one), because the tests use both.
- **Scene and mobile limits:**
  - The Security table hides the "This device" label behind its ellipsis at 390px. The ▶ marker still shows the current row.
  - The scene is composed for what the content column shows at 1440px. Between 1024px and roughly 1280px the outer props get cut off at the window edge.

**Decisions I made**
- Secondary groups use 2px frames so that no screen has more than three 4px-framed windows.
- Plans use the narrower 240px card grid so all three fit beside the sidebar. Plan cards get a neutral top rule instead of a colour bar.
- The Pixel body switch is included because the app has tables.
- The sidebar ends at the gap the spec's footer spacing leaves above the ground strip, rather than running into it.
- On touch screens every button grows to 44px, so table "Revoke" buttons are taller on phones.
- Only the main nav's ▶ marker blinks, so some screenshots catch it between blinks.

**Scene numbers** (from the code, checked on the temporary review page)
- **Settings scenes:**
  - 6 or 7 lights each, 85 or more hand-placed details, 16 stars.
  - The sky takes 40% of the height, and no single flat colour runs more than 12 units.
  - The main building is 23–25 units tall (46–50px) and is 4 or more units taller than any other prop.
  - Gaps between props, left to right: 5, 9, 144–145, 6, 2, 64–65, 4.
- **Not-found scene:** the hut and sign post span 28 of 48 units, with one beacon light.
- **Ground strip:** props at x 112, 355 and 596; the middle one is 22 units tall.
- **Item sprite table:** none; the app has no product images.