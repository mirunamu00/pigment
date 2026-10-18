The Graphite Blueprint restyle is applied to every screen in light and dark. The build passes, all 9 smoke tests pass, and the last full screenshot run found no page that scrolls sideways at 1440px or 390px.

One thing needs your hand: my allowed commands can't delete files, so two temporary review files are still there. I emptied them (`export {};`) and nothing imports them; please delete `src/pages/ReviewPage.tsx` and `src/pages/ReviewStates.tsx`.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is a verbatim copy of the package's `tokens.css`, and the old CSS variable names point at it. Inter and Geist Mono load from Google Fonts with `display=swap`. Light and dark follow the device setting; there's no theme switch.
- **Signature pieces, reusable in `src/design/`:**
  - `Stage` (lit and quiet) with a `Fig` caption
  - `DotGlyph` with every pattern, plus the dot meter
  - the blueprint pieces: slab stack, broken connector, connected pair
  - `SpecPlate`
  - `ScreenHead` and `Opener`
  - empty and error states
  - 16px icons and 14px status icons
  
  The shimmer, live edge, pulse and caret are CSS classes in `src/styles/signature.css`.
- **Motion:** all of it stops under reduced motion, using the spec's global block plus explicit rules that hold each loop on its readable frame.
- **Shell:** grey sidebar with icons and a mono group label, which becomes a sideways-scrolling pill row under 1024px. The top bar is sticky and blurred, with a pill search box and a menu that opens like a popover.
- **Overview:** screen head; KPI cards with mono labels, large values and status dots; a dot-column chart on a quiet stage with a FIG caption that ends level with the activity panel; mono timestamps.
- **Tables (projects, team, files):** mono column heads, hairline rows, status icon plus word, mono dates. Under 640px only the first column and one pinned column show.
- **Project detail:** text tabs with a sliding indicator; the project's figure on a quiet stage with a caption; custom checkboxes with a mono `02 / 06` counter.
- **Settings:** an empty state with a dimmed blueprint stack.
- **Not found and unknown project:** a broken-connector blueprint on a quiet stage, `ERR 404`, and two buttons.
- Every route, label, `data-testid` and accessibility attribute is preserved.
- **Docs:** `design-system/VERSION` and `design-system/components.md`, plus pointer lines in new `AGENTS.md` and `CLAUDE.md` files.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but git wasn't among my allowed commands, so everything is uncommitted.
- **Not used:** no loops run anywhere, because the app has no loading, syncing or background work. The spec forbids fake working states, so the glyph loops, shimmer, live edge and pulse are built but not placed. The lit stage, split opener and dot field aren't used either: the app has no landing or content pages.
- **Not checked:** the snap script can't press Tab, emulate reduced motion or open menus. Keyboard focus, reduced-motion rendering and the open user menu weren't looked at in screenshots.

**Decisions I made myself**
- **KPI change dots:** the data doesn't say whether a change is good, so "up" is green and "down" is blue; neither is red.
- **Status mapping:** active is the in-progress icon, paused is the paused icon in grey, done is the green check.
- **Pinned column on small screens:** the projects table pins status; team pins active projects; files pins last updated, with the file size shown as a second line.
- **Pin divider:** the pinned column only pins (with its divider line) under 768px, so wide tables have no vertical rule.
- **Sizes:** team avatars are 32px because each row holds name and email. The project figure's stage is 180px tall rather than 240px so both columns end level.
- **Chart:** the current month is the highlighted series, and there are no grid lines.
- **New copy:** I wrote a summary line for Settings ("Workspace configuration. Managed by workspace admins.") and added an "All projects" button to the not-found page, because the error state calls for two buttons.