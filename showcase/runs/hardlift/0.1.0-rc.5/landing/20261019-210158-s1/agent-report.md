Hardlift 0.1.0-rc.5 is now applied to all five screens (home, pricing, customers, sign-up, 404), in light and dark. The build passes, all 15 smoke tests pass, and nothing scrolls sideways at 1440px or 390px. I looked at the screenshots of every page in both themes and both widths and found nothing wrong. The full-page home shots at 390px are heavily scaled down, so the mobile hero sticker strip is the least closely checked part.

**What changed**
- **Tokens:** `design-system/tokens.css` and `tokens.json` are copies of the package files. The CSS loads first. The old variable names in `src/styles/base.css` still work and now point to the new tokens. DM Sans loads from Google Fonts with the spec's fallback fonts, including the Korean ones.
- **Reusable pieces:**
  - **Buttons and pills:** lift buttons (pink, ink, ghost, small, block, icon, linked card, and the home hero plate) and outline pills.
  - **Bands:** a band style plus a `PageBand` header component. Each page sets its own band color in one place: home yellow, pricing teal, customers periwinkle, sign-up lime, 404 red.
  - **Stickers (`Stickers.tsx`):** a coin, star, arrow, calendar, speech bubble and tag, plus the spec's animation classes.
  - **Icons:** `Icon.tsx` holds 24px outline icons.
- **Screens:**
  - **Home:** a hero with four large tilted stickers that drift as you scroll and a pink CTA on an ink plate. Below it, a scrolling strip of customer names, outlined cards, numbered coins for the steps, and an ink stats block. The FAQ rows open with a rotating chevron, and the page ends with a yellow call-to-action band.
  - **Pricing:** pill toggle for monthly/yearly, pink price tags, and the comparison table in a bordered box that fits all four columns at 390px.
  - **Customers:** filter pills that become a scrolling strip on mobile.
  - **Sign-up:** inputs with a pink focus halo, a custom checkbox and select, error lines with an alert icon, and a success panel.
  - **404:** red band, one large sticker, one sentence, one return button.
- **Rules applied everywhere:** at most one pink button in view; the header "Sign up" and the newsletter "Subscribe" are always ink. All motion stops under reduced-motion.
- **Docs:** `design-system/` has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.

**What I couldn't apply**
- **No commits.** The spec asks for one commit per screen, but git isn't in the commands I was allowed to run, so everything is uncommitted in the working tree. For the same reason I couldn't delete the old `IconPlaceholder.tsx` and `ImagePlaceholder.tsx`; nothing uses them any more.
- **Release date:** the spec doesn't give one, so `VERSION` records today's date as the date it was applied.
- **Red band text:** black text on the red band is only about 4.3:1 contrast, below the 4.5:1 the spec claims. I kept only the large heading in the band and put the sentence below it on the page background.
- **Hero picture label:** the smoke test needs an accessible image in the hero, so the sticker group carries the original description text rather than being hidden from screen readers.

**Decisions I made myself**
- I kept the app's 720px menu breakpoint instead of the spec's 768px, because the project README requires it.
- The mobile menu is a panel under the header, not a modal dialog.
- Plan and customer cards don't lift on hover because they aren't links; the spec only lifts linked cards.
- I added a breadcrumb inside each page band and a one-line error summary at the top of the sign-up form, as the spec asks.
- The spinning-coin and outline-draw loading animations are defined but unused, because the app has no loading states.