All five screens (Profile, Notifications, Security, Billing, Not found) now use Hardlift, in light and dark. The build passes, all 8 smoke tests pass, and no page scrolls sideways at 1440px or 390px. I made no commits, because git isn't one of the commands I was allowed to run. So the spec's one-commit-per-screen rollback setup isn't there; you'd need to commit the work yourself.

## What changed
- **Tokens:** `design-system/tokens.css` is an exact copy of the spec's file and is loaded first. The old variable names in `base.css` still work as aliases, except `--space-4` and `--space-8`. Hardlift uses those names for 4px and 8px, while the old ones meant 16px and 32px, so I dropped the old meanings. DM Sans loads from Google Fonts.
- **Reusable signature pieces:**
  - `src/styles/signature.css` holds the lifting buttons and cards, the color bands, the pills, and the sticker animations. All of it stops moving under reduced motion.
  - `SettingsFrame.tsx` is the shared screen frame. It has a teal band with a breadcrumb, the title, the intro line and one 32px sticker. Next to the content is a pill sub-nav, which becomes a scrolling pill strip below 1024px.
  - `Sticker.tsx` has a different small sticker for each screen: a name badge, a speech bubble, a padlock and a coin. It also has a 160px signpost for the not-found page, which draws its outline in once, and a loading coin.
  - `Icon.tsx` has outline icons and a pink success mark.
- **Screens:**
  - **Profile and Security:** one pink submit button that lifts, ghost secondary buttons, inputs with a pink focus ring, error lines with an icon, a summary line at the top of a form with errors, and "Saved"-style confirmations with a check mark beside the button.
  - **Notifications:** switches built to the spec, with an On/Off word next to each.
  - **Billing:** pink price tags, a thicker border on the current plan, and invoice statuses shown as an icon plus a word.
  - **Tables:** each table sits in one bordered box, the Revoke button lifts 2px, and below 768px each row becomes a stacked block.
  - **Plan dialog:** heavy offset shadow, slides in from 8px below, and has a new close button.
  - **Not found:** red band, the signpost sticker, and a pink "Go to profile settings" button.
- **Docs:** `design-system/` (VERSION, tokens, components.md) and a one-line pointer in `AGENTS.md` and `CLAUDE.md`.

All routes, labels, form fields, `data-testid`s and accessibility attributes are unchanged. I checked every screenshot plus a temporary page for the error and dialog states (now removed).

## What I couldn't apply
- **Toast:** no screen uses one. All confirmations sit inline next to the button that triggered them.
- **Loading coin, landing hero with drifting shapes, scrolling tag wall, whole-card lift:** they're built to the recipes but unused, since the app has no loading states, landing page, tag lists or clickable cards.
- **Sticky table header, table filters, band search:** these features don't exist in the app, so I didn't invent them.
- **Update date in VERSION:** the spec doesn't give one, so the file records today's date as the date applied.

## Decisions I made
- **Band color:** the settings area uses teal throughout; red appears only on the not-found page.
- **Sub-nav:** a vertical pill list beside the content, with the current page filled in ink (the Navigation rule for sub-nav), rather than pills inside the band.
- **Section headings:** card and section titles are 24px rather than the spec's 30px for h2, because they work as card titles. Card padding is the spec's 16px.
- **Cards inside cards:** the Plans, Sessions and Invoices sections are plain sections under a 1px rule instead of cards. Otherwise the plan cards and tables would sit inside another card, which the spec forbids.
- **Sessions empty state:** it shows a check icon and one sentence inside the table box, with no sticker and no button. Security already has its header sticker, the spec allows one sticker per dense screen, and there's no useful action to offer.
- **Not-found draw-in:** the outline takes 8 seconds to draw, so a screenshot taken right after load shows it partly drawn.
- **Small additions:**
  - the breadcrumb at the top of each band
  - the error summary line at the top of forms
  - the dialog close button
  - the On/Off words next to switches