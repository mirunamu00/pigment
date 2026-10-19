I applied Hardlift 0.1.0-rc.3 to every screen: Profile, Notifications, Security, Billing, the plan dialog and the not-found page. The build and typecheck pass, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I looked at every screenshot, plus a temporary preview route (since removed) for the dialog, field errors, the "Saved" confirmation and the not-found page. Every route, label, form field, `data-testid` and accessibility attribute is unchanged.

**What changed**
- **Tokens:** `src/styles/tokens.css` is a byte-identical copy of the package file and handles light and dark automatically. The old variable names in `base.css` still work as aliases.
- **Signature pieces:** the lifting buttons, pills, color band, badges and sticker animations are reusable classes in the new `src/styles/hardlift.css`. The band is `PageBand.tsx`, the stickers are `Stickers.tsx` and the icons plus the field error line are `Icons.tsx`. All motion stops under reduced motion.
- **Every screen:**
  - A full-width periwinkle band holds the page title and its meta text; the not-found page uses the red band.
  - Settings navigation is pills: a vertical list on desktop, a scrolling strip on mobile.
  - Forms have a pink focus halo, an error icon with each message, and one pink submit beside a ghost button that has no fill until hovered.
  - Tables sit in a bordered box with a 2px header rule, 44px rows and small row-action buttons.
  - Billing has pink price tags, a thicker outline on the current plan and status badges with an icon and a word.
  - The dialog has a hard shadow and slides in.
  - The not-found page has a 160px sticker and one pink return button.
- **Fonts:** DM Sans 400/700 loads from Google Fonts in `index.html`.
- **Hand-off files:** `design-system/` has `VERSION`, copies of the tokens and `components.md`. `AGENTS.md` and `CLAUDE.md` each have the pointer line.

**What I couldn't apply**
- **One commit per screen:** I made no commits, because `git` wasn't among the commands I was allowed to run. Everything is uncommitted on `main`.
- **Not used by any screen:** the landing hero, drifting shapes, tag wall and draw-on outline, because the app has no landing or onboarding page. The loading coin is built (`LoadingCoin`), but nothing loads. No card is a whole link, so the linked-card lift isn't used either.
- **Toasts:** status messages stay inline instead of floating bottom-left with auto-dismiss, so the tests' status regions and their timing are untouched. They are styled as hard-shadowed confirmations that slide up.
- **Hover lift:** the screenshot tool can't hover, so I checked the lift in the code, not on screen.

**Decisions I made myself**
- **Conflicting spec lines:**
  - **Header stickers:** one table says headers get no sticker, while the sticker section allows one small sticker in a settings header. I put one 32px sticker in each band, a different drawing per page.
  - **Switch colors:** one table says a switch turns pink when on; the switch component and the "Never" list forbid that. I made switches ink when on.
- **Spacing aliases:** the old `--space-4`/`--space-8` meant 16px/32px but now share names with the tokens, so they now mean 4px/8px. Nothing else used them.
- **Layout:** a section heading on the page background, then one card below it, so cards never sit inside cards. That moved the plan cards and the tables out of their old outer panels. Form cards use 24px padding (16px on mobile); the spec says 16px.
- **Small additions:**
  - "All / Paid / Due" filter pills on the invoices table.
  - A close button in the dialog.
  - An "On"/"Off" word beside each switch.
  - A one-line error summary at the top of the profile form.
  - A sticker in the empty sessions state.
- **Outline color:** stickers inside a band use the band's black text color for their outline, so they stay readable in dark mode.