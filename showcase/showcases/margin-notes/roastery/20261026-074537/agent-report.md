The redesign is done for every route. The final build passes, `node pigment-snap.mjs` reports no sideways scrolling at 1440px or 390px in light or dark, and the screenshots match the spec. I couldn't inspect the 390px captures closely: full-page shots are 5,000–9,000px tall and shrink too far to read. I checked them at that size and measured the key elements with `--measure` instead (mobile header, fixed action bar, shop filter chips, card sizes).

**What I changed**
- **Foundation:** `src/tokens.css` is an exact copy of the spec's tokens. `src/styles.css` is rewritten on top of those tokens, and the old house variable names point at the new values. Fonts are swapped from Fraunces/Inter to the spec's four (Geist, Geist Mono, Instrument Serif, Caveat), and the favicon is now ink and paper.
- **Shell:** the header and announcement strip are restyled. On mobile, the nav collapses to the bag button and a menu button that opens a sheet below the header. The footer is light paper instead of the dark brown band. The bag drawer is now a centred dialog that keeps keyboard focus inside it and returns focus when it closes.
- **Home:** the full-bleed photo hero is replaced by a header band with the watercolour bloom. "*Wednesday*" is the serif word with the brushstroke under it, and there's a pencil note beside the intro. The roaster photo now sits in a frame next to three stat cards. Tinted sections and the rust-coloured offer band are gone; the 30%-off offer is a raised card with tape.
- **Shop:** bloom, serif "*coffee*" and a pencil note. Filter chips and a 32px sort control; on mobile the chips scroll in their own strip. The Roaster's Choice promo is a taped feature card with its photo untouched, and the no-results message is a plain left-aligned panel.
- **Product:** a product page gets no decorative details, per the spec. 4:3 gallery with 64px thumbnails, segmented size picker, tabbed brewing guides, and origin facts as key/value rows with mono numbers and dates. On mobile, "Add to bag" sits in a fixed bar at the bottom.
- **Subscribe:** bloom, serif "*subscriptions*" and a pencil note. Segmented billing toggle (arrow keys now work), taped Duo plan, and "Continue to checkout" in the mobile bottom bar.
- **About:** serif "*cutlery*" only, framed photos and team cards. Legal and 404 pages are restyled with no decoration.
- **Feedback:** a new toast confirms add-to-bag and newsletter sign-up. In-place confirmations became green badges with a check. Newsletter errors show an alert icon and move focus back to the field.
- **Kept:** every route, `data-testid`, ARIA attribute, piece of copy and photo. Each coffee keeps its own photo. The subscriptions header photo moved next to the subscription FAQ.
- **Docs:** `design-system/` (`VERSION`, `components.md`), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**What I couldn't apply**
- **No commits:** the folder isn't a git repository, so there is no commit per screen. The rollback steps in the spec don't apply.
- **No token copy in `design-system/`:** that folder points to `src/tokens.css` rather than holding a second copy.
- **Update date:** the spec gives no update date, so `VERSION` uses 2026-10-19, the latest date in its changelog.
- **Theme:** dark mode follows the system setting. I didn't add a light/dark toggle.
- **Form error summary:** the newsletter has a single field, so I skipped the "N fields need attention" banner and just focus the field.

**Decisions I made**
- **Page types:** I treated Subscribe as a collection page (it gets the bloom and serif word) and About as an editorial story (serif word only).
- **Roast colours:** the roast meter and roast swatches are ink-only instead of brown tones, to keep the single-colour rule.
- **Stars:** review stars are outline icons, since the spec rules out filled icons.
- **Badges:** coffee tags moved off the photos into the card text, and the bag count is the one ink count badge per screen.
- **Select arrow:** the dropdown chevron is drawn by the field around it, so it follows the theme colour.
- **Product grid below 860px:** cards sit one per row on phones and two per row from about 600px.
- **Fonts:** Geist Mono may not be rendering. At screenshot scale some mono numbers looked like a system fallback. I couldn't confirm it with the commands I'm allowed to run.
- **Screenshot artefact:** most desktop captures show a faint horizontal line exactly 900px down (one viewport). I think it's a seam from how the full-page capture is stitched, not part of the page, but I couldn't confirm it.