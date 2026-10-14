The restyle is finished on all four captured screens. The build and typecheck pass and nothing scrolls sideways at 1440px or 390px, light or dark. I could not run the smoke tests: `npx playwright test` isn't one of the commands I was allowed. Every `data-testid`, route, label and heading name is kept, and headings that animate word by word still have the same text and accessible name, so the tests should still pass, but that isn't confirmed. I also made no git commits, so the "one commit per screen" step from the spec is still to do.

**What changed**
- **Tokens and fonts:** `design-system/tokens.css` is an exact copy of the package's `tokens.css` and is loaded by `src/styles/base.css`. The old variable names now point at the tokens. Dark mode follows the system setting, or `[data-theme]` if set. `index.html` loads Source Serif 4, Instrument Sans and JetBrains Mono from Google Fonts.
- **Signature pieces** (`src/components/ink/`):
  - the brush filters;
  - the frame-by-frame ink drawings, which play once when 30% in view, with the hold and boil states;
  - the pastel stage with wandering lines;
  - headings that fade in word by word;
  - the working glyph, breathing dot and caret.
  - The button, chip and field styles are classes in `base.css`. All motion stops under reduced motion.
- **Shop:** sticky 72px header; a bag drawing beside the h1; stone category chips; custom checkbox and sort select; product cards on plates coloured by category with each category's outline icon; "Sold out" as an outline badge; a magnifier drawing when filters match nothing.
- **Product detail:** a tag drawing beside the h1; the product image as a raised card on a stage; radio options with rings; a check-circle on the added-to-cart note. On mobile the stage moves below the text.
- **Cart:** a basket drawing in the header; the order summary as a card on a sage stage (the one stage on this screen); "Remove" is now a small button; an empty-cart drawer drawing; an envelope drawing on the confirmation.
- **Not found:** a folded-map drawing on an apricot stage with two buttons; "product not found" gets an empty-hanger drawing.
- **Docs:** `design-system/` now has `VERSION` and `components.md`, and `AGENTS.md` and `CLAUDE.md` point to it.

**Decisions you should know about**
- **"Place order" now waits 600 ms** with the working glyph and "Placing order" before showing the confirmation. The spec asks for the glyph on submit, and the original form submitted instantly, so this adds a short artificial delay. This is the one behaviour change; remove it if you don't want it.
- **Added text:** after a failed submit, a "N fields need attention" line appears above the button. "Not found" pages also gained a "View cart" link, because the spec asks for two actions.
- **Order summary moved:** it's now its own section, outside "Items", so it can sit on the stage. The test ids are unchanged.
- **Accessories colour:** there are four categories but only three pastel stage colours allowed for plates. Accessories plates use the drawing-fill sand colour, and on the detail page they use the lake stage, which is allowed because the card sits in front of it.
- **Stages near the first screen:** a stage within 1.5 screen heights of the top rises as the page loads instead of waiting to be scrolled to. Without this, the mobile detail stage was blank in the screenshots.
- **Grid sizes:** filter chips are 40px tall, and the card grid uses columns of at least 256px rather than a strict 12/8/4 grid.

**Spec items I couldn't apply**
- **Out of scope for a two-link store:** a sidebar, a mobile menu (there are only two links), the closing dark band used on content sites, and an accent-coloured hero drawing (there is no landing hero).
- **`tokens.json`** is not copied into `design-system/`; it stays in the design package folder.
- **Unchecked drawings:** the screenshot routes only show the empty cart, so I haven't seen the magnifier, envelope, map or hanger drawings, or the filled cart and checkout layout. The 48px header drawings are small, and their hand-drawn detail reads only roughly at that size.