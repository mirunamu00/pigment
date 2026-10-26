```json
{ "mode": "quality",
  "referenceFidelity": 4, "signature": 3, "crossAppConsistency": 4, "hierarchy": 3, "spacingRhythm": 3, "componentStates": 3, "polish": 3,
  "findings": [
    { "kind": "gap", "severity": "major", "area": "hierarchy",
      "summary": "On desktop, every product screen's header band (shop front, item detail, cart, dashboard lists and detail, people, about, all settings pages) is still 375–450px tall because its height comes from its art. The band holds only a breadcrumb, an h2-size title and one line in the top-left corner, so half to two-thirds of it is empty colour. The first field, table, item cover or buy action starts at y≈500–700, and the confirmation that follows an action ends up below the first screen. In the reference a tall band is earned by a full text block (02: 64px headline, lead, checklist, pill), and a band that only names the page stays short (04). This was named in rc.4 review 1 and has not closed.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": ".ms-field--header { --ms-arc: var(--size-arc-sm); padding-block: var(--space-10) var(--space-8); min-height: calc(min(42vw, var(--size-band-art)) * 0.6 + var(--space-12)); }",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/commerce--page--home--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/settings--page--settings-profile--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/dashboard--page--projects--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/commerce--state--added-to-cart--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/blog--page--about--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/02-desktop.png",
        "pipeline/headspace-study/reference/set/04-mobile.png"
      ],
      "items": ["commerce--page--home--desktop-light","commerce--page--products-canvas-field-tote--desktop-light","commerce--page--cart--desktop-light","commerce--state--added-to-cart--desktop-light","dashboard--page--projects--desktop-light","dashboard--page--team--desktop-light","blog--page--about--desktop-light","settings--page--settings-profile--desktop-light","settings--state--profile-saved--desktop-light"],
      "promptFix": "Delete the art-derived min-height from the compact header band. The band's height comes from its text: the text block plus `space.10` above and `space.8` below. That is about 200–260px on desktop, and never more than a third of the first screen. Put the art in the trailing 40% of the width and cap it at the band's inner height. Draw it in a wide viewBox (about 400×200) with `height: 100%; width: auto; max-width: 100%`, so the scene spreads sideways and doesn't make the band taller. Only a front-page hero with a display headline, a lead and pills may grow tall around its art. On a screen whose job is an action (a form, a settings group, an item with a buy action, a cart), the first control, the primary action and the feedback it produces must be visible in the first desktop viewport." },
    { "kind": "gap", "severity": "major", "area": "signature",
      "summary": "The front-page hero vignette is a loose stack of near-identical white UI cards, with stray single dots and a lone disc around it. It is not one composed object. The reference's vignette (01, 02) is one subject (a phone, or a photo cut into a blob with an offset edge) with a speech bubble overlapping its edge, a large four-point sparkle and a cloud tucked against it. All the pieces overlap and anchor to the subject, so they read as one scene. In the rc.4 results the cards float apart, the confetti is scattered and too small, and the desktop hero's right half reads as a pinned-up list rather than an illustration. The band art scenes on other pages (badge, padlock, bell, basket) are composed well, which shows the vignette recipe is the weak spot.",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/blog--page--home--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/commerce--page--home--desktop-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/commerce--page--home--desktop-dark--s1.png",
        "pipeline/headspace-study/reference/set/01-desktop.png",
        "pipeline/headspace-study/reference/set/02-desktop.png"
      ],
      "items": ["blog--page--home--desktop-light","commerce--page--home--desktop-light","commerce--state--card-hover--desktop-light"],
      "promptFix": "A hero vignette is one composition around one anchor: a single large subject (a device frame, a cover tile or a blob-cut panel with an offset second-hue edge) that takes about 60% of the art box. At most two small UI pieces (a chip, a bubble, a toast) overlap the anchor's edge by about a quarter of their size and never float free. The big four-point sparkle (at least 48px) and the cloud touch or overlap the anchor. Every piece overlaps another; no lone dots under 16px. Never stack more than two cards of the same shape and width." },
    { "kind": "gap", "severity": "major", "area": "hierarchy",
      "summary": "On phones the front-page hero stacks its full-size vignette as its own column under the stacked pills. The yolk band runs about 1,400–1,600px, and the first content starts two screens down. The dashboard has the same problem with its stat tiles: four full-width saturated slabs, each with a small figure and mostly empty colour, fill the first two phone screens. The reference phone keeps one compact field per viewport, filled with text, with any art tucked at its edge (04), and sets stat tiles as a compact group (08).",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "Below `breakpoint.md`: … card grids to one column (two below `breakpoint.lg`)",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/blog--page--home--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/dashboard--page--home--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/dashboard--state--search-focus--mobile-light--s3.png",
        "pipeline/headspace-study/reference/set/04-mobile.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": ["blog--page--home--mobile-light","blog--page--home--mobile-dark","dashboard--page--home--mobile-light","dashboard--state--search-focus--mobile-light","dashboard--state--empty-filter--mobile-light"],
      "promptFix": "Below `breakpoint.md`, a saturated field never takes more than one screen, and decoration never makes it taller. In a hero, keep the headline, lead and pills. Cut the vignette to one piece of at most 140px tucked beside or overlapping the pills, or replace it with two or three confetti shapes at the band's edge. Never stack vignette cards. A stat-tile row stays one group: a 2×2 grid of compact tiles (no min-height, the plate beside the figure or dropped), or one row that scrolls sideways. The whole group fits in half of the first phone screen." },
    { "kind": "gap", "severity": "minor", "area": "componentStates",
      "summary": "Keyboard focus on top-bar and text links is a flush, square-cornered box tight to the word, sometimes leaving the current-page dot outside it. It looks like the browser default. The reference's focus is a rounded ring offset around the whole control (11). Pills and sidebar items get the right ring, so this affects only links. Named since rc.2.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "Text links | underline 1px → 2px | ring around the text … Nav links (top bar) | medium → bold, instant (reserve the bold width) | ring",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/commerce--state--keyboard-focus--desktop-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/blog--state--keyboard-focus--desktop-light--s3.png",
        "pipeline/headspace-study/reference/set/11-desktop.png"
      ],
      "items": ["commerce--state--keyboard-focus--desktop-light","commerce--state--keyboard-focus--desktop-dark","blog--state--keyboard-focus--desktop-light","blog--state--keyboard-focus--mobile-light"],
      "promptFix": "One shared `:focus-visible` rule covers every focusable element that is not a pill, input or card. It draws a 2px `color.focus.ring` outline (`ringOnField` on saturated and night fields) with a 2px offset around the whole hit area, including any leading dot or icon. Use `space.1` inline padding with a matching negative margin, `radius.full` corners on nav links and `radius.sm` on inline links. Never draw a box flush with the letters." },
    { "kind": "defect", "severity": "minor", "area": "polish",
      "summary": "In dark mode every page that renders the footer ends in a bright white bottom bar under the indigo footer. It is the only light surface on a night page, while the reference's night palette stays dark to the edge (03). Open since rc.3.",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "Footer | Cream band with rise arc, link columns, a signup field + ink pill; `surface.inverse` bottom bar with round icon buttons … (dark) `color.surface.inverse` | `#ffffff`",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/commerce--page--home--desktop-dark.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/blog--page--home--desktop-dark.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/dashboard--page--home--desktop-dark.png",
        "pipeline/headspace-study/reference/set/03-desktop.png"
      ],
      "items": ["commerce--page--home--desktop-dark","blog--page--home--desktop-dark","dashboard--page--home--desktop-dark","settings--page--settings-profile--mobile-dark"],
      "promptFix": "Give the footer bottom bar its own role token, the darkest surface in both appearances: ink by day, and a step darker than the navy page at night, both with white text. Keep `surface.inverse` for small floating pieces such as toasts." },
    { "kind": "gap", "severity": "minor", "area": "hierarchy",
      "summary": "On desktop, the stat tiles are the right saturated fields with pictogram plates, but the figure is about 32px. That is close in weight to the eyebrow and caption, so each tile reads as a coloured card rather than a number. In the reference, one big bold figure dominates each field (08).",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/dashboard--page--home--desktop-light--s1.png",
        "pipeline/headspace-study/reference/set/08-desktop.png"
      ],
      "items": ["dashboard--page--home--desktop-light","dashboard--state--search-focus--desktop-light"],
      "promptFix": "" },
    { "kind": "gap", "severity": "minor", "area": "componentStates",
      "summary": "Several states are less designed than the reference's. In light mode an off switch is a warm-grey track one step from its cream panel and nearly disappears. Hovered table rows show no change in 2 of 3 samples. Newsletter success is a single small tick line, indigo on indigo at night. One sample replaces a focused invalid field's danger border with the focus colour. The reference designs every state to read at a glance (09, 11).",
      "samples": 3, "of": 3, "specCaused": true,
      "specRule": "default (off) | track `color.surface.hover`, knob `color.art.white`, `shadow.ledge` … Table rows | clickable rows only: `color.surface.subtle`",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/settings--page--settings-notifications--mobile-light--s1.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/dashboard/20261026-173309-s2/screenshots/state-row-hover-desktop-light.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/blog--state--newsletter-success--desktop-light.png",
        "pipeline/headspace-study/reference/set/09-desktop.png",
        "pipeline/headspace-study/reference/set/11-desktop.png"
      ],
      "items": ["settings--page--settings-notifications--mobile-light","settings--state--keyboard-focus--desktop-light","dashboard--state--row-hover--desktop-light","blog--state--newsletter-success--desktop-light","settings--state--profile-errors--desktop-light"],
      "promptFix": "" },
    { "kind": "gap", "severity": "minor", "area": "signature",
      "summary": "The spot pictograms are uneven. Some catalog and plate pictograms fill only about half their box, and some can't be named (a duffel that reads as a toggle switch, a plain hexagon, a bar chart standing for plans). Area band clusters repeat one arrangement with only the lead noun changed. Some screens repeat a noun (basket in the band and in the empty state; the same price tag on every item page). The reference's pictograms fill their plates, can be named at a glance, and each spot has its own subject (07).",
      "samples": 3, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/commerce--drawings--home.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/settings--drawings--settings-billing.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/dashboard--drawings--projects.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/commerce--drawings--cart.png",
        "pipeline/headspace-study/reference/set/07-desktop.png"
      ],
      "items": ["commerce--drawings--home","settings--drawings--settings-billing","dashboard--drawings--projects","commerce--drawings--cart","commerce--drawings--products-canvas-field-tote"],
      "promptFix": "" },
    { "kind": "defect", "severity": "minor", "area": "polish",
      "summary": "Agent-side slips: the shop front's vignette build loops instead of running once, so captures show an empty band; late vignette cards are caught pale mid-stagger; on phones the article breadcrumb collides with the corner cluster; phone settings tabs clip or hide the current tab; in one sample the loading skeleton bars overlap.",
      "samples": 2, "of": 3, "specCaused": false, "specRule": "",
      "evidence": [
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/sheets/commerce--motion.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/blog--page--posts-shipping-a-design-system--mobile-light--s2.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/settings--page--settings-billing--mobile-light--s3.png",
        "showcase/runs/morning-shapes/0.1.0-rc.4/review-2/crops/dashboard--state--loading--desktop-light--s3.png"
      ],
      "items": ["commerce--motion","blog--page--posts-shipping-a-design-system--mobile-light","settings--page--settings-billing--mobile-light","dashboard--state--loading--desktop-light"],
      "promptFix": "" }
  ],
  "notes": [
    "Across all four apps this is clearly the reference's language: yolk and saturated bands with arcs, ink and blue pills on ledges, dot filter pills, cream 24px panels, flat crescent-shaded pictograms and a convincing derived night palette. Someone who knows the reference would recognise the family, and the apps hold together as one system.",
    "It does not yet read as the same team's work. The front-page vignette is a loose stack of white cards instead of one composed scene. The desktop product bands are art-sized and half empty, so the hierarchy that makes the reference feel confident (a big headline earning a big field, short bands that just name a page) is lost on most screens. On phones, saturated fields grow to two screens. The band height and the phone stacking are spec-caused and carried over from rc.4; fixing those two, the vignette recipe and link focus is what stands between this and a pass."
  ] }
```