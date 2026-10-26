The Inkleaf redesign is done across every page. The build passes, `node pigment-snap.mjs` reports no sideways scroll, and I opened the screenshots and fixed what didn't match the spec. I reviewed every page desktop light, plus mobile and dark for Today, the recipe, meal plan, shopping and settings, the 404 page and the recipes empty state (`/recipes?q=zzzz`). The remaining screenshots, and the interactive states the tool can't reach (add-to-plan popover, recipe picker and move dialogs, toasts, cook mode, shopping empty state), I didn't look at.

**What changed**
- **Foundation:** `design-system/tokens.css` is an exact copy of the package tokens. The fonts are now Source Serif 4, Instrument Sans and JetBrains Mono. `src/styles.css` is rewritten using only tokens, with light and dark following the system setting.
- **Signature elements** (`src/components/ink.tsx`, `drawings.ts`): the brush filters, cel-drawn pictograms that play once and hold, pastel stages with wandering lines, plates coloured by item id, headings that fade in word by word, and blocks that rise into view on a route's first visit. All of it stops under reduced motion.
- **Shell:** product name in the serif, a 240px sidebar with ink count badges, and a search field with its own clear button. Below 992px the sidebar becomes a menu button that opens a sheet. The old green logo mark and the sparkle icon are gone.
- **Every screen** has the same header: a small drawing (saucepan, whisk, jug, lunchbox, grocery bag, pepper mill), the h1 fading in, actions and lede. Tonight's dinner and the recipe photo sit on sage stages beside their text. Every recipe card, week day, plan slot and photo card shows its photo on a plate. Ratings are five ink dots. The progress ring is now a badge. Steps are numbered "01" in mono, and cook mode marks the current step with an ink rule.
- **Empty states** have their own drawings (recipe card on an open hand, a pointed-at shopping list); the 404 page has a large colander.
- **Kept:** all routes, copy, data, logic, every `data-testid` and accessibility attribute, and the native inputs.
- **Docs:** `design-system/` has `VERSION` and `components.md` (where each element is used, each drawing's subject and one-word reading), plus `AGENTS.md` and `CLAUDE.md` pointer lines.

**What I couldn't apply**
- No commits: the folder isn't a git repository, so there's no screen-by-screen rollback.
- The working glyph and breathing dot are styled but not used. Every action in this app is instant, and the spec forbids fake waiting.
- Recipe search and the plan picker are filtered lists, not tables, so the table toolbar and stacked-table rules don't apply.

**Decisions I made**
- **Motion arming:** block rise, below-fold heading fades and drawings start on the reader's first scroll, not on mount. They're off-screen either way, so a visitor sees the same rise. Without this, the full-page screenshots showed blank lower sections. The trade-off is that a page that's never scrolled (print, a full-page capture) shows everything final.
- **Navigation:** below 992px the old bottom tab bar is replaced by the spec's menu sheet. The `mobile-nav-*` test ids now sit on the sheet links, so a test that clicks them on a phone must open the menu first.
- **404 photo:** the herbs-chopping photo is gone; the colander drawing replaces it. That photo was decorative and appeared nowhere else, so it's now unused. Every other photo stays with its recipe.
- **Two layout calls:**
  - Section h2s on product screens are 25px, not the 52px content-page size, so they stay below the 36px h1.
  - Sections are 64px apart instead of 96–128px.
- **Smaller calls:**
  - The settings save bar is no longer sticky; on a phone it covered the fields.
  - Today's shopping card has a picked-up meter so the stretched panel has no empty band.
  - The three "Use it up" cards go to one column on phones rather than leaving one alone.
  - Stacked household avatars use a smaller font so the initials aren't clipped.
- **Drawings:** I made them by hand without zooming in. At 48px the pepper mill may read as a bottle and the lunchbox as a pot.