I've applied graphite-blueprint 0.1.0-rc.2 to all four settings screens, the not-found page, the shell and the dialog. The build and typecheck pass, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px in light or dark. I looked at every screenshot. Light and dark both follow the device setting; there is no theme switch, because the app doesn't have one.

**What I changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's file, imported first. Inter and Geist Mono are self-hosted through two font packages I added to `package.json`, so the app makes no font requests to other sites.
- **Signature elements:** all six are built as reusable pieces in `src/components/ds/`, with the spec's CSS copied as-is into `src/styles/signature.css`. I rendered each one alone on a temporary page in light and dark and compared it with its recipe; they matched, so the review loop needed no fixes.
- **Shell:** see-through sticky header, a 240px sidebar with mono label, icons and current row; under 1024px it becomes a pill row that scrolls inside itself. Pill buttons, hairline tables, 28×16 switches, native inputs styled per spec, and a native dialog with a mono label that opens and closes with a short fade.
- **Profile:** screen header, sections laid out as split rows (title and description left, controls right), one-column form, mono character counter, and a "N fields need attention" banner on a failed save.
- **Notifications:** a quiet-stage inbox preview driven live by the switches. It is inert and hidden from screen readers, and its sample text appears nowhere else on the page. Each group also gets a mono count ("2 / 3 on").
- **Security:** dot meter for password strength; a blueprint of the account joined to its devices, with a moving connector and one slab per signed-in device up to three; a pulsing dot on "Active now"; a 48px empty glyph when only this device remains.
- **Billing:** plans in a hairline grid with 1–3 tier slabs that lift on hover; status icon plus word on invoices; the status and Revoke columns stay pinned on mobile.
- **Not found:** a broken-connector blueprint on a quiet stage, "ERR 404", and two buttons.
- **Docs:** `design-system/` has the tokens, `VERSION` and `components.md`; `AGENTS.md` and `CLAUDE.md` have the pointer line.

Every route, label, `data-testid`, ARIA attribute and existing `role="status"` region is unchanged, and no new status regions were added.

**What I couldn't apply**
- The app does no real background work, so running glyph loops, shimmer, live edge, caret and toasts appear nowhere; the spec forbids faking a working state. The lit stage, spec plates and dot field have no place in a settings app either. All of these are built and ready.
- One commit per screen: git isn't among the commands I'm allowed to run, so everything is uncommitted.
- `src/pages/ReviewPage.tsx` (the temporary review page) is now a one-line stub. Its route is removed, but I can't delete files with the allowed commands, so please delete it.

**What I decided myself**
- **Avatars:** 28px in the header and 48px in the photo editor, instead of the spec's 16px and 32px, so the initials stay legible.
- **"Due" invoices:** shown with the half-filled warning icon.
- **Invoice dates:** secondary text color rather than tertiary, because they matter.
- **Content width:** capped at 1120px.
- **Second button on not-found:** "Go back".
- **New text:** short group descriptions ("Pick something you do not use on any other site.", "Charged on the first of each month.") and the inbox sample messages.
- **Timestamps on mobile:** the Location and Last active columns sit behind the pinned Revoke column and are reached by scrolling the table sideways inside its wrapper.