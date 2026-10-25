Felt-tip Market is now applied to every screen of the blog: home, both article routes, About, and the 404 / post-not-found page. The build and typecheck pass, all 9 smoke tests pass, and the final screenshot run (1440px and 390px, light and dark) shows no sideways scroll.

**What I changed**
- **Tokens:** `design-system/tokens.css` is an exact copy of the package's `tokens.css`. The old variable names in `src/styles/base.css` still work, now pointing at the new tokens. Light and dark both follow the system setting.
- **Fonts:** Space Grotesk and JetBrains Mono load from Google Fonts in `index.html`.
- **Signature pieces:** they're in `src/styles/signature.css` and `src/components/kit/`:
  - lift-and-slam on buttons and cards, and the plate stack behind the one main button per screen
  - full-width colour bands, including a header band whose sticker sits at the right edge
  - white boxes with 1px ink borders, ruled lists, pills and chips, and the dashed empty box
  - the notched pink flag
  - 14 original thick sticker drawings plus a "notes" word badge and a rocking loading sticker
  - drawn pictures for posts, which have no images of their own
- **Colours by area:** Home is lemon (articles count as Home, so they get a lemon header and Home stays the current nav item); About is periwinkle; error pages fill the screen in marigold; the footer is black on every page.
- **Home:** a hero band with six drifting stickers and a "Read the latest" button. The featured card has a "New" flag. Every post card has its own drawing, and nothing is drawn twice on the page. The empty search state shows an empty magnifier.
- **Article:** the article figure is now a drawing of its subject; the old sun-and-mountains picture is gone. The table of contents is a ruled box, and the quote and code block are framed.
- **About:** periwinkle band with a sticker; the authors are one ruled box.
- **Errors:** both not-found pages share one component with two tumbling stickers and the plate-stack button.
- **Header:** below 1024px it becomes a menu button that opens a full-screen panel (Escape closes it, and focus stays inside while open).
- **Footer:** black, with a big newsletter headline, link columns, and the email field joined to a pink Subscribe button.
- **Motion:** the drift, rocking and lifts all stop under reduced motion.
- **Preserved:** every route, test id, label, heading id and aria attribute.
- **Docs:** `design-system/VERSION` and `components.md`, plus `AGENTS.md` and `CLAUDE.md`.

**What I couldn't apply**
- **No commits:** the spec asks for one commit per screen, but `git commit` wasn't in the commands you allowed, so all changes are uncommitted. `npm install` also created `package-lock.json`.
- **No input in the hero:** the spec wants an input next to the hero button, but search belongs with the post list, so I didn't add one.
- **Two pieces have no screen to live on:** the app has no loading states or success screens. The loading sticker is built but unused, and the word badge appears only in the hero. I checked both on a temporary `/kit` page, which I removed.

**Decisions I made myself**
- **Subscribe button:** kept its visible "Subscribe" text with an arrow, instead of the arrow-only square button, so the label isn't lost.
- **Success message:** a white panel with a teal dot, since a sticker can't sit directly on the black footer.
- **Article title:** 48px in the header band rather than the 30px bold "article title" style.
- **Tags and avatars:** tags are outline chips, so each screen keeps a single band colour. Avatars are square ink frames.
- **Mobile layout:** the table of contents sits above the article as a ruled list rather than a collapsible section. On phones the hero shows 4 of its 6 stickers.
- **Additions:** footer links ("Latest posts", "Featured post", "About us", "The authors") and a menu button labelled "Menu".