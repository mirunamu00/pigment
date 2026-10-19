# gumroad-study — iteration log

One entry per authoring iteration: what changed in the package, why, and which gate or critic note it answers.

## 0.1.0-rc.1 (first authoring)

Filled the scaffold from the approved analysis: four signature elements as recipes (hard-lift buttons, sticker illustration, category color bands, outline-on-demand pills), ten rules, Never list, Applying-the-concept table (13 contexts), derived tables, toasts, dialogs, loading, empty and error states. Own pink hue replaces the reference brand pink; DM Sans replaces the proprietary grotesk. Focus ring is ink (light) because pink fails 3:1 on paper; pink is the input halo only. Secondary text darkened and danger red darkened to pass contrast; band red kept for header bands.

## hardlift 0.1.0-rc.2 (from rc.1, evaluation 1)

- Gate: accessibility = 1 (color-contrast, 12 nodes on one route). Cause in the spec: secondary/link gray was allowed to land on band colors, and nothing said contrast is judged against the fill behind the text.
- General rule: inside any band, pink or colored fill every text node uses new token `color.text.onBand` (ink), set on the container so children inherit; secondary, disabled and default link colors only on paper/raised surfaces; check contrast against the immediate background. Added to Accessibility, Never and the band signature limits.
- Holds beyond the demos: any product with colored headers, banners or badges puts meta text, links and counts in them.

## hardlift 0.1.0-rc.3 (from rc.2, evaluation 1)

- Linked cards did not lift (componentStates major). Rule: lift lives on the card's outer bordered box (anchor or its pointer-receiving wrapper), never an inner element, with 8px clearance from clipping ancestors, verified by hovering one card. Added to Hard-lift Limits and Card states. Holds for any card grid: product, project, plan or article.
- Several pink actions per viewport (signature major, spec-caused). Rule: component-owned pink buttons yield to the one most important action in view (`lift--ink`/`lift--ghost`); open triggers and selected/toggled controls use raised or ink, never pink. Changed checkbox, switch, select selected option, dialog footer, button Do/Don't, Color use, Never. Holds for any screen that composes empty states, forms, dialogs or menus.
- Generic image glyph as placeholder/figure (signature major, spec-caused). Rule: no mountains-and-sun or frame glyphs; photo placeholder = band-color square with a distinct basic-shape sticker object hinting at the item's kind; idea figures = original sticker scene of their subject; never one drawing for two items. Changed Imagery, Card anatomy, rule 9, Never. Holds for any catalog, article or feed with missing media.

## hardlift 0.1.0-rc.4

Answers evaluation 1 of rc.3 (two majors).

1. Linked card hover showed only a fill tint. General rule: a linked card's hover is the lift; add `.lift-card` recipe (translate -4px -4px, `shadow.md` in `color.shadow.hard`) on the outermost bordered pointer-receiving element, tint optional only together with the lift; Interaction row "Linked card | lift, as buttons"; verify step compares position and shadow in each theme. Holds for any grid of linked items (listings, bookings, docs tiles).
2. Open menu trigger turned pink via ghost hover. General rule: every menu/popover/select/disclosure trigger has `[aria-expanded="true"]` state (`color.surface.raised` + ink border, or `color.action.inverse` when solid) with specificity above ghost hover; ghost pink hover excludes triggers (`:not([aria-haspopup], [aria-expanded])`); new "Open trigger" Interaction row; button.md variant text updated. Holds for any product with dropdowns.

## 0.1.0-rc.6 (answers evaluation 2 of rc.5)

1. Toast covered the control that triggered it (blocker). Rule: a toast never covers content or controls; bottom corner outside the column, page bottom padding = toast height + space.16, or inline confirmation beside the trigger; toast controls ghost/ink, never pink; verify per theme at 390px. Holds for any form, booking or CRM action that confirms at the bottom of a page.
2. Drifting shapes covered a CTA after scroll (blocker). Rule: whole drift path stays in empty space or off-edge, lower z-index with pointer-events none, shrunk or static under breakpoint.md, checked at top/middle/end of hero. Holds for any hero with decorative motion.
3. Stacked row action collapsed to a two-letter box (blocker). Rule: row buttons flex none, width max-content, nowrap, standard padding, size.hit height, own line or right slot. Holds for any reflowed table or list.
4. Busy button rendered as gray disabled on a band (major). Rule: busy is not disabled; keeps variant fill, border, full-contrast label plus coin and aria-busy; gray recipe only on paper/raised; colored fills keep fill and use aria-disabled; 4.5:1 in every state. Holds for any colored toolbar or banner.
Minors left alone.
