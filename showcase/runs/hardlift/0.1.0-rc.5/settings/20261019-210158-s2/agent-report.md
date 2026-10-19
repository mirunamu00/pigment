Hardlift is applied to every screen in light and dark. The build passes, all 8 smoke tests pass, and the final screenshot run shows no sideways scroll at 1440px or 390px. I opened the Profile, Notifications, Security, Billing and not-found screenshots plus the dialog, toast and field-error states, and they match the spec. I also measured a few elements on Security: header 80px, buttons 48px, row actions 36px with a 44px tap area, table rows 44px.

**What I changed**
- **Tokens and font:** `design-system/tokens.css` is a verbatim copy of the package's tokens and loads first. DM Sans (regular and bold) comes from Google Fonts. Old variable names in `base.css` still work and point to the new tokens.
- **Reusable pieces:**
  - `src/styles/hardlift.css` holds the signature elements built to their recipes: lift buttons and cards, nav pills, the colored header band, and the sticker animations. All motion stops under reduced motion.
  - New components: `PageBand`, `Sticker`, `Icon`, `Toast` and `FieldError`.
- **Layout:** a white 80px top bar, then one yellow band for the whole settings area: the section links as pills, then the page title with a small sticker. On phones the pills scroll sideways.
- **Profile and Security:** outlined inputs with a pink focus ring, a pink save button and a plain-outline Reset. Errors show an icon beside the message plus one summary line at the top of the form. The sessions table sits in an outlined box with 2px-lift Revoke buttons, and on phones each row becomes a stacked block.
- **Notifications:** switches with black tracks and a visible On/Off word, in two cards side by side.
- **Billing:** plan cards with pink price tags, black "Switch" buttons and a thicker border on the current plan. Invoice and plan statuses use an icon plus a word. The dialog has a hard shadow, slides in 8px and gains a close button.
- **Not found:** red band, a large sign sticker, one sentence and a pink button back to profile.
- **Confirmations:** "Saved", "Password updated", "Signed out of…" and the plan change show as toasts at the bottom left. The existing `role="status"` elements and test ids are kept.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and `AGENTS.md` / `CLAUDE.md` now point to it. The temporary preview route I used for screenshots is removed.

**What I couldn't apply**
- **No commits:** git wasn't among the allowed commands, so nothing is committed, let alone one commit per screen. Everything is uncommitted in the working tree.
- **`tokens.json`:** not copied into `design-system/`; `components.md` points to the copy in the package.
- **Loading coin:** built as a reusable class but not shown anywhere, because the app has no loading states.
- **Not used:** breadcrumb, search field and mobile menu dialog. The app has no search, and the pill strip already covers phone navigation.
- **Toasts don't auto-dismiss after 5s:** that would change the existing behaviour. They close with their button, Escape, or the next edit.

**Decisions I made**
- **One band colour:** yellow for the whole settings area, with red only on the error page.
- **Sub-nav placement:** the section pills sit in the band rather than a sidebar. This keeps `nav` outside `main`, and the tests still pass.
- **Old spacing names removed:** `--space-1` to `--space-8` were dropped instead of aliased, because `--space-4` and `--space-8` now mean 4px and 8px in Hardlift.
- **Avatars:** rounded squares. The large profile placeholder is a yellow square with black initials.
- **Sizes and date:** the spec's pixel sizes (switch, dialog, toast, header) are built from tokens. `VERSION` uses today's date because the spec gives none.