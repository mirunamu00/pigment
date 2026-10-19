I restyled every screen with Graphite Blueprint 1.2.0-rc.4. The build passes, all 10 smoke tests pass, and the final screenshot run (every page, 1440px and 390px, light and dark) reports no sideways scroll.

**What changed**
- **Tokens and fonts:** `tokens.css` is imported unchanged from the design package rather than retyped. The project's old variable names now point at the new tokens, and the old brand colour maps to the inverse pill, not the indigo. Inter (variable) and Geist Mono 400 are self-hosted through two font packages I added to `package.json`. Light and dark follow the device setting.
- **Signature pieces** (reusable, in `src/components/signature/`): stage, dot glyph and dot meter, blueprint, spec plate, shimmer/live edge/pulse/caret, and the screen head with two-tone text and openers. Each follows its recipe, and every loop stops on its rest frame under reduced motion.
- **Shell:** sidebar with mono group label and icons; below 1024px it becomes text-only nav pills that wrap. The sticky top bar is translucent with blur, pill search, and a user menu that animates open.
- **Overview:** screen head with Refresh as the one inverse pill. While refreshing it shows a 12px scan glyph and keeps its width. Metric cards have mono labels, 32px tabular values and a 6px status dot. The chart is redrawn as dot columns on a quiet stage with a FIG 0.1 caption. Its panel and the activity panel both measure 440px tall.
- **Projects table** (Overview and Projects pages): segmented filter pills, mono heads, mono dates, right-aligned numbers, 14px status icons. On phones only the first column and Status show. The empty filter shows a 48px empty glyph and a two-tone sentence.
- **Project detail:** the spec plate sits on a quiet stage, 240px tall, the same height as the tabs column beside it. The tab indicator slides, task checkboxes turn indigo when checked, and the files table is restyled.
- **Team:** the same table style, with 32px avatars and email as the second line.
- **Settings placeholder:** a blueprint stack at 0.8 opacity, a two-tone sentence and one pill.
- **Not found and project not found:** a blueprint with a broken connector ending in a 4px red point, on a quiet stage, with "ERR 404" and two pills.
- **Docs:** added `design-system/` (VERSION, tokens, components.md), plus `AGENTS.md` and `CLAUDE.md` with the pointer line.

**Measured** with the snap script's `--measure` (browser boxes): blueprint figures fill 91% of their svg at both widths, and the right-aligned heads (Budget, Status) end at the same x as their cells. I checked each signature piece alone on a temporary review route in both themes, then removed the route.

**What I couldn't apply**
- **One commit per screen:** git isn't in the commands you allowed, so nothing is committed.
- **Leftover file:** `Blueprint.tsx` is a one-line re-export I couldn't delete for the same reason. On Windows it clashed with `blueprint.ts`, so the real code lives in `blueprint.ts`.
- **The 1.5s refresh delay** stays, even though the spec bans artificial delays, because the tests depend on it. The "Refreshing…" label also keeps its ellipsis.
- **Shimmer, live edge and pulse** are built but not used: nothing in the app streams data or runs a job.
- **Update date:** the spec gives no update date for `VERSION`, so I used today's date.

**Decisions I made**
- I moved the Status and file Size columns to the right end of their tables so they can be pinned on phones.
- I added a period to two empty-state headings so they read as two-tone sentences.
- Not-found pages gained a second pill, "View projects".
- Avatars are 24px in the header and 32px in team rows, because two-letter initials don't fit the spec's 16px.
- The spec plate caption is "FIG 01 · PROJECT", because every other project attribute is already on screen.
- The metric dots are green whenever a number improves, which needed a small list of metrics where lower is better.
- I hid the browser's built-in clear button in search fields.