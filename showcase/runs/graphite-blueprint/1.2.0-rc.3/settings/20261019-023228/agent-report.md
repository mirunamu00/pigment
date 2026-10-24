I've restyled every screen (Profile, Notifications, Security, Billing and the not-found page) to Graphite Blueprint 1.2.0-rc.3, in light and dark. The build and typecheck pass, all 8 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I looked at every screenshot in both widths and both appearances and fixed what was wrong (details below), then measured the spec's numeric checks at 1440px.

**What changed**
- **Tokens and fonts:** `src/styles/tokens.css` is a straight copy of the package tokens. The app's old variables in `base.css` now point at the new tokens. Inter and Geist Mono are self-hosted through two font packages added to `package.json` (`@fontsource-variable/inter`, `@fontsource/geist-mono`); no font CDN. The root setup is as the spec describes, including the reduced-motion block.
- **Signature pieces:** each is a reusable piece in `src/components/signature/` and `src/styles/signature.css`, built to its recipe:
  - **Stage:** the spotlit panel.
  - **Dot glyph and dot meter.**
  - **Blueprint:** the isometric drawing helpers, plus a broken-connector version for errors.
  - **Spec plate:** the placeholder image tile.
  - **Shimmer and pulse:** the "working" and "live" effects.
  - **Screen and section heads:** `ScreenHead` and `SectionHead`.
- **Every screen:**
  - A screen head: small mono label, title, and a two-tone summary on the right.
  - Settings sections as split rows: a "01 / 02" counter, title and description on the left, controls on the right.
  - A sidebar with 16px icons, which becomes wrapping text pills under 1024px.
  - Pill buttons, the new fields and switches, and a sticky header.
  - Hairline tables that show only the first column and the status or action column on phones.
  - The dialog restyled, and a "n fields need attention" banner on failed form submits.
- **Profile:** the initials avatar sits in a live preview card on a quiet stage, updating as you type.
- **Security:** a pulsing dot beside "Active now", password strength as a dot meter, and an empty-state glyph when no other sessions remain.
- **Billing:**
  - Plans are a hairline grid of cards, each with a stack drawing of 1, 2 or 3 slabs. The stack lifts on hover or focus, except under reduced motion.
  - Invoices show status icons, with the status column kept visible on phones.
- **Not found:** an "ERR 404" state with a broken-connector drawing on a quiet stage.
- **Docs:** `design-system/VERSION`, `design-system/components.md`, and the pointer line in `AGENTS.md` and `CLAUDE.md`.

**Measured at 1440px:** the plan drawing fills 87 of its 96px. The plan grid, payment card and invoices table all end at the same right edge (x=1408). The Amount and Status heads line up exactly with their cells. Sections end 48px above the next rule.

**Fixed during review**
- The old `--space-2/4/6/8` variables shared names with the new spacing tokens and silently doubled every gap. I removed those old aliases.
- Plan cards with taller stacks pushed their names lower; they now share a baseline.
- The sidebar background stopped short on long pages.
- The last switch row had extra space before the section rule.

**Could not apply**
- **No commits:** the spec asks for one commit per screen, but `git` wasn't among the commands I was allowed to run, so everything is uncommitted in the working tree.
- **Tokens not copied into `design-system/`:** copying files wasn't permitted, so `components.md` points to `src/styles/tokens.css` and the package's `tokens.json`.
- **No release date:** the package doesn't give one, so `VERSION` uses today's date.
- **Unused pieces:** no screen has a missing image, so the spec plate is built but not used. Nothing runs long enough to justify a shimmer or a running dot glyph, so neither appears.
- **One button on 404:** the spec's error state has two buttons; the page has only one real action, so I didn't add a second.
- **No dialog close animation.**

**Decisions I made**
- **New copy:** a "Details" section title and description on Profile, and short descriptions for the Plans and Payment sections.
- **Two-tone on one sentence:** where a summary is a single sentence, I made the subject phrase dark and the rest grey.
- **Status choices:** a "Due" invoice uses the half-filled "in progress" icon. Password strength is a 3-dot meter, coloured by level.
- **Avatars** are 32px everywhere.
- **Stacking width:** split rows stack once the main column is under 880px. The plan grid goes to one column under 640px instead of two, since two columns would leave a gap with three plans.
- **Table rule at desktop:** the vertical hairline beside the pinned column only shows between 640 and 768px, where the table scrolls; at desktop width the spec's "no vertical rules" wins.
- **Notifications groups:** to put each group's title in the left column while keeping its accessible name, I float the `<legend>`.